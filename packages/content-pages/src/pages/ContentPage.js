import { Layout } from "@shiksha/common-lib";
import { Link, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack } from "native-base";
import CollapsibleBlockComponent from "components/CollapsibleBlockComponent";
import ImageBlockComponent from "components/ImageBlockComponent";
import RichtextBlockComponent from "components/RichtextBlockComponent";
import { useEffect, useState } from "react";
import { contentPagesRegistryService } from "@shiksha/common-lib";

export default function ContentPage() {
  const { slug } = useParams();

  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    contentPagesRegistryService.getContentPageData(slug).then((res) => {
      setPageData(res[0]);
    });
  }, []);
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
      <h1>{pageData?.title}</h1>
      <VStack width="100%" spacing="4" px="10">
        {pageData?.blocks?.map((val, idx) => {
          switch (val?.blockType) {
            case "richtext":
              return (
                <Box key={idx} mb="2">
                  <RichtextBlockComponent
                    initialData={JSON.parse(val?.blockData?.richtextData)}
                  ></RichtextBlockComponent>
                </Box>
              );
            case "image":
              return (
                <Box key={idx} mb="2">
                  <ImageBlockComponent
                    src={val?.blockData?.imgSrc}
                  ></ImageBlockComponent>
                </Box>
              );
            case "collapsible":
              return (
                <Box key={idx} mb="2">
                  <CollapsibleBlockComponent
                    {...val?.blockData}
                  ></CollapsibleBlockComponent>
                </Box>
              );
          }
        })}
      </VStack>
    </Layout>
  );
}
