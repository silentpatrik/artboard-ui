'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React$1 = require('react');
var uuid = require('uuid');
var Scrollbars = require('react-custom-scrollbars');
var reactTippy = require('react-tippy');
require('react-tippy/dist/tippy.css');
var SortableTree = require('react-sortable-tree');
require('react-sortable-tree/style.css');
var index_esm = require('react-sortable-tree/dist/index.esm');
var reactColor = require('react-color');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
var Scrollbars__default = /*#__PURE__*/_interopDefaultLegacy(Scrollbars);
var SortableTree__default = /*#__PURE__*/_interopDefaultLegacy(SortableTree);

const calculate = (val1, val2, operation) => {
  if (!val1) return parseFloat(operation + val2);
  if (!val2) return parseFloat(val1);
  val1 = parseFloat(val1);
  val2 = parseFloat(val2);
  if (operation === '+') return val1 + val2;
  if (operation === '-') return val1 - val2;
  if (operation === '*') return val1 * val2;
  if (operation === '/') return val1 / val2;
};
const isCharacterALetter = char => {
  return /[a-zA-Z]/.test(char);
};
const getUnique = () => {
  return uuid.v4();
};
const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};
const genItemUrl = id => {
  return `https://cdn.artboard.studio/artboard/items/${id}/raw-preview.png`;
};
const isMacOs = () => {
  return navigator.userAgent.indexOf('Mac OS X') !== -1;
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$O = ".input-module_input__3k4oC {\n  border: 1px solid #e8ebed;\n  box-sizing: border-box;\n  border-radius: 8px;\n  display: flex;\n  justify-content: left;\n  align-items: center;\n  overflow: hidden;\n  background-color: #f5f5f5; }\n  .input-module_input__3k4oC * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    user-select: none; }\n  .input-module_input__3k4oC.input-module_right__3AGuV input {\n    text-align: left; }\n  .input-module_input__3k4oC.input-module_left__29lN4 {\n    flex-direction: row-reverse; }\n    .input-module_input__3k4oC.input-module_left__29lN4 input {\n      padding-left: 2px; }\n  .input-module_input__3k4oC input {\n    border: 0;\n    color: #31363a;\n    background: transparent; }\n    .input-module_input__3k4oC input:focus {\n      outline: 0; }\n  .input-module_input__3k4oC label {\n    font-family: Aktiv Grotesk, sans-serif;\n    width: 24px;\n    height: 32px;\n    font-size: 12px;\n    line-height: 32px;\n    color: #b6babd;\n    display: flex;\n    align-items: center;\n    justify-content: center; }\n    .input-module_input__3k4oC label > svg {\n      margin-left: 3px; }\n  .input-module_input__3k4oC.input-module_normal__3iBT3 {\n    width: 64px;\n    height: 32px; }\n    .input-module_input__3k4oC.input-module_normal__3iBT3 input {\n      width: 40px;\n      height: 32px;\n      font-size: 12px;\n      line-height: 24px;\n      padding-left: 8px; }\n  .input-module_input__3k4oC:hover {\n    border: 1px solid #b6babd;\n    box-sizing: border-box; }\n  .input-module_input__3k4oC [type='text']:focus,\n  .input-module_input__3k4oC [type='password']:focus,\n  .input-module_input__3k4oC [type='number']:focus,\n  .input-module_input__3k4oC [type='email']:focus,\n  .input-module_input__3k4oC [type='search']:focus {\n    color: #31363a; }\n  .input-module_input__3k4oC:focus-within {\n    border: 1px solid #3399ff; }\n    .input-module_input__3k4oC:focus-within label {\n      color: #3399ff; }\n";
var style$K = {"input":"input-module_input__3k4oC","right":"input-module_right__3AGuV","left":"input-module_left__29lN4","normal":"input-module_normal__3iBT3"};
styleInject(css_248z$O);

/* eslint-disable react-hooks/exhaustive-deps */
const Input = ({
  direction = 'right',
  label = 'x',
  size = 'normal',
  type = 'default',
  children = null,
  onChange = () => {},
  onChangeState = null,
  value = '',
  setValue,
  className = null,
  placeholder = ''
}) => {
  const {
    input
  } = style$K;
  !setValue ? setValue : [value, setValue] = React$1.useState(value);

  const inputChangeHandler = ({
    target: {
      value
    }
  }) => {
    // if (onChange) onChange(value);
    // if (onChangeState) onChangeState(true);
    setValue(value);
  };

  const handleFocus = event => event.target.select();

  const ArrowKeyUpDown = event => {
    const {
      code,
      shiftKey
    } = event;

    if (type !== 'string') {
      validateNumber(value);

      if (code === 'ArrowUp') {
        // if (onChangeState) onChangeState(true);
        // if (onChange) onChange(parseFloat(value) + (shiftKey ? 10 : 1));
        setValue(parseFloat(value) + (shiftKey ? 10 : 1));
      } else if (code === 'ArrowDown') {
        // if (onChangeState) onChangeState(true);
        // if (onChange) onChange(parseFloat(value) - (shiftKey ? 10 : 1));
        setValue(parseFloat(value) - (shiftKey ? 10 : 1));
      } else if (code === 'Enter' || code === 'NumpadEnter') {
        calcInput(); // if (onChangeState) onChangeState(true);
        // if (onChange) onChange(value);
      }
    }
  };

  const calcInput = () => {
    if (value && type !== 'string') {
      const inputVal = value.toString();
      const operations = ['+', '-', '*', '/'];
      validateNumber(inputVal);
      operations.map(value => {
        if (inputVal && inputVal.split(value).length === 2) {
          let _res = inputVal.split(value);

          if (!_res[0]) setValue(parseFloat(value + _res[1]));
          setValue(calculate(_res[0], _res[1], value));
        }

        return value;
      });
    }
  };

  const validateNumber = data => {
    if (isCharacterALetter(data)) setValue(0);
  };

  React$1.useEffect(() => {
    if (size === 'noStyle') {
      onChange(value);
    } else if (!value || value === '') {
      setValue(0);
      onChange(0);
    } else onChange(parseFloat(value));
  }, [value]);
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, size === 'noStyle' ? /*#__PURE__*/React__default['default'].createElement("input", {
    type: "text",
    onFocus: handleFocus,
    onKeyUp: ArrowKeyUpDown,
    value: value,
    onBlur: calcInput,
    onChange: inputChangeHandler,
    className: `${className ? className : ''}`,
    placeholder: placeholder
  }) : /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${className ? className : ''} ${input} ${style$K[size]} ${style$K[direction]}`
  }, label || children ? /*#__PURE__*/React__default['default'].createElement("input", {
    type: "text",
    onFocus: handleFocus,
    onKeyDown: ArrowKeyUpDown,
    value: value,
    onBlur: calcInput,
    onChange: inputChangeHandler
  }) : null, /*#__PURE__*/React__default['default'].createElement("label", null, children ? children : label)));
};

var css_248z$N = ".iconButton-module_btn__1Xikn {\n  font-family: aktiv-grotesk, sans-serif;\n  box-sizing: border-box;\n  outline: none;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 0;\n  cursor: pointer; }\n  .iconButton-module_btn__1Xikn.iconButton-module_white__6dVau {\n    background-color: #ffffff; }\n  .iconButton-module_btn__1Xikn.iconButton-module_gray__1lziB {\n    background-color: #f7f9fa; }\n  .iconButton-module_btn__1Xikn:hover, .iconButton-module_btn__1Xikn.iconButton-module_active__3ZrO_ {\n    background: #f2f4f5; }\n  .iconButton-module_btn__1Xikn.iconButton-module_active__3ZrO_ {\n    border: 1px solid #3399ff; }\n    .iconButton-module_btn__1Xikn.iconButton-module_active__3ZrO_ svg rect {\n      fill: #333333; }\n  .iconButton-module_btn__1Xikn.iconButton-module_normal__1YN9Y {\n    width: 32px;\n    height: 32px; }\n  .iconButton-module_btn__1Xikn.iconButton-module_small__1eSuR {\n    width: 24px;\n    height: 24px; }\n";
var style$J = {"btn":"iconButton-module_btn__1Xikn","white":"iconButton-module_white__6dVau","gray":"iconButton-module_gray__1lziB","active":"iconButton-module_active__3ZrO_","normal":"iconButton-module_normal__1YN9Y","small":"iconButton-module_small__1eSuR"};
styleInject(css_248z$N);

const IconButton = ({
  children,
  disable = false,
  isActive = false,
  onClick = null,
  className = null,
  size = 'normal',
  color = 'white'
}) => {
  const {
    btn,
    active
  } = style$J;
  return /*#__PURE__*/React__default['default'].createElement("button", {
    onClick: onClick,
    className: `icon-btn ${btn} ${style$J[size]} ${style$J[color]} ${isActive ? active : ''} ${className ? className : ''}`,
    disabled: disable
  }, children);
};

const ShareIcon = ({
  width = 15,
  height = 13
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 15 13`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 8v2a3 3 0 003 3h9a3 3 0 003-3V8h-1v2a2 2 0 01-2 2H3a2 2 0 01-2-2V8H0z",
    fill: "#fff"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M7.5 9V1m0 0L10 3.5M7.5 1L5 3.5",
    stroke: "#fff",
    strokeLinecap: "round"
  }));
};

var css_248z$M = ".shareButton-module_shareBtn__bxF0X {\n  width: 24px;\n  height: 24px;\n  background-color: #3399ff;\n  box-sizing: border-box;\n  outline: none;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 0;\n  cursor: pointer; }\n";
var style$I = {"shareBtn":"shareButton-module_shareBtn__bxF0X"};
styleInject(css_248z$M);

const ShareButton = ({
  disable = false,
  isActive = false,
  onClick = null,
  className = null
}) => {
  const {
    shareBtn,
    active
  } = style$I;
  return /*#__PURE__*/React__default['default'].createElement("button", {
    onClick: onClick,
    className: `${shareBtn} ${isActive ? active : ''} ${className ? className : ''}`,
    disabled: disable
  }, /*#__PURE__*/React__default['default'].createElement(ShareIcon, null));
};

var css_248z$L = ".toolbar-zoom-module_toolbarZoom__ecekb {\n  width: 56px;\n  height: 24px;\n  background-color: #e8ebed;\n  box-sizing: border-box;\n  outline: none;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 0;\n  cursor: pointer; }\n  .toolbar-zoom-module_toolbarZoom__ecekb.toolbar-zoom-module_active__ypORY {\n    border: 1px solid #3399ff; }\n";
var style$H = {"toolbarZoom":"toolbar-zoom-module_toolbarZoom__ecekb","active":"toolbar-zoom-module_active__ypORY"};
styleInject(css_248z$L);

const ToolbarZoom = ({
  disable = false,
  isActive = false,
  onClick = null,
  className = null
}) => {
  const {
    toolbarZoom,
    active
  } = style$H;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    onClick: onClick,
    className: `${toolbarZoom} ${isActive ? active : ''} ${className ? className : ''}`,
    disabled: disable
  });
};

const HamburgerIcon = ({
  width = 12,
  height = 9
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 12 9`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#333",
    strokeLinecap: "round",
    d: "M.5.5h11M.5 4.5h11M.5 8.5h11"
  }));
};

const PerspectiveIcon = ({
  width = 16,
  height = 18
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 16 18`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.75 9v5.5l-.75.211V9H1v-.75h7V3.289l.75.21V8.25H15V9H8.75z",
    fill: "#333"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.27 5.052l-12-3.375A1 1 0 001 2.64v12.72a1 1 0 001.27.963l12-3.375a1 1 0 00.73-.963v-5.97a1 1 0 00-.73-.963zM2.542.715A2 2 0 000 2.64v12.72a2 2 0 002.541 1.925l12-3.375A2 2 0 0016 11.985v-5.97a2 2 0 00-1.459-1.925l-12-3.375z",
    fill: "#333"
  }));
};

const RemoveBGIcon = ({
  width = 17,
  height = 19
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 17 19`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M1.06 16.253a.5.5 0 010-.707l8.486-8.485a.5.5 0 01.707 0l.707.707a.5.5 0 010 .707L2.475 16.96a.5.5 0 01-.707 0l-.707-.707z",
    stroke: "#333"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#333",
    strokeWidth: "9",
    d: "M3.889 12.01l2.121 2.122"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M6 0c0 3.2-2.667 4-4 4 3.2 0 4 2.667 4 4 0-3.2 2.667-4 4-4-3.2 0-4-2.667-4-4zM14 0c0 2.4-2 3-3 3 2.4 0 3 2 3 3 0-2.4 2-3 3-3-2.4 0-3-2-3-3zM14 9c0 1.6-1.333 2-2 2 1.6 0 2 1.333 2 2 0-1.6 1.333-2 2-2-1.6 0-2-1.333-2-2z",
    fill: "#333"
  }));
};

const WrapIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 16 16`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 3v10a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2H3a2 2 0 00-2 2zm2-3a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V3a3 3 0 00-3-3H3z",
    fill: "#333"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#333",
    strokeWidth: ".75",
    d: "M5.375 0v16M10.375 0v16M0 10.625h16M0 5.625h16"
  }));
};

var css_248z$K = ".top-menu-module_topMenu__1p30l {\n  width: 100%;\n  height: 40px;\n  background-color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  box-sizing: border-box;\n  padding: 4px 8px 4px 4px; }\n  .top-menu-module_topMenu__1p30l .top-menu-module_iconWrapper__36nvL {\n    width: 32px;\n    height: 32px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin-right: 16px; }\n  .top-menu-module_topMenu__1p30l .top-menu-module_leftSide__ehTxU {\n    display: flex;\n    align-items: center;\n    justify-content: space-between; }\n    .top-menu-module_topMenu__1p30l .top-menu-module_leftSide__ehTxU .top-menu-module_breadcrumbs__1eBtM {\n      min-width: 122px;\n      height: 24px;\n      display: flex;\n      align-items: center;\n      justify-content: space-around;\n      margin-left: 16px; }\n      .top-menu-module_topMenu__1p30l .top-menu-module_leftSide__ehTxU .top-menu-module_breadcrumbs__1eBtM span {\n        font-family: Aktiv Grotesk, sans-serif;\n        font-size: 11px;\n        line-height: 16px;\n        display: flex;\n        align-items: center;\n        color: #999999;\n        cursor: pointer; }\n        .top-menu-module_topMenu__1p30l .top-menu-module_leftSide__ehTxU .top-menu-module_breadcrumbs__1eBtM span.top-menu-module_active__34I7L {\n          color: #000408;\n          font-weight: 600; }\n  .top-menu-module_topMenu__1p30l .top-menu-module_middleSide__p1R4x {\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: center; }\n  .top-menu-module_topMenu__1p30l .top-menu-module_rightSide__Ob1B5 {\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between; }\n    .top-menu-module_topMenu__1p30l .top-menu-module_rightSide__Ob1B5 .top-menu-module_shareBtn__2oXRI {\n      margin-right: 8px; }\n";
var style$G = {"topMenu":"top-menu-module_topMenu__1p30l","iconWrapper":"top-menu-module_iconWrapper__36nvL","leftSide":"top-menu-module_leftSide__ehTxU","breadcrumbs":"top-menu-module_breadcrumbs__1eBtM","active":"top-menu-module_active__34I7L","middleSide":"top-menu-module_middleSide__p1R4x","rightSide":"top-menu-module_rightSide__Ob1B5","shareBtn":"top-menu-module_shareBtn__2oXRI"};
styleInject(css_248z$K);

const TopMenu = () => {
  const {
    topMenu,
    leftSide,
    middleSide,
    rightSide,
    breadcrumbs,
    shareBtn
  } = style$G;
  return /*#__PURE__*/React__default['default'].createElement("nav", {
    className: `${topMenu}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: leftSide
  }, /*#__PURE__*/React__default['default'].createElement(IconButton, null, /*#__PURE__*/React__default['default'].createElement(HamburgerIcon, null)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: breadcrumbs
  }, /*#__PURE__*/React__default['default'].createElement("span", null, "Projects"), /*#__PURE__*/React__default['default'].createElement("span", null, "/"), /*#__PURE__*/React__default['default'].createElement("span", {
    className: style$G['active']
  }, "Social Media"))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: middleSide
  }, /*#__PURE__*/React__default['default'].createElement(IconButton, null, /*#__PURE__*/React__default['default'].createElement(PerspectiveIcon, null)), /*#__PURE__*/React__default['default'].createElement(IconButton, null, /*#__PURE__*/React__default['default'].createElement(WrapIcon, null)), /*#__PURE__*/React__default['default'].createElement(IconButton, null, /*#__PURE__*/React__default['default'].createElement(RemoveBGIcon, null))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: rightSide
  }, /*#__PURE__*/React__default['default'].createElement(ShareButton, {
    className: shareBtn
  }), /*#__PURE__*/React__default['default'].createElement(ToolbarZoom, null)));
};

var css_248z$J = ".divider-module_divider__1wfxg {\n  margin: 4px 0;\n  padding: 0;\n  border: 0; }\n  .divider-module_divider__1wfxg.divider-module_primary__2675E {\n    background-color: #f5f5f5;\n    margin: 12px 0; }\n  .divider-module_divider__1wfxg.divider-module_silent__1Hxpx {\n    background-color: #f5f5f5;\n    margin: 0; }\n";
var style$F = {"divider":"divider-module_divider__1wfxg","primary":"divider-module_primary__2675E","silent":"divider-module_silent__1Hxpx"};
styleInject(css_248z$J);

const Divider = ({
  width = 10,
  size = 1,
  type = 'primary'
}) => {
  const {
    divider
  } = style$F;
  return /*#__PURE__*/React__default['default'].createElement("hr", {
    style: {
      width,
      height: size
    },
    className: `${divider} ${style$F[type]}`
  });
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const SearchIcon = ({
  width = 11,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 11 12`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 5a4 4 0 11-8 0 4 4 0 018 0zM7.586 9.28a5 5 0 11.8-.601l2.468 2.467a.5.5 0 01-.708.708l-2.5-2.5a.503.503 0 01-.06-.074z",
    fill: "#999"
  }));
};

const CrossIcon = ({
  width = 11,
  height = 11,
  color = '#999',
  className = 'crossIcon'
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    className: className,
    width: width,
    height: height,
    viewBox: "0 0 10 10",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: color,
    strokeLinecap: "round",
    d: "M9 1L1 9M1 1l8 8"
  }));
};

var css_248z$I = ".branding-module_branding__36GBz {\n  cursor: pointer;\n  position: relative;\n  width: 240px;\n  background: #ffffff;\n  align-items: center;\n  margin-bottom: 8px;\n  display: flex;\n  flex-direction: column;\n  z-index: 1; }\n  .branding-module_branding__36GBz * {\n    cursor: pointer;\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box; }\n  .branding-module_branding__36GBz .branding-module_header__38RuT {\n    margin-top: 8px;\n    width: 224px;\n    font-size: 11px;\n    line-height: 32px;\n    color: #999999;\n    display: flex;\n    padding: 8px; }\n  .branding-module_branding__36GBz .branding-module_itemRow__nSqQl {\n    width: 224px;\n    height: 48px;\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n    .branding-module_branding__36GBz .branding-module_itemRow__nSqQl .branding-module_imageBox__1i7DS {\n      width: 32px;\n      height: 32px;\n      border-radius: 50%;\n      margin-right: 8px;\n      background-size: cover;\n      background-position: center;\n      background-color: #ffffff;\n      box-shadow: 0px 0.5px 1px rgba(0, 4, 8, 0.12), 0px 8px 16px -8px rgba(0, 4, 8, 0.08); }\n    .branding-module_branding__36GBz .branding-module_itemRow__nSqQl .branding-module_textBox__3_pO3 {\n      width: 176px; }\n      .branding-module_branding__36GBz .branding-module_itemRow__nSqQl .branding-module_textBox__3_pO3 .branding-module_title__3CfOQ {\n        height: 24px;\n        font-weight: 600;\n        font-size: 12px;\n        line-height: 24px;\n        display: flex;\n        align-items: center;\n        color: #31363a;\n        margin: 0;\n        user-select: none;\n        display: flex;\n        justify-content: space-between; }\n        .branding-module_branding__36GBz .branding-module_itemRow__nSqQl .branding-module_textBox__3_pO3 .branding-module_title__3CfOQ svg {\n          stroke: #b6babd; }\n      .branding-module_branding__36GBz .branding-module_itemRow__nSqQl .branding-module_textBox__3_pO3 .branding-module_date__1Sch9 {\n        display: inline-block;\n        width: 176px;\n        height: 16px;\n        font-size: 11px;\n        line-height: 16px;\n        color: #b6babd;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        user-select: none; }\n";
var style$E = {"branding":"branding-module_branding__36GBz","header":"branding-module_header__38RuT","itemRow":"branding-module_itemRow__nSqQl","imageBox":"branding-module_imageBox__1i7DS","textBox":"branding-module_textBox__3_pO3","title":"branding-module_title__3CfOQ","date":"branding-module_date__1Sch9"};
styleInject(css_248z$I);

const Branding = ({
  items,
  onChangeValue
}) => {
  const {
    branding,
    imageBox,
    textBox,
    title,
    date,
    header,
    itemRow
  } = style$E;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${branding}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: header
  }, "Branding Components"), items.map((item, key) => /*#__PURE__*/React__default['default'].createElement("div", {
    className: itemRow,
    key: key,
    onClick: () => onChangeValue(item)
  }, /*#__PURE__*/React__default['default'].createElement("figure", {
    className: imageBox,
    style: {
      backgroundImage: `url(${item.imageUrl})`
    },
    alt: item.label
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: textBox
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: title
  }, item.label), /*#__PURE__*/React__default['default'].createElement("div", {
    className: date
  }, item.date)))));
};

const ArrowRightIcon = ({
  width = 9,
  height = 7
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 9 7",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    stroke: "#999",
    d: "M5.854.646a.5.5 0 10-.708.708L6.793 3H.5a.5.5 0 000 1h6.293L5.146 5.646a.5.5 0 10.708.708l2.5-2.5.353-.354-.353-.354-2.5-2.5z"
  }));
};
const ArrowRightSecondIcon = ({
  width = 5,
  height = 8
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 5 8",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M1 7l3-3-3-3",
    stroke: "#999",
    strokeLinecap: "round"
  }));
};
const ArrowLeftIcon = ({
  width = 9,
  height = 7
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 9 7",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#31363A",
    fillRule: "evenodd",
    d: "M3.147.646a.5.5 0 01.707.708L2.207 3H8.5a.5.5 0 010 1H2.207l1.647 1.646a.5.5 0 11-.707.708l-2.5-2.5L.293 3.5l.354-.354 2.5-2.5z",
    clipRule: "evenodd"
  }));
};
const ChevronArrowIcon = ({
  width = 8,
  height = 5
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 5",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M1 1l3 3 3-3",
    stroke: "#999",
    strokeLinecap: "round"
  }));
};

const ResentIcon = ({
  width = 14,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 14 12`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8 11a5 5 0 10-4.992-4.715l1.138-1.139a.5.5 0 11.708.708l-2 2-.354.353-.354-.353-2-2a.5.5 0 11.708-.708L2 6.293V6a6 6 0 112.287 4.713L5 10c.835.628 1.874 1 3 1zm-.5-8a.5.5 0 01.5.5V6h1.5a.5.5 0 010 1h-2a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5z",
    fill: "#999"
  }));
};

var css_248z$H = ".itemMenu-module_itemMenu__11Siw {\n  display: flex;\n  flex-direction: column;\n  padding: 0 8px;\n  background: #ffffff;\n  overflow: hidden;\n  cursor: pointer; }\n  .itemMenu-module_itemMenu__11Siw * {\n    user-select: none;\n    box-sizing: border-box;\n    font-family: Aktiv Grotesk, sans-serif; }\n  .itemMenu-module_itemMenu__11Siw.itemMenu-module_recentOpen__25U0G .itemMenu-module_itemWrapper__rSz22 {\n    height: 72px; }\n  .itemMenu-module_itemMenu__11Siw .itemMenu-module_itemWrapper__rSz22 {\n    width: 224px;\n    height: 48px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    border-bottom: 1px solid #e8ebed; }\n    .itemMenu-module_itemMenu__11Siw .itemMenu-module_itemWrapper__rSz22 .itemMenu-module_title__1f6Dn {\n      height: 32px;\n      width: 100%;\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 0 8px; }\n      .itemMenu-module_itemMenu__11Siw .itemMenu-module_itemWrapper__rSz22 .itemMenu-module_title__1f6Dn .itemMenu-module_svgBox__3wB0j svg path {\n        stroke: #b6babd; }\n      .itemMenu-module_itemMenu__11Siw .itemMenu-module_itemWrapper__rSz22 .itemMenu-module_title__1f6Dn label {\n        cursor: pointer;\n        width: 200px;\n        height: 24px;\n        font-weight: 600;\n        font-size: 11px;\n        line-height: 24px;\n        display: flex;\n        align-items: center;\n        color: #31363a;\n        user-select: none; }\n  .itemMenu-module_itemMenu__11Siw .itemMenu-module_recentBox__2AImV {\n    display: flex;\n    height: 24px; }\n    .itemMenu-module_itemMenu__11Siw .itemMenu-module_recentBox__2AImV .itemMenu-module_resentIcon__3OoDb {\n      display: flex;\n      width: 24px;\n      justify-content: center;\n      align-items: center; }\n    .itemMenu-module_itemMenu__11Siw .itemMenu-module_recentBox__2AImV label {\n      width: 24px;\n      font-weight: 600;\n      font-size: 9px;\n      display: flex;\n      align-items: center;\n      letter-spacing: 0.01em;\n      text-transform: uppercase;\n      color: #b6babd;\n      width: 100%;\n      box-sizing: border-box;\n      padding-top: 8px;\n      user-select: none; }\n    .itemMenu-module_itemMenu__11Siw .itemMenu-module_recentBox__2AImV .itemMenu-module_resentItems__34En3 {\n      display: flex;\n      flex-direction: row;\n      flex-wrap: wrap;\n      box-sizing: border-box; }\n      .itemMenu-module_itemMenu__11Siw .itemMenu-module_recentBox__2AImV .itemMenu-module_resentItems__34En3 span {\n        user-select: none;\n        font-size: 11px;\n        line-height: 16px;\n        padding: 4px 8px;\n        min-width: 24px;\n        max-width: 78px;\n        height: 24px;\n        background: #f2f4f5;\n        border-radius: 8px;\n        margin: 0 5px 4px 0;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis; }\n  .itemMenu-module_itemMenu__11Siw:hover .itemMenu-module_itemWrapper__rSz22 .itemMenu-module_svgBox__3wB0j svg path {\n    stroke: #31363a; }\n";
var style$D = {"itemMenu":"itemMenu-module_itemMenu__11Siw","recentOpen":"itemMenu-module_recentOpen__25U0G","itemWrapper":"itemMenu-module_itemWrapper__rSz22","title":"itemMenu-module_title__1f6Dn","svgBox":"itemMenu-module_svgBox__3wB0j","recentBox":"itemMenu-module_recentBox__2AImV","resentIcon":"itemMenu-module_resentIcon__3OoDb","resentItems":"itemMenu-module_resentItems__34En3"};
styleInject(css_248z$H);

const ItemMenu = ({
  item: {
    label,
    value,
    resent
  },
  onClick = null
}) => {
  const {
    itemMenu,
    itemWrapper,
    title,
    svgBox,
    recentOpen,
    recentBox,
    resentItems,
    resentIcon
  } = style$D;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${itemMenu} ${resent ? recentOpen : ''}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: itemWrapper,
    onClick: () => onClick({
      value,
      label
    })
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: title
  }, /*#__PURE__*/React__default['default'].createElement("label", null, label), /*#__PURE__*/React__default['default'].createElement("div", {
    className: svgBox
  }, /*#__PURE__*/React__default['default'].createElement(ArrowRightSecondIcon, null))), resent && /*#__PURE__*/React__default['default'].createElement("div", {
    className: recentBox
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: resentIcon
  }, /*#__PURE__*/React__default['default'].createElement(ResentIcon, null)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: resentItems
  }, resent.map((item, key) => /*#__PURE__*/React__default['default'].createElement("span", {
    key: key
  }, item.label))))));
};

var css_248z$G = ".illustration-items-module_illustrationsItems__28b88 {\n  align-items: center;\n  justify-content: center;\n  display: flex; }\n  .illustration-items-module_illustrationsItems__28b88 * {\n    user-select: none;\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer; }\n  .illustration-items-module_illustrationsItems__28b88 .illustration-items-module_row__1vawQ {\n    width: 224px;\n    height: 64px;\n    display: flex;\n    justify-content: left;\n    padding: 4px 0 4px 4px;\n    background-color: #ffffff;\n    margin-bottom: 4px; }\n    .illustration-items-module_illustrationsItems__28b88 .illustration-items-module_row__1vawQ .illustration-items-module_image__7tTU3 {\n      width: 84px;\n      height: 56px;\n      background-size: cover;\n      background-position: center;\n      background-color: #ffffff;\n      border-radius: 5px;\n      margin-right: 8px; }\n    .illustration-items-module_illustrationsItems__28b88 .illustration-items-module_row__1vawQ .illustration-items-module_titleTagWrapper__3zSsk {\n      display: flex;\n      flex-direction: column; }\n      .illustration-items-module_illustrationsItems__28b88 .illustration-items-module_row__1vawQ .illustration-items-module_titleTagWrapper__3zSsk label {\n        width: 125px;\n        font-size: 11px;\n        line-height: 16px;\n        font-weight: 600;\n        color: #333333; }\n      .illustration-items-module_illustrationsItems__28b88 .illustration-items-module_row__1vawQ .illustration-items-module_titleTagWrapper__3zSsk .illustration-items-module_tag__sct8m {\n        width: 125px;\n        height: 16px;\n        font-size: 11px;\n        line-height: 16px;\n        color: #b6babd;\n        display: inline-block;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis; }\n    .illustration-items-module_illustrationsItems__28b88 .illustration-items-module_row__1vawQ:hover {\n      background: #f5f5f5;\n      border-radius: 8px; }\n";
var style$C = {"illustrationsItems":"illustration-items-module_illustrationsItems__28b88","row":"illustration-items-module_row__1vawQ","image":"illustration-items-module_image__7tTU3","titleTagWrapper":"illustration-items-module_titleTagWrapper__3zSsk","tag":"illustration-items-module_tag__sct8m"};
styleInject(css_248z$G);

const IllustrationsItems = ({
  item,
  onChangeValue
}) => {
  const {
    illustrationsItems,
    row,
    image,
    titleTagWrapper,
    tag
  } = style$C;
  const {
    label,
    tags,
    imageUrl
  } = item;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: illustrationsItems
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: row
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: image,
    style: {
      backgroundImage: `url(${imageUrl})`
    }
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: titleTagWrapper,
    onClick: () => onChangeValue(label)
  }, /*#__PURE__*/React__default['default'].createElement("label", null, label), /*#__PURE__*/React__default['default'].createElement("div", {
    className: tag
  }, tags))));
};

var css_248z$F = ".illustration-module_scrollWrapper__3eobP > :nth-child(3) {\n  width: 4px !important;\n  right: 0 !important; }\n\n.illustration-module_illustration__2Tgoi {\n  align-items: center;\n  box-sizing: border-box;\n  padding-bottom: 46px;\n  width: 240px; }\n  .illustration-module_illustration__2Tgoi * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box; }\n  .illustration-module_illustration__2Tgoi .illustration-module_header__hp2lh {\n    width: 224px;\n    height: 32px;\n    align-items: center;\n    justify-content: space-between; }\n";
var style$B = {"scrollWrapper":"illustration-module_scrollWrapper__3eobP","illustration":"illustration-module_illustration__2Tgoi","header":"illustration-module_header__hp2lh"};
styleInject(css_248z$F);

/* eslint-disable react-hooks/exhaustive-deps */
const illustrationItemsData = [{
  id: getUnique(),
  label: 'Stamped Print Leaves & Plants',
  tags: 'Yasir Ekinci',
  imageUrl: '/images/components/add-menu/StampedPrints.png'
}, {
  id: getUnique(),
  label: 'Unicolor Mockup Pack',
  tags: 'Mockupzone',
  imageUrl: '/images/components/add-menu/Unicolor.png'
}, {
  id: getUnique(),
  label: 'Massive Apparel Mockup Bundle',
  tags: 'GraphicHero',
  imageUrl: '/images/components/add-menu/ApparelMockups.png'
}, {
  id: getUnique(),
  label: 'Artistic Toolkit 7in1',
  tags: 'InArtFlow',
  imageUrl: '/images/components/add-menu/ArtisticToolkit.png'
}, {
  id: getUnique(),
  label: 'Abstraction',
  tags: 'InArtFlow',
  imageUrl: '/images/components/add-menu/Abstraction.png'
}];
const Illustrations = ({
  activeMenu,
  setActiveMenu
}) => {
  const {
    stockPhotoItems
  } = style$B;
  const [stockPhotoItemsDetailsData, setStockPhotoItemsDataDetails] = React$1.useState(null);

  const clickOnStockPhotoItem = stockName => {
    setStockPhotoItemsDataDetails(null); // if (stockName.toLowerCase() === 'print')
    //   setStockPhotoItemsDataDetails(prints);

    setActiveMenuHandler(stockName);
    return stockName;
  };

  const setActiveMenuHandler = label => {
    setActiveMenu({ ...activeMenu,
      back: [activeMenu.action, activeMenu.label],
      action: label.toLowerCase(),
      label
    });
  };

  React$1.useEffect(() => {
    if (activeMenu.action === null) setStockPhotoItemsDataDetails(null);
  }, [activeMenu]);
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, activeMenu.action === 'illustrations' && /*#__PURE__*/React__default['default'].createElement(Wrapper$2, null, /*#__PURE__*/React__default['default'].createElement("div", {
    className: stockPhotoItems
  }, illustrationItemsData.map((item, key) => /*#__PURE__*/React__default['default'].createElement(IllustrationsItems, {
    key: key,
    item: item,
    onChangeValue: selectedStockPhotoItem => clickOnStockPhotoItem(selectedStockPhotoItem)
  })))));
};

const Wrapper$2 = ({
  children
}) => {
  const {
    scrollWrapper,
    illustration
  } = style$B;
  return /*#__PURE__*/React__default['default'].createElement(Scrollbars__default['default'], {
    autoHide: true,
    style: {
      height: '100%'
    },
    className: scrollWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${illustration}`
  }, children));
};

var css_248z$E = ".stockPhoto-items-details-module_stockPhotoItemsDetailsWrapper__1kYQp {\n  width: 232px;\n  columns: 2;\n  column-gap: 4px;\n  padding-left: 8px; }\n  .stockPhoto-items-details-module_stockPhotoItemsDetailsWrapper__1kYQp * {\n    box-sizing: border-box;\n    cursor: pointer; }\n  .stockPhoto-items-details-module_stockPhotoItemsDetailsWrapper__1kYQp .stockPhoto-items-details-module_scrollWrapper__1IKFg > :nth-child(3) {\n    width: 4px !important;\n    right: 0 !important; }\n  .stockPhoto-items-details-module_stockPhotoItemsDetailsWrapper__1kYQp img {\n    border-radius: 8px;\n    margin-bottom: 4px; }\n";
var style$A = {"stockPhotoItemsDetailsWrapper":"stockPhoto-items-details-module_stockPhotoItemsDetailsWrapper__1kYQp","scrollWrapper":"stockPhoto-items-details-module_scrollWrapper__1IKFg"};
styleInject(css_248z$E);

const StockPhotoItemsDetails = ({
  items = [],
  onClick
}) => {
  const {
    stockPhotoItemsDetailsWrapper,
    scrollWrapper
  } = style$A;
  return /*#__PURE__*/React__default['default'].createElement(Scrollbars__default['default'], {
    autoHide: true,
    style: {
      height: '100%'
    },
    className: scrollWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${stockPhotoItemsDetailsWrapper}`
  }, items.map((item, key) => /*#__PURE__*/React__default['default'].createElement("img", {
    key: key,
    src: item.imageUrl,
    alt: ""
  }))));
};

var css_248z$D = ".stockPhoto-items-module_stockPhotoItems__3GW_k {\n  align-items: center;\n  justify-content: center;\n  display: flex; }\n  .stockPhoto-items-module_stockPhotoItems__3GW_k * {\n    user-select: none;\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer; }\n  .stockPhoto-items-module_stockPhotoItems__3GW_k .stockPhoto-items-module_row__3760c {\n    width: 224px;\n    min-height: 56px;\n    display: flex;\n    box-sizing: border-box;\n    align-items: center;\n    justify-content: left;\n    padding: 8px;\n    border-radius: 12px;\n    background-color: #ffffff;\n    margin-bottom: 8px;\n    cursor: pointer; }\n    .stockPhoto-items-module_stockPhotoItems__3GW_k .stockPhoto-items-module_row__3760c .stockPhoto-items-module_stockPhotoImage__2dvCg {\n      margin-right: 8px;\n      height: 20px;\n      width: 20px;\n      cursor: pointer;\n      border-radius: 50%;\n      box-shadow: 0px 0.5px 1px rgba(0, 4, 8, 0.12), 0px 8px 16px -8px rgba(0, 4, 8, 0.08);\n      background-size: cover;\n      background-position: center;\n      background-color: #ffffff;\n      position: relative;\n      align-self: flex-start; }\n      .stockPhoto-items-module_stockPhotoItems__3GW_k .stockPhoto-items-module_row__3760c .stockPhoto-items-module_stockPhotoImage__2dvCg .stockPhoto-items-module_premium__35CGJ {\n        position: absolute;\n        right: 0; }\n    .stockPhoto-items-module_stockPhotoItems__3GW_k .stockPhoto-items-module_row__3760c .stockPhoto-items-module_titleTagWrapper__1QK7w {\n      width: 176px; }\n      .stockPhoto-items-module_stockPhotoItems__3GW_k .stockPhoto-items-module_row__3760c .stockPhoto-items-module_titleTagWrapper__1QK7w .stockPhoto-items-module_titleWrapper__2xBzY {\n        width: 176px;\n        display: flex;\n        justify-content: space-between; }\n        .stockPhoto-items-module_stockPhotoItems__3GW_k .stockPhoto-items-module_row__3760c .stockPhoto-items-module_titleTagWrapper__1QK7w .stockPhoto-items-module_titleWrapper__2xBzY label {\n          font-size: 11px;\n          font-weight: 600;\n          cursor: pointer;\n          margin-bottom: 4px;\n          display: block; }\n        .stockPhoto-items-module_stockPhotoItems__3GW_k .stockPhoto-items-module_row__3760c .stockPhoto-items-module_titleTagWrapper__1QK7w .stockPhoto-items-module_titleWrapper__2xBzY .stockPhoto-items-module_svgBox__pMQwy {\n          width: 16px;\n          height: 16px;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          opacity: 0;\n          transition: opacity 0.2s; }\n          .stockPhoto-items-module_stockPhotoItems__3GW_k .stockPhoto-items-module_row__3760c .stockPhoto-items-module_titleTagWrapper__1QK7w .stockPhoto-items-module_titleWrapper__2xBzY .stockPhoto-items-module_svgBox__pMQwy svg path {\n            stroke: #000408; }\n      .stockPhoto-items-module_stockPhotoItems__3GW_k .stockPhoto-items-module_row__3760c .stockPhoto-items-module_titleTagWrapper__1QK7w .stockPhoto-items-module_tag__2mWt2 {\n        width: 176px;\n        font-size: 11px;\n        line-height: 16px;\n        color: #63676c; }\n    .stockPhoto-items-module_stockPhotoItems__3GW_k .stockPhoto-items-module_row__3760c:hover {\n      background: #f5f5f5;\n      border-radius: 8px; }\n      .stockPhoto-items-module_stockPhotoItems__3GW_k .stockPhoto-items-module_row__3760c:hover .stockPhoto-items-module_titleTagWrapper__1QK7w .stockPhoto-items-module_titleWrapper__2xBzY .stockPhoto-items-module_svgBox__pMQwy {\n        opacity: 1; }\n";
var style$z = {"stockPhotoItems":"stockPhoto-items-module_stockPhotoItems__3GW_k","row":"stockPhoto-items-module_row__3760c","stockPhotoImage":"stockPhoto-items-module_stockPhotoImage__2dvCg","premium":"stockPhoto-items-module_premium__35CGJ","titleTagWrapper":"stockPhoto-items-module_titleTagWrapper__1QK7w","titleWrapper":"stockPhoto-items-module_titleWrapper__2xBzY","svgBox":"stockPhoto-items-module_svgBox__pMQwy","tag":"stockPhoto-items-module_tag__2mWt2"};
styleInject(css_248z$D);

const StockPhotoItems = ({
  item,
  onChangeValue
}) => {
  const {
    stockPhotoItems,
    row,
    stockPhotoImage,
    titleTagWrapper,
    titleWrapper,
    svgBox,
    tag
  } = style$z;
  const {
    label,
    tags,
    imageUrl
  } = item;
  const styleImage = {
    backgroundImage: `url(${imageUrl})`
  };
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: stockPhotoItems,
    onClick: () => onChangeValue(label)
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: row
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: stockPhotoImage,
    style: styleImage
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: titleTagWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: titleWrapper
  }, /*#__PURE__*/React__default['default'].createElement("label", null, label), /*#__PURE__*/React__default['default'].createElement("div", {
    className: svgBox
  }, /*#__PURE__*/React__default['default'].createElement(ArrowRightSecondIcon, null))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: tag
  }, tags))));
};

var css_248z$C = ".stockPhotos-module_scrollWrapper__13b60 > :nth-child(3) {\n  width: 4px !important;\n  right: 0 !important; }\n\n.stockPhotos-module_stockPhoto__8x4lY {\n  width: 240px;\n  align-items: center;\n  box-sizing: border-box;\n  padding-bottom: 46px; }\n  .stockPhotos-module_stockPhoto__8x4lY * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box; }\n  .stockPhotos-module_stockPhoto__8x4lY .stockPhotos-module_header__JIZ9V {\n    width: 224px;\n    height: 32px;\n    align-items: center;\n    justify-content: space-between; }\n";
var style$y = {"scrollWrapper":"stockPhotos-module_scrollWrapper__13b60","stockPhoto":"stockPhotos-module_stockPhoto__8x4lY","header":"stockPhotos-module_header__JIZ9V"};
styleInject(css_248z$C);

/* eslint-disable react-hooks/exhaustive-deps */
const stockPhotoItemsData = [{
  id: getUnique(),
  label: 'Unsplash',
  tags: '+2.4M free images and photos.',
  imageUrl: '/images/components/add-menu/unsplash.png'
}, {
  id: getUnique(),
  label: 'Unsplash premium',
  tags: '570K premium images and photos. Exclusively free for Artboard users',
  imageUrl: '/images/components/add-menu/unsplash.png'
}, {
  id: getUnique(),
  label: 'Shutterstock',
  tags: '570K premium images and photos. Exclusively free for Artboard users',
  imageUrl: '/images/components/add-menu/shutterstock.png'
}, {
  id: getUnique(),
  label: 'Shutterstock Premium ✨',
  tags: '300M premium images and photos. 50% off with Artboard Premium.',
  imageUrl: '/images/components/add-menu/shutterstock.png'
}];
const unsplash = [{
  imageUrl: '/images/components/add-menu/shutter-stock-03.png'
}, {
  imageUrl: '/images/components/add-menu/shutter-stock-04.png'
}, {
  imageUrl: '/images/components/add-menu/shutter-stock-02.png'
}, {
  imageUrl: '/images/components/add-menu/shutter-stock-01.png'
}, {
  imageUrl: '/images/components/add-menu/shutter-stock-05.png'
}, {
  imageUrl: '/images/components/add-menu/shutter-stock-04.png'
}, {
  imageUrl: '/images/components/add-menu/shutter-stock-02.png'
}, {
  imageUrl: '/images/components/add-menu/shutter-stock-02.png'
}, {
  imageUrl: '/images/components/add-menu/shutter-stock-01.png'
}, {
  imageUrl: '/images/components/add-menu/shutter-stock-01.png'
}, {
  imageUrl: '/images/components/add-menu/shutter-stock-05.png'
}, {
  imageUrl: '/images/components/add-menu/shutter-stock-04.png'
}, {
  imageUrl: '/images/components/add-menu/shutter-stock-02.png'
}];
const StockPhotos = ({
  activeMenu,
  setActiveMenu
}) => {
  const {
    stockPhotoItems
  } = style$y;
  const [stockPhotoItemsDetailsData, setStockPhotoItemsDataDetails] = React$1.useState(null);

  const clickOnStockPhotoItem = stockName => {
    console.log(stockName);
    setStockPhotoItemsDataDetails(null);
    if (stockName.toLowerCase() === 'unsplash') setStockPhotoItemsDataDetails(unsplash);
    console.log(stockPhotoItemsDetailsData);
    setActiveMenuHandler(stockName);
    return stockName;
  };

  const setActiveMenuHandler = label => {
    setActiveMenu({ ...activeMenu,
      back: [activeMenu.action, activeMenu.label],
      action: label.toLowerCase(),
      label
    });
  };

  React$1.useEffect(() => {
    if (activeMenu.action === null) setStockPhotoItemsDataDetails(null);
  }, [activeMenu]);
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, activeMenu.action === 'stockPhotos' && /*#__PURE__*/React__default['default'].createElement(Wrapper$1, null, /*#__PURE__*/React__default['default'].createElement("div", {
    className: stockPhotoItems
  }, stockPhotoItemsData.map((item, key) => /*#__PURE__*/React__default['default'].createElement(StockPhotoItems, {
    key: key,
    item: item,
    onChangeValue: selectedStockPhotoItem => clickOnStockPhotoItem(selectedStockPhotoItem)
  })))), stockPhotoItemsDetailsData && activeMenu.action !== 'stockPhotos' && /*#__PURE__*/React__default['default'].createElement(StockPhotoItemsDetails, {
    items: stockPhotoItemsDetailsData
  }));
};

const Wrapper$1 = ({
  children
}) => {
  const {
    scrollWrapper,
    stockPhoto
  } = style$y;
  return /*#__PURE__*/React__default['default'].createElement(Scrollbars__default['default'], {
    autoHide: true,
    style: {
      height: '100%'
    },
    className: scrollWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${stockPhoto}`
  }, children));
};

const ListIcon = ({
  width = 12,
  height = 7
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 7"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#31363A",
    fillRule: "evenodd",
    d: "M4 1.5c0-.27614.22386-.5.5-.5h7c.2761 0 .5.22386.5.5s-.2239.5-.5.5h-7c-.27614 0-.5-.22386-.5-.5z",
    clipRule: "evenodd"
  }), /*#__PURE__*/React__default['default'].createElement("circle", {
    cx: "1.5",
    cy: "1.5",
    r: ".75",
    fill: "#31363A",
    stroke: "#31363A",
    strokeWidth: ".5"
  }), /*#__PURE__*/React__default['default'].createElement("circle", {
    cx: "1.5",
    cy: "5.5",
    r: ".75",
    fill: "#63676C",
    stroke: "#63676C",
    strokeWidth: ".5"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#63676C",
    strokeLinecap: "round",
    d: "M4.5 5.5h7"
  }));
};

const ThumbnailIcon = ({
  width = 9,
  height = 9
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 9 9",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "8",
    height: "8",
    x: ".5",
    y: ".5",
    stroke: "#63676C",
    rx: "1.5"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#B6BABD",
    d: "M1 4.5h7M4.5 8V1"
  }));
};

var css_248z$B = ".tooltip-module_tooltip__zRBWm {\n  font-family: Aktiv Grotesk, sans-serif; }\n  .tooltip-module_tooltip__zRBWm h3 {\n    margin: 0;\n    padding: 0;\n    cursor: pointer; }\n";
var style$x = {"tooltip":"tooltip-module_tooltip__zRBWm"};
styleInject(css_248z$B);

var css_248z$A = ".tooltip_tippy-popper__3A4NM {\n  top: -8px !important;\n  left: -4px !important;\n  max-width: 246px; }\n  .tooltip_tippy-popper__3A4NM .tooltip_tippy-tooltip__2TRTm [x-circle] {\n    background-color: transparent !important; }\n  .tooltip_tippy-popper__3A4NM .tooltip_tippy-tooltip__2TRTm .tooltip_tippy-tooltip-content__1g461 {\n    font-family: Aktiv Grotesk, sans-serif;\n    padding: 4px 8px;\n    border-radius: 8px;\n    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.06), 0px 0.5px 1px rgba(0, 0, 0, 0.24);\n    font-family: Aktiv Grotesk, sans-serif;\n    font-size: 12px;\n    line-height: 24px; }\n  .tooltip_tippy-popper__3A4NM .tooltip_tippy-tooltip__2TRTm.tooltip_light-theme__3AdwA {\n    color: #26323d;\n    box-shadow: none; }\n    .tooltip_tippy-popper__3A4NM .tooltip_tippy-tooltip__2TRTm.tooltip_light-theme__3AdwA .tooltip_tippy-tooltip-content__1g461 {\n      background: #ffffff;\n      color: #31363a; }\n      .tooltip_tippy-popper__3A4NM .tooltip_tippy-tooltip__2TRTm.tooltip_light-theme__3AdwA .tooltip_tippy-tooltip-content__1g461:after {\n        background-color: #ffffff; }\n  .tooltip_tippy-popper__3A4NM .tooltip_tippy-tooltip__2TRTm.tooltip_dark-theme__2mirF .tooltip_tippy-tooltip-content__1g461 {\n    background: #31363a;\n    color: #ffffff; }\n    .tooltip_tippy-popper__3A4NM .tooltip_tippy-tooltip__2TRTm.tooltip_dark-theme__2mirF .tooltip_tippy-tooltip-content__1g461:after {\n      background-color: #31363a; }\n  .tooltip_tippy-popper__3A4NM[x-placement='top'] .tooltip_light-theme__3AdwA, .tooltip_tippy-popper__3A4NM[x-placement='top-start'] .tooltip_light-theme__3AdwA, .tooltip_tippy-popper__3A4NM[x-placement='top-end'] .tooltip_light-theme__3AdwA {\n    top: 2px !important;\n    left: -1px !important; }\n    .tooltip_tippy-popper__3A4NM[x-placement='top'] .tooltip_light-theme__3AdwA .tooltip_tippy-tooltip-content__1g461:after, .tooltip_tippy-popper__3A4NM[x-placement='top-start'] .tooltip_light-theme__3AdwA .tooltip_tippy-tooltip-content__1g461:after, .tooltip_tippy-popper__3A4NM[x-placement='top-end'] .tooltip_light-theme__3AdwA .tooltip_tippy-tooltip-content__1g461:after {\n      background-color: #ffffff;\n      top: 33px !important;\n      transform: rotate(45deg); }\n  .tooltip_tippy-popper__3A4NM[x-placement='top'], .tooltip_tippy-popper__3A4NM[x-placement='top-start'], .tooltip_tippy-popper__3A4NM[x-placement='top-end'] {\n    top: -3px !important;\n    left: -3px !important; }\n    .tooltip_tippy-popper__3A4NM[x-placement='top'] .tooltip_dark-theme__2mirF .tooltip_tippy-tooltip-content__1g461:after, .tooltip_tippy-popper__3A4NM[x-placement='top-start'] .tooltip_dark-theme__2mirF .tooltip_tippy-tooltip-content__1g461:after, .tooltip_tippy-popper__3A4NM[x-placement='top-end'] .tooltip_dark-theme__2mirF .tooltip_tippy-tooltip-content__1g461:after {\n      background-color: #31363a;\n      top: 33px; }\n  .tooltip_tippy-popper__3A4NM[x-placement='left'] .tooltip_light-theme__3AdwA, .tooltip_tippy-popper__3A4NM[x-placement='left-start'] .tooltip_light-theme__3AdwA, .tooltip_tippy-popper__3A4NM[x-placement='left-end'] .tooltip_light-theme__3AdwA {\n    top: 0 !important;\n    left: 0 !important; }\n    .tooltip_tippy-popper__3A4NM[x-placement='left'] .tooltip_light-theme__3AdwA .tooltip_tippy-tooltip-content__1g461:after, .tooltip_tippy-popper__3A4NM[x-placement='left-start'] .tooltip_light-theme__3AdwA .tooltip_tippy-tooltip-content__1g461:after, .tooltip_tippy-popper__3A4NM[x-placement='left-end'] .tooltip_light-theme__3AdwA .tooltip_tippy-tooltip-content__1g461:after {\n      background-color: #ffffff;\n      width: 7px;\n      height: 7px;\n      top: 20px;\n      right: 5px;\n      left: auto;\n      transform: rotate(315deg); }\n  .tooltip_tippy-popper__3A4NM[x-placement='left'], .tooltip_tippy-popper__3A4NM[x-placement='left-start'], .tooltip_tippy-popper__3A4NM[x-placement='left-end'] {\n    top: 0 !important;\n    left: 0 !important; }\n    .tooltip_tippy-popper__3A4NM[x-placement='left'] .tooltip_dark-theme__2mirF .tooltip_tippy-tooltip-content__1g461:after, .tooltip_tippy-popper__3A4NM[x-placement='left-start'] .tooltip_dark-theme__2mirF .tooltip_tippy-tooltip-content__1g461:after, .tooltip_tippy-popper__3A4NM[x-placement='left-end'] .tooltip_dark-theme__2mirF .tooltip_tippy-tooltip-content__1g461:after {\n      background-color: #31363a;\n      width: 7px;\n      height: 7px;\n      top: 20px;\n      right: 5px;\n      left: auto;\n      transform: rotate(315deg); }\n  .tooltip_tippy-popper__3A4NM[x-placement='right'] .tooltip_light-theme__3AdwA, .tooltip_tippy-popper__3A4NM[x-placement='right-start'] .tooltip_light-theme__3AdwA, .tooltip_tippy-popper__3A4NM[x-placement='right-end'] .tooltip_light-theme__3AdwA {\n    top: 0 !important;\n    left: 0 !important; }\n    .tooltip_tippy-popper__3A4NM[x-placement='right'] .tooltip_light-theme__3AdwA .tooltip_tippy-tooltip-content__1g461, .tooltip_tippy-popper__3A4NM[x-placement='right-start'] .tooltip_light-theme__3AdwA .tooltip_tippy-tooltip-content__1g461, .tooltip_tippy-popper__3A4NM[x-placement='right-end'] .tooltip_light-theme__3AdwA .tooltip_tippy-tooltip-content__1g461 {\n      margin-left: -4px; }\n      .tooltip_tippy-popper__3A4NM[x-placement='right'] .tooltip_light-theme__3AdwA .tooltip_tippy-tooltip-content__1g461:after, .tooltip_tippy-popper__3A4NM[x-placement='right-start'] .tooltip_light-theme__3AdwA .tooltip_tippy-tooltip-content__1g461:after, .tooltip_tippy-popper__3A4NM[x-placement='right-end'] .tooltip_light-theme__3AdwA .tooltip_tippy-tooltip-content__1g461:after {\n        background-color: #ffffff;\n        width: 7px;\n        height: 7px;\n        top: 19px;\n        right: auto;\n        left: 10px;\n        transform: rotate(133deg); }\n  .tooltip_tippy-popper__3A4NM[x-placement='right'], .tooltip_tippy-popper__3A4NM[x-placement='right-start'], .tooltip_tippy-popper__3A4NM[x-placement='right-end'] {\n    top: 0 !important;\n    left: 0 !important; }\n    .tooltip_tippy-popper__3A4NM[x-placement='right'] .tooltip_dark-theme__2mirF .tooltip_tippy-tooltip-content__1g461, .tooltip_tippy-popper__3A4NM[x-placement='right-start'] .tooltip_dark-theme__2mirF .tooltip_tippy-tooltip-content__1g461, .tooltip_tippy-popper__3A4NM[x-placement='right-end'] .tooltip_dark-theme__2mirF .tooltip_tippy-tooltip-content__1g461 {\n      margin-left: -4px; }\n      .tooltip_tippy-popper__3A4NM[x-placement='right'] .tooltip_dark-theme__2mirF .tooltip_tippy-tooltip-content__1g461:after, .tooltip_tippy-popper__3A4NM[x-placement='right-start'] .tooltip_dark-theme__2mirF .tooltip_tippy-tooltip-content__1g461:after, .tooltip_tippy-popper__3A4NM[x-placement='right-end'] .tooltip_dark-theme__2mirF .tooltip_tippy-tooltip-content__1g461:after {\n        background-color: #31363a;\n        width: 7px;\n        height: 7px;\n        top: 19px;\n        right: auto;\n        left: 10px;\n        transform: rotate(133deg); }\n";
styleInject(css_248z$A);

const Tooltips = ({
  children,
  title,
  trigger = 'mouseenter',
  position = 'bottom-start',
  theme = 'light',
  animation = 'none',
  size = 'small',
  followCursor = false
}) => {
  const {
    tooltip
  } = style$x;
  return /*#__PURE__*/React.createElement("div", {
    className: `${tooltip}`
  }, /*#__PURE__*/React.createElement(reactTippy.Tooltip, {
    title: title,
    position: position,
    trigger: trigger,
    theme: theme,
    animation: animation,
    followCursor: followCursor,
    size: size,
    html: /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 400
      }
    }, /*#__PURE__*/React.createElement("div", null, title))
  }, children));
};

var css_248z$z = ".mockup-items-details-module_addMenuItemsDetails__2etZC {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  height: 100%; }\n  .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_scrollWrapper__2M3tR > :nth-child(3) {\n    width: 4px !important;\n    right: 0 !important; }\n  .mockup-items-details-module_addMenuItemsDetails__2etZC * {\n    box-sizing: border-box;\n    cursor: pointer; }\n  .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_filterViewWrapper__2AJNu {\n    display: flex;\n    justify-content: space-between;\n    width: 224px; }\n    .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_filterViewWrapper__2AJNu .mockup-items-details-module_filter__2OzAH {\n      width: 196px;\n      height: 32px;\n      box-sizing: border-box;\n      border-bottom: 1px solid #f5f5f5;\n      display: flex;\n      justify-content: start;\n      align-items: center; }\n      .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_filterViewWrapper__2AJNu .mockup-items-details-module_filter__2OzAH .mockup-items-details-module_filterItem__2sQx2 {\n        min-width: 46px;\n        height: 24px;\n        display: flex;\n        align-items: center; }\n        .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_filterViewWrapper__2AJNu .mockup-items-details-module_filter__2OzAH .mockup-items-details-module_filterItem__2sQx2:first-child {\n          margin-right: 16px;\n          margin-left: 8px; }\n        .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_filterViewWrapper__2AJNu .mockup-items-details-module_filter__2OzAH .mockup-items-details-module_filterItem__2sQx2 label {\n          font-size: 11px;\n          line-height: 32px;\n          border-bottom: 1px solid #f5f5f5; }\n        .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_filterViewWrapper__2AJNu .mockup-items-details-module_filter__2OzAH .mockup-items-details-module_filterItem__2sQx2.mockup-items-details-module_selected__26YQN label {\n          border-bottom: 1px solid #333333; }\n    .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_filterViewWrapper__2AJNu .mockup-items-details-module_switchView__1khfD {\n      width: 24px;\n      display: flex;\n      align-items: center;\n      justify-content: center; }\n      .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_filterViewWrapper__2AJNu .mockup-items-details-module_switchView__1khfD svg {\n        fill: #e8ebed; }\n  .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_itemsWrapper__3w0ll {\n    width: 224px;\n    margin-top: 8px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: space-between;\n    align-content: start;\n    height: calc(100% - 46px);\n    padding-bottom: 46px; }\n    .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_itemsWrapper__3w0ll.mockup-items-details-module_columnReverse__3gm5b {\n      flex-direction: column-reverse; }\n    .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_itemsWrapper__3w0ll.mockup-items-details-module_rowReverse__3vMhW {\n      flex-direction: row-reverse; }\n    .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_itemsWrapper__3w0ll > div {\n      justify-self: end; }\n    .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_itemsWrapper__3w0ll .mockup-items-details-module_thumbnailView__parU8 .mockup-items-details-module_imageBox__3dxDE {\n      width: 72px;\n      height: 72px;\n      border-radius: 8px;\n      background-size: cover;\n      background-position: center;\n      background-color: #ffffff;\n      margin-bottom: 4px; }\n    .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_itemsWrapper__3w0ll .mockup-items-details-module_listView__1k7Oc {\n      display: flex;\n      width: 224px;\n      height: 56px;\n      background-color: #ffffff;\n      border-radius: 12px;\n      margin-bottom: 8px; }\n      .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_itemsWrapper__3w0ll .mockup-items-details-module_listView__1k7Oc .mockup-items-details-module_imageBox__3dxDE {\n        width: 52px;\n        height: 52px;\n        border-radius: 8px;\n        background-size: cover;\n        background-position: center;\n        background-color: #ffffff;\n        margin-bottom: 4px; }\n      .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_itemsWrapper__3w0ll .mockup-items-details-module_listView__1k7Oc .mockup-items-details-module_itemLabel__35Q-y {\n        width: 160px;\n        font-size: 11px;\n        line-height: 16px;\n        color: #31363a;\n        align-self: center; }\n      .mockup-items-details-module_addMenuItemsDetails__2etZC .mockup-items-details-module_itemsWrapper__3w0ll .mockup-items-details-module_listView__1k7Oc:hover {\n        box-shadow: 0px 0.5px 1px rgba(0, 4, 8, 0.12), 0px 8px 16px -8px rgba(0, 4, 8, 0.08); }\n";
var style$w = {"addMenuItemsDetails":"mockup-items-details-module_addMenuItemsDetails__2etZC","scrollWrapper":"mockup-items-details-module_scrollWrapper__2M3tR","filterViewWrapper":"mockup-items-details-module_filterViewWrapper__2AJNu","filter":"mockup-items-details-module_filter__2OzAH","filterItem":"mockup-items-details-module_filterItem__2sQx2","selected":"mockup-items-details-module_selected__26YQN","switchView":"mockup-items-details-module_switchView__1khfD","itemsWrapper":"mockup-items-details-module_itemsWrapper__3w0ll","columnReverse":"mockup-items-details-module_columnReverse__3gm5b","rowReverse":"mockup-items-details-module_rowReverse__3vMhW","thumbnailView":"mockup-items-details-module_thumbnailView__parU8","imageBox":"mockup-items-details-module_imageBox__3dxDE","listView":"mockup-items-details-module_listView__1k7Oc","itemLabel":"mockup-items-details-module_itemLabel__35Q-y"};
styleInject(css_248z$z);

const MockupItemsDetails = ({
  items = [],
  onClick
}) => {
  const {
    addMenuItemsDetails,
    filterViewWrapper,
    filter,
    switchView,
    itemsWrapper,
    columnReverse,
    rowReverse,
    filterItem,
    imageBox,
    thumbnailView,
    listView,
    itemLabel,
    scrollWrapper
  } = style$w;
  const [viewSwitch, setViewSwitch] = React$1.useState(true);
  const [topFrontFilter, setTopFrontFilter] = React$1.useState('top');
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${addMenuItemsDetails}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: filterViewWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: filter
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${filterItem} ${topFrontFilter === 'top' ? style$w['selected'] : ''}`,
    onClick: () => setTopFrontFilter('top')
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Top View")), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${filterItem} ${topFrontFilter === 'front' ? style$w['selected'] : ''}`,
    onClick: () => setTopFrontFilter('front')
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Front View"))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: switchView
  }, viewSwitch ? /*#__PURE__*/React__default['default'].createElement(IconButton, {
    size: "small",
    type: "secondary",
    onClick: () => setViewSwitch(false)
  }, /*#__PURE__*/React__default['default'].createElement(ListIcon, null)) : /*#__PURE__*/React__default['default'].createElement(IconButton, {
    size: "small",
    type: "secondary",
    onClick: () => setViewSwitch(true)
  }, /*#__PURE__*/React__default['default'].createElement(ThumbnailIcon, {
    onClick: () => setViewSwitch(true)
  })))), /*#__PURE__*/React__default['default'].createElement(Scrollbars__default['default'], {
    autoHide: true,
    style: {
      minHeight: 100
    },
    className: scrollWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${itemsWrapper} ${topFrontFilter === 'front' && !viewSwitch ? columnReverse : ''} ${topFrontFilter === 'front' && viewSwitch ? rowReverse : ''}`
  }, viewSwitch ? items.map(menuItem => /*#__PURE__*/React__default['default'].createElement(Tooltips, {
    title: menuItem.details,
    followCursor: true,
    key: menuItem.id
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: thumbnailView
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: imageBox,
    style: {
      backgroundImage: `url(${menuItem.imageUrl})`
    }
  })))) : items.map(menuItem => /*#__PURE__*/React__default['default'].createElement("div", {
    className: listView,
    key: menuItem.id
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: imageBox,
    style: {
      backgroundImage: `url(${menuItem.imageUrl})`
    }
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: itemLabel
  }, /*#__PURE__*/React__default['default'].createElement("label", null, menuItem.label)))))));
};

var css_248z$y = ".mockup-items-module_mockupItems__1_owu {\n  align-items: center;\n  justify-content: center;\n  display: flex;\n  height: 56px; }\n  .mockup-items-module_mockupItems__1_owu * {\n    user-select: none;\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer; }\n  .mockup-items-module_mockupItems__1_owu .mockup-items-module_row__o7FAT {\n    width: 224px;\n    height: 48px;\n    display: flex;\n    box-sizing: border-box;\n    align-items: center;\n    justify-content: left;\n    padding-bottom: 8px;\n    border-bottom: 1px solid #f5f5f5;\n    background-color: #ffffff;\n    margin-bottom: 8px;\n    cursor: pointer; }\n    .mockup-items-module_mockupItems__1_owu .mockup-items-module_row__o7FAT .mockup-items-module_mockupImage__4U-PT {\n      margin-right: 8px;\n      height: 40px;\n      width: 40px;\n      cursor: pointer;\n      background-size: cover;\n      background-position: center;\n      background-color: #ffffff; }\n    .mockup-items-module_mockupItems__1_owu .mockup-items-module_row__o7FAT .mockup-items-module_titleTagWrapper__l745z {\n      width: 170px; }\n      .mockup-items-module_mockupItems__1_owu .mockup-items-module_row__o7FAT .mockup-items-module_titleTagWrapper__l745z .mockup-items-module_titleWrapper__hl5ql {\n        width: 170px;\n        display: flex;\n        justify-content: space-between; }\n        .mockup-items-module_mockupItems__1_owu .mockup-items-module_row__o7FAT .mockup-items-module_titleTagWrapper__l745z .mockup-items-module_titleWrapper__hl5ql label {\n          font-size: 11px;\n          line-height: 16px;\n          font-weight: 600;\n          cursor: pointer;\n          user-select: none;\n          margin-bottom: 4px; }\n        .mockup-items-module_mockupItems__1_owu .mockup-items-module_row__o7FAT .mockup-items-module_titleTagWrapper__l745z .mockup-items-module_titleWrapper__hl5ql .mockup-items-module_svgBox__f2-Bw {\n          width: 16px;\n          height: 16px;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          opacity: 0;\n          transition: opacity .2s; }\n          .mockup-items-module_mockupItems__1_owu .mockup-items-module_row__o7FAT .mockup-items-module_titleTagWrapper__l745z .mockup-items-module_titleWrapper__hl5ql .mockup-items-module_svgBox__f2-Bw svg path {\n            stroke: #000408; }\n      .mockup-items-module_mockupItems__1_owu .mockup-items-module_row__o7FAT .mockup-items-module_titleTagWrapper__l745z .mockup-items-module_tag__11KIh {\n        width: 160px;\n        height: 16px;\n        font-size: 11px;\n        line-height: 16px;\n        color: #b6babd;\n        display: inline-block;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis; }\n    .mockup-items-module_mockupItems__1_owu .mockup-items-module_row__o7FAT:hover .mockup-items-module_titleTagWrapper__l745z .mockup-items-module_titleWrapper__hl5ql .mockup-items-module_svgBox__f2-Bw {\n      opacity: 1; }\n";
var style$v = {"mockupItems":"mockup-items-module_mockupItems__1_owu","row":"mockup-items-module_row__o7FAT","mockupImage":"mockup-items-module_mockupImage__4U-PT","titleTagWrapper":"mockup-items-module_titleTagWrapper__l745z","titleWrapper":"mockup-items-module_titleWrapper__hl5ql","svgBox":"mockup-items-module_svgBox__f2-Bw","tag":"mockup-items-module_tag__11KIh"};
styleInject(css_248z$y);

const MockupItems = ({
  item,
  onChangeValue
}) => {
  const {
    mockupItems,
    row,
    mockupImage,
    titleTagWrapper,
    titleWrapper,
    svgBox,
    tag
  } = style$v;
  const {
    label,
    tags,
    imageUrl
  } = item;
  const styleImage = {
    backgroundImage: `url(${imageUrl})`
  };
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: mockupItems,
    onClick: () => onChangeValue(label)
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: row
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: mockupImage,
    style: styleImage
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: titleTagWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: titleWrapper
  }, /*#__PURE__*/React__default['default'].createElement("label", null, label), /*#__PURE__*/React__default['default'].createElement("div", {
    className: svgBox
  }, /*#__PURE__*/React__default['default'].createElement(ArrowRightSecondIcon, null))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: tag
  }, tags))));
};

var css_248z$x = ".mockup-module_scrollWrapper__2lJx_ > :nth-child(3) {\n  width: 4px !important;\n  right: 0 !important; }\n\n.mockup-module_mockup__39iKm {\n  align-items: center;\n  box-sizing: border-box;\n  padding: 8px;\n  padding-bottom: 46px;\n  width: 240px; }\n  .mockup-module_mockup__39iKm * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box; }\n  .mockup-module_mockup__39iKm .mockup-module_header__2mnD6 {\n    width: 224px;\n    height: 32px;\n    align-items: center;\n    justify-content: space-between; }\n";
var style$u = {"scrollWrapper":"mockup-module_scrollWrapper__2lJx_","mockup":"mockup-module_mockup__39iKm","header":"mockup-module_header__2mnD6"};
styleInject(css_248z$x);

/* eslint-disable react-hooks/exhaustive-deps */
const mockupItemsData = [{
  id: getUnique(),
  label: 'Print',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`600ae8b3bbbbdc2c0999dd5e`)
}, {
  id: getUnique(),
  label: 'Glass Amber Jar Mockup',
  tags: 'Magazines ,Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5ff82f05e98b83331133a5e1`)
}, {
  id: getUnique(),
  label: 'Dropper Bottle Mockup',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5fc8b0945362690cdc0bffd5`)
}, {
  id: getUnique(),
  label: 'Plastic Pump Bottle',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5fc6486f09454b9d921cd942`)
}, {
  id: getUnique(),
  label: 'Plastic Spray Bottle',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5fc63522778d786f86f1b99d`)
}, {
  id: getUnique(),
  label: 'Plastic Bottle with Pump',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5ac7719f87962e00575e0ec5`)
}, {
  id: getUnique(),
  label: 'Spray Bottle',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`600ae8b3bbbbdc2c0999dd5e`)
}, {
  id: getUnique(),
  label: 'Glass Amber Jar Mockup',
  tags: 'Magazines ,Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5ff82f05e98b83331133a5e1`)
}, {
  id: getUnique(),
  label: 'Dropper Bottle Mockup',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5fc8b0945362690cdc0bffd5`)
}, {
  id: getUnique(),
  label: 'Plastic Pump Bottle',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5fc6486f09454b9d921cd942`)
}, {
  id: getUnique(),
  label: 'Plastic Spray Bottle',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5fc63522778d786f86f1b99d`)
}, {
  id: getUnique(),
  label: 'Plastic Bottle with Pump',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5ac7719f87962e00575e0ec5`)
}, {
  id: getUnique(),
  label: 'Spray Bottle',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`600ae8b3bbbbdc2c0999dd5e`)
}, {
  id: getUnique(),
  label: 'Glass Amber Jar Mockup',
  tags: 'Magazines ,Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5ff82f05e98b83331133a5e1`)
}, {
  id: getUnique(),
  label: 'Dropper Bottle Mockup',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5fc8b0945362690cdc0bffd5`)
}, {
  id: getUnique(),
  label: 'Plastic Pump Bottle',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5fc6486f09454b9d921cd942`)
}, {
  id: getUnique(),
  label: 'Plastic Spray Bottle',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5fc63522778d786f86f1b99d`)
}, {
  id: getUnique(),
  label: 'Plastic Bottle with Pump',
  tags: 'Books, magazines, cards, letter ',
  imageUrl: genItemUrl(`5ac7719f87962e00575e0ec5`)
}];
const prints = [{
  id: getUnique(),
  label: 'Business Card European (85x55mm) Craft',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}, {
  id: getUnique(),
  label: 'Kraft Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}, {
  id: getUnique(),
  label: 'Kraft Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}, {
  id: getUnique(),
  label: 'Kraft Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}, {
  id: getUnique(),
  label: 'Kraft Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}, {
  id: getUnique(),
  label: 'Business Card European (85x55mm) Craft',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}, {
  id: getUnique(),
  label: 'Kraft Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}, {
  id: getUnique(),
  label: 'Kraft Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}, {
  id: getUnique(),
  label: 'Kraft Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}, {
  id: getUnique(),
  label: 'Kraft Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}, {
  id: getUnique(),
  label: 'Business Card European (85x55mm) Craft',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}, {
  id: getUnique(),
  label: 'Kraft Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}, {
  id: getUnique(),
  label: 'Kraft Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}, {
  id: getUnique(),
  label: 'Kraft Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}, {
  id: getUnique(),
  label: 'Kraft Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design. ',
  imageUrl: genItemUrl(`60262d794fad5cb7f18c8133`)
}, {
  id: getUnique(),
  label: 'Black Label Tag Mockup (8,5x5)',
  details: 'Customize this black label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602633044fad5cb7f18c8134`)
}, {
  id: getUnique(),
  label: 'Label Tag Mockup (8,5x5)',
  details: 'Customize this label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`602635ea4fad5cb7f18c8135`)
}, {
  id: getUnique(),
  label: 'Rectangle Label Tag Mockup',
  details: 'Customize this kraft rectangle label tag mockup item with your own label design.',
  imageUrl: genItemUrl(`6022644e039fe4324c19d834`)
}];
const Mockup = ({
  onChangeValue = null,
  activeMenu,
  setActiveMenu,
  setBreadcrumb,
  breadcrumb
}) => {
  const {
    mockupItems
  } = style$u;
  const [mockupItemsDetails, setMockupItemsDetails] = React$1.useState(null);

  const clickOnMockupItem = mockupName => {
    setMockupItemsDetails(null);
    if (mockupName.toLowerCase() === 'print') setMockupItemsDetails(prints);
    setActiveMenuHandler(mockupName);
    return mockupName;
  };

  const setActiveMenuHandler = label => {
    setActiveMenu({ ...activeMenu,
      back: [activeMenu.action, activeMenu.label],
      action: label.toLowerCase(),
      label
    });
    setBreadcrumb([...breadcrumb, {
      action: label.toLowerCase(),
      label
    }]);
  };

  React$1.useEffect(() => {
    if (activeMenu.action === null) setMockupItemsDetails(null);
  }, [activeMenu]);
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, activeMenu.action === 'mockups' && /*#__PURE__*/React__default['default'].createElement(Wrapper, null, /*#__PURE__*/React__default['default'].createElement("div", {
    className: mockupItems
  }, mockupItemsData.map((item, key) => /*#__PURE__*/React__default['default'].createElement(MockupItems, {
    key: key,
    item: item,
    onChangeValue: selectedMockupItem => clickOnMockupItem(selectedMockupItem)
  })))), mockupItemsDetails && activeMenu.action !== 'mockups' && /*#__PURE__*/React__default['default'].createElement(MockupItemsDetails, {
    items: mockupItemsDetails
  }));
};

const Wrapper = ({
  children
}) => {
  const {
    scrollWrapper,
    mockup
  } = style$u;
  return /*#__PURE__*/React__default['default'].createElement(Scrollbars__default['default'], {
    autoHide: true,
    style: {
      height: '100%'
    },
    className: scrollWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${mockup}`
  }, children));
};

var css_248z$w = ".filters-module_filters__3U1DQ {\n  align-items: center;\n  justify-content: center;\n  display: flex; }\n  .filters-module_filters__3U1DQ * {\n    user-select: none;\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer; }\n  .filters-module_filters__3U1DQ .filters-module_filterWrapper__14VNm {\n    width: 224px;\n    display: flex;\n    justify-content: space-between;\n    flex-wrap: wrap; }\n    .filters-module_filters__3U1DQ .filters-module_filterWrapper__14VNm .filters-module_imageWrapper__3_W5I .filters-module_image__2ipTF {\n      width: 110px;\n      height: 110px;\n      background-size: cover;\n      background-position: center;\n      background-color: #ffffff;\n      border-radius: 8px;\n      margin-bottom: 4px; }\n      .filters-module_filters__3U1DQ .filters-module_filterWrapper__14VNm .filters-module_imageWrapper__3_W5I .filters-module_image__2ipTF:hover {\n        box-shadow: 0px 0.5px 1px rgba(0, 4, 8, 0.12), 0px 8px 16px -8px rgba(0, 4, 8, 0.08); }\n";
var style$t = {"filters":"filters-module_filters__3U1DQ","filterWrapper":"filters-module_filterWrapper__14VNm","imageWrapper":"filters-module_imageWrapper__3_W5I","image":"filters-module_image__2ipTF"};
styleInject(css_248z$w);

const items$1 = [{
  id: getUnique(),
  value: 'filter-1',
  imageUrl: '/images/components/add-menu/filter-1.png'
}, {
  id: getUnique(),
  value: 'filter-2',
  imageUrl: '/images/components/add-menu/filter-2.png'
}, {
  id: getUnique(),
  value: 'filter-3',
  imageUrl: '/images/components/add-menu/filter-3.png'
}, {
  id: getUnique(),
  value: 'filter-4',
  imageUrl: '/images/components/add-menu/filter-4.png'
}, {
  id: getUnique(),
  value: 'filter-5',
  imageUrl: '/images/components/add-menu/filter-5.png'
}, {
  id: getUnique(),
  value: 'filter-6',
  imageUrl: '/images/components/add-menu/filter-6.png'
}, {
  id: getUnique(),
  value: 'filter-7',
  imageUrl: '/images/components/add-menu/filter-7.png'
}, {
  id: getUnique(),
  value: 'filter-8',
  imageUrl: '/images/components/add-menu/filter-8.png'
}];
const Filters = ({
  onChangeValue,
  activeMenu
}) => {
  const {
    filters,
    filterWrapper,
    image,
    imageWrapper
  } = style$t;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, activeMenu.action === 'filters' && /*#__PURE__*/React__default['default'].createElement("div", {
    className: filters
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: filterWrapper
  }, items$1.map((item, key) => /*#__PURE__*/React__default['default'].createElement("div", {
    className: imageWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    key: key,
    onClick: () => onChangeValue(item),
    className: image,
    style: {
      backgroundImage: `url(${item.imageUrl})`
    }
  }))))));
};

const PlusIcon = ({
  width = 11,
  height = 11
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 11 11`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6 0.5C6 0.223858 5.77614 0 5.5 0C5.22386 0 5 0.223858 5 0.5V5L0.5 5C0.223858 5 0 5.22386 0 5.5C0 5.77614 0.223858 6 0.5 6L5 6V10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5V6L10.5 6C10.7761 6 11 5.77614 11 5.5C11 5.22386 10.7761 5 10.5 5L6 5V0.5Z",
    fillOpacity: "0.8"
  }));
};

var css_248z$v = ".artboard-items-module_artboardsItems__1VFrx {\n  display: flex;\n  flex-direction: column; }\n  .artboard-items-module_artboardsItems__1VFrx * {\n    user-select: none;\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer; }\n  .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp {\n    width: 224px; }\n    .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp .artboard-items-module_titleRow__pu9ch {\n      min-height: 32px;\n      display: flex;\n      align-items: center;\n      font-size: 11px;\n      font-weight: 600; }\n      .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp .artboard-items-module_titleRow__pu9ch .artboard-items-module_svgBox__1BKTh {\n        width: 12px;\n        height: 12px;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        margin-right: 4px; }\n        .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp .artboard-items-module_titleRow__pu9ch .artboard-items-module_svgBox__1BKTh svg path {\n          stroke: #000408; }\n    .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp .artboard-items-module_itemDetails__2TrrQ {\n      display: none; }\n      .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp .artboard-items-module_itemDetails__2TrrQ .artboard-items-module_textStyleWrapper__1a3F6 {\n        display: flex;\n        flex-direction: column; }\n        .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp .artboard-items-module_itemDetails__2TrrQ .artboard-items-module_textStyleWrapper__1a3F6 .artboard-items-module_textStyleItem__17GFJ {\n          background-color: #f5f5f5;\n          border-radius: 8px;\n          width: 224px;\n          padding: 8px;\n          font-size: 11px;\n          color: #999999;\n          margin-bottom: 8px; }\n          .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp .artboard-items-module_itemDetails__2TrrQ .artboard-items-module_textStyleWrapper__1a3F6 .artboard-items-module_textStyleItem__17GFJ label {\n            display: flex;\n            justify-content: space-between; }\n          .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp .artboard-items-module_itemDetails__2TrrQ .artboard-items-module_textStyleWrapper__1a3F6 .artboard-items-module_textStyleItem__17GFJ h1 {\n            color: #000408;\n            padding: 0;\n            margin: 8px 0 0 0;\n            overflow: hidden; }\n          .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp .artboard-items-module_itemDetails__2TrrQ .artboard-items-module_textStyleWrapper__1a3F6 .artboard-items-module_textStyleItem__17GFJ:hover {\n            box-shadow: 0px 0.5px 1px rgba(0, 4, 8, 0.12), 0px 8px 16px -8px rgba(0, 4, 8, 0.08); }\n        .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp .artboard-items-module_itemDetails__2TrrQ .artboard-items-module_textStyleWrapper__1a3F6 .artboard-items-module_uploadNewFont__1IGP4 {\n          width: 224px;\n          height: 24px;\n          display: flex;\n          justify-content: space-between;\n          padding: 4px 8px; }\n          .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp .artboard-items-module_itemDetails__2TrrQ .artboard-items-module_textStyleWrapper__1a3F6 .artboard-items-module_uploadNewFont__1IGP4 span {\n            font-size: 11px;\n            color: #3399ff; }\n          .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp .artboard-items-module_itemDetails__2TrrQ .artboard-items-module_textStyleWrapper__1a3F6 .artboard-items-module_uploadNewFont__1IGP4 .artboard-items-module_svgBox__1BKTh {\n            width: 12px;\n            height: 12px;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            margin-right: 4px; }\n            .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp .artboard-items-module_itemDetails__2TrrQ .artboard-items-module_textStyleWrapper__1a3F6 .artboard-items-module_uploadNewFont__1IGP4 .artboard-items-module_svgBox__1BKTh svg {\n              fill: #3399ff; }\n    .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp.artboard-items-module_collapse__xrIAK .artboard-items-module_itemDetails__2TrrQ {\n      display: flex; }\n    .artboard-items-module_artboardsItems__1VFrx .artboard-items-module_row__1HHnp.artboard-items-module_collapse__xrIAK .artboard-items-module_titleRow__pu9ch .artboard-items-module_svgBox__1BKTh {\n      transform: rotate(90deg); }\n";
var style$s = {"artboardsItems":"artboard-items-module_artboardsItems__1VFrx","row":"artboard-items-module_row__1HHnp","titleRow":"artboard-items-module_titleRow__pu9ch","svgBox":"artboard-items-module_svgBox__1BKTh","itemDetails":"artboard-items-module_itemDetails__2TrrQ","textStyleWrapper":"artboard-items-module_textStyleWrapper__1a3F6","textStyleItem":"artboard-items-module_textStyleItem__17GFJ","uploadNewFont":"artboard-items-module_uploadNewFont__1IGP4","collapse":"artboard-items-module_collapse__xrIAK"};
styleInject(css_248z$v);

const items = [{
  id: getUnique(),
  label: 'Images',
  value: 'images',
  contents: []
}, {
  id: getUnique(),
  label: 'Colors',
  value: 'colors',
  contents: []
}, {
  id: getUnique(),
  label: 'Text Styles',
  value: 'textStyle',
  contents: [{
    title: 'Header',
    fontFamily: 'Aktiv-Grotesk',
    fontSize: 36,
    fontWeight: 700
  }, {
    title: 'Sub-Header',
    fontFamily: 'Aktiv-Grotesk',
    fontSize: 12,
    fontWeight: 700
  }, {
    title: 'Title',
    fontFamily: 'Tahoma',
    fontSize: 12,
    fontWeight: 700
  }, {
    title: 'Sub Title',
    fontFamily: 'Arial',
    fontSize: 12,
    fontWeight: 700
  }, {
    title: 'Sub Title 2',
    fontFamily: 'Proxima-Nova',
    fontSize: 80,
    fontWeight: 700
  }]
}, {
  id: getUnique(),
  label: 'Items',
  value: 'items',
  contents: []
}, {
  id: getUnique(),
  label: 'Templates',
  value: 'templates',
  contents: []
}];
const ArtboardsItems = ({
  onChangeValue,
  activeMenu
}) => {
  const {
    artboardsItems
  } = style$s;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, activeMenu.action === 'artboard' && /*#__PURE__*/React__default['default'].createElement("div", {
    className: artboardsItems
  }, items.map((item, key) => /*#__PURE__*/React__default['default'].createElement(Row, {
    item: item,
    key: key,
    onClick: selectedItem => onChangeValue(selectedItem)
  }))));
};

const Row = ({
  item,
  onClick,
  key
}) => {
  const {
    row,
    titleRow,
    svgBox,
    itemDetails,
    collapse
  } = style$s;
  const [isCollapse, setIsCollapse] = React$1.useState(false);
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", {
    key: key,
    className: `${row} ${isCollapse ? collapse : ''}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: titleRow,
    onClick: () => setIsCollapse(!isCollapse)
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: svgBox
  }, /*#__PURE__*/React__default['default'].createElement(ArrowRightSecondIcon, null)), /*#__PURE__*/React__default['default'].createElement("label", {
    onClick: () => onClick(item)
  }, item.label)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: itemDetails
  }, item.value === 'textStyle' && /*#__PURE__*/React__default['default'].createElement(TextStyle, _extends({
    key,
    item
  }, {
    onChangeValue: onClick
  })))));
};

const TextStyle = ({
  item,
  key,
  onChangeValue
}) => {
  const {
    textStyleWrapper,
    textStyleItem,
    uploadNewFont,
    svgBox
  } = style$s;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    key: key,
    className: textStyleWrapper
  }, item.contents.map(({
    title,
    fontFamily,
    fontSize,
    fontWeight
  }, key) => /*#__PURE__*/React__default['default'].createElement("div", {
    className: textStyleItem,
    key: key,
    onClick: () => onChangeValue({
      title,
      fontFamily,
      fontSize,
      fontWeight
    })
  }, /*#__PURE__*/React__default['default'].createElement("label", null, /*#__PURE__*/React__default['default'].createElement("span", null, title), /*#__PURE__*/React__default['default'].createElement("span", null, `${fontFamily.replace('-', ' ')} , ${fontWeight} , ${fontSize}`)), /*#__PURE__*/React__default['default'].createElement("h1", {
    style: {
      fontFamily,
      fontSize,
      fontWeight
    }
  }, "Header"))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: uploadNewFont
  }, /*#__PURE__*/React__default['default'].createElement("span", null, "Upload New Font"), /*#__PURE__*/React__default['default'].createElement("div", {
    className: svgBox
  }, /*#__PURE__*/React__default['default'].createElement(PlusIcon, null))));
};

var css_248z$u = ".add-menu-module_addMenu__2M05g {\n  width: 240px;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n  box-sizing: border-box;\n  padding-top: 4px;\n  padding-bottom: 46px;\n  background: #ffffff;\n  position: absolute;\n  left: 40px;\n  top: 40px;\n  border-top: 1px solid #ebebeb;\n  border-left: 1px solid #ebebeb;\n  z-index: 1; }\n  .add-menu-module_addMenu__2M05g * {\n    font-family: Aktiv Grotesk, sans-serif;\n    user-select: none; }\n  .add-menu-module_addMenu__2M05g .add-menu-module_header__3oQxK {\n    width: 224px;\n    height: 32px;\n    display: flex;\n    box-sizing: border-box;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: 4px; }\n    .add-menu-module_addMenu__2M05g .add-menu-module_header__3oQxK .add-menu-module_text__k_8Tc {\n      width: 208px;\n      height: 32px;\n      font-family: Aktiv Grotesk, sans-serif;\n      box-sizing: border-box;\n      font-size: 12px;\n      line-height: 24px;\n      font-weight: 600;\n      display: flex;\n      align-items: center;\n      padding-left: 8px;\n      cursor: text; }\n      .add-menu-module_addMenu__2M05g .add-menu-module_header__3oQxK .add-menu-module_text__k_8Tc.add-menu-module_purple__2rg-K {\n        color: #b555e5; }\n      .add-menu-module_addMenu__2M05g .add-menu-module_header__3oQxK .add-menu-module_text__k_8Tc.add-menu-module_black__1VxTk {\n        color: #31363a; }\n    .add-menu-module_addMenu__2M05g .add-menu-module_header__3oQxK .add-menu-module_searchInput__2WcVW {\n      border: 0;\n      outline: 0;\n      padding: 8px;\n      width: 100%; }\n    .add-menu-module_addMenu__2M05g .add-menu-module_header__3oQxK .add-menu-module_backBtn__3w2eo {\n      height: 32px;\n      width: 32px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      cursor: pointer; }\n    .add-menu-module_addMenu__2M05g .add-menu-module_header__3oQxK .add-menu-module_btnAction__pwV_Y {\n      display: flex; }\n      .add-menu-module_addMenu__2M05g .add-menu-module_header__3oQxK .add-menu-module_btnAction__pwV_Y .add-menu-module_crossIcon__2lBjS svg path {\n        stroke: #31363a; }\n      .add-menu-module_addMenu__2M05g .add-menu-module_header__3oQxK .add-menu-module_btnAction__pwV_Y .add-menu-module_searchIcon__2D017 svg path {\n        fill: #31363a; }\n    .add-menu-module_addMenu__2M05g .add-menu-module_header__3oQxK [type='text']:focus,\n    .add-menu-module_addMenu__2M05g .add-menu-module_header__3oQxK [type='password']:focus,\n    .add-menu-module_addMenu__2M05g .add-menu-module_header__3oQxK [type='number']:focus,\n    .add-menu-module_addMenu__2M05g .add-menu-module_header__3oQxK [type='email']:focus,\n    .add-menu-module_addMenu__2M05g .add-menu-module_header__3oQxK [type='search']:focus {\n      color: #31363a; }\n  .add-menu-module_addMenu__2M05g .add-menu-module_items__2t7Ey {\n    width: 240px; }\n";
var style$r = {"addMenu":"add-menu-module_addMenu__2M05g","header":"add-menu-module_header__3oQxK","text":"add-menu-module_text__k_8Tc","purple":"add-menu-module_purple__2rg-K","black":"add-menu-module_black__1VxTk","searchInput":"add-menu-module_searchInput__2WcVW","backBtn":"add-menu-module_backBtn__3w2eo","btnAction":"add-menu-module_btnAction__pwV_Y","crossIcon":"add-menu-module_crossIcon__2lBjS","searchIcon":"add-menu-module_searchIcon__2D017","items":"add-menu-module_items__2t7Ey"};
styleInject(css_248z$u);

const AddMenu = ({
  textColor = 'black',
  styles
}) => {
  const {
    addMenu,
    header,
    btnAction,
    crossIcon,
    searchIcon,
    text,
    items,
    searchInput,
    backBtn
  } = style$r;
  const [isSearch, setIsSearch] = React$1.useState(false);
  const [search, setSearch] = React$1.useState('');
  const [breadcrumb, setBreadcrumb] = React$1.useState([{
    label: 'Add',
    action: null
  }]);
  const [activeMenu, setActiveMenu] = React$1.useState({
    label: 'Add',
    action: null,
    back: [null, 'Add'] //0 -> Action 1-Label,

  });
  const itemsDate = [{
    label: 'Mockups',
    value: 'mockups',
    resent: [{
      id: getUnique(),
      label: 'Print'
    }, {
      id: getUnique(),
      label: 'Electronic'
    }, {
      id: getUnique(),
      label: 'Packaging'
    }]
  }, {
    label: 'Stock Photos',
    value: 'stockPhotos',
    resent: [{
      id: getUnique(),
      label: 'Unsplash'
    }, {
      id: getUnique(),
      label: 'Shutterstock'
    }]
  }, {
    label: 'Illustrations & Graphics',
    value: 'illustrations',
    resent: [{
      id: getUnique(),
      label: 'Unicolor blob blob blob '
    }, {
      id: getUnique(),
      label: 'Stamped Stamped blob blob blob'
    }]
  }, {
    label: 'Filters',
    value: 'filters'
  }];
  const branding = [{
    id: getUnique(),
    label: 'Artboard',
    value: 'artboard',
    date: 'Last Update 2mins ago',
    imageUrl: '/images/components/add-menu/artboard-logo.png'
  }];

  const goToPreventMenu = () => {
    setActiveMenu({ ...activeMenu,
      back: [null, 'Add'],
      action: activeMenu.back && activeMenu.back.length > 0 ? activeMenu.back[0] : null,
      label: activeMenu.back && activeMenu.back.length > 0 ? activeMenu.back[1] : 'Add'
    });
    console.log('breadcrumb.length', breadcrumb.length - 1);
    setBreadcrumb(breadcrumb.splice(1, breadcrumb.length - 1));
  };

  React$1.useEffect(() => {
    console.log('BREADCRUMB', breadcrumb);
  }, [breadcrumb]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${addMenu}`,
    style: styles
  }, /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", {
    className: header
  }, isSearch ? /*#__PURE__*/React__default['default'].createElement(Input, {
    value: search,
    onChangValue: setSearch,
    setValue: setSearch,
    size: "noStyle",
    type: "string",
    className: searchInput,
    placeholder: "Search"
  }) : /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, activeMenu.action && /*#__PURE__*/React__default['default'].createElement("div", {
    className: backBtn,
    onClick: () => goToPreventMenu()
  }, /*#__PURE__*/React__default['default'].createElement(ArrowLeftIcon, null)), /*#__PURE__*/React__default['default'].createElement("label", {
    className: `${text} ${style$r[textColor]}`
  }, activeMenu.label)) // <>
  //   {breadcrumb.map(({ action, label }, key) => (
  //     <div
  //       key={key}
  //       onClick={() => {
  //         setActiveMenu({ action });
  //         for (let i = key; i < breadcrumb.length; i++) {
  //           console.log({ key, i });
  //           console.log(breadcrumb.splice(1, i - 1));
  //           // setBreadcrumb(breadcrumb.splice(1, i - 1));
  //         }
  //       }}
  //     >
  //       {label}
  //       {`key => ${key}`}
  //     </div>
  //   ))}
  // </>
  , /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${btnAction}`
  }, isSearch && /*#__PURE__*/React__default['default'].createElement(IconButton, {
    className: crossIcon,
    onClick: () => setIsSearch(false)
  }, /*#__PURE__*/React__default['default'].createElement(CrossIcon, null)), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    className: searchIcon,
    onClick: () => setIsSearch(true)
  }, /*#__PURE__*/React__default['default'].createElement(SearchIcon, null)))), /*#__PURE__*/React__default['default'].createElement(Mockup, _extends({
    onChangeValue: val => {
      console.log(val);
    }
  }, {
    activeMenu,
    setActiveMenu,
    setBreadcrumb,
    breadcrumb
  })), /*#__PURE__*/React__default['default'].createElement(StockPhotos, _extends({
    onChangeValue: val => {
      console.log(val);
    }
  }, {
    activeMenu,
    setActiveMenu
  })), /*#__PURE__*/React__default['default'].createElement(Illustrations, _extends({
    onChangeValue: val => {
      console.log(val);
    }
  }, {
    activeMenu,
    setActiveMenu
  })), /*#__PURE__*/React__default['default'].createElement(Filters, _extends({
    onChangeValue: val => {
      console.log(val);
    }
  }, {
    activeMenu
  })), /*#__PURE__*/React__default['default'].createElement(ArtboardsItems, _extends({
    onChangeValue: val => {
      console.log(val);
    }
  }, {
    activeMenu
  })), !activeMenu.action && /*#__PURE__*/React__default['default'].createElement("div", {
    className: items
  }, itemsDate.map((item, key) => /*#__PURE__*/React__default['default'].createElement(ItemMenu, {
    item: item,
    key: key,
    onClick: item => {
      console.log(item);
      setActiveMenu({
        action: item.value,
        label: item.label
      });
      setBreadcrumb([...breadcrumb, {
        action: item.value,
        label: item.label
      }]);
    }
  })), /*#__PURE__*/React__default['default'].createElement(Branding, {
    items: branding,
    onChangeValue: item => {
      console.log(item);
      setActiveMenu({
        action: item.value,
        label: item.label
      });
    }
  }))));
};

const DiamondIcon = ({
  width = 8,
  height = 10
}) => /*#__PURE__*/React__default['default'].createElement("svg", {
  width: width,
  height: height
}, /*#__PURE__*/React__default['default'].createElement("path", {
  fill: "#B555E6",
  stroke: "#B555E6",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  d: "M4 9.19961L0.890191 5.31235C0.744103 5.12974 0.744103 4.87026 0.89019 4.68765L4 0.80039L7.10981 4.68765C7.2559 4.87026 7.2559 5.12974 7.10981 5.31235L4 9.19961Z"
}));
const RectangleIcon$1 = ({
  width = 16,
  height = 16
}) => /*#__PURE__*/React__default['default'].createElement("svg", {
  width: width,
  height: height,
  viewBox: `0 0 16 16`
}, /*#__PURE__*/React__default['default'].createElement("path", {
  d: "M.5 4C.5 2.067 2.067.5 4 .5h8c1.933 0 3.5 1.567 3.5 3.5v8c0 1.933-1.567 3.5-3.5 3.5H4C2.067 15.5.5 13.933.5 12V4z",
  stroke: "#333",
  fill: "transparent"
}));
const EllipseIcon = ({
  width = 16,
  height = 16
}) => /*#__PURE__*/React__default['default'].createElement("svg", {
  width: width,
  height: height,
  viewBox: `0 0 16 16`
}, /*#__PURE__*/React__default['default'].createElement("circle", {
  cx: "8",
  cy: "8",
  r: "7.5",
  stroke: "#333",
  fill: "transparent"
}));
const PolygonIcon = ({
  width = 16,
  height = 16
}) => /*#__PURE__*/React__default['default'].createElement("svg", {
  width: width,
  height: height,
  viewBox: `0 0 16 16`
}, /*#__PURE__*/React__default['default'].createElement("path", {
  d: "M6.65836 1.80131C7.21115.695741 8.78885.695741 9.34164 1.80132L15.1056 13.3292c.4986.9973-.2266 2.1708-1.3417 2.1708H2.23607C1.121 15.5.395751 14.3265.894427 13.3292L6.65836 1.80131z",
  stroke: "#333",
  fill: "transparent"
}));
const StarIcon = ({
  width = 18,
  height = 17
}) => /*#__PURE__*/React__default['default'].createElement("svg", {
  width: width,
  height: height,
  viewBox: `0 0 18 17`
}, /*#__PURE__*/React__default['default'].createElement("path", {
  d: "M8.55163 1.03827c.18341-.371624.71333-.371624.89674 0l1.80953 3.66649c.2185.44271.6408.74957 1.1294.82056l4.0462.58795c.4101.05959.5739.56358.2771.85284l-2.9279 2.85397c-.3535.34462-.5148.84112-.4314 1.32772l.6912 4.0298c.0701.4085-.3586.72-.7254.5271l-3.61909-1.9026c-.43698-.2298-.95904-.2298-1.39602 0l-3.61904 1.9026c-.36681.1929-.79553-.1186-.72548-.5271l.69118-4.0298c.08346-.4866-.07787-.9831-.43139-1.32772L1.28939 6.96611c-.296758-.28926-.133-.79325.27711-.85284l4.04621-.58795c.48856-.07099.91091-.37785 1.1294-.82056l1.80952-3.66649z",
  stroke: "#333",
  fill: "transparent"
}));

var css_248z$t = ".shape-menu-module_shapeMenu__2O5hG {\n  width: 103px;\n  position: absolute;\n  background: #ffffff;\n  box-shadow: 0px 0.5px 1px rgba(0, 4, 8, 0.12), 0px 8px 16px -8px rgba(0, 4, 8, 0.08);\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 4px 0;\n  z-index: 1;\n  left: 44px;\n  top: -8px; }\n  .shape-menu-module_shapeMenu__2O5hG * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none; }\n  .shape-menu-module_shapeMenu__2O5hG .shape-menu-module_itemWrapper__duGfK {\n    width: 95px;\n    height: 32px;\n    display: flex;\n    justify-content: left;\n    align-items: center; }\n    .shape-menu-module_shapeMenu__2O5hG .shape-menu-module_itemWrapper__duGfK .shape-menu-module_icon__2MFdP {\n      width: 32px;\n      height: 32px;\n      display: flex;\n      align-items: center;\n      justify-content: center; }\n    .shape-menu-module_shapeMenu__2O5hG .shape-menu-module_itemWrapper__duGfK .shape-menu-module_title__2Gh1X {\n      font-size: 11px;\n      color: #333333; }\n    .shape-menu-module_shapeMenu__2O5hG .shape-menu-module_itemWrapper__duGfK.shape-menu-module_active__2ay5j, .shape-menu-module_shapeMenu__2O5hG .shape-menu-module_itemWrapper__duGfK:hover {\n      background: #f5f5f5;\n      border-radius: 6px; }\n";
var style$q = {"shapeMenu":"shape-menu-module_shapeMenu__2O5hG","itemWrapper":"shape-menu-module_itemWrapper__duGfK","icon":"shape-menu-module_icon__2MFdP","title":"shape-menu-module_title__2Gh1X","active":"shape-menu-module_active__2ay5j"};
styleInject(css_248z$t);

const shapeMenuItem$1 = [{
  icon: /*#__PURE__*/React__default['default'].createElement(RectangleIcon$1, null),
  title: 'Rectangle'
}, {
  icon: /*#__PURE__*/React__default['default'].createElement(EllipseIcon, null),
  title: 'Ellipse'
}, {
  icon: /*#__PURE__*/React__default['default'].createElement(PolygonIcon, null),
  title: 'Polygon'
}, {
  icon: /*#__PURE__*/React__default['default'].createElement(StarIcon, null),
  title: 'Star'
}];
const ShapeMenu = ({
  onChange = () => {},
  setValue = shapeMenuItem$1[0].title,
  styles
}) => {
  const {
    shapeMenu,
    itemWrapper,
    icon,
    title,
    active
  } = style$q;
  const [activeItem, setActiveItem] = React$1.useState(setValue);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: shapeMenu,
    style: styles
  }, shapeMenuItem$1.map((item, key) => /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${itemWrapper} ${activeItem === item.title ? active : ''}`,
    key: key,
    onClick: () => {
      onChange(item.title);
      setActiveItem(item.title);
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: icon
  }, item.icon), /*#__PURE__*/React__default['default'].createElement("div", {
    className: title
  }, item.title))));
};

const BrushesIcon = ({
  width = 18,
  height = 19
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 18 19",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M1.72946 1.59806C1.66758 1.28866 1.90422 1 2.21975 1H3.84856L5.22259 1.91603L5.99994 2.43426V1.5V1H11.7801C12.0957 1 12.3323 1.28866 12.2704 1.59806L11.19 7H12.2098L13.251 1.79417C13.4366 0.865987 12.7267 0 11.7801 0H5.49994H4.99994V0.5V0.565741L4.27729 0.0839748L4.15133 0H3.99994H2.21975C1.27318 0 0.563239 0.865986 0.748877 1.79417L1.79004 7H2.80985L1.72946 1.59806Z",
    fill: "#333333"
  }), /*#__PURE__*/React__default['default'].createElement("mask", {
    id: "path-2-inside-1",
    fill: "white"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M1 9C1 8.44772 1.44772 8 2 8H12C12.5523 8 13 8.44772 13 9V10C13 11.1046 12.1046 12 11 12H9L9.25124 14.5124C9.38443 15.8443 8.33853 17 7 17C5.66147 17 4.61557 15.8443 4.74876 14.5124L5 12H3C1.89543 12 1 11.1046 1 10V9Z"
  })), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M5 12L5.99504 12.0995C6.02315 11.8184 5.93103 11.5385 5.74145 11.329C5.55187 11.1195 5.28253 11 5 11V12ZM9 12V11C8.71747 11 8.44813 11.1195 8.25855 11.329C8.06897 11.5385 7.97685 11.8184 8.00496 12.0995L9 12ZM4.74876 14.5124L3.75372 14.4129L4.74876 14.5124ZM2 9H12V7H2V9ZM12 9V10H14V9H12ZM2 10V9H0V10H2ZM5 11H3V13H5V11ZM11 11H9V13H11V11ZM8.00496 12.0995L8.2562 14.6119L10.2463 14.4129L9.99504 11.9005L8.00496 12.0995ZM5.7438 14.6119L5.99504 12.0995L4.00496 11.9005L3.75372 14.4129L5.7438 14.6119ZM7 16C6.2531 16 5.66948 15.3551 5.7438 14.6119L3.75372 14.4129C3.56167 16.3335 5.06985 18 7 18V16ZM0 10C0 11.6569 1.34315 13 3 13V11C2.44772 11 2 10.5523 2 10H0ZM12 10C12 10.5523 11.5523 11 11 11V13C12.6569 13 14 11.6569 14 10H12ZM8.2562 14.6119C8.33052 15.3551 7.7469 16 7 16V18C8.93015 18 10.4383 16.3335 10.2463 14.4129L8.2562 14.6119ZM12 9H14C14 7.89543 13.1046 7 12 7V9ZM2 7C0.895431 7 0 7.89543 0 9H2V7Z",
    fill: "#333333",
    mask: "url(#path-2-inside-1)"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M15.5 18.5H17.5V16.5",
    stroke: "#333333",
    "stroke-linecap": "round"
  }));
};
const BrushIcon = ({
  width = 18,
  height = 19
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 14 17",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.72946 1.59806C1.66758 1.28866 1.90422 1 2.21975 1H3.84856L5.22259 1.91603L5.99994 2.43426V1.5V1H11.7801C12.0957 1 12.3323 1.28866 12.2704 1.59806L11.19 7H12.2098L13.251 1.79417C13.4366 0.865987 12.7267 0 11.7801 0H5.49994H4.99994V0.5V0.565741L4.27729 0.0839748L4.15133 0H3.99994H2.21975C1.27318 0 0.563239 0.865986 0.748877 1.79417L1.79004 7H2.80985L1.72946 1.59806Z",
    fill: "#333333"
  }), /*#__PURE__*/React__default['default'].createElement("mask", {
    id: "path-2-inside-1",
    fill: "white"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M1 9C1 8.44772 1.44772 8 2 8H12C12.5523 8 13 8.44772 13 9V10C13 11.1046 12.1046 12 11 12H9L9.25124 14.5124C9.38443 15.8443 8.33853 17 7 17C5.66147 17 4.61557 15.8443 4.74876 14.5124L5 12H3C1.89543 12 1 11.1046 1 10V9Z"
  })), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M5 12L5.99504 12.0995C6.02315 11.8184 5.93103 11.5385 5.74145 11.329C5.55187 11.1195 5.28253 11 5 11V12ZM9 12V11C8.71747 11 8.44813 11.1195 8.25855 11.329C8.06897 11.5385 7.97685 11.8184 8.00496 12.0995L9 12ZM4.74876 14.5124L3.75372 14.4129L4.74876 14.5124ZM2 9H12V7H2V9ZM12 9V10H14V9H12ZM2 10V9H0V10H2ZM5 11H3V13H5V11ZM11 11H9V13H11V11ZM8.00496 12.0995L8.2562 14.6119L10.2463 14.4129L9.99504 11.9005L8.00496 12.0995ZM5.7438 14.6119L5.99504 12.0995L4.00496 11.9005L3.75372 14.4129L5.7438 14.6119ZM7 16C6.2531 16 5.66948 15.3551 5.7438 14.6119L3.75372 14.4129C3.56167 16.3335 5.06985 18 7 18V16ZM0 10C0 11.6569 1.34315 13 3 13V11C2.44772 11 2 10.5523 2 10H0ZM12 10C12 10.5523 11.5523 11 11 11V13C12.6569 13 14 11.6569 14 10H12ZM8.2562 14.6119C8.33052 15.3551 7.7469 16 7 16V18C8.93015 18 10.4383 16.3335 10.2463 14.4129L8.2562 14.6119ZM12 9H14C14 7.89543 13.1046 7 12 7V9ZM2 7C0.895431 7 0 7.89543 0 9H2V7Z",
    fill: "#333333",
    mask: "url(#path-2-inside-1)"
  }));
};
const CrayonBrushIcon = ({
  width = 20,
  height = 20
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 20 20",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M4.259 16.6332c-.4003.1475-.7896-.2418-.6421-.642l1.6879-4.5814 9.1147-9.1148c.5858-.5857 1.5355-.5857 2.1213 0l1.4142 1.4143c.5858.5857.5858 1.5355 0 2.1213l-9.1147 9.1147-4.5814 1.6879zM8.7627 14.3159l-3.5356-3.5356",
    stroke: "#333"
  }));
};
const InkBrushIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M9.5 6.5l-9 9",
    stroke: "#333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.9939.578a.5001.5001 0 00-.8475-.4315c-.9253.9253-2.1594 1.551-3.5419 2.0733-.6893.2604-1.4042.4911-2.1275.7218l-.1617.0516c-.6666.2124-1.3395.4268-1.9862.662-1.3917.506-2.7276 1.1299-3.714 2.1162C2.6086 6.7782 2 8.1272 2 10h1c0-1.6271.5164-2.7156 1.3223-3.5214.8261-.8262 1.9902-1.3898 3.3485-1.8837.6269-.228 1.281-.4364 1.9519-.6502l.1581-.0504c.722-.2302 1.4602-.4682 2.1771-.739 1.015-.3835 2.0104-.8408 2.8869-1.4582l-.0211.1882c-.0255.228-.0519.4643-.0802.7056-.0984.839-.2218 1.764-.4114 2.6944-.3673 1.802-.9691 3.5473-2.0451 4.7147H9a.5.5 0 00-.4.8l1.1715 1.562c-.1548.0688-.3445.1395-.5633.2074-.5175.1608-1.1703.2977-1.8563.3608-.6874.0633-1.3898.0508-2.0129-.0751-.6256-.1263-1.1363-.3595-1.4855-.7086l-.707.7071c.5347.5347 1.2525.8319 1.9946.9817.7447.1504 1.5492.16 2.3025.0907.7546-.0695 1.4762-.2198 2.0612-.4016.2925-.0908.5578-.1917.7797-.2978.2125-.1017.4208-.2248.569-.373A.5.5 0 0010.9 12.2L10 11h2.5a.5.5 0 00.3535-.1464c1.3809-1.3809 2.0662-3.4439 2.4584-5.3686.198-.9716.3252-1.9293.4247-2.7776.0304-.2588.058-.5052.084-.7381.0605-.541.1129-1.0091.1733-1.3913z",
    fill: "#333"
  }));
};
const SprayBrushIcon = ({
  width = 16,
  height = 17
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 17",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M15.5 7V7C15.5 5.61929 14.3807 4.5 13 4.5H11C9.61929 4.5 8.5 5.61929 8.5 7V7",
    stroke: "#333333"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M13.5 5V2.5C13.5 1.94772 13.0523 1.5 12.5 1.5H11.5C10.9477 1.5 10.5 1.94772 10.5 2.5V5",
    stroke: "#333333"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M0.5 0.5L7.5 2.5L0.5 4.5",
    stroke: "#333333",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React__default['default'].createElement("mask", {
    id: "path-4-inside-1",
    fill: "white"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M16 7H8V15C8 16.1046 8.89543 17 10 17H14C15.1046 17 16 16.1046 16 15V7Z"
  })), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M16 7V6C16.5523 6 17 6.44772 17 7H16ZM8 7H7C7 6.44772 7.44771 6 8 6V7ZM16 8H8V6H16V8ZM9 7V15H7V7H9ZM10 16H14V18H10V16ZM15 15V7H17V15H15ZM14 16C14.5523 16 15 15.5523 15 15H17C17 16.6569 15.6569 18 14 18V16ZM9 15C9 15.5523 9.44772 16 10 16V18C8.34315 18 7 16.6569 7 15H9Z",
    fill: "#333333",
    mask: "url(#path-4-inside-1)"
  }));
};

var css_248z$s = ".brushes-menu-module_brushMenu__23bMK {\n  width: 120px;\n  position: absolute;\n  background: #ffffff;\n  box-shadow: 0px 0.5px 1px rgba(0, 4, 8, 0.12), 0px 8px 16px -8px rgba(0, 4, 8, 0.08);\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 4px 0;\n  z-index: 1;\n  left: 44px;\n  top: -8px; }\n  .brushes-menu-module_brushMenu__23bMK * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none; }\n  .brushes-menu-module_brushMenu__23bMK .brushes-menu-module_itemWrapper__1ZLHc {\n    width: 112px;\n    height: 32px;\n    display: flex;\n    justify-content: left;\n    align-items: center; }\n    .brushes-menu-module_brushMenu__23bMK .brushes-menu-module_itemWrapper__1ZLHc .brushes-menu-module_icon__STFEG {\n      width: 32px;\n      height: 32px;\n      display: flex;\n      align-items: center;\n      justify-content: center; }\n    .brushes-menu-module_brushMenu__23bMK .brushes-menu-module_itemWrapper__1ZLHc .brushes-menu-module_title__2Xqq6 {\n      font-size: 11px;\n      color: #333333; }\n    .brushes-menu-module_brushMenu__23bMK .brushes-menu-module_itemWrapper__1ZLHc.brushes-menu-module_active__E5ZLB, .brushes-menu-module_brushMenu__23bMK .brushes-menu-module_itemWrapper__1ZLHc:hover {\n      background: #f5f5f5;\n      border-radius: 6px; }\n";
var style$p = {"brushMenu":"brushes-menu-module_brushMenu__23bMK","itemWrapper":"brushes-menu-module_itemWrapper__1ZLHc","icon":"brushes-menu-module_icon__STFEG","title":"brushes-menu-module_title__2Xqq6","active":"brushes-menu-module_active__E5ZLB"};
styleInject(css_248z$s);

const shapeMenuItem = [{
  icon: /*#__PURE__*/React__default['default'].createElement(BrushIcon, null),
  title: 'Normal Brush'
}, {
  icon: /*#__PURE__*/React__default['default'].createElement(CrayonBrushIcon, null),
  title: 'Crayon Brush'
}, {
  icon: /*#__PURE__*/React__default['default'].createElement(InkBrushIcon, null),
  title: 'Ink Brush'
}, {
  icon: /*#__PURE__*/React__default['default'].createElement(SprayBrushIcon, null),
  title: 'Spray Brush'
}];
const BrushesMenu = ({
  onChange = () => {},
  setValue = shapeMenuItem[0].title,
  styles
}) => {
  const {
    brushMenu,
    itemWrapper,
    icon,
    title,
    active
  } = style$p;
  const [activeItem, setActiveItem] = React$1.useState(setValue);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: brushMenu,
    style: styles
  }, shapeMenuItem.map((item, key) => /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${itemWrapper} ${activeItem === item.title ? active : ''}`,
    key: key,
    onClick: () => {
      onChange(item.title);
      setActiveItem(item.title);
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: icon
  }, item.icon), /*#__PURE__*/React__default['default'].createElement("div", {
    className: title
  }, item.title))));
};

var css_248z$r = ".options-module_options__3naya {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 8px 0;\n  background: #ffffff;\n  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.06), 0px 0.5px 1px rgba(0, 0, 0, 0.24);\n  border-radius: 8px;\n  list-style: none;\n  min-width: 180px; }\n  .options-module_options__3naya * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none; }\n  .options-module_options__3naya li {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    font-size: 11px;\n    color: #31363a;\n    width: 172px;\n    height: 24px;\n    display: flex; }\n    .options-module_options__3naya li.options-module_divider__2ZPvS {\n      height: 1px;\n      border-radius: 2px;\n      background-color: #e8ebed;\n      border: 0;\n      margin: 4px 8px; }\n    .options-module_options__3naya li .options-module_row__1VVDG {\n      width: 172px;\n      height: 24px;\n      text-align: left;\n      user-select: none;\n      display: flex;\n      justify-content: space-between;\n      box-sizing: border-box;\n      padding: 4px 8px; }\n      .options-module_options__3naya li .options-module_row__1VVDG span {\n        display: flex;\n        align-items: center; }\n        .options-module_options__3naya li .options-module_row__1VVDG span.options-module_shortcut__waK7U {\n          color: #999999; }\n      .options-module_options__3naya li .options-module_row__1VVDG svg {\n        stroke: #31363a;\n        margin: 4px; }\n      .options-module_options__3naya li .options-module_row__1VVDG.options-module_normal__3q3Ji:hover {\n        color: #ffffff;\n        background: #3399ff;\n        border-radius: 4px; }\n        .options-module_options__3naya li .options-module_row__1VVDG.options-module_normal__3q3Ji:hover svg {\n          stroke: #ffffff; }\n        .options-module_options__3naya li .options-module_row__1VVDG.options-module_normal__3q3Ji:hover .options-module_shortcut__waK7U {\n          color: #ffffff; }\n      .options-module_options__3naya li .options-module_row__1VVDG .options-module_component__uQHAr {\n        box-sizing: border-box; }\n      .options-module_options__3naya li .options-module_row__1VVDG:focus {\n        outline: none; }\n    .options-module_options__3naya li hr {\n      width: 172px;\n      height: 1px;\n      border-radius: 2px;\n      background-color: #e8ebed;\n      border: 0;\n      margin: 4px 8px; }\n    .options-module_options__3naya li:hover ul {\n      display: block; }\n  .options-module_options__3naya ul {\n    display: none;\n    position: absolute;\n    right: -194px;\n    z-index: 1; }\n";
var style$o = {"options":"options-module_options__3naya","divider":"options-module_divider__2ZPvS","row":"options-module_row__1VVDG","shortcut":"options-module_shortcut__waK7U","normal":"options-module_normal__3q3Ji","component":"options-module_component__uQHAr"};
styleInject(css_248z$r);

const Options = ({
  data,
  styles,
  ref = null,
  onItemClick = null
}) => {
  const {
    options,
    row,
    divider,
    normal,
    component,
    shortcut
  } = style$o;
  return /*#__PURE__*/React__default['default'].createElement("ul", {
    className: `${options}`,
    style: styles,
    ref: ref
  }, data.map((item, key) => /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("li", {
    key: key
  }, item.component ? /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${row} ${component}`,
    style: {
      height: 'auto'
    }
  }, item.component) : /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${row} ${normal}`,
    onClick: () => onItemClick(item)
  }, /*#__PURE__*/React__default['default'].createElement("span", null, item.label), item.shortcut && /*#__PURE__*/React__default['default'].createElement("span", {
    className: shortcut
  }, item.shortcut[isMacOs() ? 1 : 0]), item.subMenu ? /*#__PURE__*/React__default['default'].createElement(ChevronArrowIcon, null) : null)), item.divider ? /*#__PURE__*/React__default['default'].createElement("li", {
    className: `${row} ${divider}`
  }) : null)));
};

var css_248z$q = ".colors-action-in-menu-module_colorsActionInMenu__3aUtr {\n  display: flex;\n  width: 172px;\n  justify-content: space-between;\n  align-items: center; }\n  .colors-action-in-menu-module_colorsActionInMenu__3aUtr * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none; }\n  .colors-action-in-menu-module_colorsActionInMenu__3aUtr .colors-action-in-menu-module_title__12uhx {\n    color: #999999; }\n  .colors-action-in-menu-module_colorsActionInMenu__3aUtr .colors-action-in-menu-module_colorsActionWrapper__35zN0 {\n    box-sizing: border-box;\n    justify-content: space-between;\n    display: flex;\n    width: 112px; }\n    .colors-action-in-menu-module_colorsActionInMenu__3aUtr .colors-action-in-menu-module_colorsActionWrapper__35zN0 .colors-action-in-menu-module_colorsActionItem__3b6Mk {\n      box-sizing: border-box;\n      width: 12px;\n      height: 12px;\n      border-radius: 50%; }\n";
var style$n = {"colorsActionInMenu":"colors-action-in-menu-module_colorsActionInMenu__3aUtr","title":"colors-action-in-menu-module_title__12uhx","colorsActionWrapper":"colors-action-in-menu-module_colorsActionWrapper__35zN0","colorsActionItem":"colors-action-in-menu-module_colorsActionItem__3b6Mk"};
styleInject(css_248z$q);

const ColorsActionInMenu = ({
  onChange = null
}) => {
  const colors = [{
    hex: '#3399FF',
    name: 'blue'
  }, {
    hex: '#B555E5',
    name: 'purple'
  }, {
    hex: '#FF3B30',
    name: 'red'
  }, {
    hex: '#FF9500',
    name: 'orange'
  }, {
    hex: '#FFCC00',
    name: 'yellow'
  }, {
    hex: '#34C759',
    name: 'green'
  }];
  const {
    colorsActionInMenu,
    title,
    colorsActionWrapper,
    colorsActionItem
  } = style$n;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: colorsActionInMenu
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: title
  }, "Label"), /*#__PURE__*/React__default['default'].createElement("div", {
    className: colorsActionWrapper
  }, colors.map((item, key) => /*#__PURE__*/React__default['default'].createElement("div", {
    className: colorsActionItem,
    key: key,
    style: {
      backgroundColor: item.hex
    },
    onClick: () => onChange({
      field: 'color',
      value: item.name
    })
  }))));
};

const FolderIcon = ({
  width = 12,
  height = 10
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 12 10`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M6.553 2.224l.138.276H9.75c.356 0 .598 0 .787.013.183.013.279.035.346.063a1 1 0 01.54.541c.028.067.051.163.064.346.013.189.013.43.013.787V7c0 .473 0 .802-.018 1.06-.017.254-.05.401-.096.514a1.5 1.5 0 01-.812.812c-.113.046-.26.079-.514.096C9.802 9.5 9.473 9.5 9 9.5H3c-.473 0-.802 0-1.06-.018-.254-.017-.401-.05-.514-.096a1.5 1.5 0 01-.812-.812c-.046-.113-.079-.26-.096-.514A17.265 17.265 0 01.5 7V3c0-.473 0-.802.018-1.06.017-.254.05-.401.096-.514a1.5 1.5 0 01.812-.812c.113-.046.26-.079.514-.096C2.198.5 2.527.5 3 .5h2.691l.862 1.724z",
    fill: "#F5F5F5",
    stroke: "#999"
  }));
};
const VectorIcon = ({
  width = 12,
  height = 10
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: `0 0 12 12`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 2a1 1 0 102 0 1 1 0 00-2 0zm-.92.564A2 2 0 108.05 1.56a7.504 7.504 0 00-6.49 6.489 2 2 0 101.005.032 6.504 6.504 0 015.517-5.516zM2 9a1 1 0 100 2 1 1 0 000-2z",
    fill: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M0 10a2 2 0 114 0 2 2 0 01-4 0z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 10a1 1 0 102 0 1 1 0 00-2 0zm1-2a2 2 0 100 4 2 2 0 000-4z",
    fill: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M8 2a2 2 0 114 0 2 2 0 01-4 0z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 2a1 1 0 102 0 1 1 0 00-2 0zm1-2a2 2 0 100 4 2 2 0 000-4z",
    fill: "#999"
  }));
};
const RectangleIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: `0 0 12 12`
  }, /*#__PURE__*/React__default['default'].createElement("rect", {
    x: ".5",
    y: ".5",
    width: "11",
    height: "11",
    rx: "2.5",
    fill: "#F5F5F5",
    stroke: "#999"
  }));
};
const MockupItemIcon = ({
  width = 11,
  height = 13
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: `0 0 11 13`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M5.053 1.224a1 1 0 01.894 0l4 2a1 1 0 01.553.894v4.764a1 1 0 01-.553.894l-4 2a1 1 0 01-.894 0l-4-2A1 1 0 01.5 8.882V4.118a1 1 0 01.553-.894l4-2z",
    fill: "#F5F5F5",
    stroke: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.382 3.5L5.5 5.441 1.618 3.5l-.342.17A.5.5 0 001 4.119v.191l4 2v4.882l.276.138a.5.5 0 00.448 0L6 11.191V6.309l4-2v-.191a.5.5 0 00-.276-.447L9.382 3.5z",
    fill: "#999"
  }));
};
const TextIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: `0 0 12 12`
  }, /*#__PURE__*/React__default['default'].createElement("rect", {
    x: ".5",
    y: ".5",
    width: "11",
    height: "11",
    rx: "2.5",
    fill: "#F5F5F5",
    stroke: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6 3a.5.5 0 01.462.308L8.833 9H7.75l-.417-1H4.667L4.25 9H3.167l2.372-5.692A.5.5 0 016 3zm-.917 4h1.834L6 4.8 5.083 7z",
    fill: "#999"
  }));
};
const ImageIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 12 12`,
    fill: "transparent"
  }, /*#__PURE__*/React__default['default'].createElement("rect", {
    x: ".5",
    y: ".5",
    width: "11",
    height: "11",
    rx: "2.5",
    stroke: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M5.293 6.707l-3 3a1 1 0 00-.293.707v.086a1 1 0 001 1h5.864A2.636 2.636 0 0011.5 8.864a.879.879 0 00-.257-.621l-.536-.536a1 1 0 00-1.414 0L8.5 8.5 6.707 6.707a1 1 0 00-1.414 0z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M8.5 8.5L6.707 6.707a1 1 0 00-1.414 0l-3 3a1 1 0 00-.293.707v.086a1 1 0 001 1h5.864A2.636 2.636 0 0011.5 8.864a.879.879 0 00-.257-.621l-.536-.536a1 1 0 00-1.414 0L8.5 8.5zm0 0l-1 1",
    stroke: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("circle", {
    cx: "4",
    cy: "4",
    r: "1",
    fill: "#999"
  }));
};
const FileIcon = ({
  width = 10,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 10 12`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M.5 4.5c0-.706 0-1.21.027-1.607.027-.393.079-.645.163-.85A2.5 2.5 0 012.043.69c.205-.084.457-.136.85-.163C3.29.5 3.794.5 4.5.5h1.293L9.5 4.207V7.5c0 .706 0 1.21-.027 1.607-.027.393-.079.645-.163.85a2.5 2.5 0 01-1.353 1.353c-.205.084-.457.136-.85.163-.397.027-.901.027-1.607.027h-1c-.706 0-1.21 0-1.607-.027-.393-.027-.645-.079-.85-.163A2.5 2.5 0 01.69 9.957C.606 9.752.554 9.5.527 9.107.5 8.71.5 8.206.5 7.5v-3z",
    fill: "#F5F5F5",
    stroke: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M9.5 4.207V4.5H7A1.5 1.5 0 015.5 3V.5h.293L9.5 4.207z",
    fill: "#F5F5F5",
    stroke: "#999"
  }));
};
const FilterIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 12 12`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 2h-.5c-.713 0-1.197 0-1.573.026-.368.025-.559.07-.692.126a2 2 0 00-1.083 1.083c-.055.133-.1.324-.126.692C1.001 4.303 1 4.787 1 5.5v2c0 .713 0 1.197.026 1.573.025.368.07.559.126.692a2 2 0 001.083 1.083c.133.055.324.1.692.126.376.025.86.026 1.573.026h2c.713 0 1.197 0 1.573-.026.368-.025.559-.07.692-.126a2 2 0 001.083-1.083c.055-.133.1-.324.126-.692.025-.376.026-.86.026-1.573V7h1v.5c0 1.398 0 2.097-.228 2.648a3 3 0 01-1.624 1.624C8.597 12 7.898 12 6.5 12h-2c-1.398 0-2.097 0-2.648-.228a3 3 0 01-1.624-1.624C0 9.597 0 8.898 0 7.5v-2c0-1.398 0-2.097.228-2.648a3 3 0 011.624-1.624C2.403 1 3.102 1 4.5 1H5v1z",
    fill: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M7 1c0 3.2-2.667 4-4 4 3.2 0 4 2.667 4 4 0-3.2 2.667-4 4-4-3.2 0-4-2.667-4-4z",
    fill: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M10 0c0 1.6-1.333 2-2 2 1.6 0 2 1.333 2 2 0-1.6 1.333-2 2-2-1.6 0-2-1.333-2-2z",
    fill: "#999"
  }));
};
const MaskIcon = ({
  width = 18,
  height = 18
}) => {
  return (
    /*#__PURE__*/
    // <svg width={width} height={height} viewBox={`0 0 12 12`}>
    //   <rect
    //     x='.5'
    //     y='.5'
    //     width='11'
    //     height='11'
    //     rx='5.5'
    //     fill='#F5F5F5'
    //     stroke='#999'
    //   />
    //   <mask
    //     id='a'
    //     maskUnits='userSpaceOnUse'
    //     x='0'
    //     y='0'
    //     width='12'
    //     height='12'
    //   >
    //     <rect
    //       x='.5'
    //       y='.5'
    //       width='11'
    //       height='11'
    //       rx='5.5'
    //       fill='#F5F5F5'
    //       stroke='#999'
    //     />
    //   </mask>
    //   <g mask='url(#a)'>
    //     <rect x='-4' width='12' height='12' rx='6' fill='#999' />
    //   </g>
    // </svg>
    React__default['default'].createElement("svg", {
      width: width,
      height: height,
      viewBox: `0 0 18 18`
    }, /*#__PURE__*/React__default['default'].createElement("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M6 17.4879C9.4956 16.2524 12 12.9187 12 9c0-3.9187-2.5044-7.2524-6-8.4879C2.5044 1.7476 0 5.0813 0 9c0 3.9187 2.5044 7.2524 6 8.4879z",
      fill: "#999"
    }), /*#__PURE__*/React__default['default'].createElement("rect", {
      x: ".5",
      y: ".5",
      width: "17",
      height: "17",
      rx: "8.5",
      stroke: "#333"
    }))
  );
};
const ShapeModeUnion = ({
  width = 13,
  height = 13
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 13 13`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 5H2a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1V8h3a1 1 0 001-1V2a1 1 0 00-1-1H6a1 1 0 00-1 1v3zM4 2a2 2 0 012-2h5a2 2 0 012 2v5a2 2 0 01-2 2H9v2a2 2 0 01-2 2H2a2 2 0 01-2-2V6a2 2 0 012-2h2V2z",
    fill: "#999"
  }));
};
const ShapeModeSubtract = ({
  width = 16,
  height = 16
}) => {
  return (
    /*#__PURE__*/
    // <svg width={width} height={height} viewBox={`0 0 13 13`}>
    //   <path
    //     fillRule='evenodd'
    //     clipRule='evenodd'
    //     d='M4.333 4.333H2a2 2 0 00-2 2V11a2 2 0 002 2h4.667a2 2 0 002-2V8.667H6.333a2 2 0 01-2-2V4.333z'
    //     fill='#999'
    //   />
    //   <rect
    //     x='4.833'
    //     y='.5'
    //     width='7.667'
    //     height='7.667'
    //     rx='1.5'
    //     stroke='#999'
    //   />
    //   <path
    //     fillRule='evenodd'
    //     clipRule='evenodd'
    //     d='M4.333 4.333H3c-.932 0-1.398 0-1.765.153A2 2 0 00.152 5.568C0 5.936 0 6.401 0 7.333V10c0 .932 0 1.398.152 1.765a2 2 0 001.083 1.083C1.602 13 2.068 13 3 13h2.667c.932 0 1.397 0 1.765-.152a2 2 0 001.082-1.083c.153-.367.153-.833.153-1.765V8.667h-1V10c0 .48 0 .79-.017 1.026-.016.228-.042.315-.06.357a1 1 0 01-.54.54c-.042.018-.13.045-.357.06C6.456 12 6.146 12 5.667 12H3c-.48 0-.79 0-1.026-.017-.228-.015-.315-.042-.357-.06a1 1 0 01-.54-.54c-.018-.042-.045-.129-.06-.357A16.908 16.908 0 011 10V7.333c0-.48 0-.789.017-1.026.015-.228.042-.315.06-.356a1 1 0 01.54-.542c.042-.017.129-.043.357-.059.237-.016.546-.017 1.026-.017h1.333v-1z'
    //     fill='#999'
    //   />
    // </svg>
    // <svg width="16" height="16" fill="none">
    React__default['default'].createElement("svg", {
      width: width,
      height: height,
      viewBox: `0 0 16 16`
    }, /*#__PURE__*/React__default['default'].createElement("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M5 5H3C1.3432 5 0 6.343 0 8v5c0 1.6568 1.3432 3 3 3h5c1.6569 0 3-1.3432 3-3v-2H8c-1.6569 0-3-1.3432-3-3V5z",
      fill: "#999"
    }), /*#__PURE__*/React__default['default'].createElement("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M13 1H8c-1.1046 0-2 .8954-2 2v5c0 1.1046.8954 2 2 2h5c1.1046 0 2-.8954 2-2V3c0-1.1046-.8954-2-2-2zM8 0C6.3431 0 5 1.3432 5 3v5c0 1.6569 1.3431 3 3 3h5c1.6569 0 3-1.3431 3-3V3c0-1.6568-1.3431-3-3-3H8z",
      fill: "#333"
    }), /*#__PURE__*/React__default['default'].createElement("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M5 5H3C1.3432 5 0 6.343 0 8v5c0 1.6568 1.3432 3 3 3h5c1.6569 0 3-1.3432 3-3v-2h-1v2c0 1.1045-.8954 2-2 2H3c-1.1046 0-2-.8955-2-2V8c0-1.1046.8954-2 2-2h2V5z",
      fill: "#333"
    }))
  );
};
const ShapeModeIntersect = ({
  width = 16,
  height = 16
}) => {
  return (
    /*#__PURE__*/
    // <svg width={width} height={height} viewBox={`0 0 13 13`}>
    //   <mask id='a' fill='#fff'>
    //     <path
    //       fillRule='evenodd'
    //       clipRule='evenodd'
    //       d='M8.667 8.667H6.333a2 2 0 01-2-2V4.333h2.334a2 2 0 012 2v2.334z'
    //     />
    //   </mask>
    //   <path
    //     fillRule='evenodd'
    //     clipRule='evenodd'
    //     d='M8.667 8.667H6.333a2 2 0 01-2-2V4.333h2.334a2 2 0 012 2v2.334z'
    //     fill='#999'
    //   />
    //   <path
    //     d='M8.667 8.667v1h1v-1h-1zM4.333 4.333v-1h-1v1h1zm4.334 3.334H6.333v2h2.334v-2zm-2.334 0a1 1 0 01-1-1h-2a3 3 0 003 3v-2zm-1-1V4.333h-2v2.334h2zm-1-1.334h2.334v-2H4.333v2zm2.334 0a1 1 0 011 1h2a3 3 0 00-3-3v2zm1 1v2.334h2V6.333h-2z'
    //     fill='#999'
    //     mask='url(#a)'
    //   />
    //   <rect
    //     x='.5'
    //     y='4.833'
    //     width='7.667'
    //     height='7.667'
    //     rx='1.5'
    //     stroke='#999'
    //   />
    //   <rect
    //     x='4.833'
    //     y='.5'
    //     width='7.667'
    //     height='7.667'
    //     rx='1.5'
    //     stroke='#999'
    //   />
    // </svg>
    React__default['default'].createElement("svg", {
      fill: "none",
      width: width,
      height: height,
      viewBox: `0 0 16 16`
    }, /*#__PURE__*/React__default['default'].createElement("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M11 11H8c-1.6569 0-3-1.3431-3-3V5h3c1.6569 0 3 1.3432 3 3v3z",
      fill: "#999"
    }), /*#__PURE__*/React__default['default'].createElement("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M8 1h5c1.1046 0 2 .8954 2 2v5c0 1.1046-.8954 2-2 2h-2V8c0-1.6569-1.3431-3-3-3H6V3c0-1.1046.8954-2 2-2zM5 5V3c0-1.6568 1.3431-3 3-3h5c1.6569 0 3 1.3432 3 3v5c0 1.6569-1.3431 3-3 3h-2v2c0 1.6569-1.3431 3-3 3H3c-1.6568 0-3-1.3431-3-3V8c0-1.6569 1.3432-3 3-3h2zm5 6v2c0 1.1046-.8954 2-2 2H3c-1.1046 0-2-.8954-2-2V8c0-1.1046.8954-2 2-2h2v2c0 1.6569 1.3431 3 3 3h2zm0-1H8c-1.1046 0-2-.8954-2-2V6h2c1.1046 0 2 .8954 2 2v2z",
      fill: "#333"
    }))
  );
};
const ShapeModeExclude = ({
  width = 16,
  height = 16
}) => {
  return (
    /*#__PURE__*/
    //   <svg width={width} height={height} viewBox={`0 0 13 13`}>
    //     <mask id='a' fill='#fff'>
    //       <path
    //         fillRule='evenodd'
    //         clipRule='evenodd'
    //         d='M8.667 8.667H6.333a2 2 0 01-2-2V4.333h2.334a2 2 0 012 2v2.334z'
    //       />
    //     </mask>
    //     <path
    //       d='M8.667 8.667v1h1v-1h-1zM4.333 4.333v-1h-1v1h1zm4.334 3.334H6.333v2h2.334v-2zm-2.334 0a1 1 0 01-1-1h-2a3 3 0 003 3v-2zm-1-1V4.333h-2v2.334h2zm-1-1.334h2.334v-2H4.333v2zm2.334 0a1 1 0 011 1h2a3 3 0 00-3-3v2zm1 1v2.334h2V6.333h-2z'
    //       fill='#999'
    //       mask='url(#a)'
    //     />
    //     <path
    //       fillRule='evenodd'
    //       clipRule='evenodd'
    //       d='M6.333 0a2 2 0 00-2 2v2.333H2a2 2 0 00-2 2V11a2 2 0 002 2h4.667a2 2 0 002-2V8.667H11a2 2 0 002-2V2a2 2 0 00-2-2H6.333zm2.334 8.667V6.333a2 2 0 00-2-2H4.333v2.334a2 2 0 002 2h2.334z'
    //       fill='#999'
    //     />
    //     <path
    //       fillRule='evenodd'
    //       clipRule='evenodd'
    //       d='M10 1H7.333c-.48 0-.789 0-1.026.017-.228.015-.315.042-.356.06a1 1 0 00-.542.54c-.017.042-.043.129-.059.357A16.92 16.92 0 005.333 3v1.333h-1V3c0-.932 0-1.398.153-1.765A2 2 0 015.568.152C5.936 0 6.401 0 7.333 0H10c.932 0 1.398 0 1.765.152a2 2 0 011.083 1.083C13 1.602 13 2.068 13 3v2.667c0 .932 0 1.397-.152 1.765a2 2 0 01-1.083 1.082c-.367.153-.833.153-1.765.153H8.667v-1H10c.48 0 .79 0 1.026-.017.228-.016.315-.042.357-.06a1 1 0 00.54-.54c.018-.042.045-.13.06-.357C12 6.456 12 6.146 12 5.667V3c0-.48 0-.79-.017-1.026-.015-.228-.042-.315-.06-.357a1 1 0 00-.54-.54c-.042-.018-.129-.045-.357-.06A16.908 16.908 0 0010 1zM7.667 8.667h1V10c0 .932 0 1.398-.153 1.765a2 2 0 01-1.082 1.083C7.064 13 6.599 13 5.667 13H3c-.932 0-1.398 0-1.765-.152a2 2 0 01-1.083-1.083C0 11.398 0 10.932 0 10V7.333c0-.932 0-1.397.152-1.765a2 2 0 011.083-1.082c.367-.153.833-.153 1.765-.153h1.333v1H3c-.48 0-.79 0-1.026.017-.228.016-.315.042-.357.06a1 1 0 00-.54.54c-.018.042-.045.13-.06.357C1 6.544 1 6.854 1 7.333V10c0 .48 0 .79.017 1.026.015.228.042.315.06.357a1 1 0 00.54.54c.042.018.129.045.357.06C2.21 12 2.52 12 3 12h2.667c.48 0 .789 0 1.026-.017.228-.015.315-.042.356-.06a1 1 0 00.542-.54c.017-.042.043-.129.059-.357.016-.237.017-.546.017-1.026V8.667z'
    //       fill='#999'
    //     />
    //   </svg>
    // );
    React__default['default'].createElement("svg", {
      fill: "none",
      width: width,
      height: height,
      viewBox: `0 0 16 16`
    }, /*#__PURE__*/React__default['default'].createElement("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M8 0C6.3431 0 5 1.3432 5 3v2H3C1.3432 5 0 6.3431 0 8v5c0 1.6569 1.3432 3 3 3h5c1.6569 0 3-1.3431 3-3v-2h2c1.6569 0 3-1.3431 3-3V3c0-1.6568-1.3431-3-3-3H8zm3 11V8c0-1.6569-1.3431-3-3-3H5v3c0 1.6569 1.3431 3 3 3h3z",
      fill: "#999"
    }), /*#__PURE__*/React__default['default'].createElement("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M8 1h5c1.1046 0 2 .8954 2 2v5c0 1.1046-.8954 2-2 2h-2V8c0-1.6569-1.3431-3-3-3H6V3c0-1.1046.8954-2 2-2zM5 5V3c0-1.6568 1.3431-3 3-3h5c1.6569 0 3 1.3432 3 3v5c0 1.6569-1.3431 3-3 3h-2v2c0 1.6569-1.3431 3-3 3H3c-1.6568 0-3-1.3431-3-3V8c0-1.6569 1.3432-3 3-3h2zm5 6v2c0 1.1046-.8954 2-2 2H3c-1.1046 0-2-.8954-2-2V8c0-1.1046.8954-2 2-2h2v2c0 1.6569 1.3431 3 3 3h2zm0-1H8c-1.1046 0-2-.8954-2-2V6h2c1.1046 0 2 .8954 2 2v2z",
      fill: "#333"
    }))
  );
};
const ItemSubtract = ({
  width = 11,
  height = 13
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 11 13`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M5.053 1.224a1 1 0 01.894 0l4 2a1 1 0 01.553.894v4.764a1 1 0 01-.553.894l-4 2a1 1 0 01-.894 0l-4-2A1 1 0 01.5 8.882V4.118a1 1 0 01.553-.894l4-2z",
    fill: "#F5F5F5",
    stroke: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.382 3.5L5.5 5.441 1.618 3.5l-.342.17A.5.5 0 001 4.119v.191l4 2v4.882l.276.138a.5.5 0 00.448 0L6 11.191V6.309l4-2v-.191a.5.5 0 00-.276-.447L9.382 3.5z",
    fill: "#999"
  }));
};
const ArtboardIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 12 12`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2.5 0a.5.5 0 01.5.5V2h6V.5a.5.5 0 011 0V2h1.5a.5.5 0 010 1H10v6h1.5a.5.5 0 010 1H10v1.5a.5.5 0 01-1 0V10H3v1.5a.5.5 0 01-1 0V10H.5a.5.5 0 010-1H2V3H.5a.5.5 0 010-1H2V.5a.5.5 0 01.5-.5zM9 9V3H3v6h6z",
    fill: "#333"
  }));
};
const VideoIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 12 12`
  }, /*#__PURE__*/React__default['default'].createElement("rect", {
    x: ".5",
    y: ".5",
    width: "11",
    height: "11",
    rx: "2.5",
    fill: "#F5F5F5",
    stroke: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M4 3.883v4.234a.5.5 0 00.757.429l3.528-2.117a.5.5 0 000-.858L4.757 3.454a.5.5 0 00-.757.43z",
    fill: "#999"
  }));
};
const FXIcon = ({
  width = 11,
  height = 7
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 11 7`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M.314 7V.7h4.041v.891H1.268v1.926H3.86v.837H1.268V7H.314zM5.324 7l1.88-3.15L5.307.7h1.107l1.359 2.268L9.095.7h1.07l-1.88 3.123L10.184 7h-1.09L7.719 4.705 6.413 7h-1.09z",
    fill: "#333"
  }));
};
const EyeIcon = ({
  width = 12,
  height = 6
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 6"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.5841 3.99999L10.5841 4H11.6585L11.6585 3.99999C10.8348 1.66961 8.61233 0 5.9999 0C3.38746 0 1.16498 1.66962 0.341309 4H1.41565C2.18767 2.23296 3.95094 1 5.9999 1C8.04885 1 9.81212 2.23295 10.5841 3.99999ZM5.99988 3C5.17145 3 4.49988 3.67157 4.49988 4.5C4.49988 5.32843 5.17145 6 5.99988 6C6.8283 6 7.49988 5.32843 7.49988 4.5C7.49988 3.67157 6.8283 3 5.99988 3Z",
    fill: "#000408"
  }));
};
const EyeOffIcon = ({
  width = 12,
  height = 4
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 12 4`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.416 0a5.002 5.002 0 009.168 0h1.075A6.003 6.003 0 01.34 0h1.075z",
    fill: "#333"
  }));
};
const LockIcon = ({
  width = 8,
  height = 11
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 8 11`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4 0C2.34315 0 1 1.34315 1 3V5C0.447715 5 0 5.44772 0 6V9C0 10.1046 0.895431 11 2 11H6C7.10457 11 8 10.1046 8 9V6C8 5.44772 7.55228 5 7 5V3C7 1.34315 5.65685 0 4 0ZM6 5V3C6 1.89543 5.10457 1 4 1C2.89543 1 2 1.89543 2 3V5H6ZM1 9V6H7V9C7 9.55228 6.55228 10 6 10H2C1.44772 10 1 9.55228 1 9Z",
    fill: "#000408"
  }));
};
const LockedIcon = ({
  width = 8,
  height = 11
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 8 11`,
    fill: "white"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M1.5 5V3A2.5 2.5 0 014 .5v0A2.5 2.5 0 016.5 3v2",
    stroke: "#333"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M.5 6a.5.5 0 01.5-.5h6a.5.5 0 01.5.5v3A1.5 1.5 0 016 10.5H2A1.5 1.5 0 01.5 9V6z",
    fill: "#333",
    stroke: "#333",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
const VolumeIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("mask", {
    id: "path-1-inside-1",
    fill: "white"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M2 3C0.895431 3 0 3.89543 0 5V7C0 8.10457 0.895431 9 2 9H3L6.4855 11.0913C7.15203 11.4912 8 11.0111 8 10.2338V1.76619C8 0.988896 7.15203 0.508783 6.4855 0.908698L3 3H2Z"
  })), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M3 9L3.5145 8.14251L3.27698 8H3V9ZM3 3V4H3.27698L3.5145 3.85749L3 3ZM6.4855 11.0913L5.97101 11.9488L6.4855 11.0913ZM-1 5V7H1V5H-1ZM2 10H3V8H2V10ZM2.4855 9.85749L5.97101 11.9488L7 10.2338L3.5145 8.14251L2.4855 9.85749ZM9 10.2338V1.76619H7V10.2338H9ZM5.97101 0.0512046L2.4855 2.14251L3.5145 3.85749L7 1.76619L5.97101 0.0512046ZM3 2H2V4H3V2ZM9 1.76619C9 0.211601 7.30406 -0.748625 5.97101 0.0512046L7 1.76619V1.76619H9ZM5.97101 11.9488C7.30405 12.7486 9 11.7884 9 10.2338H7L7 10.2338L5.97101 11.9488ZM-1 7C-1 8.65685 0.343146 10 2 10V8C1.44772 8 1 7.55228 1 7H-1ZM1 5C1 4.44772 1.44772 4 2 4V2C0.343146 2 -1 3.34315 -1 5H1Z",
    fill: "#333333",
    mask: "url(#path-1-inside-1)"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 7.73243C9.5978 7.38662 10 6.74028 10 6C10 5.25972 9.5978 4.61337 9 4.26756V6V7.73243Z",
    fill: "#333333"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 9.74796C10.7252 9.30392 12 7.73782 12 5.87398C12 4.01014 10.7252 2.44404 9 2V3.04469C10.1652 3.45652 11 4.56776 11 5.87398C11 7.1802 10.1652 8.29144 9 8.70328V9.74796Z",
    fill: "#333333"
  }));
};
const VolumeMuteIcon = ({
  width = 10,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 10 12",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3.5145 8.14251L3.27698 8H3H2C1.44772 8 1 7.55229 1 7V5C1 4.44772 1.44772 4 2 4H3H3.27698L3.5145 3.8575L7 1.76619V3H8V1.76619C8 0.988898 7.15203 0.508785 6.4855 0.9087L3 3H2C0.895431 3 0 3.89543 0 5V7C0 8.10457 0.895431 9 2 9H3L6.4855 11.0913C7.15203 11.4912 8 11.0111 8 10.2338V9H7V10.2338L6.4855 11.0913L7 10.2338L3.5145 8.14251Z",
    fill: "#333333"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M6 7.5L9 4.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M9 7.5L6 4.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
};

var css_248z$p = ".creator-module_creator__iBp7G {\n  display: flex;\n  width: 172px;\n  height: 32px;\n  justify-content: left;\n  align-items: center;\n  margin: 4px 0 0 -4px; }\n  .creator-module_creator__iBp7G * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none; }\n  .creator-module_creator__iBp7G .creator-module_image__nbbgx {\n    border-radius: 50%;\n    width: 24px;\n    height: 24px;\n    background-size: cover;\n    background-position: center;\n    background-repeat: no-repeat;\n    margin-right: 8px; }\n  .creator-module_creator__iBp7G .creator-module_title__1ZO1M {\n    color: #333333; }\n";
var style$m = {"creator":"creator-module_creator__iBp7G","image":"creator-module_image__nbbgx","title":"creator-module_title__1ZO1M"};
styleInject(css_248z$p);

const Creator = ({
  onChange = null,
  creatorData = null
}) => {
  const {
    creator,
    image,
    title
  } = style$m;
  const imageUrl = "https://static.intercomassets.com/avatars/531238/square_128/muco-1528109817.jpg?1528109817";
  const imageStyle = {
    backgroundImage: `url(${imageUrl})`
  };
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: creator
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: image,
    style: imageStyle
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: title
  }, "Created by ..."));
}; // https://static.intercomassets.com/avatars/531238/square_128/muco-1528109817.jpg?1528109817

// very simple className utility for creating a classname string...
// Falsy arguments are ignored:
//
// const active = true
// const className = classnames(
//    "class1",
//    !active && "class2",
//    active && "class3"
// ); // returns -> class1 class3";
//
function classnames$1(...classes) {
  // Use Boolean constructor as a filter callback
  // Allows for loose type truthy/falsey checks
  // Boolean("") === false;
  // Boolean(false) === false;
  // Boolean(undefined) === false;
  // Boolean(null) === false;
  // Boolean(0) === false;
  // Boolean("classname") === true;
  return classes.filter(Boolean).join(' ');
}

var css_248z$o = ".layers-module_layers__fa5p7 {\n  width: 240px;\n  height: 100%;\n  padding: 0px 8px;\n  position: absolute;\n  border-top: 1px solid #ebebeb;\n  border-left: 1px solid #ebebeb;\n  left: 40px;\n  top: 40px;\n  display: flex;\n  flex-direction: column;\n  justify-content: left;\n  background: #ffffff;\n  z-index: 1;\n  overflow-x: hidden; }\n  .layers-module_layers__fa5p7 * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none; }\n  .layers-module_layers__fa5p7 .layers-module_header__1Yi9U {\n    width: 224px;\n    height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: start;\n    padding: 8px; }\n    .layers-module_layers__fa5p7 .layers-module_header__1Yi9U label {\n      width: 38px;\n      height: 16px;\n      font-size: 12px;\n      line-height: 16px;\n      font-weight: 600;\n      display: flex;\n      align-items: center;\n      color: #333333; }\n  .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD {\n    height: 70%;\n    overflow-x: hidden; }\n    .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP {\n      position: relative;\n      width: 100%;\n      height: 32px;\n      display: flex;\n      box-sizing: border-box;\n      align-items: center;\n      overflow: hidden;\n      border-radius: 8px;\n      justify-content: stretch;\n      z-index: 5; }\n      .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF {\n        position: relative;\n        display: flex;\n        align-items: center;\n        height: 32px;\n        width: 100%;\n        height: 16px; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF .layers-module_textLayerTitle__3KQbJ {\n          display: flex;\n          align-items: baseline; }\n          .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF .layers-module_textLayerTitle__3KQbJ .layers-module_collapseIcon__oATlJ {\n            position: relative;\n            z-index: 300;\n            padding: 8px; }\n            .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF .layers-module_textLayerTitle__3KQbJ .layers-module_collapseIcon__oATlJ svg {\n              margin: 0; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF svg {\n          margin-left: 7px; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF::before {\n          content: '';\n          width: 2px;\n          height: 16px;\n          border-radius: 2px;\n          display: flex;\n          background-color: transparent; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_transparent__2xG7P::before {\n          background-color: transparent; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_blue__1XzYO::before {\n          background-color: #3399ff; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_purple__BNpxO::before {\n          background-color: #b555e5; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_red__3pWd0::before {\n          background-color: #ff3b30; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_orange__ff6Qs::before {\n          background-color: #ff9500; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_yellow__34pXd::before {\n          background-color: #ffcc00; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_green__1MNgt::before {\n          background-color: #34c759; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_active__RVs_S::before {\n          background-color: #ff3b30; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF label {\n          font-size: 11px;\n          line-height: 16px;\n          display: flex;\n          align-items: center;\n          color: #333333;\n          margin-left: 10px; }\n          .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF label > svg {\n            transition: all 0.2s ease;\n            transform: rotate(0deg); }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF input {\n          font-size: 11px;\n          line-height: 16px;\n          display: flex;\n          align-items: center;\n          color: #333333;\n          margin-left: 8px;\n          border: 0; }\n      .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP:hover .layers-module_layerActionWrapper___guEN {\n        opacity: 1; }\n      .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerActionWrapper___guEN {\n        display: flex;\n        align-items: center;\n        position: absolute;\n        opacity: 0;\n        transition: opacity 0.1s;\n        justify-content: flex-end;\n        width: 72px;\n        transition: opacity 0.1s;\n        z-index: 150; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerActionWrapper___guEN .layers-module_layerIconBtn__3CrpY {\n          align-items: center;\n          justify-content: center;\n          display: flex;\n          width: 24px;\n          height: 32px; }\n      .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP:focus {\n        content: '';\n        border: 1px solid #ebebeb;\n        width: 224px;\n        height: 32px;\n        border-radius: 8px;\n        position: fixed;\n        left: 48px; }\n  .layers-module_layers__fa5p7 .layers-module_pagesWrapper__GrsPs {\n    box-sizing: border-box; }\n  .layers-module_layers__fa5p7 [type='text']:focus,\n  .layers-module_layers__fa5p7 [type='password']:focus,\n  .layers-module_layers__fa5p7 [type='number']:focus,\n  .layers-module_layers__fa5p7 [type='email']:focus,\n  .layers-module_layers__fa5p7 [type='search']:focus {\n    color: #31363a;\n    font-style: italic;\n    font-weight: 600; }\n";
var style$l = {"layers":"layers-module_layers__fa5p7","header":"layers-module_header__1Yi9U","layersWrapper":"layers-module_layersWrapper__2k0XD","layersItems":"layers-module_layersItems__2X5fP","layerTextIconWrapper":"layers-module_layerTextIconWrapper__DikOF","textLayerTitle":"layers-module_textLayerTitle__3KQbJ","collapseIcon":"layers-module_collapseIcon__oATlJ","transparent":"layers-module_transparent__2xG7P","blue":"layers-module_blue__1XzYO","purple":"layers-module_purple__BNpxO","red":"layers-module_red__3pWd0","orange":"layers-module_orange__ff6Qs","yellow":"layers-module_yellow__34pXd","green":"layers-module_green__1MNgt","active":"layers-module_active__RVs_S","layerActionWrapper":"layers-module_layerActionWrapper___guEN","layerIconBtn":"layers-module_layerIconBtn__3CrpY","pagesWrapper":"layers-module_pagesWrapper__GrsPs"};
styleInject(css_248z$o);

var css_248z$n = ".template_layers__3G1QW .template_rst__tree__SSUZj {\n  margin-left: -15px; }\n\n.template_layers__3G1QW .template_rst__lineHalfHorizontalRight__iLorV::before,\n.template_layers__3G1QW .template_rst__lineFullVertical__FliD6::after,\n.template_layers__3G1QW .template_rst__lineHalfVerticalTop__19PN9::after,\n.template_layers__3G1QW .template_rst__lineHalfVerticalBottom__1q18E::after {\n  display: none !important; }\n\n.template_layers__3G1QW .template_rst__lineHalfHorizontalRight__iLorV::before {\n  display: none !important; }\n\n.template_layers__3G1QW .template_rst__rtl__y6FjX.template_rst__lineHalfHorizontalRight__iLorV::before {\n  display: none !important; }\n\n.template_layers__3G1QW .template_ReactVirtualized__Grid__OD_o5.template_ReactVirtualized__List__2UndT.template_rst__virtualScrollOverride__KGLez {\n  overflow: hidden !important; }\n\n.template_layers__3G1QW .template_rst__highlightBottomLeftCorner__72Gss::before,\n.template_layers__3G1QW .template_rst__highlightBottomLeftCorner__72Gss::after,\n.template_layers__3G1QW .template_rst__rtl__y6FjX.template_rst__highlightBottomLeftCorner__72Gss::after,\n.template_layers__3G1QW .template_rst__highlightTopLeftCorner__2KlSi::before,\n.template_layers__3G1QW .template_rst__highlightLineVertical__3uK7u::before {\n  display: none; }\n\n.template_layers__3G1QW .template_rst__placeholder__15G35::before {\n  border: none; }\n\n.template_layers__3G1QW .template_rst__node__-qavO:hover::before {\n  content: '';\n  border: 1px solid #ebebeb;\n  width: calc(100% - 16px);\n  height: 34px;\n  border-radius: 8px;\n  position: absolute;\n  left: 48px;\n  z-index: 1;\n  left: 15px; }\n\n.template_layers__3G1QW .template_law__rfL42 {\n  left: initial !important;\n  right: 0; }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(1) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 16px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(2) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 32px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(3) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 48px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(4) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 64px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(5) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 80px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(6) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 96px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(7) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 112px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(8) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 128px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(9) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 144px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(10) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 160px); }\n";
styleInject(css_248z$n);

const RowItem$1 = props => {
  const {
    scaffoldBlockPxWidth,
    toggleChildrenVisibility,
    connectDragPreview,
    connectDragSource,
    isDragging,
    canDrop,
    canDrag,
    node,
    title,
    subtitle,
    draggedNode,
    path,
    treeIndex,
    isSearchMatch,
    isSearchFocus,
    buttons,
    className,
    style,
    didDrop,
    treeId,
    isOver,
    // Not needed, but preserved for other renderers
    parentNode,
    // Needed for dndManager
    rowDirection,
    onRowClick,
    rowInfo,
    updateTitle,
    optionAction,
    setCopyRowInfo,
    ...otherProps
  } = props.data;
  const {
    layersItems,
    layerTextIconWrapper,
    layerSelected,
    layerActionWrapper,
    textLayerTitle,
    collapseIcon
  } = style$l;
  const [editTitle, setEditTitle] = React$1.useState(false);
  const [optionStyle, setOptionStyle] = React$1.useState({});
  const [toggleOption, setToggleOption] = React$1.useState(false); // editable row false by click outside.

  const labelEditWrapper = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (labelEditWrapper.current && !labelEditWrapper.current.contains(e.target)) {
        setEditTitle(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [labelEditWrapper]);

  const handleClick = event => {
    event.preventDefault();
    const {
      screenX,
      screenY
    } = event;
    let _optionStyle = {
      position: 'fixed',
      top: screenY - 100,
      left: screenX - 20,
      zIndex: 100
    };
    setOptionStyle(_optionStyle);
    setToggleOption(true);
  }; // close option by outside click.


  const optionWrapper = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (optionWrapper.current && !optionWrapper.current.contains(e.target)) {
        setToggleOption(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [optionWrapper]);

  const ArrowKeyUpDown = ({
    code
  }) => {
    if (code === 'Enter' || code === 'NumpadEnter' || code === 'Escape') {
      setEditTitle(false);
    }
  };

  const optionActionManager = ({
    row: {
      actionName
    }
  }) => {
    if (actionName === 'group') console.log(actionName);
    if (actionName === 'showOrHide') optionAction({
      value: '',
      field: 'eye'
    });
    if (actionName === 'lockOrUnlock') optionAction({
      value: '',
      field: 'lock'
    });

    if (actionName === 'rename') {
      setToggleOption(false);
      setEditTitle(true);
    }

    if (actionName === 'copy') {
      console.log('copy', {
        title: rowInfo.title,
        path: rowInfo.path
      });
      setToggleOption(false);
      setCopyRowInfo(rowInfo);
    }

    if (actionName === 'paste') {
      console.log('paste', {
        title: rowInfo.title,
        path: rowInfo.path
      });
      setToggleOption(false);
      optionAction({
        value: '',
        field: 'paste',
        path: rowInfo.path
      });
    }

    if (actionName === 'duplicate') {
      console.log('duplicate', {
        title: rowInfo.title,
        path: rowInfo.path
      });
      setToggleOption(false);
      optionAction({
        value: '',
        field: 'duplicate',
        path: rowInfo.path
      });
    }
  }; // ⌘ Command (or Cmd)
  // ⇧ Shift
  // ⌥ Option (or Alt)
  // ⌃ Control (or Ctrl)


  const options = [{
    label: 'Group',
    actionName: 'group',
    shortcut: ['Ctrl G', '⌘ G'],
    divider: false
  }, {
    label: 'Rename',
    actionName: 'rename',
    shortcut: ['Ctrl R', '⌘ G'],
    divider: true
  }, {
    label: 'Show / Hide',
    actionName: 'showOrHide',
    shortcut: ['Shift Ctrl H', '⇧ ⌘ H'],
    divider: false
  }, {
    label: 'Lock / Unlock',
    actionName: 'lockOrUnlock',
    shortcut: ['Shift Ctrl L', '⇧ ⌘ L'],
    divider: true
  }, {
    label: 'Label',
    component: /*#__PURE__*/React__default['default'].createElement(ColorsActionInMenu, {
      onChange: optionAction
    }),
    divider: true
  }, {
    label: 'Copy',
    actionName: 'copy',
    shortcut: ['Ctrl C', '⌘ C'],
    divider: false
  }, {
    label: 'Paste',
    actionName: 'paste',
    shortcut: ['Ctrl V', '⌘ V'],
    divider: false
  }, {
    label: 'Duplicate',
    actionName: 'duplicate',
    shortcut: ['Ctrl D', '⌘ D'],
    divider: true
  }, {
    label: 'Label',
    component: /*#__PURE__*/React__default['default'].createElement(Creator, {
      onChange: optionAction,
      style: {
        height: 32
      }
    }),
    divider: false
  }];
  const isDraggedDescendant = draggedNode && SortableTree.isDescendant(draggedNode, node);
  const isLandingPadActive = !didDrop && isDragging;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", _extends({}, otherProps, {
    className: `${layersItems} ${node.selected ? layerSelected : ''}`,
    onContextMenu: e => handleClick(e)
  }), connectDragPreview(connectDragSource( /*#__PURE__*/React__default['default'].createElement("div", {
    className: classnames$1(isLandingPadActive && 'rst__rowLandingPad', isLandingPadActive && !canDrop && 'rst__rowCancelPad', isSearchMatch && 'rst__rowSearchMatch', isSearchFocus && 'rst__rowSearchFocus', className),
    style: {
      opacity: isDraggedDescendant ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${layerTextIconWrapper} ${style$l[node.color]}` // onClick={() => onRowClick(rowInfo)}
    ,
    onDoubleClick: () => {
      setEditTitle(true);
    }
  }, node.type === 'image' && /*#__PURE__*/React__default['default'].createElement(ImageIcon, null), node.type === 'video' && /*#__PURE__*/React__default['default'].createElement(VideoIcon, null), node.type === 'shape' && /*#__PURE__*/React__default['default'].createElement(ShapeModeUnion, null), node.type === 'vector' && /*#__PURE__*/React__default['default'].createElement(VectorIcon, null), node.type === 'text' && /*#__PURE__*/React__default['default'].createElement(TextIcon, null), node.type === 'rectangle' && /*#__PURE__*/React__default['default'].createElement(RectangleIcon, null), node.type === 'mockupItem' && /*#__PURE__*/React__default['default'].createElement(MockupItemIcon, null), node.type === 'artboard' && /*#__PURE__*/React__default['default'].createElement(ArtboardIcon, null), node.type === 'file' && /*#__PURE__*/React__default['default'].createElement(FileIcon, null), node.type === 'group' && /*#__PURE__*/React__default['default'].createElement(FolderIcon, null), node.type === 'filter' && /*#__PURE__*/React__default['default'].createElement(FilterIcon, null), /*#__PURE__*/React__default['default'].createElement("div", {
    className: textLayerTitle
  }, !editTitle ? /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("label", null, node.title), toggleChildrenVisibility && node.children && (node.children.length > 0 || typeof node.children === 'function') && /*#__PURE__*/React__default['default'].createElement("div", {
    className: collapseIcon,
    type: "button",
    "aria-label": node.expanded ? 'Collapse' : 'Expand',
    onClick: () => toggleChildrenVisibility({
      node,
      path,
      treeIndex
    })
  }, /*#__PURE__*/React__default['default'].createElement(ArrowRightSecondIcon, null))) : /*#__PURE__*/React__default['default'].createElement("input", {
    type: "text",
    value: node.title,
    onKeyDown: ArrowKeyUpDown,
    autoFocus: true,
    ref: labelEditWrapper,
    onChange: e => updateTitle({
      value: e.target.value,
      rowInfo
    })
  })))), {
    dropEffect: 'copy'
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `law ${layerActionWrapper}`
  }, buttons.map((btn, index) => /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, {
    key: index
  }, btn)))), toggleOption ? /*#__PURE__*/React__default['default'].createElement("div", {
    ref: optionWrapper
  }, /*#__PURE__*/React__default['default'].createElement(Options, {
    data: options,
    styles: optionStyle,
    onItemClick: rowData => optionActionManager({
      row: rowData,
      rowInfo
    })
  })) : null);
};

class ArtboardStudioLayersTheme extends React$1.Component {
  render() {
    return /*#__PURE__*/React__default['default'].createElement(RowItem$1, {
      data: this.props
    });
  }

}

// very simple className utility for creating a classname string...
// Falsy arguments are ignored:
//
// const active = true
// const className = classnames(
//    "class1",
//    !active && "class2",
//    active && "class3"
// ); // returns -> class1 class3";
//
function classnames(...classes) {
  // Use Boolean constructor as a filter callback
  // Allows for loose type truthy/falsey checks
  // Boolean("") === false;
  // Boolean(false) === false;
  // Boolean(undefined) === false;
  // Boolean(null) === false;
  // Boolean(0) === false;
  // Boolean("classname") === true;
  return classes.filter(Boolean).join(' ');
}

const CheckIcon = ({
  width = 10,
  height = 8
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 10 8"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M.5 4.5L3 7l6-6",
    stroke: "#999",
    strokeLinecap: "round"
  }));
};

var css_248z$m = ".template_pages__1jMos {\n  height: 100%; }\n  .template_pages__1jMos .template_rst__tree__1Bion {\n    margin-left: -15px; }\n  .template_pages__1jMos .template_rst__lineHalfHorizontalRight__3Twe5::before,\n  .template_pages__1jMos .template_rst__lineFullVertical__2cVYe::after,\n  .template_pages__1jMos .template_rst__lineHalfVerticalTop__mrC0u::after,\n  .template_pages__1jMos .template_rst__lineHalfVerticalBottom__37jIB::after {\n    display: none !important; }\n  .template_pages__1jMos .template_rst__lineHalfHorizontalRight__3Twe5::before {\n    display: none !important; }\n  .template_pages__1jMos .template_rst__rtl__2Mec1.template_rst__lineHalfHorizontalRight__3Twe5::before {\n    display: none !important; }\n  .template_pages__1jMos .template_ReactVirtualized__Grid__3VrLM.template_ReactVirtualized__List__3m4ch.template_rst__virtualScrollOverride__1BfFC {\n    overflow: hidden !important; }\n  .template_pages__1jMos .template_rst__highlightBottomLeftCorner__298To::before,\n  .template_pages__1jMos .template_rst__highlightBottomLeftCorner__298To::after,\n  .template_pages__1jMos .template_rst__rtl__2Mec1.template_rst__highlightBottomLeftCorner__298To::after,\n  .template_pages__1jMos .template_rst__highlightTopLeftCorner__35fXI::before,\n  .template_pages__1jMos .template_rst__highlightLineVertical__3Ab_H::before {\n    display: none; }\n  .template_pages__1jMos .template_rst__placeholder__208EO::before {\n    border: none; }\n  .template_pages__1jMos .template_rst__nodeContent__3orKy {\n    width: 100%; }\n";
styleInject(css_248z$m);

var css_248z$l = ".pages-module_pages__1NKWH {\n  position: relative;\n  z-index: 2;\n  width: 100%; }\n  .pages-module_pages__1NKWH * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none; }\n  .pages-module_pages__1NKWH .pages-module_header__2TqxH {\n    height: 40px;\n    display: flex;\n    border-top: 1px solid #f5f5f5;\n    align-items: center;\n    justify-content: space-between;\n    padding: 8px 0 8px 8px; }\n    .pages-module_pages__1NKWH .pages-module_header__2TqxH label {\n      width: 38px;\n      height: 16px;\n      font-size: 12px;\n      line-height: 16px;\n      font-weight: 600;\n      display: flex;\n      align-items: center;\n      color: #333333; }\n    .pages-module_pages__1NKWH .pages-module_header__2TqxH .pages-module_actionButton__3sh81 {\n      width: 32px;\n      height: 32px; }\n  .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W {\n    height: 30%;\n    overflow-x: hidden; }\n    .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF {\n      width: calc(100% - 16px);\n      height: 32px;\n      padding: 8px 0 8px 8px;\n      display: flex;\n      align-items: center;\n      justify-content: left; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF::before {\n        content: '';\n        width: 2px;\n        height: 16px;\n        border-radius: 2px;\n        display: flex;\n        background-color: transparent;\n        margin-right: 5px; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_transparent__3qgyg::before {\n        background-color: transparent; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_blue__2gODu::before {\n        background-color: #3399ff; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_purple__m7hks::before {\n        background-color: #b555e5; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_red__wT5J7::before {\n        background-color: #ff3b30; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_orange__2_YOS::before {\n        background-color: #ff9500; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_yellow__24jeo::before {\n        background-color: #ffcc00; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_green__1j1qZ::before {\n        background-color: #34c759; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_active__7emcz::before {\n        background-color: #ff3b30; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF:hover {\n        border-radius: 8px;\n        background: #f5f5f5; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF .pages-module_pageName__18Uwq {\n        display: flex;\n        align-items: center; }\n        .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF .pages-module_pageName__18Uwq label {\n          color: #333333;\n          font-size: 11px;\n          line-height: 16px; }\n        .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF .pages-module_pageName__18Uwq input {\n          font-size: 11px;\n          line-height: 16px;\n          display: flex;\n          align-items: center;\n          color: #333333;\n          margin: -2px;\n          border: 0; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF .pages-module_icon__3_8-9 {\n        width: 32px;\n        height: 32px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        box-sizing: #f5f5f5; }\n        .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF .pages-module_icon__3_8-9 svg {\n          stroke: #999999; }\n  .pages-module_pages__1NKWH [type='text']:focus,\n  .pages-module_pages__1NKWH [type='password']:focus,\n  .pages-module_pages__1NKWH [type='number']:focus,\n  .pages-module_pages__1NKWH [type='email']:focus,\n  .pages-module_pages__1NKWH [type='search']:focus {\n    color: #31363a;\n    font-style: normal;\n    font-weight: 600; }\n";
var style$k = {"pages":"pages-module_pages__1NKWH","header":"pages-module_header__2TqxH","actionButton":"pages-module_actionButton__3sh81","pagesWrapper":"pages-module_pagesWrapper__v5A2W","pageRowWrapper":"pages-module_pageRowWrapper__1LcDF","transparent":"pages-module_transparent__3qgyg","blue":"pages-module_blue__2gODu","purple":"pages-module_purple__m7hks","red":"pages-module_red__wT5J7","orange":"pages-module_orange__2_YOS","yellow":"pages-module_yellow__24jeo","green":"pages-module_green__1j1qZ","active":"pages-module_active__7emcz","pageName":"pages-module_pageName__18Uwq","icon":"pages-module_icon__3_8-9"};
styleInject(css_248z$l);

const RowItem = props => {
  const {
    scaffoldBlockPxWidth,
    toggleChildrenVisibility,
    connectDragPreview,
    connectDragSource,
    isDragging,
    canDrop,
    canDrag,
    node,
    // title,
    subtitle,
    draggedNode,
    path,
    treeIndex,
    isSearchMatch,
    isSearchFocus,
    buttons,
    className,
    style,
    didDrop,
    treeId,
    isOver,
    // Not needed, but preserved for other renderers
    parentNode,
    // Needed for dndManager
    rowDirection,
    onRowClick,
    rowInfo,
    updateTitle,
    optionAction,
    setCopyRowInfo,
    ...otherProps
  } = props.data;
  const {
    pageRowWrapper,
    pageName,
    active,
    icon
  } = style$k;
  const [editTitle, setEditTitle] = React$1.useState(false);
  const [optionStyle, setOptionStyle] = React$1.useState({});
  const [toggleOption, setToggleOption] = React$1.useState(false); // editable row false by click outside.

  const labelEditWrapper = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (labelEditWrapper.current && !labelEditWrapper.current.contains(e.target)) {
        setEditTitle(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [labelEditWrapper]);

  const handleClick = event => {
    event.preventDefault();
    const {
      screenX,
      screenY
    } = event;
    let _optionStyle = {
      position: 'fixed',
      top: screenY - 100,
      left: screenX - 20,
      zIndex: 100
    };
    setOptionStyle(_optionStyle);
    setToggleOption(true);
  }; // close option by outside click.


  const optionWrapper = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (optionWrapper.current && !optionWrapper.current.contains(e.target)) {
        setToggleOption(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [optionWrapper]);

  const ArrowKeyUpDown = ({
    code
  }) => {
    if (code === 'Enter' || code === 'NumpadEnter' || code === 'Escape') {
      setEditTitle(false);
    }
  };

  const optionActionManager = ({
    option: {
      field,
      value
    }
  }) => {
    setToggleOption(false);

    if (field === 'color') {
      optionAction({
        field,
        value
      });
    } else if (field === 'rename') {
      setEditTitle(node.id);
    } else if (field === 'duplicate') {
      optionAction({
        field
      });
    } else if (field === 'delete') {
      optionAction({
        field
      });
    }

    if (field === 'copy-link') {
      optionAction({
        field
      });
    }
  }; // ⌘ Command (or Cmd)
  // ⇧ Shift
  // ⌥ Option (or Alt)
  // ⌃ Control (or Ctrl)


  const options = [{
    label: 'Copy link to Page',
    actionName: 'copy-link',
    divider: true
  }, {
    label: 'Delete',
    actionName: 'delete',
    divider: false
  }, {
    label: 'Duplicate',
    actionName: 'duplicate',
    shortcut: ['Shift Ctrl D', '⇧ ⌘ D'],
    divider: false
  }, {
    label: 'Rename',
    actionName: 'rename',
    divider: true
  }, {
    label: 'Label',
    component: /*#__PURE__*/React__default['default'].createElement(ColorsActionInMenu, {
      onChange: color => optionActionManager({
        option: {
          field: color.field,
          value: color.value
        }
      })
    }),
    divider: false
  }];
  const isDraggedDescendant = draggedNode && index_esm.isDescendant(draggedNode, node);
  const isLandingPadActive = !didDrop && isDragging;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", otherProps, connectDragPreview(connectDragSource( /*#__PURE__*/React__default['default'].createElement("div", {
    className: classnames(isLandingPadActive && 'rst__rowLandingPad', isLandingPadActive && !canDrop && 'rst__rowCancelPad', isSearchMatch && 'rst__rowSearchMatch', isSearchFocus && 'rst__rowSearchFocus', className),
    style: {
      opacity: isDraggedDescendant ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${pageRowWrapper}  ${style$k[node.color]} ${node.selected ? active : ''}`,
    onContextMenu: e => handleClick(e),
    onDoubleClick: () => {
      setEditTitle(node.id);
    }
  }, /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", {
    className: pageName
  }, editTitle !== node.id ? /*#__PURE__*/React__default['default'].createElement("label", null, node.title) : /*#__PURE__*/React__default['default'].createElement("input", {
    type: "text",
    value: node.title,
    onKeyDown: ArrowKeyUpDown,
    autoFocus: true,
    ref: labelEditWrapper,
    onChange: e => updateTitle({
      field: 'title',
      value: e.target.value
    })
  })), node.selected ? /*#__PURE__*/React__default['default'].createElement("div", {
    className: icon
  }, /*#__PURE__*/React__default['default'].createElement(CheckIcon, null)) : ''))), {
    dropEffect: 'copy'
  }))), toggleOption ? /*#__PURE__*/React__default['default'].createElement("div", {
    ref: optionWrapper
  }, /*#__PURE__*/React__default['default'].createElement(Options, {
    data: options,
    styles: optionStyle,
    onItemClick: field => optionActionManager({
      option: {
        field: field.actionName
      }
    })
  })) : null);
};

class ArtboardStudioPagesTheme extends React$1.Component {
  render() {
    return /*#__PURE__*/React__default['default'].createElement(RowItem, {
      data: this.props
    });
  }

}

const Pages = ({
  onChange,
  setValue
}) => {
  const {
    pages,
    pagesWrapper,
    header,
    title,
    actionButton
  } = style$k;
  const [pagesRows, setPagesRows] = React$1.useState([]);
  const [pageRow, setPageRow] = React$1.useState([]);
  React$1.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch('../../../data/pages.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (myJson) {
      setPagesRows({
        treeData: myJson
      });
    });
  };

  const optionAction = ({
    row,
    option: {
      field,
      value
    }
  }) => {
    let newNode;

    if (field === 'duplicate') {
      newNode = { ...row.node,
        title: row.node.title + ' copy'
      };
      setPagesRows({
        treeData: pagesRows.treeData.concat(newNode)
      });
    } else if (field === 'new') {
      newNode = {
        title: `New Page ${pagesRows.treeData.length + 1}`,
        color: 'transparent',
        selected: false
      };
      setPagesRows({
        treeData: pagesRows.treeData.concat(newNode)
      });
    } else if (field === 'color') {
      newNode = { ...row.node,
        color: value
      };
      let tree = index_esm.changeNodeAtPath({
        treeData: pagesRows.treeData,
        path: row.path,
        getNodeKey: ({
          treeIndex
        }) => treeIndex,
        newNode
      });
      setPagesRows({
        treeData: tree
      });
    } else if (field === 'title') {
      newNode = { ...row.node,
        title: value
      };
      let tree = index_esm.changeNodeAtPath({
        treeData: pagesRows.treeData,
        path: row.path,
        getNodeKey: ({
          treeIndex
        }) => treeIndex,
        newNode
      });
      setPagesRows({
        treeData: tree
      });
    } else if (field === 'delete') {
      let tree = index_esm.removeNodeAtPath({
        treeData: pagesRows.treeData,
        path: row.path,
        getNodeKey: ({
          treeIndex
        }) => treeIndex
      });
      setPagesRows({
        treeData: tree
      });
    }
  };

  const canDrop = ({
    nextParent,
    prevPath
  }) => {
    if (!nextParent || !prevPath) return true;
    return false;
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `pages ${pages}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: header
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: title
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Pages")), /*#__PURE__*/React__default['default'].createElement("div", {
    className: actionButton
  }, /*#__PURE__*/React__default['default'].createElement(IconButton, {
    onClick: () => optionAction({
      option: {
        field: 'new'
      }
    })
  }, /*#__PURE__*/React__default['default'].createElement(PlusIcon, null)))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: pagesWrapper
  }, /*#__PURE__*/React__default['default'].createElement(SortableTree__default['default'], {
    rowHeight: 32,
    scaffoldBlockPxWidth: 16,
    isVirtualized: false,
    canDrop: canDrop,
    treeData: pagesRows.treeData,
    onRowClick: treeData => setPagesRows(treeData),
    generateNodeProps: rowInfo => ({
      onRowClick: () => setPageRow(rowInfo),
      rowInfo,
      updateTitle: option => optionAction({
        option,
        row: rowInfo
      }),
      optionAction: option => optionAction({
        option,
        row: rowInfo
      })
    }),
    onChange: treeData => setPagesRows({
      treeData
    }),
    nodeContentRenderer: ArtboardStudioPagesTheme
  })));
};

const Layers = () => {
  const {
    layers,
    header,
    layersWrapper,
    layerIconBtn
  } = style$l;
  const [layerRows, setLayerRows] = React$1.useState([]);
  const [copyRowInfo, setCopyRowInfo] = React$1.useState(false);
  const [pagesData, setPagesData] = React$1.useState(false);
  React$1.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch('../../../data/layers.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (myJson) {
      setLayerRows({
        treeData: myJson
      });
    });
  };

  const updateNode = (row, field = 'selected') => {
    const unselectAllRow = () => {
      let tree = layerRows.treeData;
      tree.forEach((element, key) => {
        tree[key].selected = false;
      });
      setLayerRows({
        treeData: tree
      });
    };

    let newNode;

    if (field) {
      if (field === 'selected') {
        unselectAllRow();
        newNode = { ...row.node,
          selected: true
        };
      }

      if (field === 'unselected') newNode = { ...row.node,
        selected: false
      };
      if (field === 'volume') newNode = { ...row.node,
        volume: !row.node.volume
      };
      if (field === 'eye') newNode = { ...row.node,
        eye: !row.node.eye
      };
      if (field === 'lock') newNode = { ...row.node,
        lock: !row.node.lock
      };
      let tree = SortableTree.changeNodeAtPath({
        treeData: layerRows.treeData,
        path: row.path,
        getNodeKey: ({
          treeIndex
        }) => treeIndex,
        newNode: newNode
      });
      setLayerRows({
        treeData: tree
      });
    }
  };

  const pasteNode = path => {
    setLayerRows({
      treeData: SortableTree.addNodeUnderParent({
        treeData: layerRows.treeData,
        parentKey: path[path - 1],
        expandParent: false,
        getNodeKey: ({
          treeIndex
        }) => treeIndex,
        newNode: copyRowInfo.node,
        addAsFirstChild: layerRows.addAsFirstChild
      }).treeData
    });
  };

  const updateTitle = ({
    value,
    rowInfo
  }) => {
    let newNode = { ...rowInfo.node,
      title: value
    };
    let tree = SortableTree.changeNodeAtPath({
      treeData: layerRows.treeData,
      path: rowInfo.path,
      getNodeKey: ({
        treeIndex
      }) => treeIndex,
      newNode: newNode
    });
    setLayerRows({
      treeData: tree
    });
  };

  const optionAction = ({
    row,
    option: {
      path,
      value,
      field
    }
  }) => {
    let newNode;
    if (field === 'color') newNode = { ...row.node,
      color: value
    };
    if (field === 'eye') newNode = { ...row.node,
      eye: !row.node.eye
    };
    if (field === 'lock') newNode = { ...row.node,
      lock: !row.node.lock
    };

    if (field === 'paste' || field === 'duplicate') {
      if (field === 'paste') pasteNode(path);

      if (field === 'duplicate') {
        newNode = { ...row.node,
          title: row.node.title + ' copy'
        };
        setLayerRows({
          treeData: layerRows.treeData.concat(newNode)
        });
      }
    } else {
      let tree = SortableTree.changeNodeAtPath({
        treeData: layerRows.treeData,
        path: row.path,
        getNodeKey: ({
          treeIndex
        }) => treeIndex,
        newNode: newNode
      });
      setLayerRows({
        treeData: tree
      });
    }
  };

  const canDrop = ({
    nextParent,
    prevPath
  }) => {
    if (!nextParent || !prevPath) return true;

    if (nextParent && prevPath) {
      if (nextParent.type === 'artboard' || nextParent.type === 'group') return true;
    }

    return false;
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${layers}`,
    onContextMenu: e => e.preventDefault()
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: header
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Layers")), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `layers ${layersWrapper}`
  }, /*#__PURE__*/React__default['default'].createElement(SortableTree__default['default'], {
    rowHeight: 32,
    scaffoldBlockPxWidth: 16,
    isVirtualized: false,
    canDrop: canDrop,
    treeData: layerRows.treeData,
    onRowClick: treeData => updateNode(treeData),
    generateNodeProps: (rowInfo, path) => ({
      buttons: [rowInfo.node.type === 'image' && /*#__PURE__*/React__default['default'].createElement("div", {
        className: layerIconBtn
      }, /*#__PURE__*/React__default['default'].createElement(FXIcon, null)), rowInfo.node.type === 'video' && /*#__PURE__*/React__default['default'].createElement("div", {
        className: layerIconBtn,
        onClick: () => updateNode(rowInfo, 'volume')
      }, rowInfo.node.volume ? /*#__PURE__*/React__default['default'].createElement(VolumeIcon, null) : /*#__PURE__*/React__default['default'].createElement(VolumeMuteIcon, null)), /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", {
        className: layerIconBtn,
        onClick: () => updateNode(rowInfo, 'eye')
      }, rowInfo.node.eye ? /*#__PURE__*/React__default['default'].createElement(EyeIcon, null) : /*#__PURE__*/React__default['default'].createElement(EyeOffIcon, null)), /*#__PURE__*/React__default['default'].createElement("div", {
        className: layerIconBtn,
        onClick: () => updateNode(rowInfo, 'lock')
      }, rowInfo.node.lock ? /*#__PURE__*/React__default['default'].createElement(LockedIcon, null) : /*#__PURE__*/React__default['default'].createElement(LockIcon, null)))],
      onRowClick: () => updateNode(rowInfo),
      rowInfo,
      updateTitle: row => updateTitle(row),
      optionAction: option => optionAction({
        option,
        row: rowInfo
      }),
      setCopyRowInfo
    }),
    onChange: treeData => setLayerRows({
      treeData
    }),
    nodeContentRenderer: ArtboardStudioLayersTheme
  })), /*#__PURE__*/React__default['default'].createElement(Pages, {
    onChange: setPagesData
  }));
};

const LinkIcon = ({
  width = 5,
  height = 13
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 5 13`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 4.5V2.5C0 1.11929 1.11929 0 2.5 0C3.88071 0 5 1.11929 5 2.5V4.5H4V2.5C4 1.67157 3.32843 1 2.5 1C1.67157 1 1 1.67157 1 2.5V4.5H0ZM0 10.5C0 11.8807 1.11929 13 2.5 13C3.88071 13 5 11.8807 5 10.5V8.5H4V10.5C4 11.3284 3.32843 12 2.5 12C1.67157 12 1 11.3284 1 10.5L1 8.5H0V10.5Z",
    fill: "#000408"
  }));
};
const LinkIconVertical = ({
  width = 14,
  height = 5
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 14 5`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 5H3C1.61929 5 .5 3.88071.5 2.5S1.61929 0 3 0h2v1H3c-.82843 0-1.5.67157-1.5 1.5S2.17157 4 3 4h2v1zm6 0c1.3807 0 2.5-1.11929 2.5-2.5S12.3807 0 11 0H9v1h2c.8284 0 1.5.67157 1.5 1.5S11.8284 4 11 4H9v1h2z",
    fill: "#333"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#333",
    strokeLinecap: "round",
    d: "M4.5 2.5h5"
  }));
};

const RadiusIcon = ({
  width = 9,
  height = 9
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 9 9",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M0.5 8V4.5C0.5 2.29086 2.29086 0.5 4.5 0.5H8",
    stroke: "#B6BABD",
    strokeLinecap: "round"
  }));
};
const RadiusIconFull = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 12 12`
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 2.5C1 1.67157 1.67157 1 2.5 1h2V0h-2C1.11929 0 0 1.11929 0 2.5v2h1v-2zm10 0c0-.82843-.6716-1.5-1.5-1.5h-2V0h2C10.8807 0 12 1.11929 12 2.5v2h-1v-2zM2.5 11C1.67157 11 1 10.3284 1 9.5v-2H0v2C0 10.8807 1.11929 12 2.5 12h2v-1h-2zM11 9.5c0 .8284-.6716 1.5-1.5 1.5h-2v1h2c1.3807 0 2.5-1.1193 2.5-2.5v-2h-1v2z",
    fill: "#333"
  }));
};
const AlignLeftIcon = ({
  width = 14,
  height = 16
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 14 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React__default['default'].createElement("line", {
    x1: "0.5",
    y1: "0.5",
    x2: "0.500001",
    y2: "15.5",
    stroke: "#B6BABD",
    strokeLinecap: "round"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    x: "2",
    y: "5",
    width: "12",
    height: "2",
    rx: "1",
    fill: "#31363A"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    x: "2",
    y: "9",
    width: "6",
    height: "2",
    rx: "1",
    fill: "#31363A"
  }));
};
const AlignCenterIcon = ({
  width = 13,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7 0.5C7 0.223858 6.77614 0 6.5 0C6.22386 0 6 0.223858 6 0.5V5L7 5V0.5ZM7 7L6 7V11.5C6 11.7761 6.22386 12 6.5 12C6.77614 12 7 11.7761 7 11.5V7Z",
    fill: "#B6BABD"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    y: "3",
    width: "13",
    height: "2",
    rx: "1",
    fill: "#31363A"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    x: "3",
    y: "7",
    width: "7",
    height: "2",
    rx: "1",
    fill: "#31363A"
  }));
};
const AlignRightIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#B6BABD",
    strokeLinecap: "round",
    d: "M15.5.5v15"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "2",
    fill: "#31363A",
    rx: "1",
    transform: "matrix(-1 0 0 1 14 5)"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "6",
    height: "2",
    fill: "#31363A",
    rx: "1",
    transform: "matrix(-1 0 0 1 14 9)"
  }));
};
const AlignTopIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#B6BABD",
    strokeLinecap: "round",
    d: "M.5.5h15"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "2",
    fill: "#31363A",
    rx: "1",
    transform: "matrix(0 1 1 0 5 2)"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "6",
    height: "2",
    fill: "#31363A",
    rx: "1",
    transform: "matrix(0 1 1 0 9 2)"
  }));
};
const AlignVerticalCenterIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 16 15"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#B6BABD",
    fillRule: "evenodd",
    d: "M2.5 7c-.27614 0-.5.22386-.5.5s.22386.5.5.5H7V7H2.5zM9 7v1h4.5c.2761 0 .5-.22386.5-.5s-.2239-.5-.5-.5H9z",
    clipRule: "evenodd"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "13",
    height: "2",
    x: "5",
    y: "14",
    fill: "#31363A",
    rx: "1",
    transform: "rotate(-90 5 14)"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "7",
    height: "2",
    x: "9",
    y: "11",
    fill: "#31363A",
    rx: "1",
    transform: "rotate(-90 9 11)"
  }));
};
const AlignBottomIcon = ({
  width = 16,
  height = 14
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 16 14"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#B6BABD",
    strokeLinecap: "round",
    d: "M.5 13.5h15"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "2",
    x: "5",
    y: "12",
    fill: "#31363A",
    rx: "1",
    transform: "rotate(-90 5 12)"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "6",
    height: "2",
    x: "9",
    y: "12",
    fill: "#31363A",
    rx: "1",
    transform: "rotate(-90 9 12)"
  }));
};
const AlignDistributeHorizontalSpaceIcon = ({
  width = 8,
  height = 16
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 8 16"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#B6BABD",
    fillRule: "evenodd",
    d: "M.5 16c-.27614 0-.5-.2239-.5-.5V.5C0 .22386.22386 0 .5 0s.5.22386.5.5v15c0 .2761-.22386.5-.5.5zm7 0c.27614 0 .5-.2239.5-.5V.5c0-.27614-.22386-.5-.5-.5S7 .22386 7 .5v15c0 .2761.22386.5.5.5z",
    clipRule: "evenodd"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "2",
    height: "6",
    x: "5",
    y: "11",
    fill: "#31363A",
    rx: "1",
    transform: "rotate(180 5 11)"
  }));
};
const AlignDistributeVerticalSpaceIcon = ({
  width = 16,
  height = 8
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 16 8"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#B6BABD",
    fillRule: "evenodd",
    d: "M15.9999 7.5c0 .27614-.2238.5-.5.5H.49994c-.27614 0-.5-.22386-.5-.5s.22386-.5.5-.5H15.4999c.2762 0 .5.22386.5.5zm0-7c0-.27614-.2238-.5-.5-.5H.49994c-.27614 0-.5.22386-.5.5s.22386.5.5.5H15.4999c.2762 0 .5-.22386.5-.5z",
    clipRule: "evenodd"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "2",
    height: "6",
    x: "11",
    y: "3",
    fill: "#31363A",
    rx: "1",
    transform: "rotate(90 11 3)"
  }));
};
const AlignHorizontalIcon = ({
  width = 14,
  height = 6
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 14 6"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#000408",
    fillRule: "evenodd",
    d: "M3.85357.14645c.19526.19526.19526.51184 0 .7071L2.20712 2.5h9.58578L10.1465.85355c-.1953-.19526-.1953-.51184 0-.7071.1952-.19527.5118-.19527.7071 0L13.7071 3l-2.8535 2.85355c-.1953.19527-.5119.19527-.7071 0-.1953-.19526-.1953-.51184 0-.7071L11.7929 3.5H2.20712l1.64645 1.64645c.19526.19526.19526.51184 0 .7071-.19526.19527-.51185.19527-.70711 0L.29291 3 3.14646.14645c.19526-.19527.51185-.19527.70711 0z",
    clipRule: "evenodd"
  }));
};
const AlignVerticalIcon = ({
  width = 6,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 6 12"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#000408",
    fillRule: "evenodd",
    d: "M5.85331 3.85363c-.19526.19526-.51185.19526-.70711 0L3.49976 2.20718v7.58579L5.1462 8.14652c.19526-.19526.51185-.19526.70711 0s.19526.51185 0 .70711L2.99976 11.7072.1462 8.85363c-.19526-.19526-.19526-.51185 0-.70711s.51185-.19526.7071 0l1.64646 1.64645V2.20718L.85331 3.85363c-.19526.19526-.51185.19526-.7071 0-.19527-.19526-.19527-.51185 0-.70711L2.99975.29297l2.85355 2.85355c.19526.19526.19526.51185 0 .70711z",
    clipRule: "evenodd"
  }));
};
const AlignTopLineIcon = ({
  width = 14,
  height = 20
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 14 20"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "2",
    x: "14",
    fill: "#E8EBED",
    rx: "1",
    transform: "rotate(90 14 0)"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "20",
    height: "2",
    x: "8",
    fill: "#E8EBED",
    rx: "1",
    transform: "rotate(90 8 0)"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "2",
    x: "2",
    fill: "#E8EBED",
    rx: "1",
    transform: "rotate(90 2 0)"
  }));
};
const AlignCenterLineIcon = ({
  width = 14,
  height = 20
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 14 20"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "2",
    x: "14",
    y: "4",
    fill: "#E8EBED",
    rx: "1",
    transform: "rotate(90 14 4)"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "20",
    height: "2",
    x: "8",
    fill: "#E8EBED",
    rx: "1",
    transform: "rotate(90 8 0)"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "2",
    x: "2",
    y: "4",
    fill: "#E8EBED",
    rx: "1",
    transform: "rotate(90 2 4)"
  }));
};
const AlignBottomLineIcon = ({
  width = 14,
  height = 20
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 14 20"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "2",
    y: "20",
    fill: "#E8EBED",
    rx: "1",
    transform: "rotate(-90 0 20)"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "20",
    height: "2",
    x: "6",
    y: "20",
    fill: "#E8EBED",
    rx: "1",
    transform: "rotate(-90 6 20)"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "2",
    x: "12",
    y: "20",
    fill: "#E8EBED",
    rx: "1",
    transform: "rotate(-90 12 20)"
  }));
};
const AlignLineHeightIcon = ({
  width = 12,
  height = 11
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 12 11"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#F7F9FA",
    d: "M0 1h12v8H0z"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6 1.5a.5.5 0 01.468.324L9.158 9H8.092l-.75-2H4.659l-.75 2H2.84l2.69-7.176A.5.5 0 016 1.5zM5.034 6h1.932L6 3.424 5.034 6z",
    fill: "#B6BABD"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#B6BABD",
    strokeLinecap: "round",
    d: "M9.5.5h-7M2.5 10.5h7"
  }));
};
const AlignLineSpaceIcon = ({
  width = 12,
  height = 10
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 12 10"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#F7F9FA",
    d: "M0 1h12v8H0z"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6 1.5a.5.5 0 01.468.324L9.158 9H8.092l-.75-2H4.659l-.75 2H2.84l2.69-7.176A.5.5 0 016 1.5zM5.034 6h1.932L6 3.424 5.034 6z",
    fill: "#B6BABD"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#B6BABD",
    strokeLinecap: "round",
    d: "M1.5.5v9"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    transform: "matrix(0 1 1 0 11 0)",
    stroke: "#B6BABD",
    strokeLinecap: "round",
    d: "M.5-.5h9"
  }));
};
const AlignAutoHeightIcon = ({
  width = 12,
  height = 9
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 9"
  }, /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "1",
    rx: ".5",
    fill: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    y: "4",
    width: "12",
    height: "1",
    rx: ".5",
    fill: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    y: "8",
    width: "6",
    height: "1",
    rx: ".5",
    fill: "#999"
  }));
};
const AlignRectangleIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 12 12"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#63676C",
    d: "M.5 2C.5 1.17157 1.17157.5 2 .5h8c.8284 0 1.5.67157 1.5 1.5v8c0 .8284-.6716 1.5-1.5 1.5H2c-.82843 0-1.5-.6716-1.5-1.5V2z"
  }));
};
const AlignTextLeftIcon = ({
  width = 12,
  height = 9
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 12 9"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "1",
    fill: "#B6BABD",
    rx: ".5"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "1",
    y: "8",
    fill: "#B6BABD",
    rx: ".5"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "6",
    height: "1",
    y: "4",
    fill: "#63676C",
    rx: ".5"
  }));
};
const AlignTextCenterIcon = ({
  width = 12,
  height = 9
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 12 9"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "1",
    fill: "#B6BABD",
    rx: ".5"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "1",
    y: "8",
    fill: "#B6BABD",
    rx: ".5"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "6",
    height: "1",
    x: "3",
    y: "4",
    fill: "#63676C",
    rx: ".5"
  }));
};
const AlignTextRightIcon = ({
  width = 12,
  height = 9
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 12 9"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "1",
    fill: "#B6BABD",
    rx: ".5"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "12",
    height: "1",
    y: "8",
    fill: "#B6BABD",
    rx: ".5"
  }), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "6",
    height: "1",
    x: "6",
    y: "4",
    fill: "#63676C",
    rx: ".5"
  }));
};
const AlignTextTopIcon = ({
  width = 11,
  height = 13
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 11 13"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "11",
    height: "1",
    fill: "#B6BABD",
    rx: ".5"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#63676C",
    strokeLinecap: "round",
    d: "M5.5 12V4m0 0l-2 2m2-2l2 2"
  }));
};
const AlignTextMiddleIcon = ({
  width = 11,
  height = 19
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 11 19"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "11",
    height: "1",
    x: "11",
    y: "10",
    fill: "#B6BABD",
    rx: ".5",
    transform: "rotate(-180 11 10)"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#63676C",
    strokeLinecap: "round",
    d: "M5.5 1v6m0 0l2-2m-2 2l-2-2M5.5 18v-6m0 0l2 2m-2-2l-2 2"
  }));
};
const AlignTextBottomIcon = ({
  width = 11,
  height = 13
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 11 13"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "11",
    height: "1",
    fill: "#B6BABD",
    rx: ".5",
    transform: "matrix(1 0 0 -1 0 13)"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#63676C",
    strokeLinecap: "round",
    d: "M5.5 1v8m0 0l-2-2m2 2l2-2"
  }));
}; // TEXT

const TextCamelCaseIcon = ({
  width = 13,
  height = 9
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 13 9"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#999",
    d: "M3.513.146H4.58L7.627 8h-1.1l-.825-2.189H2.336L1.511 8H.455L3.513.146zm1.881 4.785L4.008 1.29 2.644 4.931h2.75zm6.632 2.288a2.86 2.86 0 01-.781.649c-.316.176-.708.264-1.177.264a2.72 2.72 0 01-.792-.11 1.738 1.738 0 01-.616-.308 1.537 1.537 0 01-.396-.539 1.815 1.815 0 01-.143-.748c0-.389.08-.704.242-.946.168-.242.388-.433.66-.572.278-.14.59-.238.935-.297a8.34 8.34 0 011.067-.11l.979-.033v-.22c0-.484-.103-.832-.308-1.045-.206-.213-.54-.319-1.001-.319-.455 0-.789.077-1.001.231a1.021 1.021 0 00-.418.616l-.87-.099c.103-.52.349-.898.738-1.133.388-.242.916-.363 1.584-.363.41 0 .755.051 1.034.154.286.095.517.235.693.418.176.183.3.41.374.682.08.271.12.576.12.913V8h-.923v-.781zm-.022-2.068l-.913.033a5.356 5.356 0 00-.968.11 1.86 1.86 0 00-.616.242.841.841 0 00-.32.363 1.355 1.355 0 00-.087.506c0 .286.084.517.253.693.176.169.462.253.858.253.564 0 1.004-.14 1.32-.418.315-.279.473-.66.473-1.144v-.638z"
  }));
};
const TextCapitalCaseIcon = ({
  width = 13,
  height = 9
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 16 8"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#999",
    d: "M3.574.146H4.64L7.688 8h-1.1l-.825-2.189H2.397L1.572 8H.516L3.574.146zm1.88 4.785L4.07 1.29 2.705 4.931h2.75zM11.373.146h1.067L15.486 8h-1.1l-.825-2.189h-3.366L9.37 8H8.314L11.372.146zm1.881 4.785L11.867 1.29l-1.364 3.641h2.75z"
  }));
};
const TextLowerCaseIcon = ({
  width = 13,
  height = 9
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 13 9"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#999",
    d: "M4.36 5.219c-.205.25-.466.466-.781.649-.315.176-.708.264-1.177.264a2.72 2.72 0 01-.792-.11 1.738 1.738 0 01-.616-.308 1.537 1.537 0 01-.396-.539 1.815 1.815 0 01-.143-.748c0-.389.08-.704.242-.946.169-.242.389-.433.66-.572.279-.14.59-.238.935-.297a8.34 8.34 0 011.067-.11l.979-.033v-.22c0-.484-.103-.832-.308-1.045C3.825.991 3.491.885 3.03.885c-.455 0-.788.077-1.001.231a1.021 1.021 0 00-.418.616l-.869-.099c.103-.52.348-.898.737-1.133.389-.242.917-.363 1.584-.363.41 0 .755.051 1.034.154.286.095.517.235.693.418.176.183.3.41.374.682a3.2 3.2 0 01.121.913V6H4.36v-.781zm-.022-2.068l-.913.033a5.357 5.357 0 00-.968.11 1.86 1.86 0 00-.616.242.841.841 0 00-.319.363 1.355 1.355 0 00-.088.506c0 .286.084.517.253.693.176.169.462.253.858.253.565 0 1.005-.14 1.32-.418.315-.279.473-.66.473-1.144v-.638zm5.941 2.068c-.205.25-.466.466-.781.649-.315.176-.708.264-1.177.264a2.72 2.72 0 01-.792-.11 1.738 1.738 0 01-.616-.308 1.537 1.537 0 01-.396-.539 1.815 1.815 0 01-.143-.748c0-.389.08-.704.242-.946.169-.242.389-.433.66-.572.279-.14.59-.238.935-.297a8.34 8.34 0 011.067-.11l.979-.033v-.22c0-.484-.103-.832-.308-1.045C9.744.991 9.41.885 8.948.885c-.455 0-.788.077-1.001.231a1.021 1.021 0 00-.418.616l-.869-.099c.103-.52.348-.898.737-1.133.389-.242.917-.363 1.584-.363.41 0 .755.051 1.034.154.286.095.517.235.693.418.176.183.3.41.374.682.08.271.121.576.121.913V6h-.924v-.781zm-.022-2.068l-.913.033a5.357 5.357 0 00-.968.11 1.86 1.86 0 00-.616.242.841.841 0 00-.319.363 1.355 1.355 0 00-.088.506c0 .286.084.517.253.693.176.169.462.253.858.253.565 0 1.005-.14 1.32-.418.315-.279.473-.66.473-1.144v-.638z"
  }));
};
const TextUnderLineDecorationIcon = ({
  width = 8,
  height = 11
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 8 11"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#999",
    strokeLinecap: "round",
    d: "M.5 10.5h7"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#999",
    fillRule: "evenodd",
    d: "M4 .5a.5.5 0 01.468.324L7.158 8H6.092l-.75-2H2.659l-.75 2H.84L3.53.824A.5.5 0 014 .5zM3.034 5h1.932L4 2.424 3.034 5z",
    clipRule: "evenodd"
  }));
};
const TextStrikeThroughDecorationIcon = ({
  width = 10,
  height = 8
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 10 8"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#999",
    strokeLinecap: "round",
    d: "M.5 4.5h9"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#999",
    fillRule: "evenodd",
    d: "M5 .5a.5.5 0 01.468.324L8.158 8H7.092l-.75-2H3.659l-.75 2H1.84L4.53.824A.5.5 0 015 .5zM4.034 5h1.932L5 2.424 4.034 5z",
    clipRule: "evenodd"
  }));
}; //SMART LAYOUT

const EdgeAlignTopIcon = ({
  width = 8,
  height = 12,
  color = null
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 12"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: color // stroke-width="1.5"
    ,
    strokeLinecap: "round",
    d: "M4 11.25V.75M7.25.75H.75"
  }));
};
const EdgeAlignRightIcon = ({
  width = 12,
  height = 8,
  color = null
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 8"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: color // stroke-width="1.5"
    ,
    strokeLinecap: "round",
    d: "M11.25 4H.75M.75.75v6.5"
  }));
};
const EdgeAlignLeftIcon = ({
  width = 12,
  height = 8,
  color = null
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 8"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: color,
    strokeLinecap: "round",
    d: "M.5 4h11M11.5 7.5v-7"
  }));
};
const EdgeAlignBottomIcon = ({
  width = 8,
  height = 12,
  color = null
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 12"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: color,
    strokeLinecap: "round",
    d: "M4 .5v11M.5 11.5h7"
  }));
};
const EdgeAlignCenterIcon = ({
  width = 16,
  height = 16,
  color = null
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: color,
    strokeLinecap: "round",
    d: "M.5 8h15M8 15.5V.5"
  }));
};
const EdgeAlignCenterHorizontalIcon = ({
  width = 16,
  height = 2,
  color = null
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 2"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: color,
    strokeLinecap: "round",
    d: "M.5 1h15"
  }));
};
const EdgeAlignCenterVerticalIcon = ({
  width = 2,
  height = 16,
  color = null
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 2 16"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: color,
    strokeLinecap: "round",
    d: "M1 15.5L.999999.5"
  }));
};

var css_248z$k = ".properties-module_properties__VrtKX {\n  font-family: aktiv-grotesk, sans-serif;\n  background-color: #ffffff;\n  box-sizing: border-box;\n  outline: none;\n  cursor: pointer;\n  border-radius: 6px;\n  display: flex;\n  align-items: end;\n  justify-content: center;\n  flex-direction: column;\n  width: 224px;\n  padding-top: 8px; }\n  .properties-module_properties__VrtKX .properties-module_radiusDetails__TWHfU {\n    display: flex;\n    flex-direction: column; }\n    .properties-module_properties__VrtKX .properties-module_radiusDetails__TWHfU div {\n      display: flex; }\n      .properties-module_properties__VrtKX .properties-module_radiusDetails__TWHfU div input {\n        width: 28px;\n        height: 32px;\n        border: 1px solid #e8ebed;\n        outline: none;\n        padding: 4px 8px; }\n  .properties-module_properties__VrtKX .properties-module_row__2wnPk {\n    display: flex;\n    align-items: flex-start;\n    justify-content: center;\n    margin-left: 8px;\n    margin-bottom: 8px; }\n    .properties-module_properties__VrtKX .properties-module_row__2wnPk > div {\n      margin-right: 8px; }\n    .properties-module_properties__VrtKX .properties-module_row__2wnPk > div:last-child {\n      margin-right: 0; }\n    .properties-module_properties__VrtKX .properties-module_row__2wnPk .properties-module_rowAction__3mqc2 {\n      display: flex;\n      align-items: center;\n      justify-content: center; }\n";
var style$j = {"properties":"properties-module_properties__VrtKX","radiusDetails":"properties-module_radiusDetails__TWHfU","row":"properties-module_row__2wnPk","rowAction":"properties-module_rowAction__3mqc2"};
styleInject(css_248z$k);

/* eslint-disable react-hooks/exhaustive-deps */
const Properties = ({
  onChange = () => {},
  values = {
    x: 22,
    y: 22,
    w: 22,
    h: 22,
    r: 22,
    radius: 22,
    position: 22,
    isLock: false,
    isLink: true,
    isRadius: false
  }
}) => {
  const {
    properties,
    row,
    rowAction
  } = style$j;
  const [x, setX] = React$1.useState(values.x);
  const [y, setY] = React$1.useState(values.y);
  const [xChanged, setXChanged] = React$1.useState(true);
  const [yChanged, setYChanged] = React$1.useState(true);
  const [w, setW] = React$1.useState(values.w);
  const [h, setH] = React$1.useState(values.h);
  const [wChanged, setWChanged] = React$1.useState(true);
  const [hChanged, setHChanged] = React$1.useState(true);
  const [whRatio, setWHRatio] = React$1.useState(1);
  const [radius, setRadius] = React$1.useState(values.radius);
  const [, setRadiusChanged] = React$1.useState(true);
  const [linkBtn, setLinkBtn] = React$1.useState(values.isLink);
  const [radiusBtn, setRadiusBtn] = React$1.useState(values.isRadius);
  const [radiusTop, setRadiusTop] = React$1.useState(values.radius);
  const [radiusBottom, setRadiusBottom] = React$1.useState(values.radius);
  const [radiusLeft, setRadiusLeft] = React$1.useState(values.radius);
  const [radiusRight, setRadiusRight] = React$1.useState(values.radius);
  const [position, setPosition] = React$1.useState(values.position);
  React$1.useEffect(() => {
    if (xChanged) {
      let _res;

      _res = {
        x: parseFloat(x)
      };
      if (onChange) onChange(_res);
      setXChanged(false);
    }
  }, [xChanged, x]);
  React$1.useEffect(() => {
    if (yChanged) {
      let _res;

      _res = {
        y: parseFloat(y)
      };
      if (onChange) onChange(_res);
      setYChanged(false);
    }
  }, [yChanged, y]);
  React$1.useEffect(() => {
    onChange({
      position: parseFloat(position)
    });
  }, [position]);
  React$1.useEffect(() => {
    if (wChanged) {
      let _res;

      if (linkBtn) {
        const H = Math.round(w * whRatio);
        setH(H);
        _res = {
          w: parseFloat(w),
          h: H
        };
      } else {
        _res = {
          w: parseFloat(w)
        };
      }

      if (onChange) onChange(_res);
      setWChanged(false);
    }
  }, [linkBtn, wChanged, w]);
  React$1.useEffect(() => {
    if (hChanged) {
      let _res;

      if (linkBtn) {
        setW(h);
        _res = {
          w: parseFloat(h),
          h: parseFloat(h)
        };
      } else {
        _res = {
          h: parseFloat(h)
        };
      }

      if (onChange) onChange(_res);
      setHChanged(false);
    }
  }, [linkBtn, hChanged, h]);
  React$1.useEffect(() => {
    let _res;

    if (radiusBtn) {
      setRadiusTop(parseFloat(radius));
      setRadiusBottom(parseFloat(radius));
      setRadiusLeft(parseFloat(radius));
      setRadiusRight(parseFloat(radius));
      _res = {
        top: parseFloat(radius),
        right: parseFloat(radius),
        bottom: parseFloat(radius),
        left: parseFloat(radius)
      };
    } else {
      _res = {
        radius: parseFloat(radius)
      };
    }

    if (onChange) onChange(_res);
    setRadiusChanged(false);
  }, [radiusBtn, radius]);
  React$1.useEffect(() => {
    let _res;

    _res = {
      top: parseFloat(radiusTop),
      left: parseFloat(radiusLeft),
      bottom: parseFloat(radiusBottom),
      right: parseFloat(radiusRight)
    };
    if (onChange) onChange(_res);
  }, [radiusTop, radiusBottom, radiusLeft, radiusRight]);
  React$1.useEffect(() => {
    setWHRatio(Math.abs(w / h));
    if (onChange) onChange({
      w: parseFloat(w),
      h: parseFloat(h)
    });
  }, [linkBtn]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${properties}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${row}`
  }, /*#__PURE__*/React__default['default'].createElement(Input, {
    label: "X",
    value: x,
    setValue: setX,
    onChange: setXChanged
  }), /*#__PURE__*/React__default['default'].createElement(Input, {
    label: "Y",
    value: y,
    setValue: setY,
    onChange: setYChanged
  }), /*#__PURE__*/React__default['default'].createElement(Input, {
    label: "\xB0",
    value: position,
    setValue: setPosition,
    onChange: setPosition
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${row}`
  }, /*#__PURE__*/React__default['default'].createElement(Input, {
    label: "W",
    value: w,
    setValue: setW,
    onChange: setWChanged
  }), /*#__PURE__*/React__default['default'].createElement(Input, {
    label: "H",
    value: h,
    setValue: setH,
    onChange: setHChanged
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${rowAction}`
  }, /*#__PURE__*/React__default['default'].createElement(IconButton, {
    isActive: linkBtn,
    onClick: () => setLinkBtn(!linkBtn)
  }, /*#__PURE__*/React__default['default'].createElement(LinkIconVertical, null)))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${row}`
  }, /*#__PURE__*/React__default['default'].createElement(Input, {
    value: radius,
    setValue: setRadius,
    onChange: setRadiusChanged
  }, /*#__PURE__*/React__default['default'].createElement(RadiusIcon, {
    width: 8,
    height: 8
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${rowAction}`
  }, /*#__PURE__*/React__default['default'].createElement(IconButton, {
    isActive: radiusBtn,
    onClick: () => setRadiusBtn(!radiusBtn)
  }, /*#__PURE__*/React__default['default'].createElement(RadiusIconFull, null)))));
};

var css_248z$j = ".alignment-module_alignment__2yWS_ {\n  color: #b6babd;\n  background-color: #ffffff;\n  box-sizing: border-box;\n  height: 48px;\n  width: 240px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px;\n  position: relative; }\n  .alignment-module_alignment__2yWS_ * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    user-select: none; }\n  .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1 {\n    width: 198px;\n    height: 56px;\n    padding: 4px;\n    opacity: 0;\n    border-radius: 8px;\n    box-shadow: 0px 2px 4px rgba(51, 51, 51, 0.12), 0px 0px 1px #999999, 0px 12px 24px -8px rgba(51, 51, 51, 0.08);\n    display: none;\n    flex-direction: column;\n    align-items: center;\n    justify-content: space-between;\n    position: absolute;\n    top: 44px;\n    right: 8px;\n    transition: opacity 0.1s ease-in-out;\n    z-index: 1;\n    background: #ffffff; }\n    .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1 .alignment-module_moreItem__3UhRt {\n      width: 190px;\n      height: 23px;\n      display: flex;\n      align-items: center;\n      justify-content: left; }\n      .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1 .alignment-module_moreItem__3UhRt.alignment-module_active__38FRK {\n        background: #f5f5f5;\n        border-radius: 4px; }\n      .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1 .alignment-module_moreItem__3UhRt * {\n        cursor: pointer; }\n      .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1 .alignment-module_moreItem__3UhRt .alignment-module_icon__LCeUF {\n        width: 24px;\n        height: 24px;\n        display: flex;\n        align-items: center;\n        justify-content: center; }\n      .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1 .alignment-module_moreItem__3UhRt label {\n        width: 150px;\n        height: 16px;\n        font-size: 11px;\n        line-height: 16px;\n        display: flex;\n        align-items: center;\n        color: #333333;\n        margin-left: 8px; }\n      .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1 .alignment-module_moreItem__3UhRt:hover {\n        background: #f5f5f5;\n        border-radius: 4px; }\n    .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1.alignment-module_active__38FRK {\n      opacity: 1;\n      display: flex; }\n";
var style$i = {"alignment":"alignment-module_alignment__2yWS_","moreItems":"alignment-module_moreItems__2qnn1","moreItem":"alignment-module_moreItem__3UhRt","active":"alignment-module_active__38FRK","icon":"alignment-module_icon__LCeUF"};
styleInject(css_248z$j);

const alignmentDefaultValues = {
  left: true,
  right: false,
  center: false,
  verticalCenter: false,
  bottom: false,
  alignLeft: false,
  horizontalSpace: false,
  verticalSpace: false
};
const Alignment = ({
  value = alignmentDefaultValues,
  onChange = () => {}
}) => {
  const {
    left = true,
    right = false,
    center = false,
    verticalCenter = false,
    bottom = true,
    alignLeft = false,
    horizontalSpace = false,
    verticalSpace = false
  } = value;
  const {
    alignment,
    moreItems,
    moreItem,
    icon,
    active
  } = style$i;
  const [leftState, setLeftState] = React$1.useState(left);
  const [centerState, setCenterState] = React$1.useState(center);
  const [rightState, setRightState] = React$1.useState(right);
  const [verticalCenterState, setVerticalCenterState] = React$1.useState(verticalCenter);
  const [bottomState, setBottomState] = React$1.useState(bottom);
  const [alignLeftState, setAlignLeftState] = React$1.useState(alignLeft);
  const [horizontalSpaceState, setHorizontalSpaceState] = React$1.useState(horizontalSpace);
  const [verticalSpaceState, setVerticalSpaceState] = React$1.useState(verticalSpace);
  const [toggleOther, setToggleOther] = React$1.useState(false);
  React$1.useEffect(() => {
    const _res = {
      left: leftState,
      center: centerState,
      right: rightState,
      verticalCenter: verticalCenterState,
      bottom: bottomState,
      alignLeft: alignLeftState,
      horizontalSpace: horizontalSpaceState,
      verticalSpace: verticalSpaceState
    };
    if (onChange) onChange(_res);
  }, [alignLeftState, bottomState, centerState, horizontalSpaceState, leftState, onChange, rightState, verticalCenterState, verticalSpaceState]);

  const allDisabled = target => {
    setLeftState(false);
    setCenterState(false);
    setRightState(false);
    setVerticalCenterState(false);
    setBottomState(false);
    setAlignLeftState(false);

    if (!target) {
      setHorizontalSpaceState(false);
      setVerticalSpaceState(false);
    }
  }; // close moreItemsMenu by click outside.


  const moreItemsWrapper = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (moreItemsWrapper.current && !moreItemsWrapper.current.contains(e.target)) {
        toggleOther && setToggleOther(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [moreItemsWrapper]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${alignment}`
  }, /*#__PURE__*/React__default['default'].createElement(IconButton, {
    type: "xSmall",
    isActive: leftState,
    onClick: () => {
      allDisabled();
      setLeftState(!leftState);
    }
  }, /*#__PURE__*/React__default['default'].createElement(AlignLeftIcon, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    isActive: centerState,
    onClick: () => {
      allDisabled();
      setCenterState(!centerState);
    }
  }, /*#__PURE__*/React__default['default'].createElement(AlignCenterIcon, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    isActive: rightState,
    onClick: () => {
      allDisabled();
      setRightState(!rightState);
    }
  }, /*#__PURE__*/React__default['default'].createElement(AlignRightIcon, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    isActive: verticalCenterState,
    onClick: () => {
      allDisabled();
      setVerticalCenterState(!verticalCenterState);
    }
  }, /*#__PURE__*/React__default['default'].createElement(AlignTopIcon, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    isActive: bottomState,
    onClick: () => {
      allDisabled();
      setBottomState(!bottomState);
    }
  }, /*#__PURE__*/React__default['default'].createElement(AlignVerticalCenterIcon, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    isActive: alignLeftState,
    onClick: () => {
      allDisabled();
      setAlignLeftState(!alignLeftState);
    }
  }, /*#__PURE__*/React__default['default'].createElement(AlignBottomIcon, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    ref: moreItemsWrapper
  }, /*#__PURE__*/React__default['default'].createElement(IconButton, {
    isActive: toggleOther,
    onClick: () => {
      allDisabled(true);
      setToggleOther(!toggleOther);
    }
  }, /*#__PURE__*/React__default['default'].createElement(ChevronArrowIcon, null)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${moreItems} ${toggleOther ? active : ''}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${moreItem} ${horizontalSpaceState ? active : ''}`,
    onClick: () => {
      allDisabled();
      setHorizontalSpaceState(!horizontalSpaceState);
      setToggleOther(!toggleOther);
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: icon
  }, /*#__PURE__*/React__default['default'].createElement(AlignDistributeHorizontalSpaceIcon, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React__default['default'].createElement("label", null, "Distrubute Horizontal Spacing")), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${moreItem} ${verticalSpaceState ? active : ''}`,
    onClick: () => {
      allDisabled();
      setVerticalSpaceState(!verticalSpaceState);
      setToggleOther(!toggleOther);
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: icon
  }, /*#__PURE__*/React__default['default'].createElement(AlignDistributeVerticalSpaceIcon, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React__default['default'].createElement("label", null, "Distrubute Vertical Spacing")))));
};

var css_248z$i = ".dropdown-module_dropdown__22lKQ {\n  display: flex;\n  align-items: center;\n  border: 1px solid #e8ebed;\n  border-radius: 8px;\n  position: relative;\n  background-color: #f5f5f5; }\n  .dropdown-module_dropdown__22lKQ * {\n    font-family: aktiv-grotesk, sans-serif;\n    box-sizing: border-box;\n    user-select: none; }\n  .dropdown-module_dropdown__22lKQ input {\n    border: none;\n    outline: none;\n    background: transparent;\n    padding: 0;\n    margin: 0; }\n  .dropdown-module_dropdown__22lKQ.dropdown-module_ddlOption__mBVs1 {\n    border: 0;\n    width: 100%; }\n    .dropdown-module_dropdown__22lKQ.dropdown-module_ddlOption__mBVs1 .dropdown-module_selectedItem__2-QsG {\n      width: 100%;\n      display: flex;\n      justify-content: left;\n      padding: 8px 0 8px 8px; }\n      .dropdown-module_dropdown__22lKQ.dropdown-module_ddlOption__mBVs1 .dropdown-module_selectedItem__2-QsG label {\n        font-family: Aktiv Grotesk, sans-serif;\n        font-style: normal;\n        font-weight: 700;\n        font-size: 12px;\n        line-height: 20px;\n        display: flex;\n        align-items: center;\n        color: #000408;\n        margin-right: 4px; }\n      .dropdown-module_dropdown__22lKQ.dropdown-module_ddlOption__mBVs1 .dropdown-module_selectedItem__2-QsG span {\n        font-size: 11px;\n        user-select: none; }\n    .dropdown-module_dropdown__22lKQ.dropdown-module_ddlOption__mBVs1:hover {\n      border: 0; }\n    .dropdown-module_dropdown__22lKQ.dropdown-module_ddlOption__mBVs1.dropdown-module_open__zFsbX {\n      border: 0; }\n    .dropdown-module_dropdown__22lKQ.dropdown-module_ddlOption__mBVs1 ul {\n      width: 177px;\n      top: -13px; }\n      .dropdown-module_dropdown__22lKQ.dropdown-module_ddlOption__mBVs1 ul li {\n        width: 164px; }\n        .dropdown-module_dropdown__22lKQ.dropdown-module_ddlOption__mBVs1 ul li button {\n          font-size: 11px;\n          line-height: 16px; }\n        .dropdown-module_dropdown__22lKQ.dropdown-module_ddlOption__mBVs1 ul li:hover {\n          background: #e8ebed; }\n          .dropdown-module_dropdown__22lKQ.dropdown-module_ddlOption__mBVs1 ul li:hover button {\n            color: #000408; }\n            .dropdown-module_dropdown__22lKQ.dropdown-module_ddlOption__mBVs1 ul li:hover button svg {\n              stroke: #000408; }\n  .dropdown-module_dropdown__22lKQ.dropdown-module_small__2V6t9 {\n    width: 108px;\n    height: 24px; }\n    .dropdown-module_dropdown__22lKQ.dropdown-module_small__2V6t9 input {\n      width: 85px;\n      font-size: 11px;\n      padding-left: 8px; }\n    .dropdown-module_dropdown__22lKQ.dropdown-module_small__2V6t9 ul.dropdown-module_search__1mXOx {\n      top: 23px;\n      min-height: 24px; }\n  .dropdown-module_dropdown__22lKQ.dropdown-module_medium__1pXzE {\n    width: 128px;\n    height: 32px; }\n    .dropdown-module_dropdown__22lKQ.dropdown-module_medium__1pXzE input {\n      width: 100%;\n      font-size: 12px;\n      padding-left: 8px; }\n    .dropdown-module_dropdown__22lKQ.dropdown-module_medium__1pXzE button {\n      padding-right: 3px; }\n    .dropdown-module_dropdown__22lKQ.dropdown-module_medium__1pXzE ul.dropdown-module_search__1mXOx {\n      top: 31px; }\n  .dropdown-module_dropdown__22lKQ.dropdown-module_large__3Mmct {\n    width: 136px;\n    height: 32px; }\n    .dropdown-module_dropdown__22lKQ.dropdown-module_large__3Mmct input {\n      width: 105px;\n      font-size: 14px;\n      line-height: 24px; }\n    .dropdown-module_dropdown__22lKQ.dropdown-module_large__3Mmct ul.dropdown-module_search__1mXOx {\n      top: 39px;\n      min-height: 24px; }\n  .dropdown-module_dropdown__22lKQ .dropdown-module_selectedItem__2-QsG {\n    width: 100%;\n    display: flex;\n    justify-content: space-between; }\n    .dropdown-module_dropdown__22lKQ .dropdown-module_selectedItem__2-QsG button {\n      width: 24px;\n      height: 32px;\n      display: flex;\n      justify-content: center;\n      align-items: center; }\n      .dropdown-module_dropdown__22lKQ .dropdown-module_selectedItem__2-QsG button svg {\n        stroke: #999999; }\n    .dropdown-module_dropdown__22lKQ .dropdown-module_selectedItem__2-QsG span {\n      font-size: 11px;\n      user-select: none; }\n  .dropdown-module_dropdown__22lKQ button {\n    border: 0;\n    background: transparent;\n    outline: none;\n    padding: 0;\n    margin: 0;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    cursor: pointer; }\n  .dropdown-module_dropdown__22lKQ ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    display: flex;\n    flex-direction: column;\n    padding: 4px;\n    position: absolute;\n    width: 140px;\n    background: #ffffff;\n    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.06), 0px 0.5px 1px rgba(0, 0, 0, 0.24);\n    border-radius: 8px;\n    top: -1px;\n    left: -2px;\n    z-index: 1;\n    max-height: 104px;\n    overflow: hidden; }\n    .dropdown-module_dropdown__22lKQ ul > div > div:nth-child(3) {\n      width: 4px !important;\n      right: 0 !important; }\n      .dropdown-module_dropdown__22lKQ ul > div > div:nth-child(3) > div:hover {\n        background-color: #3399ff !important; }\n    .dropdown-module_dropdown__22lKQ ul li {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      padding: 4px 4px 4px 8px;\n      position: static;\n      width: 132px;\n      height: 24px;\n      border-radius: 4px;\n      align-self: stretch; }\n      .dropdown-module_dropdown__22lKQ ul li button {\n        width: 100%;\n        padding-right: 4px;\n        height: 32px; }\n        .dropdown-module_dropdown__22lKQ ul li button span {\n          font-size: 11px;\n          user-select: none; }\n          .dropdown-module_dropdown__22lKQ ul li button span > span {\n            color: #b6babd; }\n        .dropdown-module_dropdown__22lKQ ul li button svg {\n          stroke: #31363a; }\n      .dropdown-module_dropdown__22lKQ ul li:hover {\n        background: #3399ff; }\n        .dropdown-module_dropdown__22lKQ ul li:hover button {\n          color: #ffffff; }\n          .dropdown-module_dropdown__22lKQ ul li:hover button > span > span {\n            color: #63676c; }\n          .dropdown-module_dropdown__22lKQ ul li:hover button svg {\n            stroke: #e8ebed; }\n    .dropdown-module_dropdown__22lKQ ul button {\n      text-align: left; }\n  .dropdown-module_dropdown__22lKQ:hover {\n    border: 1px solid #b6babd; }\n  .dropdown-module_dropdown__22lKQ.dropdown-module_open__zFsbX {\n    border: 1px solid #3399ff; }\n  .dropdown-module_dropdown__22lKQ [type='text']:focus,\n  .dropdown-module_dropdown__22lKQ [type='password']:focus,\n  .dropdown-module_dropdown__22lKQ [type='number']:focus,\n  .dropdown-module_dropdown__22lKQ [type='email']:focus,\n  .dropdown-module_dropdown__22lKQ [type='search']:focus {\n    color: #333333; }\n";
var style$h = {"dropdown":"dropdown-module_dropdown__22lKQ","ddlOption":"dropdown-module_ddlOption__mBVs1","selectedItem":"dropdown-module_selectedItem__2-QsG","open":"dropdown-module_open__zFsbX","small":"dropdown-module_small__2V6t9","search":"dropdown-module_search__1mXOx","medium":"dropdown-module_medium__1pXzE","large":"dropdown-module_large__3Mmct"};
styleInject(css_248z$i);

/* eslint-disable react-hooks/exhaustive-deps */

const Dropdown = ({
  option = [],
  size = 'small',
  onChange = () => {},
  selectedValue = option[0],
  className = null,
  popupMenu = 'right'
}) => {
  const [optionValueState, setOptionValueState] = React$1.useState(selectedValue);
  const [toggleOption, setToggleOption] = React$1.useState(false);
  const [toggleSearch, setToggleSearch] = React$1.useState(false);
  const [searchState, setSearchState] = React$1.useState('');
  const [resultSearchState, setResultSearchState] = React$1.useState([]);
  const {
    dropdown,
    selectedItem,
    search,
    open
  } = style$h;
  const openMenuPosition = popupMenu === 'left' ? {
    right: -2,
    left: 'auto'
  } : {
    left: -2,
    right: 'auto'
  }; // close menu by click outside.

  const menuWrapper = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (menuWrapper.current && !menuWrapper.current.contains(e.target)) {
        setToggleOption(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [menuWrapper]); // close Search by click outside.

  const searchWrapper = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (searchWrapper.current && !searchWrapper.current.contains(e.target)) {
        setToggleSearch(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [searchWrapper]);
  React$1.useEffect(() => {
    if (selectedValue) setSearchState(selectedValue.name);
  }, [selectedValue]);

  const onClickOptionHandler = optionValue => {
    // scrollOfOn(true);
    setOptionValueState(optionValue);
    setSearchState(optionValue.name);
    onChange(optionValue);
    setToggleOption(false);
    setToggleSearch(false);
  };

  const inputOnChangeHandler = ({
    value
  }) => {
    setToggleSearch(true);
    setSearchState(value);
    if (value === '') setResultSearchState(option);else setResultSearchState(option.filter(item => {
      return item.name.toString().toLowerCase().includes(value.toLowerCase());
    }));
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${dropdown} ${style$h[size]} ${toggleSearch ? open : ''} ${className ? className : ''}`,
    ref: menuWrapper
  }, toggleOption && option.length > 1 && /*#__PURE__*/React__default['default'].createElement("ul", {
    style: openMenuPosition
  }, /*#__PURE__*/React__default['default'].createElement(Scrollbars.Scrollbars, {
    autoHide: true,
    style: {
      width: size === 'medium-fw' ? 176 : 144,
      height: 104
    }
  }, option.map((option, key) => /*#__PURE__*/React__default['default'].createElement("li", {
    key: key // onMouseEnter={() => scrollOfOn()}
    // onMouseLeave={() => scrollOfOn(true)}

  }, /*#__PURE__*/React__default['default'].createElement("button", {
    type: "button",
    onClick: () => onClickOptionHandler(option)
  }, /*#__PURE__*/React__default['default'].createElement("span", null, option.name), optionValueState && optionValueState.value === option.value && /*#__PURE__*/React__default['default'].createElement(CheckIcon, null)))))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${selectedItem}`
  }, optionValueState && /*#__PURE__*/React__default['default'].createElement("input", {
    type: "text",
    value: searchState,
    onClick: e => inputOnChangeHandler(e.target),
    onChange: e => inputOnChangeHandler(e.target)
  }), /*#__PURE__*/React__default['default'].createElement("button", {
    type: "button",
    onClick: () => setToggleOption(!toggleOption)
  }, /*#__PURE__*/React__default['default'].createElement(ChevronArrowIcon, null))), toggleSearch && resultSearchState.length ? /*#__PURE__*/React__default['default'].createElement("ul", {
    className: `${search}`,
    ref: searchWrapper,
    style: openMenuPosition
  }, /*#__PURE__*/React__default['default'].createElement(Scrollbars.Scrollbars, {
    autoHide: true,
    style: {
      width: size === 'medium-fw' ? 176 : 144,
      height: 104
    }
  }, resultSearchState.map((option, key) => /*#__PURE__*/React__default['default'].createElement("li", {
    key: key // onMouseEnter={() => scrollOfOn()}
    // onMouseLeave={() => scrollOfOn(true)}

  }, /*#__PURE__*/React__default['default'].createElement("button", {
    type: "button",
    onClick: () => onClickOptionHandler(option)
  }, /*#__PURE__*/React__default['default'].createElement("span", null, option.name)))))) : null);
};

var css_248z$h = ".visibility-module_visibility__3iQjS {\n  width: 240px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: end;\n  border-radius: 4px;\n  cursor: pointer;\n  padding: 8px; }\n  .visibility-module_visibility__3iQjS * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    user-select: none; }\n  .visibility-module_visibility__3iQjS > div:first-child {\n    margin-right: 8px; }\n  .visibility-module_visibility__3iQjS.visibility-module_white__iRpGB {\n    background: #ffffff; }\n  .visibility-module_visibility__3iQjS.visibility-module_gray__3wI-z {\n    background: #f5f5f5; }\n  .visibility-module_visibility__3iQjS.visibility-module_silver__21swe {\n    background: #f2f4f5; }\n  .visibility-module_visibility__3iQjS .visibility-module_layerText__3beuT {\n    font-family: Aktiv Grotesk, sans-serif;\n    font-size: 12px;\n    line-height: 24px;\n    font-weight: 600;\n    display: flex;\n    align-items: center;\n    margin: 0px 8px;\n    width: 188px;\n    height: 24px;\n    cursor: text; }\n    .visibility-module_visibility__3iQjS .visibility-module_layerText__3beuT.visibility-module_purple__1LY8P {\n      color: #b555e5; }\n    .visibility-module_visibility__3iQjS .visibility-module_layerText__3beuT.visibility-module_black__2mGsm {\n      color: #31363a; }\n";
var style$g = {"visibility":"visibility-module_visibility__3iQjS","white":"visibility-module_white__iRpGB","gray":"visibility-module_gray__3wI-z","silver":"visibility-module_silver__21swe","layerText":"visibility-module_layerText__3beuT","purple":"visibility-module_purple__1LY8P","black":"visibility-module_black__2mGsm"};
styleInject(css_248z$h);

/* eslint-disable react-hooks/exhaustive-deps */
const defaultOption = [{
  name: 'Normal',
  value: 'Normal'
}, {
  name: 'Darken',
  value: 'Darken'
}, {
  name: 'Multiply',
  value: 'Multiply'
}, {
  name: 'Color Burn',
  value: 'Color Burn'
}, {
  name: 'Lighten',
  value: 'Lighten'
}, {
  name: 'Screen',
  value: 'Screen'
}, {
  name: 'Color Dodge',
  value: 'Color Dodge'
}, {
  name: 'Lighter Color',
  value: 'Lighter Color'
}, {
  name: 'Overlay',
  value: 'Overlay'
}, {
  name: 'Soft Light',
  value: 'Soft Light'
}, {
  name: 'Hard Light',
  value: 'Hard Light'
}, {
  name: 'Difference"',
  value: 'Difference'
}, {
  name: 'Exclusion',
  value: 'Exclusion'
}, {
  name: 'Hue',
  value: 'Hue'
}, {
  name: 'Saturation',
  value: 'Saturation'
}, {
  name: 'Color',
  value: 'Color'
}, {
  name: 'Luminosity',
  value: 'Luminosity'
}, {
  name: 'Source In',
  value: 'Source In'
}, {
  name: 'Source Out',
  value: 'Source Out'
}, {
  name: 'Source Atop',
  value: 'Source Atop'
}, {
  name: 'Destination Over',
  value: 'Destination Over'
}, {
  name: 'Destination In',
  value: 'Destination In'
}, {
  name: 'Destination Out',
  value: 'Destination Out'
}, {
  name: 'Destination Atop',
  value: 'Destination Atop'
}, {
  name: 'Copy',
  value: 'Copy'
}, {
  name: 'XOR',
  value: 'XOR'
}];
const Visibility = ({
  type = 'white',
  option = defaultOption,
  input = 0,
  label = '%',
  onChangeValues
}) => {
  const {
    visibility
  } = style$g;
  const [selectedItem, setSelectedItem] = React$1.useState(option[0]);
  const [inputState, setInputState] = React$1.useState(input);
  React$1.useEffect(() => {
    if (onChangeValues) onChangeValues({
      option: selectedItem,
      value: parseFloat(inputState)
    });
  }, [selectedItem, inputState]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${visibility} ${style$g[type]}`
  }, /*#__PURE__*/React__default['default'].createElement(Dropdown, {
    option: option,
    onChangeValue: setSelectedItem,
    size: "medium"
  }), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChangeValue: setInputState,
    value: inputState,
    setValue: setInputState,
    label: label,
    size: "normal"
  }));
};

const MinusIcon = ({
  width = 9,
  height = 1
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 9 1"
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#000408",
    strokeLinecap: "round",
    d: "M.5.5h8"
  }));
};

var css_248z$g = ".smart-layout-module_smartLayout__1hqko {\n  background-color: #ffffff;\n  width: 240px;\n  min-height: 48px;\n  display: flex;\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n  .smart-layout-module_smartLayout__1hqko * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    user-select: none; }\n  .smart-layout-module_smartLayout__1hqko .smart-layout-module_header__p8MeV {\n    width: 224px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between; }\n    .smart-layout-module_smartLayout__1hqko .smart-layout-module_header__p8MeV .smart-layout-module_title__3l_hj {\n      height: 16px;\n      font-weight: 600;\n      font-size: 11px;\n      line-height: 16px;\n      display: flex;\n      align-items: center;\n      color: #333333; }\n    .smart-layout-module_smartLayout__1hqko .smart-layout-module_header__p8MeV .smart-layout-module_actionButton__1TAJH button {\n      width: 24px;\n      height: 24px; }\n  .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf {\n    width: 100%;\n    display: none;\n    align-items: center;\n    justify-content: end; }\n    .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf.smart-layout-module_active__NNYfB {\n      display: flex; }\n    .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeBtnWrapper__3HFeW {\n      width: 64px;\n      height: 64px;\n      padding: 4px;\n      background-color: #f5f5f5;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      border-radius: 8px;\n      margin-right: 8px; }\n      .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeBtnWrapper__3HFeW * {\n        cursor: pointer; }\n      .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeBtnWrapper__3HFeW .smart-layout-module_alignCenter__1Z096 {\n        display: flex;\n        align-items: center;\n        justify-content: space-between; }\n        .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeBtnWrapper__3HFeW .smart-layout-module_alignCenter__1Z096 .smart-layout-module_alignCenterIconVHWrapper__1pTlN {\n          width: 16px;\n          height: 16px;\n          position: relative; }\n          .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeBtnWrapper__3HFeW .smart-layout-module_alignCenter__1Z096 .smart-layout-module_alignCenterIconVHWrapper__1pTlN .smart-layout-module_alignCenterIconH__1NfSX {\n            position: absolute;\n            width: 16px;\n            height: 1px;\n            background-color: #999999;\n            top: 7.3px; }\n            .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeBtnWrapper__3HFeW .smart-layout-module_alignCenter__1Z096 .smart-layout-module_alignCenterIconVHWrapper__1pTlN .smart-layout-module_alignCenterIconH__1NfSX.smart-layout-module_active__NNYfB, .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeBtnWrapper__3HFeW .smart-layout-module_alignCenter__1Z096 .smart-layout-module_alignCenterIconVHWrapper__1pTlN .smart-layout-module_alignCenterIconH__1NfSX:hover {\n              background-color: #333333; }\n          .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeBtnWrapper__3HFeW .smart-layout-module_alignCenter__1Z096 .smart-layout-module_alignCenterIconVHWrapper__1pTlN .smart-layout-module_alignCenterIconV__1w-BM {\n            position: absolute;\n            width: 1px;\n            height: 16px;\n            background-color: #999999;\n            left: 7.3px; }\n            .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeBtnWrapper__3HFeW .smart-layout-module_alignCenter__1Z096 .smart-layout-module_alignCenterIconVHWrapper__1pTlN .smart-layout-module_alignCenterIconV__1w-BM.smart-layout-module_active__NNYfB, .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeBtnWrapper__3HFeW .smart-layout-module_alignCenter__1Z096 .smart-layout-module_alignCenterIconVHWrapper__1pTlN .smart-layout-module_alignCenterIconV__1w-BM:hover {\n              background-color: #333333; }\n      .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeBtnWrapper__3HFeW .smart-layout-module_alignTop__18_GT,\n      .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeBtnWrapper__3HFeW .smart-layout-module_alignBottom__30mef {\n        height: 12px;\n        width: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center; }\n      .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeBtnWrapper__3HFeW .smart-layout-module_icon__3fK_L {\n        stroke: #999999;\n        display: flex;\n        flex-direction: column;\n        justify-content: space-between;\n        cursor: pointer; }\n        .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeBtnWrapper__3HFeW .smart-layout-module_icon__3fK_L.smart-layout-module_active__NNYfB {\n          stroke-width: 1.5;\n          stroke: #333333; }\n    .smart-layout-module_smartLayout__1hqko .smart-layout-module_smartLayoutDetails__1S3Nf .smart-layout-module_pinToEdgeOptionsWrapper__1M5Cr {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: space-around;\n      width: 107px;\n      height: 64px; }\n";
var style$f = {"smartLayout":"smart-layout-module_smartLayout__1hqko","header":"smart-layout-module_header__p8MeV","title":"smart-layout-module_title__3l_hj","actionButton":"smart-layout-module_actionButton__1TAJH","smartLayoutDetails":"smart-layout-module_smartLayoutDetails__1S3Nf","active":"smart-layout-module_active__NNYfB","pinToEdgeBtnWrapper":"smart-layout-module_pinToEdgeBtnWrapper__3HFeW","alignCenter":"smart-layout-module_alignCenter__1Z096","alignCenterIconVHWrapper":"smart-layout-module_alignCenterIconVHWrapper__1pTlN","alignCenterIconH":"smart-layout-module_alignCenterIconH__1NfSX","alignCenterIconV":"smart-layout-module_alignCenterIconV__1w-BM","alignTop":"smart-layout-module_alignTop__18_GT","alignBottom":"smart-layout-module_alignBottom__30mef","icon":"smart-layout-module_icon__3fK_L","pinToEdgeOptionsWrapper":"smart-layout-module_pinToEdgeOptionsWrapper__1M5Cr"};
styleInject(css_248z$g);

/* eslint-disable react-hooks/exhaustive-deps */
const SmartLayout = ({
  type = 'white',
  onChange,
  value = {
    v: 'Scale',
    h: 'Scale'
  }
}) => {
  const {
    smartLayout,
    header,
    title,
    actionButton,
    smartLayoutDetails,
    active,
    pinToEdgeBtnWrapper,
    pinToEdgeOptionsWrapper,
    alignTop,
    alignCenter,
    alignBottom,
    icon,
    alignCenterIconVHWrapper,
    alignCenterIconH,
    alignCenterIconV
  } = style$f;
  const [toggleDetails, setToggleDetail] = React$1.useState(false);
  const [selectedV, setSelectedItemV] = React$1.useState(value.v);
  const [selectedH, setSelectedItemH] = React$1.useState(value.h);
  React$1.useEffect(() => {
    onChange({
      selectedV,
      selectedH
    });
  }, [selectedV, selectedH]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${smartLayout} ${style$f[type]}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: header
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: title
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Pin to Edge")), /*#__PURE__*/React__default['default'].createElement("div", {
    className: actionButton
  }, /*#__PURE__*/React__default['default'].createElement(IconButton, {
    onClick: () => {
      setToggleDetail(!toggleDetails);
    }
  }, !toggleDetails ? /*#__PURE__*/React__default['default'].createElement(PlusIcon, null) : /*#__PURE__*/React__default['default'].createElement(MinusIcon, null)))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${smartLayoutDetails} ${toggleDetails ? active : ''}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: pinToEdgeBtnWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: alignTop
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${icon} ${selectedV.includes('Top') ? active : ''}`,
    onClick: () => setSelectedItemV('Top')
  }, /*#__PURE__*/React__default['default'].createElement(EdgeAlignTopIcon, null))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: alignCenter
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${icon} ${selectedH.includes('Left') ? active : ''}`,
    onClick: () => setSelectedItemH('Left')
  }, /*#__PURE__*/React__default['default'].createElement(EdgeAlignRightIcon, null)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: alignCenterIconVHWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${alignCenterIconV} ${selectedV.includes('CenterV') ? active : ''}`,
    onClick: () => setSelectedItemV('CenterV')
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${alignCenterIconH} ${selectedH.includes('CenterH') ? active : ''}`,
    onClick: () => setSelectedItemH('CenterH')
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${icon} ${selectedH.includes('Right') ? active : ''}`,
    onClick: () => setSelectedItemH('Right')
  }, /*#__PURE__*/React__default['default'].createElement(EdgeAlignLeftIcon, null))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: alignBottom
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${icon} ${selectedV.includes('Bottom') ? active : ''}`,
    onClick: () => setSelectedItemV('Bottom')
  }, /*#__PURE__*/React__default['default'].createElement(EdgeAlignBottomIcon, null)))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: pinToEdgeOptionsWrapper
  }, /*#__PURE__*/React__default['default'].createElement(Dropdown, {
    option: optionH,
    onChangeValue: ({
      value
    }) => setSelectedItemH(value),
    selectedValue: optionH.filter(item => item.value === selectedH)[0],
    size: "small"
  }), /*#__PURE__*/React__default['default'].createElement(Dropdown, {
    option: optionV,
    selectedValue: optionV.filter(item => item.value === selectedV)[0],
    onChangeValue: ({
      value
    }) => setSelectedItemV(value),
    size: "small"
  }))));
};
const optionH = [{
  name: 'Left',
  value: 'Left'
}, {
  name: 'Right',
  value: 'Right'
}, {
  name: 'Left and Right',
  value: 'Left and Right'
}, {
  name: 'Center',
  value: 'CenterH'
}, {
  name: 'Scale',
  value: 'Scale'
}];
const optionV = [{
  name: 'Top',
  value: 'Top'
}, {
  name: 'Bottom',
  value: 'Bottom'
}, {
  name: 'Top and Bottom',
  value: 'Top and Bottom'
}, {
  name: 'Center',
  value: 'CenterV'
}, {
  name: 'Scale',
  value: 'Scale'
}];

var css_248z$f = "* {\n  box-sizing: border-box;\n  font-family: Aktiv Grotesk, sans-serif; }\n\n.text-module_textComp__1YJsp {\n  width: 240px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  box-sizing: border-box;\n  padding: 8px;\n  cursor: pointer; }\n  .text-module_textComp__1YJsp .text-module_textControlWrapper__18OLP {\n    display: flex;\n    flex-direction: column;\n    width: 224px; }\n    .text-module_textComp__1YJsp .text-module_textControlWrapper__18OLP .text-module_textWrapper__2bJ4r {\n      width: 224px;\n      background: #ffffff;\n      border-radius: 4px;\n      display: flex;\n      flex-direction: column;\n      align-items: center; }\n      .text-module_textComp__1YJsp .text-module_textControlWrapper__18OLP .text-module_textWrapper__2bJ4r .text-module_fontListOption__3Z7yn {\n        width: 224px;\n        height: 32px;\n        display: flex;\n        justify-content: space-between; }\n        .text-module_textComp__1YJsp .text-module_textControlWrapper__18OLP .text-module_textWrapper__2bJ4r .text-module_fontListOption__3Z7yn .text-module_fontSizes__34JoY {\n          width: 64px;\n          height: 32px; }\n        .text-module_textComp__1YJsp .text-module_textControlWrapper__18OLP .text-module_textWrapper__2bJ4r .text-module_fontListOption__3Z7yn .text-module_fontListStyle__2ZCs5 {\n          width: 156px;\n          height: 32px; }\n      .text-module_textComp__1YJsp .text-module_textControlWrapper__18OLP .text-module_textWrapper__2bJ4r .text-module_row__2eioI {\n        width: 224px;\n        height: 32px;\n        margin-top: 12px;\n        display: flex;\n        justify-content: space-between;\n        align-items: center; }\n        .text-module_textComp__1YJsp .text-module_textControlWrapper__18OLP .text-module_textWrapper__2bJ4r .text-module_row__2eioI .text-module_lineHeightSpace__ql2h6 {\n          width: 88px;\n          height: 32px;\n          display: flex;\n          justify-content: space-between;\n          align-items: center; }\n        .text-module_textComp__1YJsp .text-module_textControlWrapper__18OLP .text-module_textWrapper__2bJ4r .text-module_row__2eioI .text-module_lineHeightSpaceButtons__1U7Ki {\n          width: 80px;\n          height: 32px;\n          box-sizing: border-box;\n          display: flex; }\n        .text-module_textComp__1YJsp .text-module_textControlWrapper__18OLP .text-module_textWrapper__2bJ4r .text-module_row__2eioI .text-module_alignButtons__2F0BL {\n          width: 80px; }\n        .text-module_textComp__1YJsp .text-module_textControlWrapper__18OLP .text-module_textWrapper__2bJ4r .text-module_row__2eioI .text-module_alignButtons2__1JRbx {\n          width: 80px;\n          margin-right: 8px; }\n        .text-module_textComp__1YJsp .text-module_textControlWrapper__18OLP .text-module_textWrapper__2bJ4r .text-module_row__2eioI .text-module_alignButtons3__245BR {\n          width: 80px;\n          margin-right: 8px; }\n  .text-module_textComp__1YJsp .text-module_moreMenu__1Y2-e {\n    width: 200px;\n    min-height: 104px;\n    padding: 4px;\n    border-radius: 8px;\n    box-shadow: 0px 2px 4px rgba(51, 51, 51, 0.12), 0px 0px 1px #999999, 0px 12px 24px -8px rgba(51, 51, 51, 0.08);\n    position: fixed;\n    background-color: #ffffff;\n    right: 240px; }\n    .text-module_textComp__1YJsp .text-module_moreMenu__1Y2-e .text-module_moreHeader__1JJI- {\n      width: 192px;\n      height: 32px;\n      border-bottom: 1px solid #f5f5f5;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      font-size: 11px;\n      font-weight: 600;\n      padding: 4px; }\n    .text-module_textComp__1YJsp .text-module_moreMenu__1Y2-e .text-module_moreBody__119Uk {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      border-radius: 8px;\n      flex-direction: column;\n      padding-top: 4px; }\n      .text-module_textComp__1YJsp .text-module_moreMenu__1Y2-e .text-module_moreBody__119Uk .text-module_morMenuBodyRow__1y-B- {\n        width: 184px;\n        height: 32px;\n        display: flex;\n        justify-content: space-between;\n        align-items: center; }\n        .text-module_textComp__1YJsp .text-module_moreMenu__1Y2-e .text-module_moreBody__119Uk .text-module_morMenuBodyRow__1y-B- label {\n          color: #999999;\n          font-size: 11px;\n          font-weight: 600; }\n        .text-module_textComp__1YJsp .text-module_moreMenu__1Y2-e .text-module_moreBody__119Uk .text-module_morMenuBodyRow__1y-B- .text-module_morItemRadioButton__2hdHK {\n          height: 24px; }\n          .text-module_textComp__1YJsp .text-module_moreMenu__1Y2-e .text-module_moreBody__119Uk .text-module_morMenuBodyRow__1y-B- .text-module_morItemRadioButton__2hdHK button {\n            background-color: transparent;\n            border-radius: 8px;\n            border: 0 !important; }\n            .text-module_textComp__1YJsp .text-module_moreMenu__1Y2-e .text-module_moreBody__119Uk .text-module_morMenuBodyRow__1y-B- .text-module_morItemRadioButton__2hdHK button:hover, .text-module_textComp__1YJsp .text-module_moreMenu__1Y2-e .text-module_moreBody__119Uk .text-module_morMenuBodyRow__1y-B- .text-module_morItemRadioButton__2hdHK button.text-module_active__3fs_m {\n              background-color: #ebebeb !important; }\n  .text-module_textComp__1YJsp.text-module_white__FFMVg {\n    background: #ffffff; }\n  .text-module_textComp__1YJsp .text-module_header__77oI3 {\n    width: 224px;\n    height: 32px;\n    margin-bottom: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between; }\n    .text-module_textComp__1YJsp .text-module_header__77oI3 .text-module_layerText__ailJB {\n      font-family: Aktiv Grotesk, sans-serif;\n      font-size: 12px;\n      line-height: 24px;\n      font-weight: 600;\n      display: flex;\n      align-items: center;\n      cursor: text; }\n      .text-module_textComp__1YJsp .text-module_header__77oI3 .text-module_layerText__ailJB.text-module_purple__1cJZj {\n        color: #b555e5; }\n      .text-module_textComp__1YJsp .text-module_header__77oI3 .text-module_layerText__ailJB.text-module_black__X88TG {\n        color: #31363a; }\n";
var style$e = {"textComp":"text-module_textComp__1YJsp","textControlWrapper":"text-module_textControlWrapper__18OLP","textWrapper":"text-module_textWrapper__2bJ4r","fontListOption":"text-module_fontListOption__3Z7yn","fontSizes":"text-module_fontSizes__34JoY","fontListStyle":"text-module_fontListStyle__2ZCs5","row":"text-module_row__2eioI","lineHeightSpace":"text-module_lineHeightSpace__ql2h6","lineHeightSpaceButtons":"text-module_lineHeightSpaceButtons__1U7Ki","alignButtons":"text-module_alignButtons__2F0BL","alignButtons2":"text-module_alignButtons2__1JRbx","alignButtons3":"text-module_alignButtons3__245BR","moreMenu":"text-module_moreMenu__1Y2-e","moreHeader":"text-module_moreHeader__1JJI-","moreBody":"text-module_moreBody__119Uk","morMenuBodyRow":"text-module_morMenuBodyRow__1y-B-","morItemRadioButton":"text-module_morItemRadioButton__2hdHK","active":"text-module_active__3fs_m","white":"text-module_white__FFMVg","header":"text-module_header__77oI3","layerText":"text-module_layerText__ailJB","purple":"text-module_purple__1cJZj","black":"text-module_black__X88TG"};
styleInject(css_248z$f);

const TreeDots = ({
  width = 10,
  height = 2
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 10 2`
  }, /*#__PURE__*/React__default['default'].createElement("defs", null), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#31363A",
    fillRule: "evenodd",
    d: "M0 1c0-.55229.44771-1 1-1 .55228 0 1 .44771 1 1 0 .55228-.44772 1-1 1-.55229 0-1-.44772-1-1zm4 0c0-.55229.44772-1 1-1s1 .44771 1 1c0 .55228-.44772 1-1 1s-1-.44772-1-1zm5-1c-.55229 0-1 .44771-1 1 0 .55228.44771 1 1 1s1-.44772 1-1c0-.55229-.44771-1-1-1z",
    clipRule: "evenodd"
  }));
};

var css_248z$e = ".radio-module_radioButton__2_3sh {\n  min-width: 32px;\n  height: 32px;\n  background-color: #ffffff;\n  border: 1px solid #e8ebed;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n  .radio-module_radioButton__2_3sh * {\n    box-sizing: border-box; }\n  .radio-module_radioButton__2_3sh .radio-module_resetBtn__28xi1.radio-module_active__3wKuC {\n    background-color: #ebebeb !important; }\n";
var style$d = {"radioButton":"radio-module_radioButton__2_3sh","resetBtn":"radio-module_resetBtn__28xi1","active":"radio-module_active__3wKuC"};
styleInject(css_248z$e);

/* eslint-disable react-hooks/exhaustive-deps */
const RadioButton = ({
  onChange = () => {},
  className = null,
  row = []
}) => {
  const {
    radioButton,
    resetBtn,
    active
  } = style$d;
  const [state, setState] = React$1.useState('AlignHorizontalIcon');
  React$1.useEffect(() => {
    onChange(state);
  }, [state]);

  const isActivated = type => state === type;

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${radioButton} ${className ? className : ''}`
  }, row.map(item => /*#__PURE__*/React__default['default'].createElement(IconButton, {
    key: item.id,
    size: "small",
    className: `${resetBtn} ${isActivated(item.name) ? active : ''}`,
    isActive: isActivated(item.name),
    onClick: () => setState(item.name)
  }, item.icon)));
};

/* eslint-disable react-hooks/exhaustive-deps */
const Text = ({
  type = 'white',
  textColor = 'black',
  text = 'Text',
  onChange = () => {}
}) => {
  const {
    textComp,
    header,
    layerText,
    textControlWrapper,
    textWrapper,
    row,
    alignInputLineHeight,
    alignInputLineSpace,
    lineHeightSpaceButtons,
    alignButtons,
    alignButtons2,
    alignButtons3,
    fontListOption,
    fontListStyle,
    fontSizes,
    moreMenu,
    moreHeader,
    moreBody,
    morMenuBodyRow,
    morItemRadioButton
  } = style$e;
  const [state1, setState1] = React$1.useState(20);
  const [state2, setState2] = React$1.useState(0);
  const [sizeState, setSizeState] = React$1.useState();
  const [fontState, setFontState] = React$1.useState();
  const [align, setAlign] = React$1.useState();
  const [toggleMoreItems, setToggleMoreItems] = React$1.useState(false);
  const radioButton1 = [{
    id: getUnique(),
    name: 'AlignHorizontalIcon',
    icon: /*#__PURE__*/React__default['default'].createElement(AlignHorizontalIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'AlignAutoHeight',
    icon: /*#__PURE__*/React__default['default'].createElement(AlignAutoHeightIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'AlignRectangle',
    icon: /*#__PURE__*/React__default['default'].createElement(AlignRectangleIcon, {
      width: 10
    })
  }];
  const radioButton2 = [{
    id: getUnique(),
    name: 'AlignTextLeftIcon',
    icon: /*#__PURE__*/React__default['default'].createElement(AlignTextLeftIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'AlignTextCenterIcon',
    icon: /*#__PURE__*/React__default['default'].createElement(AlignTextCenterIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'AlignTextRightIcon',
    icon: /*#__PURE__*/React__default['default'].createElement(AlignTextRightIcon, {
      width: 10
    })
  }];
  const radioButton3 = [{
    id: getUnique(),
    name: 'AlignTextTopIcon',
    icon: /*#__PURE__*/React__default['default'].createElement(AlignTextTopIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'AlignTextMiddleIcon',
    icon: /*#__PURE__*/React__default['default'].createElement(AlignTextMiddleIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'AlignTextBottomIcon',
    icon: /*#__PURE__*/React__default['default'].createElement(AlignTextBottomIcon, {
      width: 10
    })
  }];
  const morMenuCaseOptions = [{
    id: getUnique(),
    name: 'MinusIcon',
    icon: /*#__PURE__*/React__default['default'].createElement(MinusIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'TextCamelCaseIcon',
    icon: /*#__PURE__*/React__default['default'].createElement(TextCamelCaseIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'TextCapitalCaseIcon',
    icon: /*#__PURE__*/React__default['default'].createElement(TextCapitalCaseIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'TextLowerCaseIcon',
    icon: /*#__PURE__*/React__default['default'].createElement(TextLowerCaseIcon, {
      width: 10
    })
  }];
  const morMenuDecorationOptions = [{
    id: getUnique(),
    name: 'MinusIcon',
    icon: /*#__PURE__*/React__default['default'].createElement(MinusIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'TextUnderLineDecorationIcon',
    icon: /*#__PURE__*/React__default['default'].createElement(TextUnderLineDecorationIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'TextStrikeThroughDecorationIcon',
    icon: /*#__PURE__*/React__default['default'].createElement(TextStrikeThroughDecorationIcon, {
      width: 10
    })
  }];
  const fontList = [{
    value: getUnique(),
    name: 'Aktiv Grotesk'
  }, {
    value: getUnique(),
    name: 'Fraunces'
  }, {
    value: getUnique(),
    name: 'Variable '
  }];
  const fontSizesList = [{
    value: 18,
    name: 18
  }, {
    value: 22,
    name: 22
  }, {
    value: 27,
    name: 27
  }, {
    value: 29,
    name: 29
  }, {
    value: 30,
    name: 30
  }, {
    value: 50,
    name: 50
  }];
  React$1.useEffect(() => {
    if (onChange) onChange({
      state1,
      state2,
      sizeState,
      fontState
    });
  }, [state1, state2, sizeState, fontState, align]); // close menu by click outside.

  const moreMenuRef = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setToggleMoreItems(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [moreMenuRef]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${textComp} ${style$e[type]}`,
    ref: moreMenuRef
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: header
  }, /*#__PURE__*/React__default['default'].createElement("label", {
    className: `${layerText} ${style$e[textColor]}`
  }, text)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: textControlWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: textWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: fontListOption
  }, /*#__PURE__*/React__default['default'].createElement(Dropdown, {
    option: fontList,
    className: fontListStyle,
    onChangeValue: setFontState,
    selectedValue: fontState,
    size: "medium"
  }), /*#__PURE__*/React__default['default'].createElement(Dropdown, {
    option: fontSizesList,
    className: fontSizes,
    onChangeValue: setSizeState,
    selectedValue: sizeState,
    size: "medium",
    popupMenu: "left"
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: row
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: alignInputLineHeight
  }, /*#__PURE__*/React__default['default'].createElement(Input, {
    label: /*#__PURE__*/React__default['default'].createElement(AlignLineHeightIcon, null),
    dir: "left",
    value: state1,
    setValue: setState1
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: alignInputLineSpace
  }, /*#__PURE__*/React__default['default'].createElement(Input, {
    label: /*#__PURE__*/React__default['default'].createElement(AlignLineSpaceIcon, null),
    dir: "left",
    value: state2,
    setValue: setState2
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: lineHeightSpaceButtons
  }, /*#__PURE__*/React__default['default'].createElement(RadioButton, {
    className: alignButtons,
    row: radioButton1,
    onChangeValues: onChange
  }))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: row
  }, /*#__PURE__*/React__default['default'].createElement(RadioButton, {
    className: alignButtons2,
    row: radioButton2,
    onChangeValues: onChange
  }), /*#__PURE__*/React__default['default'].createElement(RadioButton, {
    className: alignButtons3,
    row: radioButton3,
    onChangeValues: onChange
  }), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    onClick: () => setToggleMoreItems(!toggleMoreItems),
    isActive: toggleMoreItems
  }, /*#__PURE__*/React__default['default'].createElement(TreeDots, null)))), toggleMoreItems && /*#__PURE__*/React__default['default'].createElement("div", {
    className: moreMenu
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: moreHeader
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Text Option"), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    size: "small",
    onClick: () => setToggleMoreItems(!toggleMoreItems)
  }, /*#__PURE__*/React__default['default'].createElement(CrossIcon, null))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: moreBody
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Case"), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement(RadioButton, {
    className: morItemRadioButton,
    row: morMenuCaseOptions,
    onChangeValues: onChange
  }))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Decoration"), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement(RadioButton, {
    className: morItemRadioButton,
    row: morMenuDecorationOptions,
    onChangeValues: onChange
  })))))));
};

var css_248z$d = ".adj-menu-module_adjMenu__Bfc8q {\n  position: fixed;\n  top: 50px;\n  width: 300px;\n  height: 192px;\n  right: 242px;\n  background: #ffffff;\n  box-shadow: 0px 2px 4px rgba(51, 51, 51, 0.12), 0px 0px 1px #999999, 0px 12px 24px -8px rgba(51, 51, 51, 0.08);\n  border-radius: 8px; }\n  .adj-menu-module_adjMenu__Bfc8q * {\n    box-sizing: border-box;\n    font-family: Aktiv Grotesk, sans-serif;\n    user-select: none; }\n  .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_header__31czL {\n    font-size: 11px;\n    width: 292px;\n    height: 32px;\n    border-bottom: 1px solid #f5f5f5;\n    display: flex;\n    align-items: center;\n    justify-content: space-between; }\n    .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_header__31czL label {\n      font-weight: 600;\n      font-size: 11px;\n      line-height: 16px;\n      display: flex;\n      align-items: center;\n      text-align: center;\n      color: #333333; }\n    .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_header__31czL .adj-menu-module_resetBtn__2sE9r {\n      border: 0;\n      background-color: transparent;\n      color: #3399ff;\n      cursor: pointer; }\n  .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR {\n    justify-content: center;\n    align-items: center;\n    display: flex;\n    overflow: hidden; }\n    .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_left__1xzrk {\n      width: 140px;\n      height: 160px;\n      display: flex;\n      flex-direction: column;\n      border-right: 1px solid #f5f5f5;\n      justify-content: space-between;\n      align-items: center;\n      padding-top: 4px;\n      padding-bottom: 4px; }\n      .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_left__1xzrk .adj-menu-module_row__2VMPi {\n        width: 132px;\n        font-size: 11px;\n        line-height: 16px;\n        display: flex;\n        align-items: center;\n        color: #333333; }\n        .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_left__1xzrk .adj-menu-module_row__2VMPi.adj-menu-module_presets__G9I4W {\n          border-bottom: 1px solid #f5f5f5; }\n        .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_left__1xzrk .adj-menu-module_row__2VMPi .adj-menu-module_rowItem__IeUfi {\n          display: flex;\n          height: 24px;\n          align-items: center;\n          justify-content: space-between;\n          padding: 0 8px;\n          width: 100%; }\n          .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_left__1xzrk .adj-menu-module_row__2VMPi .adj-menu-module_rowItem__IeUfi * {\n            cursor: pointer; }\n          .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_left__1xzrk .adj-menu-module_row__2VMPi .adj-menu-module_rowItem__IeUfi svg {\n            stroke: #333333; }\n          .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_left__1xzrk .adj-menu-module_row__2VMPi .adj-menu-module_rowItem__IeUfi:hover {\n            background: #f5f5f5;\n            border-radius: 4px; }\n    .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 {\n      width: 160px;\n      height: 160px;\n      padding: 4px; }\n      .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_presents__3lUuZ {\n        display: flex;\n        flex-wrap: wrap;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer; }\n        .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_presents__3lUuZ .adj-menu-module_column__32as2 {\n          width: 74px;\n          height: 94px;\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          justify-content: space-around;\n          padding-top: 1px; }\n          .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_presents__3lUuZ .adj-menu-module_column__32as2.adj-menu-module_active__16AUR, .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_presents__3lUuZ .adj-menu-module_column__32as2:hover {\n            background: #ebebeb;\n            border-radius: 8px; }\n            .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_presents__3lUuZ .adj-menu-module_column__32as2.adj-menu-module_active__16AUR label, .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_presents__3lUuZ .adj-menu-module_column__32as2:hover label {\n              color: #333333; }\n          .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_presents__3lUuZ .adj-menu-module_column__32as2 .adj-menu-module_imageBox__1SbiI {\n            width: 66px;\n            height: 66px;\n            border-radius: 4px;\n            background-position: center;\n            background-size: cover;\n            background-repeat: no-repeat; }\n          .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_presents__3lUuZ .adj-menu-module_column__32as2 label {\n            font-size: 11px;\n            line-height: 16px;\n            font-weight: 600;\n            color: #999999; }\n      .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_adjustmentsDetails__1XmjF {\n        padding-left: 4px; }\n        .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_adjustmentsDetails__1XmjF .adj-menu-module_adjustmentName__3b-1E {\n          display: flex;\n          font-size: 11px;\n          text-transform: capitalize;\n          color: #333333;\n          margin: 8px 0; }\n        .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_adjustmentsDetails__1XmjF .adj-menu-module_amountBody__1DSkz {\n          display: flex;\n          align-items: center;\n          justify-content: space-between;\n          height: 24px; }\n          .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_adjustmentsDetails__1XmjF .adj-menu-module_amountBody__1DSkz * {\n            font-size: 11px;\n            color: #999999; }\n          .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_adjustmentsDetails__1XmjF .adj-menu-module_amountBody__1DSkz .adj-menu-module_amountInput__1q-aJ {\n            height: 24px; }\n      .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_dropShadow__12qDj {\n        padding-left: 4px; }\n        .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_dropShadow__12qDj .adj-menu-module_adjustmentName__3b-1E {\n          display: flex;\n          font-size: 11px;\n          text-transform: capitalize;\n          color: #333333;\n          margin: 8px 0; }\n        .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_dropShadow__12qDj .adj-menu-module_amountBody__1DSkz {\n          display: flex;\n          align-items: center;\n          justify-content: space-between;\n          flex-direction: column;\n          height: 24px; }\n          .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_dropShadow__12qDj .adj-menu-module_amountBody__1DSkz .adj-menu-module_amountInput__1q-aJ {\n            height: 24px; }\n          .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_dropShadow__12qDj .adj-menu-module_amountBody__1DSkz .adj-menu-module_row__2VMPi {\n            height: 24px;\n            width: 100%;\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            margin-bottom: 8px;\n            font-size: 11px;\n            line-height: 16px; }\n            .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 .adj-menu-module_dropShadow__12qDj .adj-menu-module_amountBody__1DSkz .adj-menu-module_row__2VMPi label {\n              color: #999999; }\n    .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_left__1xzrk > div > div:nth-child(3),\n    .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 > div > div:nth-child(3) {\n      width: 4px !important;\n      right: 0 !important; }\n      .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_left__1xzrk > div > div:nth-child(3) > div:hover,\n      .adj-menu-module_adjMenu__Bfc8q .adj-menu-module_body__GgCzR .adj-menu-module_right__3Khh6 > div > div:nth-child(3) > div:hover {\n        background-color: #3399ff !important; }\n";
var style$c = {"adjMenu":"adj-menu-module_adjMenu__Bfc8q","header":"adj-menu-module_header__31czL","resetBtn":"adj-menu-module_resetBtn__2sE9r","body":"adj-menu-module_body__GgCzR","left":"adj-menu-module_left__1xzrk","row":"adj-menu-module_row__2VMPi","presets":"adj-menu-module_presets__G9I4W","rowItem":"adj-menu-module_rowItem__IeUfi","right":"adj-menu-module_right__3Khh6","presents":"adj-menu-module_presents__3lUuZ","column":"adj-menu-module_column__32as2","active":"adj-menu-module_active__16AUR","imageBox":"adj-menu-module_imageBox__1SbiI","adjustmentsDetails":"adj-menu-module_adjustmentsDetails__1XmjF","adjustmentName":"adj-menu-module_adjustmentName__3b-1E","amountBody":"adj-menu-module_amountBody__1DSkz","amountInput":"adj-menu-module_amountInput__1q-aJ","dropShadow":"adj-menu-module_dropShadow__12qDj"};
styleInject(css_248z$d);

/* eslint-disable react-hooks/exhaustive-deps */
const AdjMenu = ({
  closeMenu,
  closeBtnRef,
  activeAdjustmentsRef,
  activeAdjustments,
  setActiveAdjustment,
  setActiveAdjustments,
  activeAdjustment
}) => {
  const {
    adjMenu,
    header,
    resetBtn,
    body,
    left,
    row,
    rowItem,
    right
  } = style$c; // close menu by click outside.

  const adjMenuRef = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (closeBtnRef.current && !closeBtnRef.current.contains(e.target) && activeAdjustmentsRef.current && !activeAdjustmentsRef.current.contains(e.target) && adjMenuRef.current && !adjMenuRef.current.contains(e.target)) {
        closeMenu(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [adjMenuRef]);

  const updateRow = ({
    key,
    field,
    value
  }) => {
    let _activeAdjustments = [...activeAdjustments];
    _activeAdjustments[key][field] = value;
    if (value === '') _activeAdjustments[key]['selected'] = false;
    _activeAdjustments[key]['selected'] = parseInt(value) > 0;
    setActiveAdjustments(_activeAdjustments);
  };

  const restAdjustment = () => {
    let _activeAdjustments = [...activeAdjustments];

    _activeAdjustments.forEach((item, key) => {
      _activeAdjustments[key].selected = false;
      _activeAdjustments[key].amount = 0;
    });

    setActiveAdjustments(_activeAdjustments);
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: adjMenu,
    ref: adjMenuRef
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: header
  }, /*#__PURE__*/React__default['default'].createElement("button", {
    className: resetBtn,
    onClick: () => restAdjustment()
  }, "Reset"), /*#__PURE__*/React__default['default'].createElement("label", null, "Add Adjustment"), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    size: "small",
    onClick: () => closeMenu(false)
  }, /*#__PURE__*/React__default['default'].createElement(CrossIcon, null))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: body
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: left
  }, /*#__PURE__*/React__default['default'].createElement(Scrollbars__default['default'], {
    autoHide: true,
    style: {
      height: '100%',
      width: 132
    }
  }, activeAdjustments.map((item, key) => /*#__PURE__*/React__default['default'].createElement(React$1.Fragment, {
    key: key
  }, item.value !== 'presents' && /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${row}`,
    key: key
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: rowItem,
    onClick: () => setActiveAdjustment({
      name: item.name,
      value: item.value,
      key
    })
  }, /*#__PURE__*/React__default['default'].createElement("label", null, item.name), item.selected ? /*#__PURE__*/React__default['default'].createElement(CheckIcon, null) : '')))))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: right
  }, /*#__PURE__*/React__default['default'].createElement(Scrollbars__default['default'], {
    autoHide: true,
    style: {
      height: '100%',
      width: 148
    }
  }, /*#__PURE__*/React__default['default'].createElement(AdjustmentsDetails, {
    updateRow,
    activeAdjustment,
    activeAdjustments
  })))));
};

const AdjustmentsDetails = ({
  updateRow,
  activeAdjustment,
  activeAdjustments
}) => {
  const defaultValue = 'key' in activeAdjustment ? activeAdjustments[activeAdjustment.key]['amount'] : 0;
  const [input, setInput] = React$1.useState(defaultValue);
  const {
    adjustmentsDetails,
    adjustmentName,
    amountBody,
    amountInput
  } = style$c;
  React$1.useEffect(() => {
    const update = {
      field: 'amount',
      key: activeAdjustment.key,
      value: parseInt(input)
    };
    updateRow(update);
  }, [input]);
  React$1.useEffect(() => {
    setInput(defaultValue);
  }, [defaultValue]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: adjustmentsDetails
  }, /*#__PURE__*/React__default['default'].createElement("label", {
    className: adjustmentName
  }, activeAdjustment.name), /*#__PURE__*/React__default['default'].createElement("div", {
    className: amountBody
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Amount"), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChangeValue: setInput,
    value: input,
    setValue: setInput,
    label: "%",
    size: "normal",
    className: amountInput
  })));
};

var css_248z$c = ".adj-row-module_adjRow__1RN0h {\n  position: relative;\n  width: 224px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n  cursor: pointer; }\n  .adj-row-module_adjRow__1RN0h * {\n    box-sizing: border-box;\n    font-family: Aktiv Grotesk, sans-serif;\n    user-select: none; }\n  .adj-row-module_adjRow__1RN0h .adj-row-module_adjText__i7JEN {\n    font-size: 11px;\n    width: 168px;\n    height: 24px;\n    background: #f5f5f5;\n    border-radius: 8px;\n    align-items: center;\n    display: flex;\n    padding-left: 8px; }\n    .adj-row-module_adjRow__1RN0h .adj-row-module_adjText__i7JEN.adj-row-module_active__MkkXr {\n      border: 1px solid #3399ff; }\n  .adj-row-module_adjRow__1RN0h .adj-row-module_btn__20K4z {\n    width: 24px;\n    height: 24px; }\n    .adj-row-module_adjRow__1RN0h .adj-row-module_btn__20K4z.adj-row-module_minus__2IYPi svg path {\n      stroke: #999999; }\n    .adj-row-module_adjRow__1RN0h .adj-row-module_btn__20K4z svg path {\n      fill: #999999; }\n";
var style$b = {"adjRow":"adj-row-module_adjRow__1RN0h","adjText":"adj-row-module_adjText__i7JEN","active":"adj-row-module_active__MkkXr","btn":"adj-row-module_btn__20K4z","minus":"adj-row-module_minus__2IYPi"};
styleInject(css_248z$c);

/* eslint-disable react-hooks/exhaustive-deps */
const AdjRow = ({
  row,
  onChange,
  isActive = false
}) => {
  const {
    adjRow,
    adjText,
    btn,
    minus,
    active
  } = style$b;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${adjRow}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${adjText} ${isActive ? active : ''}`,
    onClick: () => onChange('activeAdjustment')
  }, row.name), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    className: btn,
    onClick: () => onChange('visible')
  }, row.visible ? /*#__PURE__*/React__default['default'].createElement(EyeIcon, null) : /*#__PURE__*/React__default['default'].createElement(EyeOffIcon, null)), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    className: `${btn} ${minus}`,
    onClick: () => onChange('selected')
  }, /*#__PURE__*/React__default['default'].createElement(MinusIcon, null)));
};

var css_248z$b = ".adjustments-module_fill__2kUst {\n  width: 240px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  box-sizing: border-box;\n  padding: 8px;\n  cursor: pointer; }\n  .adjustments-module_fill__2kUst .adjustments-module_header__38ZI8 {\n    display: flex; }\n    .adjustments-module_fill__2kUst .adjustments-module_header__38ZI8 button {\n      width: 24px;\n      height: 24px; }\n  .adjustments-module_fill__2kUst .adjustments-module_activeFillItems__Jm7jm {\n    display: flex;\n    flex-direction: column;\n    width: 224px; }\n  .adjustments-module_fill__2kUst.adjustments-module_white__3zrYX {\n    background: #ffffff; }\n  .adjustments-module_fill__2kUst.adjustments-module_gray__2XM6P {\n    background: #f7f9fa; }\n  .adjustments-module_fill__2kUst.adjustments-module_silver__3v8G4 {\n    background: #f2f4f5; }\n  .adjustments-module_fill__2kUst .adjustments-module_header__38ZI8 {\n    width: 224px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between; }\n    .adjustments-module_fill__2kUst .adjustments-module_header__38ZI8 .adjustments-module_layerText__6sKpM {\n      font-family: Aktiv Grotesk, sans-serif;\n      font-size: 12px;\n      line-height: 24px;\n      font-weight: 600;\n      display: flex;\n      align-items: center;\n      cursor: text; }\n      .adjustments-module_fill__2kUst .adjustments-module_header__38ZI8 .adjustments-module_layerText__6sKpM.adjustments-module_purple__dVPPy {\n        color: #b555e5; }\n      .adjustments-module_fill__2kUst .adjustments-module_header__38ZI8 .adjustments-module_layerText__6sKpM.adjustments-module_black__1MxYM {\n        color: #31363a; }\n  .adjustments-module_fill__2kUst .adjustments-module_layerBtnAction__2mKlA {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    vertical-align: middle; }\n";
var style$a = {"fill":"adjustments-module_fill__2kUst","header":"adjustments-module_header__38ZI8","activeFillItems":"adjustments-module_activeFillItems__Jm7jm","white":"adjustments-module_white__3zrYX","gray":"adjustments-module_gray__2XM6P","silver":"adjustments-module_silver__3v8G4","layerText":"adjustments-module_layerText__6sKpM","purple":"adjustments-module_purple__dVPPy","black":"adjustments-module_black__1MxYM","layerBtnAction":"adjustments-module_layerBtnAction__2mKlA"};
styleInject(css_248z$b);

/* eslint-disable react-hooks/exhaustive-deps */
const _activeAdjustments = [{
  value: 'brightness',
  name: 'Brightness',
  selected: false,
  amount: 0,
  visible: true
}, {
  value: 'contrast',
  name: 'Contrast',
  selected: false,
  amount: 0,
  visible: true
}, {
  value: 'hue-rotation',
  name: 'Hue Rotation',
  selected: false,
  amount: 0,
  visible: true
}, {
  value: 'saturation',
  name: 'Saturation',
  selected: false,
  amount: 0,
  visible: true
}];
const Adjustment = ({
  text = 'Adjustment',
  type = 'white',
  textColor = 'black',
  onChange = () => {}
}) => {
  const {
    fill,
    layerBtnAction,
    layerText,
    header,
    activeFillItems
  } = style$a;
  const [toggleAdjMenu, setToggleAdjMenu] = React$1.useState(false);
  const [activeAdjustments, setActiveAdjustments] = React$1.useState(_activeAdjustments);
  const [activeAdjustment, setActiveAdjustment] = React$1.useState({
    value: 'contrast',
    key: 0
  });
  React$1.useEffect(() => {
    onChange(activeAdjustments.filter(item => item.selected));
  }, [activeAdjustments]); //Remove or On/Off Adjustment in Adj Component => right menu.

  const updateActiveAdjustment = ({
    field,
    key
  }) => {
    if (field === 'activeAdjustment') {
      console.log(activeAdjustments[key]);
      const _adjustment = activeAdjustments[key];
      setActiveAdjustment({
        name: _adjustment.name,
        value: _adjustment.value,
        key
      });
      setToggleAdjMenu(true);
    } else {
      const _tmpActiveAdjustments = [...activeAdjustments];
      _tmpActiveAdjustments[key][field] = !_tmpActiveAdjustments[key][field];

      if (field === 'selected') {
        _tmpActiveAdjustments[key]['amount'] = 0;
      }

      setActiveAdjustments(_tmpActiveAdjustments);
    }
  };

  const closeMenuBtn = /*#__PURE__*/React$1.createRef();
  const activeAdjustmentsRef = /*#__PURE__*/React$1.createRef();
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${fill} ${style$a[type]}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: header
  }, /*#__PURE__*/React__default['default'].createElement("label", {
    className: `${layerText} ${style$a[textColor]}`
  }, text), /*#__PURE__*/React__default['default'].createElement("div", {
    ref: closeMenuBtn,
    className: `${layerBtnAction}`,
    onClick: () => setToggleAdjMenu(!toggleAdjMenu)
  }, /*#__PURE__*/React__default['default'].createElement(IconButton, null, /*#__PURE__*/React__default['default'].createElement(PlusIcon, null))), toggleAdjMenu && /*#__PURE__*/React__default['default'].createElement(AdjMenu, {
    closeMenu: setToggleAdjMenu,
    onChange: onChange,
    closeBtnRef: closeMenuBtn,
    activeAdjustmentsRef: activeAdjustmentsRef,
    activeAdjustments: activeAdjustments,
    activeAdjustment: activeAdjustment,
    setActiveAdjustment: setActiveAdjustment,
    setActiveAdjustments: setActiveAdjustments
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: activeFillItems,
    ref: activeAdjustmentsRef
  }, activeAdjustments && activeAdjustments.map((item, key) => {
    return /*#__PURE__*/React__default['default'].createElement(React$1.Fragment, {
      key: key
    }, item.selected ? /*#__PURE__*/React__default['default'].createElement(AdjRow, {
      label: "%",
      row: item,
      isActive: activeAdjustment.value === item.value,
      onChange: field => updateActiveAdjustment({
        field,
        key
      })
    }) : '');
  })));
};

const BlendIcon = ({
  width = 18,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 18 12`,
    fill: "transparent"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 11.1973C10.7934 10.1599 12 8.2208 12 6 12 3.779 10.7934 1.84 9 .8027 7.2066 1.84 6 3.779 6 6c0 2.2208 1.2066 4.1599 3 5.1973z",
    fill: "#EBEBEB"
  }), /*#__PURE__*/React__default['default'].createElement("circle", {
    cx: "6",
    cy: "6",
    r: "5.5",
    stroke: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("circle", {
    cx: "12",
    cy: "6",
    r: "5.5",
    stroke: "#999"
  }));
};
const BlendHoverIcon = ({
  width = 18,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 18 12`,
    fill: "transparent"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 11.1973C10.7934 10.1599 12 8.2208 12 6 12 3.779 10.7934 1.84 9 .8027 7.2066 1.84 6 3.779 6 6c0 2.2208 1.2066 4.1599 3 5.1973z",
    fill: "#999"
  }), /*#__PURE__*/React__default['default'].createElement("circle", {
    cx: "6",
    cy: "6",
    r: "5.5",
    stroke: "#333"
  }), /*#__PURE__*/React__default['default'].createElement("circle", {
    cx: "12",
    cy: "6",
    r: "5.5",
    stroke: "#333"
  }));
};

var css_248z$a = ".fill-row-module_fillRow__3AiSV {\n  position: relative;\n  width: 224px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-radius: 4px;\n  margin: 8px 0;\n  cursor: pointer; }\n  .fill-row-module_fillRow__3AiSV * {\n    box-sizing: border-box;\n    font-family: Aktiv Grotesk, sans-serif;\n    user-select: none; }\n  .fill-row-module_fillRow__3AiSV .fill-row-module_colorActionWrapper__XD7Wi {\n    display: flex;\n    width: 104px;\n    height: 32px;\n    border: 1px solid #e8ebed;\n    border-radius: 8px;\n    align-items: center;\n    padding: 8px; }\n    .fill-row-module_fillRow__3AiSV .fill-row-module_colorActionWrapper__XD7Wi:hover {\n      border: 1px solid #3399ff; }\n    .fill-row-module_fillRow__3AiSV .fill-row-module_colorActionWrapper__XD7Wi:focus-within {\n      border: 1px solid #3399ff; }\n    .fill-row-module_fillRow__3AiSV .fill-row-module_colorActionWrapper__XD7Wi input {\n      font-size: 11px;\n      border: 0;\n      outline: none;\n      width: 64px;\n      padding-left: 8px; }\n    .fill-row-module_fillRow__3AiSV .fill-row-module_colorActionWrapper__XD7Wi .fill-row-module_colorPicker__15Lpx {\n      width: 16px;\n      height: 16px;\n      border-radius: 50%; }\n  .fill-row-module_fillRow__3AiSV.fill-row-module_active__29zYK {\n    border: 1px solid #3399ff; }\n  .fill-row-module_fillRow__3AiSV .fill-row-module_fillText__2rXs8 {\n    width: 52px;\n    height: 32px;\n    justify-content: flex-end; }\n    .fill-row-module_fillRow__3AiSV .fill-row-module_fillText__2rXs8 input {\n      width: 20px;\n      padding: 0;\n      line-height: 16px;\n      font-size: 11px; }\n  .fill-row-module_fillRow__3AiSV .fill-row-module_btnRow__1FtV2 {\n    width: 24px;\n    height: 32px; }\n  .fill-row-module_fillRow__3AiSV .fill-row-module_colorPickerModal__3sRG0 {\n    position: fixed;\n    right: 240px;\n    z-index: 1; }\n    .fill-row-module_fillRow__3AiSV .fill-row-module_colorPickerModal__3sRG0 > div {\n      border: 0 !important;\n      border-radius: 8px !important;\n      background: #f7f9fa !important;\n      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.06), 0px 0.5px 1px rgba(0, 0, 0, 0.24) !important; }\n  .fill-row-module_fillRow__3AiSV.fill-row-module_white__1nKau {\n    background: #ffffff; }\n  .fill-row-module_fillRow__3AiSV.fill-row-module_gray__CHWab {\n    background: #f7f9fa; }\n  .fill-row-module_fillRow__3AiSV.fill-row-module_silver__spEV6 {\n    background: #f2f4f5; }\n  .fill-row-module_fillRow__3AiSV .fill-row-module_layerText__1SiPB {\n    font-size: 12px;\n    line-height: 24px;\n    font-weight: 600;\n    display: flex;\n    align-items: center;\n    margin: 0px 8px;\n    width: 188px;\n    height: 24px;\n    cursor: text; }\n    .fill-row-module_fillRow__3AiSV .fill-row-module_layerText__1SiPB.fill-row-module_purple__1o4db {\n      color: #b555e5; }\n    .fill-row-module_fillRow__3AiSV .fill-row-module_layerText__1SiPB.fill-row-module_black__80Yjk {\n      color: #31363a; }\n  .fill-row-module_fillRow__3AiSV [type='text']:focus,\n  .fill-row-module_fillRow__3AiSV [type='password']:focus,\n  .fill-row-module_fillRow__3AiSV [type='number']:focus,\n  .fill-row-module_fillRow__3AiSV [type='email']:focus,\n  .fill-row-module_fillRow__3AiSV [type='search']:focus {\n    color: #333333; }\n";
var style$9 = {"fillRow":"fill-row-module_fillRow__3AiSV","colorActionWrapper":"fill-row-module_colorActionWrapper__XD7Wi","colorPicker":"fill-row-module_colorPicker__15Lpx","active":"fill-row-module_active__29zYK","fillText":"fill-row-module_fillText__2rXs8","btnRow":"fill-row-module_btnRow__1FtV2","colorPickerModal":"fill-row-module_colorPickerModal__3sRG0","white":"fill-row-module_white__1nKau","gray":"fill-row-module_gray__CHWab","silver":"fill-row-module_silver__spEV6","layerText":"fill-row-module_layerText__1SiPB","purple":"fill-row-module_purple__1o4db","black":"fill-row-module_black__80Yjk"};
styleInject(css_248z$a);

/* eslint-disable react-hooks/exhaustive-deps */
const FillRow = ({
  type = 'white',
  row,
  onChange = () => {},
  removeRow = () => {}
}) => {
  const {
    fillRow,
    colorActionWrapper,
    colorPicker,
    colorPickerModal,
    fillText,
    btnRow
  } = style$9;
  const {
    color,
    opacity = 100
  } = row;
  const [selectedColor, setSelectedColor] = React$1.useState(color);
  const [selectedOpacity, setSelectedOpacity] = React$1.useState(opacity);
  const [toggleColorPicker, setToggleColorPicker] = React$1.useState(false);
  const [colorPickerStyle, setColorPickerStyle] = React$1.useState({
    backgroundColor: selectedColor,
    opacity: selectedOpacity / 100
  });
  React$1.useEffect(() => {
    onChange({
      color: selectedColor,
      value: parseFloat(selectedOpacity)
    });
    setColorPickerStyle({
      backgroundColor: selectedColor,
      opacity: selectedOpacity / 100
    });
  }, [selectedColor, selectedOpacity]);
  React$1.useEffect(() => {
    setColorPickerStyle({
      backgroundColor: selectedColor,
      opacity: selectedOpacity / 100
    });
  }, [row]); // close color picker by click outside.

  const colorPickerWrapper = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (colorPickerWrapper.current && !colorPickerWrapper.current.contains(e.target)) {
        setToggleColorPicker(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [colorPickerWrapper]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${fillRow} ${style$9[type]}`
  }, toggleColorPicker && /*#__PURE__*/React__default['default'].createElement("div", {
    className: colorPickerModal,
    ref: colorPickerWrapper
  }, /*#__PURE__*/React__default['default'].createElement(reactColor.SketchPicker, {
    color: selectedColor,
    onChange: color => setSelectedColor(color.hex)
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: colorActionWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    onClick: () => setToggleColorPicker(!toggleColorPicker),
    className: colorPicker,
    style: colorPickerStyle
  }), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setSelectedColor,
    setValue: setSelectedColor,
    value: selectedColor,
    type: "string",
    size: "noStyle"
  })), /*#__PURE__*/React__default['default'].createElement(IconButton, null, /*#__PURE__*/React__default['default'].createElement(BlendHoverIcon, null)), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setSelectedOpacity,
    value: selectedOpacity,
    setValue: setSelectedOpacity,
    dir: "right",
    label: "%",
    className: fillText
  }), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    className: btnRow,
    onClick: () => removeRow(row)
  }, /*#__PURE__*/React__default['default'].createElement(MinusIcon, null)));
};

var css_248z$9 = ".fill-module_fill__s6n7N {\n  width: 240px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  box-sizing: border-box;\n  padding: 8px;\n  cursor: pointer; }\n  .fill-module_fill__s6n7N .fill-module_header__GMBXs {\n    display: flex; }\n    .fill-module_fill__s6n7N .fill-module_header__GMBXs button {\n      width: 24px;\n      height: 24px; }\n  .fill-module_fill__s6n7N .fill-module_fillItems__1yysb {\n    display: flex;\n    flex-direction: column;\n    width: 224px; }\n  .fill-module_fill__s6n7N.fill-module_white__2KTz0 {\n    background: #ffffff; }\n  .fill-module_fill__s6n7N.fill-module_gray__26J6h {\n    background: #f7f9fa; }\n  .fill-module_fill__s6n7N.fill-module_silver__39Gtg {\n    background: #f2f4f5; }\n  .fill-module_fill__s6n7N .fill-module_header__GMBXs {\n    width: 224px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between; }\n    .fill-module_fill__s6n7N .fill-module_header__GMBXs .fill-module_layerText__3Pa6k {\n      font-family: Aktiv Grotesk, sans-serif;\n      font-size: 12px;\n      line-height: 24px;\n      font-weight: 600;\n      display: flex;\n      align-items: center;\n      cursor: text; }\n      .fill-module_fill__s6n7N .fill-module_header__GMBXs .fill-module_layerText__3Pa6k.fill-module_purple__11PKi {\n        color: #b555e5; }\n      .fill-module_fill__s6n7N .fill-module_header__GMBXs .fill-module_layerText__3Pa6k.fill-module_black__gqKeu {\n        color: #31363a; }\n  .fill-module_fill__s6n7N .fill-module_layerBtnAction__Tu2kH {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    vertical-align: middle; }\n";
var style$8 = {"fill":"fill-module_fill__s6n7N","header":"fill-module_header__GMBXs","fillItems":"fill-module_fillItems__1yysb","white":"fill-module_white__2KTz0","gray":"fill-module_gray__26J6h","silver":"fill-module_silver__39Gtg","layerText":"fill-module_layerText__3Pa6k","purple":"fill-module_purple__11PKi","black":"fill-module_black__gqKeu","layerBtnAction":"fill-module_layerBtnAction__Tu2kH"};
styleInject(css_248z$9);

/* eslint-disable react-hooks/exhaustive-deps */
const Fill = ({
  type = 'white',
  textColor = 'black',
  options = [],
  onChange = () => {}
}) => {
  const {
    fill,
    layerBtnAction,
    layerText,
    header,
    fillItems
  } = style$8;
  const [optionsState, setOptionsState] = React$1.useState(options);

  const setValue = (data, index) => {
    onChange && onChange({
      index,
      color: data.color,
      opacity: data.value
    });
  };

  const addRow = () => {
    let row = {
      id: getUnique(),
      color: getRandomColor(),
      opacity: 100
    };
    setOptionsState([...optionsState, row]);
  };

  const removeRow = ({
    id
  }) => setOptionsState(optionsState.filter(item => item.id !== id));

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${fill} ${style$8[type]}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: header
  }, /*#__PURE__*/React__default['default'].createElement("label", {
    className: `${layerText} ${style$8[textColor]}`
  }, "Fill"), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${layerBtnAction}`,
    onClick: () => addRow()
  }, /*#__PURE__*/React__default['default'].createElement(IconButton, null, /*#__PURE__*/React__default['default'].createElement(PlusIcon, null)))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: fillItems
  }, optionsState.map((item, key) => /*#__PURE__*/React__default['default'].createElement(FillRow, {
    key: `${item.id}`,
    label: "%",
    row: item,
    onChange: _res => setValue(_res, key),
    removeRow: removeRow
  }))));
};

const Stroke1Icon = ({
  width = 8,
  height = 8
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 8 8`,
    fill: "transparent"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M8 .5H.5V8",
    stroke: "#999"
  }));
};
const Stroke2Icon = ({
  width = 8,
  height = 8
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 8 8`,
    fill: "transparent"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M8 .5H4.25L.5 4.25V8",
    stroke: "#999"
  }));
};
const Stroke3Icon = ({
  width = 8,
  height = 8
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 8 8`,
    fill: "transparent"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M8 .5H6.5c-3.3137 0-6 2.6863-6 6V8",
    stroke: "#999"
  }));
};

var css_248z$8 = ".stroke-row-module_strokeRow__SpWBF {\n  position: relative;\n  width: 224px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-radius: 4px;\n  margin: 8px 0;\n  cursor: pointer; }\n  .stroke-row-module_strokeRow__SpWBF * {\n    box-sizing: border-box;\n    font-family: Aktiv Grotesk, sans-serif;\n    user-select: none; }\n  .stroke-row-module_strokeRow__SpWBF .stroke-row-module_strokeInput1__3AjaJ {\n    width: 44px;\n    height: 32px;\n    justify-content: flex-end;\n    align-items: center; }\n    .stroke-row-module_strokeRow__SpWBF .stroke-row-module_strokeInput1__3AjaJ input {\n      width: 12px;\n      padding: 0;\n      font-size: 11px; }\n    .stroke-row-module_strokeRow__SpWBF .stroke-row-module_strokeInput1__3AjaJ label {\n      width: 24px;\n      height: 32px; }\n  .stroke-row-module_strokeRow__SpWBF .stroke-row-module_strokeInput2__2D5ze {\n    width: 52px;\n    height: 32px;\n    justify-content: flex-end;\n    align-items: center; }\n    .stroke-row-module_strokeRow__SpWBF .stroke-row-module_strokeInput2__2D5ze input {\n      width: 20px;\n      padding: 0;\n      font-size: 11px; }\n    .stroke-row-module_strokeRow__SpWBF .stroke-row-module_strokeInput2__2D5ze label {\n      width: 24px;\n      height: 32px; }\n  .stroke-row-module_strokeRow__SpWBF .stroke-row-module_btnRow__3o45S {\n    width: 24px;\n    height: 32px; }\n  .stroke-row-module_strokeRow__SpWBF .stroke-row-module_colorActionWrapper__33veL {\n    display: flex;\n    width: 92px;\n    height: 32px;\n    border: 1px solid #e8ebed;\n    box-sizing: border-box;\n    border-radius: 8px;\n    align-items: center;\n    justify-content: flex-start;\n    padding: 8px; }\n    .stroke-row-module_strokeRow__SpWBF .stroke-row-module_colorActionWrapper__33veL .stroke-row-module_colorPicker__33Cir {\n      width: 16px;\n      height: 16px;\n      border-radius: 50%; }\n    .stroke-row-module_strokeRow__SpWBF .stroke-row-module_colorActionWrapper__33veL input {\n      border: 0;\n      outline: none;\n      width: 58px;\n      height: 16px;\n      font-size: 11px;\n      line-height: 16px;\n      padding-left: 8px; }\n    .stroke-row-module_strokeRow__SpWBF .stroke-row-module_colorActionWrapper__33veL:hover {\n      border: 1px solid #3399ff; }\n    .stroke-row-module_strokeRow__SpWBF .stroke-row-module_colorActionWrapper__33veL:focus-within {\n      border: 1px solid #3399ff; }\n  .stroke-row-module_strokeRow__SpWBF .stroke-row-module_colorPickerModal__25b0p {\n    position: absolute;\n    top: 40px;\n    z-index: 1; }\n    .stroke-row-module_strokeRow__SpWBF .stroke-row-module_colorPickerModal__25b0p > div {\n      border: 0 !important;\n      border-radius: 8px !important;\n      background: #f7f9fa !important;\n      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.06), 0px 0.5px 1px rgba(0, 0, 0, 0.24) !important; }\n  .stroke-row-module_strokeRow__SpWBF.stroke-row-module_white__8e02Q {\n    background: #ffffff; }\n  .stroke-row-module_strokeRow__SpWBF.stroke-row-module_gray__1-1Ec {\n    background: #f7f9fa; }\n  .stroke-row-module_strokeRow__SpWBF.stroke-row-module_silver__2YY7i {\n    background: #f2f4f5; }\n  .stroke-row-module_strokeRow__SpWBF [type='text']:focus,\n  .stroke-row-module_strokeRow__SpWBF [type='password']:focus,\n  .stroke-row-module_strokeRow__SpWBF [type='number']:focus,\n  .stroke-row-module_strokeRow__SpWBF [type='email']:focus,\n  .stroke-row-module_strokeRow__SpWBF [type='search']:focus {\n    color: #333333; }\n";
var style$7 = {"strokeRow":"stroke-row-module_strokeRow__SpWBF","strokeInput1":"stroke-row-module_strokeInput1__3AjaJ","strokeInput2":"stroke-row-module_strokeInput2__2D5ze","btnRow":"stroke-row-module_btnRow__3o45S","colorActionWrapper":"stroke-row-module_colorActionWrapper__33veL","colorPicker":"stroke-row-module_colorPicker__33Cir","colorPickerModal":"stroke-row-module_colorPickerModal__25b0p","white":"stroke-row-module_white__8e02Q","gray":"stroke-row-module_gray__1-1Ec","silver":"stroke-row-module_silver__2YY7i"};
styleInject(css_248z$8);

/* eslint-disable react-hooks/exhaustive-deps */
const StrokeRow = ({
  type = 'white',
  row,
  onChange,
  removeRow = null
}) => {
  const {
    strokeRow,
    colorActionWrapper,
    colorPicker,
    colorPickerModal,
    strokeInput1,
    strokeInput2,
    btnRow
  } = style$7;
  const {
    color,
    input
  } = row;
  const [selectedColor, setSelectedColor] = React$1.useState(color);
  const [toggleColorPicker, setToggleColorPicker] = React$1.useState(false);
  const [inputS1, setInputS1] = React$1.useState(input[0].value);
  const [inputS2, setInputS2] = React$1.useState(input[1].value);
  React$1.useEffect(() => {
    onChange({
      color: selectedColor,
      s1: parseFloat(inputS1),
      s2: parseFloat(inputS2)
    });
  }, [selectedColor, inputS1, inputS2]); // close color picker by click outside.

  const colorPickerWrapper = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (colorPickerWrapper.current && !colorPickerWrapper.current.contains(e.target)) {
        setToggleColorPicker(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [colorPickerWrapper]);
  const colorPickerStyle = {
    backgroundColor: selectedColor
  };
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${strokeRow} ${style$7[type]}`
  }, toggleColorPicker && /*#__PURE__*/React__default['default'].createElement("div", {
    className: colorPickerModal,
    ref: colorPickerWrapper
  }, /*#__PURE__*/React__default['default'].createElement(reactColor.SketchPicker, {
    color: selectedColor,
    onChange: color => setSelectedColor(color.hex)
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: colorActionWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    onClick: () => setToggleColorPicker(!toggleColorPicker),
    className: colorPicker,
    style: colorPickerStyle
  }), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setSelectedColor,
    setValue: setSelectedColor,
    value: selectedColor,
    type: "string",
    size: "noStyle"
  })), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setInputS1,
    value: inputS1,
    setValue: setInputS1,
    dir: "right",
    label: input[0].label,
    className: strokeInput1
  }), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setInputS2,
    value: inputS2,
    setValue: setInputS2,
    dir: "right",
    label: input[1].label,
    className: strokeInput2
  }), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    onClick: () => removeRow(row),
    className: btnRow
  }, /*#__PURE__*/React__default['default'].createElement(MinusIcon, null)));
};

var css_248z$7 = ".stroke-module_stroke__3xznE {\n  width: 240px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 0;\n  cursor: pointer; }\n  .stroke-module_stroke__3xznE .stroke-module_header__PmbN- {\n    display: flex; }\n    .stroke-module_stroke__3xznE .stroke-module_header__PmbN- button {\n      width: 24px;\n      height: 24px; }\n  .stroke-module_stroke__3xznE .stroke-module_strokeItems__18zIM {\n    display: flex;\n    flex-direction: column; }\n  .stroke-module_stroke__3xznE.stroke-module_white__1EwvI {\n    background: #ffffff; }\n  .stroke-module_stroke__3xznE.stroke-module_gray__1yxJA {\n    background: #f7f9fa; }\n  .stroke-module_stroke__3xznE.stroke-module_silver__3Jf5m {\n    background: #f2f4f5; }\n  .stroke-module_stroke__3xznE .stroke-module_moreMenu__2r2_q {\n    width: 200px;\n    min-height: 104px;\n    padding: 4px;\n    border-radius: 8px;\n    box-shadow: 0px 2px 4px rgba(51, 51, 51, 0.12), 0px 0px 1px #999999, 0px 12px 24px -8px rgba(51, 51, 51, 0.08);\n    position: fixed;\n    background-color: #ffffff;\n    right: 240px; }\n    .stroke-module_stroke__3xznE .stroke-module_moreMenu__2r2_q .stroke-module_moreHeader__T0nk1 {\n      width: 192px;\n      height: 32px;\n      border-bottom: 1px solid #f5f5f5;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      font-size: 11px;\n      font-weight: 600;\n      padding: 4px; }\n    .stroke-module_stroke__3xznE .stroke-module_moreMenu__2r2_q .stroke-module_moreBody__2c1Os {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      border-radius: 8px;\n      flex-direction: column;\n      padding-top: 4px; }\n      .stroke-module_stroke__3xznE .stroke-module_moreMenu__2r2_q .stroke-module_moreBody__2c1Os .stroke-module_morMenuBodyRow__3SjdX {\n        width: 184px;\n        height: 32px;\n        display: flex;\n        justify-content: space-between;\n        align-items: center; }\n        .stroke-module_stroke__3xznE .stroke-module_moreMenu__2r2_q .stroke-module_moreBody__2c1Os .stroke-module_morMenuBodyRow__3SjdX label {\n          color: #999999;\n          font-size: 11px;\n          font-weight: 600; }\n        .stroke-module_stroke__3xznE .stroke-module_moreMenu__2r2_q .stroke-module_moreBody__2c1Os .stroke-module_morMenuBodyRow__3SjdX .stroke-module_morItemRadioButton__2-DkR {\n          height: 24px; }\n          .stroke-module_stroke__3xznE .stroke-module_moreMenu__2r2_q .stroke-module_moreBody__2c1Os .stroke-module_morMenuBodyRow__3SjdX .stroke-module_morItemRadioButton__2-DkR button {\n            background-color: transparent;\n            border-radius: 8px;\n            border: 0 !important; }\n            .stroke-module_stroke__3xznE .stroke-module_moreMenu__2r2_q .stroke-module_moreBody__2c1Os .stroke-module_morMenuBodyRow__3SjdX .stroke-module_morItemRadioButton__2-DkR button:hover, .stroke-module_stroke__3xznE .stroke-module_moreMenu__2r2_q .stroke-module_moreBody__2c1Os .stroke-module_morMenuBodyRow__3SjdX .stroke-module_morItemRadioButton__2-DkR button.stroke-module_active__TzwdW {\n              background-color: #ebebeb !important; }\n        .stroke-module_stroke__3xznE .stroke-module_moreMenu__2r2_q .stroke-module_moreBody__2c1Os .stroke-module_morMenuBodyRow__3SjdX .stroke-module_option__1JTwD {\n          width: 90px;\n          height: 24px; }\n        .stroke-module_stroke__3xznE .stroke-module_moreMenu__2r2_q .stroke-module_moreBody__2c1Os .stroke-module_morMenuBodyRow__3SjdX .stroke-module_input__oxlkz {\n          width: 90px;\n          height: 24px;\n          justify-content: flex-end; }\n          .stroke-module_stroke__3xznE .stroke-module_moreMenu__2r2_q .stroke-module_moreBody__2c1Os .stroke-module_morMenuBodyRow__3SjdX .stroke-module_input__oxlkz input {\n            width: calc(100% - 32px);\n            padding: 0; }\n  .stroke-module_stroke__3xznE .stroke-module_header__PmbN- {\n    width: 224px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between; }\n    .stroke-module_stroke__3xznE .stroke-module_header__PmbN- .stroke-module_layerText__atHEa {\n      width: 188px;\n      font-family: Aktiv Grotesk, sans-serif;\n      font-size: 12px;\n      line-height: 24px;\n      font-weight: 600;\n      display: flex;\n      align-items: center;\n      cursor: text; }\n      .stroke-module_stroke__3xznE .stroke-module_header__PmbN- .stroke-module_layerText__atHEa.stroke-module_purple__11RP4 {\n        color: #b555e5; }\n      .stroke-module_stroke__3xznE .stroke-module_header__PmbN- .stroke-module_layerText__atHEa.stroke-module_black__2Y9xL {\n        color: #31363a; }\n  .stroke-module_stroke__3xznE .stroke-module_layerBtnAction__3nbXe {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    vertical-align: middle; }\n";
var style$6 = {"stroke":"stroke-module_stroke__3xznE","header":"stroke-module_header__PmbN-","strokeItems":"stroke-module_strokeItems__18zIM","white":"stroke-module_white__1EwvI","gray":"stroke-module_gray__1yxJA","silver":"stroke-module_silver__3Jf5m","moreMenu":"stroke-module_moreMenu__2r2_q","moreHeader":"stroke-module_moreHeader__T0nk1","moreBody":"stroke-module_moreBody__2c1Os","morMenuBodyRow":"stroke-module_morMenuBodyRow__3SjdX","morItemRadioButton":"stroke-module_morItemRadioButton__2-DkR","active":"stroke-module_active__TzwdW","option":"stroke-module_option__1JTwD","input":"stroke-module_input__oxlkz","layerText":"stroke-module_layerText__atHEa","purple":"stroke-module_purple__11RP4","black":"stroke-module_black__2Y9xL","layerBtnAction":"stroke-module_layerBtnAction__3nbXe"};
styleInject(css_248z$7);

/* eslint-disable react-hooks/exhaustive-deps */
const _cap = [{
  name: 'none',
  value: 'none'
}, {
  name: 'select',
  value: 'select'
}, {
  name: 'select2',
  value: 'select2'
}];
const _trim = [{
  name: 'none',
  value: 'none'
}, {
  name: 'trim1',
  value: 'trim1'
}, {
  name: 'trim2',
  value: 'trim2'
}];
const _cases = [{
  id: getUnique(),
  name: 'Stroke1Icon',
  icon: /*#__PURE__*/React__default['default'].createElement(Stroke1Icon, {
    width: 10
  })
}, {
  id: getUnique(),
  name: 'Stroke2Icon',
  icon: /*#__PURE__*/React__default['default'].createElement(Stroke2Icon, {
    width: 10
  })
}, {
  id: getUnique(),
  name: 'Stroke3Icon',
  icon: /*#__PURE__*/React__default['default'].createElement(Stroke3Icon, {
    width: 10
  })
}];
const Stroke = ({
  type = 'white',
  textColor = 'black',
  strokes = [],
  capOptionValues = _cap,
  caseOptionValues = _cases,
  trimOptionValues = _trim,
  start = 0,
  end = 100,
  offset = 0,
  onChange = () => {}
}) => {
  const {
    stroke,
    strokeItems,
    layerBtnAction,
    layerText,
    header,
    moreMenu,
    moreHeader,
    moreBody,
    morMenuBodyRow,
    morItemRadioButton,
    option,
    input
  } = style$6;
  const [strokesState, setStrokeState] = React$1.useState(strokes);
  const [toggleMoreItems, setToggleMoreItems] = React$1.useState(false);
  const [capOption] = React$1.useState(capOptionValues);
  const [capOptionSelected, setCapOptionSelected] = React$1.useState({});
  const [trimOption] = React$1.useState(trimOptionValues);
  const [trimOptionSelected, setTrimOptionSelected] = React$1.useState({});
  const [caseOption] = React$1.useState(caseOptionValues);
  const [caseSelected, setCaseSelected] = React$1.useState();
  const [startS, setStart] = React$1.useState(start);
  const [endS, setEnd] = React$1.useState(end);
  const [offsetS, setOffset] = React$1.useState(offset);

  const setValue = (data, index) => {
    onChange({
      index,
      data
    });
  };

  React$1.useEffect(() => {
    onChange({
      cap: 'value' in capOptionSelected ? capOptionSelected.value : null,
      case: caseSelected,
      trim: 'value' in capOptionSelected ? trimOptionSelected.value : null,
      start: startS,
      end: endS,
      offset: offsetS
    });
  }, [capOptionSelected, trimOptionSelected, caseSelected, startS, endS, offsetS]);

  const addRow = () => {
    let row = {
      id: getUnique(),
      color: getRandomColor(),
      input: [{
        label: 'px',
        value: 10
      }, {
        label: '%',
        value: 100
      }]
    };
    setStrokeState([...strokesState, row]);
  };

  const removeRow = ({
    id
  }) => setStrokeState(strokesState.filter(item => item.id !== id)); // close menu by click outside.


  const moreMenuRef = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setToggleMoreItems(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [moreMenuRef]); // more menu

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${stroke} ${style$6[type]}`,
    ref: moreMenuRef
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: header
  }, /*#__PURE__*/React__default['default'].createElement("label", {
    className: `${layerText} ${style$6[textColor]}`
  }, "Stroke"), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${layerBtnAction}`
  }, /*#__PURE__*/React__default['default'].createElement(IconButton, {
    onClick: () => setToggleMoreItems(!toggleMoreItems)
  }, /*#__PURE__*/React__default['default'].createElement(TreeDots, null)), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    onClick: () => addRow()
  }, /*#__PURE__*/React__default['default'].createElement(PlusIcon, null)))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: strokeItems
  }, strokesState.map((item, key) => /*#__PURE__*/React__default['default'].createElement(StrokeRow, {
    key: `${item.id}`,
    row: item,
    onChange: _res => setValue(_res, key),
    removeRow: removeRow
  }))), toggleMoreItems && /*#__PURE__*/React__default['default'].createElement("div", {
    className: moreMenu
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: moreHeader
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Text Option"), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    size: "small",
    onClick: () => setToggleMoreItems(!toggleMoreItems)
  }, /*#__PURE__*/React__default['default'].createElement(CrossIcon, null))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: moreBody
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Cap"), /*#__PURE__*/React__default['default'].createElement(Dropdown, {
    option: capOption,
    onChange: setCapOptionSelected,
    size: "medium",
    className: option,
    popupMenu: "left"
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Case"), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement(RadioButton, {
    className: morItemRadioButton,
    row: caseOption,
    onChange: setCaseSelected
  }))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Trim Path"), /*#__PURE__*/React__default['default'].createElement(Dropdown, {
    option: trimOption,
    onChange: setTrimOptionSelected,
    size: "medium",
    className: option,
    popupMenu: "left"
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Start"), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setStart,
    value: startS,
    setValue: setStart,
    dir: "right",
    label: "%",
    className: input
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "End"), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setEnd,
    value: endS,
    setValue: setEnd,
    dir: "right",
    label: "%",
    className: input
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Offset"), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setOffset,
    value: offsetS,
    setValue: setOffset,
    dir: "right",
    label: "%",
    className: input
  })))));
};

var css_248z$6 = ".text-background-row-module_textBackgroundRow__3hkTZ {\n  position: relative;\n  width: 224px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-radius: 4px;\n  margin: 8px 0;\n  cursor: pointer; }\n  .text-background-row-module_textBackgroundRow__3hkTZ * {\n    box-sizing: border-box;\n    font-family: Aktiv Grotesk, sans-serif;\n    user-select: none; }\n  .text-background-row-module_textBackgroundRow__3hkTZ .text-background-row-module_colorActionWrapper__3bj1g {\n    display: flex;\n    width: 104px;\n    height: 32px;\n    border: 1px solid #e8ebed;\n    border-radius: 8px;\n    align-items: center;\n    padding: 8px; }\n    .text-background-row-module_textBackgroundRow__3hkTZ .text-background-row-module_colorActionWrapper__3bj1g:hover {\n      border: 1px solid #3399ff; }\n    .text-background-row-module_textBackgroundRow__3hkTZ .text-background-row-module_colorActionWrapper__3bj1g:focus-within {\n      border: 1px solid #3399ff; }\n    .text-background-row-module_textBackgroundRow__3hkTZ .text-background-row-module_colorActionWrapper__3bj1g input {\n      font-size: 11px;\n      border: 0;\n      outline: none;\n      width: 64px;\n      padding-left: 8px; }\n    .text-background-row-module_textBackgroundRow__3hkTZ .text-background-row-module_colorActionWrapper__3bj1g .text-background-row-module_colorPicker__1Wg78 {\n      width: 16px;\n      height: 16px;\n      border-radius: 50%; }\n  .text-background-row-module_textBackgroundRow__3hkTZ.text-background-row-module_active__2t_91 {\n    border: 1px solid #3399ff; }\n  .text-background-row-module_textBackgroundRow__3hkTZ .text-background-row-module_fillText__3ei9u {\n    width: 52px;\n    height: 32px;\n    justify-content: flex-end; }\n    .text-background-row-module_textBackgroundRow__3hkTZ .text-background-row-module_fillText__3ei9u input {\n      width: 20px;\n      padding: 0;\n      line-height: 16px;\n      font-size: 11px; }\n  .text-background-row-module_textBackgroundRow__3hkTZ .text-background-row-module_btnRow__zbHCb {\n    width: 24px;\n    height: 32px; }\n  .text-background-row-module_textBackgroundRow__3hkTZ .text-background-row-module_colorPickerModal__1uVoC {\n    position: fixed;\n    right: 240px;\n    z-index: 1; }\n    .text-background-row-module_textBackgroundRow__3hkTZ .text-background-row-module_colorPickerModal__1uVoC > div {\n      border: 0 !important;\n      border-radius: 8px !important;\n      background: #f7f9fa !important;\n      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.06), 0px 0.5px 1px rgba(0, 0, 0, 0.24) !important; }\n  .text-background-row-module_textBackgroundRow__3hkTZ.text-background-row-module_white__3ibiC {\n    background: #ffffff; }\n  .text-background-row-module_textBackgroundRow__3hkTZ.text-background-row-module_gray__9X32U {\n    background: #f7f9fa; }\n  .text-background-row-module_textBackgroundRow__3hkTZ.text-background-row-module_silver__IwsjR {\n    background: #f2f4f5; }\n  .text-background-row-module_textBackgroundRow__3hkTZ .text-background-row-module_layerText__2TVUb {\n    font-size: 12px;\n    line-height: 24px;\n    font-weight: 600;\n    display: flex;\n    align-items: center;\n    margin: 0px 8px;\n    width: 188px;\n    height: 24px;\n    cursor: text; }\n    .text-background-row-module_textBackgroundRow__3hkTZ .text-background-row-module_layerText__2TVUb.text-background-row-module_purple__1ZPPU {\n      color: #b555e5; }\n    .text-background-row-module_textBackgroundRow__3hkTZ .text-background-row-module_layerText__2TVUb.text-background-row-module_black__3v6xh {\n      color: #31363a; }\n  .text-background-row-module_textBackgroundRow__3hkTZ [type='text']:focus,\n  .text-background-row-module_textBackgroundRow__3hkTZ [type='password']:focus,\n  .text-background-row-module_textBackgroundRow__3hkTZ [type='number']:focus,\n  .text-background-row-module_textBackgroundRow__3hkTZ [type='email']:focus,\n  .text-background-row-module_textBackgroundRow__3hkTZ [type='search']:focus {\n    color: #333333; }\n";
var style$5 = {"textBackgroundRow":"text-background-row-module_textBackgroundRow__3hkTZ","colorActionWrapper":"text-background-row-module_colorActionWrapper__3bj1g","colorPicker":"text-background-row-module_colorPicker__1Wg78","active":"text-background-row-module_active__2t_91","fillText":"text-background-row-module_fillText__3ei9u","btnRow":"text-background-row-module_btnRow__zbHCb","colorPickerModal":"text-background-row-module_colorPickerModal__1uVoC","white":"text-background-row-module_white__3ibiC","gray":"text-background-row-module_gray__9X32U","silver":"text-background-row-module_silver__IwsjR","layerText":"text-background-row-module_layerText__2TVUb","purple":"text-background-row-module_purple__1ZPPU","black":"text-background-row-module_black__3v6xh"};
styleInject(css_248z$6);

/* eslint-disable react-hooks/exhaustive-deps */
const TextBackgroundRow = ({
  type = 'white',
  row,
  onChange = () => {},
  removeRow = () => {}
}) => {
  const {
    textBackgroundRow,
    colorActionWrapper,
    colorPicker,
    colorPickerModal,
    fillText,
    btnRow
  } = style$5;
  const {
    color,
    opacity = 100
  } = row;
  const [selectedColor, setSelectedColor] = React$1.useState(color);
  const [selectedOpacity, setSelectedOpacity] = React$1.useState(opacity);
  const [toggleColorPicker, setToggleColorPicker] = React$1.useState(false);
  const [colorPickerStyle, setColorPickerStyle] = React$1.useState({
    backgroundColor: selectedColor,
    opacity: selectedOpacity / 100
  });
  React$1.useEffect(() => {
    onChange({
      color: selectedColor,
      value: parseFloat(selectedOpacity)
    });
    setColorPickerStyle({
      backgroundColor: selectedColor,
      opacity: selectedOpacity / 100
    });
  }, [selectedColor, selectedOpacity]); // close color picker by click outside.

  const colorPickerWrapper = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (colorPickerWrapper.current && !colorPickerWrapper.current.contains(e.target)) {
        setToggleColorPicker(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [colorPickerWrapper]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${textBackgroundRow} ${style$5[type]}`
  }, toggleColorPicker && /*#__PURE__*/React__default['default'].createElement("div", {
    className: colorPickerModal,
    ref: colorPickerWrapper
  }, /*#__PURE__*/React__default['default'].createElement(reactColor.SketchPicker, {
    color: selectedColor,
    onChange: color => setSelectedColor(color.hex)
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: colorActionWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    onClick: () => setToggleColorPicker(!toggleColorPicker),
    className: colorPicker,
    style: colorPickerStyle
  }), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setSelectedColor,
    setValue: setSelectedColor,
    value: selectedColor,
    type: "string",
    size: "noStyle"
  })), /*#__PURE__*/React__default['default'].createElement(IconButton, null, /*#__PURE__*/React__default['default'].createElement(BlendHoverIcon, null)), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChangeValue: setSelectedOpacity,
    value: selectedOpacity,
    setValue: setSelectedOpacity,
    dir: "right",
    label: "%",
    className: fillText
  }), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    className: btnRow,
    onClick: () => removeRow(row)
  }, /*#__PURE__*/React__default['default'].createElement(MinusIcon, null)));
};

var css_248z$5 = ".text-background-module_fill__27w5d {\n  width: 240px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  box-sizing: border-box;\n  padding: 8px;\n  cursor: pointer; }\n  .text-background-module_fill__27w5d .text-background-module_header__2T8Aw {\n    display: flex; }\n    .text-background-module_fill__27w5d .text-background-module_header__2T8Aw button {\n      width: 24px;\n      height: 24px; }\n  .text-background-module_fill__27w5d .text-background-module_fillItems__RB0x4 {\n    display: flex;\n    flex-direction: column;\n    width: 224px; }\n  .text-background-module_fill__27w5d.text-background-module_white__1zeD1 {\n    background: #ffffff; }\n  .text-background-module_fill__27w5d.text-background-module_gray__HehSe {\n    background: #f7f9fa; }\n  .text-background-module_fill__27w5d.text-background-module_silver__2A-zz {\n    background: #f2f4f5; }\n  .text-background-module_fill__27w5d .text-background-module_header__2T8Aw {\n    width: 224px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between; }\n    .text-background-module_fill__27w5d .text-background-module_header__2T8Aw .text-background-module_layerText__36qv- {\n      font-family: Aktiv Grotesk, sans-serif;\n      font-size: 12px;\n      line-height: 24px;\n      font-weight: 600;\n      display: flex;\n      align-items: center;\n      cursor: text; }\n      .text-background-module_fill__27w5d .text-background-module_header__2T8Aw .text-background-module_layerText__36qv-.text-background-module_purple__2tWos {\n        color: #b555e5; }\n      .text-background-module_fill__27w5d .text-background-module_header__2T8Aw .text-background-module_layerText__36qv-.text-background-module_black__3UNAP {\n        color: #31363a; }\n  .text-background-module_fill__27w5d .text-background-module_layerBtnAction__shJOe {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    vertical-align: middle; }\n";
var style$4 = {"fill":"text-background-module_fill__27w5d","header":"text-background-module_header__2T8Aw","fillItems":"text-background-module_fillItems__RB0x4","white":"text-background-module_white__1zeD1","gray":"text-background-module_gray__HehSe","silver":"text-background-module_silver__2A-zz","layerText":"text-background-module_layerText__36qv-","purple":"text-background-module_purple__2tWos","black":"text-background-module_black__3UNAP","layerBtnAction":"text-background-module_layerBtnAction__shJOe"};
styleInject(css_248z$5);

/* eslint-disable react-hooks/exhaustive-deps */
const TextBackground = ({
  title = 'Text Background',
  type = 'white',
  textColor = 'black',
  options = [],
  onChange = () => {}
}) => {
  const {
    fill,
    layerBtnAction,
    layerText,
    header,
    fillItems
  } = style$4;
  const [optionsState, setOptionsState] = React$1.useState(options);
  const [titleS] = React$1.useState(title);

  const setValue = (data, index) => {
    onChange({
      index,
      data
    });
  };

  const addRow = () => {
    let row = {
      id: getUnique(),
      color: getRandomColor(),
      opacity: 100
    };
    setOptionsState([...optionsState, row]);
  };

  const removeRow = ({
    id
  }) => setOptionsState(optionsState.filter(item => item.id !== id));

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${fill} ${style$4[type]}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: header
  }, /*#__PURE__*/React__default['default'].createElement("label", {
    className: `${layerText} ${style$4[textColor]}`
  }, titleS), /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${layerBtnAction}`,
    onClick: () => addRow()
  }, /*#__PURE__*/React__default['default'].createElement(IconButton, null, /*#__PURE__*/React__default['default'].createElement(PlusIcon, null)))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: fillItems
  }, optionsState.map((item, key) => /*#__PURE__*/React__default['default'].createElement(TextBackgroundRow, {
    key: `${item.id}`,
    label: "%",
    row: item,
    onChange: _res => setValue(_res, key),
    removeRow: removeRow
  }))));
};

var css_248z$4 = ".color-picker-module_colorPickerWrapper__3P_kF {\n  position: relative;\n  width: 224px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-radius: 4px;\n  margin: 8px 0;\n  cursor: pointer; }\n  .color-picker-module_colorPickerWrapper__3P_kF * {\n    box-sizing: border-box;\n    font-family: Aktiv Grotesk, sans-serif;\n    user-select: none; }\n  .color-picker-module_colorPickerWrapper__3P_kF .color-picker-module_colorActionWrapper__31kSX {\n    display: flex;\n    width: 88px;\n    height: 24px;\n    border: 1px solid #ebebeb;\n    background-color: #ebebeb;\n    padding: 4px;\n    border-radius: 8px;\n    align-items: center;\n    box-sizing: border-box;\n    justify-content: space-between; }\n    .color-picker-module_colorPickerWrapper__3P_kF .color-picker-module_colorActionWrapper__31kSX:hover {\n      border: 1px solid #b6babd; }\n    .color-picker-module_colorPickerWrapper__3P_kF .color-picker-module_colorActionWrapper__31kSX:focus-within {\n      border: 1px solid #3399ff; }\n    .color-picker-module_colorPickerWrapper__3P_kF .color-picker-module_colorActionWrapper__31kSX input {\n      font-size: 11px;\n      border: 0;\n      outline: none;\n      width: 54px; }\n    .color-picker-module_colorPickerWrapper__3P_kF .color-picker-module_colorActionWrapper__31kSX .color-picker-module_colorPicker__2HbFF {\n      width: 16px;\n      height: 16px;\n      border-radius: 50%; }\n  .color-picker-module_colorPickerWrapper__3P_kF.color-picker-module_active__3ZwGl {\n    border: 1px solid #3399ff; }\n  .color-picker-module_colorPickerWrapper__3P_kF .color-picker-module_fillText__oihp8 {\n    width: 52px;\n    height: 24px;\n    justify-content: flex-end; }\n    .color-picker-module_colorPickerWrapper__3P_kF .color-picker-module_fillText__oihp8 input {\n      width: 20px;\n      padding: 0;\n      line-height: 16px;\n      font-size: 11px; }\n  .color-picker-module_colorPickerWrapper__3P_kF .color-picker-module_btnRow__211CU {\n    width: 24px;\n    height: 32px; }\n  .color-picker-module_colorPickerWrapper__3P_kF .color-picker-module_colorPickerModal__3JI8z {\n    position: fixed;\n    right: 240px;\n    z-index: 1; }\n    .color-picker-module_colorPickerWrapper__3P_kF .color-picker-module_colorPickerModal__3JI8z > div {\n      border: 0 !important;\n      border-radius: 8px !important;\n      background: #f7f9fa !important;\n      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.06), 0px 0.5px 1px rgba(0, 0, 0, 0.24) !important; }\n  .color-picker-module_colorPickerWrapper__3P_kF [type='text']:focus,\n  .color-picker-module_colorPickerWrapper__3P_kF [type='password']:focus,\n  .color-picker-module_colorPickerWrapper__3P_kF [type='number']:focus,\n  .color-picker-module_colorPickerWrapper__3P_kF [type='email']:focus,\n  .color-picker-module_colorPickerWrapper__3P_kF [type='search']:focus {\n    color: #333333; }\n";
var style$3 = {"colorPickerWrapper":"color-picker-module_colorPickerWrapper__3P_kF","colorActionWrapper":"color-picker-module_colorActionWrapper__31kSX","colorPicker":"color-picker-module_colorPicker__2HbFF","active":"color-picker-module_active__3ZwGl","fillText":"color-picker-module_fillText__oihp8","btnRow":"color-picker-module_btnRow__211CU","colorPickerModal":"color-picker-module_colorPickerModal__3JI8z"};
styleInject(css_248z$4);

/* eslint-disable react-hooks/exhaustive-deps */
const ColorPicker = ({
  row,
  onChange
}) => {
  const {
    colorPickerWrapper,
    colorActionWrapper,
    colorPicker,
    colorPickerModal,
    fillText
  } = style$3;
  const {
    color = 'black',
    opacity = 100
  } = row;
  const [selectedColor, setSelectedColor] = React$1.useState(color);
  const [selectedOpacity, setSelectedOpacity] = React$1.useState(opacity);
  const [toggleColorPicker, setToggleColorPicker] = React$1.useState(false);
  const [colorPickerStyle, setColorPickerStyle] = React$1.useState({
    backgroundColor: selectedColor,
    opacity: selectedOpacity / 100
  });
  React$1.useEffect(() => {
    onChange({
      color: selectedColor,
      value: parseFloat(selectedOpacity)
    });
  }, [selectedColor, selectedOpacity]);
  React$1.useEffect(() => {
    setSelectedColor(color);
    setSelectedOpacity(opacity);
    setColorPickerStyle({
      backgroundColor: selectedColor,
      opacity: selectedOpacity / 100
    });
  }, [row]); // close color picker by click outside.

  const colorPickerWrapperRef = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (colorPickerWrapperRef.current && !colorPickerWrapperRef.current.contains(e.target)) {
        setToggleColorPicker(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [colorPickerWrapperRef]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${colorPickerWrapper}`
  }, toggleColorPicker && /*#__PURE__*/React__default['default'].createElement("div", {
    className: colorPickerModal,
    ref: colorPickerWrapperRef
  }, /*#__PURE__*/React__default['default'].createElement(reactColor.SketchPicker, {
    color: selectedColor,
    onChange: color => setSelectedColor(color.hex)
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: colorActionWrapper
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    onClick: () => setToggleColorPicker(!toggleColorPicker),
    className: colorPicker,
    style: colorPickerStyle
  }), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setSelectedColor,
    setValue: setSelectedColor,
    value: selectedColor,
    type: "string",
    size: "noStyle"
  })), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setSelectedOpacity,
    value: selectedOpacity,
    setValue: setSelectedOpacity,
    dir: "right",
    label: "%",
    className: fillText
  }));
};

var css_248z$3 = ".switch-module_switchWrapper__2E1Ui {\n  width: 28px;\n  height: 16px;\n  background: #ebebeb;\n  border-radius: 12px;\n  position: relative; }\n  .switch-module_switchWrapper__2E1Ui * {\n    box-sizing: border-box; }\n  .switch-module_switchWrapper__2E1Ui.switch-module_unchecked__9INjE .switch-module_circleSwitch__2QxBy {\n    animation: switch-module_slideLeft__3MrmJ 0.2s both; }\n  .switch-module_switchWrapper__2E1Ui.switch-module_isChecked__3OWbm {\n    animation: switch-module_colorChange__2zbDx 0.2s linear both; }\n    .switch-module_switchWrapper__2E1Ui.switch-module_isChecked__3OWbm .switch-module_circleSwitch__2QxBy {\n      animation: switch-module_slideRight__35kYT 0.2s both; }\n  .switch-module_switchWrapper__2E1Ui .switch-module_circleSwitch__2QxBy {\n    position: absolute;\n    width: 14px;\n    height: 14px;\n    top: 1px;\n    background: #ffffff;\n    box-shadow: 0px 0px 1px rgba(51, 51, 51, 0.5);\n    border-radius: 9px; }\n\n@keyframes switch-module_slideRight__35kYT {\n  0% {\n    transform: translateX(1); }\n  100% {\n    transform: translateX(13px); } }\n\n@keyframes switch-module_slideLeft__3MrmJ {\n  0% {\n    transform: translateX(13px); }\n  100% {\n    transform: translateX(1px); } }\n\n@keyframes switch-module_colorChange__2zbDx {\n  0% {\n    background: #ebebeb; }\n  100% {\n    background: #3399ff; } }\n\n@keyframes switch-module_colorChangeReverse__XidUM {\n  0% {\n    background: #3399ff; }\n  100% {\n    background: #ebebeb; } }\n";
var styles = {"switchWrapper":"switch-module_switchWrapper__2E1Ui","unchecked":"switch-module_unchecked__9INjE","circleSwitch":"switch-module_circleSwitch__2QxBy","slideLeft":"switch-module_slideLeft__3MrmJ","isChecked":"switch-module_isChecked__3OWbm","colorChange":"switch-module_colorChange__2zbDx","slideRight":"switch-module_slideRight__35kYT","colorChangeReverse":"switch-module_colorChangeReverse__XidUM"};
styleInject(css_248z$3);

const IosSwitch = ({
  setChecked,
  style,
  className,
  checked,
  disabled
}) => {
  const {
    switchWrapper,
    circleSwitch,
    isChecked,
    unchecked
  } = styles;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${switchWrapper} ${checked ? isChecked : unchecked}`,
    onClick: () => setChecked(!checked)
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${circleSwitch}`
  }));
};

var css_248z$2 = ".fx-menu-module_fxMenu__1ZkG5 {\n  position: fixed;\n  top: 50px;\n  width: 300px;\n  height: 192px;\n  right: 242px;\n  background: #ffffff;\n  box-shadow: 0px 2px 4px rgba(51, 51, 51, 0.12), 0px 0px 1px #999999, 0px 12px 24px -8px rgba(51, 51, 51, 0.08);\n  border-radius: 8px; }\n  .fx-menu-module_fxMenu__1ZkG5 * {\n    box-sizing: border-box;\n    font-family: Aktiv Grotesk, sans-serif;\n    user-select: none; }\n  .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_header__1_Rts {\n    font-size: 11px;\n    width: 292px;\n    height: 32px;\n    border-bottom: 1px solid #f5f5f5;\n    display: flex;\n    align-items: center;\n    justify-content: space-between; }\n    .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_header__1_Rts label {\n      font-weight: 600;\n      font-size: 11px;\n      line-height: 16px;\n      display: flex;\n      align-items: center;\n      text-align: center;\n      color: #333333; }\n    .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_header__1_Rts .fx-menu-module_resetBtn__17z7k {\n      border: 0;\n      background-color: transparent;\n      color: #3399ff;\n      cursor: pointer; }\n  .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 {\n    justify-content: center;\n    align-items: center;\n    display: flex;\n    overflow: hidden; }\n    .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_left__2iYbK {\n      width: 140px;\n      height: 160px;\n      display: flex;\n      flex-direction: column;\n      border-right: 1px solid #f5f5f5;\n      justify-content: space-between;\n      align-items: center;\n      padding-bottom: 4px; }\n      .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_left__2iYbK .fx-menu-module_row__3k6rq {\n        width: 132px;\n        font-size: 11px;\n        line-height: 16px;\n        display: flex;\n        align-items: center;\n        color: #333333; }\n        .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_left__2iYbK .fx-menu-module_row__3k6rq.fx-menu-module_presets__20GPf {\n          border-bottom: 1px solid #f5f5f5; }\n        .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_left__2iYbK .fx-menu-module_row__3k6rq .fx-menu-module_rowItem__2AF_i {\n          display: flex;\n          height: 24px;\n          align-items: center;\n          justify-content: space-between;\n          padding: 0 8px;\n          width: 100%; }\n          .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_left__2iYbK .fx-menu-module_row__3k6rq .fx-menu-module_rowItem__2AF_i * {\n            cursor: pointer; }\n          .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_left__2iYbK .fx-menu-module_row__3k6rq .fx-menu-module_rowItem__2AF_i svg {\n            stroke: #333333; }\n          .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_left__2iYbK .fx-menu-module_row__3k6rq .fx-menu-module_rowItem__2AF_i:hover {\n            background: #f5f5f5;\n            border-radius: 4px; }\n    .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT {\n      width: 160px;\n      height: 160px;\n      padding: 4px; }\n      .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_presents__3gjeJ {\n        display: flex;\n        flex-wrap: wrap;\n        align-items: center;\n        justify-content: center; }\n        .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_presents__3gjeJ * {\n          cursor: pointer; }\n        .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_presents__3gjeJ .fx-menu-module_column__3WqPp {\n          width: 74px;\n          height: 94px;\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          justify-content: space-around;\n          padding-top: 1px; }\n          .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_presents__3gjeJ .fx-menu-module_column__3WqPp.fx-menu-module_active__1dUB1, .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_presents__3gjeJ .fx-menu-module_column__3WqPp:hover {\n            background: #ebebeb;\n            border-radius: 8px; }\n            .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_presents__3gjeJ .fx-menu-module_column__3WqPp.fx-menu-module_active__1dUB1 label, .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_presents__3gjeJ .fx-menu-module_column__3WqPp:hover label {\n              color: #333333; }\n          .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_presents__3gjeJ .fx-menu-module_column__3WqPp .fx-menu-module_imageBox__3vL2V {\n            width: 66px;\n            height: 66px;\n            border-radius: 4px;\n            background-position: center;\n            background-size: cover;\n            background-repeat: no-repeat; }\n          .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_presents__3gjeJ .fx-menu-module_column__3WqPp label {\n            font-size: 11px;\n            line-height: 16px;\n            font-weight: 600;\n            color: #999999; }\n      .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_OtherFilter__JNpSr {\n        padding-left: 4px; }\n        .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_OtherFilter__JNpSr .fx-menu-module_filterName__Iu_2A {\n          display: flex;\n          font-size: 11px;\n          text-transform: capitalize;\n          color: #333333;\n          margin: 8px 0; }\n        .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_OtherFilter__JNpSr .fx-menu-module_amountBody___0vYS {\n          display: flex;\n          align-items: center;\n          justify-content: space-between;\n          height: 24px; }\n          .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_OtherFilter__JNpSr .fx-menu-module_amountBody___0vYS * {\n            font-size: 11px;\n            color: #999999; }\n          .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_OtherFilter__JNpSr .fx-menu-module_amountBody___0vYS .fx-menu-module_amountInput__28C7V {\n            height: 24px; }\n      .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_dropShadow__3ONx3 {\n        padding-left: 4px; }\n        .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_dropShadow__3ONx3 .fx-menu-module_filterName__Iu_2A {\n          display: flex;\n          font-size: 11px;\n          text-transform: capitalize;\n          color: #333333;\n          margin: 8px 0; }\n        .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_dropShadow__3ONx3 .fx-menu-module_amountBody___0vYS {\n          display: flex;\n          align-items: center;\n          justify-content: space-between;\n          flex-direction: column;\n          height: 24px; }\n          .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_dropShadow__3ONx3 .fx-menu-module_amountBody___0vYS .fx-menu-module_amountInput__28C7V {\n            height: 24px; }\n          .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_dropShadow__3ONx3 .fx-menu-module_amountBody___0vYS .fx-menu-module_row__3k6rq {\n            height: 24px;\n            width: 100%;\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            margin-bottom: 8px;\n            font-size: 11px;\n            line-height: 16px; }\n            .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT .fx-menu-module_dropShadow__3ONx3 .fx-menu-module_amountBody___0vYS .fx-menu-module_row__3k6rq label {\n              color: #999999; }\n    .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_left__2iYbK > div > div:nth-child(3),\n    .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT > div > div:nth-child(3) {\n      width: 4px !important;\n      right: 0 !important; }\n      .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_left__2iYbK > div > div:nth-child(3) > div:hover,\n      .fx-menu-module_fxMenu__1ZkG5 .fx-menu-module_body__1X6N9 .fx-menu-module_right__2_BRT > div > div:nth-child(3) > div:hover {\n        background-color: #3399ff !important; }\n";
var style$2 = {"fxMenu":"fx-menu-module_fxMenu__1ZkG5","header":"fx-menu-module_header__1_Rts","resetBtn":"fx-menu-module_resetBtn__17z7k","body":"fx-menu-module_body__1X6N9","left":"fx-menu-module_left__2iYbK","row":"fx-menu-module_row__3k6rq","presets":"fx-menu-module_presets__20GPf","rowItem":"fx-menu-module_rowItem__2AF_i","right":"fx-menu-module_right__2_BRT","presents":"fx-menu-module_presents__3gjeJ","column":"fx-menu-module_column__3WqPp","active":"fx-menu-module_active__1dUB1","imageBox":"fx-menu-module_imageBox__3vL2V","OtherFilter":"fx-menu-module_OtherFilter__JNpSr","filterName":"fx-menu-module_filterName__Iu_2A","amountBody":"fx-menu-module_amountBody___0vYS","amountInput":"fx-menu-module_amountInput__28C7V","dropShadow":"fx-menu-module_dropShadow__3ONx3"};
styleInject(css_248z$2);

/* eslint-disable react-hooks/exhaustive-deps */
const DROP_SHADOW_VALUES = {
  y: 0,
  x: 0,
  blur: 0,
  color: '#000000',
  opacity: 100
};
const FxMenu = ({
  closeMenu,
  closeBtnRef,
  activeFiltersRef,
  activeFilters,
  setActiveFilters,
  setActiveFilter,
  activeFilter,
  onChange = () => {}
}) => {
  const {
    fxMenu,
    header,
    resetBtn,
    body,
    left,
    row,
    presets,
    rowItem,
    right
  } = style$2; // close menu by click outside.

  const fxMenuRef = /*#__PURE__*/React$1.createRef();
  React$1.useEffect(() => {
    function clickOutside(e) {
      if (closeBtnRef.current && !closeBtnRef.current.contains(e.target) && activeFiltersRef.current && !activeFiltersRef.current.contains(e.target) && fxMenuRef.current && !fxMenuRef.current.contains(e.target)) {
        closeMenu(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [fxMenuRef]);

  const updateRow = ({
    key,
    field,
    value
  }) => {
    let _activeFilters = [...activeFilters];
    _activeFilters[key][field] = value;
    if (value === '') _activeFilters[key]['selected'] = false;else if (_activeFilters[key]['value'] === 'invert-color') _activeFilters[key]['selected'] = value;else if (_activeFilters[key]['value'] === 'drop-shadow') {
      _activeFilters[key]['selected'] = JSON.stringify(DROP_SHADOW_VALUES) !== JSON.stringify(value);
      if (JSON.stringify(DROP_SHADOW_VALUES) === JSON.stringify(value)) _activeFilters[key]['amount'] = DROP_SHADOW_VALUES;
    } else if (Number.isInteger(parseInt(value))) _activeFilters[key]['selected'] = parseInt(value) > 0;else _activeFilters[key]['selected'] = value !== 'original';
    setActiveFilters(_activeFilters);
  };

  const restFilter = () => {
    let _activeFilters = [...activeFilters];

    _activeFilters.map((item, key) => {
      if (item.value === 'drop-shadow') _activeFilters[key].amount = DROP_SHADOW_VALUES;else {
        _activeFilters[key].selected = false;
        _activeFilters[key].amount = 0;
      }
    });

    setActiveFilters(_activeFilters);
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: fxMenu,
    ref: fxMenuRef
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: header
  }, /*#__PURE__*/React__default['default'].createElement("button", {
    className: resetBtn,
    onClick: () => restFilter()
  }, "Reset"), /*#__PURE__*/React__default['default'].createElement("label", null, "Add Fx"), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    size: "small",
    onClick: () => closeMenu(false)
  }, /*#__PURE__*/React__default['default'].createElement(CrossIcon, null))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: body
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: left
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${row} ${presets}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: rowItem,
    onClick: () => setActiveFilter({
      name: 'Presents',
      value: 'presents',
      key: 0
    })
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Presets"), activeFilters[0].selected ? /*#__PURE__*/React__default['default'].createElement(CheckIcon, null) : '')), /*#__PURE__*/React__default['default'].createElement(Scrollbars__default['default'], {
    autoHide: true,
    style: {
      height: '100%',
      width: 132
    }
  }, activeFilters.map((item, key) => /*#__PURE__*/React__default['default'].createElement(React$1.Fragment, {
    key: key
  }, item.value !== 'presents' && /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${row}`,
    key: key
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: rowItem,
    onClick: () => setActiveFilter({
      name: item.name,
      value: item.value,
      key
    })
  }, /*#__PURE__*/React__default['default'].createElement("label", null, item.name), item.selected ? /*#__PURE__*/React__default['default'].createElement(CheckIcon, null) : '')))))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: right
  }, /*#__PURE__*/React__default['default'].createElement(Scrollbars__default['default'], {
    autoHide: true,
    style: {
      height: '100%',
      width: 148
    }
  }, activeFilter.value === 'presents' && /*#__PURE__*/React__default['default'].createElement(Presents, {
    updateRow,
    activeFilters
  }), activeFilter.value === 'mode' && /*#__PURE__*/React__default['default'].createElement(Mode, {
    updateRow,
    activeFilter
  }), activeFilter.value === 'invert-color' && /*#__PURE__*/React__default['default'].createElement(InvertColor, {
    updateRow,
    activeFilter,
    activeFilters
  }), activeFilter.value === 'drop-shadow' && /*#__PURE__*/React__default['default'].createElement(DropShadow, {
    updateRow,
    activeFilter,
    activeFilters
  }), activeFilter.value !== 'mode' && activeFilter.value !== 'presents' && activeFilter.value !== 'drop-shadow' && activeFilter.value !== 'invert-color' && /*#__PURE__*/React__default['default'].createElement(OtherFilters, {
    updateRow,
    activeFilter,
    activeFilters
  })))));
};

const Presents = ({
  updateRow,
  activeFilters
}) => {
  const fxPresents = [{
    value: 'original',
    name: 'Original'
  }, {
    value: 'sepia',
    name: 'Sepia'
  }, {
    value: 'blackwhite',
    name: 'Black / White'
  }, {
    value: 'brownie',
    name: 'Brownie'
  }, {
    value: 'vintage',
    name: 'Vintage'
  }, {
    value: 'technicolor',
    name: 'Technicolor'
  }, {
    value: 'polaroid',
    name: 'Polaroid'
  }, {
    value: 'kodachrome',
    name: 'Kodachrome'
  }];
  const {
    presents,
    column,
    imageBox,
    active
  } = style$2;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: presents
  }, fxPresents.map((item, key) => /*#__PURE__*/React__default['default'].createElement("div", {
    key: key,
    className: `${column} ${activeFilters[0].amount === item.value ? active : ''}`,
    onClick: () => {
      updateRow({
        field: 'amount',
        value: item.value,
        key: 0
      });
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: imageBox,
    style: {
      backgroundImage: `url(/images/components/presents/${item.value}.png)`
    }
  }), /*#__PURE__*/React__default['default'].createElement("label", null, item.name))));
};

const InvertColor = ({
  updateRow,
  activeFilter,
  activeFilters
}) => {
  const defaultValue = activeFilter.key ? activeFilters[activeFilter.key]['amount'] : false;
  const [checked, setChecked] = React$1.useState(defaultValue);
  const {
    OtherFilter,
    filterName,
    amountBody
  } = style$2;
  React$1.useEffect(() => {
    const update = {
      field: 'amount',
      key: activeFilter.key,
      value: checked
    };
    updateRow(update);
  }, [checked]);
  React$1.useEffect(() => {
    setChecked(defaultValue);
  }, [defaultValue]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: OtherFilter
  }, /*#__PURE__*/React__default['default'].createElement("label", {
    className: filterName
  }, activeFilter.name), /*#__PURE__*/React__default['default'].createElement("div", {
    className: amountBody
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Amount"), /*#__PURE__*/React__default['default'].createElement(IosSwitch, {
    setChecked,
    checked
  })));
};

const Mode = ({
  updateRow,
  activeFilter
}) => {
  const [input] = React$1.useState();
  const {
    OtherFilter,
    filterName,
    amountBody
  } = style$2;
  React$1.useEffect(() => {
    const update = {
      field: 'amount',
      key: activeFilter.key,
      value: input
    };
    updateRow(update);
  }, [input]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: OtherFilter
  }, /*#__PURE__*/React__default['default'].createElement("label", {
    className: filterName
  }, activeFilter.name), /*#__PURE__*/React__default['default'].createElement("div", {
    className: amountBody
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Amount")));
};

const OtherFilters = ({
  updateRow,
  activeFilter,
  activeFilters
}) => {
  const defaultValue = activeFilter.key ? activeFilters[activeFilter.key]['amount'] : 0;
  const [input, setInput] = React$1.useState(defaultValue);
  const {
    OtherFilter,
    filterName,
    amountBody,
    amountInput
  } = style$2;
  React$1.useEffect(() => {
    const update = {
      field: 'amount',
      key: activeFilter.key,
      value: input
    };
    updateRow(update);
  }, [input]);
  React$1.useEffect(() => {
    setInput(defaultValue);
  }, [defaultValue]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: OtherFilter
  }, /*#__PURE__*/React__default['default'].createElement("label", {
    className: filterName
  }, activeFilter.name), /*#__PURE__*/React__default['default'].createElement("div", {
    className: amountBody
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Amount"), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setInput,
    value: input,
    setValue: setInput,
    label: "%",
    size: "normal",
    className: amountInput
  })));
};

const DropShadow = ({
  updateRow,
  activeFilter,
  activeFilters
}) => {
  const defaultValue = 'key' in activeFilter ? activeFilters[activeFilter.key]['amount'] : DROP_SHADOW_VALUES;
  const [x, setX] = React$1.useState(defaultValue.x);
  const [y, setY] = React$1.useState(defaultValue.y);
  const [blur, setBlur] = React$1.useState(defaultValue.blur);
  const [color, setColor] = React$1.useState(defaultValue.color);
  const [opacity, setOpacity] = React$1.useState(defaultValue.opacity);
  const {
    dropShadow,
    filterName,
    amountBody,
    row,
    amountInput
  } = style$2;
  React$1.useEffect(() => {
    setX(defaultValue.x);
    setY(defaultValue.y);
    setBlur(defaultValue.blur);
    setColor(defaultValue.color);
    setOpacity(defaultValue.opacity);
  }, [activeFilters]);
  React$1.useEffect(() => {
    const update = {
      field: 'amount',
      key: activeFilter.key,
      value: {
        y: parseInt(y),
        x: parseFloat(x),
        blur: parseInt(blur),
        color,
        opacity: parseInt(opacity)
      }
    };
    updateRow(update);
  }, [y, x, blur, color, opacity]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: dropShadow
  }, /*#__PURE__*/React__default['default'].createElement("label", {
    className: filterName
  }, activeFilter.name), /*#__PURE__*/React__default['default'].createElement("div", {
    className: amountBody
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: row
  }, /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setX,
    value: x,
    setValue: setX,
    label: "X",
    size: "normal",
    className: amountInput
  }), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setY,
    value: y,
    setValue: setY,
    label: "Y",
    size: "normal",
    className: amountInput
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: row
  }, /*#__PURE__*/React__default['default'].createElement("label", null, "Blur"), /*#__PURE__*/React__default['default'].createElement(Input, {
    onChange: setBlur,
    value: blur,
    setValue: setBlur,
    label: "PX",
    size: "normal",
    className: amountInput
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: row
  }, /*#__PURE__*/React__default['default'].createElement(ColorPicker, {
    onChange: ({
      color,
      value
    }) => {
      setColor(color);
      setOpacity(value);
    },
    setColor: setColor,
    row: {
      color: color,
      opacity: opacity
    }
  }))));
};

var css_248z$1 = ".fx-row-module_fxRow__3FjF6 {\n  position: relative;\n  width: 224px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n  cursor: pointer; }\n  .fx-row-module_fxRow__3FjF6 * {\n    box-sizing: border-box;\n    font-family: Aktiv Grotesk, sans-serif;\n    user-select: none; }\n  .fx-row-module_fxRow__3FjF6 .fx-row-module_fxText__1p2cR {\n    font-size: 11px;\n    width: 168px;\n    height: 24px;\n    background: #f5f5f5;\n    border-radius: 8px;\n    align-items: center;\n    display: flex;\n    padding-left: 8px; }\n    .fx-row-module_fxRow__3FjF6 .fx-row-module_fxText__1p2cR.fx-row-module_active__wFj_v {\n      border: 1px solid #3399ff; }\n  .fx-row-module_fxRow__3FjF6 .fx-row-module_btn__2fwCg {\n    width: 24px;\n    height: 24px; }\n    .fx-row-module_fxRow__3FjF6 .fx-row-module_btn__2fwCg.fx-row-module_minus__3Acv6 svg path {\n      stroke: #999999; }\n    .fx-row-module_fxRow__3FjF6 .fx-row-module_btn__2fwCg svg path {\n      fill: #999999; }\n";
var style$1 = {"fxRow":"fx-row-module_fxRow__3FjF6","fxText":"fx-row-module_fxText__1p2cR","active":"fx-row-module_active__wFj_v","btn":"fx-row-module_btn__2fwCg","minus":"fx-row-module_minus__3Acv6"};
styleInject(css_248z$1);

/* eslint-disable react-hooks/exhaustive-deps */
const FxRow = ({
  row,
  onChange = () => {},
  isActive = false
}) => {
  const {
    fxRow,
    fxText,
    btn,
    minus,
    active
  } = style$1;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${fxRow}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${fxText} ${isActive ? active : ''}`,
    onClick: () => onChange('activeFilter')
  }, row.name), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    className: btn,
    onClick: () => onChange('visible')
  }, row.visible ? /*#__PURE__*/React__default['default'].createElement(EyeIcon, null) : /*#__PURE__*/React__default['default'].createElement(EyeOffIcon, null)), /*#__PURE__*/React__default['default'].createElement(IconButton, {
    className: `${btn} ${minus}`,
    onClick: () => onChange('selected')
  }, /*#__PURE__*/React__default['default'].createElement(MinusIcon, null)));
};

var css_248z = ".fx-module_fill__3u_XH {\n  width: 240px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  box-sizing: border-box;\n  padding: 8px;\n  cursor: pointer; }\n  .fx-module_fill__3u_XH .fx-module_header__1ImeE {\n    display: flex; }\n    .fx-module_fill__3u_XH .fx-module_header__1ImeE button {\n      width: 24px;\n      height: 24px; }\n  .fx-module_fill__3u_XH .fx-module_activeFillItems__iftQ3 {\n    display: flex;\n    flex-direction: column;\n    width: 224px; }\n  .fx-module_fill__3u_XH.fx-module_white__2uBjo {\n    background: #ffffff; }\n  .fx-module_fill__3u_XH.fx-module_gray__1otcM {\n    background: #f7f9fa; }\n  .fx-module_fill__3u_XH.fx-module_silver__33Xt2 {\n    background: #f2f4f5; }\n  .fx-module_fill__3u_XH .fx-module_header__1ImeE {\n    width: 224px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between; }\n    .fx-module_fill__3u_XH .fx-module_header__1ImeE .fx-module_layerText__1YPfe {\n      font-family: Aktiv Grotesk, sans-serif;\n      font-size: 12px;\n      line-height: 24px;\n      font-weight: 600;\n      display: flex;\n      align-items: center;\n      cursor: text; }\n      .fx-module_fill__3u_XH .fx-module_header__1ImeE .fx-module_layerText__1YPfe.fx-module_purple__2G2ff {\n        color: #b555e5; }\n      .fx-module_fill__3u_XH .fx-module_header__1ImeE .fx-module_layerText__1YPfe.fx-module_black__3JpEd {\n        color: #31363a; }\n  .fx-module_fill__3u_XH .fx-module_layerBtnAction__18dfK {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    vertical-align: middle; }\n";
var style = {"fill":"fx-module_fill__3u_XH","header":"fx-module_header__1ImeE","activeFillItems":"fx-module_activeFillItems__iftQ3","white":"fx-module_white__2uBjo","gray":"fx-module_gray__1otcM","silver":"fx-module_silver__33Xt2","layerText":"fx-module_layerText__1YPfe","purple":"fx-module_purple__2G2ff","black":"fx-module_black__3JpEd","layerBtnAction":"fx-module_layerBtnAction__18dfK"};
styleInject(css_248z);

/* eslint-disable react-hooks/exhaustive-deps */
const _activeFilters = [{
  value: 'presents',
  name: 'Presents',
  selected: false,
  amount: 'Original',
  visible: true
}, {
  value: 'brightness',
  name: 'Brightness',
  selected: false,
  amount: 0,
  visible: true
}, {
  value: 'contrast',
  name: 'Contrast',
  selected: false,
  amount: 0,
  visible: true
}, {
  value: 'hue-rotation',
  name: 'Hue Rotation',
  selected: false,
  amount: 0,
  visible: true
}, {
  value: 'saturation',
  name: 'Saturation',
  selected: false,
  amount: 0,
  visible: true
}, {
  value: 'noise',
  name: 'Noise',
  selected: false,
  amount: 0,
  visible: true
}, {
  value: 'blur',
  name: 'Blur',
  selected: false,
  amount: 0,
  visible: false
}, {
  value: 'pixelate',
  name: 'Pixelate',
  selected: false,
  amount: 0,
  visible: true
}, {
  value: 'grayscale',
  name: 'Grayscale',
  selected: false,
  amount: 0,
  visible: true
}, // { value: 'mode', name: 'Mode', selected: false, amount: 0, visible: false },
{
  value: 'invert-color',
  name: 'Invert Color',
  selected: false,
  amount: false,
  visible: true
}, {
  value: 'drop-shadow',
  name: 'Drop Shadow',
  selected: false,
  amount: DROP_SHADOW_VALUES,
  visible: true
}];
const Fx = ({
  text = 'Fx',
  type = 'white',
  textColor = 'black',
  onChange = () => {}
}) => {
  const {
    fill,
    layerBtnAction,
    layerText,
    header,
    activeFillItems
  } = style;
  const [toggleFxMenu, setToggleFxMenu] = React$1.useState(false);
  const [activeFilters, setActiveFilters] = React$1.useState(_activeFilters);
  const [activeFilter, setActiveFilter] = React$1.useState({
    value: 'presents',
    key: null
  });
  React$1.useEffect(() => {
    onChange(activeFilters.filter(item => item.selected));
  }, [activeFilters]); //Remove or On/Off filter in FX Component => right menu.

  const updateActiveFilter = ({
    field,
    key
  }) => {
    if (field === 'activeFilter') {
      const _filter = activeFilters[key];
      setActiveFilter({
        name: _filter.name,
        value: _filter.value,
        key
      });
      setToggleFxMenu(true);
    } else {
      const _tmpActiveFilters = [...activeFilters];
      _tmpActiveFilters[key][field] = !_tmpActiveFilters[key][field];

      if (field === 'selected') {
        if (_tmpActiveFilters[key].value === 'drop-shadow') {
          _tmpActiveFilters[key]['amount'] = DROP_SHADOW_VALUES;
          _tmpActiveFilters[key]['selected'] = false;
        } else {
          _tmpActiveFilters[key]['amount'] = _tmpActiveFilters[key]['value'] === 'presents' ? 'original' : 0;
        }
      }

      setActiveFilters(_tmpActiveFilters);
    }
  };

  const fxCloseMenuBtn = /*#__PURE__*/React$1.createRef();
  const activeFiltersRef = /*#__PURE__*/React$1.createRef();
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: `${fill} ${style[type]}`
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: header
  }, /*#__PURE__*/React__default['default'].createElement("label", {
    className: `${layerText} ${style[textColor]}`
  }, text), /*#__PURE__*/React__default['default'].createElement("div", {
    ref: fxCloseMenuBtn,
    className: `${layerBtnAction}`,
    onClick: () => setToggleFxMenu(!toggleFxMenu)
  }, /*#__PURE__*/React__default['default'].createElement(IconButton, null, /*#__PURE__*/React__default['default'].createElement(PlusIcon, null))), toggleFxMenu && /*#__PURE__*/React__default['default'].createElement(FxMenu, {
    closeMenu: setToggleFxMenu,
    onChange: onChange,
    closeBtnRef: fxCloseMenuBtn,
    activeFiltersRef: activeFiltersRef,
    setActiveFilters: setActiveFilters,
    setActiveFilter: setActiveFilter,
    activeFilters: activeFilters,
    activeFilter: activeFilter
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: activeFillItems,
    ref: activeFiltersRef
  }, activeFilters && activeFilters.map((item, key) => {
    return /*#__PURE__*/React__default['default'].createElement(React$1.Fragment, {
      key: key
    }, item.selected ? /*#__PURE__*/React__default['default'].createElement(FxRow, {
      label: "%",
      row: item,
      isActive: activeFilter.value === item.value,
      onChange: field => updateActiveFilter({
        field,
        key
      })
    }) : '');
  })));
};

const LayerImageIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 12 12`
  }, /*#__PURE__*/React__default['default'].createElement("rect", {
    width: "11",
    height: "11",
    x: ".5",
    y: ".5",
    stroke: "#B6BABD",
    rx: "2.5"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#DEE1E2",
    d: "M5.29289 6.70696l-3 3A.99994.99994 0 002 10.4141v.0857c0 .5523.44772 1 1 1h5.86396c1.45584 0 2.63604-1.1801 2.63604-2.63599a.87865.87865 0 00-.2574-.62132l-.5355-.53553c-.3905-.39053-1.02368-.39053-1.41421 0L8.5 8.49985 6.70711 6.70696c-.39053-.39053-1.02369-.39053-1.41422 0z"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#63676C",
    d: "M8.5 8.49985L6.70711 6.70696c-.39053-.39053-1.02369-.39053-1.41422 0l-3 3A.99994.99994 0 002 10.4141v.0857c0 .5523.44772 1 1 1h5.86396c1.45584 0 2.63604-1.1801 2.63604-2.63599a.87865.87865 0 00-.2574-.62132l-.5355-.53553c-.3905-.39053-1.02368-.39053-1.41421 0L8.5 8.49985zm0 0l-1 1"
  }), /*#__PURE__*/React__default['default'].createElement("circle", {
    cx: "4",
    cy: "4",
    r: "1",
    fill: "#63676C"
  }));
};
const LayerImagePurpleIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 12 12`
  }, /*#__PURE__*/React__default['default'].createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "11",
    height: "11",
    rx: "2.5",
    stroke: "#E3C8F4"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M5.29289 6.70696L2.29289 9.70696C2.10536 9.89449 2 10.1488 2 10.4141V10.4998C2 11.0521 2.44772 11.4998 3 11.4998H8.86396C10.3198 11.4998 11.5 10.3197 11.5 8.86381C11.5 8.63077 11.4074 8.40727 11.2426 8.24249L10.7071 7.70696C10.3166 7.31643 9.68342 7.31643 9.29289 7.70696L8.5 8.49985L6.70711 6.70696C6.31658 6.31643 5.68342 6.31643 5.29289 6.70696Z",
    fill: "#F0E9F8"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M8.5 8.49985L6.70711 6.70696C6.31658 6.31643 5.68342 6.31643 5.29289 6.70696L2.29289 9.70696C2.10536 9.89449 2 10.1488 2 10.4141V10.4998C2 11.0521 2.44772 11.4998 3 11.4998H8.86396C10.3198 11.4998 11.5 10.3197 11.5 8.86381C11.5 8.63077 11.4074 8.40727 11.2426 8.24249L10.7071 7.70696C10.3166 7.31643 9.68342 7.31643 9.29289 7.70696L8.5 8.49985ZM8.5 8.49985L7.5 9.49985",
    stroke: "#C781EB"
  }), /*#__PURE__*/React__default['default'].createElement("circle", {
    cx: "4",
    cy: "4",
    r: "1",
    fill: "#C781EB"
  }));
};

const ShutterStockPremiumIcon = ({
  width = 12,
  height = 15
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 12 15`,
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M4 9.5c2.5 0 3.5-2.5 3.5-5 0 2.5 1 5 3.5 5-2.5 0-3.5 2.5-3.5 5 0-2.5-1-5-3.5-5zM.5 3.5c1.0714 0 2-1.25 2-2.5 0 1.25.9286 2.5 2 2.5-1.0714 0-2 1.25-2 2.5 0-1.25-.9286-2.5-2-2.5z",
    fill: "#FC0",
    stroke: "#FC0",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

const LayersIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M7.33.894a1.5 1.5 0 011.34 0L14.2 3.658c1.105.553 1.105 2.13 0 2.684L8.67 9.106a1.5 1.5 0 01-1.342 0L1.801 6.342c-1.105-.553-1.105-2.13 0-2.684L7.33.894z",
    stroke: "#333"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.504 9.25c-1.4.77-1.375 2.814.074 3.539l5.528 2.764a2 2 0 001.788 0l5.528-2.764c1.45-.725 1.474-2.77.074-3.539a2.179 2.179 0 01-.074.039l-1.04.52.593.297a1 1 0 010 1.788l-5.528 2.764a1 1 0 01-.894 0l-5.528-2.764a1 1 0 010-1.788l.593-.297-1.04-.52a2.14 2.14 0 01-.074-.039z",
    fill: "#333"
  }));
};
const PenToolsIcon = ({
  width = 15,
  height = 17
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 15 17",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M7.50385 0.949121L13.4303 10.427C13.7517 10.9411 13.7321 11.5982 13.3804 12.0922L10.9899 15.4499C10.5208 16.1088 9.76202 16.5 8.95328 16.5H6.38785C5.6067 16.5 4.87045 16.1349 4.39769 15.513L1.78917 12.0819C1.41445 11.589 1.38107 10.9165 1.70515 10.389L7.50385 0.949121Z",
    stroke: "#333333"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M7.56226 1.5L7.56226 10.2942",
    stroke: "#333333"
  }), /*#__PURE__*/React__default['default'].createElement("circle", {
    cx: "7.56226",
    cy: "10.5442",
    r: "1.25",
    fill: "#333333"
  }));
};
const ShapeIcon = ({
  width = 17,
  height = 17
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 19 19",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M0.5 4C0.5 2.067 2.067 0.5 4 0.5H12C13.933 0.5 15.5 2.067 15.5 4V9V12C15.5 13.933 13.933 15.5 12 15.5H10H4C2.067 15.5 0.5 13.933 0.5 12V4Z",
    stroke: "#333333"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M16 18.5H18.5V16",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
};
const ToolsPanelTextIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#000408",
    d: "M.5 4C.5 2.067 2.067.5 4 .5h8c1.933 0 3.5 1.567 3.5 3.5v8c0 1.933-1.567 3.5-3.5 3.5H4C2.067 15.5.5 13.933.5 12V4z"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#000408",
    d: "M6 9.5h4v-1H6v1z"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    fill: "#000408",
    fillRule: "evenodd",
    d: "M8.4624 4.30962C8.38525 4.12227 8.20267 4 8.00006 4c-.20261 0-.3852.12227-.46234.30963L4.37109 12h1.08146l2.54751-6.1868L10.5476 12h1.0814L8.4624 4.30962z",
    clipRule: "evenodd"
  }));
};
const ToolsPanelNoteIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#000408",
    d: "M.5 4C.5 2.067 2.067.5 4 .5h8c1.933 0 3.5 1.567 3.5 3.5v3.5203c0 .83549-.2989 1.64342-.8426 2.27777l-3.8397 4.47973c-.665.7757-1.6357 1.2222-2.65744 1.2222H4C2.067 15.5.5 13.933.5 12V4z"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    stroke: "#000408",
    d: "M9 15.5l.52198-1.2179c.63262-1.4762.73712-3.1252.29594-4.66938v0C9.6586 9.05509 10.0773 8.5 10.6573 8.5H15.5"
  }));
};
const ToolsPanelPencilIcon = ({
  width = 8,
  height = 16
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 16",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("mask", {
    id: "path-1-inside-1",
    fill: "white"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M3.76689 0.601575L-7.01796e-08 10.3226L-9.51811e-08 14C-1.02691e-07 15.1046 0.89543 16 2 16L6 16C7.10457 16 8 15.1046 8 14L8 10.3226L4.23311 0.601575C4.15061 0.388682 3.84939 0.388682 3.76689 0.601575Z"
  })), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M-7.01796e-08 10.3226L-0.932442 9.96126L-1 10.1356L-1 10.3226L-7.01796e-08 10.3226ZM3.76689 0.601575L4.69933 0.962896L4.69933 0.962895L3.76689 0.601575ZM4.23311 0.601575L5.16555 0.240254L5.16555 0.240254L4.23311 0.601575ZM8 10.3226L9 10.3226L9 10.1356L8.93244 9.96126L8 10.3226ZM0.932441 10.6839L4.69933 0.962896L2.83445 0.240254L-0.932442 9.96126L0.932441 10.6839ZM3.30067 0.962896L7.06756 10.6839L8.93244 9.96126L5.16555 0.240254L3.30067 0.962896ZM7 10.3226L7 14L9 14L9 10.3226L7 10.3226ZM1 14L1 10.3226L-1 10.3226L-1 14L1 14ZM6 15L2 15L2 17L6 17L6 15ZM-1 14C-1 15.6569 0.343146 17 2 17L2 15C1.44772 15 1 14.5523 1 14L-1 14ZM7 14C7 14.5523 6.55228 15 6 15L6 17C7.65686 17 9 15.6569 9 14L7 14ZM4.69933 0.962895C4.45184 1.60158 3.54816 1.60157 3.30067 0.962897L5.16555 0.240254C4.75307 -0.824205 3.24693 -0.824217 2.83445 0.240254L4.69933 0.962895Z",
    fill: "#333333",
    mask: "url(#path-1-inside-1)"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M2 5.5L2.21115 5.60557C3.33726 6.16863 4.66274 6.16863 5.78885 5.60557L6 5.5",
    stroke: "#333333"
  }));
};
const ToolsPanelAnimationModeIcon = ({
  width = 24,
  height = 16
}) => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 24 16",
    fill: "none"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M16 1H11.876C14.3354 2.36473 16 4.98797 16 8C16 11.012 14.3354 13.6353 11.876 15H16C19.866 15 23 11.866 23 8C23 4.13401 19.866 1 16 1ZM16 0H8C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16H16C20.4183 16 24 12.4183 24 8C24 3.58172 20.4183 0 16 0ZM6.77735 11.4818C6.44507 11.7033 6 11.4651 6 11.0657V4.93426C6 4.53491 6.44507 4.29672 6.77735 4.51823L11.376 7.58397C11.6728 7.78189 11.6728 8.21811 11.376 8.41603L6.77735 11.4818Z",
    fill: "#31363A"
  }));
};

exports.AddMenu = AddMenu;
exports.Adjustment = Adjustment;
exports.AlignAutoHeightIcon = AlignAutoHeightIcon;
exports.AlignBottomIcon = AlignBottomIcon;
exports.AlignBottomLineIcon = AlignBottomLineIcon;
exports.AlignCenterIcon = AlignCenterIcon;
exports.AlignCenterLineIcon = AlignCenterLineIcon;
exports.AlignDistributeHorizontalSpaceIcon = AlignDistributeHorizontalSpaceIcon;
exports.AlignDistributeVerticalSpaceIcon = AlignDistributeVerticalSpaceIcon;
exports.AlignHorizontalIcon = AlignHorizontalIcon;
exports.AlignLeftIcon = AlignLeftIcon;
exports.AlignLineHeightIcon = AlignLineHeightIcon;
exports.AlignLineSpaceIcon = AlignLineSpaceIcon;
exports.AlignRectangleIcon = AlignRectangleIcon;
exports.AlignRightIcon = AlignRightIcon;
exports.AlignTextBottomIcon = AlignTextBottomIcon;
exports.AlignTextCenterIcon = AlignTextCenterIcon;
exports.AlignTextLeftIcon = AlignTextLeftIcon;
exports.AlignTextMiddleIcon = AlignTextMiddleIcon;
exports.AlignTextRightIcon = AlignTextRightIcon;
exports.AlignTextTopIcon = AlignTextTopIcon;
exports.AlignTopIcon = AlignTopIcon;
exports.AlignTopLineIcon = AlignTopLineIcon;
exports.AlignVerticalCenterIcon = AlignVerticalCenterIcon;
exports.AlignVerticalIcon = AlignVerticalIcon;
exports.Alignment = Alignment;
exports.ArrowLeftIcon = ArrowLeftIcon;
exports.ArrowRightIcon = ArrowRightIcon;
exports.ArrowRightSecondIcon = ArrowRightSecondIcon;
exports.ArtboardIcon = ArtboardIcon;
exports.BlendHoverIcon = BlendHoverIcon;
exports.BlendIcon = BlendIcon;
exports.BrushIcon = BrushIcon;
exports.BrushesIcon = BrushesIcon;
exports.BrushesMenu = BrushesMenu;
exports.CheckIcon = CheckIcon;
exports.ChevronArrowIcon = ChevronArrowIcon;
exports.CrayonBrushIcon = CrayonBrushIcon;
exports.CrossIcon = CrossIcon;
exports.DiamondIcon = DiamondIcon;
exports.Divider = Divider;
exports.EdgeAlignBottomIcon = EdgeAlignBottomIcon;
exports.EdgeAlignCenterHorizontalIcon = EdgeAlignCenterHorizontalIcon;
exports.EdgeAlignCenterIcon = EdgeAlignCenterIcon;
exports.EdgeAlignCenterVerticalIcon = EdgeAlignCenterVerticalIcon;
exports.EdgeAlignLeftIcon = EdgeAlignLeftIcon;
exports.EdgeAlignRightIcon = EdgeAlignRightIcon;
exports.EdgeAlignTopIcon = EdgeAlignTopIcon;
exports.EllipseIcon = EllipseIcon;
exports.EyeIcon = EyeIcon;
exports.EyeOffIcon = EyeOffIcon;
exports.FXIcon = FXIcon;
exports.FileIcon = FileIcon;
exports.Fill = Fill;
exports.FilterIcon = FilterIcon;
exports.FolderIcon = FolderIcon;
exports.Fx = Fx;
exports.HamburgerIcon = HamburgerIcon;
exports.IconButton = IconButton;
exports.ImageIcon = ImageIcon;
exports.InkBrushIcon = InkBrushIcon;
exports.Input = Input;
exports.ItemSubtract = ItemSubtract;
exports.LayerImageIcon = LayerImageIcon;
exports.LayerImagePurpleIcon = LayerImagePurpleIcon;
exports.Layers = Layers;
exports.LayersIcon = LayersIcon;
exports.LinkIcon = LinkIcon;
exports.LinkIconVertical = LinkIconVertical;
exports.LockIcon = LockIcon;
exports.LockedIcon = LockedIcon;
exports.MaskIcon = MaskIcon;
exports.MinusIcon = MinusIcon;
exports.MockupItemIcon = MockupItemIcon;
exports.Pages = Pages;
exports.PenToolsIcon = PenToolsIcon;
exports.PerspectiveIcon = PerspectiveIcon;
exports.PlusIcon = PlusIcon;
exports.Properties = Properties;
exports.RadiusIcon = RadiusIcon;
exports.RadiusIconFull = RadiusIconFull;
exports.RectangleIcon = RectangleIcon;
exports.RemoveBGIcon = RemoveBGIcon;
exports.ResentIcon = ResentIcon;
exports.SearchIcon = SearchIcon;
exports.ShapeIcon = ShapeIcon;
exports.ShapeMenu = ShapeMenu;
exports.ShapeModeExclude = ShapeModeExclude;
exports.ShapeModeIntersect = ShapeModeIntersect;
exports.ShapeModeSubtract = ShapeModeSubtract;
exports.ShapeModeUnion = ShapeModeUnion;
exports.ShareButton = ShareButton;
exports.ShareIcon = ShareIcon;
exports.ShutterStockPremiumIcon = ShutterStockPremiumIcon;
exports.SmartLayout = SmartLayout;
exports.SprayBrushIcon = SprayBrushIcon;
exports.StarIcon = StarIcon;
exports.Stroke = Stroke;
exports.Stroke1Icon = Stroke1Icon;
exports.Stroke2Icon = Stroke2Icon;
exports.Stroke3Icon = Stroke3Icon;
exports.Text = Text;
exports.TextBackground = TextBackground;
exports.TextCamelCaseIcon = TextCamelCaseIcon;
exports.TextCapitalCaseIcon = TextCapitalCaseIcon;
exports.TextIcon = TextIcon;
exports.TextLowerCaseIcon = TextLowerCaseIcon;
exports.TextStrikeThroughDecorationIcon = TextStrikeThroughDecorationIcon;
exports.TextUnderLineDecorationIcon = TextUnderLineDecorationIcon;
exports.ThumbnailIcon = ThumbnailIcon;
exports.ToolbarZoom = ToolbarZoom;
exports.ToolsPanelAnimationModeIcon = ToolsPanelAnimationModeIcon;
exports.ToolsPanelNoteIcon = ToolsPanelNoteIcon;
exports.ToolsPanelPencilIcon = ToolsPanelPencilIcon;
exports.ToolsPanelTextIcon = ToolsPanelTextIcon;
exports.TopMenu = TopMenu;
exports.TreeDots = TreeDots;
exports.VectorIcon = VectorIcon;
exports.VideoIcon = VideoIcon;
exports.Visibility = Visibility;
exports.VolumeIcon = VolumeIcon;
exports.VolumeMuteIcon = VolumeMuteIcon;
exports.WrapIcon = WrapIcon;
