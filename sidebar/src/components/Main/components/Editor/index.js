import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import useCodeModel from '../../../../models/code';

const options = {
  fontSize: 18,
  fontWeight: 'bold',
  automaticLayout: true,
};

const Index = () => {
  const { code } = useCodeModel();

  return (
    <>
      <MonacoEditor
        language="javascript"
        theme="vs-dark"
        options={options}
        value={code}
      />
    </>
  );
};

export default Index;
