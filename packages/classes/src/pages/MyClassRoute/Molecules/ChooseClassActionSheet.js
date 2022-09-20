import React from "react";
import { useDisclose, Button, Actionsheet } from "native-base";
import { useTranslation } from "react-i18next";
import { classRegistryService } from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";

const ChooseClassActionSheet = () => {
  const { t } = useTranslation();
  const [clasess, setClasses] = React.useState([]);
  const navigate = useNavigate();
  const teacherId = localStorage.getItem("id");
  const schoolId = localStorage.getItem("schoolId");

  React.useEffect(() => {
    let ignore = false;
    async function getData() {
      setClasses(
        await classRegistryService.getAllData({
          schoolId: { eq: schoolId },
          teacherId: { neq: teacherId },
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
      <Button variant="outline" onPress={onOpen}>
        {t("CHOOSE_ANOTHER_CLASS")}
      </Button>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {clasess.map((item, index) => (
            <Actionsheet.Item
              key={index}
              onPress={(e) => navigate(`/classes/${item?.id}`)}
            >
              {`${item?.name} ${item?.section ? "• Sec " + item?.section : ""}`}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default ChooseClassActionSheet;
