import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";

const UnauthenticatedApp = () => {
  return <LoginForm />;
};

const LoginForm = () => {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "hi+i@alexdunne.net",
    password: "TestPassword1",
  });

  const handleInputChange = (e) => {
    const target = e.target;

    setForm((form) => {
      return {
        form,
        [target.name]: target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(form);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <input type="submit" value="Go Go Go" />
      </form>
    </div>
  );
};

export default UnauthenticatedApp;
