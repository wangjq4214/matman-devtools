/*global chrome*/
import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Header from './components/Header';
import Options from './components/Main';
import useSelectorModel from './models/selector';

const elements = chrome.devtools.panels.elements;

function App() {
  const { setName, setDetail } = useSelectorModel();

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
      setName(message.data.selector);
      setDetail(message.data.info);
    });
  }, []);


  return (
    <Layout>
      <Header />
      <Options />
      <Layout.Footer style={{ textAlign: 'center' }}>
        Matman ©2020 Created by Matmanjs
      </Layout.Footer>
    </Layout>
  );
}

export default App;
