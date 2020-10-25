import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/core';
import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const MobileSearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <InputGroup>
      <InputLeftElement height="100%">
        <Icon name="search" color="blue.700" />
      </InputLeftElement>
      <Input
        type="text"
        variant="filled"
        placeholder="Search"
        aria-label="Search your schedule"
        borderRadius="md"
        bg="gray.50"
        color="gray.700"
        px={6}
        py={6}
        value={props.value}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          props.onChange(e.currentTarget.value);
        }}
      />
    </InputGroup>
  );
};
