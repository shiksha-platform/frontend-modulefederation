import { useTranslation } from "react-i18next";
import colorTheme from "../colorTheme";

const {
  IconByName,
  BodyMedium,
  overrideColorTheme,
} = require("@shiksha/common-lib");
const { VStack, HStack } = require("native-base");
const colors = overrideColorTheme(colorTheme);

export default function AttributeComponent({ data, object }) {
  const { t } = useTranslation();

  const elements = data.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 2);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  return (
    <VStack space="2">
      {elements.map((attributes, index) => (
        <HStack key={index} space="2">
          {attributes.map((item, subIndex) => (
            <HStack key={subIndex} space="1" alignItems="baseline" flex={1}>
              <IconByName
                isDisabled
                name={item.icon}
                _icon={{ size: 14 }}
                color={colors.worksheetBoxText}
                p="0"
              />
              <BodyMedium color={colors.worksheetBoxText}>
                {t(item?.label) +
                  " : " +
                  (object?.[item.attribute]
                    ? Array.isArray(object?.[item.attribute])
                      ? object?.[item.attribute].length
                      : object?.[item.attribute]
                    : "")}
              </BodyMedium>
            </HStack>
          ))}
        </HStack>
      ))}
    </VStack>
  );
}
