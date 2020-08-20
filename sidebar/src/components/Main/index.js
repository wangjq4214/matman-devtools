import React from 'react';
import { Layout } from 'antd';
import Options from './components/Options';
import Editor from './components/Editor';
import useOptionsModel from '../../models/options';

import styles from './index.module.less';

const Index = () => {
  const { editorHeight } = useOptionsModel();

  return (
    <Layout.Content>
      <div
        className={styles.siteLayoutBackground}
        style={{ padding: 24 }}
        id="header"
      >
        <Options />
      </div>

      <div
        className={`${styles.siteLayoutBackground} ${styles.editorContainer}`}
        style={{ padding: 0, height: editorHeight }}
      >
        <Editor key={`editor_${editorHeight}`}/>
      </div>
    </Layout.Content>
  );
};

export default Index;
