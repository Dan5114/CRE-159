import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMCEEditor = () => {
  const editorRef = useRef(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Example Data (Replace with API call if needed)
    setTableData([
      { name: "John Doe", email: "johndoe@example.com", phone: "+123456789" },
      { name: "Jane Doe", email: "janedoe@example.com", phone: "+987654321" },
    ]);
  }, []);

  // Generate Read-Only Table
  const generateTable = () => {
    if (!tableData.length) return "<p>No data available</p>";

    let tableHtml = `<table border="1" style="width:100%; border-collapse: collapse;" contenteditable="false">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
      </tr>`;

    tableData.forEach((row) => {
      tableHtml += `
        <tr>
          <td>${row.name}</td>
          <td>${row.email}</td>
          <td>${row.phone}</td>
        </tr>`;
    });

    tableHtml += "</table>";
    return tableHtml;
  };

  return (
    <Editor
      apiKey="mbol3tcfo3wkegym6drelrc3e356aq0k7lc8gnrkdpp3x23w"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={`${generateTable()} <p>Editable Content Below</p>`}
      init={{
        height: 400,
        menubar: false,
        plugins: "table",
        toolbar: "undo redo | bold italic | alignleft aligncenter alignright | table",
        table_toolbar: false, // Hide table toolbar
        content_style: "table { pointer-events: none; }", // Prevents editing table
        readonly: 0, // Allows editing the rest of the editor
      }}
    />
  );
};

export default TinyMCEEditor;
