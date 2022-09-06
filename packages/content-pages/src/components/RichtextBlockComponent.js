import { useEffect, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "isomorphic-dompurify";

export default function RichtextBlockComponent({ initialData }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    if (initialData) {
      const rawContent = convertFromRaw(initialData);
      setEditorState(EditorState.createWithContent(rawContent));
      let currentContentAsHTML = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      setConvertedContent(currentContentAsHTML);
    }
  }, [convertedContent]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(convertedContent) }}
    ></div>
  );
}
