import { useState } from 'react';
import { createModel } from 'hox';

const CODE_STYLE_TYPE = {
  DEFAULT: 1,
  SELECTOR: 2,
  PARENT: 3,
};

const headerHeightMap = {
  [CODE_STYLE_TYPE.DEFAULT]: 130 - 10,
  [CODE_STYLE_TYPE.SELECTOR]: 200 - 10,
  [CODE_STYLE_TYPE.PARENT]: 300 - 10,
};

function useOptions() {
  // 代码风格
  const [codeStyleType, setCodeStyleType] = useState(1);

  // 选择器变量名称
  const [selectorName, setSelectorName] = useState('selector');

  // 父级选择器名称
  const [parentSelectorName, setParentSelectorName] = useState(
    'parentSelector'
  );

  // editor height
  const [editorHeight, setEditorHeight] = useState(
    document.body.offsetHeight - headerHeightMap[codeStyleType]
  );

  // 当前选中的 selector
  const [selector, setSelector] = useState('');

  // web-crawl-util 版本号
  const [webCrawlUtilVersion, setWebCrawlUtilVersion] = useState('');

  // 父级选择器列表
  const [selectedParentSelector, setSelectedParentSelector] = useState('');

  const handleChangeCodeStyleType = (val) => {
    setCodeStyleType(val);

    // 每次切换代码风格时，重新计算代码编辑区域的高度
    // TODO 这里需要更智能判断，包括浏览器大小变动
    const editorHeight = document.body.offsetHeight - headerHeightMap[val];
    setEditorHeight(editorHeight);
  };

  return {
    codeStyleType,
    handleChangeCodeStyleType,
    selectorName,
    setSelectorName,
    parentSelectorName,
    setParentSelectorName,
    selectedParentSelector,
    setSelectedParentSelector,
    editorHeight,
    setEditorHeight,
    selector,
    setSelector,
    webCrawlUtilVersion,
    setWebCrawlUtilVersion,
  };
}

export default createModel(useOptions);
