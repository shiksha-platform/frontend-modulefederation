import { Layout, H2 } from "@shiksha/common-lib";
import React from "react";
import manifest from "manifest.json";

const Question = ({ footerLinks }) => {
  return (
    <Layout
      _header={{
        title: "",
      }}
      subHeader={<H2>Fill the following questionnaire</H2>}
      _subHeader={{ bg: "schools.cardBg" }}
      _appBar={{ languages: manifest.languages }}
      _footer={footerLinks}
    >
      <iframe
        src={`http://localhost:8005/preview?xform=http://0.0.0.0:8000/Primary_Mentoring_Form.xml&token=${localStorage.getItem(
          "token"
        )}`}
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
