const maxWidth = "1080";
const fontFamily =
  localStorage.getItem("lang") === "hi" ? "'Baloo 2'" : "Inter";
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
  950: "#180c0c",
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
  950: "#010f03",
};

const DEFAULT_THEME = {
  /*fonts: {
    heading: fontFamily,
    body: fontFamily,
    mono: fontFamily
  },
  components: {
    Text: {
      baseStyle: {
        textTransform: 'capitalize',
        fontFamily: fontFamily,
        fontSize: fontSize
      }
    },
    Actionsheet: {
      baseStyle: {
        maxW: maxWidth,
        alignSelf: 'center'
      }
    },
    Button: {
      baseStyle: {
        rounded: 'lg'
      },
      defaultProps: {
        colorScheme: 'button',
        _text: {
          textTransform: 'uppercase',
          fontSize: '12px',
          fontWeight: '600'
        }
      }
    }
  },*/
  colors: {
    widgetColor: {
      400: "#7F9DAC",
      500: "#DDD8F3",
      600: "#FFE2CC",
      700: "#CCE7FF",
      800: "#C4F2C5",
      900: "#CDDAFD",
      1000: "#FFC6FF",
    },
    viewNotification: {
      500: "#FDDFD8",
      600: "#feefeb",
      700: "#B9FBC0",
      800: "#FDF2EE",
    },
    calendarBtncolor: {
      500: "#BCBCBC",
    },
    selfAicon: {
      500: "#545454",
    },
    iconColor: {
      500: "#aba0db",
      600: "#c3916c",
      700: "#83b0d7",
      800: "#5eb05f",
      900: "#7c8dbc",
      1000: "#ea5fff",
    },
    studentCard: {
      500: "#B9FBC0",
      800: "#5B7E5F",
    },
    successAlert: {
      500: "#B9FBC0",
    },
    successAlertText: {
      500: "#0D921B",
    },
    classCard: {
      500: "#D9F0FC",
      900: "#7F9DAC",
    },
    attendanceCard: {
      500: "#C9AFF4",
      600: "#18181b66",
    },
    attendanceCardText: {
      400: "#9C9EA0",
      500: "#373839",
    },
    reportCard: {
      100: "#FFF9F9",
      500: "#FFCAAC",
      800: "#875234",
    },
    present: green,
    presentCardBg: {
      400: "#CEEED1",
      500: "#DFFDE2",
      600: "#cae3ce",
    },
    presentCardCompareBg: {
      500: "#ECFBF2",
      600: "#cae3ce",
    },
    presentCardText: {
      500: "#07C71B",
    },
    presentCardCompareText: {
      500: "#FA8129",
    },
    absent: red,
    absentCardBg: {
      500: "#FDE7E7",
      600: "#dfcbcb",
    },
    absentCardCompareBg: {
      500: "#FFF6F6",
      600: "#dfcbcb",
    },
    absentCardText: red,
    absentCardCompareText: {
      500: "#FA8129",
    },
    special_duty: { 500: "#06D6A0" },
    attendanceSuccessCardCompareBg: {
      500: "#0D921B",
    },
    attendanceWarningCardCompareBg: {
      500: "#FFC369",
    },
    attendanceDangerCardCompareBg: {
      500: "#F57B7B",
    },
    weekCardCompareBg: {
      500: "#FFF8F7",
    },
    worksheetCard: {
      500: "#F9CCE4",
      900: "#C08FA9",
    },
    reportBoxBg: {
      400: "#FFF8F7",
      500: "#FEF1EE",
      600: "#ede7e6",
    },
    button: {
      50: "#fcf1ee",
      100: "#fae2dd",
      200: "#f5c8bc",
      300: "#f2ab99",
      400: "#ee8e78",
      500: "#F87558",
      600: "#d9654c",
    },
    attendancePresent: {
      600: "#2BB639",
      500: "#2BB639",
    },
    attendanceAbsent: red,
    attendanceUnmarked: {
      100: "#F0F0F4",
      300: "#B5B5C8",
      400: "#d3d3e5",
      500: "#C4C4D4",
      600: "#C4C4D4",
    },
    timeTableCardOrange: {
      500: "#FFF7F5",
    },
    startIconColor: {
      500: "#FFC326",
      700: "#E78D12",
    },
    timeTableFlashIcon: {
      100: "#BDB3E7",
      200: "#BDB3E7",
      300: "#BDB3E7",
      400: "#BDB3E7",
      500: "#BDB3E7",
      600: "#BDB3E7",
      700: "#BDB3E7",
      800: "#BDB3E7",
      900: "#BDB3E7",
    },
  },
};

export default DEFAULT_THEME;
