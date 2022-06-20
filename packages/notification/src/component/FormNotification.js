import {
  IconByName,
  H2,
  overrideColorTheme,
  BodyLarge,
  BodySmall,
} from "@shiksha/common-lib";
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
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export const FormNotification = ({ setPageName }) => {
  const { t } = useTranslation();
  const [showModalTemplate, setShowModalTemplate] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Stack space={1} mb="2">
      <Box bg={colors.white} p="5">
        <FormControl>
          <FormControl.Label>
            <BodyLarge>{"Notification title"}</BodyLarge>
          </FormControl.Label>
          <Input variant="filled" p={2} placeholder="Enter name" />
        </FormControl>
      </Box>
      <HStack
        bg={colors.white}
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <BodyLarge>{"Choose Module"}</BodyLarge>
        <Button
          rounded="full"
          colorScheme="button"
          variant="outline"
          _text={{ color: colors.black, textTransform: "capitalize" }}
          px="5"
          py="1"
          bg={colors.notificationCardBg}
          rightIcon={
            <IconByName
              color={colors.primary}
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
        bg={colors.white}
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <BodyLarge>{"Choose event trigger"}</BodyLarge>
        <Button
          rounded="full"
          variant="outline"
          colorScheme="button"
          _text={{ color: colors.black, textTransform: "capitalize" }}
          px="5"
          py="1"
          bg={colors.notificationCardBg}
          rightIcon={
            <IconByName
              color={colors.primaryBorder}
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
        bg={colors.white}
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <BodyLarge>{"Choose channel"}</BodyLarge>
        <Button
          rounded="full"
          colorScheme="button"
          variant="outline"
          px="5"
          py="1"
          _text={{ textTransform: "capitalize" }}
          rightIcon={
            <IconByName
              color={colors.primary}
              name="ArrowDownSLineIcon"
              isDisabled
            />
          }
          onPress={(e) => console.log("")}
        >
          {t("Select channel")}
        </Button>
      </HStack>
      <Box bg={colors.white} p="5">
        <VStack space="2">
          <HStack justifyContent="space-between">
            <H2>{"Message"}</H2>
            <Button variant="ghost" onPress={(e) => setShowModalTemplate(true)}>
              <BodyLarge color={colors.primary}>
                {"Use Another Template"}
              </BodyLarge>
            </Button>
          </HStack>
          <BodySmall>
            Worksheets help the kids in exploring multiple concepts They develop
            fine motor skills, logical thinking
          </BodySmall>
        </VStack>
      </Box>
      <Box bg={colors.white} p="5">
        <Pressable onPress={(e) => setPageName("RecipientList")}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text>{"View recipient list"}</Text>
            <IconByName name="ArrowRightSLineIcon" isDisabled />
          </HStack>
        </Pressable>
      </Box>
      <Box bg={colors.white} p="5" position="sticky" bottom="0" shadow={2}>
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
            _text={{ color: colors.white }}
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
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="2px">
              <H2 fontWeight="500">{t("Select Template")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setShowModalTemplate(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg={colors.white} fontSize="14px" width={"100%"}>
          {[
            "Absent Notice",
            "Holiday Announcement",
            "Attendace Report",
            "Timetable Update",
          ].map((value, index) => {
            return (
              <Box p="5" key={index}>
                <Checkbox
                  colorScheme="button"
                  borderColor={colors.primary}
                  borderRadius="0"
                >
                  {value}
                </Checkbox>
              </Box>
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
