import React__default, { useEffect, useState, useLayoutEffect, createElement } from 'react';
import { Box, HStack, VStack, Text, Avatar, IconButton as IconButton$1, Stack, Center, StatusBar, Input, Menu as Menu$1, Pressable, PresenceTransition, FlatList } from 'native-base';
import LightbulbFlashLineIcon from 'remixicon-react/LightbulbFlashLineIcon';
import Home4LineIcon from 'remixicon-react/Home4LineIcon';
import ParentLineIcon from 'remixicon-react/ParentLineIcon';
import FootballLineIcon from 'remixicon-react/FootballLineIcon';
import UserFollowLineIcon from 'remixicon-react/UserFollowLineIcon';
import Medal2LineIcon from 'remixicon-react/Medal2LineIcon';
import ArrowLeftLineIcon from 'remixicon-react/ArrowLeftLineIcon';
import More2LineIcon from 'remixicon-react/More2LineIcon';
import TeamLineIcon from 'remixicon-react/TeamLineIcon';
import GovernmentLineIcon from 'remixicon-react/GovernmentLineIcon';
import BookOpenLineIcon from 'remixicon-react/BookOpenLineIcon';
import UserLineIcon from 'remixicon-react/UserLineIcon';
import ArrowLeftSLineIcon from 'remixicon-react/ArrowLeftSLineIcon';
import ArrowRightSLineIcon from 'remixicon-react/ArrowRightSLineIcon';
import ArrowUpSLineIcon from 'remixicon-react/ArrowUpSLineIcon';
import ArrowDownSLineIcon from 'remixicon-react/ArrowDownSLineIcon';
import CalendarCheckLineIcon from 'remixicon-react/CalendarCheckLineIcon';
import PencilLineIcon from 'remixicon-react/PencilLineIcon';
import CheckboxCircleLineIcon from 'remixicon-react/CheckboxCircleLineIcon';
import CloseCircleLineIcon from 'remixicon-react/CloseCircleLineIcon';
import CheckboxBlankCircleLineIcon from 'remixicon-react/CheckboxBlankCircleLineIcon';
import CheckLineIcon from 'remixicon-react/CheckLineIcon';
import Loader4LineIcon from 'remixicon-react/Loader4LineIcon';
import UserSmileLineIcon from 'remixicon-react/UserSmileLineIcon';
import ListUnorderedIcon from 'remixicon-react/ListUnorderedIcon';
import EmotionUnhappyLineIcon from 'remixicon-react/EmotionUnhappyLineIcon';
import { useTranslation } from 'react-i18next';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import axios from 'axios';
import postal from 'postal';

var styles = {"test":"_3ybTi"};

function Header(_ref) {
  var iconComponent = _ref.iconComponent,
      headingComponent = _ref.headingComponent,
      subHeadingComponent = _ref.subHeadingComponent,
      avatar = _ref.avatar,
      heading = _ref.heading,
      subHeading = _ref.subHeading,
      _box = _ref._box,
      _heading = _ref._heading,
      _subHeading = _ref._subHeading,
      title = _ref.title,
      isDisabledHeader = _ref.isDisabledHeader,
      fullRightComponent = _ref.fullRightComponent;
  var newAvatar = sessionStorage.getItem("firstName");
  return !isDisabledHeader ? !fullRightComponent ? React__default.createElement(Box, Object.assign({}, _box, {
    py: 7,
    px: 5
  }), React__default.createElement(HStack, {
    justifyContent: "space-between",
    alignItems: "center"
  }, React__default.createElement(VStack, null, subHeadingComponent ? subHeadingComponent : React__default.createElement(Text, Object.assign({
    fontSize: "12px"
  }, _subHeading), subHeading), headingComponent ? headingComponent : React__default.createElement(Text, Object.assign({
    bold: true,
    fontSize: "24px"
  }, _heading), title ? title : heading)), iconComponent ? iconComponent : avatar ? React__default.createElement(Avatar, {
    bg: "amber.500"
  }, newAvatar === null || newAvatar === void 0 ? void 0 : newAvatar.toUpperCase().substr(0, 2), React__default.createElement(Avatar.Badge, {
    bg: "green.500",
    top: "0"
  })) : React__default.createElement(React__default.Fragment, null))) : fullRightComponent : React__default.createElement(React__default.Fragment, null);
}

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

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["icon", "isDisabled", "prefix", "_fontawesome"];

