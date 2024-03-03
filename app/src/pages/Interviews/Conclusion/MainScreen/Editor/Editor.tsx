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
import { instance } from '@/utils/axiosService/customAxios';

const extensions = [...defaultExtensions, SlashCommand];

// Updated the component to accept propData as a prop
const TailwindEditor = ({
  propData,
  editorId,
  saveApiEndpoint,
  requestName,
}) => {
  const [initialContent, setInitialContent] = useState(null);
  const [saveStatus, setSaveStatus] = useState('Saved');

  const debouncedUpdates = useDebouncedCallback(async (editor) => {
    const json = editor.getJSON();
    const localStorageKey = `novel-content-${editorId}`; // Unique key for local storage
    window.localStorage.setItem(localStorageKey, JSON.stringify(json));
    const stringJson = JSON.stringify(json);
    const requestBody = { [requestName]: stringJson }; // Constructing requestBody dynamically
    setSaveStatus('Saving...');
    try {
      // Using axios instance to make a patch request
      const response = await instance.patch(saveApiEndpoint, requestBody);

      if (response.status === 200) {
        // Checking response status code for success
        setSaveStatus('Saved');
        localStorage.clear();
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Failed to save content:', error);
      setSaveStatus('Save failed, try again');
    }
  }, 500);

  useEffect(() => {
    const localStorageKey = `novel-content-${editorId}`;
    let content = window.localStorage.getItem(localStorageKey);

    if (content) {
      try {
        const parsedContent = JSON.parse(content);
        setInitialContent(parsedContent);
      } catch (error) {
        console.error('Error parsing content from localStorage:', error);
      }
    } else {
      // Fallback to propData if local storage is empty
      // Assuming propData is an object. If it's a string, you may need JSON.parse(propData)
      setInitialContent(propData);
    }
  }, [editorId, propData]);

  if (!initialContent) return null;
  return (
    <div className="relative w-full max-w-screen-xl  h-full">
      <div className="absolute right-5  z-10 mb-5 ml-4 rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
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
              class: `prose-lg prose-headings:font-title prose-sm sm:prose-base focus:outline-none max-w-full lg:prose-lg  `,
            },
          }}
        />
      </EditorRoot>
    </div>
  );
};
export default TailwindEditor;
