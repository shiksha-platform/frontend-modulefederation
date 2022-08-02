import { Box, Text, VStack } from "native-base";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { overrideColorTheme } from "@shiksha/common-lib";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);
Chart.register(ArcElement, Tooltip, Legend);
export default function RoundedProgressBar({
  values,
  colors,
  title,
  legend,
  cutout,
  size,
  ...props
}) {
  return (
    <Box>
      <VStack alignItems="center" space={2}>
        <Box position="relative" width={size} textAlign="center">
          <Doughnut
            data={{
              datasets: [
                {
                  id: 1,
                  label: "",
                  data: values ? values : [14, 6],
                  backgroundColor: colors ? colors : ["#0D921B", "#F7F7FD"],
                  borderWidth: 0,
                  cutout: cutout ? cutout : "80%",
                },
              ],
            }}
          />
          {title && title.text && (
            <Text
              position="absolute"
              top="50%"
              left="50%"
              style={{ transform: "translate(-50%, -25%)" }}
              fontSize={title && title.fontSize ? title.fontSize : "16px"}
            >
              {title.text}
            </Text>
          )}
        </Box>
        {legend && legend.text && (
          <Text fontSize={legend && legend.fontSize ? legend.fontSize : "16px"}>
            {legend.text}
          </Text>
        )}
      </VStack>
    </Box>
  );
}
