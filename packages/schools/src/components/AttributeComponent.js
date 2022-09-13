import React from "react";
import { useTranslation } from "react-i18next";

const { IconByName, BodyMedium, BodyLarge } = require("@shiksha/common-lib");
const { VStack, HStack } = require("native-base");

export default function AttributeComponent({
  data,
  object,
  _vstack,
  _hstack,
  _childVstack,
  _label,
  _attribute,
}) {
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
    <VStack space="2" {..._vstack}>
      {elements.map((attributes, index) => (
        <HStack key={index} space="2" {..._hstack}>
          {attributes.map((item, subIndex) => (
            <VStack
              key={subIndex}
              space="1"
              alignItems="baseline"
              flex={1}
              {..._childVstack}
            >
              {item.icon ? (
                <IconByName
                  isDisabled
                  name={item.icon}
                  _icon={{ size: 14 }}
                  color="darkGray4"
                  p="0"
                />
              ) : (
                <React.Fragment />
              )}
              <BodyLarge color="darkGray4" {..._label}>
                {t(item?.label)}
              </BodyLarge>
              <BodyMedium color="darkGray4" {..._attribute}>
                {object?.[item.attribute]
                  ? Array.isArray(object?.[item.attribute])
                    ? object?.[item.attribute].length
                    : object?.[item.attribute]
                  : ""}
              </BodyMedium>
            </VStack>
          ))}
        </HStack>
      ))}
    </VStack>
  );
}
