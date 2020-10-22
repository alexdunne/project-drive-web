import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { AuthUtils } from "./util/auth";

async function fetchQuery(params, variables) {
  const token = AuthUtils.getAuthToken();

  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await window.fetch(process.env.REACT_APP_API_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: params.text,
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
