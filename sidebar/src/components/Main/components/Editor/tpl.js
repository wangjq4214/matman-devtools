import template from 'lodash.template';

const JQuery = `// [元素选择器]
const selector = "<%= name %>";

<% if (type.text) { %>// [文本内容]： <%= detail.text %>
const text = $.trim($('<%= name %>').text());<% } %>

<% if (type.length) { %>// [匹配个数]： <%= detail.total %>
const total = $('<%= name %>').children().length;<% } %>

// [是否存在]： <%= detail.exist %>
const isExist = $('<%= name %>').length > 0;`;

const utils = `// [元素选择器]
const selector = "<%= name %>";

<% if (type.text) { %>// [文本内容]： <%= detail.text %>
const text = useJquery.getText("<%= name %>");<% } %>

<% if (type.length) { %>// [匹配个数]： <%= detail.total %>
const total = useJquery.getTotal("<%= name %>");<% } %>

// [是否存在]： <%= detail.exist %>
const isExist = useJquery.isExist("<%= name %>");`;

class JQueryTpl {
  constructor(type) {
    this.type = type;
  }

  run(name, detail) {
    const res = template(JQuery);
    return res({ name, detail, type: this.type });
  }
}

class UtilsTpl {
  constructor(type) {
    this.type = type;
  }

  run(name, detail) {
    const res = template(utils);
    return res({ name, detail, type: this.type });
  }
}

export class Tpl {
  constructor(frame = 2, opts, type) {
    this.name = opts.name;
    this.detail = opts.detail;
    if (frame === 1) {
      this.frameTpl = new JQueryTpl(type);
    } else {
      this.frameTpl = new UtilsTpl(type);
    }
  }

  run() {
    return this.frameTpl.run(this.name, this.detail);
  }
}
