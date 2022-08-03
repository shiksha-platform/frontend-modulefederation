import { Layout } from "@shiksha/common-lib";
import { Link } from "react-router-dom";
import { Box, HStack, Text, VStack } from "native-base";
import CollapsibleBlockComponent from "components/CollapsibleBlockComponent";
import ImageBlockComponent from "components/ImageBlockComponent";
import RichtextBlockComponent from "components/RichtextBlockComponent";

export default function ContentPage() {
  const collapsibleProps = {
    header: "Sample question",
    content: "Sample answer",
  };
  const imageProps = {
    src: "https://picsum.photos/600/400",
    align: "center",
  };
  return (
    <Layout
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            route: "/",
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            route: "/classes",
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            route: "/",
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            route: "/",
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            route: "/",
          },
        ],
      }}
    >
      <h1>Sample title</h1>
      <CollapsibleBlockComponent
        {...collapsibleProps}
      ></CollapsibleBlockComponent>
      <ImageBlockComponent {...imageProps}></ImageBlockComponent>
      <RichtextBlockComponent {...imageProps}></RichtextBlockComponent>
    </Layout>
  );
}
