import {RootState} from "@/app/[lang]/redux/store";
import {JSXElementConstructor, ReactElement, ReactFragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import useAuthCheckHook from "@/app/[lang]/components/Hooks/useAuthCheck";

const Dashboard = ({
  onButtonClick,
  handleAddressClick,
  handleAccountDetailsClick,
}: any) => {
  const orderList = useSelector((state: RootState) => state.order.orders);
  console.log("orderList : ", orderList);
  let dispatch = useDispatch();
  const {isLoggedIn, authUser, logOut} = useAuthCheckHook()

  console.log(authUser);

  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    logOut()
    location.reload();
  };
  const handleorder = () => {};

  let email: string | null;
  let username;
  let extractedUsername:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | null
    | undefined;

  // review name
  if (authUser) {
    if (authUser?.email !== null) {
      username = authUser?.email.split("@")[0]; // Extract the username from the email
      extractedUsername = username.replace(/"/g, "");
    } else {
      // Handle the case when the email value is null
    }
  } else {
    // Handle the case when the value is null
    // For example, you could set a default value
  }
  return (
    <div>
      <p className="text-sm">
        Hello <span className="font-semibold">{extractedUsername}</span> (not{" "}
        <span className="font-semibold">{extractedUsername}?</span>
        <button onClick={handleClick}>
          <span className="text-[#2bbef9] underline underline-offset-1">
            {" "}
            Log out
          </span>
        </button>
        )
      </p>

      <p className="mt-4 text-sm">
        From your account dashboard you can view your{" "}
        <button onClick={onButtonClick}>
          <span className="text-[#2bbef9] underline underline-offset-1">
            recent orders
          </span>
        </button>
        , manage your{" "}
        <button onClick={handleAddressClick}>
          <span className="text-[#2bbef9] underline underline-offset-1">
            shipping and billing addresses
          </span>
        </button>
        , and{" "}
        <button onClick={handleAccountDetailsClick}>
          <span className="text-[#2bbef9] underline underline-offset-1">
            edit your password and account details
          </span>
        </button>
        .
      </p>
    </div>
  );
};

export default Dashboard;
