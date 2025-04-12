// frontend/src/components/CodeEditor/CodeEditor.jsx
import {  useRef } from 'react';
import { Editor } from '@monaco-editor/react';

// eslint-disable-next-line react/prop-types
const CodeEditor = ({ value, onChange, readOnly = false, language = 'python' }) => {
  const editorRef = useRef(null);
  // const { isDarkMode } = useTheme();

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="h-[300px] border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage={language}
        defaultValue={value}
        // theme={isDarkMode ? 'vs-dark' : 'light'}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
          tabCompletion: 'on',
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true
          },
          parameterHints: {
            enabled: true
          }
        }}
      />
    </div>
  );
};

export default CodeEditor;