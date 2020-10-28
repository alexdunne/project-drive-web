import { Box, BoxProps, Input, InputProps, List, ListItem, PseudoBoxProps } from '@chakra-ui/core';
import {
  Combobox as BaseCombobox,
  ComboboxInput as BaseComboboxInput,
  ComboboxInputProps as BaseComboboxInputProps,
  ComboboxList as BaseComboboxList,
  ComboboxListProps as BaseComboboxListProps,
  ComboboxOption as BaseComboboxOption,
  ComboboxOptionProps as BaseComboboxOptionProps,
  ComboboxPopover as BaseComboboxPopover,
  ComboboxPopoverProps as BaseComboboxPopoverProps,
} from '@reach/combobox';
import React from 'react';
import * as StyledSystem from 'styled-system';

export const Combobox = BaseCombobox;

type ComboboxInputProps = BaseComboboxInputProps & InputProps;

export const ComboboxInput: React.FC<ComboboxInputProps> = (props) => {
  return <Input as={BaseComboboxInput} {...props} />;
};

type ComboboxListProps = BaseComboboxListProps &
  BoxProps & {
    spacing?: StyledSystem.MarginBottomProps['marginBottom'];
  };

export const ComboboxList: React.FC<ComboboxListProps> = (props) => {
  return <List as={BaseComboboxList} {...props} />;
};

type ComboboxOptionProps = BaseComboboxOptionProps & PseudoBoxProps;

export const ComboboxOption: React.FC<ComboboxOptionProps> = (props) => {
  return <ListItem as={BaseComboboxOption} {...props} />;
};

type ComboboxPopoverProps = BaseComboboxPopoverProps & BoxProps;

export const ComboboxPopover: React.FC<ComboboxPopoverProps> = (props) => {
  return <Box as={BaseComboboxPopover} {...props} />;
};
