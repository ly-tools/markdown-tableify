'use strict';

const capitalize = require('capitalize');
const defaults = require('lodash.defaults');
const forEach = require('lodash.foreach');

const DEFAULT_CONFIG = {
  headers: null
};

module.exports = (data, config) => {
  if (!Array.isArray(data)) throw new Error('markdown-tableify: Data must be array of object.');
  config = defaults(config || {}, DEFAULT_CONFIG);
  if (!config.headers) {
    let headers = [];
    forEach(data[0] || {}, (value, key) => headers.push({
      name: key
    }));
    config.headers = headers;
  }
  let $rows = [];
  $rows.push(`| ${config.headers.map(hd => `${hd.title || capitalize(hd.name)}`).join(' | ')} |`);
  $rows.push(`| ${config.headers.map(hd => `${hd.align || ':---:'}`).join(' | ')} |`);
  $rows = $rows.concat(data.map(rowData => {
    let $tds = config.headers.map(hd => `${(rowData[hd.name] || '').toString().replace(/[\n]/g, ' ') || ''}`);
    return `| ${$tds.join(' | ')} |`;
  }));
  return $rows.join('\n');
};
