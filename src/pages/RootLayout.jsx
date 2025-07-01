import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

const RootLayout = () => {
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  const isCollectionPage = location.pathname === "/collection";

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Navbar showSearch={showSearch} setShowSearch={setShowSearch} />
        {isCollectionPage && (
          <SearchBar
            visible={showSearch}
            onClose={() => setShowSearch(false)}
          />
        )}
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
