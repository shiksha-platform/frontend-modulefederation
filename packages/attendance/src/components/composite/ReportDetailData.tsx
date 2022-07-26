// Lib
import * as React from "react";
import { Suspense } from "react";
import { Box, Stack, Text, VStack, FlatList, Button } from "native-base";

// Components
// @ts-ignore
const Card = React.lazy(() => import("students/Card"));
import { Collapsible } from "components/simple/Collapsible";
import { useTranslation } from "react-i18next";

// Utils
import { colorTheme } from "utils/functions/ColorTheme";
import { ReportDetailTitle } from "components/simple/ReportDetailTitle";

export const ReportDetailData = ({ data, calendarView, appName, type }) => {
  const { t } = useTranslation();
  let _textMed: string;
  let _textSmall: string;
  let _borderColor: string;
  let _bgColor: string;
  let _textTitle;
  let _color1: string;
  let _color2: string;
  if (type.toLowerCase() === "present") {
    _textMed = `100% ${
      calendarView === "monthInDays" ? t("THIS_MONTH") : t("THIS_WEEK")
    }`;
    _textSmall = data.length + " " + t("STUDENTS");
    _borderColor = colorTheme.presentCardBorder;
    _bgColor = colorTheme.presentCardBg;
    _textTitle = "100%";
    _color1 = colorTheme.lightGray;
    _color2 = colorTheme.presentCardText;
  } else {
    _textMed = t("ABSENT_CONSECUTIVE_3_DAYS");
    _textSmall = data.length + " " + t("STUDENTS");
    _borderColor = colorTheme.absentCardBorder;
    _bgColor = colorTheme.absentCardBg;
    _textTitle = `3 ${t("DAYS")}`;
    _color1 = colorTheme.lightGray;
    _color2 = colorTheme.absentCardText;
  }
  return (
    <Box bg={colorTheme.white} p={4}>
      <Stack space={2}>
        {
          // @ts-ignore
          <Collapsible
            defaultCollapse={true}
            isHeaderBold={false}
            header={
              <>
                <VStack>
                  <Text bold fontSize={"md"}>
                    {_textMed}
                  </Text>
                  <Text fontSize={"xs"}>{_textSmall}</Text>
                </VStack>
              </>
            }
            body={
              <VStack space={2} pt="2">
                <Box>
                  <FlatList
                    // @ts-ignore
                    data={data}
                    renderItem={({ item }: { item: any }) => (
                      <Box
                        borderWidth="1"
                        borderColor={_borderColor}
                        bg={_bgColor}
                        p="10px"
                        rounded="lg"
                        my="10px"
                      >
                        <Suspense fallback="loading">
                          <Card
                            appName={appName}
                            item={item}
                            type="rollFather"
                            textTitle={
                              <ReportDetailTitle
                                _text1={item.fullName}
                                _text2={" • "}
                                _text3={_textTitle}
                                _color1={_color1}
                                _color2={_color2}
                              />
                            }
                            href={"/students/" + item.id}
                            hidePopUpButton
                          />
                        </Suspense>
                      </Box>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </Box>
                <Button
                  mt="2"
                  variant="outline"
                  colorScheme="button"
                  rounded="lg"
                >
                  {t("SEE_MORE")}
                </Button>
              </VStack>
            }
          />
        }
      </Stack>
    </Box>
  );
};
