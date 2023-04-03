// Lib
import * as React from "react";

// Interface
export interface IHtmlPrint {
  html: string;
}

// Utility Component that returns a div using a markup
// TODO: find an alternate way to avoid using innerHTML
const HtmlPrint: React.FC<IHtmlPrint> = ({ html }) => {
  const createMarkup = (markup) => {
    return { __html: markup };
  };
  return <div dangerouslySetInnerHTML={createMarkup(html)} />;
};

export default HtmlPrint;
