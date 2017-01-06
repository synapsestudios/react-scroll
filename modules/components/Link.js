"use strict";

var React = require('react');
var Helpers = require('../mixins/Helpers');

var Link = React.createClass({
  mixins: [Helpers.Scroll],
  getInitialState : function() {
    return { active : false};
  },
  getDefaultProps: function() {
    return {
      className: "",
      tabIndex: 0
    };
  },
  render: function () {

    var activeClass = this.state.active ? (this.props.activeClass || "active") : "";

    var props = {
      onClick : this.onClick,
      className : [this.props.className, activeClass].join(" ").trim(),
      tabIndex : this.props.tabIndex
    };

    return React.DOM.a(props, this.props.children);
  }
});

module.exports = Link;
