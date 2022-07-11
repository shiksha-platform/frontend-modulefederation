import React from "react";
import {
  Text,
  Box,
  Pressable,
  Button,
  Checkbox,
  HStack,
  VStack,
  Stack,
  Actionsheet,
  Link,
  ScrollView,
  Badge,
  Spinner,
  Input,
  Divider,
  Heading,
} from "native-base";
import { useTranslation } from "react-i18next";
import {
  BodyLarge,
  BodyMedium,
  BodySmall,
  capture,
  H1,
  H2,
  IconByName,
  Layout,
} from "@shiksha/common-lib";
import moment from "moment";
import manifest from "../manifest.json";
import colorTheme from "../colorTheme";
import InfiniteScroll from "react-infinite-scroll-component";

const colors = colorTheme;
const announcementsData = [
  {
    name: "NTSE Result Declared!",
    dateTime: moment().add("2", "minute").calendar(),
    type: "General",
    data: "NTSE result has been declared. It is a moment of pride that 40 students have cleared Level 1.Students can check it at NTSE official website.",
    additionalTags: [{ name: "type", data: "General" }],
  },
  {
    name: "Mock fire drill morrow",
    dateTime: moment().add("2", "minute").calendar(),
    type: "Event",
    data: "Mock fire drill will be organised in the school from 12:30 PM to 1:30 PM at Vivekananda Hall. Attendance is compulsory.",
    additionalTags: [
      { name: "type", data: "Event" },
      { name: "time", data: "12:30PM" },
      { name: "venue", data: "Vivekananda Bhawan" },
    ],
  },
  {
    name: "New admissions security dues",
    dateTime: moment().add("2", "minute").calendar(),
    type: "General",
    data: "New admission students are requested to deposit security dues latest by 20 July 2022.",
    additionalTags: [{ name: "type", data: "General" }],
  },
  {
    name: "Shiksha V2.0.1 Launched!",
    dateTime: moment().add("2", "minute").calendar(),
    type: "App",
    data: "Shiksha V2.0.1 has been launched featuring cool new features like Announcements and landing pages.",
    additionalTags: [{ name: "type", data: "App" }],
  },
];

const filters = [
  { name: "Type", data: ["Event", "General", "Shiksha"] },
  { name: "Date modified", data: ["Last week", "Last 24 hours"] },
  { name: "Author", data: ["Principal", "Teacher"] },
];

