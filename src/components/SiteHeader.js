export default function SiteHeader(props) {
    const {countCartItems} = props;
    return <div className="row center block">
        <div>
            <a href="#/"><h2>Simple Shopping Cart</h2></a>
        </div>
        <div>
            <a href="#/cart">
                Cart
				{countCartItems ? (
                    <button className="badge">{countCartItems}</button>
                ) : ('')
                }
            </a> <a href="#/signIn">Sign In</a>
        </div>
    </div>;
}
