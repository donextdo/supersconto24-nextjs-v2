import {Metadata} from "next";
import Auth from "@/app/[lang]/components/Auth/Auth";

export const metadata: Metadata = {
  title: "Supersconto | Account"
}
const AccountPage = () => {
  return (
    <Auth/>
  );
};

export default AccountPage;
