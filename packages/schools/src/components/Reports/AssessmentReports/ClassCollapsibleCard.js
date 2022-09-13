import React, { Suspense } from "react";
import { Box, VStack, Divider, Button } from "native-base";
import {
  H2,
  Collapsible,
  ProgressBar,
  Tab,
  BodyLarge,
  H4,
  studentRegistryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import ClassWiseSubjectProgress from "./ClassWiseSubjectProgress";
import { useNavigate } from "react-router-dom";

// const MyClassRoute = React.lazy(() => import("classes/MyClassRoute"));
// const TimeTableRoute = React.lazy(() => import("calendar/TimeTableRoute"));
function ClassCollapsibleCard({ item, subjects, defaultCollapse }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [students, setStudents] = React.useState([]);

  React.useEffect(async () => {
    const studentData = await studentRegistryService.getAll({
      classId: item?.id,
      sortBy: "admissionNo",
    });
    setStudents(studentData);
  }, []);

  return (
    <Collapsible
      defaultCollapse={defaultCollapse}
      header={
        <Box py={4}>
          <H2>
            {(item?.name ? item?.name : "") +
              (item?.section ? " • Sec " + item?.section : "")}
          </H2>
        </Box>
      }
    >
      <>
        <Divider mb={4} />
        <VStack space={4}>
          {/*bordered box*/}
          <Box>
            <VStack space={6}>
              {/*row 1 box*/}
              <Box>
                <VStack space={6}>
                  <Box>
                    <Tab
                      _box={{
                        display: "flex",
                        overflowX: "auto",
                        p: "2",
                      }}
                      _item={{ flex: "none" }}
                      routes={subjects.map((subject) => {
                        return {
                          title: subject.name,
                          component: (
                            <VStack space={4}>
                              <ClassWiseSubjectProgress
                                {...{
                                  students,
                                  classId: item?.id,
                                  subject: subject.code,
                                }}
                              />
                              <Box p={2}>
                                <Button
                                  variant={"outline"}
                                  onPress={() => {
                                    navigate(
                                      `/schools/assessment-section-report/${item?.id}/${subject.code}/allDates`
                                    );
                                  }}
                                >
                                  See Full Report
                                </Button>
                              </Box>
                            </VStack>
                          ),
                        };
                      })}
                    />
                    <Divider />
                  </Box>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </>
    </Collapsible>
  );
}
export default ClassCollapsibleCard;
