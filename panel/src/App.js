/*global chrome*/
import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Header from './components/Header';
import Options from './components/Main';
import useConsoleModel from './models/console';

function App() {
  const { handelConsole } = useConsoleModel();

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (message) {
      console.log(
        '[panel-sidbar.js][listenMsgFromContentScript] receive message',
        message
      );
      if (message.type === 'SEND_MESSAGE_PROXY_CONSOLE_LOG') {
        handelConsole(message.data);
      }
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
