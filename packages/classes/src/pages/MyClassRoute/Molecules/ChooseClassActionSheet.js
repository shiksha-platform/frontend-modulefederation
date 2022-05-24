import React from "react";
import { Box, useDisclose, Actionsheet, Link } from "native-base";
import { useTranslation } from "react-i18next";
import { classRegistryService } from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";

const ChooseClassActionSheet = () => {
  const { t } = useTranslation();
  const [clasess, setClasses] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    let ignore = false;
    async function getData() {
      setClasses(
        await classRegistryService.getAllData({
          filters: { schoolId: { eq: 1 } },
        })
      );
    }
    getData();
    return () => {
      ignore = true;
    };
  }, []);

  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <>
      <Link onPress={onOpen}>
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

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {clasess.map((item, index) => (
            <Actionsheet.Item
              key={index}
              onPress={(e) => navigate(`/classes/${item?.id}`)}
            >
              {item?.name}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default ChooseClassActionSheet;
