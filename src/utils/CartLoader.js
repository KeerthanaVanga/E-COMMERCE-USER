import { queryClient } from "./TanStack";
import { fetchCart } from "../api/CartAPI";

export async function loader() {
  return queryClient.fetchQuery({
    queryKey: ["cart"],
    queryFn: ({ signal }) => fetchCart({ signal }),
  });
}
