import {
  capture,
  telemetryFactory,
  Layout,
  Collapsible,
  H2,
  IconByName,
  H3,
  H4,
  overrideColorTheme,
  BodyLarge,
  BodyMedium,
  Caption,
} from "@shiksha/common-lib";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import {
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const newStudents = [
  {
    fullName: "Shah Rukh Khan",
    admissionNo: "1",
    fathersName: "Mr. Fathers Name",
    days: "11",
  },
  {
    fullName: "Rahul Patil",
    admissionNo: "2",
    fathersName: "Mr. Fathers Name",
    days: "11",
  },
  {
    fullName: "Sandhya Shankar",
    admissionNo: "3",
    fathersName: "Mr. Fathers Name",
    days: "3",
  },
  {
    fullName: "Jatin Agarwal",
    admissionNo: "4",
    fathersName: "Mr. Fathers Name",
    days: "11",
  },
  {
    fullName: "Rehan Orpe",
    admissionNo: "5",
    fathersName: "Mr. Fathers Name",
    days: "11",
  },
  {
    fullName: "Siddharth Kabra",
    admissionNo: "6",
    fathersName: "Mr. Fathers Name",
    days: "3",
  },
];

export default function WorksheetShare({ footerLinks, appName }) {
  const { t } = useTranslation();
  const Card = React.lazy(() => import("students/Card"));
  const [students, setStudents] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const { worksheetId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    setStudents(newStudents);
  }, []);

  const handleSuccessModule = () => {
    setShowSuccessModal(false);
    setShowModal(false);
    navigate(-1);
  };

  return (
    <Layout
      _header={{
        title: t("Class VI A"),
        subHeading: "Select Student",
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={`class V`}
      _subHeader={{ bg: colors.worksheetCardBg }}
      _footer={footerLinks}
    >
      <Stack>
        <VStack bg={colors.white} space="2">
          <Collapsible
            header={
              <VStack space="2" py="5">
                <BodyLarge>{"Student List"}</BodyLarge>
                <Caption>{`Total: ${students?.length}`}</Caption>
              </VStack>
            }
          >
            {students.map((item, index) => (
              <Box
                key={index}
                borderBottomWidth="1"
                borderColor={colors.lightGray5}
                p="10px"
              >
                <Suspense fallback="logding">
                  <Card
                    attendanceProp={[]}
                    item={item}
                    type="rollFather"
                    textTitle={
                      <VStack alignItems="center">
                        <BodyLarge>
                          <Text>{item.admissionNo}</Text>
                          <Text color={colors.lightGray2}> • </Text>
                          <Text>{item.fullName}</Text>
                        </BodyLarge>
                      </VStack>
                    }
                    textSubTitle={
                      <VStack alignItems="center">
                        <Caption color={colors.gray}>
                          {item.fathersName}
                        </Caption>
                      </VStack>
                    }
                    rightComponent={
                      <IconByName
                        color={
                          item?.isSelected ? colors.primary : colors.lightGray2
                        }
                        name={
                          item?.isSelected
                            ? "CheckboxLineIcon"
                            : "CheckboxBlankLineIcon"
                        }
                        onPress={(event) => {
                          if (item?.isSelected) {
                            const newData = students.map((subE) =>
                              subE.admissionNo === item?.admissionNo
                                ? { ...subE, isSelected: false }
                                : subE
                            );
                            setStudents(newData);
                          } else {
                            const newData = students.map((subE) =>
                              subE.admissionNo === item?.admissionNo
                                ? { ...subE, isSelected: true }
                                : subE
                            );
                            setStudents(newData);
                          }
                        }}
                      />
                    }
                    hidePopUpButton
                  />
                </Suspense>
              </Box>
            ))}
          </Collapsible>
        </VStack>
        <Box bg={colors.white} p="5" position="sticky" bottom="0" shadow={2}>
          <Button.Group>
            <Button
              flex="1"
              colorScheme="button"
              _text={{ color: colors.white }}
              px="5"
              onPress={(e) => setShowModal(true)}
            >
              {t("SEND")}
            </Button>
          </Button.Group>
        </Box>
      </Stack>
      <Actionsheet
        isOpen={showModal}
        _backdrop={{ opacity: "0.9", bg: colors.gray }}
      >
        <Actionsheet.Content
          p="0"
          alignItems={"left"}
          bg={colors.worksheetCardBg}
        >
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2 fontWeight={"600"}>{t("SELECT_VIEW")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.worksheetCardIcon}
              onPress={(e) => setShowModal(false)}
            />
          </HStack>
        </Actionsheet.Content>

        <Box w="100%" bg={colors.white}>
          <Box shadow="2" p="5">
            <Pressable onPress={(e) => setShowSuccessModal(true)}>
              <WhatsappShareButton
                url={`https://sandbox.shikshaplatform.io/modules/worksheet/worksheet/${worksheetId}/view`}
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
            <Pressable onPress={(e) => setShowSuccessModal(true)}>
              <LinkedinShareButton
                url={`https://sandbox.shikshaplatform.io/modules/worksheet/worksheet/${worksheetId}/view`}
              >
                <HStack space="5">
                  <LinkedinIcon size={15} round />
                  <Text>{"Linkedin"}</Text>
                </HStack>
              </LinkedinShareButton>
            </Pressable>
          </Box>
        </Box>
      </Actionsheet>
      <Actionsheet
        isOpen={showSuccessModal}
        _backdrop={{ opacity: "0.9", bg: "gray.500" }}
      >
        <Actionsheet.Content p="0" alignItems={"left"} bg={colors.successAlert}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("Worksheet Sent")}</H2>
              <H4 color={colors.darkGreen}>{moment().format("DD MMM, h:m")}</H4>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.worksheetCardIcon}
              onPress={handleSuccessModule}
            />
          </HStack>
        </Actionsheet.Content>

        <Box w="100%" bg={colors.white}>
          <Box px="5">
            <HStack
              py="5"
              borderBottomWidth="1"
              borderColor={colors.lightGray2}
              alignItems="center"
              space="1"
            >
              <IconByName
                _icon={{ size: "16" }}
                name="CheckDoubleLineIcon"
                color={colors.cardCloseIcon}
                isDisabled
              />
              <BodyLarge>
                {t(
                  `Sending to ${
                    students.filter((e) => e.isSelected).length
                  } parents`
                )}
              </BodyLarge>
            </HStack>
          </Box>
          <VStack p="5" space={6}>
            <H3>{t("NOTICE")}</H3>
            <BodyMedium textTransform={"inherit"}>
              Hi there, I just shared this amazing worksheet from shikshaApp
              click the below link to open it.
              https://shiksha.edu/learningmadeeasy+1/eaSe89Js.
            </BodyMedium>
          </VStack>
          <Box bg={colors.white} p="5" position="sticky" bottom="0" shadow={2}>
            <Button.Group>
              <Button
                flex="1"
                colorScheme="button"
                variant="outline"
                px="5"
                onPress={handleSuccessModule}
              >
                {t("RESEND")}
              </Button>
              <Button
                flex="1"
                colorScheme="button"
                _text={{ color: colors.white }}
                px="5"
                onPress={handleSuccessModule}
              >
                {t("Done")}
              </Button>
            </Button.Group>
          </Box>
        </Box>
      </Actionsheet>
    </Layout>
  );
}