function IconButton(_ref) {
  var icon = _ref.icon,
      isDisabled = _ref.isDisabled,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  if (!isDisabled) {
    return /*#__PURE__*/React__default.createElement(IconButton$1, _extends({}, props, {
      icon: React__default.cloneElement(icon, props._icon)
    }));
  } else {
    return /*#__PURE__*/React__default.createElement(Stack, props, icon);
  }
}

function IconByName(props) {
  var icon = /*#__PURE__*/React__default.createElement(React__default.Fragment, null);

  switch (props.name) {
    case "ParentLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(ParentLineIcon, null)
      }));
      break;

    case "LightbulbFlashLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(LightbulbFlashLineIcon, null)
      }));
      break;

    case "FootballLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(FootballLineIcon, null)
      }));
      break;

    case "UserFollowLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(UserFollowLineIcon, null)
      }));
      break;

    case "Medal2LineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(Medal2LineIcon, null)
      }));
      break;

    case "ArrowLeftLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(ArrowLeftLineIcon, null)
      }));
      break;

    case "More2LineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(More2LineIcon, null)
      }));
      break;

    case "TeamLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(TeamLineIcon, null)
      }));
      break;

    case "GovernmentLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(GovernmentLineIcon, null)
      }));
      break;

    case "BookOpenLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(BookOpenLineIcon, null)
      }));
      break;

    case "UserLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(UserLineIcon, null)
      }));
      break;

    case "ArrowLeftSLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(ArrowLeftSLineIcon, null)
      }));
      break;

    case "ArrowRightSLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(ArrowRightSLineIcon, null)
      }));
      break;

    case "ArrowDownSLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(ArrowDownSLineIcon, null)
      }));
      break;

    case "ArrowUpSLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(ArrowUpSLineIcon, null)
      }));
      break;

    case "CalendarCheckLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(CalendarCheckLineIcon, null)
      }));
      break;

    case "PencilLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(PencilLineIcon, null)
      }));
      break;

    case "CheckboxCircleLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(CheckboxCircleLineIcon, null)
      }));
      break;

    case "CloseCircleLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(CloseCircleLineIcon, null)
      }));
      break;

    case "CheckboxBlankCircleLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(CheckboxBlankCircleLineIcon, null)
      }));
      break;

    case "CheckLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(CheckLineIcon, null)
      }));
      break;

    case "Loader4LineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(Loader4LineIcon, null)
      }));
      break;

    case "UserSmileLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(UserSmileLineIcon, null)
      }));
      break;

    case "ListUnorderedIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(ListUnorderedIcon, null)
      }));
      break;

    case "EmotionUnhappyLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(EmotionUnhappyLineIcon, null)
      }));
      break;

    default:
      if (props.name !== "Home4LineIcon") {
        console.warn(props.name);
      }

      icon = /*#__PURE__*/React__default.createElement(IconButton, _extends({}, props, {
        icon: /*#__PURE__*/React__default.createElement(Home4LineIcon, null)
      }));
      break;
  }

  return icon;
}

var _excluded$1 = ["menues", "routeDynamics"],
    _excluded2 = ["item", "children"];

