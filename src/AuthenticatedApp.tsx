import React, { Suspense } from "react";
import { useMediaQuery } from "react-responsive";

import { FullPageSpinner } from "./components/FullPageSpinner";

import { Todo } from "./components/Todo";

const Mobile = React.lazy(() => import("./components/Mobile"));

const AuthenticatedApp = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Suspense fallback={<FullPageSpinner />}>
      {isMobile ? <Mobile /> : <Todo />}
    </Suspense>
  );
};

export default AuthenticatedApp;
