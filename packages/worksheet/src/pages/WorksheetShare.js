import {
  capture,
  telemetryFactory,
  Layout,
  Collapsible,
  H2,
  IconByName,
  H3,
  H4,
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
      _subHeader={{ bg: "worksheetCard.500" }}
      _footer={footerLinks}
    >
      <Stack>
        <VStack bg="white" space="2">
          <Collapsible
            header={
              <VStack space="2" py="5">
                <Text fontSize="14px" fontWeight="500">
                  {"Student List"}
                </Text>
                <Text fontSize="10px" fontWeight="300">
                  {`Total: ${students?.length}`}
                </Text>
              </VStack>
            }
          >
            {students.map((item, index) => (
              <Box
                key={index}
                borderBottomWidth="1"
                borderColor="gray.100"
                p="10px"
              >
                <Suspense fallback="logding">
                  <Card
                    attendanceProp={[]}
                    item={item}
                    type="rollFather"
                    textTitle={
                      <VStack alignItems="center">
                        <Text fontSize="14" fontWeight="500">
                          <Text>{item.admissionNo}</Text>
                          <Text color="gray.300"> • </Text>
                          <Text>{item.fullName}</Text>
                        </Text>
                      </VStack>
                    }
                    textSubTitle={
                      <VStack alignItems="center">
                        <Text fontSize="10" fontWeight="400" color="gray.400">
                          <Text>{item.fathersName}</Text>
                        </Text>
                      </VStack>
                    }
                    rightComponent={
                      <IconByName
                        color={item?.isSelected ? "button.500" : "gray.300"}
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
        <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
          <Button.Group>
            <Button
              flex="1"
              colorScheme="button"
              _text={{ color: "white" }}
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
        _backdrop={{ opacity: "0.9", bg: "gray.500" }}
      >
        <Actionsheet.Content p="0" alignItems={"left"} bg="worksheetCard.500">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="25px">
              <H2 fontWeight={"600"}>{t("SELECT_VIEW")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color="worksheetCard.800"
              onPress={(e) => setShowModal(false)}
            />
          </HStack>
        </Actionsheet.Content>

        <Box w="100%" bg="white">
          <Box shadow="2" p="5">
            <Pressable onPress={(e) => setShowSuccessModal(true)}>
              <WhatsappShareButton
                url={`https://sandbox.shikshaplatform.io/modules/worksheet/${worksheetId}/view`}
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
                url={`https://sandbox.shikshaplatform.io/modules/worksheet/${worksheetId}/view`}
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
        <Actionsheet.Content p="0" alignItems={"left"} bg="worksheetCard.500">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="25px">
              <H2 fontWeight={"600"}>{t("Worksheet Sent")}</H2>
              <H4 color="worksheetCard.800">
                {moment().format("DD MMM, h:m")}
              </H4>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color="worksheetCard.800"
              onPress={handleSuccessModule}
            />
          </HStack>
        </Actionsheet.Content>

        <Box w="100%" bg="white">
          <Box px="5">
            <HStack
              py="5"
              borderBottomWidth="1"
              borderColor="gray.200"
              alignItems="center"
              space="1"
            >
              <IconByName
                _icon={{ size: "16" }}
                name="CheckDoubleLineIcon"
                color="classCard.900"
                isDisabled
              />
              <Text fontSize="14" fontWeight="500">
                {t(
                  `Sending to ${
                    students.filter((e) => e.isSelected).length
                  } parents`
                )}
              </Text>
            </HStack>
          </Box>
          <VStack p="5" space={6}>
            <Text fontSize="14" fontWeight="600">
              {t("NOTICE")}
            </Text>
            <Text fontSize="14" fontWeight="400" textTransform={"inherit"}>
              Hi there, I just shared this amazing worksheet from shikshaApp
              click the below link to open it.
              https://shiksha.edu/learningmadeeasy+1/eaSe89Js.
            </Text>
          </VStack>
          <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
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
                _text={{ color: "white" }}
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
