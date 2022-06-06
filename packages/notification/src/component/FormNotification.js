import { IconByName, H2 } from "@shiksha/common-lib";
import {
  Box,
  FormControl,
  HStack,
  Input,
  Stack,
  Button,
  Text,
  VStack,
  Pressable,
  Actionsheet,
  Checkbox,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const FormNotification = ({ setPageName }) => {
  const { t } = useTranslation();
  const [showModalTemplate, setShowModalTemplate] = React.useState(false);
  const [selectTemplate, setSelectTemplate] = React.useState("");
  const navigate = useNavigate();

  return (
    <Stack space={1} mb="2">
      <Box bg="white" p="5">
        <FormControl>
          <FormControl.Label>
            <Text fontSize={"14px"} fontWeight="500">
              {"Notification title"}
            </Text>
          </FormControl.Label>
          <Input
            variant="filled"
            bg="gray.100"
            p={2}
            placeholder="Enter name"
          />
        </FormControl>
      </Box>
      <HStack
        bg="white"
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={"14px"} fontWeight="500">
          {"Choose Module"}
        </Text>
        <Button
          rounded="full"
          colorScheme="button"
          variant="outline"
          _text={{ color: "black", textTransform: "capitalize" }}
          px="5"
          py="1"
          bg="viewNotification.500"
          rightIcon={
            <IconByName
              color={"button.500"}
              name="ArrowDownSLineIcon"
              isDisabled
            />
          }
          onPress={(e) => console.log("")}
        >
          {t("Attendance")}
        </Button>
      </HStack>
      <HStack
        bg="white"
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={"14px"} fontWeight="500">
          {"Choose event trigger"}
        </Text>
        <Button
          rounded="full"
          variant="outline"
          colorScheme="button"
          _text={{ color: "black", textTransform: "capitalize" }}
          px="5"
          py="1"
          bg="viewNotification.500"
          rightIcon={
            <IconByName
              color={"button.500"}
              name="ArrowDownSLineIcon"
              isDisabled
            />
          }
          onPress={(e) => console.log("")}
        >
          {t("Absent for 3 days")}
        </Button>
      </HStack>
      <HStack
        bg="white"
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={"14px"} fontWeight="500">
          {"Choose channel"}
        </Text>
        <Button
          rounded="full"
          colorScheme="button"
          variant="outline"
          px="5"
          py="1"
          _text={{ textTransform: "capitalize" }}
          rightIcon={
            <IconByName
              color={"button.500"}
              name="ArrowDownSLineIcon"
              isDisabled
            />
          }
          onPress={(e) => console.log("")}
        >
          {t("Select channel")}
        </Button>
      </HStack>
      <Box bg="white" p="5">
        <VStack space="2">
          <HStack justifyContent="space-between">
            <Text fontSize="16" fontWeight="600">
              {"Message"}
            </Text>
            <Button variant="ghost" onPress={(e) => setShowModalTemplate(true)}>
              <Text fontSize="14" fontWeight="500" color="button.500">
                {"Use Another Template"}
              </Text>
            </Button>
          </HStack>
          <Text fontSize="12" fontWeight="400">
            Worksheets help the kids in exploring multiple concepts They develop
            fine motor skills, logical thinking
          </Text>
        </VStack>
      </Box>
      <Box bg="white" p="5">
        <Pressable onPress={(e) => setPageName("RecipientList")}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text>{"View recipient list"}</Text>
            <IconByName name="ArrowRightSLineIcon" isDisabled />
          </HStack>
        </Pressable>
      </Box>
      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        <Button.Group>
          <Button
            flex="1"
            colorScheme="button"
            variant="outline"
            px="5"
            onPress={(e) => navigate("/notification/schedule")}
          >
            {t("SEND_LATER")}
          </Button>
          <Button
            flex="1"
            colorScheme="button"
            _text={{ color: "white" }}
            px="5"
            onPress={(e) => setPageName("Popup")}
          >
            {t("Review & Send Now")}
          </Button>
        </Button.Group>
      </Box>
      <Actionsheet
        isOpen={showModalTemplate}
        onClose={() => setShowModalTemplate(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg="classCard.500">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="2px">
              <H2 fontWeight="500">{t("Select Template")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color="classCard.900"
              onPress={(e) => setShowModalTemplate(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg="white" width={"100%"}>
          {[
            "Worksheets help the kids in exploring multiple concepts They develop fine motor skills, logical thinking.",
            "Hello Mr. Rajesh Sharma, this is to inform you that your ward Sheetal has been present all days this week in sch...",
            "Learners should be able to use strategies that will support their understanding during their own reading",
            "Worksheets help the kids in exploring multiple concepts They develop fine motor skills, logical thinking..",
          ].map((value, index) => {
            return (
              <Pressable onPress={(e) => setSelectTemplate(value)}>
                <Box p="4" key={index}>
                  <Text color={selectTemplate === value ? "" : "gray.300"}>
                    {value}
                  </Text>
                </Box>
              </Pressable>
            );
          })}
          <Box p="5">
            <Button
              colorScheme="button"
              _text={{ color: "white" }}
              onPress={(e) => setShowModalTemplate(false)}
            >
              {t("CONTINUE")}
            </Button>
          </Box>
        </Box>
      </Actionsheet>
    </Stack>
  );
};
