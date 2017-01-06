"use strict";

var React = require('react');
var Helpers = require('../mixins/Helpers');

var Element = React.createClass({
  mixins: [Helpers.Element],
  render: function () {
    /*
     * Not sure if should allow more then one property?
     */

    var className = this.props.className || "";

    var props = {
      className: this.props.className
    };

    return React.DOM.div(props, this.props.children);
  }
});

module.exports = Element;
