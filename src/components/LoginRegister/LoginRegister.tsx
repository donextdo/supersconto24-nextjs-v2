import { SetStateAction, useState } from "react";
import Login from "./Login";
import Register from "./Register";

const LoginRegisterPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [isActive, setIsActive] = useState(true);

  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
    setIsActive(true);
  };

  return (
    <div className="max-w-lg mx-auto mt-5 mb-10 border b-0 border- md:shadow-lg">
      <div className="mt-16 mb-10 tabs">
        <div className="container flex justify-center max-w-lg mx-auto">
          <div className="pr-5">
            <button
              className={`font-ff-headings text-lg font-semibold text-${
                activeTab === "tab1" && isActive ? "black" : "gray-400"
              } active:text-gray-800 focus:outline-none focus:text-gray-800 tab ${
                activeTab === "tab1" ? "active" : ""
              }`}
              onClick={() => handleTabClick("tab1")}
            >
              LOGIN
            </button>
          </div>
          <div>
            <button
              className={`font-ff-headings text-lg font-semibold text-${
                activeTab === "tab2" && isActive ? "black" : "gray-400"
              } active:text-gray-800 focus:outline-none focus:text-gray-800  tab ${
                activeTab === "tab2" ? "active" : ""
              }`}
              onClick={() => handleTabClick("tab2")}
            >
              REGISTER
            </button>
          </div>
        </div>
      </div>
      <div className="tab-content">
        {activeTab === "tab1" && (
          <div>
            <Login
              onSubmit={function (values: {
                usernameoremail: string;
                password: string;
              }): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        )}
        {activeTab === "tab2" && (
          <div>
            <Register
              onSubmit={function (values: {
                email: string;
                password: string;
              }): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegisterPage;
