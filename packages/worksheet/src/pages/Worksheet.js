import React from "react";
import {
  capture,
  FilterButton,
  Layout,
  Loading,
  telemetryFactory,
  worksheetRegistryService,
  overrideColorTheme,
  SearchLayout,
  getApiConfig,
  H2,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Box, Button, Stack, VStack } from "native-base";
import { useNavigate, useParams } from "react-router-dom";
import manifest from "../manifest.json";
import WorksheetBox from "../components/WorksheetBox";
import { defaultInputs } from "../config/worksheetConfig";
import colorTheme from "../colorTheme";
import SortActionsheet from "../components/Actionsheet/SortActionsheet";

const newDefaultInputs = defaultInputs.map((e) => {
  return {
    ...e,
    ["attributeName"]: ["gradeLevel"].includes(e.attributeName)
      ? "grade"
      : e.attributeName,
    ["type"]: "sting",
  };
});

const colors = overrideColorTheme(colorTheme);

export default function Worksheet({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [filterObject, setFilterObject] = React.useState({});
  const [worksheets, setWorksheets] = React.useState([]);
  const [sortArray, setSortArray] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  const [sortData, setSortData] = React.useState();
  const [worksheetConfig, setWorksheetConfig] = React.useState([]);
  const [showButtonArray, setShowButtonArray] = React.useState(["Like"]);
  const { state } = useParams();

  React.useEffect(async () => {
    const newManifest = await getApiConfig({ modules: { eq: "Worksheet" } });
    setWorksheetConfig(
      Array.isArray(newManifest?.["worksheet.worksheetMetadata"])
        ? newManifest?.["worksheet.worksheetMetadata"]
        : newManifest?.["worksheet.worksheetMetadata"]
        ? JSON.parse(newManifest?.["worksheet.worksheetMetadata"])
        : []
    );
    let params = state
      ? {
          state: { eq: state },
        }
      : {};

    const arr = Object.keys(filterObject);
    arr.forEach((attr) => {
      params =
        filterObject[attr] && filterObject[attr] !== ""
          ? { ...params, [attr]: { eq: filterObject[attr] } }
          : params;
    });

    const data = await worksheetRegistryService.getAll(params);
    let filterData = [];
    if (search && search.length >= 3 && searchState) {
      filterData = data.filter((e) =>
        e.name.toLowerCase().startsWith(search.toLowerCase())
      );
    } else {
      filterData = data.filter((e) => e.name);
    }
    setWorksheets(filterData);
    const sorts = Array.isArray(
      newManifest?.["worksheet.configureWorksheetSortOptions"]
    )
      ? newManifest?.["worksheet.configureWorksheetSortOptions"]
      : newManifest?.["worksheet.configureWorksheetSortOptions"]
      ? JSON.parse(newManifest?.["worksheet.configureWorksheetSortOptions"])
      : [];
    let buttons = [];
    if (newManifest["worksheet.allow-download-worksheet"] === "true") {
      buttons = [...buttons, "Download"];
    }
    if (newManifest["worksheet.allow-sharing-worksheet"] === "true") {
      buttons = [...buttons, "Share"];
    }
    setShowButtonArray([...showButtonArray, ...buttons]);

    setSortArray(sorts);
    setLoading(false);
  }, [filterObject, search.length >= 3, searchState]);

  if (loading) {
    return <Loading />;
  }

  if (searchState) {
    return (
      <SearchLayout
        {...{
          search,
          setSearch,
          minStringLenght: 3,
          searchPlaceholder: t("ENTER_TITLE_HINT"),
          notFoundMessage: t("TYPE_TO_START_SEARCHING_WORKSHEETS"),
          onCloseSearch: setSearchState,
        }}
      >
        <ChildrenWorksheet
          {...{
            worksheets,
            isHideCreateButton: true,
            setFilterObject,
            sortArray,
            worksheetConfig,
            showButtonArray,
          }}
        />
      </SearchLayout>
    );
  }

  return (
    <Layout
      _header={{
        title: t("All Worksheets"),
        iconComponent: (
          <Box>
            <SortActionsheet
              {...{
                appName,
                sortArray,
                setSortData,
              }}
            />
          </Box>
        ),
      }}
      _appBar={{
        languages: manifest.languages,
        isEnableSearchBtn: true,
        setSearch,
        setSearchState,
      }}
      subHeader={<H2 textTransform="none">{t("View all your worksheets")}</H2>}
      _subHeader={{ bg: colors.cardBg }}
      _footer={footerLinks}
    >
      <ChildrenWorksheet
        {...{
          sortArray,
          worksheets,
          setFilterObject,
          appName,
          worksheetConfig,
          showButtonArray,
        }}
      />
    </Layout>
  );
}

const ChildrenWorksheet = ({
  worksheetConfig,
  showButtonArray,
  worksheets,
  isHideCreateButton,
  setFilterObject,
  appName,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useParams();

  const handleFilter = (obejct) => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Filter",
      filterObject: obejct,
    });
    capture("INTERACT", telemetryData);
    setFilterObject(obejct);
  };

  return (
    <Stack>
      <FilterButton
        getObject={handleFilter}
        _box={{ pt: 5, px: 5 }}
        _actionSheet={{ bg: colors.cardBg }}
        _button={{ bg: colors.primaryLight, px: "15px", py: "2" }}
        _filterButton={{
          rightIcon: "",
          bg: colors.white,
          color: colors.primary,
        }}
        resetButtonText={t("COLLAPSE")}
        color={colors.primary}
        filters={newDefaultInputs}
      />
      <VStack>
        <Box bg={colors.white} p="5" mb="4" roundedBottom={"xl"} shadow={2}>
          <Stack>
            <VStack space={3}>
              {worksheets.length > 0 ? (
                worksheets.map((item, index) => {
                  return (
                    <WorksheetBox
                      canShowButtonArray={showButtonArray}
                      worksheetConfig={worksheetConfig}
                      appName={appName}
                      canShare={true}
                      key={index}
                      {...{ item, url: `/worksheet/${item.id}` }}
                    />
                  );
                })
              ) : (
                <Box
                  p="10"
                  my="5"
                  alignItems={"center"}
                  rounded="lg"
                  bg={colors.viewNotificationDark}
                >
                  {t("WORKSHEET_NOT_FOUND")}
                </Box>
              )}
            </VStack>
          </Stack>
        </Box>
      </VStack>
      {!isHideCreateButton ? (
        <Box bg={colors.white} p="5" position="sticky" bottom="84" shadow={2}>
          <Button
            _text={{ color: colors.white }}
            p="3"
            onPress={(e) => navigate("/worksheet/create")}
          >
            {t("CREATE_NEW_WORKSHEET")}
          </Button>
        </Box>
      ) : (
        <React.Fragment />
      )}
    </Stack>
  );
};

const LessonPlans = () => {
  return <h4>LessonPlans</h4>;
};
