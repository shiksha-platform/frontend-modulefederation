import { Layout, overrideColorTheme } from "@shiksha/common-lib";
import React from "react";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const Question = () => {
  return (
    <Layout
      _header={{
        title: "Fill the following questionnaire",
        _heading: { color: colors.white },
      }}
      _appBar={{ languages: ["en"] }}
    >
      <iframe
        src="http://localhost:8005/preview?xform=http://0.0.0.0:8000/Primary_Mentoring_Form.xml"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        width="100%"
        height="100%"
        title="Questionnaire"
        style={{ height: "calc(100vh - 170px)" }}
      />
    </Layout>
  );
};

export default Question;