function useWindowSize() {
  var _useState = useState([0, 0]),
      size = _useState[0],
      setSize = _useState[1];

  var maxWidth = 1080;
  useLayoutEffect(function () {
    function updateSize() {
      setSize([window.outerWidth > maxWidth ? maxWidth : window.outerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return function () {
      return window.removeEventListener("resize", updateSize);
    };
  }, []);
  return size;
}

function Footer(_ref) {
  var menues = _ref.menues,
      routeDynamics = _ref.routeDynamics,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  var _React$useState = React__default.useState(0),
      selected = _React$useState[0],
      setSelected = _React$useState[1];

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _React$useState2 = React__default.useState({}),
      refFoot = _React$useState2[0],
      serRefFoot = _React$useState2[1];

  var _useWindowSize = useWindowSize(),
      width = _useWindowSize[0];

  var footerMenus = menues;
  useEffect(function () {
    var _window, _window$location;

    if (["/"].includes((_window = window) === null || _window === void 0 ? void 0 : (_window$location = _window.location) === null || _window$location === void 0 ? void 0 : _window$location.pathname)) {
      setSelected(0);
    } else {
      setSelected(1);
    }
  }, []);

  var PressableNew = function PressableNew(_ref2) {
    var item = _ref2.item,
        children = _ref2.children,
        prop = _objectWithoutPropertiesLoose(_ref2, _excluded2);

    return item !== null && item !== void 0 && item.route ? /*#__PURE__*/React__default.createElement(Box, prop, /*#__PURE__*/React__default.createElement(Link, {
      style: {
        textDecoration: "none"
      },
      to: routeDynamics ? generatePath(item.route, _extends({}, {
        id: item.id
      })) : item.route
    }, children)) : /*#__PURE__*/React__default.createElement(Box, prop, children);
  };

  return /*#__PURE__*/React__default.createElement(Stack, null, /*#__PURE__*/React__default.createElement(Box, {
    minH: refFoot === null || refFoot === void 0 ? void 0 : refFoot.clientHeight
  }), /*#__PURE__*/React__default.createElement(Box, {
    flex: 1,
    safeAreaTop: true,
    position: "fixed",
    w: width,
    bottom: "0",
    ref: function ref(e) {
      return serRefFoot(e);
    }
  }, /*#__PURE__*/React__default.createElement(Center, {
    flex: 1
  }), /*#__PURE__*/React__default.createElement(HStack, {
    bg: "white",
    alignItems: "center",
    safeAreaBottom: true,
    shadow: 6
  }, footerMenus.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement(PressableNew, {
      item: item,
      key: index,
      cursor: "pointer",
      opacity: selected === index ? 1 : 0.5,
      py: "3",
      flex: 1,
      onPress: function onPress() {
        return setSelected(0);
      }
    }, /*#__PURE__*/React__default.createElement(Text, {
      color: selected === index ? "button.500" : "coolGray.400"
    }, /*#__PURE__*/React__default.createElement(Center, null, /*#__PURE__*/React__default.createElement(IconByName, {
      name: item.icon
    }), /*#__PURE__*/React__default.createElement(Text, {
      fontSize: "12"
    }, t(item.title)))));
  }))));
}

var _excluded$2 = ["isEnableHamburgerMenuButton", "isEnableLanguageMenu", "isEnableSearchBtn", "setSearch", "color", "languages"];
function AppBar(_ref) {
  var isEnableHamburgerMenuButton = _ref.isEnableHamburgerMenuButton,
      isEnableSearchBtn = _ref.isEnableSearchBtn,
      setSearch = _ref.setSearch,
      color = _ref.color,
      languages = _ref.languages,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$2);

  var _useState = useState(false),
      searchInput = _useState[0],
      setSearchInput = _useState[1];

  var navigate = useNavigate();

  var setLang = function setLang(e) {
    if (e === "logout") {
      sessionStorage.setItem("token", "");
    } else {
      localStorage.setItem("lang", e);
    }

    window.location.reload();
  };

  return /*#__PURE__*/React__default.createElement(Box, {
    pt: 7,
    px: 5
  }, /*#__PURE__*/React__default.createElement(StatusBar, {
    backgroundColor: "gray.600",
    barStyle: "light-content"
  }), /*#__PURE__*/React__default.createElement(Box, {
    safeAreaTop: true,
    backgroundColor: "gray.600"
  }), /*#__PURE__*/React__default.createElement(HStack, {
    bg: "transparent",
    justifyContent: "space-between",
    alignItems: "center"
  }, /*#__PURE__*/React__default.createElement(HStack, {
    space: "4",
    alignItems: "center"
  }, isEnableHamburgerMenuButton ? /*#__PURE__*/React__default.createElement(IconByName, {
    size: "sm",
    name: "bars",
    color: color ? color : ""
  }) : /*#__PURE__*/React__default.createElement(IconByName, {
    size: "sm",
    name: "ArrowLeftLineIcon",
    color: color ? color : "",
    onPress: function onPress() {
      return navigate(-1);
    }
  }), searchInput ? /*#__PURE__*/React__default.createElement(Input, {
    bg: "coolGray.100",
    size: "full",
    InputRightElement: /*#__PURE__*/React__default.createElement(IconByName, {
      size: "sm",
      color: "coolGray.500",
      w: "1/8",
      name: "times",
      pl: "0",
      onPress: function onPress(e) {
        return setSearchInput(false);
      }
    }),
    placeholder: "search",
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    }
  }) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null)), /*#__PURE__*/React__default.createElement(HStack, {
    alignItems: "center"
  }, !searchInput && isEnableSearchBtn ? /*#__PURE__*/React__default.createElement(IconByName, {
    color: color ? color : "",
    size: "sm",
    name: "search",
    onPress: function onPress(e) {
      return setSearchInput(true);
    }
  }) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null), /*#__PURE__*/React__default.createElement(Center, {
    flex: 1,
    px: "3"
  }, /*#__PURE__*/React__default.createElement(Menu$1, {
    w: "190",
    trigger: function trigger(triggerProps) {
      return /*#__PURE__*/React__default.createElement(Pressable, _extends({
        accessibilityLabel: "More options menu"
      }, triggerProps), /*#__PURE__*/React__default.createElement(IconByName, {
        size: "sm",
        name: "More2LineIcon",
        isDisabled: true,
        color: color ? color : ""
      }));
    }
  }, languages.map(function (e, index) {
    return /*#__PURE__*/React__default.createElement(Menu$1.Item, {
      key: index,
      label: e.title,
      textValue: e.code,
      onPress: function onPress(item) {
        return setLang(e.code);
      }
    }, e.title);
  }), /*#__PURE__*/React__default.createElement(Menu$1.Item, {
    onPress: function onPress(item) {
      return setLang("logout");
    }
  }, "Logout"))))));
}

