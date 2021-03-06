import React, { useRef, useEffect } from 'react';
import { Console } from 'console-feed';
import useConsoleModel from '../../../../models/console';

const Index = () => {
  const { consoleData } = useConsoleModel();

  const scrollDiv = useRef();

  useEffect(() => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollTop = scrollDiv.current?.scrollHeight;
    }
  }, [JSON.stringify(consoleData)]);

  return (
    <div
      ref={(el) => (scrollDiv.current = el)}
      style={{
        width: 300,
        height: '100%',
        backgroundColor: '#242424',
        overflow: 'scroll',
      }}
    >
      <Console logs={consoleData} variant="dark" />
    </div>
  );
};

export default Index;
