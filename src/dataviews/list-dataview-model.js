var Backbone = require('backbone');
var DataviewModelBase = require('./dataview-model-base');

module.exports = DataviewModelBase.extend({
  options: {
    page: 0,
    per_page: 100
  },

  initialize: function (attrs, opts) {
    DataviewModelBase.prototype.initialize.call(this, attrs, opts);
    this._data = new Backbone.Collection(this.get('data'));
    this.on('change:columns change:columns_title', this._reloadMap, this);
  },

  getData: function () {
    return this._data;
  },

  getSize: function () {
    return this._data.size();
  },

  parse: function (data) {
    var rows = data.rows;
    this._data.reset(rows);
    return {
      data: rows
    };
  },

  toJSON: function () {
    return {
      type: 'list',
      options: {
        columns: this.get('columns')
      }
    };
  }
});
