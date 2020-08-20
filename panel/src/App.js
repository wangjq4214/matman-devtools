/*global chrome*/
import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Header from './components/Header';
import Options from './components/Main';

function App() {
  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (message) {
      console.log(
        '[panel-sidbar.js][listenMsgFromContentScript] receive message',
        message
      );
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
