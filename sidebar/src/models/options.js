import { useState } from 'react';
import { createModel } from 'hox';

function useOptions() {
  // 使用风格
  const [frameStyle, setFrameStyle] = useState(1);

  // 选择器变量名称
  const [selectorName, setSelectorName] = useState('');

  // 父级选择器名称
  const [parentName, setParentName] = useState('');

  // 父级选择器列表
  const [parentList, setParentList] = useState(['body', 'body #root']);
  const [selectIndex, setSelectIndex] = useState(1);

  const handleChangeFrameStyle = (val) => {
    setSelectorName('');
    setParentName('');
    setFrameStyle(val);
  };

  return {
    frameStyle,
    handleChangeFrameStyle,
    selectorName,
    setSelectorName,
    parentName,
    setParentName,
    parentList,
    setParentList,
    selectIndex,
    setSelectIndex,
  };
}

export default createModel(useOptions);
