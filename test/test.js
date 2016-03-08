'use strict';

require('should');
const tableify = require('../index');

describe('markdown-tableify', () => {
  it('Normal', () => {
    return tableify([{
      name: 'optionalArray',
      description: 'Description of optionalArray.',
      required: '',
      type: 'array',
      defaultValue: '[]'
    }, {
      name: 'optionalBool',
      description: 'Description of optionalBool.',
      required: '',
      type: 'bool',
      defaultValue: 'false'
    }], {
      headers: [{
        name: 'name',
        align: ':---',
        title: 'Your Name'
      }, {
        name: 'description',
        align: ':-----'
      }, {
        name: 'type',
        align: ':---'
      }, {
        name: 'required',
        align: ':---:'
      }, {
        name: 'defaultValue',
        align: ':---:',
        title: 'Default Value'
      }]
    }).trim().should.be.eql(`
| Your Name | Description | Type | Required | Default Value |
| :--- | :----- | :--- | :---: | :---: |
| optionalArray | Description of optionalArray. | array |  | [] |
| optionalBool | Description of optionalBool. | bool |  | false |
    `.trim());
  });
  it('Multiline', () => {
    return tableify([{
      name: 'multiline',
      description: 'Description of multiline.\nDescription of multiline.\nDescription of multiline.',
      required: '',
      type: 'array',
      defaultValue: '[]'
    }]).trim().should.be.eql(`
| Name | Description | Required | Type | DefaultValue |
| :---: | :---: | :---: | :---: | :---: |
| multiline | Description of multiline. Description of multiline. Description of multiline. |  | array | [] |
    `.trim());
  });
  it('No headers', () => {
    return tableify([{
      name: 'optionalArray',
      description: 'Description of optionalArray.',
      required: '',
      type: 'array',
      defaultValue: '[]'
    }, {
      name: 'optionalBool',
      description: 'Description of optionalBool.',
      required: '',
      type: 'bool',
      defaultValue: 'false'
    }]).trim().should.be.eql(`
| Name | Description | Required | Type | DefaultValue |
| :---: | :---: | :---: | :---: | :---: |
| optionalArray | Description of optionalArray. |  | array | [] |
| optionalBool | Description of optionalBool. |  | bool | false |
    `.trim());
  });
  it('Error when no data', () => {
    return (() => {
      tableify();
    }).should.throw(Error, {
      message: 'markdown-tableify: Data must be array of object.'
    });
  });
  it('Empty', () => {
    return (() => {
      tableify([]);
    }).should.not.throw(Error);
  });
});