function Layout(_ref) {
  var isDisabledAppBar = _ref.isDisabledAppBar,
      subHeader = _ref.subHeader,
      children = _ref.children,
      imageUrl = _ref.imageUrl,
      _appBar = _ref._appBar,
      _header = _ref._header,
      _subHeader = _ref._subHeader,
      _footer = _ref._footer;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Stack, {
    width: "100%",
    style: {
      backgroundImage: imageUrl ? "url(" + imageUrl + ")" : "url(" + window.location.origin + "/headerBg.png)",
      backgroundColor: "transparent",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    },
    space: 5
  }, !isDisabledAppBar ? /*#__PURE__*/React__default.createElement(AppBar, _extends({
    color: imageUrl ? "white" : ""
  }, _appBar)) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null), _header ? /*#__PURE__*/React__default.createElement(Header, _header) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null)), subHeader ? /*#__PURE__*/React__default.createElement(Box, _extends({
    p: 4,
    position: "relative",
    bg: "purple.400",
    roundedTop: "20",
    _text: {
      textTransform: "inherit"
    }
  }, _subHeader), subHeader) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null), children, /*#__PURE__*/React__default.createElement(Footer, _footer));
}

var _excluded$3 = ["route", "children"];

var chunk = function chunk(array, _chunk) {
  return [].concat.apply([], array.map(function (elem, i) {
    return i % _chunk ? [] : [array.slice(i, i + _chunk)];
  }));
};

