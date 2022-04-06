import { Box, HStack, Pressable, Stack, Text, VStack } from "native-base";
import React from "react";
import { Link } from "react-router-dom";
import IconByName from "./IconByName";

const chunk = (array, chunk) => {
  return [].concat.apply(
    [],
    array.map(function (elem, i) {
      return i % chunk ? [] : [array.slice(i, i + chunk)];
    })
  );
};

const PressableNew = ({ route, children, ...prop }) => {
  return route ? (
    <Pressable {...prop}>
      <Link
        style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
        to={route}
      >
        {children}
      </Link>
    </Pressable>
  ) : (
    <Box {...prop}>{children}</Box>
  );
};

export default function Widget({ data, title }) {
  const newData = chunk(data ? data : [], 2);
  const rotate = {
    bottom: "-20px",
    right: "-20px",
    minW: "50px",
    minH: "50px",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    style: { transform: "rotateZ(316deg)" },
  };
  return (
    <Stack space={2}>
      <Text fontSize={"lg"}>{title}</Text>
      <VStack space={3}>
        {newData.map((subData, index) => (
          <HStack key={index} space={3} width={"100%"}>
            {subData.map((item, subIndex) => (
              <Box
                key={subIndex}
                rounded="xl"
                shadow={3}
                p={4}
                width="48%"
                overflow={"hidden"}
                {...item?._box}
              >
                {/* <Vector1
                  position="absolute"
                  right="-100"
                  top="-10"
                  style={{ transform: "matrix(-1, 0, 1, 1, 0, 0)" }}
                />
                <Vector2 position="absolute" right="10px" top="5px" />
                <Vector3
                  position="absolute"
                  right="30"
                  top="0"
                  style={{ transform: "matrix(1, 0, 0, -1, 0, 0)" }}
                /> */}
                <PressableNew route={item.link}>
                  <Text
                    {...{
                      fontSize: "md",
                      fontWeight: "medium",
                      color: "coolGray.50",
                    }}
                    {...item?._text}
                  >
                    <VStack>
                      <Text bold>{item?.title}</Text>
                      <Text fontSize={"xs"}>{item?.subTitle}</Text>
                    </VStack>
                  </Text>
                  {item.icon ? (
                    <>
                      <Box
                        {...{
                          ...rotate,
                          bg: "coolGray.700",
                          roundedTop: "20px",
                          opacity: "0.1",
                        }}
                      />
                      <IconByName
                        name={item.icon}
                        {...{
                          color: "coolGray.700",
                          opacity: "0.5",
                          ...rotate,
                          ...item?._icon,
                        }}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </PressableNew>
              </Box>
            ))}
          </HStack>
        ))}
      </VStack>
    </Stack>
  );
}

const Vector1 = (props) => (
  <Box {...props}>
    <svg
      width="180"
      height="114"
      viewBox="0 0 120 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M134.5 165.5C128.5 134.5 66.5001 121.5 100.5 66.5C127.7 22.5 45.5 -8.83333 1 -19"
        stroke="white"
        stroke-width="2"
      />
    </svg>
  </Box>
);

const Vector2 = (props) => (
  <Box {...props}>
    <svg
      width="71"
      height="76"
      viewBox="0 0 71 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.60307 -31C0.936401 -25.5 7.50307 -11.6 39.1031 0C70.7031 11.6 71.603 57.1667 68.103 78.5"
        stroke="white"
        stroke-width="2"
      />
    </svg>
  </Box>
);

const Vector3 = (props) => (
  <Box {...props}>
    <svg
      width="180"
      height="114"
      viewBox="0 0 120 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M134.5 165.5C128.5 134.5 66.5001 121.5 100.5 66.5C127.7 22.5 45.5 -8.83333 1 -19"
        stroke="white"
        stroke-width="2"
      />
    </svg>
  </Box>
);
