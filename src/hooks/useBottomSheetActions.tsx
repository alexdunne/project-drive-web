import { MutableRefObject, useCallback } from 'react';
import { SheetRef } from 'react-modal-sheet';

export const useBottomSheetActions = (sheetRef: MutableRefObject<SheetRef | undefined>) => {
  const snapTo = useCallback(
    (index: number) => {
      try {
        sheetRef.current?.snapTo(index);
      } catch (e) {
        if (e instanceof TypeError) {
          // If the bottomsheet isn't visible this may throw an error
          // ignore
          return;
        }

        throw e;
      }
    },
    [sheetRef]
  );

  return {
    snapTo,
  };
};
