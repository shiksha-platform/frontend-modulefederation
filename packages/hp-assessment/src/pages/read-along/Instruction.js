import Reacttra, { useEffect, useState } from "react";
import {
  Layout,
  H2,
  IconByName,
  Caption,
  overrideColorTheme,
  H1,
  BodyLarge,
  hpAssessmentRegistryService,
  Loading,
  useWindowSize,
  BodyMedium,
} from "@shiksha/common-lib";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  HStack,
  Text,
  VStack,
  Button,
  Actionsheet,
  Stack,
  Pressable,
} from "native-base";
import { useTranslation } from "react-i18next";
import React from "react";
// const colors = overrideColorTheme(colorTheme);

export default function ReadAlongInstruction() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const groupName = localStorage.getItem("hp-assessment-groupName") || "";
  const [width, height] = useWindowSize();
  const [loading, setLoading] = useState(false);
  const [showModalTemplate, setShowModalTemplate] = useState(true);
  const [ORFConfig, setORFConfig] = useState({});
  let count = 0;

  const isReadAlongInstalled = () => {
    androidInteract.checkForReadAlong();
  };

  const onPackageChecked = (packageName, isInstalled) => {
    if (isInstalled) {
      _handleReadAlongOpen();
    } else {
      navigate("/hpAssessment/read-along-not-installed");
    }
  };

  const _handleReadAlongOpen = () => {
    if (ORFConfig && ORFConfig.book_ids && ORFConfig.book_ids.length) {
      androidInteract.triggerReadAlong(ORFConfig?.book_ids[count]);
    } else {
    }
  };

  const onReadAlongResult = (correctWords, timeTaken) => {
    /* document.getElementById("results").innerHTML =
      "Read Along : Correct words : " +
      correctWords +
      " : Time taken : " +
      timeTaken +
      " seconds";*/

    localStorage.setItem(
      `hp-assessment-oral-test-result-${count}`,
      JSON.stringify([{ children: [{ score: correctWords / timeTaken }] }])
    );
    if (count < ORFConfig?.book_ids.length - 1) {
      _handleReadAlongOpen();
      count++;
    }

    navigate("/hpAssessment/oral-assessment-success");
  };

  const getORFConfig = async () => {
    const data = await hpAssessmentRegistryService.getOrfAssessmentConfig({
      group: groupName,
    });

    setORFConfig(data);
    // calculateTrackingData(list);
  };

  useEffect(() => {
    window.addEventListener(
      "onReadAlongResult",
      (event) => {
        onReadAlongResult(event?.correctWords, event?.timeTaken);
      },
      false
    );

    window.addEventListener(
      "onPackageChecked",
      (event) => {
        onPackageChecked(event?.packageName, event?.isInstalled);
      },
      false
    );

    return () => {
      window.removeEventListener("onReadAlongResult", (val) => {});
    };

    getORFConfig();
  }, []);

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <Layout
      _header={{
        title: "अनुदेश",
        isEnableSearchBtn: true,
      }}
      subHeader={
        <H2 textTransform="none" color="hpAssessment.white">
          अभ्यास हेतु विषय सम्बन्धी निर्देश
        </H2>
      }
      _subHeader={{
        bg: "hpAssessment.cardBg1",
      }}
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
      <Box p={4}>
        <VStack space={4}>
          <H2>चलिए शुरू करते हैं !</H2>
          <BodyMedium color="hpAssessment.success">
            आपको अभी कुछ शब्द अथवा कहानियां दिखेंगी, उनको पढ़ने की कोशिश करें।
            भाषा के आकलन 'Read Along' ऐप पर होगा। आकलन शुरू करने से पहले
            सुनिश्चित आपने ऐप को सेटअप करने के सब स्टेप कर लिए हैं ।
          </BodyMedium>
          <BodyMedium>
            <ol>
              <li>
                गूगल प्ले स्टोर से Read Along' ऐप डाउनलोड करें। ऐप को खोलें।
              </li>
              <li>ऐप खुलने पर Audio' व 'Video' permission को 'Allow'करें ।</li>
              <li>ऐप की भाषा को अंग्रेजी से हिंदी में बदलें ।</li>
              <li>ऐप पर आप "hpnipun22" पार्टनर कोड डालें।</li>
            </ol>
          </BodyMedium>
          <BodyMedium>
            स्टेप 3 व 4 हेतु विकल्प ऐप के पहले पेज पर बाईं ओर बटन दबाने पर
            मिलेंगे
          </BodyMedium>

          <Button
            colorScheme="hpButton"
            py={3}
            _text={{ color: "hpAssessment.white" }}
            // onPress={isReadAlongInstalled}
            onPress={() => {
              navigate("/hpAssessment/oral-assessment-success");
            }}
          >
            आगे बढ़े
          </Button>
        </VStack>
      </Box>

      <Actionsheet
        isOpen={showModalTemplate}
        onClose={() => setShowModalTemplate(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg="hpAssessment.cardBg1">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="2px">
              <H2 fontWeight="500" color="hpAssessment.white">
                कृपया निम्नलिखित की दोबारा जांच करें:
              </H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color="hpAssessment.white"
              onPress={(e) => setShowModalTemplate(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg="hpAssessment.white" width={"100%"}>
          <ul>
            <li>
              'Read Along' ऐप की भाषा को अंग्रेजी से हिंदी में बदलें। ('Read
              Along' के पहले पेज पर बाईं ओर बटन दबाने पर यह विकल्प मिलेगा)
            </li>
            <li>
              'Read Along' ऐप पर आपने 'hpnipun22' पार्टनर कोड डालें। ('Read
              Along' के पहले पेज पर बाईं ओर बटन दबाने पर यह विकल्प मिलेगा)
            </li>
          </ul>
          <Box p={5}>
            <Button
              colorScheme="hpButton"
              _text={{ color: "white" }}
              onPress={(e) => setShowModalTemplate(false)}
            >
              ठीक है
            </Button>
          </Box>
        </Box>
      </Actionsheet>
    </Layout>
  );
}
