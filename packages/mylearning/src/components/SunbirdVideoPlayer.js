import { H2 } from "@shiksha/common-lib";
import React from "react";

const SunbirdVideoPlayer = (props) => {
  const [url, setUrl] = React.useState();
  React.useEffect(() => {
    if (props?.mimeType === "application/pdf") {
      setUrl(`${process.env.PUBLIC_URL}/players/pdf`);
    } else if (props?.mimeType === "video/mp4") {
      setUrl(`${process.env.PUBLIC_URL}/players/video`);
    } else if (
      ["application/vnd.sunbird.questionset"].includes(props?.mimeType)
    ) {
      setUrl(`${process.env.PUBLIC_URL}/players/quml`);
    } else if (
      [
        "application/vnd.ekstep.ecml-archive",
        "application/vnd.ekstep.html-archive",
      ].includes(props?.mimeType)
    ) {
      setUrl(
        `${process.env.PUBLIC_URL}/players/project-sunbird/content-player`
      );
    }
  }, [props?.mediaType]);

  if (url) {
    return (
      <iframe
        id="preview"
        height={"100%"}
        width="100%"
        name={JSON.stringify(props)}
        src={`${url}`}
      />
    );
  } else {
    return <H2>{`${props?.mimeType} this mime type not compatible`}</H2>;
  }
};

export default React.memo(SunbirdVideoPlayer);

const appendScript = (scriptToAppend, removeScript = []) => {
  const removeScriptData = [...removeScript, scriptToAppend];
  removeScriptData.map((e) => removeScriptTag(e));

  const script = document.createElement("script");
  script.src = scriptToAppend;
  script.async = true;
  document.body.appendChild(script);
};

const removeScriptTag = (scriptToAppend) => {
  const scriptTag = document.querySelectorAll(
    "script[src='" + scriptToAppend + "']"
  );
  if (scriptTag && scriptTag?.length > 0) {
    scriptTag.forEach((e) => {
      if (e) e.remove();
    });
  }
};