var PressableNew = function PressableNew(_ref) {
  var route = _ref.route,
      children = _ref.children,
      prop = _objectWithoutPropertiesLoose(_ref, _excluded$3);

  return route ? /*#__PURE__*/React__default.createElement(Pressable, prop, /*#__PURE__*/React__default.createElement(Link, {
    style: {
      color: "rgb(63, 63, 70)",
      textDecoration: "none"
    },
    to: route
  }, children)) : /*#__PURE__*/React__default.createElement(Box, prop, children);
};

function Widget(_ref2) {
  var data = _ref2.data,
      title = _ref2.title;
  var newData = chunk(data ? data : [], 2);
  var rotate = {
    bottom: "-20px",
    right: "-20px",
    minW: "50px",
    minH: "50px",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    style: {
      transform: "rotateZ(316deg)"
    }
  };
  return /*#__PURE__*/React__default.createElement(Stack, {
    space: 2
  }, /*#__PURE__*/React__default.createElement(Text, {
    fontSize: "lg"
  }, title), /*#__PURE__*/React__default.createElement(VStack, {
    space: 3
  }, newData.map(function (subData, index) {
    return /*#__PURE__*/React__default.createElement(HStack, {
      key: index,
      space: 3,
      width: "100%"
    }, subData.map(function (item, subIndex) {
      return /*#__PURE__*/React__default.createElement(Box, _extends({
        key: subIndex,
        rounded: "xl",
        shadow: 3,
        p: 4,
        width: "48%",
        overflow: "hidden"
      }, item === null || item === void 0 ? void 0 : item._box), /*#__PURE__*/React__default.createElement(PressableNew, {
        route: item.link
      }, /*#__PURE__*/React__default.createElement(Text, _extends({
        fontSize: "md",
        fontWeight: "medium",
        color: "coolGray.50"
      }, item === null || item === void 0 ? void 0 : item._text), /*#__PURE__*/React__default.createElement(VStack, null, /*#__PURE__*/React__default.createElement(Text, {
        bold: true
      }, item === null || item === void 0 ? void 0 : item.title), /*#__PURE__*/React__default.createElement(Text, {
        fontSize: "xs"
      }, item === null || item === void 0 ? void 0 : item.subTitle))), item.icon ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Box, _extends({}, rotate, {
        bg: "coolGray.700",
        roundedTop: "20px",
        opacity: "0.1"
      })), /*#__PURE__*/React__default.createElement(IconByName, _extends({
        name: item.icon
      }, _extends({
        color: "coolGray.700",
        opacity: "0.5"
      }, rotate, item === null || item === void 0 ? void 0 : item._icon)))) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null)));
    }));
  })));
}

var Collapsible = function Collapsible(_ref) {
  var _ref$header = _ref.header,
      header = _ref$header === void 0 ? "" : _ref$header,
      children = _ref.children,
      _ref$isHeaderBold = _ref.isHeaderBold,
      isHeaderBold = _ref$isHeaderBold === void 0 ? true : _ref$isHeaderBold;

  var _useState = useState(false),
      isOpen = _useState[0],
      setIsOpen = _useState[1];

  return /*#__PURE__*/React__default.createElement(Box, {
    bg: "white",
    p: 4
  }, /*#__PURE__*/React__default.createElement(Stack, {
    space: 2
  }, /*#__PURE__*/React__default.createElement(Pressable, {
    onPress: function onPress() {
      return setIsOpen(!isOpen);
    }
  }, /*#__PURE__*/React__default.createElement(Box, {
    px: 2,
    py: 1
  }, /*#__PURE__*/React__default.createElement(HStack, {
    alignItems: "center",
    justifyContent: "space-between"
  }, /*#__PURE__*/React__default.createElement(Text, {
    bold: typeof isHeaderBold === "undefined" ? true : isHeaderBold,
    fontSize: typeof isHeaderBold === "undefined" ? "md" : ""
  }, header), /*#__PURE__*/React__default.createElement(IconByName, {
    size: "sm",
    isDisabled: true,
    color: !isOpen ? "coolGray.400" : "coolGray.600",
    name: !isOpen ? "ArrowDownSLineIcon" : "ArrowUpSLineIcon"
  })))), /*#__PURE__*/React__default.createElement(PresenceTransition, {
    visible: isOpen,
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 250
      }
    }
  }, isOpen ? children : /*#__PURE__*/React__default.createElement(React__default.Fragment, null))));
};

