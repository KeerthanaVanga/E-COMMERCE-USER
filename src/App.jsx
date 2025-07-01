import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { loader as ProductLoader } from "./utils/ProductLoader";
import { loader as CartLoader } from "./utils/CartLoader";
import { loader as OrderLoader } from "./utils/OrdersLoader";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/TanStack";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserAuth } from "./store/auth-actions";
import AuthLoading from "./components/AuthLoading";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/ProtectPublic";
import Profile from "./pages/Profile";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailure";
import OrderConfirmed from "./pages/OrderConfirmed";
const router = createBrowserRouter([
  { path: "/", element: <Navigate to="home" replace /> },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: "home", element: <Home /> },
      { path: "collection", id: "collections", element: <Collection /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      {
        path: "product/:productId",
        id: "products",
        element: <Product />,
        loader: ProductLoader,
      },
      {
        element: <PublicRoute />,
        children: [{ path: "login", element: <Login /> }],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "cart", element: <Cart />, loader: CartLoader },
          { path: "profile", element: <Profile /> },
          { path: "place-order", element: <PlaceOrder />, loader: CartLoader },
          { path: "orders", element: <Orders />, loader: OrderLoader },
          { path: "payment-success", element: <PaymentSuccess /> },
          { path: "payment-failed", element: <PaymentFailed /> },
          { path: "order-confirmed", element: <OrderConfirmed /> },
        ],
      },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const checkingAuth = useSelector((state) => state.auth.checkingAuth);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  if (checkingAuth) {
    return <AuthLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
