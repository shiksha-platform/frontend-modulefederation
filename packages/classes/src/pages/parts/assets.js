export const timeTables = [
  {
    id: "1",
    from: "08:30 AM",
    to: "09:25 AM",
    title: "MATHS",
    subTitle: "Class V, Sec B",
    _boxMenu: {
      bg: "timeTableCardOrange.500",
      borderWidth: 1,
      borderColor: "timeTableCardOrange.500",
    },
  },
  {
    id: "2",
    from: "09:30 AM",
    to: "10:25 AM",
    title: "MATHS",
    subTitle: "Class V, Sec C",
    _boxMenu: {
      bg: "timeTableCardOrange.500",
      borderWidth: 1,
      borderColor: "timeTableCardOrange.500",
    },
  },
  {
    id: "3",
    from: "10:30 AM",
    to: "11:25 AM",
    title: "SPECIAL_DANCE_MID_DROUP",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
    _boxMenu: {
      bg: "timeTableCardOrange.500",
      borderWidth: 1,
      borderColor: "timeTableCardOrange.500",
    },
  },
  {
    id: "4",
    from: "11:30 AM",
    to: "12:25 PM",
    title: "FREE_PERIOD",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
    _boxMenu: {
      bg: "timeTableCardOrange.500",
      borderWidth: 1,
      borderColor: "timeTableCardOrange.500",
    },
  },
  {
    id: "5",
    from: "12:30 PM",
    to: "01:25 PM",
    title: "SCIENCE",
    subTitle: "Class VI, Sec A",
    activeMenu: true,
    _boxMenu: {
      bg: "emerald.400",
      borderWidth: 1,
      borderColor: "green.100",
    },
    _text: { color: "white" },
  },
  {
    id: "6",
    from: "01:30 PM",
    to: "02:25 PM",
    title: "SUBSTITUTION",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
  },
  {
    id: "7",
    from: "02:30 PM",
    to: "03:25 PM",
    title: "FREE_PERIOD",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
  },
  {
    id: "8",
    from: "03:30 PM",
    to: "04:25 PM",
    title: "MATHS",
    subTitle: "Class VI, Sec A",
  },
];

export const sampleClassData = [
  { id: "1", className: "Class I", route: "1" },
  { id: "2", className: "Class II", route: "2" },
  { id: "3", className: "Class III", route: "3" },
];

export const footerMenus = {
  menues: [
    {
      title: "HOME",
      icon: "Home4LineIcon",
      module: "Registry",
      route: "/",
      routeparameters: {},
    },
    {
      title: "CLASSES",
      icon: "TeamLineIcon",
      module: "Registry",
      route: "/classes",
      routeparameters: {},
    },
    {
      title: "SCHOOL",
      icon: "GovernmentLineIcon",
      module: "Registry",
      route: "/",
      routeparameters: {},
    },
    {
      title: "MATERIALS",
      icon: "BookOpenLineIcon",
      module: "Registry",
      route: "/",
      routeparameters: {},
    },
    {
      title: "CAREER",
      icon: "UserLineIcon",
      module: "Registry",
      route: "/",
      routeparameters: {},
    },
  ],
};
