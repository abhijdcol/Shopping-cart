import { useContext } from "react";
import "./Cart.css";
import CartItem from "./CartItem";
import CartContext from "../Context/CartContext";
import currencyFormatter from "currency-formatter";

const Cart = () => {
  const { showCart, cartItems, showHideCart } = useContext(CartContext);
  let opts = { format: "%s%v", symbol: "₹" };
  return (
    <>
      {showCart && (
        <div className="cart__wrapper">
          <div style={{ textAlign: "right" }}>
            <i
              style={{ cursor: "pointer" }}
              className="fa fa-times-circle"
              aria-hidden="true"
              onClick={showHideCart}
            ></i>
          </div>
          <div className="cart__innerWrapper">
            {cartItems.length === 0 ? (
              <h4>Cart is empty</h4>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>
            )}
          </div>
          <div className="Cart__cartTotal">
            <div>Cart Total </div>
            <div></div>
            <div style={{ marginLeft: 5 }}>
              {currencyFormatter.format(
                cartItems.reduce((amount, item) => item.price + amount, 0),
                opts
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
