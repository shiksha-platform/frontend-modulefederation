import { Box } from "@shiksha/common-lib";
import { useEffect, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { mock1,mock2 } from "./mock";

console.log(mock1);
export default function RichtextBlockComponent() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    if (mock2) {
      const rawContent = convertFromRaw(mock2);
      console.log(rawContent, editorState);
      setEditorState(EditorState.createWithContent(rawContent));
      let currentContentAsHTML = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      setConvertedContent(currentContentAsHTML);
    }
  }, [convertedContent]);

  return <div dangerouslySetInnerHTML={{__html:convertedContent}}></div>;
}
