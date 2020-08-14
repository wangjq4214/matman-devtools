import { useState } from 'react';
import { createModel } from 'hox';

function useSelector() {
  // 元素跟踪
  const [name, setName] = useState('body');
  const [detail, setDetail] = useState({
    text: '',
    exist: '',
    total: '',
  });

  return {
    name,
    setName,
    detail,
    setDetail,
  };
}

export default createModel(useSelector);
