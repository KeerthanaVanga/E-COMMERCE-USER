import Title from "./Title";
const CartTotal = ({ shippingFee, subtotal, total }) => {
  return (
    <div className="w-full">
      <div className="text-2xl flex items-center justify-center">
        <Title text1={"CART"} text2={"TOTALS"} />{" "}
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>₹{subtotal}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>₹{shippingFee}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>₹{total}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
