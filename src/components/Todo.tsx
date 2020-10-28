import { Box } from '@chakra-ui/core';
import React from 'react';

export const Todo: React.FC = ({ children }) => {
  return (
    <Box px={4} py={4} border="4px" borderRadius="md" borderColor="red.500">
      {children ?? 'TODO'}
    </Box>
  );
};
