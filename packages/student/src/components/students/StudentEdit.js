import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  Stack,
  Box,
  FormControl,
  Input,
  useToast,
  HStack,
  VStack,
} from "native-base";
import * as studentServiceRegistry from "../../services/studentServiceRegistry";
import { useTranslation } from "react-i18next";
import { IconByName } from "@shiksha/common-lib";

// Start editing here, save and see your changes.
export default function StudentEdit({
  studentObject,
  setStudentObject,
  onlyParameterProp,
}) {
  const { t } = useTranslation('student');
  const [editState, setEditState] = useState(false);
  const [editChangeState, setEditChangeState] = useState(false);
  const [errors, setErrors] = React.useState({});
  const toast = useToast();
  const onlyParameter =
    onlyParameterProp?.length > "0"
      ? onlyParameterProp
      : [
          "firstName",
          "lastName",
          "address",
          "fathersName",
          "phoneNumber",
          "email",
          "gender",
        ];
  const parameter = {
    firstName: { placeholder: t("FIRST_NAME"), required: true },
    lastName: { placeholder: t("LAST_NAME") },
    address: { placeholder: t("ADDRESS") },
    fathersName: { placeholder: t("FATHERS_NAME") },
    phoneNumber: { placeholder: t("PHONE_NUMBER") },
    email: { placeholder: t("EMAIL"), type: "email" },
    gender: { placeholder: t("GENDER") },
  };
  const formInputs = onlyParameter.map((e) => {
    return {
      name: e,
      placeholder: parameter[e]?.placeholder ? parameter[e].placeholder : e,
      isRequired: parameter[e]?.required ? parameter[e].required : false,
      type: parameter[e]?.type ? parameter[e].type : "text",
      value: studentObject[e] ? studentObject[e] : "",
      onChange: (item) => {
        setEditChangeState(true);
        if (e === "firstName") {
          setStudentObject({
            ...studentObject,
            [e]: item.target.value,
            fullName: item.target.value + " " + studentObject.lastName,
          });
        } else if (e === "lastName") {
          setStudentObject({
            ...studentObject,
            [e]: item.target.value,
            fullName: studentObject.firstName + " " + item.target.value,
          });
        } else {
          setStudentObject({ ...studentObject, [e]: item.target.value });
        }
      },
    };
  });

  const validate = () => {
    let arr = {};
    if (
      (onlyParameter.includes("phoneNumber") && !studentObject?.phoneNumber) ||
      studentObject?.phoneNumber === ""
    ) {
      arr = { ...arr, phoneNumber: "Phone Number is invalid" };
    }

    if (
      (onlyParameter.includes("email") && !studentObject?.email) ||
      studentObject?.email === ""
    ) {
      arr = { ...arr, email: "email is invalid" };
    }

    setErrors(arr);
    if (arr.phoneNumber || arr.email) {
      return false;
    }
    return true;
  };

  const handalSubmit = async (e) => {
    if (validate()) {
      if (editChangeState) {
        let result = await studentServiceRegistry.update(studentObject, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          onlyParameter: [...onlyParameter, "fullName"],
        });
        if (result.data) {
          toast.show({
            render: () => {
              return (
                <Box bg="emerald.500" px="3" py="2" rounded="sm" mb={5}>
                  <Text fontSize={"lg"} color="coolGray.100">
                    {result.data?.params?.status
                      ? result.data?.params?.status
                      : "successful"}
                  </Text>
                </Box>
              );
            },
            placement: "top",
          });
          setEditState(false);
        }
      } else {
        setEditState(false);
      }
      setEditChangeState(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <Section
      title={t("DETAILS")}
      button={
        editState ? (
          <Button
            colorScheme="button"
            _text={{ fontWeight: "400", color: "white" }}
            py={1}
            px={2}
            onPress={handalSubmit}
          >
            {t("SAVE")}
          </Button>
        ) : (
          <Button
            variant="ghost"
            colorScheme="button"
            endIcon={<IconByName name={"PencilLineIcon"} isDisabled />}
            _text={{ fontWeight: "400" }}
            py={1}
            px={2}
            onPress={(e) => setEditState(true)}
          >
            {t("EDIT")}
          </Button>
        )
      }
    >
      <VStack>
        {formInputs.map((item, index) => {
          return (
            <Stack
              p="5"
              borderBottomWidth={formInputs.length - 1 !== index ? "1" : "0"}
              borderColor={"coolGray.200"}
              key={index}
            >
              {editState ? (
                <FormControl isInvalid={item.name in errors}>
                  <FormControl.Label>
                    <Text
                      fontSize={"14px"}
                      fontWeight="500"
                      color={"coolGray.400"}
                    >
                      {item.placeholder}
                    </Text>
                  </FormControl.Label>
                  <Input
                    variant="filled"
                    p={2}
                    {...item}
                    key={index + item.name}
                  />
                  {item.name in errors ? (
                    <FormControl.ErrorMessage
                      _text={{
                        fontSize: "xs",
                        color: "error.500",
                        fontWeight: 500,
                      }}
                    >
                      {errors[item.name]}
                    </FormControl.ErrorMessage>
                  ) : (
                    <></>
                  )}
                </FormControl>
              ) : (
                <>
                  <Text
                    fontSize={"14px"}
                    fontWeight="500"
                    color={"coolGray.400"}
                    pb={2}
                  >
                    {item.placeholder}
                  </Text>
                  {item.value ? (
                    <Text p={2} textTransform="inherit">
                      {item.value}
                    </Text>
                  ) : (
                    <Text italic p={2}>
                      {t("NOT_ENTERED")}
                    </Text>
                  )}
                </>
              )}
            </Stack>
          );
        })}
      </VStack>
    </Section>
  );
}

const Section = ({ title, button, children, _box }) => (
  <Box bg={"white"} p="5" {..._box}>
    <HStack alignItems={"center"} justifyContent={"space-between"}>
      <Text fontSize="16px" fontWeight="500">
        {title}
      </Text>
      {button}
    </HStack>
    {children}
  </Box>
);
