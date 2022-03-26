

import React from "react";

import {
  HStack,
  Text,
  Link,
  VStack,
  Box,
  FlatList,
  Pressable,
} from "native-base";
import Icon from "./IconByName";
import { generatePath } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Menu({ items, type, routeDynamics, bg }) {
  const { t } = useTranslation();

  if (type === "veritical") {
    return (
      <Box bg={bg} p={5}>
        <HStack justifyContent="center">
          {items.map((item) => (
            <Pressable px="5" py="3" key={item.id}>
              <Link
                href={
                  routeDynamics
                    ? generatePath(item.id, { ...{ id: item.id } })
                    : item.id
                }
              >
                <VStack space="4" my="2" mx="1" alignItems="center">
                  <Icon
                    name={item.icon}
                    p="0"
                    color="primary.500"
                    _icon={{
                      style: { fontSize: "45px" },
                    }}
                  />
                  <Text color="gray.700" fontWeight="500">
                    {item.title}
                  </Text>
                </VStack>
              </Link>
            </Pressable>
          ))}
        </HStack>
      </Box>
    );
  } else {
    return (
      <Box bg={bg}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
            >
              <VStack space="6" my="2" mx="1">
                <Pressable px="5" py="1">
                  <Link
                    href={
                      routeDynamics
                        ? generatePath(item.id, { ...{ id: item.id } })
                        : item.id
                    }
                  >
                    <HStack space={3}>
                      <HStack space="7" alignItems="center">
                        <Icon name={item.icon} p="0" />
                        <Text color="gray.700" fontWeight="500">
                          {t(item.title)}
                        </Text>
                      </HStack>
                    </HStack>
                  </Link>
                </Pressable>
              </VStack>
            </Box>
          )}
          keyExtractor={(item, index) => (item.id ? item.id : index)}
        />
      </Box>
    );
  }
}