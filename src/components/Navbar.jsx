import { NavLink, Form, Link } from "react-router-dom";
import { DynamicIcon } from "lucide-react/dynamic";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../store/auth-actions";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "../api/CartAPI";
import { useSelector } from "react-redux";

const Navbar = ({ setShowSearch }) => {
  const [visible, setVisible] = useState(false);
  const isAuth = useSelector((state) => state.auth.userAuth);
  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: ({ signal }) => fetchCart({ signal }),
    enabled: isAuth,
  });
  const totalQuantity =
    data?.cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const navLinks = [
    { name: "HOME", path: "/home" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await dispatch(logoutThunk());

    if (success) {
      navigate("/login?mode=login");
    }
  };

  const profile = [
    { name: "My Profile", link: "/profile" },
    { name: "Orders", link: "/orders" },
  ];

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={import.meta.env.VITE_SHOPVERSE} alt="" className="w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navLinks.map(({ name, path }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? "active" : ""}`
            }
          >
            <p>{name}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>
      <div className="flex items-center gap-6">
        <DynamicIcon
          name="search"
          size={25}
          className="w-5 cursor-pointer"
          onClick={() => setShowSearch(true)}
        />
        <div className="group relative">
          <Link to="/login?mode=signup">
            <DynamicIcon
              name="user-round"
              size={25}
              className="w-5 cursor-pointer"
            />
          </Link>
          {isAuth && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                {profile.map((item, index) => (
                  <Link
                    to={item.link}
                    key={index}
                    className="cursor-pointer hover:text-black"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        {isAuth && (
          <>
            <Link to="/cart" className="relative">
              <DynamicIcon
                name="shopping-cart"
                size={25}
                className="w-5 cursor-pointer"
              />
              <p className="absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">
                {totalQuantity}
              </p>
            </Link>

            <button onClick={handleLogout}>
              <DynamicIcon
                name="log-out"
                size={25}
                className="w-5 cursor-pointer"
              />
            </button>
          </>
        )}
        <DynamicIcon
          onClick={() => setVisible(true)}
          name="menu"
          size={25}
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <DynamicIcon name="circle-chevron-left" size={25} />
            <p>Back</p>
          </div>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              onClick={() => setVisible(false)}
              to={link.path}
              className="py-2 pl-6 border"
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
