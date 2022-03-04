import { Layout, Menu } from "@shiksha/common-lib";
import {
    HStack,
    Text,
    VStack,
    Button,
    Stack,
    Box,
    FlatList,
    PresenceTransition,
    Pressable,
    StatusBar,
    Center,
    Progress,
  } from "native-base";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import * as classServiceRegistry from '../../services/classServiceRegistry';
import * as studentServiceRegistry from "../../services/studentServiceRegistry";


export default function ClassDetails() {
    const { t } = useTranslation();
    const [students, setStudents] = useState([]);
    const [classObject, setClassObject] = useState({});
    const { classId } = useParams();
    const fullName = sessionStorage.getItem("fullName");
  
    useEffect(() => {
      let ignore = false;
      const getData = async () => {
        setStudents(
          await studentServiceRegistry.getAll({
            filters: {
              currentClassID: {
                eq: classId,
              },
            },
          })
        );
  
        let classObj = await classServiceRegistry.getOne({ id: classId });
        if (!ignore) setClassObject(classObj);
      };
      getData();
    }, [classId]);

    return (
        <Layout
      imageUrl={window.location.origin + "/class.png"}
      _header={{
        title: t("MY_CLASSES"),
        fullRightComponent: (
          <Box minH={"150px"}>
            <Box
              position={"absolute"}
              style={{ backgroundColor: "rgba(24, 24, 27, 0.4)" }}
              bottom={0}
              p={5}
              width={"100%"}
            >
              <VStack>
                <Text color="gray.100" fontWeight="700" fontSize="md">
                  {classObject.className}
                </Text>

                <Text color="gray.100" fontWeight="700" fontSize="2xl">
                  {t("CLASS_DETAILS")}
                </Text>
              </VStack>
            </Box>
          </Box>
        ),
      }}
      _appBar={{languages:['en']}}
      subHeader={
        <Menu
          routeDynamics={true}
          items={[
            {
              id: classId,
              keyId: 1,
              title: t("TAKE_ATTENDANCE"),
              icon: "CalendarCheckLineIcon",
              route: "/attendance/:id",
              boxMinW: "200px",
            },
          ]}
          type={"veritical"}
        />
      }
      _subHeader={{
        bottom: "15px",
        bg: "classCard.500",
      }}
      _footer={{
        menues: [
            {
              "title": "HOME",
              "icon": "Home4LineIcon",
              "module": "Registry",
              "route": "/",
              "routeparameters": {}
            },
            {
              "title": "CLASSES",
              "icon": "TeamLineIcon",
              "module": "Registry",
              "route": "/classes",
              "routeparameters": {}
            },
            {
              "title": "SCHOOL",
              "icon": "GovernmentLineIcon",
              "module": "Registry",
              "route": "/",
              "routeparameters": {}
            },
            {
              "title": "MATERIALS",
              "icon": "BookOpenLineIcon",
              "module": "Registry",
              "route": "/",
              "routeparameters": {}
            },
            {
              "title": "CAREER",
              "icon": "UserLineIcon",
              "module": "Registry",
              "route": "/",
              "routeparameters": {}
            }
          ]
    }}
   
    >

<div>Class Details here...</div>

    </Layout>
    )
}