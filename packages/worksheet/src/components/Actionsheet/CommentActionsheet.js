import { IconByName, commentRegistryService } from "@shiksha/common-lib";
import {
  Actionsheet,
  HStack,
  Stack,
  Text,
  Avatar,
  Box,
  VStack,
  Input,
  FormControl,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";

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

  const handleInput = (event) => {
    const value = event.target.value;
    setCommet(value);
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
      setCommets([...comments, { ...newData, id: osid }]);
      setCommet("");
    } else {
      setError("Enter comment");
    }
  };

  return (
    <Actionsheet
      isOpen={showModuleComments}
      onClose={() => setShowModuleComments(false)}
    >
      <Actionsheet.Content alignItems={"left"} bg="worksheetCard.500">
        <HStack justifyContent={"space-between"}>
          <Stack p={5} pt={1} pb="20px">
            <Text fontSize="16px" fontWeight={"600"}>
              {t("Comments")}
            </Text>
          </Stack>
          <IconByName
            name="CloseCircleLineIcon"
            color="worksheetCard.900"
            onPress={(e) => setShowModuleComments(false)}
          />
        </HStack>
      </Actionsheet.Content>
      <VStack width={"100%"} space="1px">
        {comments.map((item, index) => (
          <Box bg="white" p="5" key={index}>
            <HStack space="2" alignItems="center">
              <Avatar
                size="md"
                bg="green.500"
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              >
                AJ
              </Avatar>
              <VStack>
                <Text fontSize="14px" fontWeight={"500"}>
                  {t("Mrs. Jina Jain")}
                </Text>
                <Text fontSize="12px" fontWeight={"500"} color="gray.400">
                  {t("12 January, 4:00PM")}
                </Text>
              </VStack>
            </HStack>
            <Text p="5" fontSize="12px" fontWeight={"500"}>
              {item.comment}
            </Text>
          </Box>
        ))}
        <Box bg="white" p="5">
          <HStack space="2" alignItems="center" w={"100%"}>
            <FormControl isInvalid={error}>
              <Input
                bg={"coolGray.100"}
                size={"full"}
                placeholder="Write a comment..."
                value={comment}
                onChange={handleInput}
              />
              {error ? (
                <FormControl.ErrorMessage
                  _text={{
                    fontSize: "xs",
                    color: "#D91414",
                    fontWeight: 500,
                  }}
                >
                  {error}
                </FormControl.ErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
            <Box rounded="full" bg="button.500" p="1">
              <IconByName
                size="sm"
                color="white"
                name="SendPlane2LineIcon"
                onPress={handleSubmit}
              />
            </Box>
          </HStack>
        </Box>
      </VStack>
    </Actionsheet>
  );
}
