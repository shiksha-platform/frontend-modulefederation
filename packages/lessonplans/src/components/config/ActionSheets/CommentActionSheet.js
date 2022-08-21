import {
  IconByName,
  commentRegistryService,
  overrideColorTheme,
  BodySmall,
  BodyLarge,
  Subtitle,
  H2,
  userRegistryService,
} from "@shiksha/common-lib";
import colorTheme from "colorTheme";
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
  ScrollView,
} from "native-base";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
const colors = overrideColorTheme(colorTheme);

export default function CommentActionSheet({
  setShowModuleComments,
  showModuleComments,
  lessonPlan,
  comments,
  setCommets,
}) {
  const { t } = useTranslation();
  const [comment, setComment] = React.useState("");
  const [error, setError] = React.useState();
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

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
        contextId: lessonPlan?.id,
        context: "Lessonplan",
        status: "Publish",
        comment,
      };
      const { osid } = await commentRegistryService.create(newData);
      setCommets([
        ...comments,
        {
          ...newData,
          id: osid,
          userData: { firstName, lastName, createdAt: moment() },
        },
      ]);
      setComment("");
    } else {
      setError(t("ENTER_COMMENT"));
    }
  };
  console.log(comments);

  return (
    <Actionsheet
      isOpen={showModuleComments}
      onClose={() => setShowModuleComments(false)}
    >
      <Actionsheet.Content alignItems={"left"} bg="worksheetCard.500">
        <HStack justifyContent={"space-between"}>
          <Stack p={5} pt={1} pb="20px">
            <H2>{t("Comments")}</H2>
          </Stack>
          <IconByName
            name="CloseCircleLineIcon"
            color="worksheetCard.900"
            onPress={(e) => setShowModuleComments(false)}
          />
        </HStack>
      </Actionsheet.Content>
      <VStack width={"100%"} space="1px" maxH="80%">
        <ScrollView>
          <VStack space="1px">
            {comments?.map((item, index) => (
              <Box bg="white" p="5" key={index}>
                <HStack space="2" alignItems="center">
                  <Avatar
                    size="md"
                    bg="blue.500"
                    source={{
                      uri: item?.userData?.image,
                    }}
                  >
                    {`${item?.userData?.firstName} ${item?.userData?.lastName}`
                      .toUpperCase()
                      .substring(0, 2)}
                  </Avatar>
                  <VStack>
                    <BodyLarge>
                      {item.userId === localStorage.getItem("id")
                        ? t("You")
                        : `${item?.userData?.firstName} ${item?.userData?.lastName}`}
                    </BodyLarge>
                    <Subtitle color="gray.400">
                      {moment(item?.createdAt).format("DD MMMM, hh:mma")}
                    </Subtitle>
                  </VStack>
                </HStack>
                <Subtitle p="5">{item.comment}</Subtitle>
              </Box>
            ))}
          </VStack>
        </ScrollView>
        <Box bg="white" p="5">
          <HStack space="2" alignItems="center" w={"100%"}>
            <FormControl isInvalid={error}>
              <InputGroup>
                <Input
                  h="48px"
                  bg={"coolGray.100"}
                  size={"full"}
                  placeholder={t("WRITE_COMMENT")}
                  value={comment}
                  onChange={handleInput}
                />
                <InputRightAddon
                  children={
                    <Box rounded="full" bg="button.500">
                      <IconByName
                        _icon={{ size: "15" }}
                        color="white"
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
