import {
  EditorContent,
  EditorRoot,
  defaultEditorProps,
  type JSONContent,
} from 'novel';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Editor as EditorInstance } from 'novel';
import { defaultEditorContent } from './lib/content';
import { defaultExtensions } from './extensions';
import SlashCommand from './extensions/slash-command';
import DragAndDrop from './extensions/drag-and-drop';

const extensions = [...defaultExtensions, SlashCommand, DragAndDrop];

const TailwindEditor = () => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null
  );
  const [saveStatus, setSaveStatus] = useState('Saved');

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();

      window.localStorage.setItem('novel-content', JSON.stringify(json));
      setSaveStatus('Saved');
    },
    500
  );

  useEffect(() => {
    const content = window.localStorage.getItem('novel-content');
    if (content) setInitialContent(JSON.parse(content));
    else setInitialContent(defaultEditorContent);
  }, []);

  if (!initialContent) return null;

  return (
    <div className="relative w-full max-w-screen-xl">
      <div className="absolute right-5 top-5 z-10 mb-5 rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
        {saveStatus}
      </div>
      <EditorRoot>
        <EditorContent
          initialContent={initialContent}
          className=""
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
            setSaveStatus('Unsaved');
          }}
          extensions={extensions}
          editorProps={{
            ...defaultEditorProps,
            attributes: {
              class: `prose prose-headings:font-title prose-sm sm:prose-base focus:outline-none max-w-full lg:prose-lg  `,
            },
          }}
        />
      </EditorRoot>
    </div>
  );
};
export default TailwindEditor;
