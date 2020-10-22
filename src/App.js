import React, { Suspense } from "react";
import {
  graphql,
  RelayEnvironmentProvider,
  useLazyLoadQuery,
} from "react-relay/hooks";

import { RelayEnvironment } from "./RelayEnvironment";

function App() {
  const data = useLazyLoadQuery(
    graphql`
      query AppRepositoryNameQuery {
        repository(owner: "facebook", name: "relay") {
          name
        }
      }
    `
  );

  return (
    <div className="App">
      <header className="App-header">
        <p>{data.repository.name}</p>
      </header>
    </div>
  );
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={"Loading..."}>
        <App />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
