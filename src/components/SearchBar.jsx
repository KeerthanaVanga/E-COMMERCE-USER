import { useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { useQuery } from "@tanstack/react-query";
import { searchProductNames } from "../api/ProductAPI";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ visible, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["product-suggestions", searchTerm],
    queryFn: ({ signal }) => searchProductNames({ signal, search: searchTerm }),
    enabled: searchTerm.length > 0,
    staleTime: 0,
  });

  const handleSuggestionClick = (id) => {
    navigate(`/product/${id}`);
    setSearchTerm("");
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="border-t border-b bg-gray-50 text-center relative">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DynamicIcon name="search" size={25} className="w-4" />
      </div>
      <DynamicIcon
        name="circle-x"
        size={25}
        className="inline cursor-pointer"
        onClick={onClose}
      />

      {/* Suggestions */}
      {data?.length > 0 && (
        <div className="absolute left-1/2 -translate-x-1/2 w-3/4 sm:w-1/2 bg-white shadow mt-2 text-left max-h-60 overflow-y-auto">
          {data.map((product) => (
            <p
              key={product._id}
              className="p-2 cursor-pointer hover:bg-gray-100 text-sm"
              onClick={() => handleSuggestionClick(product._id)}
            >
              {product.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
