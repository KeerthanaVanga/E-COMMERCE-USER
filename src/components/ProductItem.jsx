import { Link } from "react-router-dom";
const ProductItem = ({ id, image, name, price }) => {
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden w-full h-48 flex items-center justify-center bg-white">
        <img
          className="h-full w-full object-contain transition-transform hover:scale-105 ease-in-out"
          src={image[0]}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm line-clamp-2">{name}</p>
      <p className="text-sm font-medium">₹{price}</p>
    </Link>
  );
};

export default ProductItem;
