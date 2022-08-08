import { Layout } from "@shiksha/common-lib";
import { Link, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack } from "native-base";
import CollapsibleBlockComponent from "components/CollapsibleBlockComponent";
import ImageBlockComponent from "components/ImageBlockComponent";
import RichtextBlockComponent from "components/RichtextBlockComponent";
import { useEffect, useState } from "react";
import {contentPagesRegistryService} from "@shiksha/common-lib";

export default function ContentPage() {
  const { slug } = useParams();
  console.log(slug);

  const [pageData,setPageData]=useState([]);

  useEffect(()=>{
    contentPagesRegistryService.getContentPageData(slug).then((res)=>{
      setPageData(res[0]);
      console.log(res[0]);
    })
  },[]);
  const collapsibleProps = {
    collapsibleHeader: "Sample question",
    collapsibleContent: "Sample answer",
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
      <h1>{pageData?.title}</h1>
      {

        pageData?.blocks?.map((val,idx)=>{

          switch(val?.blockType){
            case 'richtext':
              return <RichtextBlockComponent initialData={JSON.parse(val?.blockData?.richtextData)}></RichtextBlockComponent>
            case 'image':
              return <ImageBlockComponent src={val?.blockData?.imgSrc}></ImageBlockComponent>
            case 'collapsible':
              return <CollapsibleBlockComponent {...val?.blockData}></CollapsibleBlockComponent>
          }
        })
      }
    </Layout>
  );
}
