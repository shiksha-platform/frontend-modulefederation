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

var styles = {"test":"_styles-module__test__3ybTi"};

function Header({
  iconComponent,
  headingComponent,
  subHeadingComponent,
  avatar,
  heading,
  subHeading,
  _box,
  _heading,
  _subHeading,
  title,
  isDisabledHeader,
  fullRightComponent
}) {
  let newAvatar = sessionStorage.getItem("firstName");
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

function IconButton({
  icon,
  isDisabled,
  prefix,
  _fontawesome,
  ...props
}) {
  if (!isDisabled) {
    return /*#__PURE__*/React__default.createElement(IconButton$1, Object.assign({}, props, {
      icon: React__default.cloneElement(icon, props._icon)
    }));
  } else {
    return /*#__PURE__*/React__default.createElement(Stack, props, icon);
  }
}

function IconByName(props) {
  let icon = /*#__PURE__*/React__default.createElement(React__default.Fragment, null);

  switch (props.name) {
    case "ParentLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(ParentLineIcon, null)
      }));
      break;

    case "LightbulbFlashLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(LightbulbFlashLineIcon, null)
      }));
      break;

    case "FootballLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(FootballLineIcon, null)
      }));
      break;

    case "UserFollowLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(UserFollowLineIcon, null)
      }));
      break;

    case "Medal2LineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(Medal2LineIcon, null)
      }));
      break;

    case "ArrowLeftLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(ArrowLeftLineIcon, null)
      }));
      break;

    case "More2LineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(More2LineIcon, null)
      }));
      break;

    case "TeamLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(TeamLineIcon, null)
      }));
      break;

    case "GovernmentLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(GovernmentLineIcon, null)
      }));
      break;

    case "BookOpenLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(BookOpenLineIcon, null)
      }));
      break;

    case "UserLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(UserLineIcon, null)
      }));
      break;

    case "ArrowLeftSLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(ArrowLeftSLineIcon, null)
      }));
      break;

    case "ArrowRightSLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(ArrowRightSLineIcon, null)
      }));
      break;

    case "ArrowDownSLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(ArrowDownSLineIcon, null)
      }));
      break;

    case "ArrowUpSLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(ArrowUpSLineIcon, null)
      }));
      break;

    case "CalendarCheckLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(CalendarCheckLineIcon, null)
      }));
      break;

    case "PencilLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(PencilLineIcon, null)
      }));
      break;

    case "CheckboxCircleLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(CheckboxCircleLineIcon, null)
      }));
      break;

    case "CloseCircleLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(CloseCircleLineIcon, null)
      }));
      break;

    case "CheckboxBlankCircleLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(CheckboxBlankCircleLineIcon, null)
      }));
      break;

    case "CheckLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(CheckLineIcon, null)
      }));
      break;

    case "Loader4LineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(Loader4LineIcon, null)
      }));
      break;

    case "UserSmileLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(UserSmileLineIcon, null)
      }));
      break;

    case "ListUnorderedIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(ListUnorderedIcon, null)
      }));
      break;

    case "EmotionUnhappyLineIcon":
      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(EmotionUnhappyLineIcon, null)
      }));
      break;

    default:
      if (props.name !== "Home4LineIcon") {
        console.warn(props.name);
      }

      icon = /*#__PURE__*/React__default.createElement(IconButton, Object.assign({}, props, {
        icon: /*#__PURE__*/React__default.createElement(Home4LineIcon, null)
      }));
      break;
  }

  return icon;
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  const maxWidth = 1080;
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.outerWidth > maxWidth ? maxWidth : window.outerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function Footer({
  menues,
  routeDynamics,
  ...props
}) {
  const [selected, setSelected] = React__default.useState(0);
  const {
    t
  } = useTranslation();
  const [refFoot, serRefFoot] = React__default.useState({});
  const [width] = useWindowSize();
  const footerMenus = menues;
  useEffect(() => {
    var _window, _window$location;

    if (["/"].includes((_window = window) === null || _window === void 0 ? void 0 : (_window$location = _window.location) === null || _window$location === void 0 ? void 0 : _window$location.pathname)) {
      setSelected(0);
    } else {
      setSelected(1);
    }
  }, []);

  const PressableNew = ({
    item,
    children,
    ...prop
  }) => {
    return item !== null && item !== void 0 && item.route ? /*#__PURE__*/React__default.createElement(Box, prop, /*#__PURE__*/React__default.createElement(Link, {
      style: {
        textDecoration: "none"
      },
      to: routeDynamics ? generatePath(item.route, { ...{
          id: item.id
        }
      }) : item.route
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
    ref: e => serRefFoot(e)
  }, /*#__PURE__*/React__default.createElement(Center, {
    flex: 1
  }), /*#__PURE__*/React__default.createElement(HStack, {
    bg: "white",
    alignItems: "center",
    safeAreaBottom: true,
    shadow: 6
  }, footerMenus.map((item, index) => /*#__PURE__*/React__default.createElement(PressableNew, {
    item: item,
    key: index,
    cursor: "pointer",
    opacity: selected === index ? 1 : 0.5,
    py: "3",
    flex: 1,
    onPress: () => setSelected(0)
  }, /*#__PURE__*/React__default.createElement(Text, {
    color: selected === index ? "button.500" : "coolGray.400"
  }, /*#__PURE__*/React__default.createElement(Center, null, /*#__PURE__*/React__default.createElement(IconByName, {
    name: item.icon
  }), /*#__PURE__*/React__default.createElement(Text, {
    fontSize: "12"
  }, t(item.title)))))))));
}

function AppBar({
  isEnableHamburgerMenuButton,
  isEnableLanguageMenu,
  isEnableSearchBtn,
  setSearch,
  color,
  languages,
  ...props
}) {
  const [searchInput, setSearchInput] = useState(false);
  const navigate = useNavigate();

  const setLang = e => {
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
    onPress: () => navigate(-1)
  }), searchInput ? /*#__PURE__*/React__default.createElement(Input, {
    bg: "coolGray.100",
    size: "full",
    InputRightElement: /*#__PURE__*/React__default.createElement(IconByName, {
      size: "sm",
      color: "coolGray.500",
      w: "1/8",
      name: "times",
      pl: "0",
      onPress: e => setSearchInput(false)
    }),
    placeholder: "search",
    onChange: e => setSearch(e.target.value)
  }) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null)), /*#__PURE__*/React__default.createElement(HStack, {
    alignItems: "center"
  }, !searchInput && isEnableSearchBtn ? /*#__PURE__*/React__default.createElement(IconByName, {
    color: color ? color : "",
    size: "sm",
    name: "search",
    onPress: e => setSearchInput(true)
  }) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null), /*#__PURE__*/React__default.createElement(Center, {
    flex: 1,
    px: "3"
  }, /*#__PURE__*/React__default.createElement(Menu$1, {
    w: "190",
    trigger: triggerProps => {
      return /*#__PURE__*/React__default.createElement(Pressable, Object.assign({
        accessibilityLabel: "More options menu"
      }, triggerProps), /*#__PURE__*/React__default.createElement(IconByName, {
        size: "sm",
        name: "More2LineIcon",
        isDisabled: true,
        color: color ? color : ""
      }));
    }
  }, languages.map((e, index) => /*#__PURE__*/React__default.createElement(Menu$1.Item, {
    key: index,
    label: e.title,
    textValue: e.code,
    onPress: item => setLang(e.code)
  }, e.title)), /*#__PURE__*/React__default.createElement(Menu$1.Item, {
    onPress: item => setLang("logout")
  }, "Logout"))))));
}

