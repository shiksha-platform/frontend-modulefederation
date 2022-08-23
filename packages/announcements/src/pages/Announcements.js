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
  ScrollView,
  Badge,
  Spinner,
  Input,
  Divider,
  Heading,
  Radio,
} from "native-base";
import { useTranslation } from "react-i18next";
import {
  announcementsRegistryService,
  BodyMedium,
  BodySmall,
  capture,
  H2,
  IconByName,
  Layout,
} from "@shiksha/common-lib";
import moment from "moment";
import manifest from "../manifest.json";
import colorTheme from "../colorTheme";
import InfiniteScroll from "react-infinite-scroll-component";
import { convertToTranslationKey } from "../utils/announcementUtils";

const colors = colorTheme;
//page size to be used for showing data
const PAGE_SIZE = 4;
const filters = [
  {
    name: "announcementType",
    data: ["event", "general"],
    allowMultiple: true,
  },
  {
    name: "dateModified",
    data: ["lastWeek", "lastDay"],
    allowMultiple: false,
  },
  {
    name: "author",
    data: ["principal", "teacher"],
    allowMultiple: true,
  },
];

const Announcements = ({ footerLinks, appName, pinnedAnnouncementsData }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const [filterData, setFilterData] = React.useState(
    filters.map(({ ...val }) => {
      val.data = [];
      return val;
    })
  );
  const [activeFilter, setActiveFilter] = React.useState(-1);
  const [totalAnnouncements, setTotalAnnnouncements] = React.useState(0);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [filtered, setFiltered] = React.useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = React.useState({});
  const [announcementsList, setAnnouncementsList] = React.useState([]);
  const [showMoreAnnouncements, setShowMoreAnnouncements] =
    React.useState(true);
  const [searchItem, setSearchItem] = React.useState("");

  React.useEffect(() => {
    capture("PAGE");
  }, []);

  //whenever announcement data is reset fetch announcements
  React.useEffect(() => {
    if (
      showMoreAnnouncements === true &&
      announcementsList.length === 0 &&
      pageIndex === 0 &&
      totalAnnouncements === 0
    ) {
      fetchAnnouncements();
    }
  }, [showMoreAnnouncements, announcementsList, pageIndex, totalAnnouncements]);

  //function to convert filters into suitable format to send to backend
  const refineFilters = () => {
    const refinedFilters = {};
    filterData.map(({ ...obj }) => {
      if (obj.data.length > 0) {
        if (obj.name === "dateModified") {
          //for date
          let startDate;
          switch (obj.data[0]) {
            case "lastWeek":
              startDate = moment().utc().subtract(7, "days").toISOString();
              break;
            case "lastDay":
              startDate = moment().utc().subtract(24, "hours").toISOString();
              break;
          }

          refinedFilters["startDate"] = startDate;
          refinedFilters["endDate"] = moment().utc().toISOString();
        } else {
          refinedFilters[obj.name] = obj.data;
        }
      }
    });

    return refinedFilters;
  };

  //function to fetch announcements
  const fetchAnnouncements = () => {
    if (
      totalAnnouncements > 0 &&
      announcementsList.length >= totalAnnouncements
    ) {
      setShowMoreAnnouncements(false);
      return;
    }
    const refinedFilters = filtered ? refineFilters() : undefined;
    //fetch announcements from backend
    announcementsRegistryService
      .getAnnouncementsSet({
        ...refinedFilters,
        pageIndex: pageIndex * PAGE_SIZE,
        pageSize: PAGE_SIZE,
        title: searchItem === "" ? undefined : searchItem,
      })
      .then((res) => {
        if (res.data.length === 0) setShowMoreAnnouncements(false);
        setAnnouncementsList((announcementsList) => [
          ...announcementsList,
          ...res.data,
        ]);
        setTotalAnnnouncements(res.count);
        setPageIndex(pageIndex + 1);
      });
  };

  //function to modify the filters
  const onFilterChange = (idx, val) => {
    const f = filterData;
    if (filterData[idx]?.allowMultiple === false) {
      f[idx].data[0] = val;
    } else {
      let index = filterData[idx]?.data?.indexOf(val);
      if (index === -1) f[idx]?.data?.push(val);
      else f[idx]?.data.splice(index, 1);
    }
    setFilterData(f);
  };

  //helper components for filters
  const RadioGroup = () => (
    <Radio.Group
      defaultValue={filterData[activeFilter]?.data[0] ?? null}
      onChange={(e) => {
        onFilterChange(activeFilter, e);
      }}
    >
      {filters[activeFilter]?.data?.map((value, index) => (
        <Box p="5" key={index}>
          <Radio
            colorScheme="button"
            borderColor={colors.primary}
            value={value}
          >
            {t(convertToTranslationKey(value))}
          </Radio>
        </Box>
      ))}
    </Radio.Group>
  );

  const CheckboxGroup = () =>
    filters[activeFilter]?.data?.map((value, index) => (
      <Box p="5" key={index}>
        <Checkbox
          colorScheme="button"
          borderColor={colors.primary}
          borderRadius="0"
          defaultIsChecked={
            filterData[activeFilter].data?.indexOf(value) !== -1
          }
          onChange={(e) => {
            onFilterChange(activeFilter, value);
          }}
        >
          {t(convertToTranslationKey(value))}
        </Checkbox>
      </Box>
    ));

  //to reset announcements data (for every state change that requires new announcements to be fetched)
  const resetAnnouncementsData = () => {
    setTotalAnnnouncements(0);
    setAnnouncementsList([]);
    setPageIndex(0);
    setShowMoreAnnouncements(true);
  };

  return (
    <Layout
      _header={{
        title: t("ANNOUNCEMENTS"),
        subHeading: moment().format("hh:mm A"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
      }}
      _appBar={{ languages: manifest.languages }}
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
      _pinnedAnnouncementsData={pinnedAnnouncementsData}
    >
      <Stack space={1} mb="2">
        <Box bg={colors.white} p="5" roundedBottom={"xl"}>
          <VStack justifyContent="center" pb="5" space="4">
            <HStack space="2" justifyContent="start" px="3">
              <Input
                placeholder={t("SEARCH")}
                px="2"
                width="s"
                variant="underlined"
                borderColor={colors.primary}
                onChangeText={(e) => {
                  setSearchItem(e);
                }}
                InputRightElement={
                  <IconByName
                    name="SearchLineIcon"
                    color={colors.cardCloseIcon}
                    onPress={() => {
                      resetAnnouncementsData();
                    }}
                  />
                }
              />
              {!filtered ? (
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
              ) : null}
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
                            setActiveFilter(index);
                          }
                        }}
                      >
                        <Text color={colors.primary}>
                          {t(convertToTranslationKey(value.name))}
                        </Text>
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
                      resetAnnouncementsData();
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
            data={announcementsList}
            fetchAnnouncements={fetchAnnouncements}
            onPress={(announcement) => {
              setShowModal(true);
              setSelectedAnnouncement((selectedAnnouncement) => ({
                ...selectedAnnouncement,
                ...announcement,
              }));
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
                <Heading size="md">{selectedAnnouncement.title}</Heading>
              </HStack>
            </Box>
            <HStack flexWrap="wrap" space="3" px="5">
              <Badge
                mb="2"
                fontSize="xs"
                rounded="4"
                colorScheme="button"
                variant="subtle"
              >
                {t(convertToTranslationKey(selectedAnnouncement.author))}
              </Badge>
            </HStack>
            <HStack flexWrap={"wrap"} space="3" px="5">
              {selectedAnnouncement.additionalTags?.map((val, index) => {
                return (
                  <Badge
                    key={index}
                    mb="2"
                    fontSize="xs"
                    rounded="4"
                    variant="outline"
                    colorScheme="button"
                  >
                    {val}
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
          isOpen={activeFilter !== -1}
          onClose={() => setActiveFilter(-1)}
        >
          <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={1} pb="15px">
                <H2>
                  {t(convertToTranslationKey(filters[activeFilter]?.name))}
                </H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.cardCloseIcon}
                onPress={(e) => setActiveFilter(-1)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg={colors.white} width={"100%"}>
            {filters[activeFilter]?.allowMultiple ? (
              <CheckboxGroup></CheckboxGroup>
            ) : (
              <RadioGroup></RadioGroup>
            )}
            <Box p="5">
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                onPress={(e) => {
                  resetAnnouncementsData();
                  setActiveFilter(-1);
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
  const { t } = useTranslation();
  return (
    <Box>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchAnnouncements}
        hasMore={showMoreAnnouncements}
        loader={<Spinner color="warning.500" size="lg" />}
        height="50vh"
        endMessage={
          <Box textAlign={"center"}>{t("ALL_ANNOUNCEMENTS_LOADED")}</Box>
        }
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
                >
                  <VStack space="2" flexGrow="1">
                    <HStack alignItems="center">
                      <H2>{value.title}</H2>
                    </HStack>
                    <HStack space="2" alignItems="center">
                      <IconByName
                        _icon={{ size: "13" }}
                        name="TimeLineIcon"
                        isDisabled
                      />
                      <BodySmall>
                        {moment(value.dateModified).calendar()}
                      </BodySmall>
                    </HStack>
                  </VStack>
                  <HStack space="2" alignItems="center">
                    <Badge rounded="5" colorScheme="warning" variant="outline">
                      {t(convertToTranslationKey(value.announcementType))}
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
