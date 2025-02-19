/* eslint-disable react/prop-types */

import { Editor } from "@monaco-editor/react";

const CodeEditor = ({ language = "javascript", theme = "vs-dark", value, onChange }) => {
  return (
    <Editor
      height="500px"
      defaultLanguage={language}
      defaultValue={value}
      theme={theme}
      onChange={onChange}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: "on",
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
