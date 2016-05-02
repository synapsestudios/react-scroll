"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var animateScroll = require('./animate-scroll');
var scrollSpy = require('./scroll-spy');
var scroller = require('./scroller');

var __deferredScrollDestination = '';
var __deferredScrollOffset = 0;

var Helpers = {

  Scroll: {

    propTypes: {
      to: React.PropTypes.string.isRequired,
      offset: React.PropTypes.number
    },

    getDefaultProps: function() {
      return {offset: 0};
    },

    scrollTo : function(to) {
      scroller.scrollTo(to, this.props.smooth, this.props.duration, this.props.offset);
    },

    onClick: function(event) {

      /*
       * give the posibility to override onClick
       */

      if(this.props.onClick) {
        this.props.onClick(event);
      }

      /*
       * dont bubble the navigation
       */

      if (event.stopPropagation) event.stopPropagation();
      if (event.preventDefault) event.preventDefault();

      /*
       * do the magic!
       */

      this.scrollTo(this.props.to);

    },

    componentDidMount: function() {
      scrollSpy.mount();

      if(this.props.spy) {
        var to = this.props.to;
        var element = null;
        var elemTopBound = 0;
        var elemBottomBound = 0;

        scrollSpy.addStateHandler((function() {
          if(scroller.getActiveLink() != to) {
              this.setState({ active : false });
          }
        }).bind(this));

        scrollSpy.addSpyHandler((function(y) {

          if(! element) {
              element = scroller.get(to);
          }

          if (! element) {
            return;
          }

          var cords = element.getBoundingClientRect();
          elemTopBound = Math.floor(cords.top + y);
          elemBottomBound = elemTopBound + cords.height;
          var offsetY = y - this.props.offset;
          var isInside = (offsetY >= elemTopBound && offsetY <= elemBottomBound);
          var isOutside = (offsetY < elemTopBound || offsetY > elemBottomBound);
          var activeLnik = scroller.getActiveLink();

          if (isOutside && activeLnik === to) {

            scroller.setActiveLink(void 0);
            this.setState({ active : false });

          } else if (isInside && activeLnik != to) {

            scroller.setActiveLink(to);
            this.setState({ active : true });
            if(this.props.onSetActive) this.props.onSetActive(to);
            scrollSpy.updateStates();
          }
        }).bind(this));

        if (scroller.getActiveLink() === this.props.to) {
          this.setState({ active : true });
        }
      }
    },
    componentWillUnmount: function() {
      scrollSpy.unmount();
    }
  },


  Element: {
    propTypes: {
      name: React.PropTypes.string.isRequired
    },
    componentDidMount: function() {
      scroller.register(this.props.name, ReactDOM.findDOMNode(this));
      if (__deferredScrollDestination === this.props.name) {
        window.setTimeout(function(){
            scroller.scrollTo(__deferredScrollDestination, false, 0, __deferredScrollOffset);
            __deferredScrollDestination = '';
            __deferredScrollOffset = 0;
        });
      }
      scrollSpy.scrollHandler();
    },
    componentWillUnmount: function() {
      scroller.unregister(this.props.name);
    }
  },

  DeferredScroll: {
    deferredScrollTo: function(desination, offset) {
        __deferredScrollDestination = desination;
        __deferredScrollOffset = offset || 0;
    }
  }
};

module.exports = Helpers;

