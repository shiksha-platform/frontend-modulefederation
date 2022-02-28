
import {Header} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";

function Home (){
    const { t } = useTranslation();

    return (
        <>
        <Header
          title={t("MY_SCHOOL_APP")}
          icon="sign-in-alt"
          heading={t("LOGIN")}
          _box={{ backgroundColor: "lightBlue.100" }}
          _icon={{ color: "black" }}
          _heading={{ color: "black" }}
          _subHeading={{ color: "black" }}
        />
        Home ...
        </>
    )
}
export default Home;