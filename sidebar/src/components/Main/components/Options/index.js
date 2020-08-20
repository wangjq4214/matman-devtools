import React from 'react';
import { Typography, Radio, Divider, Input } from 'antd';
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
    parentList,
    selectIndex,
    setSelectIndex,
  } = useOptionsModel();

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
        value={selectIndex}
        onChange={(e) => setSelectIndex(e.target.value)}
      >
        {parentList.map((item, index) => {
          return (
            <Radio key={item} value={index + 1}>
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
    frameStyle,
    handleChangeFrameStyle,
    selectorName,
    parentSelectorName,
    webCrawlUtilVersion,
  } = useOptionsModel();

  const changeFrameWork = (e) => {
    handleChangeFrameStyle(e.target.value);
  };

  // 选择器填写区域
  let main = null;

  if (frameStyle === 2) {
    main = <Select />;
  } else if (frameStyle === 3) {
    main = <Parent />;
  }

  return (
    <>
      <div>
        <Typography.Title level={4}>
          matman 爬虫小助手，请选择风格（web-crawl-util v{webCrawlUtilVersion}）
        </Typography.Title>
        <Radio.Group value={frameStyle} onChange={changeFrameWork}>
          <Radio value={1}>默认</Radio>
          <Radio value={2}>使用变量</Radio>
          <Radio value={3}>包含父级变量</Radio>
        </Radio.Group>
      </div>
      <div>{main}</div>
      <div>
        {selectorName}-{parentSelectorName}
      </div>
    </>
  );
};

export default Index;
