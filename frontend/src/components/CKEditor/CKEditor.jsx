import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// eslint-disable-next-line react/prop-types
const CKEditorComponent = ({ content, setContent }) => {
  return (
    <div className="ckeditor-container">
      <CKEditor
        editor={ClassicEditor}
        data={content}
        config={{
          toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
       <style>{`
        .ckeditor-container :global(.ck-editor__main) {
          min-height: 200px;
        }
        .ckeditor-container :global(.ck-content) {
          min-height: 200px;
        }
      `}</style>
    </div>
  );
};

export default CKEditorComponent;