
export default function Basket(props) {
    const {basket, onClick} = props;
    const itemsPrice = basket.reduce((acc, i) => acc + i.qty * i.price, 0);
    const taxPrice = itemsPrice * 0.06;
    const shippingPrice = itemsPrice > 150 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    return <aside className="block col-1">
        <h2>Cart Items</h2>
        <div>
            {basket.length === 0 && <div>Cart Is Empty</div>}
            {basket.map((item) => (
                <div key={item.id} className="row">
                    <div className="col-1">{item.name}</div>
                    <div className="col-1">
                        <button onClick={() => onClick(item)} className="remove">
                            -
						</button>
                        <button onClick={() => onClick(item, true)} className="add">
                            +
						</button>
                    </div>
                    <div className="col-1 text-right">
                        {item.qty} x ${item.price.toFixed(2)}
                    </div>
                </div>
            ))}
            {basket.length !== 0 && (
                <>
                    <hr />
                    <div className="row">
                        <div className="col-2">Price</div>
                        <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2">Tax Price</div>
                        <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2">Shipping Price</div>
                        <div className="col-1 text-right">${shippingPrice.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <strong>Total Price</strong>
                        </div>
                        <div className="col-1 text-right">${totalPrice.toFixed(2)}</div>
                    </div>
                    <hr />
                    <div className="row">
                        <button onClick={() => alert('Implement Checkout!')}>
                            Checkout
						</button>
                    </div>
                </>
            )}
        </div>
    </aside>;
}
