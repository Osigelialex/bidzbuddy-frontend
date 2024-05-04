import Sidebar from "./Sidebar";
import Overview from "./Overview";
import Footer from "./Footer";
import MyBids from "./MyBids";
import { useState } from "react";

const Account = () => {
  const [selectedSection, setSelectedSection] = useState("overview");

  return (
    <>
      <div className="grid sm:min-h-screen gap-2 bg-gray-100 px-5 py-10 md:grid-cols-12 font-saira">
        <Sidebar setSelectedSection={setSelectedSection} />
        {selectedSection === "overview" && <Overview />}
        {selectedSection === "mybids"  && <MyBids />}
      </div>
      <Footer />
    </>
  );
};

export default Account;
