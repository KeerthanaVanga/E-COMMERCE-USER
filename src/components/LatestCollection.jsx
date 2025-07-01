import ProductItem from "./ProductItem";
import Title from "./Title";
const LatestCollection = ({ latestProducts }) => {
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover the newest trends and styles in our latest collection —
          curated with care to elevate your everyday look.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((product, index) => (
          <ProductItem
            key={index}
            id={product._id}
            image={product.images}
            price={product.price}
            name={product.name}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
