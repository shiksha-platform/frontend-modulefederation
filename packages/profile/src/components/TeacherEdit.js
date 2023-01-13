import React, { useState, useEffect } from "react";
import {
  Button,
  Stack,
  Box,
  FormControl,
  Input,
  useToast,
  HStack,
  VStack,
  Select,
  Pressable,
} from "native-base";
import { useTranslation } from "react-i18next";
import {
  H1,
  userRegistryService,
  Collapsible,
  H2,
  BodyLarge,
  BodyMedium,
  Subtitle,
  H4,
} from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";

// Start editing here, save and see your changes.
export default function TeacherEdit({
  teacherObject,
  setTeacherObject,
  onlyParameterProp,
  moreParameterProp,
  isEditable,
  header,
  nestedHeader,
  nestedCollapse,
  seeMore,
  seeMoreBelowSection,
  fieldMapper,
  workData,
}) {
  const { t } = useTranslation();
  const [updatedObject, setUpdatedObject] = useState({});
  const [editState, setEditState] = useState(false);
  const [editChangeState, setEditChangeState] = useState(false);
  const [errors, setErrors] = React.useState({});
  const toast = useToast();
  const navigate = useNavigate();
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
    employeeCode: {
      placeholder: t("EMPLOYEE_CODE"),
    },
    joiningDate: { placeholder: t("DATE_OF_JOINING") },
    birthDate: { placeholder: t("DATE_OF_BIRTH") },
    firstName: { placeholder: t("FIRST_NAME"), required: true },
    lastName: { placeholder: t("LAST_NAME") },
    fathersName: { placeholder: t("FATHERS_NAME") },
    phoneNumber: { placeholder: t("PHONE_NUMBER"), required: true },
    email: { placeholder: t("EMAIL"), type: "email", required: true },
    gender: {
      placeholder: t("GENDER"),
      type: "select",
      data: ["Male", "Female"],
    },
  };
  const formInputs = onlyParameter.map((e) => {
    const change = fieldMapper[e];
    return {
      ...parameter[e],
      name: e,
      placeholder: parameter[e]?.placeholder ? parameter[e].placeholder : e,
      isRequired: parameter[e]?.required ? parameter[e].required : false,
      type: parameter[e]?.type ? parameter[e].type : "text",
      value: updatedObject[change] ? updatedObject[change] : "",
      onChange: (item) => {
        setEditChangeState(true);
        if (e === "firstName") {
          setUpdatedObject({
            ...updatedObject,
            [e]: item.target.value,
            fullName: item.target.value + " " + updatedObject.lastName,
          });
        } else if (e === "lastName") {
          setUpdatedObject({
            ...updatedObject,
            [e]: item.target.value,
            fullName: updatedObject.firstName + " " + item.target.value,
          });
        } else if (parameter[e]?.type === "select") {
          setUpdatedObject({ ...updatedObject, [e]: item });
        } else {
          setUpdatedObject({ ...updatedObject, [e]: item.target.value });
        }
      },
    };
  });

  const validate = () => {
    let arr = {};
    if (
      (onlyParameter.includes("phoneNumber") && !updatedObject?.phoneNumber) ||
      (updatedObject?.phoneNumber === "" && onlyParameter.length === 0)
    ) {
      arr = { ...arr, phoneNumber: "Phone Number is invalid" };
    }

    if (
      (onlyParameter.includes("email") && !updatedObject?.email) ||
      (updatedObject?.email === "" && onlyParameter.length === 0)
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
        result = await userRegistryService.update(updatedObject, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          onlyParameter: [...onlyParameter, "fullName"],
        });
        if (result.data) {
          setTeacherObject(updatedObject);
          toast.show({
            render: () => {
              return (
                <Box
                  bg={"profile.activeClass"}
                  px="3"
                  py="2"
                  rounded="sm"
                  mb={5}
                >
                  <H1 color={"profile.lightGray3"}>
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
        setUpdatedObject(teacherObject);
      }
    };
    getData();
  }, [teacherObject]);

  return (
    <Section
      //_box={{ bg: "transparent" }}
      title={header ? header : t("DETAILS")}
      nestedTitle={nestedHeader}
      formInputs={formInputs}
      editState={editState}
      nestedDropdown={nestedCollapse}
      seeMore={seeMore}
      onlyParameter={onlyParameter}
      moreParameterProp={moreParameterProp}
      seeMoreBelowSection={seeMoreBelowSection}
      teacherObject={teacherObject}
      updatedObject={updatedObject}
      fieldMapper={fieldMapper}
      workData={workData}
      button={
        isEditable !== false ? (
          editState ? (
            <Button
              colorScheme="button"
              _text={{ fontWeight: "400", color: "profile.white" }}
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
      <VStack space={1}>
        {formInputs.map((item, index) => {
          return (
            <Box
              pt="4"
              pb="4"
              borderBottomWidth={formInputs.length - 1 !== index ? "1" : "0"}
              borderColor={"profile.lightGray5"}
              key={index}
            >
              {editState ? (
                <FormControl isInvalid={item.name in errors}>
                  <FormControl.Label>
                    <BodyLarge
                      color={"profile.unmarked"}
                      textTransform={"uppercase"}
                    >
                      {item.placeholder}
                    </BodyLarge>
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
                        color: "profile.error",
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
                  <BodyLarge color={"profile.unmarked"} alignItems={"center"}>
                    {t(item.placeholder)}
                  </BodyLarge>
                  {item.value ? (
                    <BodyMedium
                      textTransform="inherit"
                      color={"profile.bodyText"}
                    >
                      {item.value}
                    </BodyMedium>
                  ) : (
                    <BodyMedium italic>{t("NOT_ENTERED")}</BodyMedium>
                  )}
                </>
              )}
            </Box>
          );
        })}
        {seeMore && (
          <Box alignItems="center" p="3">
            <Pressable
              alignItems="center"
              onPress={(e) =>
                navigate(`/profile/seemore`, {
                  state: {
                    ...teacherObject,
                    updatedObject,
                    header: header,
                    objectProp: [
                      ...onlyParameter,
                      ...(moreParameterProp ? moreParameterProp : []),
                    ],
                    nestedCollapse: nestedCollapse === true ? true : false,
                    nestedHeader: nestedHeader?.length > 0 ? nestedHeader : [],
                    fieldMapper: fieldMapper,
                  },
                })
              }
            >
              <Subtitle color={"profile.primary"}>{t("SEE_MORE")}</Subtitle>
            </Pressable>
          </Box>
        )}
      </VStack>
    </Section>
  );
}

export const Section = ({
  title,
  nestedTitle,
  nestedDropdown,
  button,
  children,
  _box,
  seeMore,
  seeMoreBelowSection,
  teacherObject,
  updatedObject,
  onlyParameter,
  moreParameterProp,
  formInputs,
  editState,
  fieldMapper,
  workData,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Collapsible
      _header={{ height: "60px" }}
      header={
        <H2 color={"profile.bodyText"} pl={5}>
          {title}
        </H2>
      }
    >
      {nestedDropdown && nestedTitle.length > 0 ? (
        workData.map((singleItem, indexx) => {
          return (
            <Stack space={1} bg={"profile.white"} pt={4} pl={"0"} {..._box}>
              <Collapsible
                key={indexx}
                _header={{
                  height: "40px",
                  borderBottomWidth: "1",
                  borderColor: "profile.lightGray5",
                }}
                header={
                  <H4 color={"profile.bodyText"} pl={1}>
                    {nestedTitle[indexx]}
                  </H4>
                }
              >
                <HStack alignItems={"center"} justifyContent={"space-between"}>
                  {button}
                </HStack>
                <Stack pl={1}>
                  <VStack space={1}>
                    {formInputs.map((item, index) => {
                      const name = item.placeholder;
                      const val = fieldMapper[name];
                      item.value = singleItem[val];
                      return (
                        <Box
                          pt="4"
                          pb="4"
                          borderBottomWidth={
                            formInputs.length - 1 !== index ? "1" : "0"
                          }
                          borderColor={"profile.lightGray5"}
                          key={index}
                        >
                          {editState ? (
                            <FormControl isInvalid={item.name in errors}>
                              <FormControl.Label>
                                <BodyLarge
                                  color={"profile.unmarked"}
                                  textTransform={"uppercase"}
                                >
                                  {item.placeholder}
                                </BodyLarge>
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
                                      <Select.Item
                                        key={index}
                                        label={e}
                                        value={e}
                                      />
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
                                    color: "profile.error",
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
                              <BodyLarge
                                color={"profile.unmarked"}
                                alignItems={"center"}
                              >
                                {t(item.placeholder)}
                              </BodyLarge>
                              {item.value ? (
                                <BodyMedium
                                  textTransform="inherit"
                                  color={"profile.bodyText"}
                                >
                                  {item.value}
                                </BodyMedium>
                              ) : (
                                <BodyMedium italic>
                                  {t("NOT_ENTERED")}
                                </BodyMedium>
                              )}
                            </>
                          )}
                        </Box>
                      );
                    })}
                    {seeMore && (
                      <Box alignItems="center" p="3">
                        <Pressable
                          alignItems="center"
                          onPress={(e) =>
                            navigate(`/profile/seemore`, {
                              state: {
                                ...teacherObject,
                                updatedObject,
                                header: header,
                                objectProp: [
                                  ...onlyParameter,
                                  ...(moreParameterProp
                                    ? moreParameterProp
                                    : []),
                                ],
                                nestedCollapse:
                                  nestedCollapse === true ? true : false,
                                nestedHeader:
                                  nestedHeader?.length > 0 ? nestedHeader : [],
                              },
                            })
                          }
                        >
                          <Subtitle color={"profile.primary"}>
                            {t("SEE_MORE")}
                          </Subtitle>
                        </Pressable>
                      </Box>
                    )}
                  </VStack>
                </Stack>
              </Collapsible>
            </Stack>
          );
        })
      ) : (
        <Box bg={"profile.white"} p="5" {..._box}>
          <HStack alignItems={"center"} justifyContent={"space-between"}>
            {button}
          </HStack>
          {children}
        </Box>
      )}
      {seeMoreBelowSection && (
        <Box alignItems="center" p="3">
          <Pressable
            alignItems="center"
            onPress={(e) =>
              navigate(`/profile/seemore`, {
                state: {
                  ...teacherObject,
                  updatedObject,
                  header: title,
                  objectProp: [
                    ...onlyParameter,
                    ...(moreParameterProp ? moreParameterProp : []),
                  ],
                  nestedCollapse: nestedDropdown === true ? true : false,
                  nestedHeader: nestedTitle?.length > 0 ? nestedTitle : [],
                },
              })
            }
          >
            <Subtitle color={"profile.primary"}>{t("SEE_MORE")}</Subtitle>
          </Pressable>
        </Box>
      )}
    </Collapsible>
  );
};
