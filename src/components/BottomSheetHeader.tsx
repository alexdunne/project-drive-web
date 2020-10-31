import { Box, Grid, Heading, IconButton } from '@chakra-ui/core';
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

interface BottomSheetHeaderProps {
  onBack?: () => void;
}

export const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = (props) => {
  return (
    <Grid
      height="40px"
      gridTemplateColumns="50px auto 50px"
      columnGap="16px"
      alignItems="center"
      mb={2}
    >
      <Box>
        {props.onBack ? (
          <IconButton
            icon={FiArrowLeft}
            aria-label="Go back"
            fontSize="24px"
            variant="ghost"
            onClick={props.onBack}
          />
        ) : null}
      </Box>

      <Heading as="h3" fontSize="lg" textAlign="center">
        {props.children}
      </Heading>

      <Box />
    </Grid>
  );
};
