"use client";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

declare global {
  interface Window {
    tinymce: any;
  }
}

type EditorProps = {
  onContent: (data: { id: number; content: any }) => void;
  defaultContent?: { id: number; content: any } | null;
  newDoc: () => void
};

const Editor = ({ onContent, defaultContent, newDoc }: EditorProps) => {
  const [isNewDocument, setIsNewDocument] = useState(false); // State to track if it's a new document
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    console.log("%%%%%%%%%%%%%%%%%", defaultContent);
    
    const script = document.createElement("script");
    script.src = "/tinymce/js/tinymce/tinymce.min.js";
    script.onload = () => {
      if (window.tinymce) {
        const editor = window.tinymce.init({
          selector: "#myEditor",
          height: 700,
          plugins: ["image", "link", "media", "table", "lists"],
          toolbar:
            "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image media link | saveButton",
          menu: {
            file: {
              title: "File",
              items: "open | save | print", // حذف گزینه newdocument
            },
          },
          menuBar: true, // Ensure the menu bar is enabled
          automatic_uploads: false,
          file_picker_types: "image media",
          file_picker_callback: function (
            callback: (url: string) => void,
            _value: any,
            meta: { filetype: string }
          ) {
            const url = prompt(
              meta.filetype === "image"
                ? "Enter image URL"
                : "Enter media URL"
            );

            if (url) {
              callback(url);
            }
          },
          setup: (editor: any) => {
            editor.on("init", () => {
              if (defaultContent && defaultContent.content) {
                // Set the default content if available
                editor.setContent(defaultContent.content);
                editor.fire("resize"); // Resize editor to fit the content
              }
            });
          },
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (window.tinymce) {
        window.tinymce.remove("#myEditor");
      }
    };
  }, [defaultContent]);

  const handleSave = () => {
    if (window.tinymce) {
      const content = window.tinymce.get("myEditor").getContent();
      const id = isNewDocument ? 0 : (defaultContent ? defaultContent.id : 0); // Use id 0 for new document
      if (content) {
        // Pass the correct id (0 for new document, otherwise use defaultContent.id)
        onContent({ id, content });
      }
    }
  };

  const handleNewDocument = () => {
    newDoc()
    setIsNewDocument(true); // Set isNewDocument to true when "Add New Document" is clicked
    if (window.tinymce) {
      window.tinymce.get("myEditor").setContent(""); // Clear the editor content for a new document
    }
  };

  const permetionForDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33", 
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed && defaultContent?.id) {
        onContent({ id: -1, content: defaultContent.id });
      }
    });
  }

  return (
    <section>
      <textarea id="myEditor" ref={editorRef}></textarea>
      <div
        className="transition-global w-full bg-white -mt-2 rounded-b-lg grid grid-cols-2 sm:grid-cols-3"
      >
        <button onClick={handleNewDocument} className="text-blue-700 hover:bg-blue-200 pb-2 mt-3 pt-1">New Document</button>
        <button onClick={handleSave} className="text-green-700 hover:bg-green-200 pb-2 mt-3 pt-1">Save</button>
        <button onClick={permetionForDelete} className="text-red-700 hover:bg-red-200 pb-2 mt-3 pt-1">Delete</button>
      </div>
    </section>
  );
};

export default Editor;