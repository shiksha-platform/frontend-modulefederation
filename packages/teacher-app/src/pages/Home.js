import { Layout } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";

import * as moment from "moment";
function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Layout
        _header={{
          title: t("HOME"),
          icon: "Group",
          subHeading: moment().format("hh:mm a"),
          _subHeading: { fontWeight: 500, textTransform: "uppercase" },
          avatar: true,
        }}
        _appBar={{languages:['en']}}
        subHeader={t("THE_CLASSES_YOU_TAKE")}
        _subHeader={{
          bg: "classCard.500",
          _text: {
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "inherit",
          },
        }}
        _footer={{
            menues: [
                {
                  "title": "HOME",
                  "icon": "Home4LineIcon",
                  "module": "Registry",
                  "route": "/",
                  "routeparameters": {}
                },
                {
                  "title": "CLASSES",
                  "icon": "TeamLineIcon",
                  "module": "Registry",
                  "route": "/classes",
                  "routeparameters": {}
                },
                {
                  "title": "SCHOOL",
                  "icon": "GovernmentLineIcon",
                  "module": "Registry",
                  "route": "/",
                  "routeparameters": {}
                },
                {
                  "title": "MATERIALS",
                  "icon": "BookOpenLineIcon",
                  "module": "Registry",
                  "route": "/",
                  "routeparameters": {}
                },
                {
                  "title": "CAREER",
                  "icon": "UserLineIcon",
                  "module": "Registry",
                  "route": "/",
                  "routeparameters": {}
                }
              ]
        }}
      >
        <div>Home ...</div>
      </Layout>
    </>
  );
}
export default Home;
