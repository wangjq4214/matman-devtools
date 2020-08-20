/*global chrome*/
import React, { useEffect } from 'react';
import { Layout } from 'antd';

import Main from './components/Main';
import useCodeModel from './models/code';
import useOptionsModel from './models/options';

const elements = chrome.devtools.panels.elements;

function App() {
  const { setCode } = useCodeModel();
  const { setWebCrawlUtilVersion, setSelector } = useOptionsModel();

  // 注意，只能执行一次！！！！
  useEffect(() => {
    const updateSelectElement = () => {
      chrome.devtools.inspectedWindow.eval('setSelectedElement($0)', {
        useContentScriptContext: true,
      });
    };
    // 选择的元素变化时
    // https://developer.chrome.com/extensions/devtools_panels#method-ExtensionSidebarPane-onSelectionChanged
    elements.onSelectionChanged.addListener(updateSelectElement);
    chrome.runtime.onMessage.addListener(function (message) {
      console.log(
        '[panel-sidbar.js][listenMsgFromContentScript] receive message',
        message
      );
      if (
        message.type === 'CONTENT_SCRIPT_SEND_MESSAGE_AFTER_SELECTED_ELEMENT'
      ) {
        setSelector(message.data.selector);
        setWebCrawlUtilVersion(message.data.info.webCrawlUtilVersion);
        setCode(message.data.info.sampleCode);
      }
    });
  }, []);

  return (
    <Layout>
      <Main />
    </Layout>
  );
}

export default App;
