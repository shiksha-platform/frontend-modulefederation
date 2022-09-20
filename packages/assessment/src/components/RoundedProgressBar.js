import { Box, Text, useTheme, VStack } from "native-base";
import React from "react";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(ArcElement);

export default function RoundedProgressBar({
  values,
  colors,
  title,
  legend,
  cutout,
  size,
  _vstack,
  ...props
}) {
  const theme = useTheme();
  return (
    <Box>
      <VStack alignItems="center" space={1} {..._vstack}>
        <Box position="relative" width={size}>
          <Doughnut
            data={{
              datasets: [
                {
                  id: 1,
                  label: "",
                  data: values ? values : [14, 6],
                  backgroundColor: colors
                    ? colors
                    : [theme?.colors.primary, theme?.colors?.lightGray2],
                  borderWidth: 0,
                  cutout: cutout ? cutout : "80%",
                },
              ],
            }}
          />

          {title && title?.text ? (
            <Text
              position="absolute"
              top="50%"
              left="50%"
              style={{ transform: "translate(-50%, -25%)" }}
              fontSize={title && title.fontSize ? title.fontSize : "16px"}
            >
              {title.text}
            </Text>
          ) : (
            <React.Fragment />
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
