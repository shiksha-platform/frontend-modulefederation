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
import manifest from "../manifest";
import {
  fetchToken,
  eventBus,
  useWindowSize,
  teacherRegistryService,
  BodyMedium,
  Heading,
  Subtitle,
  getUserToken,
} from "@shiksha/common-lib";

const styles = {
  box: {
    background:
      "linear-gradient(135deg, #e2f2fc -10%, #faf6f3 35%, #faf6f3 60%,#faf6f3 70%, #e2f2fc 110%)",
  },
};

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
        manifest.auth_url,
        credentials?.username,
        credentials?.password
      );
      /* const result = {
          data:{
            "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGRC0yV2pkaVJfQjV3OVZVc1Nsdjh6b21vMmN1ejlHalVSd1hUQzBDU3NZIn0.eyJleHAiOjE2NDYxNjUxMzMsImlhdCI6MTY0NjEyOTEzMywianRpIjoiNGExODhkMjQtODMyNS00M2NkLWE1ODgtMzNlZjA4ZTc4NzU2IiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2hpa3NoYS51bml0ZWZyYW1ld29yay5pby9hdXRoL3JlYWxtcy9zdW5iaXJkLXJjIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjViMzRiMGE4LTUyMDktNDFiNi04ZWNhLTMzOWU3YzIwOTkzYSIsInR5cCI6IkJlYXJlciIsImF6cCI6InJlZ2lzdHJ5LWZyb250ZW5kIiwic2Vzc2lvbl9zdGF0ZSI6IjM0ZmE4OTJiLWI4MTMtNDg2Ni1hMmNkLTUzZDBlOTgwNjRlMyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiYXR0ZW5kYW5jZS1tYW5hZ2VtZW50Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLXN1bmJpcmQtcmMiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYXNod2luMkBnbWFpbC5jb20iLCJlbWFpbCI6ImFzaHdpbjJAZ21haWwuY29tIn0.S-YAVlsaiGQ8g8uVVTRdn9gTpA3xL5qh94DSfppuv28qLqCRbw7fmAJtBqK-TGO42vZwZWelOT49LN6znkEncTcvvcMe4iWSm1dU0cOqwn0piQt7lrMQ2RLPYGThPJK98ixHgcieODibWoWLK8tyeb6LJqfyw0gS0UCzxMJQn0R5ABFjRO7tThjBeuNZmP7b03WZIEi7aGQmB3XB9i6Ge9AaQHIUNbz9pCjqdkm0CjNG6qS3pgfX2dKHG1Y2T55ziSHWi5LySFzagAkRvveeh-4tghpxwPHvAXtepGSsOQWkEG8xnZCIyingjOt0snqDt0p1bF4thnTblIaq1LRGaQ"
          }
        }
        */
      if (result?.data) {
        let token = result.data.access_token;
        localStorage.setItem("token", token);

        const resultTeacher = await teacherRegistryService.getOne();
        if (resultTeacher.id) {
          let { id } = resultTeacher;
          localStorage.setItem("id", id);
          const updateTokenTeacher = await teacherRegistryService.update({
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
          try {
            const fcmToken = await getUserToken(swPath);
            await teacherRegistryService.update({ id, fcmToken });
            localStorage.setItem("fcmToken", fcmToken);
          } catch (e) {
            console.log({ e });
          }
          //window.location.reload();

          eventBus.publish("AUTH", {
            eventType: "LOGIN_SUCCESS",
            data: {
              token: token,
            },
          });
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
          color: "white",
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
                        <Subtitle color="coolGray.800">{errors.alert}</Subtitle>
                      </HStack>
                      <IconButton
                        variant="unstyled"
                        icon={<CloseIcon size="3" color="coolGray.600" />}
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
                        color: "error.500",
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
                        color: "error.500",
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
                  _text={{ color: "white" }}
                  onPress={handleLogin}
                >
                  {t("SUBMIT")}
                </Button>
                <BodyMedium color="button.500" textAlign="center">
                  {t("FORGOT_PASSWORD")}
                </BodyMedium>
                <HStack alignItems="center" space="2">
                  <BodyMedium textTransform="inherit">
                    {t("DONT_HAVE_AN_ACCOUNT")}
                  </BodyMedium>
                  <BodyMedium color="button.500">{t("SIGN_UP")}</BodyMedium>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        </Center>
      </Center>
    </Box>
  );
}
