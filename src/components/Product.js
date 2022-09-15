
export default function Product(props) {
    const {itemInCart, product, onClick} = props;
    return (
        <div className="card">
            <img className="small" src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <div>${product.price}</div>
            <div>
                {itemInCart ? (
                    <div>
                        <button onClick={() => onClick(itemInCart)} className="remove">
                            -
						</button>
                        <span className="p-1">{product.qty}</span>
                        <button onClick={() => onClick(itemInCart, true)} className="add">
                            +
						</button>
                    </div>
                ) : (
                    <button onClick={() => onClick(product, true)}>Add to Cart</button>
                )}
            </div>
        </div>
    );
}
