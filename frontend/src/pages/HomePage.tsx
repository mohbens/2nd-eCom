// import axios from "axios";
// import { useEffect, useReducer } from "react";
import { Col, Row } from "react-bootstrap";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
// import { ApiError } from "../types/ApiError";
// import { Product } from "../types/Product";
// import { getError } from "../utils";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHook";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";

// type State = {
// 	products: Product[];
// 	loading: boolean;
// 	error: string;
// };

// type Action =
// 	| { type: "FETCH_REQUEST" }
// 	| {
// 			type: "FETCH_SUCCESS";
// 			payload: Product[];
// 	  }
// 	| { type: "FETCH_FAIL"; payload: string };

// const initialState: State = {
// 	products: [],
// 	loading: true,
// 	error: "",
// };

// const reducer = (state: State, action: Action) => {
// 	switch (action.type) {
// 		case "FETCH_REQUEST":
// 			return { ...state, loading: true };
// 		case "FETCH_SUCCESS":
// 			return { ...state, products: action.payload, loading: false };
// 		case "FETCH_FAIL":
// 			return { ...state, loading: false, error: action.payload };
// 		default:
// 			return state;
// 	}
// };

export default function HomePage() {
	// const [{ loading, error, products }, dispatch] = useReducer<
	// 	React.Reducer<State, Action>
	// >(reducer, initialState);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		dispatch({ type: "FETCH_REQUEST" });
	// 		try {
	// 			const result = await axios.get("/api/products");
	// 			dispatch({ type: "FETCH_SUCCESS", payload: result.data });
	// 		} catch (err) {
	// 			dispatch({ type: "FETCH_FAIL", payload: getError(err as ApiError) });
	// 		}
	// 	};
	// 	fetchData();
	// }, []);
	const { data: products, isLoading, error } = useGetProductsQuery();

	return isLoading ? (
		<LoadingBox />
	) : error ? (
		<MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
	) : (
		<Row>
			<Helmet>
				<title>Amazon Ts</title>
			</Helmet>
			{products!.map((product) => (
				<Col key={product.slug} sm={6} md={4} lg={3}>
					<ProductItem product={product} />
				</Col>
			))}
		</Row>
	);
}
