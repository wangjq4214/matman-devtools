import React from 'react';
import { Layout, Divider } from 'antd';
import Options from './components/Options';
import Editor from './components/Editor';

import styles from './index.module.less';

const Index = () => {
  return (
    <Layout.Content>
      <div className={styles.siteLayoutBackground} style={{ padding: 24 }}>
        <Options />
      </div>
      
      <div
        className={`${styles.siteLayoutBackground} ${styles.editorContainer}`}
        style={{ padding: 24, height: 800 }}
      >
        <Editor />
      </div>
    </Layout.Content>
  );
};

export default Index;
