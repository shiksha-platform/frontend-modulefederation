import {
  IconByName,
  commentRegistryService,
  overrideColorTheme,
  BodySmall,
  BodyLarge,
  Subtitle,
  H2,
} from "@shiksha/common-lib";
import colorTheme from "../../colorTheme";
import {
  Actionsheet,
  HStack,
  Stack,
  Avatar,
  Box,
  VStack,
  Input,
  FormControl,
  InputGroup,
  InputRightAddon,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
const colors = overrideColorTheme(colorTheme);

export default function Comment({
  setShowModuleComments,
  showModuleComments,
  item,
  context,
  comments,
  setComments,
  _actionSheetContent,
}) {
  const { t } = useTranslation();
  const [comment, setComment] = React.useState("");
  const [error, setError] = React.useState();

  const handleInput = (event) => {
    const value = event.target.value;
    setComment(value);
    if (!value) {
      setError(t("ENTER_COMMENT"));
    } else {
      setError();
    }
  };
  const handleSubmit = async () => {
    if (comment && comment !== "") {
      let newData = {
        contextId: item?.id,
        context,
        status: "Publish",
        comment,
      };
      const { osid } = await commentRegistryService.create(newData);
      setComments([...comments, { ...newData, id: osid }]);
      setComment("");
    } else {
      setError(t("ENTER_COMMENT"));
    }
  };

  return (
    <Actionsheet
      isOpen={showModuleComments}
      onClose={() => setShowModuleComments(false)}
    >
      <Actionsheet.Content
        alignItems={"left"}
        bg={colors.cardBg}
        {..._actionSheetContent}
      >
        <HStack justifyContent={"space-between"}>
          <Stack p={5} pt={1} pb="15px">
            <H2>{t("COMMENTS")}</H2>
          </Stack>
          <IconByName
            name="CloseCircleLineIcon"
            color={colors.cardIcon}
            onPress={(e) => setShowModuleComments(false)}
          />
        </HStack>
      </Actionsheet.Content>
      <VStack width={"100%"} space="1px">
        {comments.map((item, index) => (
          <Box bg={colors.white} p="5" key={index}>
            <HStack space="2" alignItems="center">
              <Avatar
                size="md"
                bg={colors.success}
                {...(item?.userData?.image &&
                item?.userData?.image !== "" &&
                item?.userData?.image !== "string"
                  ? {
                      source: {
                        uri: item?.userData?.image,
                      },
                    }
                  : {})}
              >
                <H2 color="white">
                  {`${item?.userData?.firstName} ${item?.userData?.lastName}`
                    ?.toUpperCase()
                    .trim()
                    .substr(0, 2)}
                </H2>
              </Avatar>
              <VStack>
                <BodyLarge>
                  {item?.userData?.firstName} {item?.userData?.lastName}
                </BodyLarge>
                <Subtitle color={colors.lightGray2}>
                  {moment(item.createdAt).format("DD MMM YYYY")}
                </Subtitle>
              </VStack>
            </HStack>
            <Subtitle p="5">{item.comment}</Subtitle>
          </Box>
        ))}
        <Box bg={colors.white} p="5">
          <HStack space="2" alignItems="center" w={"100%"}>
            <FormControl isInvalid={error}>
              <InputGroup>
                <Input
                  h="48px"
                  bg={colors.lightGray4}
                  size={"full"}
                  placeholder={t("WRITE_COMMENT")}
                  value={comment}
                  onChange={handleInput}
                />
                <InputRightAddon
                  children={
                    <Box rounded="full" bg={colors.primary}>
                      <IconByName
                        _icon={{ size: "15" }}
                        color={colors.white}
                        name="SendPlane2LineIcon"
                        onPress={handleSubmit}
                      />
                    </Box>
                  }
                />
              </InputGroup>
              {error ? (
                <FormControl.ErrorMessage>
                  <BodySmall color={colors.eventError}>{error}</BodySmall>
                </FormControl.ErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
          </HStack>
        </Box>
      </VStack>
    </Actionsheet>
  );
}
