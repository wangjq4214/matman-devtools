import React from 'react';
import { Typography, Radio, Input } from 'antd';
import useOptionsModel from '../../../../models/options';

import styles from './index.module.less';

const Select = () => {
  const { selectorName, setSelectorName } = useOptionsModel();

  return (
    <>
      <Typography.Title level={4}>变量名</Typography.Title>
      <Input
        addonBefore="选择器变量名"
        placeholder="请输入选择器变量名"
        defaultValue={selectorName}
        onChange={(e) => {
          setSelectorName(e.target.value);
        }}
      />
    </>
  );
};

const Parent = () => {
  const {
    parentSelectorName,
    setParentSelectorName,
    selectedParentSelector,
    setSelectedParentSelector,
    selector,
  } = useOptionsModel();

  const parentSelectorList = getParentSelectorList(selector);

  return (
    <>
      <div className={styles.area}>
        <Typography.Title level={4}>父级变量名</Typography.Title>
        <Input
          addonBefore="父级变量名"
          placeholder="请输入父级变量名"
          defaultValue={parentSelectorName}
          onChange={(e) => {
            setParentSelectorName(e.target.value);
          }}
        />
      </div>

      <Typography.Title level={4}>父级</Typography.Title>
      <Radio.Group
        value={selectedParentSelector || parentSelectorList[0]}
        defaultValue={parentSelectorList[0]}
        onChange={(e) => setSelectedParentSelector(e.target.value)}
      >
        {parentSelectorList.map((item, index) => {
          return (
            <Radio key={item} value={item}>
              {item}
            </Radio>
          );
        })}
      </Radio.Group>
    </>
  );
};

const Index = () => {
  const {
    codeStyleType,
    handleChangeCodeStyleType,
    selectorName,
    parentSelectorName,
    webCrawlUtilVersion,
  } = useOptionsModel();

  const changeFrameWork = (e) => {
    handleChangeCodeStyleType(e.target.value);
  };

  // 选择器填写区域
  let main = null;

  if (codeStyleType === 2) {
    main = <Select />;
  } else if (codeStyleType === 3) {
    main = <Parent />;
  }

  return (
    <>
      <div>
        <Typography.Title level={4}>
          matman 爬虫小助手，请选择风格（web-crawl-util v{webCrawlUtilVersion}）
        </Typography.Title>
        <Radio.Group value={codeStyleType} onChange={changeFrameWork}>
          <Radio value={1}>默认</Radio>
          <Radio value={2}>使用变量</Radio>
          <Radio value={3}>包含父级变量</Radio>
        </Radio.Group>
      </div>
      <div>{main}</div>
    </>
  );
};

function getParentSelectorList(selector = '') {
  const arr = selector.split(/\s+/);

  const actualSelectorArr = [];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i].trim();
    if (item) {
      actualSelectorArr.push(item);
  
      if (!result.length) {
        result.push(item);
      } else {
        result.push(`${result[result.length - 1]} ${item}`);
      }
    }
  }

  return result.filter(
    (item) => !/>$/.test(item) && item !== actualSelectorArr.join(' ')
  );
}

export default Index;
