import React from "react";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Link,
  Pressable,
  Stack,
  Text,
  useToast,
  useToken,
  VStack,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./../../assets/css/fullCalendar.css";
import { timeTables as timeTable } from "../parts/assets";
import renderEventContent from "./molecule/renderEventContent";
import { localLanguage, momentDateFormats } from "assets/constants";
import { IconByName } from "@shiksha/common-lib";

const weekDates = (currentDate = moment()) => {
  let weekStart = currentDate.clone().startOf("isoWeek");
  let days = [];
  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, "days"));
  }
  return days;
};

const TimeTableRoute = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  let calendarRef = React.createRef();
  const [page, setPage] = React.useState(0);
  const [activeDate, setActiveDate] = React.useState();
  const [compare, setCompare] = React.useState();
  const [showModal, setShowModal] = React.useState(false);
  const [timeTables, setTimeTables] = React.useState([]);
  const weekDateArray = weekDates();
  let datesMin = timeTables.map((e) =>
    moment(e?.start, momentDateFormats.y_mm_dd_HH_mm_ss).toDate()
  );
  let datesMax = timeTables.map((e) =>
    moment(e?.end, momentDateFormats.y_mm_dd_HH_mm_ss).toDate()
  );
  const minMaxTime = {
    slotMinTime: datesMin.length
      ? moment(Math.min(...datesMin)).format(momentDateFormats.hh_mm_ss)
      : "00:00:00",
    slotMaxTime: datesMax.length
      ? moment(Math.max(...datesMax)).format(momentDateFormats.hh_mm_ss)
      : "23:59:59",
  };
  const [timeTableCardOrange, emerald, gray] = useToken("colors", [
    "timeTableCardOrange.500",
    "emerald.400",
    "gray.200",
  ]);
  let events = timeTables.map((e, index) => {
    return {
      ...e,
      title: t(e.title),
      backgroundColor: e.activeMenu
        ? emerald
        : index < 4
        ? timeTableCardOrange
        : gray,
      borderColor: e.activeMenu ? emerald : timeTableCardOrange,
    };
  });

  React.useEffect(() => {
    let date = moment().add(page, "days");
    changeView(date);
    setTimeTables(timeTable);
    setCompare();
  }, [page]);

  const changeView = (date) => {
    let calendarApi = calendarRef.current.getApi();
    setActiveDate(date);
    // setButtonName(
    //   calendarApi.view.type === "timeGridDay" ? t("COMPARE") : t("TODAY")
    // );
    calendarApi.changeView(
      "timeGridDay",
      date.format(momentDateFormats.mm_mm_yyy)
    );
  };

  return (
    <Box py="5" bg="white">
      <Box p="5">
        <HStack justifyContent="space-between" alignItems="center">
          <DayWiesBar
            _box={{ p: 0, bg: "transparent" }}
            {...{ page, setPage }}
          />
          <Button
            rounded={"full"}
            variant={compare ? "solid" : "outline"}
            _text={{ color: compare ? "white" : "button.500" }}
            colorScheme="button"
            rightIcon={<IconByName name="ArrowDownSLineIcon" isDisabled />}
            onPress={(e) => setShowModal(true)}
          >
            {(compare ? t(compare) : "") + " " + t("COMPARE")}
          </Button>
        </HStack>
      </Box>
      <Box p="5">
        <HStack justifyContent="space-around" alignItems="center">
          {weekDateArray.map((date, key) => {
            let isToday = activeDate?.format("DD") === date?.format("DD");
            return (
              <Pressable
                onPress={(e) =>
                  setPage(date.format("DD") - moment().format("DD"))
                }
                key={key}
              >
                <Box
                  bg={isToday ? "button.500" : ""}
                  px="3"
                  py="10px"
                  rounded="8px"
                >
                  <VStack alignItems="center" space="2">
                    <Text
                      color={isToday ? "white" : "#BCC1CD"}
                      fontWeight="500"
                      fontSize="14px"
                    >
                      {date.format("ddd")}
                    </Text>
                    <Text
                      color={isToday ? "white" : "#BCC1CD"}
                      fontWeight="500"
                      fontSize="14px"
                    >
                      {date.format("DD")}
                    </Text>
                  </VStack>
                </Box>
              </Pressable>
            );
          })}
        </HStack>
      </Box>
      <Sheet
        customFunction={(e) => {
          setTimeTables([...timeTable, ...timeTable]);
          if (e) {
            setCompare(e);
          }
        }}
        {...{
          showModal,
          setShowModal,
          title: t("COMPARE"),
          data: [
            {
              title: "My classes",
              data: [
                { name: "Class IV", compareName: "CLASSES" },
                { name: "Class V", compareName: "CLASSES" },
                { name: "Class VI", compareName: "CLASSES" },
              ],
            },
            {
              title: "Others",
              data: [
                {
                  leftIcon: "BriefcaseLineIcon",
                  name: "Select another class",
                  rightIcon: "ArrowRightSLineIcon",
                  compareName: "CLASSES",
                },
                {
                  leftIcon: "UserLineIcon",
                  name: "Select another teacher",
                  rightIcon: "ArrowRightSLineIcon",
                  title: "Select a teacher",
                  compareName: "TEACHER",
                  data: [
                    {
                      data: [
                        { name: "Mrs. Aruna Kulkarni", compareName: "TEACHER" },
                        { name: "Mrs. Nikita Gupta", compareName: "TEACHER" },
                        {
                          name: "Mrs. Sharmila Tagore",
                          compareName: "TEACHER",
                        },
                        { name: "Mrs. Asha Parekh", compareName: "TEACHER" },
                        { name: "Mr. Kunal singh", compareName: "TEACHER" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />
      <FullCalendar
        locale={localLanguage()}
        {...minMaxTime}
        height="auto"
        stickyHeaderDates
        allDaySlot={false}
        plugins={[dayGridPlugin, timeGridPlugin]}
        nowIndicator={true}
        headerToolbar={false}
        initialView="timeGridDay"
        slotDuration="00:15"
        slotLabelInterval="01:00"
        events={events}
        viewDidMount={(view) => {
          view.el.querySelector(".fc-timegrid-axis-frame").innerHTML =
            t("TIME");
        }}
        eventContent={renderEventContent}
        dayHeaderFormat={{ weekday: "long" }}
        ref={calendarRef}
        eventClick={(e) => navigate("/subject/" + e.event._def.publicId)}
      />
    </Box>
  );
};

const DayWiesBar = ({ activeColor, setActiveColor, page, setPage, _box }) => {
  const [date, setDate] = React.useState();
  const { t } = useTranslation();

  React.useEffect(() => {
    setDate(moment().add(page, "days"));
    if (setActiveColor) {
      setActiveColor(page === 0 ? "button.500" : "coolGray.500");
    }
  }, [page, setActiveColor]);

  return (
    <Display
      {...{
        activeColor,
        setActiveColor,
        page,
        setPage,
        _box,
      }}
    >
      <VStack>
        <Text fontWeight={600} fontSize="16px">
          {page === 0
            ? t("TODAY")
            : page === 1
            ? t("TOMORROW")
            : page === -1
            ? t("YESTERDAY")
            : moment(date).format("dddd")}
        </Text>
        <Text fontWeight={300} fontSize="10px">
          <FormatDate date={date} />
        </Text>
      </VStack>
    </Display>
  );
};

const FormatDate = ({ date, type }) => {
  if (type === "Month") {
    return moment(date[0]).format("MMMM Y");
  } else if (type === "Week") {
    return (
      moment(date[0]).format("D MMM") +
      " - " +
      moment(date[date.length - 1]).format("D MMM")
    );
  } else if (type === "Today") {
    return moment(date).format("D MMM, ddd, HH:MM");
  } else if (type === "Tomorrow") {
    return moment(date).format("D MMM, ddd");
  } else if (type === "Yesterday") {
    return moment(date).format("D MMM, ddd");
  } else {
    return moment(date).format("D MMMM, Y");
  }
};

const Display = ({
  children,
  activeColor,
  page,
  setPage,
  nextDisabled,
  previousDisabled,
  rightErrorText,
  leftErrorText,
  _box,
}) => {
  const toast = useToast();
  return (
    <Box bg="white" p="1" {..._box}>
      <HStack justifyContent="space-between" alignItems="center" space={4}>
        <HStack space="4" alignItems="center">
          <IconByName
            size="sm"
            color={
              typeof previousDisabled === "undefined" ||
              previousDisabled === false
                ? activeColor
                  ? activeColor
                  : "button.500"
                : "gray.400"
            }
            name="ArrowLeftSLineIcon"
            onPress={(e) => {
              if (leftErrorText) {
                toast.show(leftErrorText);
              } else if (
                typeof previousDisabled === "undefined" ||
                previousDisabled === false
              ) {
                setPage(page - 1);
              }
            }}
          />
        </HStack>
        <HStack space="4" alignItems="center">
          <Text fontSize="md" bold>
            {children}
          </Text>
        </HStack>
        <HStack space="2">
          <IconByName
            size="sm"
            color={
              typeof nextDisabled === "undefined" || nextDisabled === false
                ? activeColor
                  ? activeColor
                  : "button.500"
                : "gray.400"
            }
            name="ArrowRightSLineIcon"
            onPress={(e) => {
              if (rightErrorText) {
                toast.show(rightErrorText);
              } else if (
                typeof nextDisabled === "undefined" ||
                nextDisabled === false
              ) {
                setPage(page + 1);
              }
            }}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

const Sheet = ({
  showModal,
  setShowModal,
  data,
  title,
  footerButton = false,
  parentModal,
  customFunction,
}) => {
  const { t } = useTranslation();
  const [selectedData, setSelectedData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [subData, setSubData] = React.useState([]);
  const [subTitle, setSubTitle] = React.useState();

  return (
    <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
      <Actionsheet.Content alignItems={"left"} bg="classCard.500">
        <HStack justifyContent={"space-between"}>
          <Stack p={5} pt={2} pb="25px">
            <Text fontSize="16px" fontWeight={"600"}>
              {title}
            </Text>
          </Stack>
          <IconByName
            name="CloseCircleLineIcon"
            onPress={(e) => setShowModal(false)}
          />
        </HStack>
      </Actionsheet.Content>
      <Box w="100%" justifyContent="center" bg="white">
        {data.map((subData, index) => {
          return (
            <Box key={index}>
              {subData?.title ? (
                <Box py={"14px"} px={"20px"}>
                  <Text fontSize={"12px"} fontWeight={500} color="gray.500">
                    {subData?.title}
                  </Text>
                </Box>
              ) : (
                ""
              )}
              {subData?.data?.map((item, index) => (
                <Pressable
                  key={index}
                  p={5}
                  onPress={(e) => {
                    setSelectedData({
                      ...selectedData,
                      attendance: item.name,
                    });
                    if (item?.data && typeof item.data === "object") {
                      setOpen(true);
                      setSubData(item?.data);
                      setSubTitle(item?.title);
                    } else if (customFunction) {
                      customFunction(item.compareName);
                    }

                    if (
                      !footerButton &&
                      !(item?.data && typeof item.data === "object")
                    ) {
                      setShowModal(false);
                      setSelectedData({});
                    }
                  }}
                  bg={
                    selectedData?.attendance === item.name ||
                    item?.color === "special_duty"
                      ? "gray.100"
                      : "white"
                  }
                >
                  <HStack
                    alignItems="center"
                    space={2}
                    width="100%"
                    justifyContent={"space-between"}
                  >
                    <HStack alignItems="center" space={2}>
                      {item.leftIcon ? (
                        <IconByName
                          name={item.leftIcon}
                          isDisabled
                          mt="1"
                          p="5px"
                          rounded="full"
                          bg={
                            selectedData?.attendance === item.name ||
                            item?.color === "special_duty"
                              ? item?.color
                                ? item?.color + ".500"
                                : "special_duty.500"
                              : "gray.100"
                          }
                          color={
                            selectedData?.attendance === item.name ||
                            item?.color === "special_duty"
                              ? "white"
                              : "gray.500"
                          }
                          _icon={{ size: "18" }}
                        />
                      ) : (
                        ""
                      )}
                      <Text fontSize="14px" fontWeight={500}>
                        {t(item.name)}
                      </Text>
                    </HStack>

                    {item.rightIcon ? (
                      <IconByName name={item.rightIcon} isDisabled />
                    ) : (
                      ""
                    )}
                  </HStack>
                </Pressable>
              ))}
            </Box>
          );
        })}
        {open ? (
          <Sheet
            showModal={open}
            setShowModal={setOpen}
            data={subData}
            title={subTitle}
            footerButton={true}
            parentModal={setShowModal}
            customFunction={(e) => {
              customFunction(e);
              setSelectedData({});
            }}
          />
        ) : (
          ""
        )}
        {selectedData && footerButton ? (
          <Button.Group m="5">
            <Button
              flex="1"
              colorScheme={selectedData?.attendance ? "button" : "gray"}
              variant="outline"
              onPress={(e) => {
                setSelectedData(false);
              }}
            >
              {t("REST")}
            </Button>
            <Button
              flex="1"
              colorScheme={selectedData?.attendance ? "button" : "gray"}
              _text={{ color: "white" }}
              onPress={(e) => {
                setShowModal(false);
                if (parentModal) {
                  parentModal(false);
                }
                if (customFunction) {
                  customFunction();
                }
                setSelectedData({});
              }}
            >
              {t("CONTINUE")}
            </Button>
          </Button.Group>
        ) : (
          ""
        )}
      </Box>
    </Actionsheet>
  );
};
export default TimeTableRoute;
