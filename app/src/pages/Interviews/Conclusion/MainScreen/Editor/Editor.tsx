import {
  EditorContent,
  EditorRoot,
  defaultEditorProps,
  type JSONContent,
} from 'novel';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Editor as EditorInstance } from 'novel';
import { defaultExtensions } from './extensions';
import SlashCommand from './extensions/slash-command';
import { saveContentToBackend } from '@/features/interviewDetail/interviewDetailAPI';

const extensions = [...defaultExtensions, SlashCommand];

// Updated the component to accept propData as a prop
const TailwindEditor = ({ propData }) => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null
  );
  const [saveStatus, setSaveStatus] = useState('Saved');
  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();

      window.localStorage.setItem('novel-content', JSON.stringify(json));
      setSaveStatus('Saving...');
      try {
        // Replace this with your actual API call
        const stringifyJSON = JSON.stringify(json);
        await saveContentToBackend(propData.summary_id, stringifyJSON);
        setSaveStatus('Saved');
      } catch (error) {
        console.error('Failed to save content:', error);
        setSaveStatus('Save failed, try again');
      }
    },
    500
  );

  useEffect(() => {
    // Attempt to load content from localStorage
    const content = window.localStorage.getItem('novel-content');
    if (content) {
      try {
        const parsedContent = JSON.parse(content);

        setInitialContent(parsedContent);
      } catch (error) {
        console.error('Error parsing content from localStorage:', error);
        // If parsing fails, fallback to propData
        setInitialContent(parsePropData(propData?.description));
      }
    } else {
      // If no content in localStorage, fallback to propData
      setInitialContent(parsePropData(propData?.description));
      console.log(propData.description);
    }
  }, []); // Dependency array is empty to ensure this effect runs only once on mount

  // Helper function to parse propData if it's a string or return it directly if it's already an object
  function parsePropData(data) {
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error('Error parsing propData:', error);
        return null; // Return null or default content as a fallback
      }
    }
    return data; // Return propData directly if it's not a string
  }
  // Add propData to the dependency array to re-run effect when propData changes

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
