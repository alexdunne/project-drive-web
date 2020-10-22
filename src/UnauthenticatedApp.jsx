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
    <div className="h-full flex items-center">
      <div className="w-full max-w-md">
        <form
          className=" bg-white  rounded px-8 py-8 pt-8"
          onSubmit={handleSubmit}
        >
          <div className="px-4 pb-4">
            <label htmlFor="email" className="text-sm block font-bold  pb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              value={form.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="password" className="text-sm block font-bold pb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              value={form.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="px-4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnauthenticatedApp;
