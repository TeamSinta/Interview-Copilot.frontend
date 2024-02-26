import {
  EditorContent,
  EditorRoot,
  defaultEditorProps,
  type JSONContent,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommand,
} from 'novel';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Editor as EditorInstance } from 'novel';
import { defaultEditorContent } from './lib/content';
import { defaultExtensions } from './extensions';
import { slashCommand, suggestionItems } from './slash-command';

const extensions = [...defaultExtensions, slashCommand];

const TailwindEditor = () => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null
  );
  const [saveStatus, setSaveStatus] = useState('Saved');

  const [, setContent] = useState(null);

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
              class: `prose-lg prose-stone dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
            },
          }}
        />
        <EditorCommand className="z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          {suggestionItems.map((item) => (
            <EditorCommandItem
              value={item.title}
              onCommand={(val) => item.command(val)}
              className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
              key={item.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                {item.icon}
              </div>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </EditorCommandItem>
          ))}
        </EditorCommand>
      </EditorRoot>
    </div>
  );
};
export default TailwindEditor;
