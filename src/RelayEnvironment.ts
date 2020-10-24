import { Environment, Network, RecordSource, Store, Variables, RequestParameters } from "relay-runtime";
import { AuthUtils } from "./util/auth";

async function fetchQuery(operation: RequestParameters, variables: Variables) {
  const token = AuthUtils.getAuthToken();

  const headers: HeadersInit = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await window.fetch(process.env.REACT_APP_API_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return await response.json();
}

const RelayEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export { RelayEnvironment };
