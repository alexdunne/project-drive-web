import React from "react";
import { MenuIcon } from "./icons/MenuIcon";

export const MobileHeader = (props) => {
  return (
    <header className="fixed w-full py-4 px-4 text-center">
      {props.children}
    </header>
  );
};

export const MobileHeaderTitle = (props) => {
  return (
    <h1 className="text-2xl font-semibold text-gray-800">{props.children}</h1>
  );
};

export const MobileHeaderMenu = (props) => {
  return (
    <div className="h-8 w-8">
      <MenuIcon />
    </div>
  );
};
