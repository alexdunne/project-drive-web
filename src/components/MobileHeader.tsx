import { Box, Heading, IconButton } from '@chakra-ui/core';
import React from 'react';
import { FiMenu } from 'react-icons/fi';

import { zIndex } from '../theme/z-index';

export const MobileHeader: React.FC = (props) => {
  return (
    <Box
      as="header"
      position="fixed"
      width="100vw"
      px={4}
      py={4}
      textAlign="center"
      bg="white"
      shadow="md"
      zIndex={zIndex.MobileHeader}
    >
      {props.children}
    </Box>
  );
};

export const MobileHeaderTitle: React.FC = (props) => {
  return (
    <Heading fontSize="2xl" fontWeight="semibold" color="gray.800" lineHeight="40px">
      {props.children}
    </Heading>
  );
};

export const MobileHeaderMenu: React.FC = (props) => {
  return <IconButton icon={FiMenu} aria-label="Open main menu" fontSize="30px" variant="ghost" />;
};
