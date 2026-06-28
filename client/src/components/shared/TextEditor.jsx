import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const TextEditor = ({ value, onChange, placeholder = "Write something amazing...", className = "" }) => {
  // এডিটরের টুলবার কনফিগারেশন
  const modules = {
    toolbar: [
      [{ header: [2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
  ];

  return (
    <div className={`text-editor-wrapper fs-3 ${className}`} style={{ height: "300px", marginBottom: "50px" }}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height: "100%", borderRadius: "8px" }}
      />
    </div>
  );
};

export default TextEditor;