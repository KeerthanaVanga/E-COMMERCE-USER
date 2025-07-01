import ProductItem from "./ProductItem";
import Title from "./Title";
const BestSeller = ({ bestSellerProducts }) => {
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Our most-loved picks — explore the top-selling styles everyone’s
          talking about.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellerProducts.map((product, index) => (
          <ProductItem
            key={index}
            id={product._id}
            name={product.name}
            image={product.images}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
