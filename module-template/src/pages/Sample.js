import { Layout } from "@shiksha/common-lib";
import { Link } from "react-router-dom";
import { Box, HStack, Text, VStack } from "native-base";

export default function Sample() {
  return (
    <Layout
      _header={{
        title: "Sample Module",
        isEnableSearchBtn: true,
        subHeading: "Sub Heading of Sub Module",
        iconComponent: (
          <Link
            to="/"
            style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
          >
            <Box
              rounded="full"
              borderColor="button.500"
              borderWidth="1"
              _text={{ color: "button.500" }}
              px={6}
              py={2}
            >
              Button
            </Box>
          </Link>
        ),
      }}
      subHeader={
        <Link
          to="/"
          style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
        >
          <HStack space="4" justifyContent="space-between">
            <VStack>
              <Text fontSize={"lg"}>Sample Module</Text>
            </VStack>
          </HStack>
        </Link>
      }
      _subHeader={{ bg: "rgb(248, 117, 88)" }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            route: "/",
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            route: "/classes",
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            route: "/",
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            route: "/",
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            route: "/",
          },
        ],
      }}
    >
      <h1>Sample Module</h1>
    </Layout>
  );
}
