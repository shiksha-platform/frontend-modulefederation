import React, { useEffect } from "react";
import { Box, HStack, VStack, Avatar } from "native-base";
import { useTranslation } from "react-i18next";
import {
  H1,
  userRegistryService,
  BodyLarge,
  H4,
  Layout,
} from "@shiksha/common-lib";
import manifest from "../manifest.json";
import TeacherEdit from "components/TeacherEdit";
import { useLocation } from "react-router-dom";

const SeeMore = ({ footerLinks, appName }) => {
  const [teacherObject, setTeacherObject] = React.useState({});
  const teacherId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { t } = useTranslation();

  const apiFieldMapping = {
    designation: "leavingDesignation",
    cadre: "cadre",
    transfer_order_number: "transferOrderNumber",
    date_of_order: "dateOfOrder",
    place_of_posting: "placeOfPosting",
    mode_of_posting: "modeOfPosting",
  };
  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      if (!ignore) {
        const resultTeacher = await userRegistryService.getOne();
        setTeacherObject(resultTeacher);
      }
    };
    getData();
  }, [teacherId, token]);

  return (
    <Layout
      _appBar={{ languages: manifest.languages }}
      _header={{
        title: t("MY_CLASSES"),
        customeComponent: (
          <Box minH={"150px"}>
            <Box position={"absolute"} bottom={0} p={5} pb={8} width={"100%"}>
              <HStack alignItems="center" justifyContent="space-between">
                <VStack>
                  <H4 color={"profile.bodyText"}>{t("MY_PROFILE")}</H4>
                  <H1 color={"profile.bodyText"}>
                    {teacherObject?.firstName + " " + teacherObject?.lastName}
                  </H1>
                  <BodyLarge color={"profile.bodyText"}>
                    {teacherObject?.designation}
                  </BodyLarge>
                </VStack>
                <Avatar
                  size="48px"
                  source={{
                    uri: teacherObject?.image,
                  }}
                >
                  {`${teacherObject?.firstName} ${teacherObject?.lastName}`
                    .toUpperCase()
                    .substr(0, 2)}
                </Avatar>
              </HStack>
            </Box>
          </Box>
        ),
      }}
      subHeader={location.state.header}
      _subHeader={{
        bg: "profile.cardBg",
      }}
      _footer={footerLinks}
    >
      <TeacherEdit
        teacherObject={location.state}
        onlyParameterProp={location.state.objectProp}
        isEditable={false}
        SeeMore={false}
        nestedCollapse={location.state.nestedCollapse === true ? true : false}
        nestedHeader={
          location.state.nestedHeader?.length > 0
            ? location.state.nestedHeader
            : []
        }
        seeMoreBelowSection={false}
        workData={
          location.state.updatedObject?.length > 0
            ? location.state.updatedObject
            : []
        }
        fieldMapper={
          location.state.nestedCollapse === true
            ? apiFieldMapping
            : location.state?.fieldMapper
        }
      />
    </Layout>
  );
};

export default SeeMore;
