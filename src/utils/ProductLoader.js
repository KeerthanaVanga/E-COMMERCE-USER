import { queryClient } from "./TanStack";
import { fetchProduct } from "../api/ProductAPI";

export async function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["products", params.productId],
    queryFn: ({ signal }) => fetchProduct({ signal, id: params.productId }),
  });
}
