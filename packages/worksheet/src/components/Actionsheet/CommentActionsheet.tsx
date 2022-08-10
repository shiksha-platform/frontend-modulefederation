// Lib
import React from "react";
import {
  IconByName,
  commentRegistryService,
  overrideColorTheme,
  BodySmall,
  BodyLarge,
  Subtitle,
  H2,
} from "@shiksha/common-lib";
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
import { useTranslation } from "react-i18next";
import moment from "moment";

// Utils
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function Comment({
  setShowModuleComments,
  showModuleComments,
  worksheet,
  comments,
  setComments,
}) {
  const { t } = useTranslation();
  const [comment, setComment] = React.useState("");
  const [error, setError] = React.useState(null);
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  const handleInput = (event) => {
    const value = event.target.value;
    setComment(value);
    if (!value) {
      setError(t("ENTER_COMMENT"));
    } else {
      setError(null);
    }
  };
  const handleSubmit = async () => {
    if (comment && comment !== "") {
      let newData = {
        contextId: worksheet?.id,
        context: "Worksheet",
        userId: localStorage.getItem("id"),
        status: "Publish",
        comment,
      };
      const { osid } = await commentRegistryService.create(newData);
      setComments([
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

  return (
    <Actionsheet
      isOpen={showModuleComments}
      onClose={() => setShowModuleComments(false)}
    >
      <Actionsheet.Content alignItems={"left"} bg={"worksheet.cardBg"}>
        <HStack justifyContent={"space-between"}>
          <Stack p={5} pt={1} pb="15px">
            <H2>{t("Comments")}</H2>
          </Stack>
          <IconByName
            _icon={{}}
            name="CloseCircleLineIcon"
            color={"worksheet.primaryDark"}
            onPress={(e) => setShowModuleComments(false)}
          />
        </HStack>
      </Actionsheet.Content>
      <VStack width={"100%"} space="1px" maxH="80%">
        <ScrollView>
          <VStack space="1px">
            {comments.map((item, index) => (
              <Box bg={"worksheet.white"} p="5" key={index}>
                <HStack space="2" alignItems="center">
                  <Avatar
                    size="35px"
                    bg="amber.500"
                    source={{
                      uri: item?.userData?.image,
                    }}
                  >
                    {`${item?.userData?.firstName} ${item?.userData?.lastName}`
                      .toUpperCase()
                      .substr(0, 2)}
                  </Avatar>
                  <VStack>
                    {console.log(item?.userData)}
                    <BodyLarge>{`${item?.userData?.firstName} ${item?.userData?.lastName}`}</BodyLarge>
                    <Subtitle color={"worksheet.lightGray2"}>
                      {moment(item?.createdAt).format("DD MMMM, hh:mma")}
                    </Subtitle>
                  </VStack>
                </HStack>
                <Subtitle pt="10px" px="5">
                  {item.comment}
                </Subtitle>
              </Box>
            ))}
          </VStack>
        </ScrollView>
        <Box bg={"worksheet.white"} p="5">
          <HStack space="2" alignItems="center" w={"100%"}>
            <FormControl isInvalid={error}>
              <InputGroup>
                <Input
                  h="48px"
                  bg={"worksheet.lightGray4"}
                  size={"full"}
                  placeholder={t("WRITE_COMMENT")}
                  value={comment}
                  onChange={handleInput}
                />
                <InputRightAddon
                  children={
                    <Box rounded="full" bg={"worksheet.primary"}>
                      <IconByName
                        _icon={{ size: "15" }}
                        color={"worksheet.white"}
                        name="SendPlane2LineIcon"
                        onPress={handleSubmit}
                      />
                    </Box>
                  }
                />
              </InputGroup>
              {error ? (
                <FormControl.ErrorMessage>
                  <BodySmall color={"worksheet.eventError"}>{error}</BodySmall>
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
