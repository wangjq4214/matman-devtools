import { useState } from 'react';
import { createModel } from 'hox';

function useCode() {
  // 元素跟踪
  const [code, setCode] = useState('// 请点击 Elements 下的 DOM 元素，点击之后此处会自动出现推荐代码');

  return {
    code,
    setCode,
  };
}

export default createModel(useCode);
