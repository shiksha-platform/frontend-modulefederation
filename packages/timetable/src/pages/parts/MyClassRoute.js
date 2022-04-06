import React, { useEffect } from "react";

const MyClassRoute = () => {
  const { t } = useTranslation();
  const [classes, setClasses] = useState([]);
  const authId = sessionStorage.getItem("id");

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      if (!ignore) {
        setClasses(
          await classServiceRegistry.getAll({
            filters: {
              teacherId: {
                eq: authId,
              },
            },
          })
        );
      }
    };
    //getData();
    setClasses(sampleClassData);
  }, [authId]);

  return (
    <Box pb={4} pt="30">
      <VStack space={10}>
        <Widget
          data={classes.map((item, index) => {
            return {
              title: item.className,
              subTitle: t("CLASS_TEACHER"),
              link: generatePath(item.route, { ...{ id: item.id } }),
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
