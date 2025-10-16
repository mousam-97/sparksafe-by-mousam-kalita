import { Link } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";
import Row, { Space } from "../../components/common/Grid/Grid";
import List from "../../components/common/List/List";
import Text from "../../components/common/Text/Text";
import { useToast } from "../../components/common/Toast/Toast";
import Page from "../../components/layout/Page/Page";
import { useCart } from "../../context/CartContext";

export default function Cart() {
	const { computed, removeItem, setQuantity, clear } = useCart();
	const { showToast } = useToast();

	const { items, totals } = computed;

	function checkout() {
		clear();
		showToast("Order placed successfully!", "success");
	}

	return (
		<Page>
			{items.length === 0 ? (
				<Text muted>
					Your cart is empty. <Link to="/marketplace">Go shopping</Link>
				</Text>
			) : (
				<>
					<List>
						{items.map(({ product, quantity, lineTotal }) => (
							<Row key={product.id} align="center" justify="between" gap={3} wrap>
								<Card style={{ width: "100%" }}>
									<div>
										<Text variant="body" boldness="bold">
											{product.name}
										</Text>
										<Text muted>${product.price} each</Text>
									</div>
									<Row align="center" gap={2} justify="between">
										<Row align="center" gap={2}>
											<Button
												variant="secondary"
												onClick={() =>
													setQuantity(
														product.id,
														Math.max(0, quantity - 1)
													)
												}
											>
												-
											</Button>
											<Text as="div">{quantity}</Text>
											<Button
												variant="secondary"
												onClick={() =>
													setQuantity(product.id, quantity + 1)
												}
											>
												+
											</Button>
										</Row>
										<div style={{ width: 60, textAlign: "right" }}>
											${lineTotal.toFixed(2)}
										</div>
										<Space size={2} />
										<Button
											variant="ghost"
											onClick={() => removeItem(product.id)}
										>
											Remove
										</Button>
									</Row>
								</Card>
							</Row>
						))}
					</List>
					<Space vertical size={4} />
					<Row justify="between">
						<Text boldness="bold" variant="body">
							Subtotal
						</Text>
						<Text boldness="bold" variant="body">
							${totals.subtotal.toFixed(2)}
						</Text>
					</Row>
					<Space vertical size={6} />
					<Button fullWidth disabled={items.length === 0} onClick={checkout}>
						Checkout
					</Button>
				</>
			)}
		</Page>
	);
}
