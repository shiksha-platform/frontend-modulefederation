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
  getArray,
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
    ["type"]: ["subject", "gradeLevel", "source"].includes(e.attributeName)
      ? "string"
      : "array",
  };
});

const colors = overrideColorTheme(colorTheme);

export default function Worksheet({ footerLinks, appName, setAlert }) {
  const { t } = useTranslation();
  const [filterObject, setFilterObject] = React.useState({});
  const [worksheets, setWorksheets] = React.useState([]);
  const [sortArray, setSortArray] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [worksheetLoading, setWorksheetLoading] = React.useState(true);
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  const [inputs, setInputs] = React.useState([]);
  // const [sortData, setSortData] = React.useState();
  const [worksheetConfig, setWorksheetConfig] = React.useState([]);
  const [showButtonArray, setShowButtonArray] = React.useState(["Like"]);
  const { state } = useParams();

  React.useEffect(async () => {
    const newManifest = await getApiConfig(["worksheet"]);
    const source = getArray(newManifest?.["question-bank.questionResource"]);
    setInputs(
      newDefaultInputs.map((item, index) => {
        if (item.attributeName === "source") {
          item.data = source;
        }
        return item;
      })
    );
    setWorksheetConfig(
      Array.isArray(newManifest?.["worksheet.worksheetMetadata"])
        ? newManifest?.["worksheet.worksheetMetadata"]
        : newManifest?.["worksheet.worksheetMetadata"]
        ? JSON.parse(newManifest?.["worksheet.worksheetMetadata"])
        : []
    );
    // const sorts = Array.isArray(
    //   newManifest?.["worksheet.configureWorksheetSortOptions"]
    // )
    //   ? newManifest?.["worksheet.configureWorksheetSortOptions"]
    //   : newManifest?.["worksheet.configureWorksheetSortOptions"]
    //   ? JSON.parse(newManifest?.["worksheet.configureWorksheetSortOptions"])
    //   : [];
    let buttons = [];
    if (newManifest["worksheet.allow-download-worksheet"] === "true") {
      buttons = [...buttons, "Download"];
    }
    if (newManifest["worksheet.allow-sharing-worksheet"] === "true") {
      buttons = [...buttons, "Share"];
    }
    setShowButtonArray([...showButtonArray, ...buttons]);

    // setSortArray(sorts);
    setLoading(false);
  }, []);

  React.useEffect(async () => {
    setWorksheetLoading(true);
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
    console.log("FilterData", filterData);
    setWorksheets(filterData);
    setWorksheetLoading(false);
  }, [filterObject, search.length >= 3, searchState]);
  console.log(filterObject);
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
            inputs,
            setAlert,
            worksheetLoading,
          }}
        />
      </SearchLayout>
    );
  }

  return (
    <Layout
      _header={{
        title: t("ALL_WORKSHEETS"),
        // iconComponent: (
        //   <Box>
        //     <SortActionsheet
        //       {...{
        //         appName,
        //         sortArray,
        //         setSortData,
        //       }}
        //     />
        //   </Box>
        // ),
      }}
      _appBar={{
        languages: manifest.languages,
        isEnableSearchBtn: true,
        setSearchState,
      }}
      subHeader={<H2 textTransform="none">{t("View all your worksheets")}</H2>}
      _subHeader={{ bg: "worksheet.cardBg" }}
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
          inputs,
          setAlert,
          worksheetLoading,
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
  inputs,
  setAlert,
  worksheetLoading,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useParams();
  const ref = React.useRef(null);

  const handleFilter = (object) => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Filter",
      filterObject: object,
    });
    capture("INTERACT", telemetryData);
    setFilterObject(object);
  };

  return (
    <Stack bg={"white"} p={worksheetLoading ? "5" : "0"}>
      <FilterButton
        setAlert={setAlert}
        getObject={handleFilter}
        _box={{ pt: 5, px: 5 }}
        _actionSheet={{ bg: "worksheet.cardBg" }}
        _button={{ bg: "worksheet.primaryLight", px: "15px", py: "2" }}
        _filterButton={{
          rightIcon: "",
          bg: "worksheet.white",
          color: "worksheet.primary",
        }}
        resetButtonText={t("COLLAPSE")}
        color={"worksheet.primary"}
        filters={inputs}
      />
      {worksheetLoading ? (
        <Loading height="auto" />
      ) : (
        <VStack ref={ref}>
          <Box
            bg={"worksheet.white"}
            p="5"
            mb="4"
            roundedBottom={"xl"}
            shadow={2}
          >
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
                    bg={"worksheet.secondary"}
                  >
                    {t("WORKSHEET_NOT_FOUND")}
                  </Box>
                )}
              </VStack>
            </Stack>
          </Box>
          {!isHideCreateButton ? (
            <Box
              bg={"worksheet.white"}
              p="5"
              position="sticky"
              bottom="84"
              shadow={2}
            >
              <Button
                _text={{ color: "worksheet.white" }}
                p="3"
                onPress={(e) => navigate("/worksheet/create")}
              >
                {t("CREATE_NEW_WORKSHEET")}
              </Button>
            </Box>
          ) : (
            <React.Fragment />
          )}
        </VStack>
      )}
    </Stack>
  );
};

const LessonPlans = () => {
  return <h4>LessonPlans</h4>;
};
