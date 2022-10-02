import React, { useState } from "react";
import {
  HStack,
  Button,
  Box,
  FormControl,
  Input,
  VStack,
  Alert,
  IconButton,
  CloseIcon,
  Center,
} from "native-base";
import { useTranslation } from "react-i18next";
import {
  fetchToken,
  eventBus,
  useWindowSize,
  userRegistryService,
  BodyMedium,
  Heading,
  Subtitle,
  getUserToken,
  overrideColorTheme,
} from "@shiksha/common-lib";

const styles = {
  box: {
    background:
      "linear-gradient(135deg, #e2f2fc -10%, #faf6f3 35%, #faf6f3 60%,#faf6f3 70%, #e2f2fc 110%)",
  },
};

const colors = overrideColorTheme();

export default function Login({ swPath }) {
  const [credentials, setCredentials] = useState();
  const [errors, setErrors] = React.useState({});
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();

  const validate = () => {
    let arr = {};
    if (
      typeof credentials?.username === "undefined" ||
      credentials?.username === ""
    ) {
      arr = { ...arr, username: t("USERNAME_IS_REQUIRED") };
    }

    if (
      typeof credentials?.password === "undefined" ||
      credentials?.password === ""
    ) {
      arr = { ...arr, password: t("PASSWORD_IS_REQUIRED") };
    }

    setErrors(arr);
    if (arr.username || arr.password) {
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validate()) {
      const fcmToken = await getUserToken(swPath);

      const result = await fetchToken(
        process.env.REACT_APP_AUTH_TOKEN_URL,
        credentials?.username,
        credentials?.password
      );
      if (result?.data) {
        let token = result.data.access_token;
        localStorage.setItem("token", token);

        const resultTeacher = await userRegistryService.getOne();
        if (resultTeacher?.id) {
          try {
            let { id } = resultTeacher;
            localStorage.setItem("id", id);
            const updateTokenTeacher = await userRegistryService.update({
              id,
              fcmToken,
            });
            localStorage.setItem(
              "fullName",
              resultTeacher.fullName
                ? resultTeacher.fullName
                : `${resultTeacher.firstName} ${resultTeacher.lastName}`
            );
            localStorage.setItem("firstName", resultTeacher.firstName);
            localStorage.setItem("lastName", resultTeacher.lastName);
            localStorage.setItem("schoolId", resultTeacher.schoolId);
            localStorage.setItem("phoneNumber", resultTeacher.phoneNumber);
          } catch (e) {
            localStorage.removeItem("token");
            console.log({ e });
          }
          try {
            const fcmToken = await getUserToken(swPath);
            let id = localStorage.getItem("id");
            await userRegistryService.update({ id, fcmToken });
            localStorage.setItem("fcmToken", fcmToken);
          } catch (e) {
            localStorage.setItem("fcmToken", "");
            console.log({ e });
          }
          eventBus.publish("AUTH", {
            eventType: "LOGIN_SUCCESS",
            data: {
              token: token,
            },
          });
        } else {
          localStorage.removeItem("token");
          setErrors({ alert: t("PLEASE_ENTER_VALID_CREDENTIALS") });
        }
      } else {
        localStorage.removeItem("token");
        setErrors({ alert: t("PLEASE_ENTER_VALID_CREDENTIALS") });
      }
    }
  };

  return (
    <Box style={styles.box}>
      <Center
        _text={{
          color: colors?.white,
          fontWeight: "bold",
        }}
        height={Height}
      >
        <Center width={width}>
          <VStack space="50px" w="300px">
            <Box>
              <Heading>{t("SIGN_IN")}</Heading>
              <BodyMedium textTransform="inherit">
                {t("WELCOME_BACK")}
              </BodyMedium>
            </Box>
            <VStack space={2}>
              {"alert" in errors ? (
                <Alert w="100%" status={"error"}>
                  <VStack space={2} flexShrink={1} w="100%">
                    <HStack
                      flexShrink={1}
                      space={2}
                      justifyContent="space-between"
                    >
                      <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt="1" />
                        <Subtitle color={colors?.gray}>{errors.alert}</Subtitle>
                      </HStack>
                      <IconButton
                        variant="unstyled"
                        icon={<CloseIcon size="3" color={colors?.gray} />}
                        onPress={(e) => setErrors({})}
                      />
                    </HStack>
                  </VStack>
                </Alert>
              ) : (
                <></>
              )}
              <VStack space="30px">
                <FormControl isRequired isInvalid={"username" in errors}>
                  <FormControl.Label
                    _text={{ fontSize: "14px", fontWeight: "400" }}
                    mb="10px"
                  >
                    {t("USERNAME")}
                  </FormControl.Label>
                  <Input
                    rounded="lg"
                    height="48px"
                    bg="white"
                    variant="unstyled"
                    p={"10px"}
                    placeholder={t("ENTER") + " " + t("USERNAME")}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        username: e.target.value,
                      })
                    }
                  />
                  {"username" in errors ? (
                    <FormControl.ErrorMessage
                      _text={{
                        fontSize: "xs",
                        color: colors?.error,
                        fontWeight: 500,
                      }}
                    >
                      {errors.username}
                    </FormControl.ErrorMessage>
                  ) : (
                    <></>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={"password" in errors}>
                  <FormControl.Label
                    _text={{ fontSize: "14px", fontWeight: "400" }}
                  >
                    {t("PASSWORD")}
                  </FormControl.Label>
                  <Input
                    rounded="lg"
                    height="48px"
                    bg="white"
                    variant="unstyled"
                    p={"10px"}
                    placeholder={t("ENTER") + " " + t("PASSWORD")}
                    type="password"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                  />
                  {"password" in errors ? (
                    <FormControl.ErrorMessage
                      _text={{
                        fontSize: "xs",
                        color: colors?.error,
                        fontWeight: 500,
                      }}
                    >
                      {errors.password}
                    </FormControl.ErrorMessage>
                  ) : (
                    <></>
                  )}
                </FormControl>
                <Button
                  colorScheme="button"
                  p="3"
                  _text={{ color: colors?.white }}
                  onPress={handleLogin}
                >
                  {t("SUBMIT")}
                </Button>
                <BodyMedium color={colors?.primary} textAlign="center">
                  {t("FORGOT_PASSWORD")}
                </BodyMedium>
                <HStack alignItems="center" space="2">
                  <BodyMedium textTransform="inherit">
                    {t("DONT_HAVE_AN_ACCOUNT")}
                  </BodyMedium>
                  <BodyMedium color={colors?.primary}>
                    {t("SIGN_UP")}
                  </BodyMedium>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        </Center>
      </Center>
    </Box>
  );
}
