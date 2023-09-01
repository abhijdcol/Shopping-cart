import "./ProductCard.css";
import { useContext } from "react";
import currencyFormatter from "currency-formatter";
import Rating from "./Rating";
import CartContext from "../Context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  let opts = { format: "%s&v", symbol: "₹" };
  return (
    <div className="productCard__wrapper">
      <div>
        <img className="productCard__img" src={product.image} alt="" />
        <h4>{product.name}</h4>
        <div className="ProductCard__price">
          <h5>{currencyFormatter.format(`${product.price}`, opts)}</h5>
        </div>
        <div className="ProductCard__Rating">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>
        <button
          className="ProductCard__button"
          onClick={() => addToCart(product)}
        >
          Add to basket
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
