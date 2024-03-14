import React, { useEffect, useMemo, useState } from 'react';
import { EditorContent, EditorRoot, defaultEditorProps } from 'novel';
import { useDebouncedCallback } from 'use-debounce';
import { defaultExtensions } from './extensions';
import SlashCommand from './extensions/slash-command';
import { instance } from '@/utils/axiosService/customAxios';
import Bold from '@tiptap/extension-bold';

import Text from '@tiptap/extension-text';
import { generateJSON } from '@tiptap/html';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import Document from '@tiptap/extension-document';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Code from '@tiptap/extension-code';

const extensions = [...defaultExtensions, SlashCommand];

const TailwindEditor = ({
  propData,
  editorId,
  saveApiEndpoint,
  requestName,
}) => {
  const [initialContent, setInitialContent] = useState(null);
  const [saveStatus, setSaveStatus] = useState('Saved');

  const transformContent = (data) => {
    try {
      // Attempt to parse as JSON first
      return JSON.parse(data);
    } catch {
      // If parsing fails, assume HTML and convert to JSON
      return generateJSON(data, [
        Document,
        Paragraph,
        Text,
        Bold,
        Heading.configure({
          levels: [1, 2, 3, 4, 5],
        }),
        BulletList,
        OrderedList,
        ListItem,
        Code,
        // Add other extensions as needed
      ]);
    }
  };

  // Use useMemo here for the transformation to avoid recalculations on each render
  const transformedContent = useMemo(
    () => (propData ? transformContent(propData) : null),
    [propData]
  );

  const debouncedUpdates = useDebouncedCallback(async (editor) => {
    const html = editor.getHTML();
    const localStorageKey = `novel-${requestName}-${editorId}`;
    window.localStorage.setItem(localStorageKey, html);
    const formData = new FormData();
    formData.append(requestName, editor.getHTML());

    setSaveStatus('Saving...');
    try {
      const response = await fetch(saveApiEndpoint, {
        method: 'PATCH', // or 'PATCH', depending on your backend setup
        body: formData,
        // Don't set Content-Type header; the browser will set it with the correct boundary
      });
      if (response.status === 200) {
        setSaveStatus('Saved');
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Failed to save content:', error);
      setSaveStatus('Save failed, try again');
    }
  }, 500);

  useEffect(() => {
    if (transformedContent) {
      setInitialContent(transformedContent);
    }
  }, [transformedContent]);

  useEffect(() => {
    const localStorageKey = `novel-${requestName}-${editorId}`;
    let content = window.localStorage.getItem(localStorageKey);

    if (content && content.trim() !== '') {
      try {
        const parsedContent = JSON.parse(content);
        setInitialContent(parsedContent);
      } catch (error) {
        console.error('Error parsing content from localStorage:', error);
        // Handle error or set a fallback state
      }
    } else if (propData && propData.trim() !== '') {
      try {
        const parsedContent = JSON.parse(propData);
        setInitialContent(parsedContent);
      } catch (error) {
        console.error('Error parsing propData:', error);
        // Handle error or set a fallback state
      }
    }
  }, [editorId, propData]);

  if (!initialContent) return null; // Adjust this as needed for your loading state

  return (
    <div className="relative w-full max-w-screen-xl h-full">
      <div className="absolute right-5 z-10 mb-5 ml-4 rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
        {saveStatus}
      </div>
      <EditorRoot>
        <EditorContent
          initialContent={initialContent}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
            setSaveStatus('Unsaved');
          }}
          extensions={extensions}
          editorProps={{
            ...defaultEditorProps,
            attributes: {
              class: `prose-lg prose-headings:font-title prose-sm sm:prose-base focus:outline-none max-w-full lg:prose-lg`,
            },
          }}
        />
      </EditorRoot>
    </div>
  );
};

export default TailwindEditor;
