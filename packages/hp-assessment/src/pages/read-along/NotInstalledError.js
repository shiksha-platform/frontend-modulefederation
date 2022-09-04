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
import { Link } from "react-router-dom";
import { Box, HStack, Text, VStack, Button } from "native-base";
import { useTranslation } from "react-i18next";
import React from "react";
// const colors = overrideColorTheme(colorTheme);

export default function ReadAlongNotInstalledError() {
  const { t } = useTranslation();
  const [width, height] = useWindowSize();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <Layout
      _header={{
        title: "अनुदेश",
        // subHeading: "अभ्यास हेतु विषय सम्बन्धी निर्देश",
        isEnableSearchBtn: true,
      }}
      subHeader={
        <H2 textTransform="none" color="hpAssessment.white">
          रीड अलोंग इंस्टाल निर्देश
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
          <H2 color="hpAssessment.error">
            ऐसा प्रतीत होता है के आपके मोबाइल में, गूगल रीड अलोंग ऐप इन्सटाल्ड
            नहीं है ।
          </H2>
          <BodyMedium>
            आपको अभी कुछ शब्द अथवा कहानियां दिखेंगी, उनको पढ़ने की कोशिश करें।
            भाषा के आकलन 'Read Along' ऐप पर होगा। आकलन शुरू करने से पहले
            सुनिश्चित आपने ऐप को सेटअप करने के सब स्टेप कर लिए हैं ।
          </BodyMedium>
          <BodyMedium>
            <ol>
              <li>
                Google Play Store से 'Read Along' ऐप डाउनलोड करें।' Read Along'
                ऐप को खोलकर, ऐप 'Audio' और 'Video' permissions मांगने पर 'Allow'
                करें
              </li>
              <li>
                'Read Along' ऐप खुलने पर यदि 'Audio' और 'Video' permissions
                मांगे तो 'Allow' पर क्लिक करें।
              </li>
              <li>
                'Read Along' ऐप की भाषा को अंग्रेजी से हिंदी में बदलें। ('Read
                Along' के पहले पेज पर बाईं ओर बटन दबाने पर यह विकल्प मिलेगा )
              </li>
              <li>
                'Read Along' ऐप पर आपने hpnipun22' पार्टनर कोड डालें। ('Read
                Along' के पहले पेज पर बाईं ओर बटन दबाने पर यह विकल्प मिलेगा)
              </li>
            </ol>
          </BodyMedium>

          <Button
            colorScheme="hpButton"
            py={3}
            _text={{ color: "hpAssessment.white" }}
            onPress={() => {
              window.location.href =
                "https://play.google.com/store/apps/details?id=com.google.android.apps.seekh";
            }}
          >
            ऐप इनस्टॉल करें
          </Button>
        </VStack>
      </Box>
    </Layout>
  );
}
