/* global chrome */
import React from 'react';
import { Layout, Typography, Button, Tooltip } from 'antd';
import useCodeModel from '../../models/code';
import useConsoleModel from '../../models/console';
import useFullPageModel from '../../models/fullPage';

import styles from './index.module.less';

const Index = () => {
  const { code } = useCodeModel();
  const { handelConsole } = useConsoleModel();
  const { fullPage, handleFullPage } = useFullPageModel();

  const exec = () => {
    // https://developer.chrome.com/extensions/devtools_inspectedWindow
    chrome.devtools.inspectedWindow.eval(
      `
      (function(){
        var matmanLogger = console.log;
        console.log = proxyConsole;
        var module = {};
        var useJquery = window.webCrawlUtil && window.webCrawlUtil.useJquery;
        var result;
        ${code};
        try {
          if(typeof module.exports==='function'){
            result = module.exports();
          }

          console.log = matmanLogger;
        } catch(e) {
          console.log = matmanLogger;
          throw e;
        }
        return result;
      })()
      `,
      { useContentScriptContext: true },
      (result, isException) => {
        // 只会在该 devtools.html 的 console 中出现
        console.log(result, isException);

        // 在 matman console 中打印
        handelConsole(result || isException);
      }
    );
  };

  return (
    <Layout.Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography.Title className={styles.title}>Matman</Typography.Title>
      <Tooltip title="请务必在代码中指定一个 module.exports 函数">
        <Button type="primary" onClick={exec}>
          执行
        </Button>
      </Tooltip>
      <Button onClick={handleFullPage} style={{ marginLeft: '20px' }}>
        {fullPage ? '退出全屏' : '进入全屏'}
      </Button>
      <Button
        type="link"
        style={{ marginLeft: '20px' }}
        onClick={() => {
          window.open('https://matmanjs.github.io/matman/');
        }}
      >
        文档
      </Button>
    </Layout.Header>
  );
};

export default Index;
