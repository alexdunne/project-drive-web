import { Box, Button, Stack, useDisclosure } from '@chakra-ui/core';
import React, { Fragment, useCallback } from 'react';
import Sheet from 'react-modal-sheet';

import { BottomSheetHeader } from './BottomSheetHeader';

interface ChildrenProps {
  onRequestConfirmation: () => void;
}

interface onCloseOptions {
  onComplete: () => void;
}

interface ConfirmationBottomSheetProps {
  children: (props: ChildrenProps) => React.ReactNode;
  title?: string;
  description: React.ReactNode;
  onConfirm: (options: onCloseOptions) => void;
}

export const ConfirmationBottomSheet: React.FC<ConfirmationBottomSheetProps> = ({
  children,
  description,
  onConfirm,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConfirm = useCallback(() => {
    onConfirm({
      onComplete: onClose,
    });
  }, [onConfirm, onClose]);

  return (
    <Fragment>
      {children({ onRequestConfirmation: onOpen })}

      <Sheet isOpen={isOpen} onClose={onClose} snapPoints={[200]} initialSnap={0}>
        {/*  @ts-ignore */}
        <Sheet.Container>
          {/*  @ts-ignore */}
          <Sheet.Header />
          <Sheet.Content>
            <Stack spacing={2} px={4}>
              <BottomSheetHeader>Confirmation</BottomSheetHeader>

              {description}

              <Box pt={6}>
                <Button
                  type="button"
                  width="100%"
                  variantColor="red"
                  border="none"
                  _focus={{
                    outline: 'none',
                    boxShadow: 'md',
                  }}
                  onClick={handleConfirm}
                >
                  Confirm
                </Button>
              </Box>
            </Stack>
          </Sheet.Content>
        </Sheet.Container>

        {/*  @ts-ignore */}
        <Sheet.Backdrop onClick={onClose} />
      </Sheet>
    </Fragment>
  );
};