var _excluded$4 = ["item", "children"];
function Menu(_ref) {
  var items = _ref.items,
      type = _ref.type,
      routeDynamics = _ref.routeDynamics,
      bg = _ref.bg,
      _box = _ref._box,
      _boxMenu = _ref._boxMenu,
      _icon = _ref._icon;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var chunk = function chunk(array, _chunk) {
    return [].concat.apply([], array.map(function (elem, i) {
      return i % _chunk ? [] : [array.slice(i, i + _chunk)];
    }));
  };

  var PressableNew = function PressableNew(_ref2) {
    var item = _ref2.item,
        children = _ref2.children,
        prop = _objectWithoutPropertiesLoose(_ref2, _excluded$4);

    return item !== null && item !== void 0 && item.route ? /*#__PURE__*/React__default.createElement(Pressable, prop, /*#__PURE__*/React__default.createElement(Link, {
      style: {
        color: "rgb(63, 63, 70)",
        textDecoration: "none"
      },
      to: routeDynamics ? generatePath(item.route, _extends({}, {
        id: item.id
      })) : item.route
    }, children)) : /*#__PURE__*/React__default.createElement(Box, prop, children);
  };

  if (type === "veritical") {
    var newItems = chunk(items, 3);
    return /*#__PURE__*/React__default.createElement(Box, _extends({
      bg: bg
    }, _box), newItems.map(function (subItems, index) {
      return /*#__PURE__*/React__default.createElement(HStack, {
        key: index,
        justifyContent: "center",
        space: 4
      }, subItems.map(function (item) {
        return /*#__PURE__*/React__default.createElement(PressableNew, {
          key: item.keyId ? item.keyId : item.id,
          item: item,
          bg: "button.500",
          rounded: "md",
          p: "2",
          minW: item !== null && item !== void 0 && item.boxMinW ? item === null || item === void 0 ? void 0 : item.boxMinW : "104px"
        }, /*#__PURE__*/React__default.createElement(VStack, {
          space: "2",
          my: "2",
          mx: "1",
          alignItems: "center",
          textAlign: "center"
        }, item.icon ? /*#__PURE__*/React__default.createElement(IconByName, _extends({
          name: item.icon,
          p: "0",
          color: "white",
          _icon: {
            style: {
              fontSize: "28px"
            }
          }
        }, _icon)) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null), /*#__PURE__*/React__default.createElement(Text, _extends({
          color: "white",
          maxW: 20,
          lineHeight: 14
        }, item === null || item === void 0 ? void 0 : item._text), item.title)));
      }));
    }));
  } else {
    return /*#__PURE__*/React__default.createElement(Box, _extends({
      bg: bg
    }, _box), /*#__PURE__*/React__default.createElement(FlatList, {
      data: items,
      renderItem: function renderItem(_ref3) {
        var _item$_boxMenu;

        var item = _ref3.item;
        return /*#__PURE__*/React__default.createElement(Box, _extends({
          borderBottomWidth: "1",
          _dark: {
            borderColor: "gray.600"
          },
          borderLeftWidth: "5",
          borderLeftColor: item.activeMenu ? "primary.500" : item !== null && item !== void 0 && (_item$_boxMenu = item._boxMenu) !== null && _item$_boxMenu !== void 0 && _item$_boxMenu.bg ? item._boxMenu.bg : _boxMenu !== null && _boxMenu !== void 0 && _boxMenu.bg ? _boxMenu === null || _boxMenu === void 0 ? void 0 : _boxMenu.bg : bg,
          borderColor: "coolGray.200"
        }, _boxMenu, item._boxMenu), /*#__PURE__*/React__default.createElement(PressableNew, {
          item: item
        }, /*#__PURE__*/React__default.createElement(HStack, {
          space: 3,
          justifyContent: "space-between",
          width: "100%"
        }, /*#__PURE__*/React__default.createElement(HStack, {
          space: item.leftText || item.icon ? "7" : "",
          alignItems: "center"
        }, item.leftText ? /*#__PURE__*/React__default.createElement(Text, {
          color: "gray.700",
          fontWeight: "500"
        }, item.leftText) : item.icon ? /*#__PURE__*/React__default.createElement(IconByName, _extends({
          name: item.icon,
          p: "0"
        }, _icon)) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null), /*#__PURE__*/React__default.createElement(Text, {
          color: "gray.700",
          fontWeight: "500"
        }, t(item.title))), /*#__PURE__*/React__default.createElement(IconByName, _extends({
          name: item.rightIcon ? item.rightIcon : "ArrowRightSLineIcon",
          p: "0",
          color: "#C1C1DE"
        }, _icon)))));
      },
      keyExtractor: function keyExtractor(item, index) {
        return item.id ? item.id : index;
      }
    }));
  }
}

