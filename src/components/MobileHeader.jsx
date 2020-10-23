import { Box, Heading } from "@chakra-ui/core";
import React from "react";
import { MenuIcon } from "./icons/MenuIcon";

export const MobileHeader = (props) => {
  return (
    <Box
      as="header"
      display="flex"
      width="100vw"
      px={4}
      py={4}
      textAlign="center"
    >
      {props.children}
    </Box>
  );
};

export const MobileHeaderTitle = (props) => {
  return (
    <Heading
      fontSize="2xl"
      fontWeight="semibold"
      color="gray.800"
      lineHeight="40px"
    >
      {props.children}
    </Heading>
  );
};

export const MobileHeaderMenu = (props) => {
  return (
    <Box height="40px" width="40px">
      <MenuIcon />
    </Box>
  );
};
