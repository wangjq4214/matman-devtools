import { useState } from 'react';
import { createModel } from 'hox';

const headerHeightMap = {
  1: 130,
  2: 200,
  3: 300,
};

function useOptions() {
  // 使用风格
  const [frameStyle, setFrameStyle] = useState(1);

  // 选择器变量名称
  const [selectorName, setSelectorName] = useState('');

  // 父级选择器名称
  const [parentName, setParentName] = useState('');

  // editor height
  const [editorHeight, setEditorHeight] = useState(document.body.offsetHeight - headerHeightMap[frameStyle]);

  // 父级选择器列表
  const [parentList, setParentList] = useState(['body', 'body #root']);
  const [selectIndex, setSelectIndex] = useState(1);

  const handleChangeFrameStyle = (val) => {
    setSelectorName('');
    setParentName('');
    setFrameStyle(val);

    // 每次切换代码风格时，重新计算代码编辑区域的高度
    // TODO 这里需要更智能判断，包括浏览器大小变动
    const editorHeight = document.body.offsetHeight - headerHeightMap[val];
    setEditorHeight(editorHeight);
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
    editorHeight,
    setEditorHeight,
  };
}

export default createModel(useOptions);
