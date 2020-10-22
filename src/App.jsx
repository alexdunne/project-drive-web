import React, { Suspense } from "react";
import { FullPageSpinner } from "./components/FullPageSpinner";
import { useAuth } from "./context/AuthContext";

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ "./AuthenticatedApp")
);
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<FullPageSpinner />}>
      {isAuthenticated() ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
}

export default App;
