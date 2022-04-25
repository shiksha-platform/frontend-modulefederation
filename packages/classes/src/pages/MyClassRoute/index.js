import React, { useEffect, useState } from "react";
import { Box, HStack, VStack } from "native-base";
import { useTranslation } from "react-i18next";
import { generatePath } from "react-router-dom";
import { Widget } from "@shiksha/common-lib";
import * as classServiceRegistry from "../../services/classServiceRegistry";
import ChooseClassActionSheet from "./Molecules/ChooseClassActionSheet";

const MyClassRoute = () => {
  const { t } = useTranslation();
  const [classes, setClasses] = useState([]);
  const teacherId = localStorage.getItem("id");

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      if (!ignore) {
        setClasses(
          await classServiceRegistry.getAll({
            teacherId: teacherId,
            type: "class",
            role: "teacher",
          })
        );
      }
    };
    getData();
  }, [teacherId]);

  return (
    <Box pb={4} pt="30">
      <VStack space={10}>
        <Widget
          data={classes.map((item, index) => {
            return {
              title: item.name,
              subTitle: t("CLASS_TEACHER"),
              link: generatePath(item.id, { ...{ id: item.id } }),
              _box: {
                style: {
                  background:
                    index % 2 === 0
                      ? "linear-gradient(281.03deg, #FC5858 -21.15%, #F8AF5A 100.04%)"
                      : "linear-gradient(102.88deg, #D7BEE6 -5.88%, #B143F3 116.6%)",
                },
              },
            };
          })}
        />
        <HStack space={2} justifyContent={"center"}>
          <ChooseClassActionSheet />
          {/*
            <Link
              to={"/classes/attendance/group"}
              style={{
                textDecoration: "none",
                flex: "1",
                textAlign: "center",
              }}
            >
              <Box
                rounded="lg"
                borderColor="button.500"
                borderWidth="1"
                _text={{ color: "button.500" }}
                px={4}
                py={2}
                style={{ textTransform: "uppercase" }}
              >
                {t("CHOOSE_ANOTHER_CLASS")}
              </Box>
            </Link>
            */}
        </HStack>
      </VStack>
    </Box>
  );
};

export default MyClassRoute;