function Layout({
  isDisabledAppBar,
  subHeader,
  children,
  imageUrl,
  _appBar,
  _header,
  _subHeader,
  _footer
}) {
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Stack, {
    width: "100%",
    style: {
      backgroundImage: imageUrl ? "url(" + imageUrl + ")" : "url(" + window.location.origin + "/headerBg.png)",
      backgroundColor: "transparent",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    },
    space: 5
  }, !isDisabledAppBar ? /*#__PURE__*/React__default.createElement(AppBar, Object.assign({
    color: imageUrl ? "white" : ""
  }, _appBar)) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null), _header ? /*#__PURE__*/React__default.createElement(Header, _header) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null)), subHeader ? /*#__PURE__*/React__default.createElement(Box, Object.assign({}, {
    p: 4,
    position: "relative",
    bg: "purple.400",
    roundedTop: "20",
    _text: {
      textTransform: "inherit"
    }
  }, _subHeader), subHeader) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null), children, /*#__PURE__*/React__default.createElement(Footer, _footer));
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

const chunk = (array, chunk) => {
  return [].concat.apply([], array.map(function (elem, i) {
    return i % chunk ? [] : [array.slice(i, i + chunk)];
  }));
};

const PressableNew = ({
  route,
  children,
  ...prop
}) => {
  return route ? /*#__PURE__*/React__default.createElement(Pressable, prop, /*#__PURE__*/React__default.createElement(Link, {
    style: {
      color: "rgb(63, 63, 70)",
      textDecoration: "none"
    },
    to: route
  }, children)) : /*#__PURE__*/React__default.createElement(Box, prop, children);
};

