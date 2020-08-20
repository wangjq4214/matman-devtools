import { useState } from 'react';
import { createModel } from 'hox';

const STYLE_TYPE = {
  DEFAULT: 1,
  SELECTOR: 2,
  PARENT: 3,
};

const headerHeightMap = {
  [STYLE_TYPE.DEFAULT]: 130 - 10,
  [STYLE_TYPE.SELECTOR]: 200 - 10,
  [STYLE_TYPE.PARENT]: 300 - 10,
};

function useOptions() {
  // 使用风格
  const [frameStyle, setFrameStyle] = useState(1);

  // 选择器变量名称
  const [selectorName, setSelectorName] = useState('selector');

  // 父级选择器名称
  const [parentSelectorName, setParentSelectorName] = useState(
    'parentSelector'
  );

  // editor height
  const [editorHeight, setEditorHeight] = useState(
    document.body.offsetHeight - headerHeightMap[frameStyle]
  );

  // 当前选中的 selector
  const [selector, setSelector] = useState('');

  // web-crawl-util 版本号
  const [webCrawlUtilVersion, setWebCrawlUtilVersion] = useState('');

  // 父级选择器列表
  const [parentList, setParentList] = useState(['body', 'body #root']);
  const [selectIndex, setSelectIndex] = useState(1);

  const handleChangeFrameStyle = (val) => {
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
    parentSelectorName,
    setParentSelectorName,
    parentList,
    setParentList,
    selectIndex,
    setSelectIndex,
    editorHeight,
    setEditorHeight,
    selector,
    setSelector,
    webCrawlUtilVersion,
    setWebCrawlUtilVersion,
  };
}

export default createModel(useOptions);
