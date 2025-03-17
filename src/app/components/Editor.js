import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import Checklist from '@editorjs/checklist';

const Editor = ({ onSave }) => {
  const editorRef = useRef(null);
  const [editorInstance, setEditorInstance] = useState(null);

  // Initialize the Editor.js instance with multiple tools
  const initializeEditor = () => {
    const editor = new EditorJS({
      holder: editorRef.current,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        embed: {
          class: Embed,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'YOUR_FILE_UPLOAD_URL', // API endpoint for uploading images
            },
          },
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
        table: {
          class: Table,
          inlineToolbar: true,
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
      },
      onReady: () => {
        setEditorInstance(editor);
      },
    });
  };

  // Get the editor data and send it to the parent component
  const handleSave = async () => {
    if (editorInstance) {
      const data = await editorInstance.save();
      onSave(data);
    }
  };

  // Initialize the editor when the component mounts
  useEffect(() => {
    initializeEditor();
    return () => {
      if (editorInstance) {
        editorInstance.destroy();
      }
    };
  }, []);

  return (
    <div>
      <div ref={editorRef}></div>
      <button onClick={handleSave} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Save Content
      </button>
    </div>
  );
};

export default Editor;
