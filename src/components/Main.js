import Product from "./Product";

export default function Main(props) {
    const {basket, items, onClick} = props;
    return <div className="block col-2">
        <h2>Products</h2>
        <div className="row">
            {items.map(i => (
                <Product
                    key={i.id}
                    product={i}
                    itemInCart={basket.find((x) => x.id === i.id)}
                    onClick={onClick}
                />
            ))}
        </div>
    </div>;
}