var maxWidth = "1080";
var fontFamily = localStorage.getItem("lang") === "hi" ? "'Baloo 2'" : "Inter";
var fontSize = localStorage.getItem("lang") === "hi" ? "20px" : "";
var red = {
  50: "#fef2f2",
  100: "#fde5e5",
  150: "#fcd7d7",
  200: "#fbcaca",
  250: "#fabdbd",
  300: "#f9b0b0",
  350: "#f8a3a3",
  400: "#f79595",
  450: "#f68888",
  500: "#f57b7b",
  550: "#dd6f6f",
  600: "#c46262",
  650: "#ac5656",
  700: "#934a4a",
  750: "#7b3e3e",
  800: "#623131",
  850: "#492525",
  900: "#311919",
  950: "#180c0c"
};
var green = {
  50: "#e7f4e8",
  100: "#cfe9d1",
  150: "#b6debb",
  200: "#9ed3a4",
  250: "#86c98d",
  300: "#6ebe76",
  350: "#56b35f",
  400: "#3da849",
  450: "#259d32",
  500: "#0d921b",
  550: "#0c8318",
  600: "#0a7516",
  650: "#096613",
  700: "#085810",
  750: "#07490e",
  800: "#053a0b",
  850: "#042c08",
  900: "#031d05",
  950: "#010f03"
};
var DEFAULT_THEME = {
  fonts: {
    heading: fontFamily,
    body: fontFamily,
    mono: fontFamily
  },
  components: {
    Text: {
      baseStyle: {
        textTransform: "capitalize",
        fontFamily: fontFamily,
        fontSize: fontSize
      }
    },
    Actionsheet: {
      baseStyle: {
        maxW: maxWidth,
        alignSelf: "center"
      }
    },
    Button: {
      baseStyle: {
        rounded: "lg"
      },
      defaultProps: {
        colorScheme: "button"
      }
    }
  },
  colors: {
    studentCard: {
      500: "#B9FBC0"
    },
    classCard: {
      500: "#D9F0FC"
    },
    attendanceCard: {
      500: "#C9AFF4"
    },
    attendanceCardText: {
      400: "#9C9EA0",
      500: "#373839"
    },
    reportCard: {
      500: "#FFCAAC"
    },
    present: green,
    presentCardBg: {
      400: "#CEEED1",
      500: "#DFFDE2",
      600: "#cae3ce"
    },
    presentCardCompareBg: {
      500: "#ECFBF2",
      600: "#cae3ce"
    },
    presentCardText: {
      500: "#07C71B"
    },
    presentCardCompareText: {
      500: "#FA8129"
    },
    absent: red,
    absentCardBg: {
      500: "#FDE7E7",
      600: "#dfcbcb"
    },
    absentCardCompareBg: {
      500: "#FFF6F6",
      600: "#dfcbcb"
    },
    absentCardText: red,
    absentCardCompareText: {
      500: "#FA8129"
    },
    special_duty: {
      500: "#06D6A0"
    },
    weekCardCompareBg: {
      500: "#FFF8F7"
    },
    reportBoxBg: {
      400: "#FFF8F7",
      500: "#FEF1EE",
      600: "#ede7e6"
    },
    button: {
      50: "#fcf1ee",
      100: "#fae2dd",
      200: "#f5c8bc",
      300: "#f2ab99",
      400: "#ee8e78",
      500: "#F87558",
      600: "#d9654c"
    },
    attendancePresent: {
      600: "#2BB639",
      500: "#2BB639"
    },
    attendanceAbsent: red,
    attendanceUnmarked: {
      100: "#F0F0F4",
      300: "#B5B5C8",
      400: "#d3d3e5",
      500: "#C4C4D4",
      600: "#C4C4D4"
    },
    timeTableCardOrange: {
      500: "#FFF7F5"
    }
  }
};

