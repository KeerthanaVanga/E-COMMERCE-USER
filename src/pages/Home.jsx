import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import OurPolicy from "../components/ourPolicy";
import NewsLetterBox from "../components/NewsLetterBox";
import {
  fetchBestSellerProducts,
  fetchLatestProducts,
} from "../api/ProductAPI";
import { useQuery } from "@tanstack/react-query";
const Home = () => {
  const {
    data: bestSellerProducts,
    isPending: isBestSellerPending,
    isError: isBestSellerError,
    error: bestSellerError,
  } = useQuery({
    queryKey: ["products", "best-seller-products"],
    queryFn: ({ signal }) => fetchBestSellerProducts({ signal }),
    staleTime: 5000,
    gcTime: 10 * 60 * 1000,
  });

  const {
    data: latestProducts,
    isPending: isLatestPending,
    isError: isLatestError,
    error: latestError,
  } = useQuery({
    queryKey: ["products", "latest-products"],
    queryFn: ({ signal }) => fetchLatestProducts({ signal }),
    staleTime: 5000,
    gcTime: 10 * 60 * 1000,
  });

  if (isBestSellerPending) {
    return <p className="text-center mt-10">Loading Best Seller Products</p>;
  }

  if (isBestSellerError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Error: {bestSellerError.message}
      </p>
    );
  }

  if (isLatestPending) {
    return <p className="text-center mt-10">Loading Products...</p>;
  }

  if (isLatestError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Error: {latestError.message}
      </p>
    );
  }

  return (
    <div>
      <Hero />
      <LatestCollection latestProducts={latestProducts} />
      <BestSeller bestSellerProducts={bestSellerProducts} />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