const Announcements = ({ footerLinks, appName }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const [filterData, setFilterData] = React.useState(
    filters.map(({ ...val }) => {
      val.data = [];
      return val;
    })
  );
  const [showFilterModal, setShowFilterModal] = React.useState(-1);
  const [filtered, setFiltered] = React.useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = React.useState({});
  const [announcementsList, setAnnouncementsList] =
    React.useState(announcementsData);
  const [showMoreAnnouncements, setShowMoreAnnouncements] =
    React.useState(true);

  React.useEffect(() => {
    capture("PAGE");
  }, []);

  //function to produce mock announcement data every 1 second
  const fetchAnnouncements = () => {
    if (announcementsList.length > 10) {
      setShowMoreAnnouncements(false);
      return;
    }
    setTimeout(() => {
      setAnnouncementsList((announcementsList) => [
        ...announcementsList,
        {
          name: "Celebration-Teachers Day",
          dateTime: moment().add("2", "minute").calendar(),
          type: "Event",
          data: "Teacher's day will be celebrated in the school. No teaching will take place and school will get over at 11:30 AM. Buses will comply to the timings.",
          additionalTags: [
            { name: "type", data: "Event" },
            { name: "time", data: "08:30 AM" },
            { name: "venue", data: "Amphitheatre" },
          ],
        },
      ]);
    }, 1000);
  };
  const data = React.useMemo(() => announcementsList, [announcementsList]);

  //function to modify the filters
  const modifyFilter = (idx, val, isChecked) => {
    let index = filterData[idx]?.data?.indexOf(val);
    if (index === -1) {
      setFilterData((filterData) => {
        filterData[idx]?.data?.push(val);
        return filterData;
      });
    } else {
      let f = filterData;
      f[idx].data?.splice(index, 1);
      setFilterData(f);
    }
  };

  return (
    <Layout
      _header={{
        title: t("ANNOUNCEMENTS"),
        subHeading: moment().format("hh:mm A"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
      }}
      _appBar={{ languages: manifest.languages,showPinnedAnnouncements: true}}
      subHeader={t("VIEW_LATEST_ANNOUNCEMENTS")}
      _subHeader={{
        bg: colors?.cardBg,
        py: "22px",
        _text: {
          fontSize: "16px",
          fontWeight: "500",
          textTransform: "inherit",
        },
      }}
      _footer={footerLinks}
    >
      <Stack space={1} mb="2">
        <Box bg={colors.white} p="5" roundedBottom={"xl"}>
          <VStack justifyContent="center" pb="5" space="4">
            <HStack space="2" justifyContent="start" px="3">
              <Input
                placeholder="Search"
                px="2"
                width="s"
                variant="underlined"
                borderColor={colors.primary}
                InputRightElement={
                  <IconByName
                    name="SearchLineIcon"
                    color={colors.cardCloseIcon}
                  />
                }
              />
              <Button
                rounded="full"
                colorScheme="button"
                variant="outline"
                px="5"
                _text={{ textTransform: "capitalize" }}
                onPress={(e) => setFiltered(true)}
              >
                {t("FILTER")}
              </Button>
            </HStack>
            {filtered ? (
              <Box justifyContent="end" width="100%">
                <ScrollView horizontal={true}>
                  {filters.map((value, index) => {
                    return (
                      <Button
                        key={index}
                        mr="1"
                        rounded="full"
                        bg={colors.scrollViewbtnBg}
                        colorScheme="button"
                        variant="outline"
                        px="5"
                        rightIcon={
                          <IconByName name="ArrowDownSLineIcon" isDisabled />
                        }
                        onPress={(e) => {
                          if (value?.data && value?.data.length > 0) {
                            setShowFilterModal(index);
                          }
                        }}
                      >
                        <Text color={colors.primary}>{value.name}</Text>
                      </Button>
                    );
                  })}
                  <Button
                    mr="1"
                    rounded="full"
                    colorScheme="button"
                    variant="unstyled"
                    _text={{
                      fontWeight: "bold",
                      color: colors.primary,
                      fontSize: "14px",
                    }}
                    onPress={(e) => {
                      setFilterData(
                        filters.map(({ ...val }) => {
                          val.data = [];
                          return val;
                        })
                      );
                      setFiltered(false);
                    }}
                  >
                    {t("RESET_FILTERS")}
                  </Button>
                </ScrollView>
              </Box>
            ) : null}
          </VStack>
          <Divider my="4" />
          <AnnouncementsBox
            data={data}
            fetchAnnouncements={fetchAnnouncements}
            onPress={(announcement) => {
              setShowModal(true);
              setSelectedAnnouncement((selectedAnnouncement) => ({
                ...selectedAnnouncement,
                ...announcement,
              }));
              console.log(selectedAnnouncement);
            }}
            showMoreAnnouncements={showMoreAnnouncements}
          />
        </Box>

        <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
          <Actionsheet.Content alignItems={"end"} bg={colors.white} px="3">
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setShowModal(false)}
            />
          </Actionsheet.Content>
          <Box bg={colors.white} width={"100%"}>
            <Box px="5">
              <HStack py="3" alignItems="center" space="1">
                <Heading size="md">{selectedAnnouncement.name}</Heading>
              </HStack>
            </Box>
            <HStack flexWrap={"wrap"} space="3" px="5" mb="3">
              {selectedAnnouncement.additionalTags?.map((val, index) => {
                return (
                  <Badge key={index} mb="2" fontSize="xs" rounded="4">
                    {val.data}
                  </Badge>
                );
              })}
            </HStack>
            <Divider></Divider>
            <VStack p="5" space={6} maxH="48" overflow="auto">
              <BodyMedium textTransform={"inherit"}>
                {selectedAnnouncement.data}
              </BodyMedium>
            </VStack>
            <Box bg={colors.white} p="5" bottom="0" shadow="2">
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                onPress={(e) => setShowModal(false)}
              >
                {t("CLOSE")}
              </Button>
            </Box>
          </Box>
        </Actionsheet>

        <Actionsheet
          isOpen={showFilterModal !== -1}
          onClose={() => setShowFilterModal(-1)}
        >
          <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={1} pb="15px">
                <H2>{filters[showFilterModal]?.name}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.cardCloseIcon}
                onPress={(e) => setShowFilterModal(-1)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg={colors.white} width={"100%"}>
            {filters[showFilterModal]?.data?.map((value, index) => (
              <Box p="5" key={index}>
                <Checkbox
                  colorScheme="button"
                  borderColor={colors.primary}
                  borderRadius="0"
                  defaultIsChecked={
                    filterData[showFilterModal].data?.indexOf(value) !== -1
                  }
                  onChange={(e) => {
                    modifyFilter(showFilterModal, value, e);
                    console.log(e);
                  }}
                >
                  {value}
                </Checkbox>
              </Box>
            ))}
            <Box p="5">
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                onPress={(e) => {
                  setShowFilterModal(-1);
                  console.log(filterData);
                }}
              >
                {t("CONTINUE")}
              </Button>
            </Box>
          </Box>
        </Actionsheet>
      </Stack>
    </Layout>
  );
};

const AnnouncementsBox = ({
  data,
  onPress,
  fetchAnnouncements,
  showMoreAnnouncements,
}) => {
  return (
    <Box>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchAnnouncements}
        hasMore={showMoreAnnouncements}
        loader={<Spinner color="warning.500" size="lg" />}
        height="50vh"
      >
        {data.map((value, index) => {
          return (
            <Box
              key={index}
              borderWidth="1"
              borderColor={colors.primary}
              my="2"
              p="5"
              rounded="10"
            >
              <Pressable onPress={(e) => onPress(value)}>
                <HStack
                  space="1"
                  justifyContent="flex-start"
                  alignItems="center"
                  flexWrap="nowrap"
                  overflow="hidden"
                >
                  <VStack space="2" flexGrow="1" overflowX="hidden">
                    <HStack alignItems="center" overflow="hidden">
                      <H2>{value.name}</H2>
                    </HStack>
                    <HStack space="2" alignItems="center">
                      <IconByName
                        _icon={{ size: "13" }}
                        name="TimeLineIcon"
                        isDisabled
                      />
                      <BodySmall>{value.dateTime}</BodySmall>
                    </HStack>
                  </VStack>
                  <HStack space="2" alignItems="center">
                    <Badge rounded="5" colorScheme="warning" variant="outline">
                      {value.type}
                    </Badge>
                  </HStack>
                </HStack>
              </Pressable>
            </Box>
          );
        })}
      </InfiniteScroll>
    </Box>
  );
};

export default Announcements;
