import React$1, { useState, useEffect, Fragment, Component, createRef } from 'react';
import { v4 } from 'uuid';
import Scrollbars, { Scrollbars as Scrollbars$1 } from 'react-custom-scrollbars';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import SortableTree, { isDescendant, changeNodeAtPath, addNodeUnderParent } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { isDescendant as isDescendant$1, changeNodeAtPath as changeNodeAtPath$1, removeNodeAtPath } from 'react-sortable-tree/dist/index.esm';
import { SketchPicker } from 'react-color';

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
  return v4();
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
  className = null,
  min = null,
  max = null,
  placeholder = '',
  value = '',
  id = null,
  ref = null,
  onChange = () => {}
}) => {
  const {
    input
  } = style$K;

  const ArrowKeyUpDown = event => {
    const {
      code,
      shiftKey
    } = event;
    const val = value;

    if (type !== 'string') {
      validateNumber(val);
      if (code === 'ArrowUp') setValue(max !== null && parseFloat(val) + (shiftKey ? 10 : 1) > max ? max : parseFloat(val) + (shiftKey ? 10 : 1));else if (code === 'ArrowDown') setValue(min !== null && parseFloat(val) - (shiftKey ? 10 : 1) < min ? min : parseFloat(val) - (shiftKey ? 10 : 1));else if (code === 'Enter' || code === 'NumpadEnter') {
        calcInput();
      }
    }
  };

  const calcInput = () => {
    if (value && type !== 'string') {
      const inputVal = value.toString();
      const operations = ['+', '-', '*', '/'];
      validateNumber(inputVal);
      operations.map(_value => {
        if (inputVal && inputVal.split(_value).length === 2) {
          let _res = inputVal.split(_value);

          if (!_res[0]) setValue(parseFloat(_value + _res[1]));
          setValue(calculate(_res[0], _res[1], _value));
        }

        return value;
      });
    }
  };

  const validateNumber = data => {
    if (isCharacterALetter(data)) setValue(0);
  };

  const setValue = val => {
    if (size === 'noStyle') {
      onChange(val);
    } else if (!val || val === '') {
      setValue(0);
      onChange(0);
    } else if (max !== null && val > max) {
      setValue(max);
      onChange(max);
    } else if (min !== null && val < min) {
      setValue(min);
      onChange(min);
    } else onChange(parseFloat(val));
  };

  return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, size === 'noStyle' ? /*#__PURE__*/React$1.createElement("input", {
    ref: ref,
    type: "text",
    onFocus: event => event.target.select(),
    onKeyUp: ArrowKeyUpDown,
    value: value,
    onBlur: calcInput,
    className: `${className ? className : ''}`,
    placeholder: placeholder,
    onChange: e => setValue(e.target.value)
  }) : /*#__PURE__*/React$1.createElement("div", {
    ref: ref,
    className: `${className ? className : ''} ${input} ${style$K[size]} ${style$K[direction]}`
  }, label || children ? /*#__PURE__*/React$1.createElement("input", {
    id: id,
    type: "text",
    onFocus: event => event.target.select(),
    onKeyDown: ArrowKeyUpDown,
    value: value,
    onBlur: calcInput,
    onChange: e => setValue(e.target.value)
  }) : null, /*#__PURE__*/React$1.createElement("label", null, children ? children : label)));
};

var css_248z$N = ".iconButton-module_btn__1Xikn {\n  font-family: aktiv-grotesk, sans-serif;\n  box-sizing: border-box;\n  outline: none;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 0;\n  cursor: pointer;\n  border: 1px transparent #3399ff; }\n  .iconButton-module_btn__1Xikn.iconButton-module_enabled__z0B1G.iconButton-module_white__6dVau {\n    background-color: #ffffff; }\n  .iconButton-module_btn__1Xikn.iconButton-module_enabled__z0B1G.iconButton-module_gray__1lziB {\n    background-color: #f7f9fa; }\n  .iconButton-module_btn__1Xikn.iconButton-module_enabled__z0B1G:hover, .iconButton-module_btn__1Xikn.iconButton-module_enabled__z0B1G.iconButton-module_active__3ZrO_ {\n    background: #f2f4f5; }\n  .iconButton-module_btn__1Xikn.iconButton-module_enabled__z0B1G.iconButton-module_active__3ZrO_ {\n    border: 1px solid #3399ff; }\n    .iconButton-module_btn__1Xikn.iconButton-module_enabled__z0B1G.iconButton-module_active__3ZrO_ svg rect {\n      fill: #333333; }\n  .iconButton-module_btn__1Xikn.iconButton-module_enabled__z0B1G:active {\n    border: 1px solid #3399ff; }\n  .iconButton-module_btn__1Xikn.iconButton-module_disable__2qvG7 {\n    background-color: transparent !important;\n    pointer-events: none; }\n    .iconButton-module_btn__1Xikn.iconButton-module_disable__2qvG7 svg {\n      opacity: 0.5; }\n  .iconButton-module_btn__1Xikn.iconButton-module_normal__1YN9Y {\n    width: 32px;\n    height: 32px; }\n  .iconButton-module_btn__1Xikn.iconButton-module_small__1eSuR {\n    width: 24px;\n    height: 24px; }\n";
var style$J = {"btn":"iconButton-module_btn__1Xikn","enabled":"iconButton-module_enabled__z0B1G","white":"iconButton-module_white__6dVau","gray":"iconButton-module_gray__1lziB","active":"iconButton-module_active__3ZrO_","disable":"iconButton-module_disable__2qvG7","normal":"iconButton-module_normal__1YN9Y","small":"iconButton-module_small__1eSuR"};
styleInject(css_248z$N);

const IconButton = ({
  children,
  disabled = false,
  isActive = false,
  onClick = null,
  className = null,
  size = 'normal',
  color = 'white'
}) => {
  const {
    btn,
    active,
    enabled,
    disable
  } = style$J;
  return /*#__PURE__*/React$1.createElement("button", {
    onClick: onClick,
    className: `icon-btn ${btn} ${style$J[size]} ${style$J[color]} ${disabled ? disable : enabled}${isActive ? active : ''} ${className ? className : ''}`,
    disabled: disabled
  }, children);
};

const RadiusIcon$1 = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 2.5C1 1.67157 1.67157 1 2.5 1H4.5V0H2.5C1.11929 0 0 1.11929 0 2.5V4.5H1V2.5ZM11 2.5C11 1.67157 10.3284 1 9.5 1H7.5V0H9.5C10.8807 0 12 1.11929 12 2.5V4.5H11V2.5ZM2.5 11C1.67157 11 1 10.3284 1 9.5V7.5H0V9.5C0 10.8807 1.11929 12 2.5 12H4.5V11H2.5ZM11 9.5C11 10.3284 10.3284 11 9.5 11H7.5V12H9.5C10.8807 12 12 10.8807 12 9.5V7.5H11V9.5Z",
    fill: "#333333"
  }));
};
const LinkIcon$1 = ({
  width = 14,
  height = 5
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 14 5",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 5L3 5C1.61929 5 0.5 3.88071 0.5 2.5C0.5 1.11929 1.61929 -4.89256e-08 3 -1.09278e-07L5 -1.96701e-07L5 1L3 1C2.17157 1 1.5 1.67157 1.5 2.5C1.5 3.32843 2.17157 4 3 4L5 4L5 5ZM11 5C12.3807 5 13.5 3.88071 13.5 2.5C13.5 1.11929 12.3807 -5.19322e-07 11 -4.5897e-07L9 -3.71547e-07L9 1L11 1C11.8284 1 12.5 1.67157 12.5 2.5C12.5 3.32843 11.8284 4 11 4L9 4L9 5L11 5Z",
    fill: "#333333"
  }));
};
const EyeIcon$1 = ({
  width = 12,
  height = 6
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 6",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.5843 3.99999L10.5843 4H11.6586L11.6586 3.99999C10.8349 1.66961 8.61245 0 6.00002 0C3.38758 0 1.1651 1.66962 0.341431 4H1.41577C2.18779 2.23296 3.95106 1 6.00002 1C8.04897 1 9.81224 2.23295 10.5843 3.99999ZM6 3C5.17157 3 4.5 3.67157 4.5 4.5C4.5 5.32843 5.17157 6 6 6C6.82843 6 7.5 5.32843 7.5 4.5C7.5 3.67157 6.82843 3 6 3Z",
    fill: "#333333"
  }));
};
const EyeCloseIcon$1 = ({
  width = 12,
  height = 4
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 4",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.41577 -4.76837e-07C2.18779 1.76704 3.95106 3 6.00002 3C8.04898 3 9.81225 1.76704 10.5843 1.43051e-06L11.6586 -1.90735e-06C10.8349 2.33038 8.61246 4 6.00002 4C3.38758 4 1.1651 2.33038 0.341431 -9.53674e-07L1.41577 -4.76837e-07Z",
    fill: "#333333"
  }));
};
const TreeDotsIcon$1 = ({
  width = 12,
  height = 2
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 10 2",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1ZM4 1C4 0.447715 4.44772 0 5 0C5.55228 0 6 0.447715 6 1C6 1.55228 5.55228 2 5 2C4.44772 2 4 1.55228 4 1ZM9 0C8.44771 0 8 0.447715 8 1C8 1.55228 8.44771 2 9 2C9.55229 2 10 1.55228 10 1C10 0.447715 9.55229 0 9 0Z",
    fill: "#333333"
  }));
};
const BlendIcon$1 = ({
  width = 8,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M1.21537 6.87311L4 2L6.78463 6.87311C7.5022 8.12884 7.29052 9.70948 6.26784 10.7322C5.01535 11.9847 2.98466 11.9847 1.73216 10.7322C0.709481 9.70948 0.497805 8.12884 1.21537 6.87311Z",
    stroke: "#333333"
  }));
};
const AlignLeftIcon$1 = ({
  width = 13,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "0.5",
    y1: "2.18557e-08",
    x2: "0.499999",
    y2: "12",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "2",
    y1: "4",
    x2: "12",
    y2: "4",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "2",
    y1: "8",
    x2: "6",
    y2: "8",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const AlignCenterVIcon$1 = ({
  width = 13,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "6.5",
    y1: "2.18557e-08",
    x2: "6.5",
    y2: "12",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "1.5",
    y1: "4",
    x2: "11.5",
    y2: "4",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "4.5",
    y1: "8",
    x2: "8.5",
    y2: "8",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const AlignRightIcon$1 = ({
  width = 13,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    y1: "-0.5",
    x2: "12",
    y2: "-0.5",
    transform: "matrix(4.37114e-08 1 1 -4.37114e-08 13 0)",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "1",
    y1: "-1",
    x2: "11",
    y2: "-1",
    transform: "matrix(-1 0 0 1 12 5)",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "1",
    y1: "-1",
    x2: "5",
    y2: "-1",
    transform: "matrix(-1 0 0 1 12 9)",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const AlignTopIcon$1 = ({
  width = 13,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "12",
    y1: "0.5",
    x2: "-4.37114e-08",
    y2: "0.499999",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "12",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "4",
    y1: "2",
    x2: "4",
    y2: "6",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const AlignCenterIcon$1 = ({
  width = 12,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    y1: "6.5",
    x2: "12",
    y2: "6.5",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "4",
    y1: "11.5",
    x2: "4",
    y2: "1.5",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "8",
    y1: "8.5",
    x2: "8",
    y2: "4.5",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const AlignBottomIcon$1 = ({
  width = 12,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "2.78181e-08",
    y1: "12.5",
    x2: "12",
    y2: "12.5",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "4",
    y1: "11",
    x2: "4",
    y2: "1",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "8",
    y1: "11",
    x2: "8",
    y2: "7",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const AlignDistributeVerticalSpacingIcon$1 = ({
  width = 8,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "-2.78181e-08",
    y1: "7.5",
    x2: "12",
    y2: "7.5",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "12",
    y1: "0.5",
    x2: "2.78181e-08",
    y2: "0.500001",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "4",
    y1: "4",
    x2: "8",
    y2: "4",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const AlignDistributeHorizontalSpacingIcon$1 = ({
  width = 8,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "7.5",
    y1: "12",
    x2: "7.5",
    y2: "2.18557e-08",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "0.5",
    y1: "-2.18557e-08",
    x2: "0.500001",
    y2: "12",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "4",
    y1: "8",
    x2: "4",
    y2: "4",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const LockIcon$1 = ({
  width = 8,
  height = 11
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 11",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4 0C2.34315 0 1 1.34315 1 3V5C0.447715 5 0 5.44772 0 6V9C0 10.1046 0.895431 11 2 11H6C7.10457 11 8 10.1046 8 9V6C8 5.44772 7.55228 5 7 5V3C7 1.34315 5.65685 0 4 0ZM6 5V3C6 1.89543 5.10457 1 4 1C2.89543 1 2 1.89543 2 3V5H6ZM1 9V6H7V9C7 9.55228 6.55228 10 6 10H2C1.44772 10 1 9.55228 1 9Z",
    fill: "#333333"
  }));
};
const LockedIcon$1 = ({
  width = 8,
  height = 11
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 11",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M1.5 5V3C1.5 1.61929 2.61929 0.5 4 0.5V0.5C5.38071 0.5 6.5 1.61929 6.5 3V5",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M0.5 6C0.5 5.72386 0.723858 5.5 1 5.5H7C7.27614 5.5 7.5 5.72386 7.5 6V9C7.5 9.82843 6.82843 10.5 6 10.5H2C1.17157 10.5 0.5 9.82843 0.5 9V6Z",
    fill: "#333333",
    stroke: "#333333",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
const VolumeOnIcon$1 = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("mask", {
    id: "path-1-inside-1",
    fill: "white"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M2 3C0.895431 3 0 3.89543 0 5V7C0 8.10457 0.895431 9 2 9H3L6.4855 11.0913C7.15203 11.4912 8 11.0111 8 10.2338V1.76619C8 0.988896 7.15203 0.508783 6.4855 0.908698L3 3H2Z"
  })), /*#__PURE__*/React$1.createElement("path", {
    d: "M3 9L3.5145 8.14251L3.27698 8H3V9ZM3 3V4H3.27698L3.5145 3.85749L3 3ZM6.4855 11.0913L5.97101 11.9488L6.4855 11.0913ZM-1 5V7H1V5H-1ZM2 10H3V8H2V10ZM2.4855 9.85749L5.97101 11.9488L7 10.2338L3.5145 8.14251L2.4855 9.85749ZM9 10.2338V1.76619H7V10.2338H9ZM5.97101 0.0512046L2.4855 2.14251L3.5145 3.85749L7 1.76619L5.97101 0.0512046ZM3 2H2V4H3V2ZM9 1.76619C9 0.211601 7.30406 -0.748625 5.97101 0.0512046L7 1.76619V1.76619H9ZM5.97101 11.9488C7.30405 12.7486 9 11.7884 9 10.2338H7L7 10.2338L5.97101 11.9488ZM-1 7C-1 8.65685 0.343146 10 2 10V8C1.44772 8 1 7.55228 1 7H-1ZM1 5C1 4.44772 1.44772 4 2 4V2C0.343146 2 -1 3.34315 -1 5H1Z",
    fill: "#333333",
    mask: "url(#path-1-inside-1)"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 7.73243C9.5978 7.38663 10 6.74028 10 6C10 5.25972 9.5978 4.61337 9 4.26756V6V7.73243Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 9.74796C10.7252 9.30392 12 7.73782 12 5.87398C12 4.01014 10.7252 2.44404 9 2V3.04469C10.1652 3.45652 11 4.56776 11 5.87398C11 7.1802 10.1652 8.29144 9 8.70328V9.74796Z",
    fill: "#333333"
  }));
};
const VolumeOffIcon$1 = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3.5145 8.14251L3.27698 8H3H2C1.44772 8 1 7.55229 1 7V5C1 4.44772 1.44772 4 2 4H3H3.27698L3.5145 3.8575L7 1.76619V3H8V1.76619C8 0.988899 7.15203 0.508786 6.4855 0.9087L3 3H2C0.895431 3 0 3.89543 0 5V7C0 8.10457 0.895431 9 2 9H3L6.4855 11.0913C7.15203 11.4912 8 11.0111 8 10.2338V9H7V10.2338L6.4855 11.0913L7 10.2338L3.5145 8.14251Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M6 7.5L9 4.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M9 7.5L6 4.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
}; //SMART LAYOUT

const EdgeAlignTopIcon$1 = ({
  width = 8,
  height = 12,
  color = null
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 12"
  }, /*#__PURE__*/React$1.createElement("path", {
    stroke: color // strokeWidth="1.5"
    ,
    strokeLinecap: "round",
    d: "M4 11.25V.75M7.25.75H.75"
  }));
};
const EdgeAlignRightIcon$1 = ({
  width = 12,
  height = 8,
  color = null
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 8"
  }, /*#__PURE__*/React$1.createElement("path", {
    stroke: color // strokeWidth="1.5"
    ,
    strokeLinecap: "round",
    d: "M11.25 4H.75M.75.75v6.5"
  }));
};
const EdgeAlignLeftIcon$1 = ({
  width = 12,
  height = 8,
  color = null
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 8"
  }, /*#__PURE__*/React$1.createElement("path", {
    stroke: color,
    strokeLinecap: "round",
    d: "M.5 4h11M11.5 7.5v-7"
  }));
};
const EdgeAlignBottomIcon$1 = ({
  width = 8,
  height = 12,
  color = null
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 12"
  }, /*#__PURE__*/React$1.createElement("path", {
    stroke: color,
    strokeLinecap: "round",
    d: "M4 .5v11M.5 11.5h7"
  }));
};

const Stroke1Icon$1 = ({
  width = 8,
  height = 8
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 8 8`,
    fill: "transparent"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M8 .5H.5V8",
    stroke: "#999"
  }));
};
const Stroke2Icon$1 = ({
  width = 8,
  height = 8
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 8 8`,
    fill: "transparent"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M8 .5H4.25L.5 4.25V8",
    stroke: "#999"
  }));
};
const Stroke3Icon$1 = ({
  width = 8,
  height = 8
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 8 8`,
    fill: "transparent"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M8 .5H6.5c-3.3137 0-6 2.6863-6 6V8",
    stroke: "#999"
  }));
}; //Tools Panel

const ToolsPanelMenuIcon$1 = ({
  width = 12,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 9",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "0.5",
    y1: "0.5",
    x2: "11.5",
    y2: "0.500001",
    stroke: "#333333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "0.5",
    y1: "4.5",
    x2: "11.5",
    y2: "4.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "0.5",
    y1: "8.5",
    x2: "11.5",
    y2: "8.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
};
const ToolsPanelShareIcon$1 = ({
  width = 15,
  height = 14
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 15 14",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 10V11C0 12.6569 1.34315 14 3 14H12C13.6569 14 15 12.6569 15 11V10H14V11C14 12.1046 13.1046 13 12 13H3C1.89543 13 1 12.1046 1 11V10H0Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M7.5 9L7.5 1M7.5 1L10 3.5M7.5 1L5 3.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
};
const WrapIcon$1 = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 3v10c0 1.1046.8954 2 2 2h10c1.1046 0 2-.8954 2-2V3c0-1.1046-.8954-2-2-2H3c-1.1046 0-2 .8954-2 2zm2-3C1.3432 0 0 1.3432 0 3v10c0 1.6569 1.3432 3 3 3h10c1.6569 0 3-1.3431 3-3V3c0-1.6568-1.3431-3-3-3H3z",
    fill: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#333",
    d: "M5.5 0v16M10.5 0v16M0 10.5h16M0 5.5h16"
  }));
};
const PerspectiveIcon$1 = ({
  width = 16,
  height = 17
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 17",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M7.5 2.5V15M12.5 3.5v10M1 8.5h14M.5 2.947c0-.9483.8692-1.6587 1.7986-1.4699l12 2.4375a1.5 1.5 0 011.2014 1.47v6.3273a1.5 1.5 0 01-1.1149 1.4497l-12 3.1875C1.433 16.602.5 15.8843.5 14.8994V2.9471z",
    stroke: "#333"
  }));
};
const RemoveBGIcon$1 = ({
  width = 18,
  height = 18
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 18 18",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("rect", {
    x: "0.636039",
    y: "15.2426",
    width: "15",
    height: "3",
    rx: "1",
    transform: "rotate(-45 0.636039 15.2426)",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "8.35355",
    y1: "7.64645",
    x2: "10.3536",
    y2: "9.64645",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M5.03107 0.767252C5.19215 0.331943 5.80785 0.331944 5.96893 0.767253L6.50058 2.20402C6.55122 2.34088 6.65912 2.44878 6.79598 2.49942L8.23275 3.03107C8.66806 3.19215 8.66806 3.80785 8.23275 3.96893L6.79598 4.50058C6.65912 4.55122 6.55122 4.65912 6.50058 4.79598L5.96893 6.23275C5.80785 6.66806 5.19215 6.66806 5.03107 6.23275L4.49942 4.79598C4.44878 4.65912 4.34088 4.55122 4.20402 4.50058L2.76725 3.96893C2.33194 3.80785 2.33194 3.19215 2.76725 3.03107L4.20402 2.49942C4.34088 2.44878 4.44878 2.34088 4.49942 2.20402L5.03107 0.767252Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M15.0311 0.767253C15.1922 0.331944 15.8078 0.331944 15.9689 0.767253L16.2305 1.47411C16.2811 1.61097 16.389 1.71887 16.5259 1.76951L17.2327 2.03107C17.6681 2.19215 17.6681 2.80785 17.2327 2.96893L16.5259 3.23049C16.389 3.28113 16.2811 3.38903 16.2305 3.52589L15.9689 4.23275C15.8078 4.66806 15.1922 4.66806 15.0311 4.23275L14.7695 3.52589C14.7189 3.38903 14.611 3.28113 14.4741 3.23049L13.7673 2.96893C13.3319 2.80785 13.3319 2.19215 13.7673 2.03107L14.4741 1.76951C14.611 1.71887 14.7189 1.61097 14.7695 1.47411L15.0311 0.767253Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M15.0384 9.74755C15.1969 9.31901 15.8031 9.31901 15.9616 9.74755C16.0115 9.88228 16.1177 9.98851 16.2524 10.0384C16.681 10.1969 16.681 10.8031 16.2524 10.9616C16.1177 11.0115 16.0115 11.1177 15.9616 11.2524C15.8031 11.681 15.1969 11.681 15.0384 11.2524C14.9885 11.1177 14.8823 11.0115 14.7476 10.9616C14.319 10.8031 14.319 10.1969 14.7476 10.0384C14.8823 9.98851 14.9885 9.88228 15.0384 9.74755Z",
    fill: "#333333"
  }));
};
const CheckIcon$1 = ({
  width = 10,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 10 9",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.3796 1.3254l-6 7-.3514.41-.3817-.3819-2.5-2.5.707-.707 2.1183 2.1181 5.6486-6.59.7592.6508z",
    fill: "#999"
  }));
};
const ChevronArrowIcon$1 = ({
  width = 8,
  height = 4
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 4",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M.2929 0l3.3536 3.3535L4 3.7071l.3536-.3536L7.707 0H6.293L4 2.2929 1.7071 0H.293z",
    fill: "#999"
  }));
};
const ListIcon$1 = ({
  width = 12,
  height = 7
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 7",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 2H4V1h8v1z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("circle", {
    cx: "1.5",
    cy: "1.5",
    r: ".5",
    fill: "#999",
    stroke: "#999",
    strokeWidth: ".5"
  }), /*#__PURE__*/React$1.createElement("circle", {
    cx: "1.5",
    cy: "5.5",
    r: ".5",
    fill: "#999",
    stroke: "#999",
    strokeWidth: ".5"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#999",
    d: "M4 5.5h8"
  }));
};
const PlusIcon$1 = ({
  width = 9,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 9 9",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 4V0H4v4H0v1h4v4h1V5h4V4H5z",
    fill: "#999"
  }));
};
const MinusIcon$1 = ({
  width = 9,
  height = 1
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 9 1",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 1H0V0h9v1z",
    fill: "#999"
  }));
};
const CrossIcon$1 = ({
  width = 10,
  height = 10
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 10 10",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M9 1L1 9M1 1l8 8",
    stroke: "#999"
  }));
};
const SearchIcon$1 = ({
  width = 11,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 11 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 5c0 2.2091-1.7909 4-4 4-2.2091 0-4-1.7909-4-4 0-2.2091 1.7909-4 4-4 2.2091 0 4 1.7909 4 4zM7.578 9.285C6.8252 9.739 5.943 10 5 10c-2.7614 0-5-2.2386-5-5s2.2386-5 5-5 5 2.2386 5 5c0 1.4552-.6217 2.7652-1.614 3.679l2.4676 2.4674-.7072.7072L7.578 9.285z",
    fill: "#999"
  }));
};

const LayerFolderIcon$1 = ({
  width = 12,
  height = 10
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 10",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M0 3c0-.9319 0-1.3978.1522-1.7654A2 2 0 011.2346.1522C1.6022 0 2.0681 0 3 0h3l1 2h2.75c.6989 0 1.0484 0 1.324.1142.3676.1522.6596.4442.8118.8118C12 3.2016 12 3.551 12 4.25V7c0 .9319 0 1.3978-.1522 1.7654-.203.49-.5924.8794-1.0824 1.0824C10.3978 10 9.9319 10 9 10H3c-.9319 0-1.3978 0-1.7654-.1522A2 2 0 01.1522 8.7654C0 8.3978 0 7.9319 0 7V3z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7 2L6 0H3c-.9319 0-1.3978 0-1.7654.1522A2 2 0 00.1522 1.2346C0 1.6022 0 2.0681 0 3v4c0 .9319 0 1.3978.1522 1.7654a2 2 0 001.0824 1.0824C1.6022 10 2.0681 10 3 10h6c.9319 0 1.3978 0 1.7654-.1522.49-.203.8794-.5924 1.0824-1.0824C12 8.3978 12 7.9319 12 7V4.25c0-.699 0-1.0484-.1142-1.324a1.4997 1.4997 0 00-.8118-.8118C10.7984 2 10.4489 2 9.75 2H7zM5.382 1H3c-.4796 0-.7893.0005-1.0262.0167-.228.0156-.3149.0422-.3565.0594a1 1 0 00-.5412.5412c-.0172.0416-.0438.1285-.0594.3565C1.0005 2.2108 1 2.5204 1 3v4c0 .4796.0005.7893.0167 1.0262.0156.228.0422.3149.0594.3565a1 1 0 00.5412.5412c.0416.0172.1285.0438.3565.0594C2.2108 8.9995 2.5204 9 3 9h6c.4796 0 .7893-.0005 1.0262-.0167.228-.0156.3149-.0422.3565-.0594a1.0001 1.0001 0 00.5412-.5412c.0172-.0416.0438-.1285.0594-.3565C10.9995 7.7892 11 7.4796 11 7V4.25c0-.3631-.0005-.5854-.012-.7527-.0096-.142-.0244-.1845-.026-.1886-.0002-.0005-.0002-.0005 0 0a.5.5 0 00-.2707-.2706c-.0041-.0017-.0466-.0165-.1886-.0261C10.3354 3.0005 10.1131 3 9.75 3H6.382l-1-2z",
    fill: "#999"
  }));
};
const LayerFileIcon$1 = ({
  width = 10,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 10 12`,
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M.5 4.5c0-.706 0-1.21.027-1.607.027-.393.079-.645.163-.85A2.5 2.5 0 012.043.69c.205-.084.457-.136.85-.163C3.29.5 3.794.5 4.5.5h1.293L9.5 4.207V7.5c0 .706 0 1.21-.027 1.607-.027.393-.079.645-.163.85a2.5 2.5 0 01-1.353 1.353c-.205.084-.457.136-.85.163-.397.027-.901.027-1.607.027h-1c-.706 0-1.21 0-1.607-.027-.393-.027-.645-.079-.85-.163A2.5 2.5 0 01.69 9.957C.606 9.752.554 9.5.527 9.107.5 8.71.5 8.206.5 7.5v-3z",
    fill: "#F5F5F5",
    stroke: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M9.5 4.207V4.5H7A1.5 1.5 0 015.5 3V.5h.293L9.5 4.207z",
    fill: "#F5F5F5",
    stroke: "#999"
  }));
};
const LayerVectorIcon$1 = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 2c0 .5523.4477 1 1 1s1-.4477 1-1-.4477-1-1-1-1 .4477-1 1zm-.9192.5645C8.3244 3.3942 9.0915 4 10 4c1.1046 0 2-.8954 2-2s-.8954-2-2-2c-.9533 0-1.7508.667-1.9514 1.5598-3.3814.428-6.0608 3.1074-6.4888 6.4888C.667 8.2491 0 9.0466 0 10c0 1.1046.8954 2 2 2s2-.8954 2-2c0-.9085-.6058-1.6756-1.4355-1.9192.404-2.8543 2.662-5.1123 5.5163-5.5163zM2 9c-.5523 0-1 .4477-1 1s.4477 1 1 1 1-.4477 1-1-.4477-1-1-1z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M0 10c0-1.1046.8954-2 2-2s2 .8954 2 2-.8954 2-2 2-2-.8954-2-2z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 10c0 .5523.4477 1 1 1s1-.4477 1-1-.4477-1-1-1-1 .4477-1 1zm1-2c-1.1046 0-2 .8954-2 2s.8954 2 2 2 2-.8954 2-2-.8954-2-2-2z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M8 2c0-1.1046.8954-2 2-2s2 .8954 2 2-.8954 2-2 2-2-.8954-2-2z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 2c0 .5523.4477 1 1 1s1-.4477 1-1-.4477-1-1-1-1 .4477-1 1zm1-2C8.8954 0 8 .8954 8 2s.8954 2 2 2 2-.8954 2-2-.8954-2-2-2z",
    fill: "#999"
  }));
};
const LayerTextIcon$1 = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M0 4.5c0-1.3978 0-2.0967.2284-2.648A3 3 0 011.852.2284C2.4032 0 3.1021 0 4.5 0h3c1.3978 0 2.0967 0 2.6481.2284a2.9999 2.9999 0 011.6235 1.6236C12 2.4032 12 3.1021 12 4.5v3c0 1.3978 0 2.0967-.2284 2.6481a2.9997 2.9997 0 01-1.6235 1.6235C9.5967 12 8.8978 12 7.5 12h-3c-1.3978 0-2.0967 0-2.648-.2284a2.9999 2.9999 0 01-1.6236-1.6235C0 9.5967 0 8.8978 0 7.5v-3z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7.5 1h-3c-.7126 0-1.197.0005-1.5734.0262-.3675.0251-.5585.0707-.692.126a2 2 0 00-1.0824 1.0824c-.0553.1335-.1009.3245-.126.692C1.0005 3.303 1 3.7874 1 4.5v3c0 .7126.0005 1.197.0262 1.5734.0251.3674.0707.5585.126.692.203.49.5924.8794 1.0824 1.0824.1335.0553.3245.1009.692.126C3.303 10.9995 3.7874 11 4.5 11h3c.7126 0 1.197-.0005 1.5734-.0262.3674-.0251.5585-.0707.692-.126.49-.203.8794-.5924 1.0824-1.0824.0553-.1335.1009-.3246.126-.692C10.9995 8.697 11 8.2126 11 7.5v-3c0-.7126-.0005-1.197-.0262-1.5734-.0251-.3675-.0707-.5585-.126-.692a2.0002 2.0002 0 00-1.0824-1.0824c-.1335-.0553-.3246-.1009-.692-.126C8.697 1.0005 8.2126 1 7.5 1zm-7.2716.852C0 2.4032 0 3.1021 0 4.5v3c0 1.3978 0 2.0967.2284 2.6481a2.9999 2.9999 0 001.6236 1.6235C2.4032 12 3.1021 12 4.5 12h3c1.3978 0 2.0967 0 2.6481-.2284a2.9997 2.9997 0 001.6235-1.6235C12 9.5967 12 8.8978 12 7.5v-3c0-1.3978 0-2.0967-.2284-2.648A2.9999 2.9999 0 0010.1481.2284C9.5967 0 8.8978 0 7.5 0h-3C3.1022 0 2.4033 0 1.852.2284A3 3 0 00.2284 1.852z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6 3a.5.5 0 01.4616.3077L8.8334 9H7.7501l-.4167-1H4.6668L4.25 9H3.1668l2.3717-5.6923A.5.5 0 016.0001 3zm-.9166 4h1.8334L6 4.8 5.0834 7z",
    fill: "#999"
  }));
};
const LayerImageIcon$1 = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7.5 1h-3c-.7126 0-1.197.0005-1.5734.0262-.3675.0251-.5585.0707-.692.126a2 2 0 00-1.0824 1.0824c-.0553.1335-.1009.3245-.126.692C1.0005 3.303 1 3.7874 1 4.5v3c0 .7126.0005 1.197.0262 1.5734.0251.3674.0707.5585.126.692.203.49.5924.8794 1.0824 1.0824.1335.0553.3245.1009.692.126C3.303 10.9995 3.7874 11 4.5 11h3c.7126 0 1.197-.0005 1.5734-.0262.3674-.0251.5585-.0707.692-.126.49-.203.8794-.5924 1.0824-1.0824.0553-.1335.1009-.3246.126-.692C10.9995 8.697 11 8.2126 11 7.5v-3c0-.7126-.0005-1.197-.0262-1.5734-.0251-.3675-.0707-.5585-.126-.692a2.0002 2.0002 0 00-1.0824-1.0824c-.1335-.0553-.3246-.1009-.692-.126C8.697 1.0005 8.2126 1 7.5 1zm-7.2716.852C0 2.4032 0 3.1021 0 4.5v3c0 1.3978 0 2.0967.2284 2.6481a2.9999 2.9999 0 001.6236 1.6235C2.4032 12 3.1021 12 4.5 12h3c1.3978 0 2.0967 0 2.6481-.2284a2.9997 2.9997 0 001.6235-1.6235C12 9.5967 12 8.8978 12 7.5v-3c0-1.3978 0-2.0967-.2284-2.648A2.9999 2.9999 0 0010.1481.2284C9.5967 0 8.8978 0 7.5 0h-3C3.1022 0 2.4033 0 1.852.2284A3 3 0 00.2284 1.852z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M5.2929 6.707l-3 3A1 1 0 002 10.4143V10.5c0 .5523.4477 1 1 1h5.864c1.4558 0 2.636-1.1802 2.636-2.636a.8787.8787 0 00-.2574-.6214l-.5355-.5355c-.3905-.3905-1.0237-.3905-1.4142 0L8.5 8.5 6.7071 6.707c-.3905-.3904-1.0237-.3904-1.4142 0z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.3536 7.0606a.5.5 0 00-.7072 0l-3 3a.5002.5002 0 00-.1464.3536V10.5a.5.5 0 00.5.5h5.864C10.0437 11 11 10.0436 11 8.864a.3787.3787 0 00-.1109-.2678l-.5355-.5356a.5.5 0 00-.7072 0l-1.7928 1.793-.7072-.7072L7.793 8.5 6.3535 7.0606zM8.5 7.793l.4393-.4394c.5858-.5858 1.5356-.5858 2.1214 0l.5355.5356c.2585.2585.4038.6092.4038.9748C12 10.596 10.5959 12 8.864 12H3c-.8284 0-1.5-.6716-1.5-1.5v-.0858c0-.3978.158-.7794.4393-1.0607l3-3c.5858-.5858 1.5356-.5858 2.1214 0L8.5 7.793z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M5 4c0 .5523-.4477 1-1 1s-1-.4477-1-1 .4477-1 1-1 1 .4477 1 1z",
    fill: "#999"
  }));
};
const LayerRectangleIcon$1 = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M0 4.5c0-1.3978 0-2.0967.2284-2.648A3 3 0 011.852.2284C2.4032 0 3.1021 0 4.5 0h3c1.3978 0 2.0967 0 2.6481.2284a2.9999 2.9999 0 011.6235 1.6236C12 2.4032 12 3.1021 12 4.5v3c0 1.3978 0 2.0967-.2284 2.6481a2.9997 2.9997 0 01-1.6235 1.6235C9.5967 12 8.8978 12 7.5 12h-3c-1.3978 0-2.0967 0-2.648-.2284a2.9999 2.9999 0 01-1.6236-1.6235C0 9.5967 0 8.8978 0 7.5v-3z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7.5 1h-3c-.7126 0-1.197.0005-1.5734.0262-.3675.0251-.5585.0707-.692.126a2 2 0 00-1.0824 1.0824c-.0553.1335-.1009.3245-.126.692C1.0005 3.303 1 3.7874 1 4.5v3c0 .7126.0005 1.197.0262 1.5734.0251.3674.0707.5585.126.692.203.49.5924.8794 1.0824 1.0824.1335.0553.3245.1009.692.126C3.303 10.9995 3.7874 11 4.5 11h3c.7126 0 1.197-.0005 1.5734-.0262.3674-.0251.5585-.0707.692-.126.49-.203.8794-.5924 1.0824-1.0824.0553-.1335.1009-.3246.126-.692C10.9995 8.697 11 8.2126 11 7.5v-3c0-.7126-.0005-1.197-.0262-1.5734-.0251-.3675-.0707-.5585-.126-.692a2.0002 2.0002 0 00-1.0824-1.0824c-.1335-.0553-.3246-.1009-.692-.126C8.697 1.0005 8.2126 1 7.5 1zm-7.2716.852C0 2.4032 0 3.1021 0 4.5v3c0 1.3978 0 2.0967.2284 2.6481a2.9999 2.9999 0 001.6236 1.6235C2.4032 12 3.1021 12 4.5 12h3c1.3978 0 2.0967 0 2.6481-.2284a2.9997 2.9997 0 001.6235-1.6235C12 9.5967 12 8.8978 12 7.5v-3c0-1.3978 0-2.0967-.2284-2.648A2.9999 2.9999 0 0010.1481.2284C9.5967 0 8.8978 0 7.5 0h-3C3.1022 0 2.4033 0 1.852.2284A3 3 0 00.2284 1.852z",
    fill: "#999"
  }));
};
const LayerSmartObjectIcon$1 = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M3 2c0-1.1046.8954-2 2-2h3l4 4v5c0 1.1046-.8954 2-2 2H5c-1.1046 0-2-.8954-2-2V2z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M7.5 1v2.5c0 .5523.4477 1 1 1h3",
    stroke: "#999"
  }), /*#__PURE__*/React$1.createElement("rect", {
    x: ".5",
    y: "6.5",
    width: "5",
    height: "5",
    rx: "1",
    fill: "#F5F5F5",
    stroke: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7 10h3c.5523 0 1-.4477 1-1V4.4142L7.5858 1H5c-.5523 0-1 .4477-1 1v3H3V2c0-1.1046.8954-2 2-2h3l4 4v5c0 1.1046-.8954 2-2 2H7v-1z",
    fill: "#999"
  }));
};
const LayerComponentIcon$1 = ({
  width = 14,
  height = 14
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M3.6035 10.3964c-.7703-.7703-1.3203-1.3212-1.7027-1.7924-.3768-.4644-.5535-.8078-.6167-1.1505a2.5001 2.5001 0 010-.907c.0632-.3427.2399-.6861.6167-1.1505.3824-.4712.9324-1.0221 1.7027-1.7925.7704-.7703 1.3213-1.3203 1.7925-1.7027.4644-.3768.8078-.5535 1.1505-.6167a2.5001 2.5001 0 01.907 0c.3427.0632.6861.2399 1.1505.6167.4712.3824 1.0221.9324 1.7924 1.7027.7704.7704 1.3204 1.3213 1.7028 1.7925.3768.4644.5535.8078.6167 1.1505a2.4997 2.4997 0 010 .907c-.0632.3427-.2399.6861-.6167 1.1505-.3824.4712-.9324 1.0221-1.7028 1.7924-.7703.7704-1.3212 1.3204-1.7924 1.7028-.4644.3768-.8078.5535-1.1505.6167a2.4997 2.4997 0 01-.907 0c-.3427-.0632-.6861-.2399-1.1505-.6167-.4712-.3824-1.0221-.9324-1.7925-1.7028zM10.5 3.5l-7 7M3.5 3.5l7 7",
    stroke: "#999"
  }));
};
const LayerMaskIcon$1 = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("rect", {
    width: "12",
    height: "12",
    rx: "6",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4 11.6586A5.9904 5.9904 0 006 12c3.3137 0 6-2.6863 6-6S9.3137 0 6 0a5.9903 5.9903 0 00-2 .3414C6.3304 1.1651 8 3.3876 8 6s-1.6696 4.8349-4 5.6586z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("rect", {
    x: ".5",
    y: ".5",
    width: "11",
    height: "11",
    rx: "5.5",
    stroke: "#999"
  }));
};
const LayerShapeModeUnionIcon$1 = ({
  width = 13,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 5H2c-.5523 0-1 .4477-1 1v5c0 .5523.4477 1 1 1h5c.5523 0 1-.4477 1-1V8h3c.5523 0 1-.4477 1-1V2c0-.5523-.4477-1-1-1H6c-.5523 0-1 .4477-1 1v3zM4 2c0-1.1046.8954-2 2-2h5c1.1046 0 2 .8954 2 2v5c0 1.1046-.8954 2-2 2H9v2c0 1.1046-.8954 2-2 2H2c-1.1046 0-2-.8954-2-2V6c0-1.1046.8954-2 2-2h2V2z",
    fill: "#999"
  }));
};
const LayerShapeModeSubtractIcon$1 = ({
  width = 13,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4 4H2C.8954 4 0 4.8954 0 6v5c0 1.1046.8954 2 2 2h5c1.1046 0 2-.8954 2-2V9H6c-1.1046 0-2-.8954-2-2V4z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("rect", {
    x: "4.5",
    y: ".5",
    width: "8",
    height: "8",
    rx: "1.5",
    stroke: "#999"
  }));
};
const LayerShapeModeIntersectIcon$1 = ({
  width = 13,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 5H2c-.5523 0-1 .4477-1 1v5c0 .5523.4477 1 1 1h5c.5523 0 1-.4477 1-1V8h3c.5523 0 1-.4477 1-1V2c0-.5523-.4477-1-1-1H6c-.5523 0-1 .4477-1 1v3zM4 2c0-1.1046.8954-2 2-2h5c1.1046 0 2 .8954 2 2v5c0 1.1046-.8954 2-2 2H9v2c0 1.1046-.8954 2-2 2H2c-1.1046 0-2-.8954-2-2V6c0-1.1046.8954-2 2-2h2V2z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 9H6c-1.1046 0-2-.8954-2-2V4h3c1.1046 0 2 .8954 2 2v3z",
    fill: "#999"
  }));
};
const LayerShapeModeExcludeIcon$1 = ({
  width = 13,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 9h2c1.1046 0 2-.8954 2-2V2c0-1.1046-.8954-2-2-2H6C4.8954 0 4 .8954 4 2v2H2C.8954 4 0 4.8954 0 6v5c0 1.1046.8954 2 2 2h5c1.1046 0 2-.8954 2-2V9zM5 5h2c.5523 0 1 .4477 1 1v2H6c-.5523 0-1-.4477-1-1V5z",
    fill: "#999"
  }));
};
const LayerItemIcon$1 = ({
  width = 11,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 11 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M5.0528 1.2236a1 1 0 01.8944 0l4 2a1 1 0 01.5528.8944v4.764a1 1 0 01-.5528.8944l-4 2a1.0004 1.0004 0 01-.8944 0l-4-2A1 1 0 01.5 8.882V4.118a1 1 0 01.5528-.8944l4-2z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4.8292.7764a1.5 1.5 0 011.3416 0l4 2A1.5 1.5 0 0111 4.118v4.764a1.5 1.5 0 01-.8292 1.3416l-4 2a1.5003 1.5003 0 01-1.3416 0l-4-2A1.5 1.5 0 010 8.882V4.118a1.5 1.5 0 01.8292-1.3416l4-2zm.8944.8944a.5.5 0 00-.4472 0l-4 2A.5.5 0 001 4.118v4.764a.5.5 0 00.2764.4472l4 2a.4999.4999 0 00.4472 0l4-2A.5.5 0 0010 8.882V4.118a.5.5 0 00-.2764-.4472l-4-2z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.382 3.5L5.5 5.441 1.618 3.5l-.3416.1708A.5.5 0 001 4.118v.191l4 2v4.882l.2764.1382a.4999.4999 0 00.4472 0L6 11.191V6.309l4-2v-.191a.5.5 0 00-.2764-.4472L9.382 3.5z",
    fill: "#999"
  }));
};
const LayerArtboardIcon$1 = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2.5 0a.5.5 0 01.5.5V2h6V.5a.5.5 0 011 0V2h1.5a.5.5 0 010 1H10v6h1.5a.5.5 0 010 1H10v1.5a.5.5 0 01-1 0V10H3v1.5a.5.5 0 01-1 0V10H.5a.5.5 0 010-1H2V3H.5a.5.5 0 010-1H2V.5a.5.5 0 01.5-.5zM9 9V3H3v6h6z",
    fill: "#999"
  }));
};
const LayerFXIcon$1 = ({
  width = 11,
  height = 7
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 11 7`
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M.314 7V.7h4.041v.891H1.268v1.926H3.86v.837H1.268V7H.314zM5.324 7l1.88-3.15L5.307.7h1.107l1.359 2.268L9.095.7h1.07l-1.88 3.123L10.184 7h-1.09L7.719 4.705 6.413 7h-1.09z",
    fill: "#333"
  }));
};
const LayerFilterIcon$1 = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 2h-.5c-.713 0-1.197 0-1.573.026-.368.025-.559.07-.692.126a2 2 0 00-1.083 1.083c-.055.133-.1.324-.126.692C1.001 4.303 1 4.787 1 5.5v2c0 .713 0 1.197.026 1.573.025.368.07.559.126.692a2 2 0 001.083 1.083c.133.055.324.1.692.126.376.025.86.026 1.573.026h2c.713 0 1.197 0 1.573-.026.368-.025.559-.07.692-.126a2 2 0 001.083-1.083c.055-.133.1-.324.126-.692.025-.376.026-.86.026-1.573V7h1v.5c0 1.398 0 2.097-.228 2.648a3 3 0 01-1.624 1.624C8.597 12 7.898 12 6.5 12h-2c-1.398 0-2.097 0-2.648-.228a3 3 0 01-1.624-1.624C0 9.597 0 8.898 0 7.5v-2c0-1.398 0-2.097.228-2.648a3 3 0 011.624-1.624C2.403 1 3.102 1 4.5 1H5v1z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M7 1c0 3.2-2.667 4-4 4 3.2 0 4 2.667 4 4 0-3.2 2.667-4 4-4-3.2 0-4-2.667-4-4z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M10 0c0 1.6-1.333 2-2 2 1.6 0 2 1.333 2 2 0-1.6 1.333-2 2-2-1.6 0-2-1.333-2-2z",
    fill: "#999"
  }));
};
const LayerVideoIcon$1 = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12"
  }, /*#__PURE__*/React$1.createElement("rect", {
    x: ".5",
    y: ".5",
    width: "11",
    height: "11",
    rx: "2.5",
    fill: "#F5F5F5",
    stroke: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M4 3.883v4.234a.5.5 0 00.757.429l3.528-2.117a.5.5 0 000-.858L4.757 3.454a.5.5 0 00-.757.43z",
    fill: "#999"
  }));
};
const RecentIcon$1 = ({
  width = 15,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 15 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 11c2.7614 0 5-2.2386 5-5s-2.2386-5-5-5-5 2.2386-5 5H3c0-3.3137 2.6863-6 6-6s6 2.6863 6 6-2.6863 6-6 6c-1.5132 0-2.8956-.5602-3.951-1.4845l.6584-.7526C6.587 10.5332 7.739 11 9 11zM8 3v3l1 1h2V6H9V3H8z",
    fill: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M.2929 5l2.8536 2.8536.3535.3535.3535-.3536L6.7072 5H5.293L4 6.2929V6a.5.5 0 00-1 0v.2929L1.7071 5H.293z",
    fill: "#333"
  }));
};

const ArrowLeftIcon$1 = ({
  width = 9,
  height = 7
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 9 7",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("path", {
    fill: "#31363A",
    fillRule: "evenodd",
    d: "M3.147.646a.5.5 0 01.707.708L2.207 3H8.5a.5.5 0 010 1H2.207l1.647 1.646a.5.5 0 11-.707.708l-2.5-2.5L.293 3.5l.354-.354 2.5-2.5z",
    clipRule: "evenodd"
  }));
};
const ArrowRightSecondIcon$1 = ({
  width = 5,
  height = 8
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 5 8",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M1 7l3-3-3-3",
    stroke: "#999",
    strokeLinecap: "round"
  }));
}; //TO Do : delete after test
const ThumbnailIcon$1 = ({
  width = 9,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 9 9",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("rect", {
    width: "8",
    height: "8",
    x: ".5",
    y: ".5",
    stroke: "#63676C",
    rx: "1.5"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#B6BABD",
    d: "M1 4.5h7M4.5 8V1"
  }));
};

var css_248z$M = ".shareButton-module_shareBtn__bxF0X {\n  width: 24px;\n  height: 24px;\n  background-color: #3399ff;\n  box-sizing: border-box;\n  outline: none;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 0;\n  cursor: pointer; }\n  .shareButton-module_shareBtn__bxF0X svg path:nth-child(1) {\n    fill: #ffffff; }\n  .shareButton-module_shareBtn__bxF0X svg path:nth-child(2) {\n    stroke: #ffffff; }\n";
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
  return /*#__PURE__*/React$1.createElement("button", {
    onClick: onClick,
    className: `${shareBtn} ${isActive ? active : ''} ${className ? className : ''}`,
    disabled: disable
  }, /*#__PURE__*/React$1.createElement(ToolsPanelShareIcon$1, null));
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
  return /*#__PURE__*/React$1.createElement("div", {
    onClick: onClick,
    className: `${toolbarZoom} ${isActive ? active : ''} ${className ? className : ''}`,
    disabled: disable
  });
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
  return /*#__PURE__*/React$1.createElement("nav", {
    className: `${topMenu}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: leftSide
  }, /*#__PURE__*/React$1.createElement(IconButton, null, /*#__PURE__*/React$1.createElement(ToolsPanelMenuIcon$1, null)), /*#__PURE__*/React$1.createElement("div", {
    className: breadcrumbs
  }, /*#__PURE__*/React$1.createElement("span", null, "Projects"), /*#__PURE__*/React$1.createElement("span", null, "/"), /*#__PURE__*/React$1.createElement("span", {
    className: style$G['active']
  }, "Social Media"))), /*#__PURE__*/React$1.createElement("div", {
    className: middleSide
  }, /*#__PURE__*/React$1.createElement(IconButton, null, /*#__PURE__*/React$1.createElement(PerspectiveIcon$1, null)), /*#__PURE__*/React$1.createElement(IconButton, null, /*#__PURE__*/React$1.createElement(WrapIcon$1, null)), /*#__PURE__*/React$1.createElement(IconButton, null, /*#__PURE__*/React$1.createElement(RemoveBGIcon$1, null))), /*#__PURE__*/React$1.createElement("div", {
    className: rightSide
  }, /*#__PURE__*/React$1.createElement(ShareButton, {
    className: shareBtn
  }), /*#__PURE__*/React$1.createElement(ToolbarZoom, null)));
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
  return /*#__PURE__*/React$1.createElement("hr", {
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
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${branding}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: header
  }, "Branding Components"), items.map((item, key) => /*#__PURE__*/React$1.createElement("div", {
    className: itemRow,
    key: key,
    onClick: () => onChangeValue(item)
  }, /*#__PURE__*/React$1.createElement("figure", {
    className: imageBox,
    style: {
      backgroundImage: `url(${item.imageUrl})`
    },
    alt: item.label
  }), /*#__PURE__*/React$1.createElement("div", {
    className: textBox
  }, /*#__PURE__*/React$1.createElement("div", {
    className: title
  }, item.label), /*#__PURE__*/React$1.createElement("div", {
    className: date
  }, item.date)))));
};