function fetchToken(authUrl, username, password) {
  var params = new URLSearchParams();
  params.append("client_id", "registry-frontend");
  params.append("username", username);
  params.append("password", password);
  params.append("grant_type", "password");
  var config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    }
  };
  return axios.post(authUrl, params, config)["catch"](function (e) {
    return e;
  });
}

var update = function update(url, body, headers) {
  if (headers === void 0) {
    headers = {};
  }

  try {
    var _headers3;

    return Promise.resolve(axios.put(url, body, _extends({}, headers, {
      headers: _extends({}, (_headers3 = headers) === null || _headers3 === void 0 ? void 0 : _headers3.headers, {
        "Access-Control-Allow-Origin": "*"
      })
    })));
  } catch (e) {
    return Promise.reject(e);
  }
};
var post = function post(url, body, headers) {
  if (headers === void 0) {
    headers = {};
  }

  try {
    var _headers2;

    return Promise.resolve(axios.post(url, body, _extends({}, headers, {
      headers: _extends({}, (_headers2 = headers) === null || _headers2 === void 0 ? void 0 : _headers2.headers, {
        "Access-Control-Allow-Origin": "*"
      })
    })));
  } catch (e) {
    return Promise.reject(e);
  }
};
var get = function get(url, headers) {
  if (headers === void 0) {
    headers = {};
  }

  try {
    var _headers;

    return Promise.resolve(axios.get(url, _extends({}, headers, {
      headers: _extends({}, (_headers = headers) === null || _headers === void 0 ? void 0 : _headers.headers, {
        "Access-Control-Allow-Origin": "*"
      })
    })));
  } catch (e) {
    return Promise.reject(e);
  }
};

var EventBus = /*#__PURE__*/function () {
  function EventBus() {
    this.channel = postal.channel("app_events");
  }

  var _proto = EventBus.prototype;

  _proto.publish = function publish(topic, message) {
    this.channel.publish(topic, message);
  };

  _proto.subscribe = function subscribe(topic, callbackfunction) {
    return this.channel.subscribe(topic, callbackfunction);
  };

  _proto.unsubscribe = function unsubscribe(subscription) {
    subscription.unsubscribe();
  };

  return EventBus;
}();

var eventBus = new EventBus();

var ExampleComponent = function ExampleComponent(_ref) {
  var text = _ref.text;
  return createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

export { Collapsible, DEFAULT_THEME, ExampleComponent, Footer, Header, IconByName, Layout, Menu, Widget, eventBus, fetchToken, get, post, update };
//# sourceMappingURL=index.modern.js.map
