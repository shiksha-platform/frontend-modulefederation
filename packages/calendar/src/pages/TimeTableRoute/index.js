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
  const [isCompare, setIsCompare] = React.useState(false);
  const [showModalMessages, setShowModalMessages] = React.useState(false);
  const [showModalClash, setShowModalClash] = React.useState(false);
  const [timeTables, setTimeTables] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState({});
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
  const [timeTableCardOrange, emerald, gray, timeTableBorderColor] = useToken(
    "colors",
    [
      "timeTableCardOrange.500",
      "emerald.400",
      "gray.200",
      "timeTablecellborder.500",
    ]
  );
  let events = timeTables.map((e, index) => {
    return {
      ...e,
      title: t(e.title),
      backgroundColor: e.backgroundColor
        ? e.backgroundColor
        : timeTableCardOrange,
      borderColor: e.borderColor ? e.borderColor : timeTableBorderColor,
      borderWidth: "1",
      borderRadius: "5px",
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
            py={1}
            _text={{
              color: compare ? "white" : "button.500",
              textTransform: "capitelize",
            }}
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
                      color={isToday ? "white" : "calendarDatecolor.500"}
                      fontWeight="500"
                      fontSize="14px"
                    >
                      {date.format("ddd")}
                    </Text>
                    <Text
                      color={isToday ? "white" : "calendarDatecolor.500"}
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
          setIsCompare(true);
          setTimeTables([
            ...timeTable,
            ...timeTable.map((e) => {
              return {
                ...e,
                backgroundColor: "#D7F2DD",
                borderColor: "#A9E3AE",
              };
            }),
          ]);
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
        columnHeader={false}
        // viewDidMount={(view) => {
        //   view.el.querySelector(".fc-timegrid-axis-frame").innerHTML =
        //     t("TIME");
        // }}
        eventContent={(event) => {
          let item = {
            ...event?.event?._def,
            ...event?.event?._def?.extendedProps,
            timeText: event?.timeText,
            start: event?.event?._instance?.range?.start,
            end: event?.event?._instance?.range?.end,
          };
          return renderEventContent({
            ...event,
            showModal: showModalMessages,
            setShowModal: (e) => {
              setShowModalMessages(true);
              setSelectedEvent(item);
            },
            setShowModalClash: (e) => {
              setShowModalClash(true);
              setSelectedEvent(item);
            },
            isCompare: isCompare,
          });
        }}
        dayHeaderFormat={{ weekday: "long" }}
        ref={calendarRef}
      />
      <Actionsheet
        isOpen={showModalMessages}
        onClose={() => setShowModalMessages(false)}
      >
        <Actionsheet.Content bg="white">
          <HStack justifyContent={"space-between"} w="100%">
            <Stack p={5} pt={1} pb="2px" flex="1">
              <Text
                fontSize="14px"
                textAlign="center"
                fontWeight="400"
                color="gray.500"
              >
                {"Period Details"}
              </Text>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color="classCard.900"
              onPress={(e) => setShowModalMessages(false)}
              _icon={{ alignItems: "center" }}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg="white" p="5" width="100%">
          <VStack space="30px">
            <VStack space="10px" alignItems="center">
              <Text fontSize="16px" fontWeight="600">
                {selectedEvent?.title}
              </Text>
              <Text
                fontSize="14px"
                textAlign="center"
                fontWeight="400"
                color="gray.500"
              >
                The classses will be seated as per their roll numbers, and
                teachers are to follow the exam timing strictly.
              </Text>
            </VStack>
            <Stack space={4}>
              <HStack space="2">
                <IconByName
                  name="MapPinLineIcon"
                  color="gray.500"
                  isDisabled
                  _icon={{ size: "16px" }}
                />
                <Text fontSize="14px" fontWeight="500">
                  {t("LOCATION")}
                </Text>
                <Text fontSize="14px" fontWeight="400" color="gray.500">
                  {selectedEvent?.subTitle}
                </Text>
              </HStack>
              <HStack space="2">
                <IconByName
                  name="TimeLineIcon"
                  color="gray.500"
                  isDisabled
                  _icon={{ size: "16" }}
                />
                <Text fontSize="14px" fontWeight="500">
                  {t("Time")}
                </Text>
                <Text fontSize="14px" fontWeight="400" color="gray.500">
                  {selectedEvent?.timeText}
                </Text>
              </HStack>
              <HStack space="2">
                <IconByName
                  name="CalendarEventLineIcon"
                  color="gray.700"
                  isDisabled
                  _icon={{ size: "16" }}
                />
                <Text fontSize="14px" fontWeight="500">
                  {t("Date")}
                </Text>
                <Text fontSize="14px" fontWeight="400" color="gray.500">
                  {moment(selectedEvent?.start).format("DD, MMM Y")}
                </Text>
              </HStack>
              <HStack space="2">
                <IconByName
                  name="UserLineIcon"
                  color="gray.700"
                  isDisabled
                  _icon={{ size: "16" }}
                />
                <Text fontSize="14px" fontWeight="500">
                  {t("ORGANIZER")}
                </Text>
                <Text fontSize="14px" fontWeight="400" color="gray.500">
                  {selectedEvent?.organizer}
                </Text>
              </HStack>
              <HStack space="2">
                <IconByName
                  name="TeamLineIcon"
                  color="gray.700"
                  isDisabled
                  _icon={{ size: "16" }}
                />
                <Text fontSize="14px" fontWeight="500">
                  {t("ATTENDANCE")}
                </Text>
                <Text fontSize="14px" fontWeight="400" color="gray.500">
                  {selectedEvent?.subTitle}
                </Text>
              </HStack>
            </Stack>
          </VStack>
        </Box>
      </Actionsheet>
      <Actionsheet
        isOpen={showModalClash}
        onClose={() => setShowModalClash(false)}
        hideDragIndicator
      >
        <Actionsheet.Content alignItems={"left"} p="0" bg="white">
          <IconByName
            position="absolute"
            zIndex="10"
            top="2"
            right="2"
            name="CloseCircleLineIcon"
            color="classCard.900"
            onPress={(e) => setShowModalClash(false)}
          />
          {["Mathematics", "Middle school term exams", "Sports day"].map(
            (name, index) => (
              <Stack key={index}>
                {index ? (
                  <Box borderWidth={1} borderColor="gray.200">
                    <IconByName
                      size="sm"
                      name="FlashlightLineIcon"
                      colorScheme={
                        index === 1 ? "timeTableFlashIcon" : "timeTablemiddle"
                      }
                      variant="solid"
                      rounded="full"
                      _icon={{
                        style: {
                          fill: "white",
                        },
                      }}
                      right="50%"
                      bottom="-16px"
                      position="absolute"
                    />
                  </Box>
                ) : (
                  ""
                )}
                <VStack py={7} px="5" space={2}>
                  <HStack space="10px" alignItems="center">
                    <IconByName
                      p="0"
                      name="CheckboxBlankFillIcon"
                      isDisabledinlineEllipsisStyle
                      color={
                        index === 0
                          ? "timeTablecellborder.500"
                          : index === 1
                          ? "timeTableFlashIcon.500"
                          : "timeTablemiddle.500"
                      }
                    />
                    <Text fontSize="16px" fontWeight="600">
                      {index ? name : selectedEvent?.title}
                    </Text>
                  </HStack>
                  <HStack space="8" alignItems="center">
                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="MapPinLineIcon"
                        color="gray.700"
                        isDisabled
                        _icon={{ size: "14" }}
                      />
                      <Text fontSize="14px" fontWeight="400" color="gray.700">
                        {selectedEvent?.subTitle}
                      </Text>
                    </HStack>
                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="TimeLineIcon"
                        color="gray.700"
                        isDisabled
                        _icon={{ size: "14" }}
                      />
                      <Text fontSize="14px" fontWeight="400" color="gray.700">
                        {selectedEvent?.timeText}
                      </Text>
                    </HStack>
                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="CalendarEventLineIcon"
                        color="gray.700"
                        isDisabled
                        _icon={{ size: "14" }}
                      />
                      <Text fontSize="14px" fontWeight="400" color="gray.700">
                        {moment(selectedEvent?.start).format("DD, MMM Y")}
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Stack>
            )
          )}
        </Actionsheet.Content>
        <Box bg="white" p="5" w="100%">
          <Button
            colorScheme="button"
            variant="outline"
            _text={{ textTransform: "capitalize" }}
          >
            {t("VIEW CALENDAR")}
          </Button>
        </Box>
      </Actionsheet>
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
                  : "gray.500"
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
                  : "gray.500"
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
          <Stack p={5} pt={1} pb="2px">
            <Text fontSize="16px" fontWeight={"600"}>
              {title}
            </Text>
          </Stack>
          <IconByName
            name="CloseCircleLineIcon"
            color="classCard.900"
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
                  px={5}
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
                    py={5}
                    alignItems="center"
                    space={2}
                    width="100%"
                    justifyContent={"space-between"}
                    borderBottomWidth="1"
                    borderBottomColor="gray.200"
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
                          _icon={{ size: "18", color: "gray.700" }}
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
              {t("RESET")}
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
