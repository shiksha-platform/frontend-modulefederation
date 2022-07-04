import { Collapsible, IconByName, Layout } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack, Stack, Avatar } from "native-base";
import StudentsList from "../components/ExamScores/StudentsList";

export default function QumlTest() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [headerDetails, setHeaderDetails] = useState();

  React.useEffect(() => {
    /*window.addEventListener("message", (event) => {
      console.log('before', event);
      if (event.origin !== "http://139.59.25.99:8090")
        return;
      console.log('after', event);
      }, false);*/
    /*window.addEventListener('message', (val) => {
      console.log('valvalvalval', val);
      if(val){
        navigate('/assessment-result')
      }
    });*/

    return () => {
      window.removeEventListener('message', (val) => {});
    };

  }, []);

  return (
    <Layout
      _header={{
        title:'Test',
      }}
      _appBar={{ languages: ["en"] }}
      subHeader={
        <VStack>
          <Text fontSize={"lg"}>
            {headerDetails && headerDetails.student
              ? headerDetails.student.name
              : "Attempt the questions"}
          </Text>
          {headerDetails &&
          headerDetails.student &&
          headerDetails.student.fathersName && (
            <Text fontSize={"xs"} color={"muted.600"}>
              Mr. {headerDetails.student.fathersName}
            </Text>
          )}
        </VStack>
      }
      _subHeader={{ bg: "attendanceCard.500" }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            module: "Registry",
            route: "/classes",
            routeparameters: {},
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
        ],
      }}
    >
      <iframe
        src="http://139.59.25.99:8090/?questions=do_431353902437642240011003,do_431353902009694617611001,do_431353902575100723211006"
        frameBorder="0" style={{height: 'calc(100vh - 315px)'}} />
    </Layout>
  );
}
