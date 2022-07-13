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
  Select,
} from "native-base";
import { useTranslation } from "react-i18next";
import {
  H1,
  H3,
  teacherRegistryService,
  overrideColorTheme,
} from "@shiksha/common-lib";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

// Start editing here, save and see your changes.
export default function TeacherEdit({
  teacherObject,
  setTeacherObject,
  onlyParameterProp,
  isEditable,
  header,
}) {
  const { t } = useTranslation("student");
  const [object, setObject] = useState({});
  const [editState, setEditState] = useState(false);
  const [editChangeState, setEditChangeState] = useState(false);
  const [errors, setErrors] = React.useState({});
  const toast = useToast();
  const onlyParameter =
    onlyParameterProp?.length > "0"
      ? onlyParameterProp
      : [
          "address",
          "firstName",
          "lastName",
          "fathersName",
          "phoneNumber",
          "email",
          "gender",
        ];
  const parameter = {
    employeeCode: { placeholder: t("EMPLOYEE_CODE") },
    joiningDate: { placeholder: t("DATE_FO_JOINING") },
    birthDate: { placeholder: t("DATE_OF_BIRTH") },
    firstName: { placeholder: t("FIRST_NAME"), required: true },
    lastName: { placeholder: t("LAST_NAME") },
    fathersName: { placeholder: t("FATHERS_NAME") },
    phoneNumber: { placeholder: t("PHONE_NUMBER") },
    email: { placeholder: t("EMAIL"), type: "email" },
    gender: {
      placeholder: t("GENDER"),
      type: "select",
      data: ["Male", "Female"],
    },
  };
  const formInputs = onlyParameter.map((e) => {
    return {
      ...parameter[e],
      name: e,
      placeholder: parameter[e]?.placeholder ? parameter[e].placeholder : e,
      isRequired: parameter[e]?.required ? parameter[e].required : false,
      type: parameter[e]?.type ? parameter[e].type : "text",
      value: object?.[e] ? object[e] : "",
      onChange: (item) => {
        setEditChangeState(true);
        if (e === "firstName") {
          setObject({
            ...object,
            [e]: item.target.value,
            fullName: item.target.value + " " + object.lastName,
          });
        } else if (e === "lastName") {
          setObject({
            ...object,
            [e]: item.target.value,
            fullName: object.firstName + " " + item.target.value,
          });
        } else if (parameter[e]?.type === "select") {
          setObject({ ...object, [e]: item });
        } else {
          setObject({ ...object, [e]: item.target.value });
        }
      },
    };
  });

  const validate = () => {
    let arr = {};
    if (
      (onlyParameter.includes("phoneNumber") && !object?.phoneNumber) ||
      (object?.phoneNumber === "" && onlyParameter.length === 0)
    ) {
      arr = { ...arr, phoneNumber: "Phone Number is invalid" };
    }

    if (
      (onlyParameter.includes("email") && !object?.email) ||
      (object?.email === "" && onlyParameter.length === 0)
    ) {
      arr = { ...arr, email: "email is invalid" };
    }

    setErrors(arr);

    if (arr.phoneNumber || arr.email) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    if (validate()) {
      if (editChangeState && setTeacherObject) {
        let result = {};
        result = await teacherRegistryService.update(object, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          onlyParameter: [...onlyParameter, "fullName"],
        });
        if (result.data) {
          setTeacherObject(object);
          toast.show({
            render: () => {
              return (
                <Box
                  bg={colors.studentHeadingBg}
                  px="3"
                  py="2"
                  rounded="sm"
                  mb={5}
                >
                  <H1 color={colors.coolGray}>
                    {result.data?.params?.status
                      ? result.data?.params?.status
                      : "successful"}
                  </H1>
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

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      if (!ignore) {
        setObject(teacherObject);
      }
    };
    getData();
  }, [teacherObject]);

  return (
    <Section
      title={header ? header : t("DETAILS")}
      button={
        isEditable !== false ? (
          editState ? (
            <Button
              colorScheme="button"
              _text={{ fontWeight: "400", color: "white" }}
              py={1}
              px={2}
              onPress={handleSubmit}
            >
              {t("SAVE")}
            </Button>
          ) : (
            <Button
              variant="ghost"
              colorScheme="button"
              _text={{
                fontWeight: "600",
                fontSize: "14px",
                textTransform: "capitalzise",
              }}
              py={1}
              px={2}
              onPress={(e) => setEditState(true)}
            >
              {t("EDIT")}
            </Button>
          )
        ) : (
          <React.Fragment />
        )
      }
    >
      <VStack>
        {formInputs.map((item, index) => {
          return (
            <Stack
              p="4"
              borderBottomWidth={formInputs.length - 1 !== index ? "1" : "0"}
              borderColor={colors.coolGraylight}
              key={index}
            >
              {editState ? (
                <FormControl isInvalid={item.name in errors}>
                  <FormControl.Label>
                    <H3 color={colors.labelColor} textTransform={"uppercase"}>
                      {item.placeholder}
                    </H3>
                  </FormControl.Label>
                  {item.type === "select" ? (
                    <Select
                      accessibilityLabel={item.placeholder}
                      placeholder={item.placeholder}
                      key={index + item.name}
                      selectedValue={item?.value}
                      onValueChange={item.onChange}
                    >
                      {item?.data &&
                        item?.data.map((e, index) => (
                          <Select.Item key={index} label={e} value={e} />
                        ))}
                    </Select>
                  ) : (
                    <Input
                      variant="filled"
                      p={2}
                      {...item}
                      key={index + item.name}
                    />
                  )}
                  {item.name in errors ? (
                    <FormControl.ErrorMessage
                      _text={{
                        fontSize: "xs",
                        color: colors.error,
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
                  <H3
                    fontWeight="500"
                    color={colors.labelColor}
                    textTransform={"uppercase"}
                    pb="2"
                  >
                    {item.placeholder}
                  </H3>
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
  <Box bg={colors.white} p="5" {..._box}>
    <HStack alignItems={"center"} justifyContent={"space-between"}>
      <H3>{title}</H3>
      {button}
    </HStack>
    {children}
  </Box>
);
