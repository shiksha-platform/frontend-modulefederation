import {
  classRegistryService,
  Layout,
  Collapsible,
  H2,
  IconByName,
  H3,
  H4,
  BodyLarge,
  BodyMedium,
  Caption,
  templateRegistryService,
  Loading,
  worksheetRegistryService,
} from "@shiksha/common-lib";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Link,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import WorksheetTemplateComponent from "../components/WorksheetTemplate";

export default function WorksheetShare({ footerLinks, appName, setAlert }) {
  const { t } = useTranslation();
  const Card = React.lazy(() => import("students/Card"));
  const [classes, setClasses] = React.useState([]);
  const [pdfUrl, setPdfUrl] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [templates, setTemplates] = React.useState([]);
  const [selectedStudents, setSelectedStudents] = React.useState([]);
  const teacherId = localStorage.getItem("id");
  const [shareType, setShareType] = React.useState();
  const [showModal, setShowModal] = React.useState(true);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [worksheet, setWorksheet] = React.useState({});
  const { worksheetId } = useParams();
  const navigate = useNavigate();

  React.useEffect(async () => {
    const worksheetData = await worksheetRegistryService.getOne({
      id: worksheetId,
    });
    setWorksheet(worksheetData);
    const templateData = await templateRegistryService.getAll({
      tag: "worksheet",
    });
    setTemplates(templateData);
    const data = await classRegistryService.getAllData({
      teacherId: { eq: teacherId },
      type: { eq: "class" },
      parentId: { neq: "0" },
      coreData: "getStudents",
      studentResponseType: "core",
    });
    setClasses(data.filter((e) => e?.studentData?.length > 0));
    setLoading(false);
  }, []);

  const handleWorksheet = async (templateId) => {
    setLoading(true);
    const data = await worksheetRegistryService.downloadWorksheet({
      id: worksheetId,
      worksheetId,
      templateId,
    });
    if (data?.data) {
      setPdfUrl(data.data);
      setLoading(false);
    } else if (data?.error) {
      setLoading(false);
      setAlert(data?.error[0].message);
    }
    setLoading(false);
  };

  const handleSuccessModule = () => {
    setShowSuccessModal(false);
    setShowModal(false);
    navigate(-1);
  };

  const handleSms = () => {
    setShareType("sms");
    setShowModal(false);
  };

  const handleSendSms = () => {
    const result = worksheetRegistryService.share({
      studentIds: selectedStudents.map((e) => e.id),
      teacherId: teacherId,
      templateId: "29",
      link: pdfUrl,
      subject: worksheet.subject,
      topic: worksheet?.topic?.[0],
    });
    setShowSuccessModal(true);
  };

  const handleSelectStudent = (item) => {
    const selectData = selectedStudents.filter((e) => e.id === item.id);
    if (selectData.length > 0) {
      setSelectedStudents(selectData);
    } else {
      setSelectedStudents([...selectedStudents, item]);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout
      _header={{
        title: pdfUrl ? t("SELECT_STUDENTS") : t("SELECT_TEMPLATE"),
        subHeading: pdfUrl ? t("SELECT_STUDENTS") : "",
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={pdfUrl ? t("SELECT_STUDENTS") : t("SELECT_TEMPLATE")}
      _subHeader={{ bg: "worksheet.cardBg" }}
      _footer={footerLinks}
    >
      {!pdfUrl ? (
        <WorksheetTemplateComponent
          onPress={handleWorksheet}
          {...{
            templates,
            _box: { bg: "worksheet.cardBgLight" },
            _templateBox: {
              activeColor: "worksheet.cardBg",
              bg: "worksheet.white",
              mb: 5,
            },
          }}
        />
      ) : (
        <Stack>
          {shareType === "sms" ? (
            <Box>
              <VStack bg={"worksheet.white"} space="4" p="4">
                {classes.map((classItem, classIndex) =>
                  classItem?.studentData &&
                  classItem?.studentData.length > 0 ? (
                    <Collapsible
                      key={classIndex}
                      header={
                        <VStack space="1">
                          <BodyLarge>{`${classItem?.name} • Sec ${classItem?.section}`}</BodyLarge>
                          <Caption>{`Total: ${classItem?.studentData.length}`}</Caption>
                        </VStack>
                      }
                      defaultCollapse={classIndex === 0 ? true : false}
                      _box={{ p: 0 }}
                    >
                      {classItem?.studentData.map((item, index) => {
                        const selectData = selectedStudents.filter(
                          (e) => e.id === item.id
                        );

                        return (
                          <Box
                            key={index}
                            borderBottomWidth="1"
                            borderColor={"worksheet.lightGray5"}
                            p="10px"
                          >
                            <Suspense fallback="loading">
                              <Card
                                attendanceProp={[]}
                                item={item}
                                type="rollFather"
                                textTitle={
                                  <BodyLarge>{`${item.admissionNo} • ${item?.firstName} ${item?.lastName}`}</BodyLarge>
                                }
                                textSubTitle={
                                  <VStack alignItems="center">
                                    <Caption color={"worksheet.gray"}>
                                      {`${t("FATHERS_NAME")} : ${
                                        item.fathersName
                                          ? item.fathersName
                                          : t("NOT_ENTERED")
                                      }`}
                                    </Caption>
                                  </VStack>
                                }
                                rightComponent={
                                  <IconByName
                                    color={
                                      selectData?.length > 0
                                        ? "worksheet.primary"
                                        : "worksheet.lightGray2"
                                    }
                                    name={
                                      selectData?.length > 0
                                        ? "CheckboxLineIcon"
                                        : "CheckboxBlankLineIcon"
                                    }
                                    onPress={() => handleSelectStudent(item)}
                                  />
                                }
                                hidePopUpButton
                              />
                            </Suspense>
                          </Box>
                        );
                      })}
                    </Collapsible>
                  ) : (
                    <React.Fragment />
                  )
                )}
              </VStack>
              <Box
                bg={"worksheet.white"}
                p="5"
                position="sticky"
                bottom="0"
                shadow={2}
              >
                <Button.Group>
                  <Button
                    flex="1"
                    colorScheme="button"
                    _text={{ color: "worksheet.white" }}
                    px="5"
                    onPress={handleSendSms}
                    isDisabled={!selectedStudents.length}
                  >
                    {t("SEND")}
                  </Button>
                </Button.Group>
              </Box>
            </Box>
          ) : (
            <React.Fragment />
          )}
          <Actionsheet isOpen={showModal}>
            <Actionsheet.Content
              p="0"
              alignItems={"left"}
              bg={"worksheet.cardBg"}
            >
              <HStack justifyContent={"space-between"}>
                <Stack p={5} pt={2} pb="15px">
                  <H2 fontWeight={"600"}>{t("SELECT_VIEW")}</H2>
                </Stack>
                <IconByName
                  name="CloseCircleLineIcon"
                  color={"worksheet.primaryDark"}
                  onPress={(e) => setShowModal(false)}
                />
              </HStack>
            </Actionsheet.Content>

            <Box w="100%" bg={"worksheet.white"}>
              <Box shadow="2" p="5">
                <Pressable
                  onPress={(e) => {
                    setShowModal(false);
                    navigate(-1);
                  }}
                >
                  <WhatsappShareButton
                    url={pdfUrl}
                    title="Worksheet"
                    separator=":: "
                  >
                    <HStack space="5">
                      <WhatsappIcon size={15} round />
                      <Text>{"Whatsapp"}</Text>
                    </HStack>
                  </WhatsappShareButton>
                </Pressable>
              </Box>
              <Box shadow="2" p="5">
                <Pressable onPress={handleSms}>
                  <HStack space="5">
                    <IconByName
                      name="MailLineIcon"
                      isDisabled
                      _icon={{ size: 15 }}
                    />
                    <Text>{"SMS"}</Text>
                  </HStack>
                </Pressable>
              </Box>
            </Box>
          </Actionsheet>
          <Actionsheet isOpen={showSuccessModal}>
            <Actionsheet.Content
              p="0"
              alignItems={"left"}
              bg={"worksheet.cardBg"}
            >
              <HStack justifyContent={"space-between"}>
                <Stack p={5} pt={2} pb="15px">
                  <H2>{t("Worksheet Sent")}</H2>
                  <H4>{moment().format("DD MMM, h:m")}</H4>
                </Stack>
                <IconByName
                  name="CloseCircleLineIcon"
                  color={"worksheet.primaryDark"}
                  onPress={handleSuccessModule}
                />
              </HStack>
            </Actionsheet.Content>

            <Box w="100%" bg={"worksheet.white"}>
              <Box px="5">
                <HStack
                  py="5"
                  borderBottomWidth="1"
                  borderColor={"worksheet.lightGray2"}
                  alignItems="center"
                  space="1"
                >
                  <IconByName
                    _icon={{ size: "16" }}
                    name="CheckDoubleLineIcon"
                    color={"worksheet.cardCloseIcon"}
                    isDisabled
                  />
                  <BodyLarge>
                    {t(
                      `Sending to ${selectedStudents.length} ${t("STUDENTS")}`
                    )}
                  </BodyLarge>
                </HStack>
              </Box>
              <VStack p="5" space={6}>
                <H3>{t("NOTICE")}</H3>
                <BodyMedium textTransform={"inherit"}>
                  <Link target="_blank" href={pdfUrl}>
                    {pdfUrl}
                  </Link>
                </BodyMedium>
              </VStack>
              <Box
                bg={"worksheet.white"}
                p="5"
                position="sticky"
                bottom="0"
                shadow={2}
              >
                <Button.Group>
                  {/* <Button
                flex="1"
                colorScheme="button"
                variant="outline"
                px="5"
                onPress={handleSuccessModule}
              >
                {t("RESEND")}
              </Button> */}
                  <Button
                    flex="1"
                    colorScheme="button"
                    _text={{ color: "worksheet.white" }}
                    px="5"
                    onPress={handleSuccessModule}
                  >
                    {t("Done")}
                  </Button>
                </Button.Group>
              </Box>
            </Box>
          </Actionsheet>
        </Stack>
      )}
    </Layout>
  );
}
