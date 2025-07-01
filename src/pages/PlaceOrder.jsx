import InputField from "../components/InputField";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { createPayment } from "../api/PaymentAPI";
import { useMutation } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
const PlaceOrder = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const formRef = useRef();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const { mutate, isPending } = useMutation({
    mutationFn: createPayment,
  });

  useEffect(() => {
    if (data.cart.length == 0) {
      navigate("/collection");
    }
  }, [data, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const details = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipcode: formData.get("zipcode"),
      country: formData.get("country"),
      phone: formData.get("phone"),
      paymentMethod: formData.get("paymentMethod"),
      cartDetails: data,
    };

    mutate(details, {
      onMutate: () => {
        toast.dismiss();
        toast.loading("Cancelling order...");
      },
      onSuccess: async (res) => {
        toast.dismiss();
        toast.success(data.message);
        if (res.sessionId) {
          const stripe = await loadStripe(import.meta.env.VITE_STRIPE);

          const result = await stripe.redirectToCheckout({
            sessionId: res.sessionId,
          });

          if (result.error) {
            console.error("Stripe Error:", result.error);
          }
        } else if (res.razorpayOrderId) {
          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.total * 100,
            currency: "INR",
            name: "ShopVerse",
            description: "Order Payment",
            image: import.meta.env.VITE_SHOPVERSE,
            order_id: res.razorpayOrderId,
            handler: function (response) {
              console.log(response);
              navigate(`/payment-success?orderId=${res.orderId}`);
            },
            prefill: {
              name: `${details.firstName} ${details.lastName}`,
              email: details.email,
              contact: details.phone,
            },
            theme: {
              color: "#3399cc",
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          navigate(`/order-confirmed?orderId=${res.orderId}`);
        }
      },
      onError: (err) => {
        console.error(err);
        alert("Failed to place order, please try again.");
      },
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <InputField
            type="text"
            placeholder="First name"
            name="firstName"
            required
          />
          <InputField
            type="text"
            placeholder="Last name"
            name="lastName"
            required
          />
        </div>
        <InputField
          type="email"
          placeholder="Email Address"
          name="email"
          required
        />
        <InputField type="text" placeholder="Street" name="street" required />
        <div className="flex gap-3">
          <InputField type="text" placeholder="City" name="city" required />
          <InputField type="text" placeholder="State" name="state" required />
        </div>
        <div className="flex gap-3">
          <InputField
            type="number"
            placeholder="Zipcode"
            name="zipcode"
            required
          />
          <InputField
            type="text"
            placeholder="Country"
            name="country"
            required
          />
        </div>
        <InputField type="number" placeholder="Phone" name="phone" required />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal
            subtotal={data.subtotal}
            shippingFee={data.shippingFee}
            total={data.total}
          />
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-center">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>
          <div className="flex gap-3 flex-col lg:flex-row">
            <InputField
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={() => setPaymentMethod("stripe")}
            >
              <img
                className="h-5 mx-4"
                src={import.meta.env.VITE_STRIPE_IMAGE}
                alt=""
              />
            </InputField>

            <InputField
              type="radio"
              name="paymentMethod"
              value="razorpay"
              checked={paymentMethod === "razorpay"}
              onChange={() => setPaymentMethod("razorpay")}
            >
              <img
                className="h-5 mx-4"
                src={import.meta.env.VITE_RAZORPAY_IMAGE}
                alt=""
              />
            </InputField>

            <InputField
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            >
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </InputField>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className={`bg-black text-white px-16 py-3 text-sm cursor-pointer ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isPending}
            >
              {isPending ? "Processing..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
