import { Button, Card } from "react-bootstrap";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function ProductItem({ product }: { product: Product }) {
	return (
		<Card className="card">
			<Link to={`/product${product.slug}`}>
				<img src={product.image} className="card-img-top" alt={product.name} />
			</Link>
			<Card.Body>
				<Link to={`/product/${product.slug}`}>
					<Card.Title>{product.name}</Card.Title>
				</Link>
				<Rating rating={product.rating} numReviews={product.numReviews} />
				<Card.Text>{product.price}€</Card.Text>
			</Card.Body>
			{product.countInStock === 0 ? (
				<Button variant="light" disabled>
					out of stock
				</Button>
			) : (
				<Button> Add to cart</Button>
			)}
		</Card>
	);
}
export default ProductItem;
