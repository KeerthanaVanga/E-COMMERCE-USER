import { queryClient } from "./TanStack";
import { fetchOrders } from "../api/OrdersAPI";

export async function loader() {
  return queryClient.fetchQuery({
    queryKey: ["orders"],
    queryFn: ({ signal }) => fetchOrders({ signal }),
  });
}
