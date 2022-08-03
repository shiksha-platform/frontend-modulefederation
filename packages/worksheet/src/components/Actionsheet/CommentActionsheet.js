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
  ScrollView,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
const colors = overrideColorTheme(colorTheme);

export default function Comment({
  setShowModuleComments,
  showModuleComments,
  worksheet,
  comments,
  setCommets,
}) {
  const { t } = useTranslation();
  const [comment, setCommet] = React.useState("");
  const [error, setError] = React.useState();
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  const handleInput = (event) => {
    const value = event.target.value;
    setCommet(value);
    if (!value) {
      setError(t("ENTER_COMMENT"));
    } else {
      setError();
    }
  };
  const handleSubmit = async () => {
    if (comment && comment !== "") {
      let newData = {
        contextId: worksheet?.id,
        context: "Worksheet",
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
      setCommet("");
    } else {
      setError(t("ENTER_COMMENT"));
    }
  };

  return (
    <Actionsheet
      isOpen={showModuleComments}
      onClose={() => setShowModuleComments(false)}
    >
      <Actionsheet.Content alignItems={"left"} bg={colors.worksheetCardBg}>
        <HStack justifyContent={"space-between"}>
          <Stack p={5} pt={1} pb="15px">
            <H2>{t("Comments")}</H2>
          </Stack>
          <IconByName
            name="CloseCircleLineIcon"
            color={colors.worksheetCardIcon}
            onPress={(e) => setShowModuleComments(false)}
          />
        </HStack>
      </Actionsheet.Content>
      <VStack width={"100%"} space="1px" maxH="80%">
        <ScrollView>
          <VStack space="1px">
            {comments.map((item, index) => (
              <Box bg={colors.white} p="5" key={index}>
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
                    <Subtitle color={colors.lightGray2}>
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
