const Footer = () => {
  const navlinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Priacy Policy", path: "/privacy-policy" },
  ];
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] ga-14 my-10 mt-40 text-sm">
        <div>
          <img
            src={import.meta.env.VITE_SHOPVERSE}
            alt=""
            className="mb-5 w-32"
          />
          <p className="w-full md:w-2/3 text-gray-600">
            Shopverse — your go-to destination for the latest trends, unbeatable
            prices, and seamless shopping. Stay connected for exclusive offers
            and updates.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            {navlinks.map((link, index) => (
              <li key={index}>{link.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 987 567 8907</li>
            <li>support@shopverse.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ shopverse.com - All right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
