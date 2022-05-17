import React, { useEffect, useState } from "react";
import { capture, Layout, Menu } from "@shiksha/common-lib";
import { Stack } from "native-base";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import * as classServiceRegistry from "../../services/classServiceRegistry";
import * as studentServiceRegistry from "../../services/studentServiceRegistry";
import manifest from "../../manifest.json";
import ClassStudentsPanel from "./Molecules/ClassStudentsPanel";
import ClassSubjectsPanel from "./Molecules/ClassSubjectsPanel";
import ClassAttendanceCard from "./Molecules/ClassAttendanceCard";
import ClassDetailsPanel from "./Molecules/ClassDetailsPanel";
import { _header } from "./assets";

const ClassDetails = ({ footerLinks }) => {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [classObject, setClassObject] = useState({});
  const { classId } = useParams();

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      setStudents(await studentServiceRegistry.getAll({ classId }));

      let classObj = await classServiceRegistry.getOne({ id: classId });
      if (!ignore) setClassObject(classObj);
    };
    getData();
  }, [classId]);

  React.useEffect(() => {
    capture("PAGE");
  }, []);

  return (
    <Layout
      imageUrl={`${window.location.origin}/class.png`}
      _header={_header(classObject.name)}
      _appBar={{ languages: manifest.languages }}
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
      _footer={footerLinks}
    >
      <Stack space={1} mb="2" shadow={2}>
        <ClassAttendanceCard
          classId={classObject.id}
          students={students}
        ></ClassAttendanceCard>
        <ClassStudentsPanel
          classObject={classObject}
          students={students}
        ></ClassStudentsPanel>
        <ClassSubjectsPanel />
        <ClassDetailsPanel students={students} />
      </Stack>
    </Layout>
  );
};

export default ClassDetails;