var css_248z$H = ".itemMenu-module_itemMenu__11Siw {\n  display: flex;\n  flex-direction: column;\n  padding: 0 8px;\n  background: #ffffff;\n  overflow: hidden;\n  cursor: pointer; }\n  .itemMenu-module_itemMenu__11Siw * {\n    user-select: none;\n    box-sizing: border-box;\n    font-family: Aktiv Grotesk, sans-serif; }\n  .itemMenu-module_itemMenu__11Siw.itemMenu-module_recentOpen__25U0G .itemMenu-module_itemWrapper__rSz22 {\n    height: 72px; }\n  .itemMenu-module_itemMenu__11Siw .itemMenu-module_itemWrapper__rSz22 {\n    width: 224px;\n    height: 48px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    border-bottom: 1px solid #e8ebed; }\n    .itemMenu-module_itemMenu__11Siw .itemMenu-module_itemWrapper__rSz22 .itemMenu-module_title__1f6Dn {\n      height: 32px;\n      width: 100%;\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 0 8px; }\n      .itemMenu-module_itemMenu__11Siw .itemMenu-module_itemWrapper__rSz22 .itemMenu-module_title__1f6Dn .itemMenu-module_svgBox__3wB0j svg path {\n        stroke: #b6babd; }\n      .itemMenu-module_itemMenu__11Siw .itemMenu-module_itemWrapper__rSz22 .itemMenu-module_title__1f6Dn label {\n        cursor: pointer;\n        width: 200px;\n        height: 24px;\n        font-weight: 600;\n        font-size: 11px;\n        line-height: 24px;\n        display: flex;\n        align-items: center;\n        color: #31363a;\n        user-select: none; }\n  .itemMenu-module_itemMenu__11Siw .itemMenu-module_recentBox__2AImV {\n    display: flex;\n    height: 24px; }\n    .itemMenu-module_itemMenu__11Siw .itemMenu-module_recentBox__2AImV .itemMenu-module_recentIcon__10Ur1 {\n      display: flex;\n      width: 24px;\n      justify-content: center;\n      align-items: center; }\n      .itemMenu-module_itemMenu__11Siw .itemMenu-module_recentBox__2AImV .itemMenu-module_recentIcon__10Ur1 svg path:first-child {\n        fill: #999999; }\n    .itemMenu-module_itemMenu__11Siw .itemMenu-module_recentBox__2AImV label {\n      width: 24px;\n      font-weight: 600;\n      font-size: 9px;\n      display: flex;\n      align-items: center;\n      letter-spacing: 0.01em;\n      text-transform: uppercase;\n      color: #b6babd;\n      width: 100%;\n      box-sizing: border-box;\n      padding-top: 8px;\n      user-select: none; }\n    .itemMenu-module_itemMenu__11Siw .itemMenu-module_recentBox__2AImV .itemMenu-module_recentItems__5VCoX {\n      display: flex;\n      flex-direction: row;\n      flex-wrap: wrap;\n      box-sizing: border-box; }\n      .itemMenu-module_itemMenu__11Siw .itemMenu-module_recentBox__2AImV .itemMenu-module_recentItems__5VCoX span {\n        user-select: none;\n        font-size: 11px;\n        line-height: 16px;\n        padding: 4px 8px;\n        min-width: 24px;\n        max-width: 78px;\n        height: 24px;\n        background: #f2f4f5;\n        border-radius: 8px;\n        margin: 0 5px 4px 0;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis; }\n  .itemMenu-module_itemMenu__11Siw:hover .itemMenu-module_itemWrapper__rSz22 .itemMenu-module_svgBox__3wB0j svg path {\n    stroke: #31363a; }\n";
var style$D = {"itemMenu":"itemMenu-module_itemMenu__11Siw","recentOpen":"itemMenu-module_recentOpen__25U0G","itemWrapper":"itemMenu-module_itemWrapper__rSz22","title":"itemMenu-module_title__1f6Dn","svgBox":"itemMenu-module_svgBox__3wB0j","recentBox":"itemMenu-module_recentBox__2AImV","recentIcon":"itemMenu-module_recentIcon__10Ur1","recentItems":"itemMenu-module_recentItems__5VCoX"};
styleInject(css_248z$H);

