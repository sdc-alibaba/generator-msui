'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  a: function() {
    this.log('aa')
  },
  b: function() {
    this.log.ok(this.sourceRoot());
  }

});
