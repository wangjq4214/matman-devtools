// [元素选择器]： #expTable .head th:nth-child(2)
const selector = "#expTable .head th:nth-child(2)";

// [文本内容]： 期初余额
const text = useJquery.getText("#expTable .head th:nth-child(2)");

// [匹配个数]： 1
const total = useJquery.getTotal("#expTable .head th:nth-child(2)");

// [是否存在]： true
const isExist = useJquery.isExist("#expTable .head th:nth-child(2)");