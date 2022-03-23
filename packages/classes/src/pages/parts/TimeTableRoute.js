import React, { useEffect, useState } from "react";
import { HStack, Text, VStack, Button, Stack, Box } from "native-base";
import Menu from "../../components/Menu";
import * as classServiceRegistry from "../../services/classServiceRegistry";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";

// Start editing here, save and see your changes.
const  TimeTableRoute = () => {
  const [classes, setClasses] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setClasses(await classServiceRegistry.getAll());
  };

  return (
    <>
      <Header
        icon="Group"
        heading="The page shows"
        subHeading="the classes you take"
      />
      <Box backgroundColor="gray.100" p={3}>
        <Text color="primary.500" bold={true}>
          {t("TODAY'S CLASSES")}
        </Text>
        <Stack>
          <VStack>
            <Text>
              10:30-11:20 Maths, VI A <Text bold>NOW</Text>
            </Text>
            <Text>
              1:30-2:40 Substitution, V B <Text bold>NEW</Text>
            </Text>
            <HStack space={2} justifyContent={"right"}>
              <Button
                variant="outline"
                colorScheme="default"
                background={"#fff"}
                size="container"
                px={1}
              >
                {t("My Classes")}
              </Button>
            </HStack>
          </VStack>
        </Stack>
      </Box>
      <Menu items={classes} routeDynamics="true" />
      <Box>
        <HStack space={2} justifyContent={"right"}>
          <Button
            variant="outline"
            colorScheme="default"
            background={"#fff"}
            size="container"
            px={1}
            m="3"
          >
            {t("Show subject wise")}
          </Button>
        </HStack>
      </Box>
    </>
  );
}

export default TimeTableRoute