import {
  Layout,
  Loading,
  overrideColorTheme,
  templateRegistryService,
  worksheetRegistryService,
} from "@shiksha/common-lib";
import React from "react";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import colorTheme from "../colorTheme";
import { useNavigate, useParams } from "react-router-dom";
import WorksheetTemplateComponent from "../components/WorksheetTemplate";
const colors = overrideColorTheme(colorTheme);

export default function WorksheetTemplate({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(true);
  const { worksheetId } = useParams();
  const [templates, setTemplates] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(async () => {
    const data = await templateRegistryService.getAll({ tag: "worksheet" });
    setTemplates(data);
    setLoading(false);
  }, []);

  const handleWorksheet = async (templateId) => {
    setLoading(true);
    const data = await worksheetRegistryService.downloadWorksheet({
      id: worksheetId,
      worksheetId,
      templateId,
    });
    if (data) {
      window.open(data.data, "_blank", "noopener,noreferrer");
      navigate(-1);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout
      _header={{
        title: t("WORKSHEET_TEMPLATE"),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("SELECT_TEMPLATE")}
      _subHeader={{ bg: colors.cardBg }}
      _footer={footerLinks}
    >
      <WorksheetTemplateComponent
        onPress={handleWorksheet}
        {...{
          templates,
          _box: { bg: colors.cardBgLight },
          _templateBox: {
            activeColor: colors.cardBg,
            bg: colors.white,
            mb: 5,
          },
        }}
      />
    </Layout>
  );
}
