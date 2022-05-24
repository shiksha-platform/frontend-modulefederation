import React from "react";
import { Box, useDisclose, Button, Actionsheet, Link } from "native-base";
import { useTranslation } from "react-i18next";
import * as classServiceRegistry from "../../../services/classServiceRegistry";
import { useNavigate } from "react-router-dom";

const ChooseClassActionSheet = () => {
  const { t } = useTranslation();
  const [clasess, setClasses] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    let ignore = false;
    async function getData() {
      setClasses(
        await classServiceRegistry.getAllData({
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

      <Button
        variant="outline"
        colorScheme={"button"}
        onPress={onOpen}
        >
        {t("CHOOSE_ANOTHER_CLASS")}
        </Button>

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