function Widget({
  data,
  title
}) {
  const newData = chunk(data ? data : [], 2);
  const rotate = {
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
  }, newData.map((subData, index) => /*#__PURE__*/React__default.createElement(HStack, {
    key: index,
    space: 3,
    width: "100%"
  }, subData.map((item, subIndex) => /*#__PURE__*/React__default.createElement(Box, Object.assign({
    key: subIndex,
    rounded: "xl",
    shadow: 3,
    p: 4,
    width: "48%",
    overflow: "hidden"
  }, item === null || item === void 0 ? void 0 : item._box), /*#__PURE__*/React__default.createElement(PressableNew, {
    route: item.link
  }, /*#__PURE__*/React__default.createElement(Text, Object.assign({}, {
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
  })), /*#__PURE__*/React__default.createElement(IconByName, Object.assign({
    name: item.icon
  }, {
    color: "coolGray.700",
    opacity: "0.5",
    ...rotate,
    ...(item === null || item === void 0 ? void 0 : item._icon)
  }))) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null))))))));
}

const Collapsible = ({
  header: _header = "",
  children,
  defaultCollapse: _defaultCollapse = true,
  isHeaderBold: _isHeaderBold = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return /*#__PURE__*/React__default.createElement(Box, {
    bg: "white",
    p: 4
  }, /*#__PURE__*/React__default.createElement(Stack, {
    space: 2
  }, /*#__PURE__*/React__default.createElement(Pressable, {
    onPress: () => setIsOpen(!isOpen)
  }, /*#__PURE__*/React__default.createElement(Box, {
    px: 2,
    py: 1
  }, /*#__PURE__*/React__default.createElement(HStack, {
    alignItems: "center",
    justifyContent: "space-between"
  }, /*#__PURE__*/React__default.createElement(Text, {
    bold: typeof _isHeaderBold === "undefined" ? true : _isHeaderBold,
    fontSize: typeof _isHeaderBold === "undefined" ? "md" : ""
  }, _header), /*#__PURE__*/React__default.createElement(IconByName, {
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

function Menu({
  items,
  type,
  routeDynamics,
  bg,
  _box,
  _boxMenu,
  _icon
}) {
  const {
    t
  } = useTranslation();

  const chunk = (array, chunk) => {
    return [].concat.apply([], array.map(function (elem, i) {
      return i % chunk ? [] : [array.slice(i, i + chunk)];
    }));
  };

  const PressableNew = ({
    item,
    children,
    ...prop
  }) => {
    return item !== null && item !== void 0 && item.route ? /*#__PURE__*/React__default.createElement(Pressable, prop, /*#__PURE__*/React__default.createElement(Link, {
      style: {
        color: "rgb(63, 63, 70)",
        textDecoration: "none"
      },
      to: routeDynamics ? generatePath(item.route, { ...{
          id: item.id
        }
      }) : item.route
    }, children)) : /*#__PURE__*/React__default.createElement(Box, prop, children);
  };

  if (type === "veritical") {
    const newItems = chunk(items, 3);
    return /*#__PURE__*/React__default.createElement(Box, Object.assign({
      bg: bg
    }, _box), newItems.map((subItems, index) => /*#__PURE__*/React__default.createElement(HStack, {
      key: index,
      justifyContent: "center",
      space: 4
    }, subItems.map(item => /*#__PURE__*/React__default.createElement(PressableNew, {
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
    }, item.icon ? /*#__PURE__*/React__default.createElement(IconByName, Object.assign({
      name: item.icon,
      p: "0",
      color: "white",
      _icon: {
        style: {
          fontSize: "28px"
        }
      }
    }, _icon)) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null), /*#__PURE__*/React__default.createElement(Text, Object.assign({
      color: "white",
      maxW: 20,
      lineHeight: 14
    }, item === null || item === void 0 ? void 0 : item._text), item.title)))))));
  } else {
    return /*#__PURE__*/React__default.createElement(Box, Object.assign({
      bg: bg
    }, _box), /*#__PURE__*/React__default.createElement(FlatList, {
      data: items,
      renderItem: ({
        item
      }) => {
        var _item$_boxMenu;

        return /*#__PURE__*/React__default.createElement(Box, Object.assign({
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
        }, item.leftText) : item.icon ? /*#__PURE__*/React__default.createElement(IconByName, Object.assign({
          name: item.icon,
          p: "0"
        }, _icon)) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null), /*#__PURE__*/React__default.createElement(Text, {
          color: "gray.700",
          fontWeight: "500"
        }, t(item.title))), /*#__PURE__*/React__default.createElement(IconByName, Object.assign({
          name: item.rightIcon ? item.rightIcon : "ArrowRightSLineIcon",
          p: "0",
          color: "#C1C1DE"
        }, _icon)))));
      },
      keyExtractor: (item, index) => item.id ? item.id : index
    }));
  }
}

const maxWidth = "1080";
const fontFamily = localStorage.getItem("lang") === "hi" ? "'Baloo 2'" : "Inter";
const fontSize = localStorage.getItem("lang") === "hi" ? "20px" : "";
let red = {
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
let green = {
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
const DEFAULT_THEME = {
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
  const params = new URLSearchParams();
  params.append("client_id", "registry-frontend");
  params.append("username", username);
  params.append("password", password);
  params.append("grant_type", "password");
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    }
  };
  return axios.post(authUrl, params, config).catch(e => e);
}

async function get(url, headers = {}) {
  return await axios.get(url, { ...headers,
    headers: { ...(headers === null || headers === void 0 ? void 0 : headers.headers),
      "Access-Control-Allow-Origin": "*"
    }
  });
}
async function post(url, body, headers = {}) {
  return await axios.post(url, body, { ...headers,
    headers: { ...(headers === null || headers === void 0 ? void 0 : headers.headers),
      "Access-Control-Allow-Origin": "*"
    }
  });
}
async function update(url, body, headers = {}) {
  return await axios.put(url, body, { ...headers,
    headers: { ...(headers === null || headers === void 0 ? void 0 : headers.headers),
      "Access-Control-Allow-Origin": "*"
    }
  });
}

class EventBus {
  constructor() {
    this.channel = postal.channel("app_events");
  }

  publish(topic, message) {
    this.channel.publish(topic, message);
  }

  subscribe(topic, callbackfunction) {
    return this.channel.subscribe(topic, callbackfunction);
  }

  unsubscribe(subscription) {
    subscription.unsubscribe();
  }

}

const eventBus = new EventBus();

const ExampleComponent = ({
  text
}) => {
  return createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

export { Collapsible, DEFAULT_THEME, ExampleComponent, Footer, Header, IconByName, Layout, Menu, Widget, eventBus, fetchToken, get, post, update };
//# sourceMappingURL=index.modern.js.map
