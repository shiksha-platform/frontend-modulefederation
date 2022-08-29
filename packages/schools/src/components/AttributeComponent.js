const { IconByName, BodyMedium } = require("@shiksha/common-lib");
const { VStack, HStack } = require("native-base");

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
                color="darkGray4"
                p="0"
              />
              <BodyMedium color="darkGray4">
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