const ItemMenu = ({
  item: {
    label,
    value,
    recent
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
    recentItems,
    recentIcon
  } = style$D;
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${itemMenu} ${recent ? recentOpen : ''}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: itemWrapper,
    onClick: () => onClick({
      value,
      label
    })
  }, /*#__PURE__*/React$1.createElement("div", {
    className: title
  }, /*#__PURE__*/React$1.createElement("label", null, label), /*#__PURE__*/React$1.createElement("div", {
    className: svgBox
  }, /*#__PURE__*/React$1.createElement(ArrowRightSecondIcon$1, null))), recent && /*#__PURE__*/React$1.createElement("div", {
    className: recentBox
  }, /*#__PURE__*/React$1.createElement("div", {
    className: recentIcon
  }, /*#__PURE__*/React$1.createElement(RecentIcon$1, null)), /*#__PURE__*/React$1.createElement("div", {
    className: recentItems
  }, recent.map((item, key) => /*#__PURE__*/React$1.createElement("span", {
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
  return /*#__PURE__*/React$1.createElement("div", {
    className: illustrationsItems
  }, /*#__PURE__*/React$1.createElement("div", {
    className: row
  }, /*#__PURE__*/React$1.createElement("div", {
    className: image,
    style: {
      backgroundImage: `url(${imageUrl})`
    }
  }), /*#__PURE__*/React$1.createElement("div", {
    className: titleTagWrapper,
    onClick: () => onChangeValue(label)
  }, /*#__PURE__*/React$1.createElement("label", null, label), /*#__PURE__*/React$1.createElement("div", {
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
  const [stockPhotoItemsDetailsData, setStockPhotoItemsDataDetails] = useState(null);

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

  useEffect(() => {
    if (activeMenu.action === null) setStockPhotoItemsDataDetails(null);
  }, [activeMenu]);
  return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, activeMenu.action === 'illustrations' && /*#__PURE__*/React$1.createElement(Wrapper$2, null, /*#__PURE__*/React$1.createElement("div", {
    className: stockPhotoItems
  }, illustrationItemsData.map((item, key) => /*#__PURE__*/React$1.createElement(IllustrationsItems, {
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
  return /*#__PURE__*/React$1.createElement(Scrollbars, {
    autoHide: true,
    style: {
      height: '100%'
    },
    className: scrollWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
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
  return /*#__PURE__*/React$1.createElement(Scrollbars, {
    autoHide: true,
    style: {
      height: '100%'
    },
    className: scrollWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${stockPhotoItemsDetailsWrapper}`
  }, items.map((item, key) => /*#__PURE__*/React$1.createElement("img", {
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
  return /*#__PURE__*/React$1.createElement("div", {
    className: stockPhotoItems,
    onClick: () => onChangeValue(label)
  }, /*#__PURE__*/React$1.createElement("div", {
    className: row
  }, /*#__PURE__*/React$1.createElement("div", {
    className: stockPhotoImage,
    style: styleImage
  }), /*#__PURE__*/React$1.createElement("div", {
    className: titleTagWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    className: titleWrapper
  }, /*#__PURE__*/React$1.createElement("label", null, label), /*#__PURE__*/React$1.createElement("div", {
    className: svgBox
  }, /*#__PURE__*/React$1.createElement(ArrowRightSecondIcon$1, null))), /*#__PURE__*/React$1.createElement("div", {
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
  const [stockPhotoItemsDetailsData, setStockPhotoItemsDataDetails] = useState(null);

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

  useEffect(() => {
    if (activeMenu.action === null) setStockPhotoItemsDataDetails(null);
  }, [activeMenu]);
  return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, activeMenu.action === 'stockPhotos' && /*#__PURE__*/React$1.createElement(Wrapper$1, null, /*#__PURE__*/React$1.createElement("div", {
    className: stockPhotoItems
  }, stockPhotoItemsData.map((item, key) => /*#__PURE__*/React$1.createElement(StockPhotoItems, {
    key: key,
    item: item,
    onChangeValue: selectedStockPhotoItem => clickOnStockPhotoItem(selectedStockPhotoItem)
  })))), stockPhotoItemsDetailsData && activeMenu.action !== 'stockPhotos' && /*#__PURE__*/React$1.createElement(StockPhotoItemsDetails, {
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
  return /*#__PURE__*/React$1.createElement(Scrollbars, {
    autoHide: true,
    style: {
      height: '100%'
    },
    className: scrollWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${stockPhoto}`
  }, children));
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
  }, /*#__PURE__*/React.createElement(Tooltip, {
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
  const [viewSwitch, setViewSwitch] = useState(true);
  const [topFrontFilter, setTopFrontFilter] = useState('top');
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${addMenuItemsDetails}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: filterViewWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    className: filter
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${filterItem} ${topFrontFilter === 'top' ? style$w['selected'] : ''}`,
    onClick: () => setTopFrontFilter('top')
  }, /*#__PURE__*/React$1.createElement("label", null, "Top View")), /*#__PURE__*/React$1.createElement("div", {
    className: `${filterItem} ${topFrontFilter === 'front' ? style$w['selected'] : ''}`,
    onClick: () => setTopFrontFilter('front')
  }, /*#__PURE__*/React$1.createElement("label", null, "Front View"))), /*#__PURE__*/React$1.createElement("div", {
    className: switchView
  }, viewSwitch ? /*#__PURE__*/React$1.createElement(IconButton, {
    size: "small",
    type: "secondary",
    onClick: () => setViewSwitch(false)
  }, /*#__PURE__*/React$1.createElement(ListIcon$1, null)) : /*#__PURE__*/React$1.createElement(IconButton, {
    size: "small",
    type: "secondary",
    onClick: () => setViewSwitch(true)
  }, /*#__PURE__*/React$1.createElement(ThumbnailIcon$1, {
    onClick: () => setViewSwitch(true)
  })))), /*#__PURE__*/React$1.createElement(Scrollbars, {
    autoHide: true,
    style: {
      minHeight: 100
    },
    className: scrollWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${itemsWrapper} ${topFrontFilter === 'front' && !viewSwitch ? columnReverse : ''} ${topFrontFilter === 'front' && viewSwitch ? rowReverse : ''}`
  }, viewSwitch ? items.map(menuItem => /*#__PURE__*/React$1.createElement(Tooltips, {
    title: menuItem.details,
    followCursor: true,
    key: menuItem.id
  }, /*#__PURE__*/React$1.createElement("div", {
    className: thumbnailView
  }, /*#__PURE__*/React$1.createElement("div", {
    className: imageBox,
    style: {
      backgroundImage: `url(${menuItem.imageUrl})`
    }
  })))) : items.map(menuItem => /*#__PURE__*/React$1.createElement("div", {
    className: listView,
    key: menuItem.id
  }, /*#__PURE__*/React$1.createElement("div", {
    className: imageBox,
    style: {
      backgroundImage: `url(${menuItem.imageUrl})`
    }
  }), /*#__PURE__*/React$1.createElement("div", {
    className: itemLabel
  }, /*#__PURE__*/React$1.createElement("label", null, menuItem.label)))))));
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
  return /*#__PURE__*/React$1.createElement("div", {
    className: mockupItems,
    onClick: () => onChangeValue(label)
  }, /*#__PURE__*/React$1.createElement("div", {
    className: row
  }, /*#__PURE__*/React$1.createElement("div", {
    className: mockupImage,
    style: styleImage
  }), /*#__PURE__*/React$1.createElement("div", {
    className: titleTagWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    className: titleWrapper
  }, /*#__PURE__*/React$1.createElement("label", null, label), /*#__PURE__*/React$1.createElement("div", {
    className: svgBox
  }, /*#__PURE__*/React$1.createElement(ArrowRightSecondIcon$1, null))), /*#__PURE__*/React$1.createElement("div", {
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
  const [mockupItemsDetails, setMockupItemsDetails] = useState(null);

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

  useEffect(() => {
    if (activeMenu.action === null) setMockupItemsDetails(null);
  }, [activeMenu]);
  return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, activeMenu.action === 'mockups' && /*#__PURE__*/React$1.createElement(Wrapper, null, /*#__PURE__*/React$1.createElement("div", {
    className: mockupItems
  }, mockupItemsData.map((item, key) => /*#__PURE__*/React$1.createElement(MockupItems, {
    key: key,
    item: item,
    onChangeValue: selectedMockupItem => clickOnMockupItem(selectedMockupItem)
  })))), mockupItemsDetails && activeMenu.action !== 'mockups' && /*#__PURE__*/React$1.createElement(MockupItemsDetails, {
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
  return /*#__PURE__*/React$1.createElement(Scrollbars, {
    autoHide: true,
    style: {
      height: '100%'
    },
    className: scrollWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
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
  return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, activeMenu.action === 'filters' && /*#__PURE__*/React$1.createElement("div", {
    className: filters
  }, /*#__PURE__*/React$1.createElement("div", {
    className: filterWrapper
  }, items$1.map((item, key) => /*#__PURE__*/React$1.createElement("div", {
    className: imageWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    key: key,
    onClick: () => onChangeValue(item),
    className: image,
    style: {
      backgroundImage: `url(${item.imageUrl})`
    }
  }))))));
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
  return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, activeMenu.action === 'artboard' && /*#__PURE__*/React$1.createElement("div", {
    className: artboardsItems
  }, items.map((item, key) => /*#__PURE__*/React$1.createElement(Row, {
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
  const [isCollapse, setIsCollapse] = useState(false);
  return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, /*#__PURE__*/React$1.createElement("div", {
    key: key,
    className: `${row} ${isCollapse ? collapse : ''}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: titleRow,
    onClick: () => setIsCollapse(!isCollapse)
  }, /*#__PURE__*/React$1.createElement("div", {
    className: svgBox
  }, /*#__PURE__*/React$1.createElement(ArrowRightSecondIcon$1, null)), /*#__PURE__*/React$1.createElement("label", {
    onClick: () => onClick(item)
  }, item.label)), /*#__PURE__*/React$1.createElement("div", {
    className: itemDetails
  }, item.value === 'textStyle' && /*#__PURE__*/React$1.createElement(TextStyle, _extends({
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
  return /*#__PURE__*/React$1.createElement("div", {
    key: key,
    className: textStyleWrapper
  }, item.contents.map(({
    title,
    fontFamily,
    fontSize,
    fontWeight
  }, key) => /*#__PURE__*/React$1.createElement("div", {
    className: textStyleItem,
    key: key,
    onClick: () => onChangeValue({
      title,
      fontFamily,
      fontSize,
      fontWeight
    })
  }, /*#__PURE__*/React$1.createElement("label", null, /*#__PURE__*/React$1.createElement("span", null, title), /*#__PURE__*/React$1.createElement("span", null, `${fontFamily.replace('-', ' ')} , ${fontWeight} , ${fontSize}`)), /*#__PURE__*/React$1.createElement("h1", {
    style: {
      fontFamily,
      fontSize,
      fontWeight
    }
  }, "Header"))), /*#__PURE__*/React$1.createElement("div", {
    className: uploadNewFont
  }, /*#__PURE__*/React$1.createElement("span", null, "Upload New Font"), /*#__PURE__*/React$1.createElement("div", {
    className: svgBox
  }, /*#__PURE__*/React$1.createElement(PlusIcon$1, null))));
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
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [breadcrumb, setBreadcrumb] = useState([{
    label: 'Add',
    action: null
  }]);
  const [activeMenu, setActiveMenu] = useState({
    label: 'Add',
    action: null,
    back: [null, 'Add'] //0 -> Action 1-Label,

  });
  const itemsDate = [{
    label: 'Mockups',
    value: 'mockups',
    recent: [{
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
    recent: [{
      id: getUnique(),
      label: 'Unsplash'
    }, {
      id: getUnique(),
      label: 'Shutterstock'
    }]
  }, {
    label: 'Illustrations & Graphics',
    value: 'illustrations',
    recent: [{
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

  useEffect(() => {
    console.log('BREADCRUMB', breadcrumb);
  }, [breadcrumb]);
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${addMenu}`,
    style: styles
  }, /*#__PURE__*/React$1.createElement(React$1.Fragment, null, /*#__PURE__*/React$1.createElement("div", {
    className: header
  }, isSearch ? /*#__PURE__*/React$1.createElement(Input, {
    value: search,
    onChangValue: setSearch,
    setValue: setSearch,
    size: "noStyle",
    type: "string",
    className: searchInput,
    placeholder: "Search"
  }) : /*#__PURE__*/React$1.createElement(React$1.Fragment, null, activeMenu.action && /*#__PURE__*/React$1.createElement("div", {
    className: backBtn,
    onClick: () => goToPreventMenu()
  }, /*#__PURE__*/React$1.createElement(ArrowLeftIcon$1, null)), /*#__PURE__*/React$1.createElement("label", {
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
  , /*#__PURE__*/React$1.createElement("div", {
    className: `${btnAction}`
  }, isSearch && /*#__PURE__*/React$1.createElement(IconButton, {
    className: crossIcon,
    onClick: () => setIsSearch(false)
  }, /*#__PURE__*/React$1.createElement(CrossIcon$1, null)), /*#__PURE__*/React$1.createElement(IconButton, {
    className: searchIcon,
    onClick: () => setIsSearch(true)
  }, /*#__PURE__*/React$1.createElement(SearchIcon$1, null)))), /*#__PURE__*/React$1.createElement(Mockup, _extends({
    onChangeValue: val => {
      console.log(val);
    }
  }, {
    activeMenu,
    setActiveMenu,
    setBreadcrumb,
    breadcrumb
  })), /*#__PURE__*/React$1.createElement(StockPhotos, _extends({
    onChangeValue: val => {
      console.log(val);
    }
  }, {
    activeMenu,
    setActiveMenu
  })), /*#__PURE__*/React$1.createElement(Illustrations, _extends({
    onChangeValue: val => {
      console.log(val);
    }
  }, {
    activeMenu,
    setActiveMenu
  })), /*#__PURE__*/React$1.createElement(Filters, _extends({
    onChangeValue: val => {
      console.log(val);
    }
  }, {
    activeMenu
  })), /*#__PURE__*/React$1.createElement(ArtboardsItems, _extends({
    onChangeValue: val => {
      console.log(val);
    }
  }, {
    activeMenu
  })), !activeMenu.action && /*#__PURE__*/React$1.createElement("div", {
    className: items
  }, itemsDate.map((item, key) => /*#__PURE__*/React$1.createElement(ItemMenu, {
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
  })), /*#__PURE__*/React$1.createElement(Branding, {
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

var css_248z$t = ".menu-module_wrapper__1oE4p {\n  width: 103px;\n  background: #ffffff;\n  box-shadow: 0px 0.5px 1px rgba(0, 4, 8, 0.12), 0px 8px 16px -8px rgba(0, 4, 8, 0.08);\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: 4px;\n  z-index: 1; }\n  .menu-module_wrapper__1oE4p * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none; }\n  .menu-module_wrapper__1oE4p .menu-module_itemWrapper__XH8o1 {\n    height: 32px;\n    display: flex;\n    justify-content: left;\n    align-items: center; }\n    .menu-module_wrapper__1oE4p .menu-module_itemWrapper__XH8o1 .menu-module_icon__1UDld {\n      width: 32px;\n      height: 32px;\n      display: flex;\n      align-items: center;\n      justify-content: center; }\n    .menu-module_wrapper__1oE4p .menu-module_itemWrapper__XH8o1 label {\n      font-size: 11px;\n      color: #333333; }\n    .menu-module_wrapper__1oE4p .menu-module_itemWrapper__XH8o1.menu-module_isActive__36we2, .menu-module_wrapper__1oE4p .menu-module_itemWrapper__XH8o1:hover {\n      background: #f5f5f5;\n      border-radius: 6px; }\n";
var style$q = {"wrapper":"menu-module_wrapper__1oE4p","itemWrapper":"menu-module_itemWrapper__XH8o1","icon":"menu-module_icon__1UDld","isActive":"menu-module_isActive__36we2"};
styleInject(css_248z$t);

const Menu = ({
  children,
  onClick = () => {},
  styles
}) => {
  const {
    wrapper
  } = style$q;
  return /*#__PURE__*/React$1.createElement("div", {
    className: `menu ${wrapper}`,
    style: styles,
    onClick: onClick
  }, children);
};
const Item = ({
  children,
  active,
  onClick = () => {},
  styles
}) => {
  const {
    itemWrapper,
    isActive
  } = style$q;
  return /*#__PURE__*/React$1.createElement("div", {
    style: styles,
    className: `item ${itemWrapper} ${active ? isActive : ''}`,
    onClick: onClick
  }, children);
};

var css_248z$s = ".icon-module_wrapper__2fD9z {\n  box-sizing: border-box;\n  cursor: pointer;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n";
var style$p = {"wrapper":"icon-module_wrapper__2fD9z"};
styleInject(css_248z$s);

const Icon = ({
  children,
  onClick = () => {},
  className = null,
  styles
}) => {
  const {
    wrapper
  } = style$p;
  return /*#__PURE__*/React$1.createElement("div", {
    className: `icon ${wrapper} ${className ? className : ''}`,
    style: styles,
    onClick: onClick
  }, children);
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
  return /*#__PURE__*/React$1.createElement("ul", {
    className: `${options}`,
    style: styles,
    ref: ref
  }, data.map((item, key) => /*#__PURE__*/React$1.createElement(Fragment, {
    key: key
  }, /*#__PURE__*/React$1.createElement("li", null, item.component ? /*#__PURE__*/React$1.createElement("div", {
    className: `${row} ${component}`,
    style: {
      height: 'auto'
    }
  }, item.component) : /*#__PURE__*/React$1.createElement("div", {
    className: `${row} ${normal}`,
    onClick: () => onItemClick(item)
  }, /*#__PURE__*/React$1.createElement("span", null, item.label), item.shortcut && /*#__PURE__*/React$1.createElement("span", {
    className: shortcut
  }, item.shortcut[isMacOs() ? 1 : 0]), item.subMenu ? /*#__PURE__*/React$1.createElement(ChevronArrowIcon$1, null) : null)), item.divider ? /*#__PURE__*/React$1.createElement("li", {
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
  return /*#__PURE__*/React$1.createElement("div", {
    className: colorsActionInMenu
  }, /*#__PURE__*/React$1.createElement("div", {
    className: title
  }, "Label"), /*#__PURE__*/React$1.createElement("div", {
    className: colorsActionWrapper
  }, colors.map((item, key) => /*#__PURE__*/React$1.createElement("div", {
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
  return /*#__PURE__*/React$1.createElement("div", {
    className: creator
  }, /*#__PURE__*/React$1.createElement("div", {
    className: image,
    style: imageStyle
  }), /*#__PURE__*/React$1.createElement("div", {
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

var css_248z$o = ".layers-module_layers__fa5p7 {\n  height: 100%;\n  padding: 0px 8px;\n  display: flex;\n  flex-direction: column;\n  justify-content: left;\n  z-index: 1;\n  overflow-x: hidden; }\n  .layers-module_layers__fa5p7 * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none; }\n  .layers-module_layers__fa5p7 .layers-module_header__1Yi9U {\n    width: 224px;\n    height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: start;\n    padding: 8px; }\n    .layers-module_layers__fa5p7 .layers-module_header__1Yi9U label {\n      width: 38px;\n      height: 16px;\n      font-size: 12px;\n      line-height: 16px;\n      font-weight: 600;\n      display: flex;\n      align-items: center;\n      color: #333333; }\n  .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD {\n    height: 100%; }\n    .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP {\n      position: relative;\n      width: 100%;\n      height: 32px;\n      display: flex;\n      box-sizing: border-box;\n      align-items: center;\n      overflow: hidden;\n      border-radius: 8px;\n      justify-content: stretch;\n      z-index: 5; }\n      .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF {\n        position: relative;\n        display: flex;\n        align-items: center;\n        height: 32px;\n        width: 100%;\n        height: 16px; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF .layers-module_textLayerTitle__3KQbJ {\n          display: flex;\n          align-items: baseline; }\n          .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF .layers-module_textLayerTitle__3KQbJ .layers-module_collapseIcon__oATlJ {\n            position: relative;\n            z-index: 300;\n            padding: 8px; }\n            .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF .layers-module_textLayerTitle__3KQbJ .layers-module_collapseIcon__oATlJ svg {\n              margin: 0; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF svg {\n          margin-left: 7px; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF::before {\n          content: '';\n          width: 2px;\n          height: 16px;\n          border-radius: 2px;\n          display: flex;\n          background-color: transparent; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_transparent__2xG7P::before {\n          background-color: transparent; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_blue__1XzYO::before {\n          background-color: #3399ff; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_purple__BNpxO::before {\n          background-color: #b555e5; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_red__3pWd0::before {\n          background-color: #ff3b30; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_orange__ff6Qs::before {\n          background-color: #ff9500; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_yellow__34pXd::before {\n          background-color: #ffcc00; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_green__1MNgt::before {\n          background-color: #34c759; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF.layers-module_active__RVs_S::before {\n          background-color: #ff3b30; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF label {\n          font-size: 11px;\n          line-height: 16px;\n          display: flex;\n          align-items: center;\n          color: #333333;\n          margin-left: 10px; }\n          .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF label > svg {\n            transition: all 0.2s ease;\n            transform: rotate(0deg); }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerTextIconWrapper__DikOF input {\n          font-size: 11px;\n          line-height: 16px;\n          display: flex;\n          align-items: center;\n          color: #333333;\n          margin-left: 8px;\n          border: 0; }\n      .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP:hover .layers-module_layerActionWrapper___guEN {\n        opacity: 1; }\n      .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerActionWrapper___guEN {\n        display: flex;\n        align-items: center;\n        position: absolute;\n        opacity: 0;\n        transition: opacity 0.1s;\n        justify-content: flex-end;\n        width: 72px;\n        transition: opacity 0.1s;\n        z-index: 150; }\n        .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP .layers-module_layerActionWrapper___guEN .layers-module_layerIconBtn__3CrpY {\n          align-items: center;\n          justify-content: center;\n          display: flex;\n          width: 24px;\n          height: 32px; }\n      .layers-module_layers__fa5p7 .layers-module_layersWrapper__2k0XD .layers-module_layersItems__2X5fP:focus {\n        content: '';\n        border: 1px solid #ebebeb;\n        width: 224px;\n        height: 32px;\n        border-radius: 8px;\n        position: fixed;\n        left: 48px; }\n  .layers-module_layers__fa5p7 .layers-module_pagesWrapper__GrsPs {\n    box-sizing: border-box; }\n  .layers-module_layers__fa5p7 [type='text']:focus,\n  .layers-module_layers__fa5p7 [type='password']:focus,\n  .layers-module_layers__fa5p7 [type='number']:focus,\n  .layers-module_layers__fa5p7 [type='email']:focus,\n  .layers-module_layers__fa5p7 [type='search']:focus {\n    color: #31363a;\n    font-style: italic;\n    font-weight: 600; }\n";
var style$l = {"layers":"layers-module_layers__fa5p7","header":"layers-module_header__1Yi9U","layersWrapper":"layers-module_layersWrapper__2k0XD","layersItems":"layers-module_layersItems__2X5fP","layerTextIconWrapper":"layers-module_layerTextIconWrapper__DikOF","textLayerTitle":"layers-module_textLayerTitle__3KQbJ","collapseIcon":"layers-module_collapseIcon__oATlJ","transparent":"layers-module_transparent__2xG7P","blue":"layers-module_blue__1XzYO","purple":"layers-module_purple__BNpxO","red":"layers-module_red__3pWd0","orange":"layers-module_orange__ff6Qs","yellow":"layers-module_yellow__34pXd","green":"layers-module_green__1MNgt","active":"layers-module_active__RVs_S","layerActionWrapper":"layers-module_layerActionWrapper___guEN","layerIconBtn":"layers-module_layerIconBtn__3CrpY","pagesWrapper":"layers-module_pagesWrapper__GrsPs"};
styleInject(css_248z$o);

var css_248z$n = ".template_layers__3G1QW .template_rst__tree__SSUZj {\n  margin-left: -15px; }\n\n.template_layers__3G1QW .template_rst__lineHalfHorizontalRight__iLorV::before,\n.template_layers__3G1QW .template_rst__lineFullVertical__FliD6::after,\n.template_layers__3G1QW .template_rst__lineHalfVerticalTop__19PN9::after,\n.template_layers__3G1QW .template_rst__lineHalfVerticalBottom__1q18E::after {\n  display: none !important; }\n\n.template_layers__3G1QW .template_rst__lineHalfHorizontalRight__iLorV::before {\n  display: none !important; }\n\n.template_layers__3G1QW .template_rst__rtl__y6FjX.template_rst__lineHalfHorizontalRight__iLorV::before {\n  display: none !important; }\n\n.template_layers__3G1QW .template_ReactVirtualized__Grid__OD_o5.template_ReactVirtualized__List__2UndT.template_rst__virtualScrollOverride__KGLez {\n  overflow: hidden !important; }\n\n.template_layers__3G1QW .template_rst__highlightBottomLeftCorner__72Gss::before,\n.template_layers__3G1QW .template_rst__highlightBottomLeftCorner__72Gss::after,\n.template_layers__3G1QW .template_rst__rtl__y6FjX.template_rst__highlightBottomLeftCorner__72Gss::after,\n.template_layers__3G1QW .template_rst__highlightTopLeftCorner__2KlSi::before,\n.template_layers__3G1QW .template_rst__highlightLineVertical__3uK7u::before {\n  display: none; }\n\n.template_layers__3G1QW .template_rst__placeholder__15G35::before {\n  border: none; }\n\n.template_layers__3G1QW .template_rst__node__-qavO:hover::before {\n  content: '';\n  border: 1px solid #999999;\n  width: calc(100% - 16px);\n  height: 34px;\n  border-radius: 8px;\n  position: absolute;\n  left: 48px;\n  z-index: 1;\n  left: 15px; }\n\n.template_layers__3G1QW .template_law__rfL42 {\n  left: initial !important;\n  right: 0; }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(1) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 16px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(2) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 32px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(3) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 48px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(4) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 64px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(5) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 80px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(6) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 96px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(7) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 112px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(8) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 128px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(9) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 144px); }\n\n.template_layers__3G1QW .template_rst__node__-qavO .template_rst__lineBlock__2wMRA:nth-child(10) + .template_rst__nodeContent__19chm {\n  width: calc(100% - 160px); }\n";
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
  const [editTitle, setEditTitle] = useState(false);
  const [optionStyle, setOptionStyle] = useState({});
  const [toggleOption, setToggleOption] = useState(false); // editable row false by click outside.

  const labelEditWrapper = /*#__PURE__*/createRef();
  useEffect(() => {
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


  const optionWrapper = /*#__PURE__*/createRef();
  useEffect(() => {
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
    component: /*#__PURE__*/React$1.createElement(ColorsActionInMenu, {
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
    component: /*#__PURE__*/React$1.createElement(Creator, {
      onChange: optionAction,
      style: {
        height: 32
      }
    }),
    divider: false
  }];
  const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
  const isLandingPadActive = !didDrop && isDragging;
  return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, /*#__PURE__*/React$1.createElement("div", _extends({}, otherProps, {
    className: `${layersItems} ${node.selected ? layerSelected : ''}`,
    onContextMenu: e => handleClick(e)
  }), connectDragPreview(connectDragSource( /*#__PURE__*/React$1.createElement("div", {
    className: classnames$1(isLandingPadActive && 'rst__rowLandingPad', isLandingPadActive && !canDrop && 'rst__rowCancelPad', isSearchMatch && 'rst__rowSearchMatch', isSearchFocus && 'rst__rowSearchFocus', className),
    style: {
      opacity: isDraggedDescendant ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${layerTextIconWrapper} ${style$l[node.color]}`,
    onClick: () => onRowClick(node),
    onDoubleClick: () => {
      setEditTitle(true);
    }
  }, node.type === 'image' && /*#__PURE__*/React$1.createElement(LayerImageIcon$1, null), node.type === 'video' && /*#__PURE__*/React$1.createElement(LayerVideoIcon$1, null), node.type === 'shape' && /*#__PURE__*/React$1.createElement(LayerShapeModeUnionIcon$1, null), node.type === 'vector' && /*#__PURE__*/React$1.createElement(LayerVectorIcon$1, null), node.type === 'text' && /*#__PURE__*/React$1.createElement(LayerTextIcon$1, null), node.type === 'rectangle' && /*#__PURE__*/React$1.createElement(LayerRectangleIcon$1, null), node.type === 'mockupItem' && /*#__PURE__*/React$1.createElement(LayerItemIcon$1, null), node.type === 'artboard' && /*#__PURE__*/React$1.createElement(LayerArtboardIcon$1, null), node.type === 'file' && /*#__PURE__*/React$1.createElement(LayerFileIcon$1, null), node.type === 'group' && /*#__PURE__*/React$1.createElement(LayerFolderIcon$1, null), node.type === 'filter' && /*#__PURE__*/React$1.createElement(LayerFilterIcon$1, null), node.type === 'smartObject' && /*#__PURE__*/React$1.createElement(LayerSmartObjectIcon$1, null), node.type === 'component' && /*#__PURE__*/React$1.createElement(LayerComponentIcon$1, null), node.type === 'mask' && /*#__PURE__*/React$1.createElement(LayerMaskIcon$1, null), node.type === 'shapeModeSubtract' && /*#__PURE__*/React$1.createElement(LayerShapeModeSubtractIcon$1, null), node.type === 'shapeModeIntersect' && /*#__PURE__*/React$1.createElement(LayerShapeModeIntersectIcon$1, null), node.type === 'shapeModeExclude' && /*#__PURE__*/React$1.createElement(LayerShapeModeExcludeIcon$1, null), /*#__PURE__*/React$1.createElement("div", {
    className: textLayerTitle
  }, !editTitle ? /*#__PURE__*/React$1.createElement(React$1.Fragment, null, /*#__PURE__*/React$1.createElement("label", null, node.title), toggleChildrenVisibility && node.children && (node.children.length > 0 || typeof node.children === 'function') && /*#__PURE__*/React$1.createElement("div", {
    className: collapseIcon,
    type: "button",
    "aria-label": node.expanded ? 'Collapse' : 'Expand',
    onClick: () => toggleChildrenVisibility({
      node,
      path,
      treeIndex
    })
  }, /*#__PURE__*/React$1.createElement(ArrowRightSecondIcon$1, null))) : /*#__PURE__*/React$1.createElement("input", {
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
  })), /*#__PURE__*/React$1.createElement("div", {
    className: `law ${layerActionWrapper}`
  }, buttons.map((btn, index) => /*#__PURE__*/React$1.createElement(React$1.Fragment, {
    key: index
  }, btn)))), toggleOption ? /*#__PURE__*/React$1.createElement("div", {
    ref: optionWrapper
  }, /*#__PURE__*/React$1.createElement(Options, {
    data: options,
    styles: optionStyle,
    onItemClick: rowData => optionActionManager({
      row: rowData,
      rowInfo
    })
  })) : null);
};

class ArtboardStudioLayersTheme extends Component {
  render() {
    return /*#__PURE__*/React$1.createElement(RowItem$1, {
      data: this.props
    });
  }

}

const _defaultRow$1 = [{
  id: '14c92cb80-b738-4292-9562-841ca9fbcbb5',
  color: 'blue',
  type: 'image',
  title: 'Image',
  selected: true,
  volume: true,
  eye: true,
  lock: false
}, {
  id: '298e52b0a-e89f-0795f0e83870-9e33-0795f',
  color: 'purple',
  type: 'video',
  title: 'Video',
  selected: false,
  volume: true,
  eye: false,
  lock: true,
  isOpenChild: true,
  children: [{
    id: '117f3d2d9f-6e5c-40b1-9d29-b775ba0ea44',
    color: 'transparent',
    type: 'artboard',
    title: 'Artboard',
    selected: false,
    volume: true,
    eye: false,
    lock: true,
    isOpenChild: true
  }]
}];
const Layers = ({
  onChange = () => {},
  styles,
  rows = _defaultRow$1
}) => {
  const {
    layers,
    header,
    layersWrapper,
    layerIconBtn
  } = style$l;
  const [layerRows, setLayerRows] = useState({
    treeData: rows
  });
  const [copyRowInfo, setCopyRowInfo] = useState(false);

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
      let tree = changeNodeAtPath({
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
      treeData: addNodeUnderParent({
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
    let tree = changeNodeAtPath({
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
      let tree = changeNodeAtPath({
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

  return /*#__PURE__*/React$1.createElement("div", {
    style: styles,
    className: `${layers}`,
    onContextMenu: e => e.preventDefault()
  }, /*#__PURE__*/React$1.createElement("div", {
    className: header
  }, /*#__PURE__*/React$1.createElement("label", null, "Layers")), /*#__PURE__*/React$1.createElement("div", {
    className: `layers ${layersWrapper}`
  }, /*#__PURE__*/React$1.createElement(SortableTree, {
    rowHeight: 32,
    scaffoldBlockPxWidth: 16,
    isVirtualized: false,
    canDrop: canDrop,
    treeData: layerRows.treeData,
    generateNodeProps: (rowInfo, path) => ({
      buttons: [rowInfo.node.type === 'image' && /*#__PURE__*/React$1.createElement("div", {
        className: layerIconBtn
      }, /*#__PURE__*/React$1.createElement(LayerFXIcon$1, null)), rowInfo.node.type === 'video' && /*#__PURE__*/React$1.createElement("div", {
        className: layerIconBtn,
        onClick: () => updateNode(rowInfo, 'volume')
      }, rowInfo.node.volume ? /*#__PURE__*/React$1.createElement(VolumeOnIcon$1, null) : /*#__PURE__*/React$1.createElement(VolumeOffIcon$1, null)), /*#__PURE__*/React$1.createElement(React$1.Fragment, null, /*#__PURE__*/React$1.createElement("div", {
        className: layerIconBtn,
        onClick: () => updateNode(rowInfo, 'eye')
      }, rowInfo.node.eye ? /*#__PURE__*/React$1.createElement(EyeIcon$1, null) : /*#__PURE__*/React$1.createElement(EyeCloseIcon$1, null)), /*#__PURE__*/React$1.createElement("div", {
        className: layerIconBtn,
        onClick: () => updateNode(rowInfo, 'lock')
      }, rowInfo.node.lock ? /*#__PURE__*/React$1.createElement(LockedIcon$1, null) : /*#__PURE__*/React$1.createElement(LockIcon$1, null)))],
      onRowClick: row => onChange(row),
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
  })));
};

var css_248z$m = ".properties-module_properties__VrtKX {\n  font-family: aktiv-grotesk, sans-serif;\n  background-color: #ffffff;\n  box-sizing: border-box;\n  outline: none;\n  cursor: pointer;\n  border-radius: 6px;\n  display: flex;\n  align-items: end;\n  justify-content: center;\n  flex-direction: column;\n  width: 224px;\n  padding-top: 8px; }\n  .properties-module_properties__VrtKX .properties-module_radiusDetails__TWHfU {\n    display: flex;\n    flex-direction: column; }\n    .properties-module_properties__VrtKX .properties-module_radiusDetails__TWHfU div {\n      display: flex; }\n      .properties-module_properties__VrtKX .properties-module_radiusDetails__TWHfU div input {\n        width: 28px;\n        height: 32px;\n        border: 1px solid #e8ebed;\n        outline: none;\n        padding: 4px 8px; }\n  .properties-module_properties__VrtKX .properties-module_row__2wnPk {\n    display: flex;\n    align-items: flex-start;\n    justify-content: center;\n    margin-left: 8px;\n    margin-bottom: 8px; }\n    .properties-module_properties__VrtKX .properties-module_row__2wnPk > div {\n      margin-right: 8px; }\n    .properties-module_properties__VrtKX .properties-module_row__2wnPk > div:last-child {\n      margin-right: 0; }\n    .properties-module_properties__VrtKX .properties-module_row__2wnPk .properties-module_rowAction__3mqc2 {\n      display: flex;\n      align-items: center;\n      justify-content: center; }\n";
var style$k = {"properties":"properties-module_properties__VrtKX","radiusDetails":"properties-module_radiusDetails__TWHfU","row":"properties-module_row__2wnPk","rowAction":"properties-module_rowAction__3mqc2"};
styleInject(css_248z$m);

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
  } = style$k;
  const [x, setX] = useState(values.x);
  const [y, setY] = useState(values.y);
  const [xChanged, setXChanged] = useState(true);
  const [yChanged, setYChanged] = useState(true);
  const [w, setW] = useState(values.w);
  const [h, setH] = useState(values.h);
  const [wChanged, setWChanged] = useState(true);
  const [hChanged, setHChanged] = useState(true);
  const [whRatio, setWHRatio] = useState(1);
  const [radius, setRadius] = useState(values.radius);
  const [, setRadiusChanged] = useState(true);
  const [linkBtn, setLinkBtn] = useState(values.isLink);
  const [radiusBtn, setRadiusBtn] = useState(values.isRadius);
  const [radiusTop, setRadiusTop] = useState(values.radius);
  const [radiusBottom, setRadiusBottom] = useState(values.radius);
  const [radiusLeft, setRadiusLeft] = useState(values.radius);
  const [radiusRight, setRadiusRight] = useState(values.radius);
  const [position, setPosition] = useState(values.position);
  useEffect(() => {
    if (xChanged) {
      let _res;

      _res = {
        x: parseFloat(x)
      };
      if (onChange) onChange(_res);
      setXChanged(false);
    }
  }, [xChanged, x]);
  useEffect(() => {
    if (yChanged) {
      let _res;

      _res = {
        y: parseFloat(y)
      };
      if (onChange) onChange(_res);
      setYChanged(false);
    }
  }, [yChanged, y]);
  useEffect(() => {
    onChange({
      position: parseFloat(position)
    });
  }, [position]);
  useEffect(() => {
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
  useEffect(() => {
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
  useEffect(() => {
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
  useEffect(() => {
    let _res;

    _res = {
      top: parseFloat(radiusTop),
      left: parseFloat(radiusLeft),
      bottom: parseFloat(radiusBottom),
      right: parseFloat(radiusRight)
    };
    if (onChange) onChange(_res);
  }, [radiusTop, radiusBottom, radiusLeft, radiusRight]);
  useEffect(() => {
    setWHRatio(Math.abs(w / h));
    if (onChange) onChange({
      w: parseFloat(w),
      h: parseFloat(h)
    });
  }, [linkBtn]);
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${properties}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${row}`
  }, /*#__PURE__*/React$1.createElement(Input, {
    label: "X",
    value: x,
    setValue: setX,
    onChange: setXChanged
  }), /*#__PURE__*/React$1.createElement(Input, {
    label: "Y",
    value: y,
    setValue: setY,
    onChange: setYChanged
  }), /*#__PURE__*/React$1.createElement(Input, {
    label: "\xB0",
    value: position,
    setValue: setPosition,
    onChange: setPosition
  })), /*#__PURE__*/React$1.createElement("div", {
    className: `${row}`
  }, /*#__PURE__*/React$1.createElement(Input, {
    label: "W",
    value: w,
    setValue: setW,
    onChange: setWChanged
  }), /*#__PURE__*/React$1.createElement(Input, {
    label: "H",
    value: h,
    setValue: setH,
    onChange: setHChanged
  }), /*#__PURE__*/React$1.createElement("div", {
    className: `${rowAction}`
  }, /*#__PURE__*/React$1.createElement(IconButton, {
    isActive: linkBtn,
    onClick: () => setLinkBtn(!linkBtn)
  }, /*#__PURE__*/React$1.createElement(LinkIcon$1, null)))), /*#__PURE__*/React$1.createElement("div", {
    className: `${row}`
  }, /*#__PURE__*/React$1.createElement(Input, {
    value: radius,
    setValue: setRadius,
    onChange: setRadiusChanged
  }, /*#__PURE__*/React$1.createElement(RadiusIcon$1, {
    width: 8,
    height: 8
  })), /*#__PURE__*/React$1.createElement("div", {
    className: `${rowAction}`
  }, /*#__PURE__*/React$1.createElement(IconButton, {
    isActive: radiusBtn,
    onClick: () => setRadiusBtn(!radiusBtn)
  }, /*#__PURE__*/React$1.createElement(RadiusIcon$1, null)))));
};

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

var css_248z$l = ".template_pages__1jMos {\n  height: 100%; }\n  .template_pages__1jMos .template_rst__tree__1Bion {\n    margin-left: -15px; }\n  .template_pages__1jMos .template_rst__lineHalfHorizontalRight__3Twe5::before,\n  .template_pages__1jMos .template_rst__lineFullVertical__2cVYe::after,\n  .template_pages__1jMos .template_rst__lineHalfVerticalTop__mrC0u::after,\n  .template_pages__1jMos .template_rst__lineHalfVerticalBottom__37jIB::after {\n    display: none !important; }\n  .template_pages__1jMos .template_rst__lineHalfHorizontalRight__3Twe5::before {\n    display: none !important; }\n  .template_pages__1jMos .template_rst__rtl__2Mec1.template_rst__lineHalfHorizontalRight__3Twe5::before {\n    display: none !important; }\n  .template_pages__1jMos .template_ReactVirtualized__Grid__3VrLM.template_ReactVirtualized__List__3m4ch.template_rst__virtualScrollOverride__1BfFC {\n    overflow: hidden !important; }\n  .template_pages__1jMos .template_rst__highlightBottomLeftCorner__298To::before,\n  .template_pages__1jMos .template_rst__highlightBottomLeftCorner__298To::after,\n  .template_pages__1jMos .template_rst__rtl__2Mec1.template_rst__highlightBottomLeftCorner__298To::after,\n  .template_pages__1jMos .template_rst__highlightTopLeftCorner__35fXI::before,\n  .template_pages__1jMos .template_rst__highlightLineVertical__3Ab_H::before {\n    display: none; }\n  .template_pages__1jMos .template_rst__placeholder__208EO::before {\n    border: none; }\n  .template_pages__1jMos .template_rst__nodeContent__3orKy {\n    width: 100%; }\n";
styleInject(css_248z$l);

var css_248z$k = ".pages-module_pages__1NKWH {\n  position: relative;\n  z-index: 2;\n  justify-content: flex-start;\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  height: 100%; }\n  .pages-module_pages__1NKWH * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    cursor: pointer;\n    user-select: none; }\n  .pages-module_pages__1NKWH .pages-module_header__2TqxH {\n    width: 224px;\n    height: 40px;\n    display: flex;\n    border-top: 1px solid #f5f5f5;\n    align-items: center;\n    justify-content: space-between;\n    padding: 8px 0 8px 8px; }\n    .pages-module_pages__1NKWH .pages-module_header__2TqxH label {\n      width: 38px;\n      height: 16px;\n      font-size: 12px;\n      line-height: 16px;\n      font-weight: 600;\n      display: flex;\n      align-items: center;\n      color: #333333; }\n    .pages-module_pages__1NKWH .pages-module_header__2TqxH .pages-module_actionButton__3sh81 {\n      width: 32px;\n      height: 32px; }\n  .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W {\n    height: 100%;\n    overflow-x: hidden;\n    width: 240px; }\n    .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF {\n      width: calc(100% - 16px);\n      height: 32px;\n      padding: 8px 0 8px 8px;\n      display: flex;\n      align-items: center;\n      justify-content: left; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF::before {\n        content: '';\n        width: 2px;\n        height: 16px;\n        border-radius: 2px;\n        display: flex;\n        background-color: transparent;\n        margin-right: 5px; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_transparent__3qgyg::before {\n        background-color: transparent; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_blue__2gODu::before {\n        background-color: #3399ff; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_purple__m7hks::before {\n        background-color: #b555e5; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_red__wT5J7::before {\n        background-color: #ff3b30; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_orange__2_YOS::before {\n        background-color: #ff9500; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_yellow__24jeo::before {\n        background-color: #ffcc00; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_green__1j1qZ::before {\n        background-color: #34c759; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF.pages-module_active__7emcz::before {\n        background-color: #ff3b30; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF:hover {\n        border-radius: 8px;\n        background: #f5f5f5; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF .pages-module_pageName__18Uwq {\n        display: flex;\n        align-items: center; }\n        .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF .pages-module_pageName__18Uwq label {\n          color: #333333;\n          font-size: 11px;\n          line-height: 16px; }\n        .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF .pages-module_pageName__18Uwq input {\n          font-size: 11px;\n          line-height: 16px;\n          display: flex;\n          align-items: center;\n          color: #333333;\n          margin: -2px;\n          border: 0; }\n      .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF .pages-module_icon__3_8-9 {\n        width: 32px;\n        height: 32px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        box-sizing: #f5f5f5; }\n        .pages-module_pages__1NKWH .pages-module_pagesWrapper__v5A2W .pages-module_pageRowWrapper__1LcDF .pages-module_icon__3_8-9 svg {\n          stroke: #999999; }\n  .pages-module_pages__1NKWH [type='text']:focus,\n  .pages-module_pages__1NKWH [type='password']:focus,\n  .pages-module_pages__1NKWH [type='number']:focus,\n  .pages-module_pages__1NKWH [type='email']:focus,\n  .pages-module_pages__1NKWH [type='search']:focus {\n    color: #31363a;\n    font-style: normal;\n    font-weight: 600; }\n";
var style$j = {"pages":"pages-module_pages__1NKWH","header":"pages-module_header__2TqxH","actionButton":"pages-module_actionButton__3sh81","pagesWrapper":"pages-module_pagesWrapper__v5A2W","pageRowWrapper":"pages-module_pageRowWrapper__1LcDF","transparent":"pages-module_transparent__3qgyg","blue":"pages-module_blue__2gODu","purple":"pages-module_purple__m7hks","red":"pages-module_red__wT5J7","orange":"pages-module_orange__2_YOS","yellow":"pages-module_yellow__24jeo","green":"pages-module_green__1j1qZ","active":"pages-module_active__7emcz","pageName":"pages-module_pageName__18Uwq","icon":"pages-module_icon__3_8-9"};
styleInject(css_248z$k);

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
  } = style$j;
  const [editTitle, setEditTitle] = useState(false);
  const [optionStyle, setOptionStyle] = useState({});
  const [toggleOption, setToggleOption] = useState(false); // editable row false by click outside.

  const labelEditWrapper = /*#__PURE__*/createRef();
  useEffect(() => {
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


  const optionWrapper = /*#__PURE__*/createRef();
  useEffect(() => {
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
    component: /*#__PURE__*/React$1.createElement(ColorsActionInMenu, {
      onChange: color => optionActionManager({
        option: {
          field: color.field,
          value: color.value
        }
      })
    }),
    divider: false
  }];
  const isDraggedDescendant = draggedNode && isDescendant$1(draggedNode, node);
  const isLandingPadActive = !didDrop && isDragging;
  return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, /*#__PURE__*/React$1.createElement("div", otherProps, connectDragPreview(connectDragSource( /*#__PURE__*/React$1.createElement("div", {
    className: classnames(isLandingPadActive && 'rst__rowLandingPad', isLandingPadActive && !canDrop && 'rst__rowCancelPad', isSearchMatch && 'rst__rowSearchMatch', isSearchFocus && 'rst__rowSearchFocus', className),
    style: {
      opacity: isDraggedDescendant ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${pageRowWrapper}  ${style$j[node.color]} ${node.selected ? active : ''}`,
    onContextMenu: e => handleClick(e),
    onDoubleClick: () => {
      setEditTitle(node.id);
    },
    onClick: () => onRowClick(node)
  }, /*#__PURE__*/React$1.createElement(React$1.Fragment, null, /*#__PURE__*/React$1.createElement("div", {
    className: pageName
  }, editTitle !== node.id ? /*#__PURE__*/React$1.createElement("label", null, node.title) : /*#__PURE__*/React$1.createElement("input", {
    type: "text",
    value: node.title,
    onKeyDown: ArrowKeyUpDown,
    autoFocus: true,
    ref: labelEditWrapper,
    onChange: e => updateTitle({
      field: 'title',
      value: e.target.value
    })
  })), node.selected ? /*#__PURE__*/React$1.createElement("div", {
    className: icon
  }, /*#__PURE__*/React$1.createElement(CheckIcon$1, null)) : ''))), {
    dropEffect: 'copy'
  }))), toggleOption ? /*#__PURE__*/React$1.createElement("div", {
    ref: optionWrapper
  }, /*#__PURE__*/React$1.createElement(Options, {
    data: options,
    styles: optionStyle,
    onItemClick: field => optionActionManager({
      option: {
        field: field.actionName
      }
    })
  })) : null);
};

class ArtboardStudioPagesTheme extends Component {
  render() {
    return /*#__PURE__*/React$1.createElement(RowItem, {
      data: this.props
    });
  }

}

const _defaultRow = [{
  id: '14c92cb80-b738-4292-9562-841ca9fbcbb5',
  title: 'Page 1',
  selected: false,
  color: 'red'
}, {
  id: '298e52b0a-e89f-0795f0e83870-9e33-0795f',
  title: 'Page 1',
  selected: false,
  color: 'yellow'
}, {
  id: '3716ae080-1288-4a86-b740-62e217ea7c8d',
  title: 'Page 2',
  selected: false,
  color: 'blue'
}, {
  id: '42fb5d090-89f6-425c-9912-ee0d52dbbbfc',
  title: 'Page 3',
  selected: false,
  color: 'transparent'
}, {
  id: '598ff117a-2afb-4755-aff5-42fb7c018917',
  title: 'Page 4',
  selected: false,
  color: 'green'
}];
const Pages = ({
  onChange,
  setValue,
  rows = _defaultRow
}) => {
  const {
    pages,
    pagesWrapper,
    header,
    title,
    actionButton
  } = style$j;
  const [pagesRows, setPagesRows] = useState({
    treeData: rows
  });
  useState([]);

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
      let tree = changeNodeAtPath$1({
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
      let tree = changeNodeAtPath$1({
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
      let tree = removeNodeAtPath({
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

  return /*#__PURE__*/React$1.createElement("div", {
    className: `pages ${pages}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: header
  }, /*#__PURE__*/React$1.createElement("div", {
    className: title
  }, /*#__PURE__*/React$1.createElement("label", null, "Pages")), /*#__PURE__*/React$1.createElement("div", {
    className: actionButton
  }, /*#__PURE__*/React$1.createElement(IconButton, {
    onClick: () => optionAction({
      option: {
        field: 'new'
      }
    })
  }, /*#__PURE__*/React$1.createElement(PlusIcon$1, null)))), /*#__PURE__*/React$1.createElement("div", {
    className: pagesWrapper
  }, /*#__PURE__*/React$1.createElement(SortableTree, {
    rowHeight: 32,
    scaffoldBlockPxWidth: 16,
    isVirtualized: false,
    canDrop: canDrop,
    treeData: pagesRows.treeData,
    generateNodeProps: rowInfo => ({
      onRowClick: row => onChange(row),
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

var css_248z$j = ".alignment-module_alignment__2yWS_ {\n  color: #b6babd;\n  background-color: #ffffff;\n  box-sizing: border-box;\n  height: 48px;\n  width: 240px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px;\n  position: relative; }\n  .alignment-module_alignment__2yWS_ * {\n    font-family: Aktiv Grotesk, sans-serif;\n    box-sizing: border-box;\n    user-select: none; }\n  .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1 {\n    width: 198px;\n    height: 56px;\n    padding: 4px;\n    opacity: 0;\n    border-radius: 8px;\n    box-shadow: 0px 2px 4px rgba(51, 51, 51, 0.12), 0px 0px 1px #999999, 0px 12px 24px -8px rgba(51, 51, 51, 0.08);\n    display: none;\n    flex-direction: column;\n    align-items: center;\n    justify-content: space-between;\n    position: absolute;\n    top: 44px;\n    right: 8px;\n    transition: opacity 0.1s ease-in-out;\n    z-index: 1;\n    background: #ffffff; }\n    .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1 .alignment-module_moreItem__3UhRt {\n      width: 190px;\n      height: 23px;\n      display: flex;\n      align-items: center;\n      justify-content: left; }\n      .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1 .alignment-module_moreItem__3UhRt.alignment-module_active__38FRK {\n        background: #f5f5f5;\n        border-radius: 4px; }\n      .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1 .alignment-module_moreItem__3UhRt * {\n        cursor: pointer; }\n      .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1 .alignment-module_moreItem__3UhRt .alignment-module_icon__LCeUF {\n        width: 24px;\n        height: 24px;\n        display: flex;\n        align-items: center;\n        justify-content: center; }\n      .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1 .alignment-module_moreItem__3UhRt label {\n        width: 150px;\n        height: 16px;\n        font-size: 11px;\n        line-height: 16px;\n        display: flex;\n        align-items: center;\n        color: #333333;\n        margin-left: 8px; }\n      .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1 .alignment-module_moreItem__3UhRt:hover {\n        background: #f5f5f5;\n        border-radius: 4px; }\n    .alignment-module_alignment__2yWS_ .alignment-module_moreItems__2qnn1.alignment-module_active__38FRK {\n      opacity: 1;\n      display: flex; }\n";
var style$i = {"alignment":"alignment-module_alignment__2yWS_","moreItems":"alignment-module_moreItems__2qnn1","moreItem":"alignment-module_moreItem__3UhRt","active":"alignment-module_active__38FRK","icon":"alignment-module_icon__LCeUF"};
styleInject(css_248z$j);

const Alignment = ({
  onChange = () => {},
  disabled = false
}) => {
  const {
    alignment,
    moreItems,
    moreItem,
    icon,
    active,
    disable
  } = style$i;
  const [toggleOther, setToggleOther] = useState(false); // close moreItemsMenu by click outside.

  const moreItemsWrapper = /*#__PURE__*/createRef();
  useEffect(() => {
    function clickOutside(e) {
      if (moreItemsWrapper.current && !moreItemsWrapper.current.contains(e.target)) {
        toggleOther && setToggleOther(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [moreItemsWrapper]);
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${alignment} ${disabled ? disable : ''}`
  }, /*#__PURE__*/React$1.createElement(IconButton, {
    onClick: () => onChange('left'),
    disabled: disabled
  }, /*#__PURE__*/React$1.createElement(AlignLeftIcon$1, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React$1.createElement(IconButton, {
    onClick: () => onChange('centerV'),
    disabled: disabled
  }, /*#__PURE__*/React$1.createElement(AlignCenterIcon$1, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React$1.createElement(IconButton, {
    onClick: () => onChange('right'),
    disabled: disabled
  }, /*#__PURE__*/React$1.createElement(AlignRightIcon$1, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React$1.createElement(IconButton, {
    onClick: () => onChange('top'),
    disabled: disabled
  }, /*#__PURE__*/React$1.createElement(AlignTopIcon$1, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React$1.createElement(IconButton, {
    onClick: () => onChange('centerH'),
    disabled: disabled
  }, /*#__PURE__*/React$1.createElement(AlignCenterVIcon$1, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React$1.createElement(IconButton, {
    onClick: () => onChange('bottom'),
    disabled: disabled
  }, /*#__PURE__*/React$1.createElement(AlignBottomIcon$1, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React$1.createElement("div", {
    ref: moreItemsWrapper
  }, /*#__PURE__*/React$1.createElement(IconButton, {
    disabled: disabled,
    isActive: toggleOther,
    onClick: () => {
      setToggleOther(!toggleOther);
    }
  }, /*#__PURE__*/React$1.createElement(ChevronArrowIcon$1, null)), /*#__PURE__*/React$1.createElement("div", {
    className: `${moreItems} ${toggleOther ? active : ''}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${moreItem}`,
    onClick: () => {
      setToggleOther(false);
      onChange('vSpacing');
    }
  }, /*#__PURE__*/React$1.createElement("div", {
    className: icon
  }, /*#__PURE__*/React$1.createElement(AlignDistributeVerticalSpacingIcon$1, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React$1.createElement("label", null, "Distribute Vertical Spacing")), /*#__PURE__*/React$1.createElement("div", {
    className: `${moreItem}`,
    onClick: () => {
      setToggleOther(false);
      onChange('hSpacing');
    }
  }, /*#__PURE__*/React$1.createElement("div", {
    className: icon
  }, /*#__PURE__*/React$1.createElement(AlignDistributeHorizontalSpacingIcon$1, {
    width: 12,
    height: 12
  })), /*#__PURE__*/React$1.createElement("label", null, "Distribute Horizontal Spacing")))));
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
  const [optionValueState, setOptionValueState] = useState(selectedValue);
  const [toggleOption, setToggleOption] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchState, setSearchState] = useState('');
  const [resultSearchState, setResultSearchState] = useState([]);
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

  const menuWrapper = /*#__PURE__*/createRef();
  useEffect(() => {
    function clickOutside(e) {
      if (menuWrapper.current && !menuWrapper.current.contains(e.target)) {
        setToggleOption(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [menuWrapper]); // close Search by click outside.

  const searchWrapper = /*#__PURE__*/createRef();
  useEffect(() => {
    function clickOutside(e) {
      if (searchWrapper.current && !searchWrapper.current.contains(e.target)) {
        setToggleSearch(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [searchWrapper]);
  useEffect(() => {
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

  return /*#__PURE__*/React$1.createElement("div", {
    className: `${dropdown} ${style$h[size]} ${toggleSearch ? open : ''} ${className ? className : ''}`,
    ref: menuWrapper
  }, toggleOption && option.length > 1 && /*#__PURE__*/React$1.createElement("ul", {
    style: openMenuPosition
  }, /*#__PURE__*/React$1.createElement(Scrollbars$1, {
    autoHide: true,
    style: {
      width: size === 'medium-fw' ? 176 : 144,
      height: 104
    }
  }, option.map((option, key) => /*#__PURE__*/React$1.createElement("li", {
    key: key // onMouseEnter={() => scrollOfOn()}
    // onMouseLeave={() => scrollOfOn(true)}

  }, /*#__PURE__*/React$1.createElement("button", {
    type: "button",
    onClick: () => onClickOptionHandler(option)
  }, /*#__PURE__*/React$1.createElement("span", null, option.name), optionValueState && optionValueState.value === option.value && /*#__PURE__*/React$1.createElement(CheckIcon$1, null)))))), /*#__PURE__*/React$1.createElement("div", {
    className: `${selectedItem}`
  }, optionValueState && /*#__PURE__*/React$1.createElement("input", {
    type: "text",
    value: searchState,
    onClick: e => inputOnChangeHandler(e.target),
    onChange: e => inputOnChangeHandler(e.target)
  }), /*#__PURE__*/React$1.createElement("button", {
    type: "button",
    onClick: () => setToggleOption(!toggleOption)
  }, /*#__PURE__*/React$1.createElement(ChevronArrowIcon$1, null))), toggleSearch && resultSearchState.length ? /*#__PURE__*/React$1.createElement("ul", {
    className: `${search}`,
    ref: searchWrapper,
    style: openMenuPosition
  }, /*#__PURE__*/React$1.createElement(Scrollbars$1, {
    autoHide: true,
    style: {
      width: size === 'medium-fw' ? 176 : 144,
      height: 104
    }
  }, resultSearchState.map((option, key) => /*#__PURE__*/React$1.createElement("li", {
    key: key // onMouseEnter={() => scrollOfOn()}
    // onMouseLeave={() => scrollOfOn(true)}

  }, /*#__PURE__*/React$1.createElement("button", {
    type: "button",
    onClick: () => onClickOptionHandler(option)
  }, /*#__PURE__*/React$1.createElement("span", null, option.name)))))) : null);
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
  const [selectedItem, setSelectedItem] = useState(option[0]);
  const [inputState, setInputState] = useState(input);
  useEffect(() => {
    if (onChangeValues) onChangeValues({
      option: selectedItem,
      value: parseFloat(inputState)
    });
  }, [selectedItem, inputState]);
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${visibility} ${style$g[type]}`
  }, /*#__PURE__*/React$1.createElement(Dropdown, {
    option: option,
    onChangeValue: setSelectedItem,
    size: "medium"
  }), /*#__PURE__*/React$1.createElement(Input, {
    onChangeValue: setInputState,
    value: inputState,
    setValue: setInputState,
    label: label,
    size: "normal"
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
  const [toggleDetails, setToggleDetail] = useState(false);
  const [selectedV, setSelectedItemV] = useState(value.v);
  const [selectedH, setSelectedItemH] = useState(value.h);
  useEffect(() => {
    onChange({
      selectedV,
      selectedH
    });
  }, [selectedV, selectedH]);
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${smartLayout} ${style$f[type]}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: header
  }, /*#__PURE__*/React$1.createElement("div", {
    className: title
  }, /*#__PURE__*/React$1.createElement("label", null, "Pin to Edge")), /*#__PURE__*/React$1.createElement("div", {
    className: actionButton
  }, /*#__PURE__*/React$1.createElement(IconButton, {
    onClick: () => {
      setToggleDetail(!toggleDetails);
    }
  }, !toggleDetails ? /*#__PURE__*/React$1.createElement(PlusIcon$1, null) : /*#__PURE__*/React$1.createElement(MinusIcon$1, null)))), /*#__PURE__*/React$1.createElement("div", {
    className: `${smartLayoutDetails} ${toggleDetails ? active : ''}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: pinToEdgeBtnWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    className: alignTop
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${icon} ${selectedV.includes('Top') ? active : ''}`,
    onClick: () => setSelectedItemV('Top')
  }, /*#__PURE__*/React$1.createElement(EdgeAlignTopIcon$1, null))), /*#__PURE__*/React$1.createElement("div", {
    className: alignCenter
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${icon} ${selectedH.includes('Left') ? active : ''}`,
    onClick: () => setSelectedItemH('Left')
  }, /*#__PURE__*/React$1.createElement(EdgeAlignRightIcon$1, null)), /*#__PURE__*/React$1.createElement("div", {
    className: alignCenterIconVHWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${alignCenterIconV} ${selectedV.includes('CenterV') ? active : ''}`,
    onClick: () => setSelectedItemV('CenterV')
  }), /*#__PURE__*/React$1.createElement("div", {
    className: `${alignCenterIconH} ${selectedH.includes('CenterH') ? active : ''}`,
    onClick: () => setSelectedItemH('CenterH')
  })), /*#__PURE__*/React$1.createElement("div", {
    className: `${icon} ${selectedH.includes('Right') ? active : ''}`,
    onClick: () => setSelectedItemH('Right')
  }, /*#__PURE__*/React$1.createElement(EdgeAlignLeftIcon$1, null))), /*#__PURE__*/React$1.createElement("div", {
    className: alignBottom
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${icon} ${selectedV.includes('Bottom') ? active : ''}`,
    onClick: () => setSelectedItemV('Bottom')
  }, /*#__PURE__*/React$1.createElement(EdgeAlignBottomIcon$1, null)))), /*#__PURE__*/React$1.createElement("div", {
    className: pinToEdgeOptionsWrapper
  }, /*#__PURE__*/React$1.createElement(Dropdown, {
    option: optionH,
    onChangeValue: ({
      value
    }) => setSelectedItemH(value),
    selectedValue: optionH.filter(item => item.value === selectedH)[0],
    size: "small"
  }), /*#__PURE__*/React$1.createElement(Dropdown, {
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

const AlignHorizontalIcon = ({
  width = 14,
  height = 6
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 14 6"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("path", {
    fill: "#000408",
    fillRule: "evenodd",
    d: "M3.85357.14645c.19526.19526.19526.51184 0 .7071L2.20712 2.5h9.58578L10.1465.85355c-.1953-.19526-.1953-.51184 0-.7071.1952-.19527.5118-.19527.7071 0L13.7071 3l-2.8535 2.85355c-.1953.19527-.5119.19527-.7071 0-.1953-.19526-.1953-.51184 0-.7071L11.7929 3.5H2.20712l1.64645 1.64645c.19526.19526.19526.51184 0 .7071-.19526.19527-.51185.19527-.70711 0L.29291 3 3.14646.14645c.19526-.19527.51185-.19527.70711 0z",
    clipRule: "evenodd"
  }));
};
const AlignLineHeightIcon = ({
  width = 12,
  height = 11
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 12 11"
  }, /*#__PURE__*/React$1.createElement("path", {
    fill: "#F7F9FA",
    d: "M0 1h12v8H0z"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6 1.5a.5.5 0 01.468.324L9.158 9H8.092l-.75-2H4.659l-.75 2H2.84l2.69-7.176A.5.5 0 016 1.5zM5.034 6h1.932L6 3.424 5.034 6z",
    fill: "#B6BABD"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#B6BABD",
    strokeLinecap: "round",
    d: "M9.5.5h-7M2.5 10.5h7"
  }));
};
const AlignLineSpaceIcon = ({
  width = 12,
  height = 10
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 12 10"
  }, /*#__PURE__*/React$1.createElement("path", {
    fill: "#F7F9FA",
    d: "M0 1h12v8H0z"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6 1.5a.5.5 0 01.468.324L9.158 9H8.092l-.75-2H4.659l-.75 2H2.84l2.69-7.176A.5.5 0 016 1.5zM5.034 6h1.932L6 3.424 5.034 6z",
    fill: "#B6BABD"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#B6BABD",
    strokeLinecap: "round",
    d: "M1.5.5v9"
  }), /*#__PURE__*/React$1.createElement("path", {
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
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 9"
  }, /*#__PURE__*/React$1.createElement("rect", {
    width: "12",
    height: "1",
    rx: ".5",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("rect", {
    y: "4",
    width: "12",
    height: "1",
    rx: ".5",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("rect", {
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
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 12 12"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#63676C",
    d: "M.5 2C.5 1.17157 1.17157.5 2 .5h8c.8284 0 1.5.67157 1.5 1.5v8c0 .8284-.6716 1.5-1.5 1.5H2c-.82843 0-1.5-.6716-1.5-1.5V2z"
  }));
};
const AlignTextLeftIcon = ({
  width = 12,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 12 9"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("rect", {
    width: "12",
    height: "1",
    fill: "#B6BABD",
    rx: ".5"
  }), /*#__PURE__*/React$1.createElement("rect", {
    width: "12",
    height: "1",
    y: "8",
    fill: "#B6BABD",
    rx: ".5"
  }), /*#__PURE__*/React$1.createElement("rect", {
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
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 12 9"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("rect", {
    width: "12",
    height: "1",
    fill: "#B6BABD",
    rx: ".5"
  }), /*#__PURE__*/React$1.createElement("rect", {
    width: "12",
    height: "1",
    y: "8",
    fill: "#B6BABD",
    rx: ".5"
  }), /*#__PURE__*/React$1.createElement("rect", {
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
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 12 9"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("rect", {
    width: "12",
    height: "1",
    fill: "#B6BABD",
    rx: ".5"
  }), /*#__PURE__*/React$1.createElement("rect", {
    width: "12",
    height: "1",
    y: "8",
    fill: "#B6BABD",
    rx: ".5"
  }), /*#__PURE__*/React$1.createElement("rect", {
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
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 11 13"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("rect", {
    width: "11",
    height: "1",
    fill: "#B6BABD",
    rx: ".5"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#63676C",
    strokeLinecap: "round",
    d: "M5.5 12V4m0 0l-2 2m2-2l2 2"
  }));
};
const AlignTextMiddleIcon = ({
  width = 11,
  height = 19
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 11 19"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("rect", {
    width: "11",
    height: "1",
    x: "11",
    y: "10",
    fill: "#B6BABD",
    rx: ".5",
    transform: "rotate(-180 11 10)"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#63676C",
    strokeLinecap: "round",
    d: "M5.5 1v6m0 0l2-2m-2 2l-2-2M5.5 18v-6m0 0l2 2m-2-2l-2 2"
  }));
};
const AlignTextBottomIcon = ({
  width = 11,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 11 13"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("rect", {
    width: "11",
    height: "1",
    fill: "#B6BABD",
    rx: ".5",
    transform: "matrix(1 0 0 -1 0 13)"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#63676C",
    strokeLinecap: "round",
    d: "M5.5 1v8m0 0l-2-2m2 2l2-2"
  }));
}; // TEXT

const TextCamelCaseIcon = ({
  width = 13,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 13 9"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("path", {
    fill: "#999",
    d: "M3.513.146H4.58L7.627 8h-1.1l-.825-2.189H2.336L1.511 8H.455L3.513.146zm1.881 4.785L4.008 1.29 2.644 4.931h2.75zm6.632 2.288a2.86 2.86 0 01-.781.649c-.316.176-.708.264-1.177.264a2.72 2.72 0 01-.792-.11 1.738 1.738 0 01-.616-.308 1.537 1.537 0 01-.396-.539 1.815 1.815 0 01-.143-.748c0-.389.08-.704.242-.946.168-.242.388-.433.66-.572.278-.14.59-.238.935-.297a8.34 8.34 0 011.067-.11l.979-.033v-.22c0-.484-.103-.832-.308-1.045-.206-.213-.54-.319-1.001-.319-.455 0-.789.077-1.001.231a1.021 1.021 0 00-.418.616l-.87-.099c.103-.52.349-.898.738-1.133.388-.242.916-.363 1.584-.363.41 0 .755.051 1.034.154.286.095.517.235.693.418.176.183.3.41.374.682.08.271.12.576.12.913V8h-.923v-.781zm-.022-2.068l-.913.033a5.356 5.356 0 00-.968.11 1.86 1.86 0 00-.616.242.841.841 0 00-.32.363 1.355 1.355 0 00-.087.506c0 .286.084.517.253.693.176.169.462.253.858.253.564 0 1.004-.14 1.32-.418.315-.279.473-.66.473-1.144v-.638z"
  }));
};
const TextCapitalCaseIcon = ({
  width = 13,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 16 8"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("path", {
    fill: "#999",
    d: "M3.574.146H4.64L7.688 8h-1.1l-.825-2.189H2.397L1.572 8H.516L3.574.146zm1.88 4.785L4.07 1.29 2.705 4.931h2.75zM11.373.146h1.067L15.486 8h-1.1l-.825-2.189h-3.366L9.37 8H8.314L11.372.146zm1.881 4.785L11.867 1.29l-1.364 3.641h2.75z"
  }));
};
const TextLowerCaseIcon = ({
  width = 13,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 13 9"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("path", {
    fill: "#999",
    d: "M4.36 5.219c-.205.25-.466.466-.781.649-.315.176-.708.264-1.177.264a2.72 2.72 0 01-.792-.11 1.738 1.738 0 01-.616-.308 1.537 1.537 0 01-.396-.539 1.815 1.815 0 01-.143-.748c0-.389.08-.704.242-.946.169-.242.389-.433.66-.572.279-.14.59-.238.935-.297a8.34 8.34 0 011.067-.11l.979-.033v-.22c0-.484-.103-.832-.308-1.045C3.825.991 3.491.885 3.03.885c-.455 0-.788.077-1.001.231a1.021 1.021 0 00-.418.616l-.869-.099c.103-.52.348-.898.737-1.133.389-.242.917-.363 1.584-.363.41 0 .755.051 1.034.154.286.095.517.235.693.418.176.183.3.41.374.682a3.2 3.2 0 01.121.913V6H4.36v-.781zm-.022-2.068l-.913.033a5.357 5.357 0 00-.968.11 1.86 1.86 0 00-.616.242.841.841 0 00-.319.363 1.355 1.355 0 00-.088.506c0 .286.084.517.253.693.176.169.462.253.858.253.565 0 1.005-.14 1.32-.418.315-.279.473-.66.473-1.144v-.638zm5.941 2.068c-.205.25-.466.466-.781.649-.315.176-.708.264-1.177.264a2.72 2.72 0 01-.792-.11 1.738 1.738 0 01-.616-.308 1.537 1.537 0 01-.396-.539 1.815 1.815 0 01-.143-.748c0-.389.08-.704.242-.946.169-.242.389-.433.66-.572.279-.14.59-.238.935-.297a8.34 8.34 0 011.067-.11l.979-.033v-.22c0-.484-.103-.832-.308-1.045C9.744.991 9.41.885 8.948.885c-.455 0-.788.077-1.001.231a1.021 1.021 0 00-.418.616l-.869-.099c.103-.52.348-.898.737-1.133.389-.242.917-.363 1.584-.363.41 0 .755.051 1.034.154.286.095.517.235.693.418.176.183.3.41.374.682.08.271.121.576.121.913V6h-.924v-.781zm-.022-2.068l-.913.033a5.357 5.357 0 00-.968.11 1.86 1.86 0 00-.616.242.841.841 0 00-.319.363 1.355 1.355 0 00-.088.506c0 .286.084.517.253.693.176.169.462.253.858.253.565 0 1.005-.14 1.32-.418.315-.279.473-.66.473-1.144v-.638z"
  }));
};
const TextUnderLineDecorationIcon = ({
  width = 8,
  height = 11
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 8 11"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#999",
    strokeLinecap: "round",
    d: "M.5 10.5h7"
  }), /*#__PURE__*/React$1.createElement("path", {
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
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    fill: "none",
    viewBox: "0 0 10 8"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#999",
    strokeLinecap: "round",
    d: "M.5 4.5h9"
  }), /*#__PURE__*/React$1.createElement("path", {
    fill: "#999",
    fillRule: "evenodd",
    d: "M5 .5a.5.5 0 01.468.324L8.158 8H7.092l-.75-2H3.659l-.75 2H1.84L4.53.824A.5.5 0 015 .5zM4.034 5h1.932L5 2.424 4.034 5z",
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
  const [state, setState] = useState('AlignHorizontalIcon');
  useEffect(() => {
    onChange(state);
  }, [state]);

  const isActivated = type => state === type;

  return /*#__PURE__*/React$1.createElement("div", {
    className: `${radioButton} ${className ? className : ''}`
  }, row.map(item => /*#__PURE__*/React$1.createElement(IconButton, {
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
  const [state1, setState1] = useState(20);
  const [state2, setState2] = useState(0);
  const [sizeState, setSizeState] = useState();
  const [fontState, setFontState] = useState();
  const [align, setAlign] = useState();
  const [toggleMoreItems, setToggleMoreItems] = useState(false);
  const radioButton1 = [{
    id: getUnique(),
    name: 'AlignHorizontalIcon',
    icon: /*#__PURE__*/React$1.createElement(AlignHorizontalIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'AlignAutoHeight',
    icon: /*#__PURE__*/React$1.createElement(AlignAutoHeightIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'AlignRectangle',
    icon: /*#__PURE__*/React$1.createElement(AlignRectangleIcon, {
      width: 10
    })
  }];
  const radioButton2 = [{
    id: getUnique(),
    name: 'AlignTextLeftIcon',
    icon: /*#__PURE__*/React$1.createElement(AlignTextLeftIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'AlignTextCenterIcon',
    icon: /*#__PURE__*/React$1.createElement(AlignTextCenterIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'AlignTextRightIcon',
    icon: /*#__PURE__*/React$1.createElement(AlignTextRightIcon, {
      width: 10
    })
  }];
  const radioButton3 = [{
    id: getUnique(),
    name: 'AlignTextTopIcon',
    icon: /*#__PURE__*/React$1.createElement(AlignTextTopIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'AlignTextMiddleIcon',
    icon: /*#__PURE__*/React$1.createElement(AlignTextMiddleIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'AlignTextBottomIcon',
    icon: /*#__PURE__*/React$1.createElement(AlignTextBottomIcon, {
      width: 10
    })
  }];
  const morMenuCaseOptions = [{
    id: getUnique(),
    name: 'MinusIcon',
    icon: /*#__PURE__*/React$1.createElement(MinusIcon$1, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'TextCamelCaseIcon',
    icon: /*#__PURE__*/React$1.createElement(TextCamelCaseIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'TextCapitalCaseIcon',
    icon: /*#__PURE__*/React$1.createElement(TextCapitalCaseIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'TextLowerCaseIcon',
    icon: /*#__PURE__*/React$1.createElement(TextLowerCaseIcon, {
      width: 10
    })
  }];
  const morMenuDecorationOptions = [{
    id: getUnique(),
    name: 'MinusIcon',
    icon: /*#__PURE__*/React$1.createElement(MinusIcon$1, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'TextUnderLineDecorationIcon',
    icon: /*#__PURE__*/React$1.createElement(TextUnderLineDecorationIcon, {
      width: 10
    })
  }, {
    id: getUnique(),
    name: 'TextStrikeThroughDecorationIcon',
    icon: /*#__PURE__*/React$1.createElement(TextStrikeThroughDecorationIcon, {
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
  useEffect(() => {
    if (onChange) onChange({
      state1,
      state2,
      sizeState,
      fontState
    });
  }, [state1, state2, sizeState, fontState, align]); // close menu by click outside.

  const moreMenuRef = /*#__PURE__*/createRef();
  useEffect(() => {
    function clickOutside(e) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setToggleMoreItems(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [moreMenuRef]);
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${textComp} ${style$e[type]}`,
    ref: moreMenuRef
  }, /*#__PURE__*/React$1.createElement("div", {
    className: header
  }, /*#__PURE__*/React$1.createElement("label", {
    className: `${layerText} ${style$e[textColor]}`
  }, text)), /*#__PURE__*/React$1.createElement("div", {
    className: textControlWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    className: textWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    className: fontListOption
  }, /*#__PURE__*/React$1.createElement(Dropdown, {
    option: fontList,
    className: fontListStyle,
    onChangeValue: setFontState,
    selectedValue: fontState,
    size: "medium"
  }), /*#__PURE__*/React$1.createElement(Dropdown, {
    option: fontSizesList,
    className: fontSizes,
    onChangeValue: setSizeState,
    selectedValue: sizeState,
    size: "medium",
    popupMenu: "left"
  })), /*#__PURE__*/React$1.createElement("div", {
    className: row
  }, /*#__PURE__*/React$1.createElement("div", {
    className: alignInputLineHeight
  }, /*#__PURE__*/React$1.createElement(Input, {
    label: /*#__PURE__*/React$1.createElement(AlignLineHeightIcon, null),
    dir: "left",
    value: state1,
    setValue: setState1
  })), /*#__PURE__*/React$1.createElement("div", {
    className: alignInputLineSpace
  }, /*#__PURE__*/React$1.createElement(Input, {
    label: /*#__PURE__*/React$1.createElement(AlignLineSpaceIcon, null),
    dir: "left",
    value: state2,
    setValue: setState2
  })), /*#__PURE__*/React$1.createElement("div", {
    className: lineHeightSpaceButtons
  }, /*#__PURE__*/React$1.createElement(RadioButton, {
    className: alignButtons,
    row: radioButton1,
    onChangeValues: onChange
  }))), /*#__PURE__*/React$1.createElement("div", {
    className: row
  }, /*#__PURE__*/React$1.createElement(RadioButton, {
    className: alignButtons2,
    row: radioButton2,
    onChangeValues: onChange
  }), /*#__PURE__*/React$1.createElement(RadioButton, {
    className: alignButtons3,
    row: radioButton3,
    onChangeValues: onChange
  }), /*#__PURE__*/React$1.createElement(IconButton, {
    onClick: () => setToggleMoreItems(!toggleMoreItems),
    isActive: toggleMoreItems
  }, /*#__PURE__*/React$1.createElement(TreeDotsIcon$1, null)))), toggleMoreItems && /*#__PURE__*/React$1.createElement("div", {
    className: moreMenu
  }, /*#__PURE__*/React$1.createElement("div", {
    className: moreHeader
  }, /*#__PURE__*/React$1.createElement("label", null, "Text Option"), /*#__PURE__*/React$1.createElement(IconButton, {
    size: "small",
    onClick: () => setToggleMoreItems(!toggleMoreItems)
  }, /*#__PURE__*/React$1.createElement(CrossIcon$1, null))), /*#__PURE__*/React$1.createElement("div", {
    className: moreBody
  }, /*#__PURE__*/React$1.createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React$1.createElement("label", null, "Case"), /*#__PURE__*/React$1.createElement("div", null, /*#__PURE__*/React$1.createElement(RadioButton, {
    className: morItemRadioButton,
    row: morMenuCaseOptions,
    onChangeValues: onChange
  }))), /*#__PURE__*/React$1.createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React$1.createElement("label", null, "Decoration"), /*#__PURE__*/React$1.createElement("div", null, /*#__PURE__*/React$1.createElement(RadioButton, {
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

  const adjMenuRef = /*#__PURE__*/createRef();
  useEffect(() => {
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

  return /*#__PURE__*/React$1.createElement("div", {
    className: adjMenu,
    ref: adjMenuRef
  }, /*#__PURE__*/React$1.createElement("div", {
    className: header
  }, /*#__PURE__*/React$1.createElement("button", {
    className: resetBtn,
    onClick: () => restAdjustment()
  }, "Reset"), /*#__PURE__*/React$1.createElement("label", null, "Add Adjustment"), /*#__PURE__*/React$1.createElement(IconButton, {
    size: "small",
    onClick: () => closeMenu(false)
  }, /*#__PURE__*/React$1.createElement(CrossIcon$1, null))), /*#__PURE__*/React$1.createElement("div", {
    className: body
  }, /*#__PURE__*/React$1.createElement("div", {
    className: left
  }, /*#__PURE__*/React$1.createElement(Scrollbars, {
    autoHide: true,
    style: {
      height: '100%',
      width: 132
    }
  }, activeAdjustments.map((item, key) => /*#__PURE__*/React$1.createElement(Fragment, {
    key: key
  }, item.value !== 'presents' && /*#__PURE__*/React$1.createElement("div", {
    className: `${row}`,
    key: key
  }, /*#__PURE__*/React$1.createElement("div", {
    className: rowItem,
    onClick: () => setActiveAdjustment({
      name: item.name,
      value: item.value,
      key
    })
  }, /*#__PURE__*/React$1.createElement("label", null, item.name), item.selected ? /*#__PURE__*/React$1.createElement(CheckIcon$1, null) : '')))))), /*#__PURE__*/React$1.createElement("div", {
    className: right
  }, /*#__PURE__*/React$1.createElement(Scrollbars, {
    autoHide: true,
    style: {
      height: '100%',
      width: 148
    }
  }, /*#__PURE__*/React$1.createElement(AdjustmentsDetails, {
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
  const [input, setInput] = useState(defaultValue);
  const {
    adjustmentsDetails,
    adjustmentName,
    amountBody,
    amountInput
  } = style$c;
  useEffect(() => {
    const update = {
      field: 'amount',
      key: activeAdjustment.key,
      value: parseInt(input)
    };
    updateRow(update);
  }, [input]);
  useEffect(() => {
    setInput(defaultValue);
  }, [defaultValue]);
  return /*#__PURE__*/React$1.createElement("div", {
    className: adjustmentsDetails
  }, /*#__PURE__*/React$1.createElement("label", {
    className: adjustmentName
  }, activeAdjustment.name), /*#__PURE__*/React$1.createElement("div", {
    className: amountBody
  }, /*#__PURE__*/React$1.createElement("label", null, "Amount"), /*#__PURE__*/React$1.createElement(Input, {
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
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${adjRow}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${adjText} ${isActive ? active : ''}`,
    onClick: () => onChange('activeAdjustment')
  }, row.name), /*#__PURE__*/React$1.createElement(IconButton, {
    className: btn,
    onClick: () => onChange('visible')
  }, row.visible ? /*#__PURE__*/React$1.createElement(EyeIcon$1, null) : /*#__PURE__*/React$1.createElement(EyeCloseIcon$1, null)), /*#__PURE__*/React$1.createElement(IconButton, {
    className: `${btn} ${minus}`,
    onClick: () => onChange('selected')
  }, /*#__PURE__*/React$1.createElement(MinusIcon$1, null)));
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
  const [toggleAdjMenu, setToggleAdjMenu] = useState(false);
  const [activeAdjustments, setActiveAdjustments] = useState(_activeAdjustments);
  const [activeAdjustment, setActiveAdjustment] = useState({
    value: 'contrast',
    key: 0
  });
  useEffect(() => {
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

  const closeMenuBtn = /*#__PURE__*/createRef();
  const activeAdjustmentsRef = /*#__PURE__*/createRef();
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${fill} ${style$a[type]}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: header
  }, /*#__PURE__*/React$1.createElement("label", {
    className: `${layerText} ${style$a[textColor]}`
  }, text), /*#__PURE__*/React$1.createElement("div", {
    ref: closeMenuBtn,
    className: `${layerBtnAction}`,
    onClick: () => setToggleAdjMenu(!toggleAdjMenu)
  }, /*#__PURE__*/React$1.createElement(IconButton, null, /*#__PURE__*/React$1.createElement(PlusIcon$1, null))), toggleAdjMenu && /*#__PURE__*/React$1.createElement(AdjMenu, {
    closeMenu: setToggleAdjMenu,
    onChange: onChange,
    closeBtnRef: closeMenuBtn,
    activeAdjustmentsRef: activeAdjustmentsRef,
    activeAdjustments: activeAdjustments,
    activeAdjustment: activeAdjustment,
    setActiveAdjustment: setActiveAdjustment,
    setActiveAdjustments: setActiveAdjustments
  })), /*#__PURE__*/React$1.createElement("div", {
    className: activeFillItems,
    ref: activeAdjustmentsRef
  }, activeAdjustments && activeAdjustments.map((item, key) => {
    return /*#__PURE__*/React$1.createElement(Fragment, {
      key: key
    }, item.selected ? /*#__PURE__*/React$1.createElement(AdjRow, {
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
  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedOpacity, setSelectedOpacity] = useState(opacity);
  const [toggleColorPicker, setToggleColorPicker] = useState(false);
  const [colorPickerStyle, setColorPickerStyle] = useState({
    backgroundColor: selectedColor,
    opacity: selectedOpacity / 100
  });
  useEffect(() => {
    onChange({
      color: selectedColor,
      value: parseFloat(selectedOpacity)
    });
    setColorPickerStyle({
      backgroundColor: selectedColor,
      opacity: selectedOpacity / 100
    });
  }, [selectedColor, selectedOpacity]);
  useEffect(() => {
    setColorPickerStyle({
      backgroundColor: selectedColor,
      opacity: selectedOpacity / 100
    });
  }, [row]); // close color picker by click outside.

  const colorPickerWrapper = /*#__PURE__*/createRef();
  useEffect(() => {
    function clickOutside(e) {
      if (colorPickerWrapper.current && !colorPickerWrapper.current.contains(e.target)) {
        setToggleColorPicker(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [colorPickerWrapper]);
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${fillRow} ${style$9[type]}`
  }, toggleColorPicker && /*#__PURE__*/React$1.createElement("div", {
    className: colorPickerModal,
    ref: colorPickerWrapper
  }, /*#__PURE__*/React$1.createElement(SketchPicker, {
    color: selectedColor,
    onChange: color => setSelectedColor(color.hex)
  })), /*#__PURE__*/React$1.createElement("div", {
    className: colorActionWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    onClick: () => setToggleColorPicker(!toggleColorPicker),
    className: colorPicker,
    style: colorPickerStyle
  }), /*#__PURE__*/React$1.createElement(Input, {
    onChange: setSelectedColor,
    setValue: setSelectedColor,
    value: selectedColor,
    type: "string",
    size: "noStyle"
  })), /*#__PURE__*/React$1.createElement(IconButton, null, /*#__PURE__*/React$1.createElement(BlendIcon$1, null)), /*#__PURE__*/React$1.createElement(Input, {
    onChange: setSelectedOpacity,
    value: selectedOpacity,
    setValue: setSelectedOpacity,
    dir: "right",
    label: "%",
    className: fillText
  }), /*#__PURE__*/React$1.createElement(IconButton, {
    className: btnRow,
    onClick: () => removeRow(row)
  }, /*#__PURE__*/React$1.createElement(MinusIcon$1, null)));
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
  const [optionsState, setOptionsState] = useState(options);

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

  return /*#__PURE__*/React$1.createElement("div", {
    className: `${fill} ${style$8[type]}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: header
  }, /*#__PURE__*/React$1.createElement("label", {
    className: `${layerText} ${style$8[textColor]}`
  }, "Fill"), /*#__PURE__*/React$1.createElement("div", {
    className: `${layerBtnAction}`,
    onClick: () => addRow()
  }, /*#__PURE__*/React$1.createElement(IconButton, null, /*#__PURE__*/React$1.createElement(PlusIcon$1, null)))), /*#__PURE__*/React$1.createElement("div", {
    className: fillItems
  }, optionsState.map((item, key) => /*#__PURE__*/React$1.createElement(FillRow, {
    key: `${item.id}`,
    label: "%",
    row: item,
    onChange: _res => setValue(_res, key),
    removeRow: removeRow
  }))));
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
  const [selectedColor, setSelectedColor] = useState(color);
  const [toggleColorPicker, setToggleColorPicker] = useState(false);
  const [inputS1, setInputS1] = useState(input[0].value);
  const [inputS2, setInputS2] = useState(input[1].value);
  useEffect(() => {
    onChange({
      color: selectedColor,
      s1: parseFloat(inputS1),
      s2: parseFloat(inputS2)
    });
  }, [selectedColor, inputS1, inputS2]); // close color picker by click outside.

  const colorPickerWrapper = /*#__PURE__*/createRef();
  useEffect(() => {
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
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${strokeRow} ${style$7[type]}`
  }, toggleColorPicker && /*#__PURE__*/React$1.createElement("div", {
    className: colorPickerModal,
    ref: colorPickerWrapper
  }, /*#__PURE__*/React$1.createElement(SketchPicker, {
    color: selectedColor,
    onChange: color => setSelectedColor(color.hex)
  })), /*#__PURE__*/React$1.createElement("div", {
    className: colorActionWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    onClick: () => setToggleColorPicker(!toggleColorPicker),
    className: colorPicker,
    style: colorPickerStyle
  }), /*#__PURE__*/React$1.createElement(Input, {
    onChange: setSelectedColor,
    setValue: setSelectedColor,
    value: selectedColor,
    type: "string",
    size: "noStyle"
  })), /*#__PURE__*/React$1.createElement(Input, {
    onChange: setInputS1,
    value: inputS1,
    setValue: setInputS1,
    dir: "right",
    label: input[0].label,
    className: strokeInput1
  }), /*#__PURE__*/React$1.createElement(Input, {
    onChange: setInputS2,
    value: inputS2,
    setValue: setInputS2,
    dir: "right",
    label: input[1].label,
    className: strokeInput2
  }), /*#__PURE__*/React$1.createElement(IconButton, {
    onClick: () => removeRow(row),
    className: btnRow
  }, /*#__PURE__*/React$1.createElement(MinusIcon$1, null)));
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
  icon: /*#__PURE__*/React$1.createElement(Stroke1Icon$1, {
    width: 10
  })
}, {
  id: getUnique(),
  name: 'Stroke2Icon',
  icon: /*#__PURE__*/React$1.createElement(Stroke2Icon$1, {
    width: 10
  })
}, {
  id: getUnique(),
  name: 'Stroke3Icon',
  icon: /*#__PURE__*/React$1.createElement(Stroke3Icon$1, {
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
  const [strokesState, setStrokeState] = useState(strokes);
  const [toggleMoreItems, setToggleMoreItems] = useState(false);
  const [capOption] = useState(capOptionValues);
  const [capOptionSelected, setCapOptionSelected] = useState({});
  const [trimOption] = useState(trimOptionValues);
  const [trimOptionSelected, setTrimOptionSelected] = useState({});
  const [caseOption] = useState(caseOptionValues);
  const [caseSelected, setCaseSelected] = useState();
  const [startS, setStart] = useState(start);
  const [endS, setEnd] = useState(end);
  const [offsetS, setOffset] = useState(offset);

  const setValue = (data, index) => {
    onChange({
      index,
      data
    });
  };

  useEffect(() => {
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


  const moreMenuRef = /*#__PURE__*/createRef();
  useEffect(() => {
    function clickOutside(e) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setToggleMoreItems(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [moreMenuRef]); // more menu

  return /*#__PURE__*/React$1.createElement("div", {
    className: `${stroke} ${style$6[type]}`,
    ref: moreMenuRef
  }, /*#__PURE__*/React$1.createElement("div", {
    className: header
  }, /*#__PURE__*/React$1.createElement("label", {
    className: `${layerText} ${style$6[textColor]}`
  }, "Stroke"), /*#__PURE__*/React$1.createElement("div", {
    className: `${layerBtnAction}`
  }, /*#__PURE__*/React$1.createElement(IconButton, {
    onClick: () => setToggleMoreItems(!toggleMoreItems)
  }, /*#__PURE__*/React$1.createElement(TreeDotsIcon$1, null)), /*#__PURE__*/React$1.createElement(IconButton, {
    onClick: () => addRow()
  }, /*#__PURE__*/React$1.createElement(PlusIcon$1, null)))), /*#__PURE__*/React$1.createElement("div", {
    className: strokeItems
  }, strokesState.map((item, key) => /*#__PURE__*/React$1.createElement(StrokeRow, {
    key: `${item.id}`,
    row: item,
    onChange: _res => setValue(_res, key),
    removeRow: removeRow
  }))), toggleMoreItems && /*#__PURE__*/React$1.createElement("div", {
    className: moreMenu
  }, /*#__PURE__*/React$1.createElement("div", {
    className: moreHeader
  }, /*#__PURE__*/React$1.createElement("label", null, "Text Option"), /*#__PURE__*/React$1.createElement(IconButton, {
    size: "small",
    onClick: () => setToggleMoreItems(!toggleMoreItems)
  }, /*#__PURE__*/React$1.createElement(CrossIcon$1, null))), /*#__PURE__*/React$1.createElement("div", {
    className: moreBody
  }, /*#__PURE__*/React$1.createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React$1.createElement("label", null, "Cap"), /*#__PURE__*/React$1.createElement(Dropdown, {
    option: capOption,
    onChange: setCapOptionSelected,
    size: "medium",
    className: option,
    popupMenu: "left"
  })), /*#__PURE__*/React$1.createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React$1.createElement("label", null, "Case"), /*#__PURE__*/React$1.createElement("div", null, /*#__PURE__*/React$1.createElement(RadioButton, {
    className: morItemRadioButton,
    row: caseOption,
    onChange: setCaseSelected
  }))), /*#__PURE__*/React$1.createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React$1.createElement("label", null, "Trim Path"), /*#__PURE__*/React$1.createElement(Dropdown, {
    option: trimOption,
    onChange: setTrimOptionSelected,
    size: "medium",
    className: option,
    popupMenu: "left"
  })), /*#__PURE__*/React$1.createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React$1.createElement("label", null, "Start"), /*#__PURE__*/React$1.createElement(Input, {
    onChange: setStart,
    value: startS,
    setValue: setStart,
    dir: "right",
    label: "%",
    className: input
  })), /*#__PURE__*/React$1.createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React$1.createElement("label", null, "End"), /*#__PURE__*/React$1.createElement(Input, {
    onChange: setEnd,
    value: endS,
    setValue: setEnd,
    dir: "right",
    label: "%",
    className: input
  })), /*#__PURE__*/React$1.createElement("div", {
    className: morMenuBodyRow
  }, /*#__PURE__*/React$1.createElement("label", null, "Offset"), /*#__PURE__*/React$1.createElement(Input, {
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
  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedOpacity, setSelectedOpacity] = useState(opacity);
  const [toggleColorPicker, setToggleColorPicker] = useState(false);
  const [colorPickerStyle, setColorPickerStyle] = useState({
    backgroundColor: selectedColor,
    opacity: selectedOpacity / 100
  });
  useEffect(() => {
    onChange({
      color: selectedColor,
      value: parseFloat(selectedOpacity)
    });
    setColorPickerStyle({
      backgroundColor: selectedColor,
      opacity: selectedOpacity / 100
    });
  }, [selectedColor, selectedOpacity]); // close color picker by click outside.

  const colorPickerWrapper = /*#__PURE__*/createRef();
  useEffect(() => {
    function clickOutside(e) {
      if (colorPickerWrapper.current && !colorPickerWrapper.current.contains(e.target)) {
        setToggleColorPicker(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [colorPickerWrapper]);
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${textBackgroundRow} ${style$5[type]}`
  }, toggleColorPicker && /*#__PURE__*/React$1.createElement("div", {
    className: colorPickerModal,
    ref: colorPickerWrapper
  }, /*#__PURE__*/React$1.createElement(SketchPicker, {
    color: selectedColor,
    onChange: color => setSelectedColor(color.hex)
  })), /*#__PURE__*/React$1.createElement("div", {
    className: colorActionWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    onClick: () => setToggleColorPicker(!toggleColorPicker),
    className: colorPicker,
    style: colorPickerStyle
  }), /*#__PURE__*/React$1.createElement(Input, {
    onChange: setSelectedColor,
    setValue: setSelectedColor,
    value: selectedColor,
    type: "string",
    size: "noStyle"
  })), /*#__PURE__*/React$1.createElement(IconButton, null, /*#__PURE__*/React$1.createElement(BlendIcon$1, null)), /*#__PURE__*/React$1.createElement(Input, {
    onChangeValue: setSelectedOpacity,
    value: selectedOpacity,
    setValue: setSelectedOpacity,
    dir: "right",
    label: "%",
    className: fillText
  }), /*#__PURE__*/React$1.createElement(IconButton, {
    className: btnRow,
    onClick: () => removeRow(row)
  }, /*#__PURE__*/React$1.createElement(MinusIcon$1, null)));
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
  const [optionsState, setOptionsState] = useState(options);
  const [titleS] = useState(title);

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

  return /*#__PURE__*/React$1.createElement("div", {
    className: `${fill} ${style$4[type]}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: header
  }, /*#__PURE__*/React$1.createElement("label", {
    className: `${layerText} ${style$4[textColor]}`
  }, titleS), /*#__PURE__*/React$1.createElement("div", {
    className: `${layerBtnAction}`,
    onClick: () => addRow()
  }, /*#__PURE__*/React$1.createElement(IconButton, null, /*#__PURE__*/React$1.createElement(PlusIcon$1, null)))), /*#__PURE__*/React$1.createElement("div", {
    className: fillItems
  }, optionsState.map((item, key) => /*#__PURE__*/React$1.createElement(TextBackgroundRow, {
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
  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedOpacity, setSelectedOpacity] = useState(opacity);
  const [toggleColorPicker, setToggleColorPicker] = useState(false);
  const [colorPickerStyle, setColorPickerStyle] = useState({
    backgroundColor: selectedColor,
    opacity: selectedOpacity / 100
  });
  useEffect(() => {
    onChange({
      color: selectedColor,
      value: parseFloat(selectedOpacity)
    });
  }, [selectedColor, selectedOpacity]);
  useEffect(() => {
    setSelectedColor(color);
    setSelectedOpacity(opacity);
    setColorPickerStyle({
      backgroundColor: selectedColor,
      opacity: selectedOpacity / 100
    });
  }, [row]); // close color picker by click outside.

  const colorPickerWrapperRef = /*#__PURE__*/createRef();
  useEffect(() => {
    function clickOutside(e) {
      if (colorPickerWrapperRef.current && !colorPickerWrapperRef.current.contains(e.target)) {
        setToggleColorPicker(false);
      }
    }

    window.addEventListener('mousedown', clickOutside);
    return () => window.removeEventListener('mousedown', clickOutside);
  }, [colorPickerWrapperRef]);
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${colorPickerWrapper}`
  }, toggleColorPicker && /*#__PURE__*/React$1.createElement("div", {
    className: colorPickerModal,
    ref: colorPickerWrapperRef
  }, /*#__PURE__*/React$1.createElement(SketchPicker, {
    color: selectedColor,
    onChange: color => setSelectedColor(color.hex)
  })), /*#__PURE__*/React$1.createElement("div", {
    className: colorActionWrapper
  }, /*#__PURE__*/React$1.createElement("div", {
    onClick: () => setToggleColorPicker(!toggleColorPicker),
    className: colorPicker,
    style: colorPickerStyle
  }), /*#__PURE__*/React$1.createElement(Input, {
    onChange: setSelectedColor,
    setValue: setSelectedColor,
    value: selectedColor,
    type: "string",
    size: "noStyle"
  })), /*#__PURE__*/React$1.createElement(Input, {
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
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${switchWrapper} ${checked ? isChecked : unchecked}`,
    onClick: () => setChecked(!checked)
  }, /*#__PURE__*/React$1.createElement("div", {
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

  const fxMenuRef = /*#__PURE__*/createRef();
  useEffect(() => {
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

  return /*#__PURE__*/React$1.createElement("div", {
    className: fxMenu,
    ref: fxMenuRef
  }, /*#__PURE__*/React$1.createElement("div", {
    className: header
  }, /*#__PURE__*/React$1.createElement("button", {
    className: resetBtn,
    onClick: () => restFilter()
  }, "Reset"), /*#__PURE__*/React$1.createElement("label", null, "Add Fx"), /*#__PURE__*/React$1.createElement(IconButton, {
    size: "small",
    onClick: () => closeMenu(false)
  }, /*#__PURE__*/React$1.createElement(CrossIcon$1, null))), /*#__PURE__*/React$1.createElement("div", {
    className: body
  }, /*#__PURE__*/React$1.createElement("div", {
    className: left
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${row} ${presets}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: rowItem,
    onClick: () => setActiveFilter({
      name: 'Presents',
      value: 'presents',
      key: 0
    })
  }, /*#__PURE__*/React$1.createElement("label", null, "Presets"), activeFilters[0].selected ? /*#__PURE__*/React$1.createElement(CheckIcon$1, null) : '')), /*#__PURE__*/React$1.createElement(Scrollbars, {
    autoHide: true,
    style: {
      height: '100%',
      width: 132
    }
  }, activeFilters.map((item, key) => /*#__PURE__*/React$1.createElement(Fragment, {
    key: key
  }, item.value !== 'presents' && /*#__PURE__*/React$1.createElement("div", {
    className: `${row}`,
    key: key
  }, /*#__PURE__*/React$1.createElement("div", {
    className: rowItem,
    onClick: () => setActiveFilter({
      name: item.name,
      value: item.value,
      key
    })
  }, /*#__PURE__*/React$1.createElement("label", null, item.name), item.selected ? /*#__PURE__*/React$1.createElement(CheckIcon$1, null) : '')))))), /*#__PURE__*/React$1.createElement("div", {
    className: right
  }, /*#__PURE__*/React$1.createElement(Scrollbars, {
    autoHide: true,
    style: {
      height: '100%',
      width: 148
    }
  }, activeFilter.value === 'presents' && /*#__PURE__*/React$1.createElement(Presents, {
    updateRow,
    activeFilters
  }), activeFilter.value === 'mode' && /*#__PURE__*/React$1.createElement(Mode, {
    updateRow,
    activeFilter
  }), activeFilter.value === 'invert-color' && /*#__PURE__*/React$1.createElement(InvertColor, {
    updateRow,
    activeFilter,
    activeFilters
  }), activeFilter.value === 'drop-shadow' && /*#__PURE__*/React$1.createElement(DropShadow, {
    updateRow,
    activeFilter,
    activeFilters
  }), activeFilter.value !== 'mode' && activeFilter.value !== 'presents' && activeFilter.value !== 'drop-shadow' && activeFilter.value !== 'invert-color' && /*#__PURE__*/React$1.createElement(OtherFilters, {
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
  return /*#__PURE__*/React$1.createElement("div", {
    className: presents
  }, fxPresents.map((item, key) => /*#__PURE__*/React$1.createElement("div", {
    key: key,
    className: `${column} ${activeFilters[0].amount === item.value ? active : ''}`,
    onClick: () => {
      updateRow({
        field: 'amount',
        value: item.value,
        key: 0
      });
    }
  }, /*#__PURE__*/React$1.createElement("div", {
    className: imageBox,
    style: {
      backgroundImage: `url(/images/components/presents/${item.value}.png)`
    }
  }), /*#__PURE__*/React$1.createElement("label", null, item.name))));
};

const InvertColor = ({
  updateRow,
  activeFilter,
  activeFilters
}) => {
  const defaultValue = activeFilter.key ? activeFilters[activeFilter.key]['amount'] : false;
  const [checked, setChecked] = useState(defaultValue);
  const {
    OtherFilter,
    filterName,
    amountBody
  } = style$2;
  useEffect(() => {
    const update = {
      field: 'amount',
      key: activeFilter.key,
      value: checked
    };
    updateRow(update);
  }, [checked]);
  useEffect(() => {
    setChecked(defaultValue);
  }, [defaultValue]);
  return /*#__PURE__*/React$1.createElement("div", {
    className: OtherFilter
  }, /*#__PURE__*/React$1.createElement("label", {
    className: filterName
  }, activeFilter.name), /*#__PURE__*/React$1.createElement("div", {
    className: amountBody
  }, /*#__PURE__*/React$1.createElement("label", null, "Amount"), /*#__PURE__*/React$1.createElement(IosSwitch, {
    setChecked,
    checked
  })));
};

const Mode = ({
  updateRow,
  activeFilter
}) => {
  const [input] = useState();
  const {
    OtherFilter,
    filterName,
    amountBody
  } = style$2;
  useEffect(() => {
    const update = {
      field: 'amount',
      key: activeFilter.key,
      value: input
    };
    updateRow(update);
  }, [input]);
  return /*#__PURE__*/React$1.createElement("div", {
    className: OtherFilter
  }, /*#__PURE__*/React$1.createElement("label", {
    className: filterName
  }, activeFilter.name), /*#__PURE__*/React$1.createElement("div", {
    className: amountBody
  }, /*#__PURE__*/React$1.createElement("label", null, "Amount")));
};

const OtherFilters = ({
  updateRow,
  activeFilter,
  activeFilters
}) => {
  const defaultValue = activeFilter.key ? activeFilters[activeFilter.key]['amount'] : 0;
  const [input, setInput] = useState(defaultValue);
  const {
    OtherFilter,
    filterName,
    amountBody,
    amountInput
  } = style$2;
  useEffect(() => {
    const update = {
      field: 'amount',
      key: activeFilter.key,
      value: input
    };
    updateRow(update);
  }, [input]);
  useEffect(() => {
    setInput(defaultValue);
  }, [defaultValue]);
  return /*#__PURE__*/React$1.createElement("div", {
    className: OtherFilter
  }, /*#__PURE__*/React$1.createElement("label", {
    className: filterName
  }, activeFilter.name), /*#__PURE__*/React$1.createElement("div", {
    className: amountBody
  }, /*#__PURE__*/React$1.createElement("label", null, "Amount"), /*#__PURE__*/React$1.createElement(Input, {
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
  const [x, setX] = useState(defaultValue.x);
  const [y, setY] = useState(defaultValue.y);
  const [blur, setBlur] = useState(defaultValue.blur);
  const [color, setColor] = useState(defaultValue.color);
  const [opacity, setOpacity] = useState(defaultValue.opacity);
  const {
    dropShadow,
    filterName,
    amountBody,
    row,
    amountInput
  } = style$2;
  useEffect(() => {
    setX(defaultValue.x);
    setY(defaultValue.y);
    setBlur(defaultValue.blur);
    setColor(defaultValue.color);
    setOpacity(defaultValue.opacity);
  }, [activeFilters]);
  useEffect(() => {
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
  return /*#__PURE__*/React$1.createElement("div", {
    className: dropShadow
  }, /*#__PURE__*/React$1.createElement("label", {
    className: filterName
  }, activeFilter.name), /*#__PURE__*/React$1.createElement("div", {
    className: amountBody
  }, /*#__PURE__*/React$1.createElement("div", {
    className: row
  }, /*#__PURE__*/React$1.createElement(Input, {
    onChange: setX,
    value: x,
    setValue: setX,
    label: "X",
    size: "normal",
    className: amountInput
  }), /*#__PURE__*/React$1.createElement(Input, {
    onChange: setY,
    value: y,
    setValue: setY,
    label: "Y",
    size: "normal",
    className: amountInput
  })), /*#__PURE__*/React$1.createElement("div", {
    className: row
  }, /*#__PURE__*/React$1.createElement("label", null, "Blur"), /*#__PURE__*/React$1.createElement(Input, {
    onChange: setBlur,
    value: blur,
    setValue: setBlur,
    label: "PX",
    size: "normal",
    className: amountInput
  })), /*#__PURE__*/React$1.createElement("div", {
    className: row
  }, /*#__PURE__*/React$1.createElement(ColorPicker, {
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
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${fxRow}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: `${fxText} ${isActive ? active : ''}`,
    onClick: () => onChange('activeFilter')
  }, row.name), /*#__PURE__*/React$1.createElement(IconButton, {
    className: btn,
    onClick: () => onChange('visible')
  }, row.visible ? /*#__PURE__*/React$1.createElement(EyeIcon$1, null) : /*#__PURE__*/React$1.createElement(EyeCloseIcon$1, null)), /*#__PURE__*/React$1.createElement(IconButton, {
    className: `${btn} ${minus}`,
    onClick: () => onChange('selected')
  }, /*#__PURE__*/React$1.createElement(MinusIcon$1, null)));
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
  const [toggleFxMenu, setToggleFxMenu] = useState(false);
  const [activeFilters, setActiveFilters] = useState(_activeFilters);
  const [activeFilter, setActiveFilter] = useState({
    value: 'presents',
    key: null
  });
  useEffect(() => {
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

  const fxCloseMenuBtn = /*#__PURE__*/createRef();
  const activeFiltersRef = /*#__PURE__*/createRef();
  return /*#__PURE__*/React$1.createElement("div", {
    className: `${fill} ${style[type]}`
  }, /*#__PURE__*/React$1.createElement("div", {
    className: header
  }, /*#__PURE__*/React$1.createElement("label", {
    className: `${layerText} ${style[textColor]}`
  }, text), /*#__PURE__*/React$1.createElement("div", {
    ref: fxCloseMenuBtn,
    className: `${layerBtnAction}`,
    onClick: () => setToggleFxMenu(!toggleFxMenu)
  }, /*#__PURE__*/React$1.createElement(IconButton, null, /*#__PURE__*/React$1.createElement(PlusIcon$1, null))), toggleFxMenu && /*#__PURE__*/React$1.createElement(FxMenu, {
    closeMenu: setToggleFxMenu,
    onChange: onChange,
    closeBtnRef: fxCloseMenuBtn,
    activeFiltersRef: activeFiltersRef,
    setActiveFilters: setActiveFilters,
    setActiveFilter: setActiveFilter,
    activeFilters: activeFilters,
    activeFilter: activeFilter
  })), /*#__PURE__*/React$1.createElement("div", {
    className: activeFillItems,
    ref: activeFiltersRef
  }, activeFilters && activeFilters.map((item, key) => {
    return /*#__PURE__*/React$1.createElement(Fragment, {
      key: key
    }, item.selected ? /*#__PURE__*/React$1.createElement(FxRow, {
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

const RadiusIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 2.5C1 1.67157 1.67157 1 2.5 1H4.5V0H2.5C1.11929 0 0 1.11929 0 2.5V4.5H1V2.5ZM11 2.5C11 1.67157 10.3284 1 9.5 1H7.5V0H9.5C10.8807 0 12 1.11929 12 2.5V4.5H11V2.5ZM2.5 11C1.67157 11 1 10.3284 1 9.5V7.5H0V9.5C0 10.8807 1.11929 12 2.5 12H4.5V11H2.5ZM11 9.5C11 10.3284 10.3284 11 9.5 11H7.5V12H9.5C10.8807 12 12 10.8807 12 9.5V7.5H11V9.5Z",
    fill: "#333333"
  }));
};
const LinkIcon = ({
  width = 14,
  height = 5
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 14 5",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 5L3 5C1.61929 5 0.5 3.88071 0.5 2.5C0.5 1.11929 1.61929 -4.89256e-08 3 -1.09278e-07L5 -1.96701e-07L5 1L3 1C2.17157 1 1.5 1.67157 1.5 2.5C1.5 3.32843 2.17157 4 3 4L5 4L5 5ZM11 5C12.3807 5 13.5 3.88071 13.5 2.5C13.5 1.11929 12.3807 -5.19322e-07 11 -4.5897e-07L9 -3.71547e-07L9 1L11 1C11.8284 1 12.5 1.67157 12.5 2.5C12.5 3.32843 11.8284 4 11 4L9 4L9 5L11 5Z",
    fill: "#333333"
  }));
};
const LinkedIcon = ({
  width = 14,
  height = 5
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 14 5",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 5L3 5C1.61929 5 0.5 3.88071 0.5 2.5C0.5 1.11929 1.61929 -4.89256e-08 3 -1.09278e-07L5 -1.96701e-07L5 1L3 1C2.17157 1 1.5 1.67157 1.5 2.5C1.5 3.32843 2.17157 4 3 4L5 4L5 5ZM11 5C12.3807 5 13.5 3.88071 13.5 2.5C13.5 1.11929 12.3807 -5.19322e-07 11 -4.5897e-07L9 -3.71547e-07L9 1L11 1C11.8284 1 12.5 1.67157 12.5 2.5C12.5 3.32843 11.8284 4 11 4L9 4L9 5L11 5Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "4.5",
    y1: "2.5",
    x2: "9.5",
    y2: "2.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
};
const EyeIcon = ({
  width = 12,
  height = 6
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 6",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.5843 3.99999L10.5843 4H11.6586L11.6586 3.99999C10.8349 1.66961 8.61245 0 6.00002 0C3.38758 0 1.1651 1.66962 0.341431 4H1.41577C2.18779 2.23296 3.95106 1 6.00002 1C8.04897 1 9.81224 2.23295 10.5843 3.99999ZM6 3C5.17157 3 4.5 3.67157 4.5 4.5C4.5 5.32843 5.17157 6 6 6C6.82843 6 7.5 5.32843 7.5 4.5C7.5 3.67157 6.82843 3 6 3Z",
    fill: "#333333"
  }));
};
const EyeCloseIcon = ({
  width = 12,
  height = 4
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 4",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.41577 -4.76837e-07C2.18779 1.76704 3.95106 3 6.00002 3C8.04898 3 9.81225 1.76704 10.5843 1.43051e-06L11.6586 -1.90735e-06C10.8349 2.33038 8.61246 4 6.00002 4C3.38758 4 1.1651 2.33038 0.341431 -9.53674e-07L1.41577 -4.76837e-07Z",
    fill: "#333333"
  }));
};
const TreeDotsIcon = ({
  width = 12,
  height = 2
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 10 2",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1ZM4 1C4 0.447715 4.44772 0 5 0C5.55228 0 6 0.447715 6 1C6 1.55228 5.55228 2 5 2C4.44772 2 4 1.55228 4 1ZM9 0C8.44771 0 8 0.447715 8 1C8 1.55228 8.44771 2 9 2C9.55229 2 10 1.55228 10 1C10 0.447715 9.55229 0 9 0Z",
    fill: "#333333"
  }));
};
const BlendIcon = ({
  width = 8,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M1.21537 6.87311L4 2L6.78463 6.87311C7.5022 8.12884 7.29052 9.70948 6.26784 10.7322C5.01535 11.9847 2.98466 11.9847 1.73216 10.7322C0.709481 9.70948 0.497805 8.12884 1.21537 6.87311Z",
    stroke: "#333333"
  }));
};
const BlendedIcon = ({
  width = 8,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M1 8H7L6.37873 10.4851C6.15615 11.3754 5.35618 12 4.43845 12H3.56155C2.64382 12 1.84385 11.3754 1.62127 10.4851L1 8Z",
    fill: "#999999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M1.21537 6.87311L4 2L6.78463 6.87311C7.5022 8.12884 7.29052 9.70948 6.26784 10.7322C5.01535 11.9847 2.98466 11.9847 1.73216 10.7322C0.709481 9.70948 0.497805 8.12884 1.21537 6.87311Z",
    stroke: "#333333"
  }));
};
const AlignLeftIcon = ({
  width = 13,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "0.5",
    y1: "2.18557e-08",
    x2: "0.499999",
    y2: "12",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "2",
    y1: "4",
    x2: "12",
    y2: "4",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "2",
    y1: "8",
    x2: "6",
    y2: "8",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const AlignCenterVIcon = ({
  width = 13,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "6.5",
    y1: "2.18557e-08",
    x2: "6.5",
    y2: "12",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "1.5",
    y1: "4",
    x2: "11.5",
    y2: "4",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "4.5",
    y1: "8",
    x2: "8.5",
    y2: "8",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const AlignRightIcon = ({
  width = 13,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    y1: "-0.5",
    x2: "12",
    y2: "-0.5",
    transform: "matrix(4.37114e-08 1 1 -4.37114e-08 13 0)",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "1",
    y1: "-1",
    x2: "11",
    y2: "-1",
    transform: "matrix(-1 0 0 1 12 5)",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "1",
    y1: "-1",
    x2: "5",
    y2: "-1",
    transform: "matrix(-1 0 0 1 12 9)",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const AlignTopIcon = ({
  width = 13,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "12",
    y1: "0.5",
    x2: "-4.37114e-08",
    y2: "0.499999",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "12",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "4",
    y1: "2",
    x2: "4",
    y2: "6",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const AlignCenterIcon = ({
  width = 12,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    y1: "6.5",
    x2: "12",
    y2: "6.5",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "4",
    y1: "11.5",
    x2: "4",
    y2: "1.5",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "8",
    y1: "8.5",
    x2: "8",
    y2: "4.5",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const AlignBottomIcon = ({
  width = 12,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "2.78181e-08",
    y1: "12.5",
    x2: "12",
    y2: "12.5",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "4",
    y1: "11",
    x2: "4",
    y2: "1",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "8",
    y1: "11",
    x2: "8",
    y2: "7",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const AlignDistributeVerticalSpacingIcon = ({
  width = 8,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "-2.78181e-08",
    y1: "7.5",
    x2: "12",
    y2: "7.5",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "12",
    y1: "0.5",
    x2: "2.78181e-08",
    y2: "0.500001",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "4",
    y1: "4",
    x2: "8",
    y2: "4",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const AlignDistributeHorizontalSpacingIcon = ({
  width = 8,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "7.5",
    y1: "12",
    x2: "7.5",
    y2: "2.18557e-08",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "0.5",
    y1: "-2.18557e-08",
    x2: "0.500001",
    y2: "12",
    stroke: "#999999"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "4",
    y1: "8",
    x2: "4",
    y2: "4",
    stroke: "#333333",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
};
const LockIcon = ({
  width = 8,
  height = 11
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 11",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4 0C2.34315 0 1 1.34315 1 3V5C0.447715 5 0 5.44772 0 6V9C0 10.1046 0.895431 11 2 11H6C7.10457 11 8 10.1046 8 9V6C8 5.44772 7.55228 5 7 5V3C7 1.34315 5.65685 0 4 0ZM6 5V3C6 1.89543 5.10457 1 4 1C2.89543 1 2 1.89543 2 3V5H6ZM1 9V6H7V9C7 9.55228 6.55228 10 6 10H2C1.44772 10 1 9.55228 1 9Z",
    fill: "#333333"
  }));
};
const LockedIcon = ({
  width = 8,
  height = 11
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 11",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M1.5 5V3C1.5 1.61929 2.61929 0.5 4 0.5V0.5C5.38071 0.5 6.5 1.61929 6.5 3V5",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M0.5 6C0.5 5.72386 0.723858 5.5 1 5.5H7C7.27614 5.5 7.5 5.72386 7.5 6V9C7.5 9.82843 6.82843 10.5 6 10.5H2C1.17157 10.5 0.5 9.82843 0.5 9V6Z",
    fill: "#333333",
    stroke: "#333333",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
const VolumeOnIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("mask", {
    id: "path-1-inside-1",
    fill: "white"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M2 3C0.895431 3 0 3.89543 0 5V7C0 8.10457 0.895431 9 2 9H3L6.4855 11.0913C7.15203 11.4912 8 11.0111 8 10.2338V1.76619C8 0.988896 7.15203 0.508783 6.4855 0.908698L3 3H2Z"
  })), /*#__PURE__*/React$1.createElement("path", {
    d: "M3 9L3.5145 8.14251L3.27698 8H3V9ZM3 3V4H3.27698L3.5145 3.85749L3 3ZM6.4855 11.0913L5.97101 11.9488L6.4855 11.0913ZM-1 5V7H1V5H-1ZM2 10H3V8H2V10ZM2.4855 9.85749L5.97101 11.9488L7 10.2338L3.5145 8.14251L2.4855 9.85749ZM9 10.2338V1.76619H7V10.2338H9ZM5.97101 0.0512046L2.4855 2.14251L3.5145 3.85749L7 1.76619L5.97101 0.0512046ZM3 2H2V4H3V2ZM9 1.76619C9 0.211601 7.30406 -0.748625 5.97101 0.0512046L7 1.76619V1.76619H9ZM5.97101 11.9488C7.30405 12.7486 9 11.7884 9 10.2338H7L7 10.2338L5.97101 11.9488ZM-1 7C-1 8.65685 0.343146 10 2 10V8C1.44772 8 1 7.55228 1 7H-1ZM1 5C1 4.44772 1.44772 4 2 4V2C0.343146 2 -1 3.34315 -1 5H1Z",
    fill: "#333333",
    mask: "url(#path-1-inside-1)"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 7.73243C9.5978 7.38663 10 6.74028 10 6C10 5.25972 9.5978 4.61337 9 4.26756V6V7.73243Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 9.74796C10.7252 9.30392 12 7.73782 12 5.87398C12 4.01014 10.7252 2.44404 9 2V3.04469C10.1652 3.45652 11 4.56776 11 5.87398C11 7.1802 10.1652 8.29144 9 8.70328V9.74796Z",
    fill: "#333333"
  }));
};
const VolumeOffIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3.5145 8.14251L3.27698 8H3H2C1.44772 8 1 7.55229 1 7V5C1 4.44772 1.44772 4 2 4H3H3.27698L3.5145 3.8575L7 1.76619V3H8V1.76619C8 0.988899 7.15203 0.508786 6.4855 0.9087L3 3H2C0.895431 3 0 3.89543 0 5V7C0 8.10457 0.895431 9 2 9H3L6.4855 11.0913C7.15203 11.4912 8 11.0111 8 10.2338V9H7V10.2338L6.4855 11.0913L7 10.2338L3.5145 8.14251Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M6 7.5L9 4.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M9 7.5L6 4.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
}; //SMART LAYOUT

const EdgeAlignTopIcon = ({
  width = 8,
  height = 12,
  color = null
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 12"
  }, /*#__PURE__*/React$1.createElement("path", {
    stroke: color // strokeWidth="1.5"
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
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 8"
  }, /*#__PURE__*/React$1.createElement("path", {
    stroke: color // strokeWidth="1.5"
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
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 8"
  }, /*#__PURE__*/React$1.createElement("path", {
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
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 12"
  }, /*#__PURE__*/React$1.createElement("path", {
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
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React$1.createElement("path", {
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
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 2"
  }, /*#__PURE__*/React$1.createElement("path", {
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
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 2 16"
  }, /*#__PURE__*/React$1.createElement("path", {
    stroke: color,
    strokeLinecap: "round",
    d: "M1 15.5L.999999.5"
  }));
}; // Stroke

const Stroke1Icon = ({
  width = 8,
  height = 8
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 8 8`,
    fill: "transparent"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M8 .5H.5V8",
    stroke: "#999"
  }));
};
const Stroke2Icon = ({
  width = 8,
  height = 8
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 8 8`,
    fill: "transparent"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M8 .5H4.25L.5 4.25V8",
    stroke: "#999"
  }));
};
const Stroke3Icon = ({
  width = 8,
  height = 8
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 8 8`,
    fill: "transparent"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M8 .5H6.5c-3.3137 0-6 2.6863-6 6V8",
    stroke: "#999"
  }));
}; //Tools Panel

const ToolsPanelMenuIcon = ({
  width = 12,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 9",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "0.5",
    y1: "0.5",
    x2: "11.5",
    y2: "0.500001",
    stroke: "#333333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "0.5",
    y1: "4.5",
    x2: "11.5",
    y2: "4.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "0.5",
    y1: "8.5",
    x2: "11.5",
    y2: "8.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
};
const ToolsPanelShareIcon = ({
  width = 15,
  height = 14
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 15 14",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 10V11C0 12.6569 1.34315 14 3 14H12C13.6569 14 15 12.6569 15 11V10H14V11C14 12.1046 13.1046 13 12 13H3C1.89543 13 1 12.1046 1 11V10H0Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M7.5 9L7.5 1M7.5 1L10 3.5M7.5 1L5 3.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
};
const ToolsPanelPlusIcon = ({
  width = 15,
  height = 15
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 15 15",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8 0.5C8 0.223858 7.77614 0 7.5 0C7.22386 0 7 0.223858 7 0.5V7H0.5C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H7V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H8V0.5Z",
    fill: "#333333"
  }));
};
const ToolsPanelLayersIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M7.3292.8944a1.5 1.5 0 011.3416 0l5.5279 2.764c1.1056.5527 1.1056 2.1305 0 2.6832l-5.5279 2.764a1.5 1.5 0 01-1.3416 0l-5.5279-2.764c-1.1056-.5527-1.1056-2.1305 0-2.6832L7.3292.8944z",
    stroke: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.5036 9.25c-1.3996.7695-1.3749 2.8144.0741 3.5389l5.5279 2.7639a2.0002 2.0002 0 001.7888 0l5.5279-2.7639c1.449-.7245 1.4737-2.7694.0741-3.5389a2.1786 2.1786 0 01-.0741.0389l-1.0403.5201.5931.2966c.737.3685.737 1.4203 0 1.7888l-5.5279 2.764a1.0004 1.0004 0 01-.8944 0l-5.5279-2.764c-.737-.3685-.737-1.4203 0-1.7888l.5931-.2966-1.0403-.5201a2.1393 2.1393 0 01-.074-.0389z",
    fill: "#333"
  }));
};
const ToolsPanelArtboardIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("line", {
    x1: "0.5",
    y1: "3.5",
    x2: "15.5",
    y2: "3.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "0.5",
    y1: "12.5",
    x2: "15.5",
    y2: "12.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "3.5",
    y1: "0.5",
    x2: "3.5",
    y2: "15.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "12.5",
    y1: "0.5",
    x2: "12.5",
    y2: "15.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
};
const ToolsPanelPenToolsIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 15 17",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M7.50378 0.949121L13.4302 10.427C13.7517 10.9411 13.732 11.5982 13.3803 12.0922L10.9898 15.4499C10.5207 16.1088 9.76195 16.5 8.9532 16.5H6.38778C5.60662 16.5 4.87037 16.1349 4.39761 15.513L1.78909 12.0819C1.41437 11.589 1.38099 10.9165 1.70507 10.389L7.50378 0.949121Z",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M7.56218 1.5L7.56218 10.2942",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("circle", {
    cx: "7.56218",
    cy: "10.5442",
    r: "1.25",
    fill: "#333333"
  }));
};
const ToolsPanelTextsIcon = ({
  width = 19,
  height = 19
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 19 19",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M0.5 4C0.5 2.067 2.067 0.5 4 0.5H12C13.933 0.5 15.5 2.067 15.5 4V9V12C15.5 13.933 13.933 15.5 12 15.5H10H4C2.067 15.5 0.5 13.933 0.5 12V4Z",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M6 9.5H10V8.5H6V9.5Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.46233 4.30962C8.38519 4.12227 8.20261 4 8 4C7.79738 4 7.6148 4.12227 7.53766 4.30963L4.37103 12H5.45249L8 5.8132L10.5475 12H11.629L8.46233 4.30962Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M16.5 18.5H18.5V16.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
};
const ToolsPanelTextIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M0.5 4C0.5 2.067 2.067 0.5 4 0.5H12C13.933 0.5 15.5 2.067 15.5 4V9V12C15.5 13.933 13.933 15.5 12 15.5H10H4C2.067 15.5 0.5 13.933 0.5 12V4Z",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M6 9.5H10V8.5H6V9.5Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.46233 4.30962C8.38519 4.12227 8.20261 4 8 4C7.79738 4 7.6148 4.12227 7.53766 4.30963L4.37103 12H5.45249L8 5.8132L10.5475 12H11.629L8.46233 4.30962Z",
    fill: "#333333"
  }));
};
const ToolsPanelPathText1Icon = ({
  width = 18,
  height = 14
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 18 14",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M7 5.5H11V4.5H7V5.5Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.46234 0.309625C9.38519 0.122274 9.20261 0 9 0C8.79738 0 8.6148 0.122274 8.53766 0.309625L5.37103 8H6.45249L9 1.8132L11.5475 8H12.629L9.46234 0.309625Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M2.5 13.5C2.5 13.5 5.5 10.5 9 10.5C12.5 10.5 15.5 13.5 15.5 13.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M15.5 13.5L17 12",
    stroke: "#333333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M2.5 13.5L1 12",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
};
const ToolsPanelPathText2Icon = ({
  width = 16,
  height = 14
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 14",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M6 5.5H10V4.5H6V5.5Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.46234 0.309625C8.38519 0.122274 8.20261 0 8 0C7.79738 0 7.6148 0.122274 7.53766 0.309625L4.37103 8H5.45249L8 1.8132L10.5475 8H11.629L8.46234 0.309625Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M0.5 14V14C0.5 12.067 2.067 10.5 4 10.5H12C13.933 10.5 15.5 8.933 15.5 7V7",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
};
const ToolsPanelPathText3Icon = ({
  width = 19,
  height = 20
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 19 20",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M10.5251 5.64644L13.3536 8.47487L14.0607 7.76776L11.2322 4.93933L10.5251 5.64644Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.9364 3.71742C16.0143 3.5304 15.9717 3.31483 15.8284 3.17156C15.6852 3.0283 15.4696 2.98565 15.2826 3.06358L7.60551 6.26235L8.37021 7.02706L14.5463 4.45369L11.9729 10.6298L12.7376 11.3945L15.9364 3.71742Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M1.22182 9.67158V9.67158C2.58866 8.30474 4.80473 8.30474 6.17157 9.67158L10.8284 14.3284C12.1953 15.6953 14.4113 15.6953 15.7782 14.3284V14.3284",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
};
const ToolsPanelNoteIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M0.5 4C0.5 2.067 2.067 0.5 4 0.5H12C13.933 0.5 15.5 2.067 15.5 4V7.5203C15.5 8.35579 15.2011 9.16372 14.6574 9.79807L10.8177 14.2778C10.1527 15.0535 9.182 15.5 8.16026 15.5H4C2.067 15.5 0.5 13.933 0.5 12V4Z",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M9 15.5L9.52198 14.2821C10.1546 12.8059 10.2591 11.1569 9.81792 9.61272V9.61272C9.6586 9.05509 10.0773 8.5 10.6573 8.5H15.5",
    stroke: "#333333"
  }));
};
const ToolsPanelPencilIcon = ({
  width = 8,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("mask", {
    id: "path-1-inside-1",
    fill: "white"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M3.76689 0.601575L-7.01796e-08 10.3226L-9.51811e-08 14C-1.02691e-07 15.1046 0.89543 16 2 16L6 16C7.10457 16 8 15.1046 8 14L8 10.3226L4.23311 0.601575C4.15061 0.388682 3.84939 0.388682 3.76689 0.601575Z"
  })), /*#__PURE__*/React$1.createElement("path", {
    d: "M-7.01796e-08 10.3226L-0.932442 9.96126L-1 10.1356L-1 10.3226L-7.01796e-08 10.3226ZM3.76689 0.601575L4.69933 0.962896L4.69933 0.962895L3.76689 0.601575ZM4.23311 0.601575L5.16555 0.240254L5.16555 0.240254L4.23311 0.601575ZM8 10.3226L9 10.3226L9 10.1356L8.93244 9.96126L8 10.3226ZM0.932441 10.6839L4.69933 0.962896L2.83445 0.240254L-0.932442 9.96126L0.932441 10.6839ZM3.30067 0.962896L7.06756 10.6839L8.93244 9.96126L5.16555 0.240254L3.30067 0.962896ZM7 10.3226L7 14L9 14L9 10.3226L7 10.3226ZM1 14L1 10.3226L-1 10.3226L-1 14L1 14ZM6 15L2 15L2 17L6 17L6 15ZM-1 14C-1 15.6569 0.343146 17 2 17L2 15C1.44772 15 1 14.5523 1 14L-1 14ZM7 14C7 14.5523 6.55228 15 6 15L6 17C7.65686 17 9 15.6569 9 14L7 14ZM4.69933 0.962895C4.45184 1.60158 3.54816 1.60157 3.30067 0.962897L5.16555 0.240254C4.75307 -0.824205 3.24693 -0.824217 2.83445 0.240254L4.69933 0.962895Z",
    fill: "#333333",
    mask: "url(#path-1-inside-1)"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M2 5.5L2.21115 5.60557C3.33726 6.16863 4.66274 6.16863 5.78885 5.60557L6 5.5",
    stroke: "#333333"
  }));
};
const ToolsPanelShapeRectanglesIcon = ({
  width = 19,
  height = 19
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 19 19",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M0.5 4C0.5 2.067 2.067 0.5 4 0.5H12C13.933 0.5 15.5 2.067 15.5 4V9V12C15.5 13.933 13.933 15.5 12 15.5H10H4C2.067 15.5 0.5 13.933 0.5 12V4Z",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M16.5 18.5H18.5V16.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
};
const ToolsPanelShapeRectangleIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M0.5 4C0.5 2.067 2.067 0.5 4 0.5H12C13.933 0.5 15.5 2.067 15.5 4V9V12C15.5 13.933 13.933 15.5 12 15.5H10H4C2.067 15.5 0.5 13.933 0.5 12V4Z",
    stroke: "#333333"
  }));
};
const ToolsPanelShapeEllipseIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("circle", {
    cx: "8",
    cy: "8",
    r: "7.5",
    stroke: "#333333"
  }));
};
const ToolsPanelShapePolygonIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M6.65836 1.80131C7.21115 0.695741 8.78885 0.695741 9.34164 1.80132L15.1056 13.3292C15.6042 14.3265 14.879 15.5 13.7639 15.5H2.23607C1.121 15.5 0.395751 14.3265 0.894427 13.3292L6.65836 1.80131Z",
    stroke: "#333333"
  }));
};
const ToolsPanelShapeStarIcon = ({
  width = 18,
  height = 17
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 18 17",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M8.5516 1.0383c.1834-.3717.7134-.3717.8968 0l1.8095 3.6665a1.5 1.5 0 001.1294.8205l4.0462.588c.4101.0596.5739.5636.2771.8528l-2.9279 2.854a1.5003 1.5003 0 00-.4314 1.3277l.6912 4.0298c.0701.4085-.3586.72-.7254.5271l-3.619-1.9026a1.4996 1.4996 0 00-1.3961 0l-3.619 1.9026c-.3669.1929-.7956-.1186-.7255-.5271l.6911-4.0298a1.5 1.5 0 00-.4313-1.3277l-2.928-2.854c-.2967-.2893-.133-.7932.2772-.8528l4.0462-.588a1.5 1.5 0 001.1294-.8205l1.8095-3.6665z",
    stroke: "#333"
  }));
};
const ToolsPanelShapeLineIcon = ({
  width = 14,
  height = 14
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M.5 13.5l13-13",
    stroke: "#333",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
const ToolsPanelShapeLineArrowIcon = ({
  width = 14,
  height = 14
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M.5 13.5l13-13m0 0h-4m4 0v4",
    stroke: "#333",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
const ToolsPanelSelectionToolsIcon = ({
  width = 13,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("mask", {
    id: "a",
    fill: "#fff"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.6936.631C1.0584.0191 0 .4693 0 1.3511v13.5622c0 .914 1.1251 1.349 1.74.6727L5 12h6.0199c.9 0 1.3419-1.096.6936-1.7203L1.6936.6309z"
  })), /*#__PURE__*/React$1.createElement("path", {
    d: "M5 12v-1h-.4424l-.2975.3273L5 12zm6.7135-1.7203L11.0199 11l.6936-.7203zM-1 1.3512v13.5622h2V1.3512h-2zm3.4799 14.9075l3.26-3.586-1.4798-1.3454L1 14.9134l1.4799 1.3453zM5 13h6.0199v-2H5v2zm7.4072-3.4406L2.3872-.0894 1 1.3512 11.0199 11l1.3873-1.4406zM11.0199 13c1.8 0 2.6839-2.192 1.3873-3.4406L11.0199 11v2zM-1 14.9134c0 1.8281 2.2502 2.698 3.4799 1.3453L1 14.9134h-2zM1 1.3512L2.3873-.0894C1.1169-1.3128-1-.4124-1 1.3512h2z",
    fill: "#333",
    mask: "url(#a)"
  }));
};
const ToolsPanelBrushIcon = ({
  width = 14,
  height = 17
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 14 17",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.72952 1.59806C1.66764 1.28866 1.90429 1 2.21981 1H3.84862L5.22266 1.91603L6.00001 2.43426V1.5V1H11.7802C12.0957 1 12.3324 1.28866 12.2705 1.59806L11.1901 7H12.2099L13.2511 1.79417C13.4367 0.865987 12.7268 0 11.7802 0H5.50001H5.00001V0.5V0.565741L4.27736 0.0839748L4.15139 0H4.00001H2.21981C1.27324 0 0.5633 0.865986 0.748938 1.79417L1.7901 7H2.80991L1.72952 1.59806Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("mask", {
    id: "path-2-inside-1",
    fill: "white"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M1 9C1 8.44772 1.44772 8 2 8H12C12.5523 8 13 8.44772 13 9V10C13 11.1046 12.1046 12 11 12H9L9.25124 14.5124C9.38443 15.8443 8.33853 17 7 17C5.66147 17 4.61557 15.8443 4.74876 14.5124L5 12H3C1.89543 12 1 11.1046 1 10V9Z"
  })), /*#__PURE__*/React$1.createElement("path", {
    d: "M5 12L5.99504 12.0995C6.02315 11.8184 5.93103 11.5385 5.74145 11.329C5.55187 11.1195 5.28253 11 5 11V12ZM9 12V11C8.71747 11 8.44813 11.1195 8.25855 11.329C8.06897 11.5385 7.97685 11.8184 8.00496 12.0995L9 12ZM4.74876 14.5124L3.75372 14.4129L4.74876 14.5124ZM2 9H12V7H2V9ZM12 9V10H14V9H12ZM2 10V9H0V10H2ZM5 11H3V13H5V11ZM11 11H9V13H11V11ZM8.00496 12.0995L8.2562 14.6119L10.2463 14.4129L9.99504 11.9005L8.00496 12.0995ZM5.7438 14.6119L5.99504 12.0995L4.00496 11.9005L3.75372 14.4129L5.7438 14.6119ZM7 16C6.2531 16 5.66948 15.3551 5.7438 14.6119L3.75372 14.4129C3.56167 16.3335 5.06985 18 7 18V16ZM0 10C0 11.6569 1.34315 13 3 13V11C2.44772 11 2 10.5523 2 10H0ZM12 10C12 10.5523 11.5523 11 11 11V13C12.6569 13 14 11.6569 14 10H12ZM8.2562 14.6119C8.33052 15.3551 7.7469 16 7 16V18C8.93015 18 10.4383 16.3335 10.2463 14.4129L8.2562 14.6119ZM12 9H14C14 7.89543 13.1046 7 12 7V9ZM2 7C0.895431 7 0 7.89543 0 9H2V7Z",
    fill: "#333333",
    mask: "url(#path-2-inside-1)"
  }));
};
const ToolsPanelCrayonBrushIcon = ({
  width = 8,
  height = 17
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 17",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 17V7l.9615.2747 1.7253-6.0385a.3257.3257 0 01.6264 0l1.7253 6.0385L7 7v10h1V8c0-.5523-.4477-1-1-1L5.2747.9615a1.3257 1.3257 0 00-2.5494 0L1 7c-.5523 0-1 .4477-1 1v9h1z",
    fill: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#333",
    d: "M8 10.5H0"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8 8H0c0-.5523.4477-1 1-1h6c.5523 0 1 .4477 1 1z",
    fill: "#333"
  }));
};
const ToolsPanelSprayBrushIcon = ({
  width = 12,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M10.5 8v0c0-1.933-1.567-3.5-3.5-3.5H5C3.067 4.5 1.5 6.067 1.5 8v0M7.5 1.5v1c0 .5523-.4477 1-1 1h-1c-.5523 0-1-.4477-1-1v-1c0-.5523.4477-1 1-1h1c.5523 0 1 .4477 1 1z",
    stroke: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10 9H2v7H1V8h10v8h-1V9z",
    fill: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M1 8.5h10",
    stroke: "#333",
    strokeLinecap: "round"
  }));
};
const ToolsPanelInkBrushIcon = ({
  width = 23,
  height = 24
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 23 24",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M12.5 10.5l-9 9",
    stroke: "#333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M18.9939 4.578a.5.5 0 00-.8475-.4316c-.9253.9254-2.1593 1.551-3.5418 2.0734-.6894.2604-1.4043.4911-2.1276.7218l-.1617.0515c-.6666.2124-1.3395.4268-1.9862.662-1.3916.506-2.7275 1.13-3.7139 2.1163C5.6085 10.7781 5 12.1271 5 14h1c0-1.6271.5165-2.7156 1.3223-3.5214.8261-.8262 1.9902-1.3898 3.3486-1.8837.6268-.228 1.281-.4364 1.9518-.6502l.1581-.0504c.722-.2302 1.4602-.4682 2.1772-.739 1.015-.3835 2.0103-.8408 2.8868-1.4582l-.0211.1882c-.0255.228-.0519.4643-.0802.7056-.0984.839-.2218 1.764-.4114 2.6943-.3673 1.8021-.969 3.5474-2.0451 4.7148H12a.5.5 0 00-.4.8l1.1715 1.562c-.1548.0687-.3445.1395-.5633.2074-.5175.1608-1.1703.2977-1.8563.3608-.6874.0633-1.3898.0507-2.0128-.0751-.6257-.1263-1.1364-.3595-1.4855-.7086l-.7072.7071c.5348.5347 1.2527.8319 1.9947.9817.7447.1504 1.5492.16 2.3025.0907.7546-.0695 1.4762-.2198 2.0613-.4016.2924-.0909.5577-.1917.7796-.2978.2125-.1017.4208-.2248.5691-.373A.5001.5001 0 0013.9 16.2L13 15h2.5a.5004.5004 0 00.3536-.1464c1.3808-1.3809 2.0661-3.4439 2.4583-5.3687.198-.9715.3253-1.9292.4248-2.7775.0303-.2588.0579-.5052.084-.7381.0605-.541.1128-1.0091.1732-1.3913z",
    fill: "#333"
  }));
};
const ToolsPanelFillIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M8.5.5h-2c-1.6569 0-3 1.3432-3 3v0c0 1.6569 1.3431 3 3 3h2",
    stroke: "#333",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.6488 8.3559L8.3536 2.0607a.5.5 0 00-.7072 0L5.8536 3.8536a.5.5 0 01-.7072-.7071l1.793-1.793c.5857-.5857 1.5355-.5857 2.1213 0l6.2952 6.2953c.7461.7461-.0223 1.9894-1.0234 1.6558l.1581-.4744-.1581.4744-.4043-.1348a.5.5 0 00-.5117.1208l-5.1487 5.1487c-.9763.9764-2.5593.9764-3.5356 0l-3.6715-3.6715c-.9764-.9763-.9764-2.5592 0-3.5356l2.5857-2.5857.7072.707-2.5858 2.5858c-.5858.5858-.5858 1.5356 0 2.1214l3.6715 3.6715c.5858.5858 1.5356.5858 2.1214 0l5.1487-5.1487a1.5 1.5 0 011.535-.3624l.4044.1348z",
    fill: "#333"
  }));
};
const ToolsPanelRulerIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("rect", {
    x: ".7071",
    y: "11.3137",
    width: "15",
    height: "5",
    rx: ".5",
    transform: "rotate(-45 .7071 11.3137)",
    stroke: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#333",
    strokeLinecap: "round",
    d: "M9.1924 2.8284l1.4142 1.4142M2.8284 9.1924l.7071.7071M4.9497 7.0711L6.364 8.4853M7.0711 4.9497l.7071.7071"
  }));
};
const ToolsPanelBrushesIcon = ({
  width = 18,
  height = 19
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 18 19",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.72952 1.59806C1.66764 1.28866 1.90429 1 2.21981 1H3.84862L5.22266 1.91603L6.00001 2.43426V1.5V1H11.7802C12.0957 1 12.3324 1.28866 12.2705 1.59806L11.1901 7H12.2099L13.2511 1.79417C13.4367 0.865987 12.7268 0 11.7802 0H5.50001H5.00001V0.5V0.565741L4.27736 0.0839748L4.15139 0H4.00001H2.21981C1.27324 0 0.5633 0.865986 0.748938 1.79417L1.7901 7H2.80991L1.72952 1.59806Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("mask", {
    id: "path-2-inside-1",
    fill: "white"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M1 9C1 8.44772 1.44772 8 2 8H12C12.5523 8 13 8.44772 13 9V10C13 11.1046 12.1046 12 11 12H9L9.25124 14.5124C9.38443 15.8443 8.33853 17 7 17C5.66147 17 4.61557 15.8443 4.74876 14.5124L5 12H3C1.89543 12 1 11.1046 1 10V9Z"
  })), /*#__PURE__*/React$1.createElement("path", {
    d: "M5 12L5.99504 12.0995C6.02315 11.8184 5.93103 11.5385 5.74145 11.329C5.55187 11.1195 5.28253 11 5 11V12ZM9 12V11C8.71747 11 8.44813 11.1195 8.25855 11.329C8.06897 11.5385 7.97685 11.8184 8.00496 12.0995L9 12ZM4.74876 14.5124L3.75372 14.4129L4.74876 14.5124ZM2 9H12V7H2V9ZM12 9V10H14V9H12ZM2 10V9H0V10H2ZM5 11H3V13H5V11ZM11 11H9V13H11V11ZM8.00496 12.0995L8.2562 14.6119L10.2463 14.4129L9.99504 11.9005L8.00496 12.0995ZM5.7438 14.6119L5.99504 12.0995L4.00496 11.9005L3.75372 14.4129L5.7438 14.6119ZM7 16C6.2531 16 5.66948 15.3551 5.7438 14.6119L3.75372 14.4129C3.56167 16.3335 5.06985 18 7 18V16ZM0 10C0 11.6569 1.34315 13 3 13V11C2.44772 11 2 10.5523 2 10H0ZM12 10C12 10.5523 11.5523 11 11 11V13C12.6569 13 14 11.6569 14 10H12ZM8.2562 14.6119C8.33052 15.3551 7.7469 16 7 16V18C8.93015 18 10.4383 16.3335 10.2463 14.4129L8.2562 14.6119ZM12 9H14C14 7.89543 13.1046 7 12 7V9ZM2 7C0.895431 7 0 7.89543 0 9H2V7Z",
    fill: "#333333",
    mask: "url(#path-2-inside-1)"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M15.5 18.5H17.5V16.5",
    stroke: "#333333",
    strokeLinecap: "round"
  }));
};
const ShapeModesIcon = ({
  width = 19,
  height = 19
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 19 19",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6 6H3c-1.1046 0-2 .8954-2 2v5c0 1.1046.8954 2 2 2h5c1.1046 0 2-.8954 2-2v-3h3c1.1046 0 2-.8954 2-2V3c0-1.1046-.8954-2-2-2H8c-1.1046 0-2 .8954-2 2v3zM5 3c0-1.6568 1.3431-3 3-3h5c1.6569 0 3 1.3432 3 3v5c0 1.6569-1.3431 3-3 3h-2v2c0 1.6569-1.3431 3-3 3H3c-1.6568 0-3-1.3431-3-3V8c0-1.6569 1.3432-3 3-3h2V3z",
    fill: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M16.5 18.5h2v-2",
    stroke: "#333",
    strokeLinecap: "round"
  }));
};
const ShapeSubtractIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 5H3C1.3432 5 0 6.343 0 8v5c0 1.6568 1.3432 3 3 3h5c1.6569 0 3-1.3432 3-3v-2H8c-1.6569 0-3-1.3432-3-3V5z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M13 1H8c-1.1046 0-2 .8954-2 2v5c0 1.1046.8954 2 2 2h5c1.1046 0 2-.8954 2-2V3c0-1.1046-.8954-2-2-2zM8 0C6.3431 0 5 1.3432 5 3v5c0 1.6569 1.3431 3 3 3h5c1.6569 0 3-1.3431 3-3V3c0-1.6568-1.3431-3-3-3H8z",
    fill: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 5H3C1.3432 5 0 6.343 0 8v5c0 1.6568 1.3432 3 3 3h5c1.6569 0 3-1.3432 3-3v-2h-1v2c0 1.1045-.8954 2-2 2H3c-1.1046 0-2-.8955-2-2V8c0-1.1046.8954-2 2-2h2V5z",
    fill: "#333"
  }));
};
const ShapeIntersectIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.9999 11h-3c-1.6568 0-3-1.3431-3-3V5h3c1.6569 0 3 1.3432 3 3v3z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8 1h5c1.1046 0 2 .8954 2 2v5c0 1.1046-.8954 2-2 2h-2V8c0-1.6569-1.3431-3-3-3H6V3c0-1.1046.8954-2 2-2zM5 5V3c0-1.6568 1.3431-3 3-3h5c1.6569 0 3 1.3432 3 3v5c0 1.6569-1.3431 3-3 3h-2v2c0 1.6569-1.3431 3-3 3H3c-1.6568 0-3-1.3431-3-3V8c0-1.6569 1.3432-3 3-3h2zm5 6v2c0 1.1046-.8954 2-2 2H3c-1.1046 0-2-.8954-2-2V8c0-1.1046.8954-2 2-2h2v2c0 1.6569 1.3431 3 3 3h2zm0-1H8c-1.1046 0-2-.8954-2-2V6h2c1.1046 0 2 .8954 2 2v2z",
    fill: "#333"
  }));
};
const ShapeExcludeIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8 1h5c1.1046 0 2 .8954 2 2v5c0 1.1046-.8954 2-2 2h-2V8c0-1.6569-1.3431-3-3-3H6V3c0-1.1046.8954-2 2-2zM5 5V3c0-1.6568 1.3431-3 3-3h5c1.6569 0 3 1.3432 3 3v5c0 1.6569-1.3431 3-3 3h-2v2c0 1.6569-1.3431 3-3 3H3c-1.6568 0-3-1.3431-3-3V8c0-1.6569 1.3432-3 3-3h2zm5 6v2c0 1.1046-.8954 2-2 2H3c-1.1046 0-2-.8954-2-2V8c0-1.1046.8954-2 2-2h2v2c0 1.6569 1.3431 3 3 3h2zm0-1H8c-1.1046 0-2-.8954-2-2V6h2c1.1046 0 2 .8954 2 2v2z",
    fill: "#333"
  }));
};
const WrapIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 3v10c0 1.1046.8954 2 2 2h10c1.1046 0 2-.8954 2-2V3c0-1.1046-.8954-2-2-2H3c-1.1046 0-2 .8954-2 2zm2-3C1.3432 0 0 1.3432 0 3v10c0 1.6569 1.3432 3 3 3h10c1.6569 0 3-1.3431 3-3V3c0-1.6568-1.3431-3-3-3H3z",
    fill: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#333",
    d: "M5.5 0v16M10.5 0v16M0 10.5h16M0 5.5h16"
  }));
};
const PerspectiveIcon = ({
  width = 16,
  height = 17
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 17",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M7.5 2.5V15M12.5 3.5v10M1 8.5h14M.5 2.947c0-.9483.8692-1.6587 1.7986-1.4699l12 2.4375a1.5 1.5 0 011.2014 1.47v6.3273a1.5 1.5 0 01-1.1149 1.4497l-12 3.1875C1.433 16.602.5 15.8843.5 14.8994V2.9471z",
    stroke: "#333"
  }));
};
const RemoveBGIcon = ({
  width = 18,
  height = 18
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 18 18",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("rect", {
    x: "0.636039",
    y: "15.2426",
    width: "15",
    height: "3",
    rx: "1",
    transform: "rotate(-45 0.636039 15.2426)",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "8.35355",
    y1: "7.64645",
    x2: "10.3536",
    y2: "9.64645",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M5.03107 0.767252C5.19215 0.331943 5.80785 0.331944 5.96893 0.767253L6.50058 2.20402C6.55122 2.34088 6.65912 2.44878 6.79598 2.49942L8.23275 3.03107C8.66806 3.19215 8.66806 3.80785 8.23275 3.96893L6.79598 4.50058C6.65912 4.55122 6.55122 4.65912 6.50058 4.79598L5.96893 6.23275C5.80785 6.66806 5.19215 6.66806 5.03107 6.23275L4.49942 4.79598C4.44878 4.65912 4.34088 4.55122 4.20402 4.50058L2.76725 3.96893C2.33194 3.80785 2.33194 3.19215 2.76725 3.03107L4.20402 2.49942C4.34088 2.44878 4.44878 2.34088 4.49942 2.20402L5.03107 0.767252Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M15.0311 0.767253C15.1922 0.331944 15.8078 0.331944 15.9689 0.767253L16.2305 1.47411C16.2811 1.61097 16.389 1.71887 16.5259 1.76951L17.2327 2.03107C17.6681 2.19215 17.6681 2.80785 17.2327 2.96893L16.5259 3.23049C16.389 3.28113 16.2811 3.38903 16.2305 3.52589L15.9689 4.23275C15.8078 4.66806 15.1922 4.66806 15.0311 4.23275L14.7695 3.52589C14.7189 3.38903 14.611 3.28113 14.4741 3.23049L13.7673 2.96893C13.3319 2.80785 13.3319 2.19215 13.7673 2.03107L14.4741 1.76951C14.611 1.71887 14.7189 1.61097 14.7695 1.47411L15.0311 0.767253Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M15.0384 9.74755C15.1969 9.31901 15.8031 9.31901 15.9616 9.74755C16.0115 9.88228 16.1177 9.98851 16.2524 10.0384C16.681 10.1969 16.681 10.8031 16.2524 10.9616C16.1177 11.0115 16.0115 11.1177 15.9616 11.2524C15.8031 11.681 15.1969 11.681 15.0384 11.2524C14.9885 11.1177 14.8823 11.0115 14.7476 10.9616C14.319 10.8031 14.319 10.1969 14.7476 10.0384C14.8823 9.98851 14.9885 9.88228 15.0384 9.74755Z",
    fill: "#333333"
  }));
};
const Transition3DIcon = ({
  width = 18,
  height = 18
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 18 18",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.6614 14.8783C12.4691 13.4244 13 11.3481 13 9c0-2.348-.5309-4.4244-1.3386-5.8783C10.8348 1.6339 9.8526 1 9 1s-1.8348.6339-2.6614 2.1217C5.555 4.5324 5.0318 6.529 5.0014 8.7915l.645-.645a.5.5 0 11.7072.707l-1.5 1.5001-.3536.3535-.3536-.3535-1.5-1.5a.5.5 0 11.7071-.7072l.6478.6478C4.062 3.9187 6.2768 0 9 0c2.7614 0 5 4.0294 5 9s-2.2386 9-5 9c-1.9632 0-3.6621-2.0366-4.4803-5h1.0408c.2116.7012.4754 1.3335.7781 1.8783C7.1652 16.3661 8.1474 17 9 17s1.8348-.6339 2.6614-2.1217z",
    fill: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.8783 6.3386C13.4244 5.531 11.3481 5 9 5c-2.348 0-4.4244.5309-5.8783 1.3386C1.6339 7.1652 1 8.1474 1 9s.6339 1.8348 2.1217 2.6614C4.5757 12.4691 6.652 13 9 13c2.0068 0 3.8214-.3881 5.2182-1.0101C16.153 11.1282 17 9.9768 17 9c0-.8526-.6339-1.8348-2.1217-2.6614zM18 9c0-2.7614-4.0294-5-9-5S0 6.2386 0 9s4.0294 5 9 5c2.1284 0 4.0842-.4104 5.625-1.0966C16.6825 11.987 18 10.579 18 9z",
    fill: "#333"
  }));
};
const MaskIcon = ({
  width = 18,
  height = 18
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 18 18",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6 17.4879C9.4956 16.2524 12 12.9187 12 9c0-3.9187-2.5044-7.2524-6-8.4879C2.5044 1.7476 0 5.0813 0 9c0 3.9187 2.5044 7.2524 6 8.4879z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("rect", {
    x: ".5",
    y: ".5",
    width: "17",
    height: "17",
    rx: "8.5",
    stroke: "#333"
  }));
};
const ComponentOptionsIcon = ({
  width = 21,
  height = 21
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 21 21",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M14.5 5.5l-9 9M5.6464 5.6268l8.7072 8.7071M8.2322 2.9749c.9763-.9763 2.5593-.9763 3.5356 0l5.2573 5.2573c.9763.9763.9763 2.5593 0 3.5356l-5.2573 5.2573c-.9763.9763-2.5593.9763-3.5356 0L2.975 11.7678c-.9763-.9763-.9763-2.5593 0-3.5356L8.2322 2.975z",
    stroke: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M18.5 20.5h2v-2",
    stroke: "#333",
    strokeLinecap: "round"
  }));
};
const ComponentIcon = ({
  width = 20,
  height = 20
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 20 20",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M14.5 5.5L5.5 14.5",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("line", {
    x1: "5.64645",
    y1: "5.62684",
    x2: "14.3536",
    y2: "14.3339",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M8.23223 2.97487C9.20854 1.99856 10.7915 1.99856 11.7678 2.97487L17.0251 8.23223C18.0014 9.20854 18.0014 10.7915 17.0251 11.7678L11.7678 17.0251C10.7915 18.0014 9.20854 18.0014 8.23223 17.0251L2.97487 11.7678C1.99856 10.7915 1.99856 9.20854 2.97487 8.23223L8.23223 2.97487Z",
    stroke: "#333333"
  }));
};
const SmartObjectsIcon = ({
  width = 16,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 16 17",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 14h4c1.1046 0 2-.8954 2-2V5.4142L10.5858 1H7c-1.1046 0-2 .8954-2 2v5H4V3c0-1.6568 1.3431-3 3-3h4l5 5v7c0 1.6569-1.3431 3-3 3H9v-1z",
    fill: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M10.5 1v3.5c0 .5523.4477 1 1 1H15",
    stroke: "#333"
  }), /*#__PURE__*/React$1.createElement("rect", {
    x: ".5",
    y: "9.5",
    width: "7",
    height: "7",
    rx: "1.5",
    stroke: "#333"
  }));
};
const ColorPickerIcon = ({
  width = 14,
  height = 15
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 14 15",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M8.0607 4.318l2.1213 2.1213-6.7175 6.7176c-.5858.5857-1.5356.5857-2.1214 0-.5857-.5858-.5857-1.5356 0-2.1214L8.0607 4.318z",
    stroke: "#333",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M.636 13.1569a.5.5 0 10.7072.7071l-.7072-.7071zm.7072-.7072l-.7072.7072.7072.7071.707-.7071-.707-.7072z",
    fill: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M13.0104 4.318c.7811-.781.7811-2.0474 0-2.8284-.781-.781-2.0474-.781-2.8284 0L8.0607 3.6109c-.3906.3905-1.0237.3905-1.4143 0l-.3535-.3535a.5.5 0 00-.7071.707l4.9497 4.9498a.5.5 0 10.7071-.707l-.3535-.3537c-.3905-.3905-.3905-1.0236 0-1.4142l2.1213-2.1213z",
    fill: "#333"
  }));
};
const EaseIcon = ({
  width = 18,
  height = 16
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 18 16",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    stroke: "#999",
    d: "M7 1.5h10M1 14.5h10"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M1 14.5S7 15 9 8s8-6.5 8-6.5",
    stroke: "#333"
  }), /*#__PURE__*/React$1.createElement("rect", {
    x: "6",
    y: ".5",
    width: "2",
    height: "2",
    rx: "1",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("rect", {
    x: "10",
    y: "13.5",
    width: "2",
    height: "2",
    rx: "1",
    fill: "#999"
  }));
};
const ArcIcon = ({
  width = 14,
  height = 18
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 14 18",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M1.07923 9.9917C1.27002 10.591 1.8162 11.2382 2.83341 11.8104C4.10544 12.5259 5.93008 13 8 13C9.34972 13 10.5952 12.7984 11.6511 12.4598L12 13.398C10.8233 13.7809 9.45715 14 8 14C3.88034 14 0.487982 12.2484 0.0482375 9.997C-0.0046981 9.72598 0.223858 9.5 0.5 9.5C0.776142 9.5 0.995457 9.72857 1.07923 9.9917Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("circle", {
    cx: "8",
    cy: "3",
    r: "1.5",
    stroke: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.46335 4.36332C9.22785 4.61598 8.9277 4.80758 8.58925 4.91178L12.5239 17.153C13.0497 16.984 13.3389 16.4207 13.1699 15.895L9.46335 4.36332ZM7.41064 4.91174C7.07219 4.80753 6.77205 4.6159 6.53657 4.36322L4.27209 11.4082C4.5703 11.5147 4.89128 11.6096 5.23178 11.6904L7.41064 4.91174ZM3.96594 12.3607C4.26875 12.4677 4.58929 12.5629 4.92493 12.6451L3.47595 17.153C2.95016 16.984 2.66093 16.4207 2.82994 15.895L3.96594 12.3607Z",
    fill: "#333333"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M8 1.5V0",
    stroke: "#333333"
  }));
};
const AlignmentRadiusLabelIcon = ({
  width = 8,
  height = 8
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 8",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M.5 8V5.5c0-2.7614 2.2386-5 5-5H8",
    stroke: "#999"
  }));
};
const AlignmentLineHeightIcon = ({
  width = 8,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4 2a.5.5 0 01.4715.3336L7.1771 10H6.1167l-.7059-2H2.589l-.7059 2H.8226l2.706-7.6664A.5.5 0 014 2zM2.942 7h2.116L4 4.0023 2.942 7z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#999",
    strokeLinecap: "round",
    d: "M7.5.5h-7m0 11h7"
  }));
};
const AlignmentLetterSpacingIcon = ({
  width = 10,
  height = 10
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 10 10",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4.9998 1.5a.5.5 0 01.4682.3244L8.1588 9h-1.068l-.75-2h-2.682l-.75 2h-1.068l2.6909-7.1756A.5.5 0 014.9998 1.5zM4.0338 6h1.932l-.966-2.576L4.0338 6z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#999",
    strokeLinecap: "round",
    d: "M.5.5v9"
  }), /*#__PURE__*/React$1.createElement("path", {
    transform: "matrix(0 1 1 0 10 0)",
    stroke: "#999",
    strokeLinecap: "round",
    d: "M.5-.5h9"
  }));
};
const CopyIcon = ({
  width = 9,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 9 9",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("rect", {
    x: ".5",
    y: ".5",
    width: "6",
    height: "6",
    rx: ".5",
    stroke: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M8.5 2.5v4c0 1.1046-.8954 2-2 2h-4",
    stroke: "#999"
  }));
};
const CheckIcon = ({
  width = 10,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 10 9",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.3796 1.3254l-6 7-.3514.41-.3817-.3819-2.5-2.5.707-.707 2.1183 2.1181 5.6486-6.59.7592.6508z",
    fill: "#999"
  }));
};
const MiniPlusIcon = ({
  width = 5,
  height = 5
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 5 5",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3 2V0H2v2H0v1h2v2h1V3h2V2H3z",
    fill: "#999"
  }));
};
const ChevronArrowIcon = ({
  width = 8,
  height = 4
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 4",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M.2929 0l3.3536 3.3535L4 3.7071l.3536-.3536L7.707 0H6.293L4 2.2929 1.7071 0H.293z",
    fill: "#999"
  }));
};
const SmallChevronArrowIcon = ({
  width = 6,
  height = 3
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 6 3",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M.2929 0l2.3536 2.3535L3 2.7071l.3535-.3536L5.7072 0H4.293L3 1.2929 1.7071 0H.293z",
    fill: "#999"
  }));
};
const ListIcon = ({
  width = 12,
  height = 7
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 7",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 2H4V1h8v1z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("circle", {
    cx: "1.5",
    cy: "1.5",
    r: ".5",
    fill: "#999",
    stroke: "#999",
    strokeWidth: ".5"
  }), /*#__PURE__*/React$1.createElement("circle", {
    cx: "1.5",
    cy: "5.5",
    r: ".5",
    fill: "#999",
    stroke: "#999",
    strokeWidth: ".5"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#999",
    d: "M4 5.5h8"
  }));
};
const PlusIcon = ({
  width = 9,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 9 9",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 4V0H4v4H0v1h4v4h1V5h4V4H5z",
    fill: "#999"
  }));
};
const MinusIcon = ({
  width = 9,
  height = 1
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 9 1",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 1H0V0h9v1z",
    fill: "#999"
  }));
};
const CommandKeyIcon = ({
  width = 10,
  height = 10
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 10 10",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M6.5 3.5H2.25C1.5596 3.5 1 2.9404 1 2.25v0C1 1.5596 1.5596 1 2.25 1v0c.6904 0 1.25.5596 1.25 1.25v5.5C3.5 8.4404 2.9404 9 2.25 9v0C1.5596 9 1 8.4404 1 7.75v0c0-.6904.5596-1.25 1.25-1.25h5.5C8.4404 6.5 9 7.0596 9 7.75v0C9 8.4404 8.4404 9 7.75 9v0C7.0596 9 6.5 8.4404 6.5 7.75v-5.5C6.5 1.5596 7.0596 1 7.75 1v0C8.4404 1 9 1.5596 9 2.25v0c0 .6904-.5596 1.25-1.25 1.25H6.5z",
    stroke: "#999"
  }));
};
const ShiftKeyIcon = ({
  width = 10,
  height = 10
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 10 10",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M6.5 9.5h-3v-4h-2l3.5-4 3.5 4h-2v4z",
    stroke: "#999"
  }));
};
const OptionKeyIcon = ({
  width = 8,
  height = 5
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 5",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M8 4.5H5.5l-3-4H0M6 .5h2",
    stroke: "#999"
  }));
};
const ControlKeyIcon = ({
  width = 8,
  height = 5
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 8 5",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4.3737 1.1678L4 .7474l-.3737.4204L.2199 5h1.338L4 2.2526 6.4421 5h1.338L4.3737 1.1678z",
    fill: "#999"
  }));
};
const DeleteKeyIcon = ({
  width = 11,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 11 9",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M10.5.5v8h-7l-3-4 3-4h7z",
    stroke: "#999",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M4.5 6.5l4-4M8.5 6.5l-4-4",
    stroke: "#999",
    strokeLinecap: "round"
  }));
};
const GridIcon = ({
  width = 11,
  height = 11
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 11 11",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("rect", {
    x: ".5",
    y: ".5",
    width: "10",
    height: "10",
    rx: "1.5",
    stroke: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#999",
    d: "M1 5.5h9M5.5 10V1"
  }));
};
const CrossIcon = ({
  width = 10,
  height = 10
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 10 10",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M9 1L1 9M1 1l8 8",
    stroke: "#999"
  }));
};
const SearchIcon = ({
  width = 11,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 11 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 5c0 2.2091-1.7909 4-4 4-2.2091 0-4-1.7909-4-4 0-2.2091 1.7909-4 4-4 2.2091 0 4 1.7909 4 4zM7.578 9.285C6.8252 9.739 5.943 10 5 10c-2.7614 0-5-2.2386-5-5s2.2386-5 5-5 5 2.2386 5 5c0 1.4552-.6217 2.7652-1.614 3.679l2.4676 2.4674-.7072.7072L7.578 9.285z",
    fill: "#999"
  }));
};
const NewTabIcon = ({
  width = 10,
  height = 10
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 10 10",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M5 5L9.5.5m0 0H6m3.5 0V4",
    stroke: "#999",
    strokeLinecap: "round"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M8.5 7v.5c0 1.1046-.8954 2-2 2h-4c-1.1046 0-2-.8954-2-2v-3c0-1.1046.8954-2 2-2H3",
    stroke: "#999"
  }));
};
const TrashIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M1.6075 3.0497A.5.5 0 012.105 2.5h7.79a.5.5 0 01.4975.5497l-.71 7.0996C9.606 10.9161 8.9608 11.5 8.19 11.5H3.81c-.7706 0-1.4159-.5839-1.4926-1.3507l-.71-7.0996z",
    stroke: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M0 2h12v1H0V2zM4 0h4v1H4V0z",
    fill: "#999"
  }));
};
const EditIcon = ({
  width = 10,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 10 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 7.4142v1.5857h1.5858l5.207-5.207c.438-.438.438-1.148 0-1.5858-.4378-.438-1.1478-.438-1.5857 0l-.6465.6464.793.793-.7072.707-.7929-.7929L1 7.4142zm-1-.4143v3h3l5.5-5.5c.8284-.8284.8284-2.1715 0-3-.8284-.8284-2.1716-.8284-3 0L0 7zM0 13h9v-1H0v1z",
    fill: "#999"
  }));
};
const HelpIcon = ({
  width = 13,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("circle", {
    cx: "6.5",
    cy: "6.5",
    r: "6",
    stroke: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M4.5 6v-.9c0-.8837.7163-1.6 1.6-1.6h.6295C7.7073 3.5 8.5 4.2927 8.5 5.2705v0c0 .447-.2526.8558-.6525 1.0557l-.453.2266A1.618 1.618 0 006.5 8v0",
    stroke: "#999"
  }), /*#__PURE__*/React$1.createElement("rect", {
    x: "5.75",
    y: "8.75",
    width: "1.5",
    height: "1.5",
    rx: ".75",
    fill: "#999"
  }));
};
const InfoIcon = ({
  width = 13,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("circle", {
    cx: "6.5",
    cy: "6.5",
    r: "6",
    stroke: "#999"
  }), /*#__PURE__*/React$1.createElement("rect", {
    x: "5.75",
    y: "8.75",
    width: "1.5",
    height: "1.5",
    rx: ".75",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    fill: "#999",
    d: "M6 3h1v5H6z"
  }));
};
const AddEmojiIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7 10.9a5.022 5.022 0 01-1 .1c-2.7614 0-5-2.2386-5-5s2.2386-5 5-5 5 2.2386 5 5a5.022 5.022 0 01-.1 1h1.017A6.0363 6.0363 0 0012 6c0-3.3137-2.6863-6-6-6S0 2.6863 0 6s2.6863 6 6 6c.3407 0 .6748-.0284 1-.083V10.9z",
    fill: "#999"
  }));
}; // Layers icon

const LayerFolderIcon = ({
  width = 12,
  height = 10
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 10",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M0 3c0-.9319 0-1.3978.1522-1.7654A2 2 0 011.2346.1522C1.6022 0 2.0681 0 3 0h3l1 2h2.75c.6989 0 1.0484 0 1.324.1142.3676.1522.6596.4442.8118.8118C12 3.2016 12 3.551 12 4.25V7c0 .9319 0 1.3978-.1522 1.7654-.203.49-.5924.8794-1.0824 1.0824C10.3978 10 9.9319 10 9 10H3c-.9319 0-1.3978 0-1.7654-.1522A2 2 0 01.1522 8.7654C0 8.3978 0 7.9319 0 7V3z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7 2L6 0H3c-.9319 0-1.3978 0-1.7654.1522A2 2 0 00.1522 1.2346C0 1.6022 0 2.0681 0 3v4c0 .9319 0 1.3978.1522 1.7654a2 2 0 001.0824 1.0824C1.6022 10 2.0681 10 3 10h6c.9319 0 1.3978 0 1.7654-.1522.49-.203.8794-.5924 1.0824-1.0824C12 8.3978 12 7.9319 12 7V4.25c0-.699 0-1.0484-.1142-1.324a1.4997 1.4997 0 00-.8118-.8118C10.7984 2 10.4489 2 9.75 2H7zM5.382 1H3c-.4796 0-.7893.0005-1.0262.0167-.228.0156-.3149.0422-.3565.0594a1 1 0 00-.5412.5412c-.0172.0416-.0438.1285-.0594.3565C1.0005 2.2108 1 2.5204 1 3v4c0 .4796.0005.7893.0167 1.0262.0156.228.0422.3149.0594.3565a1 1 0 00.5412.5412c.0416.0172.1285.0438.3565.0594C2.2108 8.9995 2.5204 9 3 9h6c.4796 0 .7893-.0005 1.0262-.0167.228-.0156.3149-.0422.3565-.0594a1.0001 1.0001 0 00.5412-.5412c.0172-.0416.0438-.1285.0594-.3565C10.9995 7.7892 11 7.4796 11 7V4.25c0-.3631-.0005-.5854-.012-.7527-.0096-.142-.0244-.1845-.026-.1886-.0002-.0005-.0002-.0005 0 0a.5.5 0 00-.2707-.2706c-.0041-.0017-.0466-.0165-.1886-.0261C10.3354 3.0005 10.1131 3 9.75 3H6.382l-1-2z",
    fill: "#999"
  }));
};
const LayerFileIcon = ({
  width = 10,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 10 12`,
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M.5 4.5c0-.706 0-1.21.027-1.607.027-.393.079-.645.163-.85A2.5 2.5 0 012.043.69c.205-.084.457-.136.85-.163C3.29.5 3.794.5 4.5.5h1.293L9.5 4.207V7.5c0 .706 0 1.21-.027 1.607-.027.393-.079.645-.163.85a2.5 2.5 0 01-1.353 1.353c-.205.084-.457.136-.85.163-.397.027-.901.027-1.607.027h-1c-.706 0-1.21 0-1.607-.027-.393-.027-.645-.079-.85-.163A2.5 2.5 0 01.69 9.957C.606 9.752.554 9.5.527 9.107.5 8.71.5 8.206.5 7.5v-3z",
    fill: "#F5F5F5",
    stroke: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M9.5 4.207V4.5H7A1.5 1.5 0 015.5 3V.5h.293L9.5 4.207z",
    fill: "#F5F5F5",
    stroke: "#999"
  }));
};
const LayerVectorIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 2c0 .5523.4477 1 1 1s1-.4477 1-1-.4477-1-1-1-1 .4477-1 1zm-.9192.5645C8.3244 3.3942 9.0915 4 10 4c1.1046 0 2-.8954 2-2s-.8954-2-2-2c-.9533 0-1.7508.667-1.9514 1.5598-3.3814.428-6.0608 3.1074-6.4888 6.4888C.667 8.2491 0 9.0466 0 10c0 1.1046.8954 2 2 2s2-.8954 2-2c0-.9085-.6058-1.6756-1.4355-1.9192.404-2.8543 2.662-5.1123 5.5163-5.5163zM2 9c-.5523 0-1 .4477-1 1s.4477 1 1 1 1-.4477 1-1-.4477-1-1-1z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M0 10c0-1.1046.8954-2 2-2s2 .8954 2 2-.8954 2-2 2-2-.8954-2-2z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 10c0 .5523.4477 1 1 1s1-.4477 1-1-.4477-1-1-1-1 .4477-1 1zm1-2c-1.1046 0-2 .8954-2 2s.8954 2 2 2 2-.8954 2-2-.8954-2-2-2z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M8 2c0-1.1046.8954-2 2-2s2 .8954 2 2-.8954 2-2 2-2-.8954-2-2z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 2c0 .5523.4477 1 1 1s1-.4477 1-1-.4477-1-1-1-1 .4477-1 1zm1-2C8.8954 0 8 .8954 8 2s.8954 2 2 2 2-.8954 2-2-.8954-2-2-2z",
    fill: "#999"
  }));
};
const LayerTextIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M0 4.5c0-1.3978 0-2.0967.2284-2.648A3 3 0 011.852.2284C2.4032 0 3.1021 0 4.5 0h3c1.3978 0 2.0967 0 2.6481.2284a2.9999 2.9999 0 011.6235 1.6236C12 2.4032 12 3.1021 12 4.5v3c0 1.3978 0 2.0967-.2284 2.6481a2.9997 2.9997 0 01-1.6235 1.6235C9.5967 12 8.8978 12 7.5 12h-3c-1.3978 0-2.0967 0-2.648-.2284a2.9999 2.9999 0 01-1.6236-1.6235C0 9.5967 0 8.8978 0 7.5v-3z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7.5 1h-3c-.7126 0-1.197.0005-1.5734.0262-.3675.0251-.5585.0707-.692.126a2 2 0 00-1.0824 1.0824c-.0553.1335-.1009.3245-.126.692C1.0005 3.303 1 3.7874 1 4.5v3c0 .7126.0005 1.197.0262 1.5734.0251.3674.0707.5585.126.692.203.49.5924.8794 1.0824 1.0824.1335.0553.3245.1009.692.126C3.303 10.9995 3.7874 11 4.5 11h3c.7126 0 1.197-.0005 1.5734-.0262.3674-.0251.5585-.0707.692-.126.49-.203.8794-.5924 1.0824-1.0824.0553-.1335.1009-.3246.126-.692C10.9995 8.697 11 8.2126 11 7.5v-3c0-.7126-.0005-1.197-.0262-1.5734-.0251-.3675-.0707-.5585-.126-.692a2.0002 2.0002 0 00-1.0824-1.0824c-.1335-.0553-.3246-.1009-.692-.126C8.697 1.0005 8.2126 1 7.5 1zm-7.2716.852C0 2.4032 0 3.1021 0 4.5v3c0 1.3978 0 2.0967.2284 2.6481a2.9999 2.9999 0 001.6236 1.6235C2.4032 12 3.1021 12 4.5 12h3c1.3978 0 2.0967 0 2.6481-.2284a2.9997 2.9997 0 001.6235-1.6235C12 9.5967 12 8.8978 12 7.5v-3c0-1.3978 0-2.0967-.2284-2.648A2.9999 2.9999 0 0010.1481.2284C9.5967 0 8.8978 0 7.5 0h-3C3.1022 0 2.4033 0 1.852.2284A3 3 0 00.2284 1.852z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6 3a.5.5 0 01.4616.3077L8.8334 9H7.7501l-.4167-1H4.6668L4.25 9H3.1668l2.3717-5.6923A.5.5 0 016.0001 3zm-.9166 4h1.8334L6 4.8 5.0834 7z",
    fill: "#999"
  }));
};
const LayerImageIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7.5 1h-3c-.7126 0-1.197.0005-1.5734.0262-.3675.0251-.5585.0707-.692.126a2 2 0 00-1.0824 1.0824c-.0553.1335-.1009.3245-.126.692C1.0005 3.303 1 3.7874 1 4.5v3c0 .7126.0005 1.197.0262 1.5734.0251.3674.0707.5585.126.692.203.49.5924.8794 1.0824 1.0824.1335.0553.3245.1009.692.126C3.303 10.9995 3.7874 11 4.5 11h3c.7126 0 1.197-.0005 1.5734-.0262.3674-.0251.5585-.0707.692-.126.49-.203.8794-.5924 1.0824-1.0824.0553-.1335.1009-.3246.126-.692C10.9995 8.697 11 8.2126 11 7.5v-3c0-.7126-.0005-1.197-.0262-1.5734-.0251-.3675-.0707-.5585-.126-.692a2.0002 2.0002 0 00-1.0824-1.0824c-.1335-.0553-.3246-.1009-.692-.126C8.697 1.0005 8.2126 1 7.5 1zm-7.2716.852C0 2.4032 0 3.1021 0 4.5v3c0 1.3978 0 2.0967.2284 2.6481a2.9999 2.9999 0 001.6236 1.6235C2.4032 12 3.1021 12 4.5 12h3c1.3978 0 2.0967 0 2.6481-.2284a2.9997 2.9997 0 001.6235-1.6235C12 9.5967 12 8.8978 12 7.5v-3c0-1.3978 0-2.0967-.2284-2.648A2.9999 2.9999 0 0010.1481.2284C9.5967 0 8.8978 0 7.5 0h-3C3.1022 0 2.4033 0 1.852.2284A3 3 0 00.2284 1.852z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M5.2929 6.707l-3 3A1 1 0 002 10.4143V10.5c0 .5523.4477 1 1 1h5.864c1.4558 0 2.636-1.1802 2.636-2.636a.8787.8787 0 00-.2574-.6214l-.5355-.5355c-.3905-.3905-1.0237-.3905-1.4142 0L8.5 8.5 6.7071 6.707c-.3905-.3904-1.0237-.3904-1.4142 0z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.3536 7.0606a.5.5 0 00-.7072 0l-3 3a.5002.5002 0 00-.1464.3536V10.5a.5.5 0 00.5.5h5.864C10.0437 11 11 10.0436 11 8.864a.3787.3787 0 00-.1109-.2678l-.5355-.5356a.5.5 0 00-.7072 0l-1.7928 1.793-.7072-.7072L7.793 8.5 6.3535 7.0606zM8.5 7.793l.4393-.4394c.5858-.5858 1.5356-.5858 2.1214 0l.5355.5356c.2585.2585.4038.6092.4038.9748C12 10.596 10.5959 12 8.864 12H3c-.8284 0-1.5-.6716-1.5-1.5v-.0858c0-.3978.158-.7794.4393-1.0607l3-3c.5858-.5858 1.5356-.5858 2.1214 0L8.5 7.793z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M5 4c0 .5523-.4477 1-1 1s-1-.4477-1-1 .4477-1 1-1 1 .4477 1 1z",
    fill: "#999"
  }));
};
const LayerRectangleIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M0 4.5c0-1.3978 0-2.0967.2284-2.648A3 3 0 011.852.2284C2.4032 0 3.1021 0 4.5 0h3c1.3978 0 2.0967 0 2.6481.2284a2.9999 2.9999 0 011.6235 1.6236C12 2.4032 12 3.1021 12 4.5v3c0 1.3978 0 2.0967-.2284 2.6481a2.9997 2.9997 0 01-1.6235 1.6235C9.5967 12 8.8978 12 7.5 12h-3c-1.3978 0-2.0967 0-2.648-.2284a2.9999 2.9999 0 01-1.6236-1.6235C0 9.5967 0 8.8978 0 7.5v-3z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7.5 1h-3c-.7126 0-1.197.0005-1.5734.0262-.3675.0251-.5585.0707-.692.126a2 2 0 00-1.0824 1.0824c-.0553.1335-.1009.3245-.126.692C1.0005 3.303 1 3.7874 1 4.5v3c0 .7126.0005 1.197.0262 1.5734.0251.3674.0707.5585.126.692.203.49.5924.8794 1.0824 1.0824.1335.0553.3245.1009.692.126C3.303 10.9995 3.7874 11 4.5 11h3c.7126 0 1.197-.0005 1.5734-.0262.3674-.0251.5585-.0707.692-.126.49-.203.8794-.5924 1.0824-1.0824.0553-.1335.1009-.3246.126-.692C10.9995 8.697 11 8.2126 11 7.5v-3c0-.7126-.0005-1.197-.0262-1.5734-.0251-.3675-.0707-.5585-.126-.692a2.0002 2.0002 0 00-1.0824-1.0824c-.1335-.0553-.3246-.1009-.692-.126C8.697 1.0005 8.2126 1 7.5 1zm-7.2716.852C0 2.4032 0 3.1021 0 4.5v3c0 1.3978 0 2.0967.2284 2.6481a2.9999 2.9999 0 001.6236 1.6235C2.4032 12 3.1021 12 4.5 12h3c1.3978 0 2.0967 0 2.6481-.2284a2.9997 2.9997 0 001.6235-1.6235C12 9.5967 12 8.8978 12 7.5v-3c0-1.3978 0-2.0967-.2284-2.648A2.9999 2.9999 0 0010.1481.2284C9.5967 0 8.8978 0 7.5 0h-3C3.1022 0 2.4033 0 1.852.2284A3 3 0 00.2284 1.852z",
    fill: "#999"
  }));
};
const LayerSmartObjectIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M3 2c0-1.1046.8954-2 2-2h3l4 4v5c0 1.1046-.8954 2-2 2H5c-1.1046 0-2-.8954-2-2V2z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M7.5 1v2.5c0 .5523.4477 1 1 1h3",
    stroke: "#999"
  }), /*#__PURE__*/React$1.createElement("rect", {
    x: ".5",
    y: "6.5",
    width: "5",
    height: "5",
    rx: "1",
    fill: "#F5F5F5",
    stroke: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7 10h3c.5523 0 1-.4477 1-1V4.4142L7.5858 1H5c-.5523 0-1 .4477-1 1v3H3V2c0-1.1046.8954-2 2-2h3l4 4v5c0 1.1046-.8954 2-2 2H7v-1z",
    fill: "#999"
  }));
};
const LayerComponentIcon = ({
  width = 14,
  height = 14
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M3.6035 10.3964c-.7703-.7703-1.3203-1.3212-1.7027-1.7924-.3768-.4644-.5535-.8078-.6167-1.1505a2.5001 2.5001 0 010-.907c.0632-.3427.2399-.6861.6167-1.1505.3824-.4712.9324-1.0221 1.7027-1.7925.7704-.7703 1.3213-1.3203 1.7925-1.7027.4644-.3768.8078-.5535 1.1505-.6167a2.5001 2.5001 0 01.907 0c.3427.0632.6861.2399 1.1505.6167.4712.3824 1.0221.9324 1.7924 1.7027.7704.7704 1.3204 1.3213 1.7028 1.7925.3768.4644.5535.8078.6167 1.1505a2.4997 2.4997 0 010 .907c-.0632.3427-.2399.6861-.6167 1.1505-.3824.4712-.9324 1.0221-1.7028 1.7924-.7703.7704-1.3212 1.3204-1.7924 1.7028-.4644.3768-.8078.5535-1.1505.6167a2.4997 2.4997 0 01-.907 0c-.3427-.0632-.6861-.2399-1.1505-.6167-.4712-.3824-1.0221-.9324-1.7925-1.7028zM10.5 3.5l-7 7M3.5 3.5l7 7",
    stroke: "#999"
  }));
};
const LayerMaskIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("rect", {
    width: "12",
    height: "12",
    rx: "6",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4 11.6586A5.9904 5.9904 0 006 12c3.3137 0 6-2.6863 6-6S9.3137 0 6 0a5.9903 5.9903 0 00-2 .3414C6.3304 1.1651 8 3.3876 8 6s-1.6696 4.8349-4 5.6586z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("rect", {
    x: ".5",
    y: ".5",
    width: "11",
    height: "11",
    rx: "5.5",
    stroke: "#999"
  }));
};
const LayerShapeModeUnionIcon = ({
  width = 13,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 5H2c-.5523 0-1 .4477-1 1v5c0 .5523.4477 1 1 1h5c.5523 0 1-.4477 1-1V8h3c.5523 0 1-.4477 1-1V2c0-.5523-.4477-1-1-1H6c-.5523 0-1 .4477-1 1v3zM4 2c0-1.1046.8954-2 2-2h5c1.1046 0 2 .8954 2 2v5c0 1.1046-.8954 2-2 2H9v2c0 1.1046-.8954 2-2 2H2c-1.1046 0-2-.8954-2-2V6c0-1.1046.8954-2 2-2h2V2z",
    fill: "#999"
  }));
};
const LayerShapeModeSubtractIcon = ({
  width = 13,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4 4H2C.8954 4 0 4.8954 0 6v5c0 1.1046.8954 2 2 2h5c1.1046 0 2-.8954 2-2V9H6c-1.1046 0-2-.8954-2-2V4z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("rect", {
    x: "4.5",
    y: ".5",
    width: "8",
    height: "8",
    rx: "1.5",
    stroke: "#999"
  }));
};
const LayerShapeModeIntersectIcon = ({
  width = 13,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 5H2c-.5523 0-1 .4477-1 1v5c0 .5523.4477 1 1 1h5c.5523 0 1-.4477 1-1V8h3c.5523 0 1-.4477 1-1V2c0-.5523-.4477-1-1-1H6c-.5523 0-1 .4477-1 1v3zM4 2c0-1.1046.8954-2 2-2h5c1.1046 0 2 .8954 2 2v5c0 1.1046-.8954 2-2 2H9v2c0 1.1046-.8954 2-2 2H2c-1.1046 0-2-.8954-2-2V6c0-1.1046.8954-2 2-2h2V2z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 9H6c-1.1046 0-2-.8954-2-2V4h3c1.1046 0 2 .8954 2 2v3z",
    fill: "#999"
  }));
};
const LayerShapeModeExcludeIcon = ({
  width = 13,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 13 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 9h2c1.1046 0 2-.8954 2-2V2c0-1.1046-.8954-2-2-2H6C4.8954 0 4 .8954 4 2v2H2C.8954 4 0 4.8954 0 6v5c0 1.1046.8954 2 2 2h5c1.1046 0 2-.8954 2-2V9zM5 5h2c.5523 0 1 .4477 1 1v2H6c-.5523 0-1-.4477-1-1V5z",
    fill: "#999"
  }));
};
const LayerItemIcon = ({
  width = 11,
  height = 13
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 11 13",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M5.0528 1.2236a1 1 0 01.8944 0l4 2a1 1 0 01.5528.8944v4.764a1 1 0 01-.5528.8944l-4 2a1.0004 1.0004 0 01-.8944 0l-4-2A1 1 0 01.5 8.882V4.118a1 1 0 01.5528-.8944l4-2z",
    fill: "#F5F5F5"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4.8292.7764a1.5 1.5 0 011.3416 0l4 2A1.5 1.5 0 0111 4.118v4.764a1.5 1.5 0 01-.8292 1.3416l-4 2a1.5003 1.5003 0 01-1.3416 0l-4-2A1.5 1.5 0 010 8.882V4.118a1.5 1.5 0 01.8292-1.3416l4-2zm.8944.8944a.5.5 0 00-.4472 0l-4 2A.5.5 0 001 4.118v4.764a.5.5 0 00.2764.4472l4 2a.4999.4999 0 00.4472 0l4-2A.5.5 0 0010 8.882V4.118a.5.5 0 00-.2764-.4472l-4-2z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.382 3.5L5.5 5.441 1.618 3.5l-.3416.1708A.5.5 0 001 4.118v.191l4 2v4.882l.2764.1382a.4999.4999 0 00.4472 0L6 11.191V6.309l4-2v-.191a.5.5 0 00-.2764-.4472L9.382 3.5z",
    fill: "#999"
  }));
};
const LayerArtboardIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2.5 0a.5.5 0 01.5.5V2h6V.5a.5.5 0 011 0V2h1.5a.5.5 0 010 1H10v6h1.5a.5.5 0 010 1H10v1.5a.5.5 0 01-1 0V10H3v1.5a.5.5 0 01-1 0V10H.5a.5.5 0 010-1H2V3H.5a.5.5 0 010-1H2V.5a.5.5 0 01.5-.5zM9 9V3H3v6h6z",
    fill: "#999"
  }));
};
const LayerFXIcon = ({
  width = 11,
  height = 7
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 11 7`
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M.314 7V.7h4.041v.891H1.268v1.926H3.86v.837H1.268V7H.314zM5.324 7l1.88-3.15L5.307.7h1.107l1.359 2.268L9.095.7h1.07l-1.88 3.123L10.184 7h-1.09L7.719 4.705 6.413 7h-1.09z",
    fill: "#333"
  }));
};
const LayerFilterIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 2h-.5c-.713 0-1.197 0-1.573.026-.368.025-.559.07-.692.126a2 2 0 00-1.083 1.083c-.055.133-.1.324-.126.692C1.001 4.303 1 4.787 1 5.5v2c0 .713 0 1.197.026 1.573.025.368.07.559.126.692a2 2 0 001.083 1.083c.133.055.324.1.692.126.376.025.86.026 1.573.026h2c.713 0 1.197 0 1.573-.026.368-.025.559-.07.692-.126a2 2 0 001.083-1.083c.055-.133.1-.324.126-.692.025-.376.026-.86.026-1.573V7h1v.5c0 1.398 0 2.097-.228 2.648a3 3 0 01-1.624 1.624C8.597 12 7.898 12 6.5 12h-2c-1.398 0-2.097 0-2.648-.228a3 3 0 01-1.624-1.624C0 9.597 0 8.898 0 7.5v-2c0-1.398 0-2.097.228-2.648a3 3 0 011.624-1.624C2.403 1 3.102 1 4.5 1H5v1z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M7 1c0 3.2-2.667 4-4 4 3.2 0 4 2.667 4 4 0-3.2 2.667-4 4-4-3.2 0-4-2.667-4-4z",
    fill: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M10 0c0 1.6-1.333 2-2 2 1.6 0 2 1.333 2 2 0-1.6 1.333-2 2-2-1.6 0-2-1.333-2-2z",
    fill: "#999"
  }));
};
const LayerVideoIcon = ({
  width = 12,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 12 12"
  }, /*#__PURE__*/React$1.createElement("rect", {
    x: ".5",
    y: ".5",
    width: "11",
    height: "11",
    rx: "2.5",
    fill: "#F5F5F5",
    stroke: "#999"
  }), /*#__PURE__*/React$1.createElement("path", {
    d: "M4 3.883v4.234a.5.5 0 00.757.429l3.528-2.117a.5.5 0 000-.858L4.757 3.454a.5.5 0 00-.757.43z",
    fill: "#999"
  }));
};
const RecentIcon = ({
  width = 15,
  height = 12
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 15 12",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 11c2.7614 0 5-2.2386 5-5s-2.2386-5-5-5-5 2.2386-5 5H3c0-3.3137 2.6863-6 6-6s6 2.6863 6 6-2.6863 6-6 6c-1.5132 0-2.8956-.5602-3.951-1.4845l.6584-.7526C6.587 10.5332 7.739 11 9 11zM8 3v3l1 1h2V6H9V3H8z",
    fill: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M.2929 5l2.8536 2.8536.3535.3535.3535-.3536L6.7072 5H5.293L4 6.2929V6a.5.5 0 00-1 0v.2929L1.7071 5H.293z",
    fill: "#333"
  }));
};
const ResetIcon = ({
  width = 18,
  height = 11
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 18 11",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M13.4784 1.708C12.4765.6553 11.0618-.0008 9.4938-.0008c-3.0376 0-5.5 2.4624-5.5 5.5 0 .4869.0226.931.0663 1.336l.989-.1522c-.0357-.3506-.0553-.7433-.0553-1.1838 0-2.4853 2.0147-4.5 4.5-4.5 1.3052 0 2.4806.5557 3.3026 1.4434l.682-.7346z",
    fill: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1 4.078a.503.503 0 010-.1577v.1578zM1.7875 5l2.3527 2.3527.3536.3536.3535-.3536L7.2001 5H5.7859l-.7921.792v-.2928A.5.5 0 004.5225 5H4.465a.5.5 0 00-.4713.4992v.2929L3.2017 5H1.7875zM5.6949 9.4764c.9873.9434 2.3254 1.5228 3.7989 1.5228 3.0375 0 5.5-2.4625 5.5-5.5 0-.0983-.0026-.196-.0077-.293h-1.0017c.0062.097.0094.1946.0094.293 0 2.4853-2.0147 4.5-4.5 4.5-1.2106 0-2.3096-.478-3.1184-1.2557l-.6805.7329z",
    fill: "#333"
  }), /*#__PURE__*/React$1.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.7875 6l-.7937-.7937v.2929h-1v-.293L13.2001 6h-1.4142l2.3543-2.3544.3536-.3535.3535.3535L17.2017 6h-1.4142z",
    fill: "#333"
  }));
}; //Other

const ArrowLeftIcon = ({
  width = 9,
  height = 7
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 9 7",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("path", {
    fill: "#31363A",
    fillRule: "evenodd",
    d: "M3.147.646a.5.5 0 01.707.708L2.207 3H8.5a.5.5 0 010 1H2.207l1.647 1.646a.5.5 0 11-.707.708l-2.5-2.5L.293 3.5l.354-.354 2.5-2.5z",
    clipRule: "evenodd"
  }));
};
const ArrowRightSecondIcon = ({
  width = 5,
  height = 8
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 5 8",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M1 7l3-3-3-3",
    stroke: "#999",
    strokeLinecap: "round"
  }));
}; //TO Do : delete after test

const HamburgerIcon = ({
  width = 12,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 12 9`,
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    stroke: "#333",
    strokeLinecap: "round",
    d: "M.5.5h11M.5 4.5h11M.5 8.5h11"
  }));
};
const ThumbnailIcon = ({
  width = 9,
  height = 9
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 9 9",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("defs", null), /*#__PURE__*/React$1.createElement("rect", {
    width: "8",
    height: "8",
    x: ".5",
    y: ".5",
    stroke: "#63676C",
    rx: "1.5"
  }), /*#__PURE__*/React$1.createElement("path", {
    stroke: "#B6BABD",
    d: "M1 4.5h7M4.5 8V1"
  }));
};
const ArrowMoreIcon = ({
  width = 3,
  height = 3
}) => {
  return /*#__PURE__*/React$1.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 3 3",
    fill: "none"
  }, /*#__PURE__*/React$1.createElement("path", {
    d: "M.5 2.5h2v-2",
    stroke: "#333",
    "stroke-linecap": "round"
  }));
};

export { AddEmojiIcon, AddMenu, Adjustment, AlignBottomIcon, AlignCenterIcon, AlignCenterVIcon, AlignDistributeHorizontalSpacingIcon, AlignDistributeVerticalSpacingIcon, AlignLeftIcon, AlignRightIcon, AlignTopIcon, Alignment, AlignmentLetterSpacingIcon, AlignmentLineHeightIcon, AlignmentRadiusLabelIcon, ArcIcon, ArrowLeftIcon, ArrowMoreIcon, ArrowRightSecondIcon, BlendIcon, BlendedIcon, CheckIcon, ChevronArrowIcon, ColorPickerIcon, CommandKeyIcon, ComponentIcon, ComponentOptionsIcon, ControlKeyIcon, CopyIcon, CrossIcon, DeleteKeyIcon, Divider, EaseIcon, EdgeAlignBottomIcon, EdgeAlignCenterHorizontalIcon, EdgeAlignCenterIcon, EdgeAlignCenterVerticalIcon, EdgeAlignLeftIcon, EdgeAlignRightIcon, EdgeAlignTopIcon, EditIcon, EyeCloseIcon, EyeIcon, Fill, Fx, GridIcon, HamburgerIcon, HelpIcon, Icon, IconButton, InfoIcon, Input, Item, LayerArtboardIcon, LayerComponentIcon, LayerFXIcon, LayerFileIcon, LayerFilterIcon, LayerFolderIcon, LayerImageIcon, LayerItemIcon, LayerMaskIcon, LayerRectangleIcon, LayerShapeModeExcludeIcon, LayerShapeModeIntersectIcon, LayerShapeModeSubtractIcon, LayerShapeModeUnionIcon, LayerSmartObjectIcon, LayerTextIcon, LayerVectorIcon, LayerVideoIcon, Layers, LinkIcon, LinkedIcon, ListIcon, LockIcon, LockedIcon, MaskIcon, Menu, MiniPlusIcon, MinusIcon, NewTabIcon, OptionKeyIcon, Pages, PerspectiveIcon, PlusIcon, Properties, RadiusIcon, RecentIcon, RemoveBGIcon, ResetIcon, SearchIcon, ShapeExcludeIcon, ShapeIntersectIcon, ShapeModesIcon, ShapeSubtractIcon, ShareButton, ShiftKeyIcon, SmallChevronArrowIcon, SmartLayout, SmartObjectsIcon, Stroke, Stroke1Icon, Stroke2Icon, Stroke3Icon, Text, TextBackground, ThumbnailIcon, ToolbarZoom, ToolsPanelArtboardIcon, ToolsPanelBrushIcon, ToolsPanelBrushesIcon, ToolsPanelCrayonBrushIcon, ToolsPanelFillIcon, ToolsPanelInkBrushIcon, ToolsPanelLayersIcon, ToolsPanelMenuIcon, ToolsPanelNoteIcon, ToolsPanelPathText1Icon, ToolsPanelPathText2Icon, ToolsPanelPathText3Icon, ToolsPanelPenToolsIcon, ToolsPanelPencilIcon, ToolsPanelPlusIcon, ToolsPanelRulerIcon, ToolsPanelSelectionToolsIcon, ToolsPanelShapeEllipseIcon, ToolsPanelShapeLineArrowIcon, ToolsPanelShapeLineIcon, ToolsPanelShapePolygonIcon, ToolsPanelShapeRectangleIcon, ToolsPanelShapeRectanglesIcon, ToolsPanelShapeStarIcon, ToolsPanelShareIcon, ToolsPanelSprayBrushIcon, ToolsPanelTextIcon, ToolsPanelTextsIcon, TopMenu, Transition3DIcon, TrashIcon, TreeDotsIcon, Visibility, VolumeOffIcon, VolumeOnIcon, WrapIcon };
