import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MyEditor = () => {
  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  return (
    <div>
      <Editor
        apiKey="mbol3tcfo3wkegym6drelrc3e356aq0k7lc8gnrkdpp3x23w" // optional
        value={editorContent} // Bind editor content to state
        init={{
          height: 500,
          menubar: true,
          plugins: ['lists', 'link', 'image', 'code'],
          toolbar: 'undo redo | formatselect | bold italic | link image | code',
        }}
        onEditorChange={handleEditorChange} // Update state when content changes
      />
    </div>
  );
};

export default MyEditor;
