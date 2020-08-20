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
    parentName,
    setParentName,
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
          defaultValue={parentName}
          onChange={(e) => {
            setParentName(e.target.value);
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
            <React.Fragment key={item}>
              <Radio value={index + 1}>{item}</Radio>
              <br />
            </React.Fragment>
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
    parentName,
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
        <Typography.Title level={4}>选择风格</Typography.Title>
        <Radio.Group value={frameStyle} onChange={changeFrameWork}>
          <Radio value={1}>默认</Radio>
          <Radio value={2}>变量</Radio>
          <Radio value={3}>包含父级</Radio>
        </Radio.Group>
      </div>
      <div>{main}</div>
      <div>
        {selectorName}-{parentName}
      </div>
    </>
  );
};

export default Index;
