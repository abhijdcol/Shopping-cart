import CartContext from "../Context/CartContext";
import { useContext } from "react";
import "./CartItem.css";
import currencyFormatter from "currency-formatter";

const CartItem = ({ item }) => {
  const { removeItem } = useContext(CartContext);
  let opts = { format: "%s&v", symbol: "₹" };
  return (
    <>
      <li className="CartItem__item">
        <img src={item.image} alt="" />
        <div>
          {item.name} {currencyFormatter.format(`${item.price}`, opts)}
        </div>
        <button
          className="CartItem_button"
          onClick={() => removeItem(item._id)}
        >
          Remove
        </button>
      </li>
    </>
  );
};

export default CartItem;
