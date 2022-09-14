import Product from "./Product";
import Basket from './Basket';

export default function Main(props) {
    const {items, basket, onClick} = props;
    return (
        <div className="row">
            <div className="block col-2">
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
            </div>
            <Basket basket={basket} onClick={onClick} />
        </div>
    )
}
