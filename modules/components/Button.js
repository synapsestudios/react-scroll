"use strict";

var React = require('react');
var Helpers = require('../mixins/Helpers');

var Button = React.createClass({
  mixins: [Helpers.Scroll],
  getInitialState : function() {
    return { active : false};
  },
  render: function () {
    var props = {
      onClick: this.onClick
    };

    return React.DOM.input(props, this.props.children);
  }
});

module.exports = Button;
