import React, { useState } from "react";
import {
  HStack,
  Text,
  Button,
  Box,
  FormControl,
  Input,
  VStack,
  Alert,
  IconButton,
  CloseIcon,
} from "native-base";
import { useTranslation } from "react-i18next";
import * as teacherServiceRegistry from "../services/teacherServiceRegistry";
import manifest from '../manifest';
import {Header} from "@shiksha/common-lib";
import {fetchToken} from '@shiksha/common-lib';


export default function Login() {
    const [credentials, setCredentials] = useState();
    const [errors, setErrors] = React.useState({});
    const { t } = useTranslation();
  
    const validate = () => {
      let arr = {};
      if (
        typeof credentials?.username === "undefined" ||
        credentials?.username === ""
      ) {
        arr = { ...arr, username: "Username is required" };
      }
  
      if (
        typeof credentials?.password === "undefined" ||
        credentials?.password === ""
      ) {
        arr = { ...arr, password: "Password is required" };
      }
  
      setErrors(arr);
      if (arr.username || arr.password) {
        return false;
      }
      return true;
    };
  
    const handleLogin = async () => {
      if (validate()) {
        //const result = fetchToken(manifest.auth_url, credentials?.username, credentials?.password);
        const result = {
          data:{
            "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGRC0yV2pkaVJfQjV3OVZVc1Nsdjh6b21vMmN1ejlHalVSd1hUQzBDU3NZIn0.eyJleHAiOjE2NDYwNjY3MzUsImlhdCI6MTY0NjAzMDczNSwianRpIjoiYWE3YmNiOTYtNjIzMC00ZGJiLTllMjEtZjFiODAyOWY0MDZjIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2hpa3NoYS51bml0ZWZyYW1ld29yay5pby9hdXRoL3JlYWxtcy9zdW5iaXJkLXJjIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjViMzRiMGE4LTUyMDktNDFiNi04ZWNhLTMzOWU3YzIwOTkzYSIsInR5cCI6IkJlYXJlciIsImF6cCI6InJlZ2lzdHJ5LWZyb250ZW5kIiwic2Vzc2lvbl9zdGF0ZSI6ImVjODA1NzNmLWMzODItNDIzYy04Zjc3LTIxOGZjMWQxYzBjNSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiYXR0ZW5kYW5jZS1tYW5hZ2VtZW50Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLXN1bmJpcmQtcmMiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYXNod2luMkBnbWFpbC5jb20iLCJlbWFpbCI6ImFzaHdpbjJAZ21haWwuY29tIn0.CcOrjmlon6pAFn8K8js-hJUuMCmTQREQ49d4co0ah1cN0nK49I_i-TUA6KCAJguq36Z2Q7uAmz7CSNaBbhZ30bk3i5fh5eun_x1rYEye0xwt16PVZRHGdjFWilix-i77KVOKOoGFidcW76NmP3u-pruCJ9N-3q6O2zXFmPqlmmKswFARweFwMWl7HzYzUWhGIgYIxw5kH1DMVjxFs534mZ1UAldjV1iCiy8xg6tR6N9drR0h8azv6Cm7uGxxbP-03UkcSVJPbdFr9pNuijfd6CvoanVC1gf097O-jvAglK9jlz2qcwW_xEfE14G0sYQr5etYM4TK1eS9RNuDxp-8yA"
          }
        }
        if (result?.data) {
          let token = result.data.access_token;
          sessionStorage.setItem("token", token);
          const resultTeacher = await teacherServiceRegistry.getOne(
            {},
            { Authorization: "Bearer " + token }
          );
  
          if (resultTeacher) {
            let id = resultTeacher.id.replace("1-", "");
            sessionStorage.setItem("id", id);
            sessionStorage.setItem("fullName", resultTeacher.fullName);
            sessionStorage.setItem("firstName", resultTeacher.firstName);
            sessionStorage.setItem("lastName", resultTeacher.lastName);
            window.location.reload();
          }
        } else {
          sessionStorage.removeItem("token");
          setErrors({ alert: "Please enter valid credentials" });
        }
      }
    };
  
    return (
      <>
        <Header
          title={t("MY_SCHOOL_APP")}
          icon="sign-in-alt"
          heading={t("LOGIN")}
          _box={{ backgroundColor: "lightBlue.100" }}
          _icon={{ color: "black" }}
          _heading={{ color: "black" }}
          _subHeading={{ color: "black" }}
        />
        <Box backgroundColor="gray.100" m={3} p={3}>
          <Text fontSize="lg" color="primary.500" bold={true}>
            {t("LOGIN")}
          </Text>
          <VStack space={2}>
            {"alert" in errors ? (
              <Alert w="100%" status={"error"}>
                <VStack space={2} flexShrink={1} w="100%">
                  <HStack flexShrink={1} space={2} justifyContent="space-between">
                    <HStack space={2} flexShrink={1}>
                      <Alert.Icon mt="1" />
                      <Text fontSize="md" color="coolGray.800">
                        {errors.alert}
                      </Text>
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
            <FormControl isRequired isInvalid={"username" in errors}>
              <FormControl.Label _text={{ bold: true }}>
                {t("USERNAME")}
              </FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder={t("USERNAME")}
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
              <FormControl.Label _text={{ bold: true }}>
                {t("PASSWORD")}
              </FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder={t("PASSWORD")}
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
              backgroundColor="lightBlue.900"
              type="submit"
              p={2}
              onPress={handleLogin}
            >
              {t("SUBMIT")}
            </Button>
          </VStack>
        </Box>
      </>
    );
}