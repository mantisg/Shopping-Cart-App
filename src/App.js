import {useEffect, useState} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import data from './data';

function Save(newCartItems) {
	const savedCartItems = newCartItems;
	localStorage.setItem('cartItems', JSON.stringify(savedCartItems));
}

function App() {
    const [cartItems, setCartItems] = useState([]);
    const {products} = data;
    const onAdd = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
            const newCartItems = cartItems.map((x) =>
                x.id === product.id ? {...exist, qty: exist.qty + 1} : x
            );

            setCartItems(newCartItems);
            Save(newCartItems);
        } else {
            const newCartItems = [...cartItems, {...product, qty: 1}];
            setCartItems(newCartItems);
            Save(newCartItems);
        }
    }
    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.qty === 1) {
            const newCartItems = cartItems.filter((x) => x.id !== product.id);
            setCartItems(newCartItems)
            Save(newCartItems);
        } else {
            const newCartItems = cartItems.map((x) =>
                x.id === product.id ? {...exist, qty: exist.qty - 1} : x
            );
            setCartItems(newCartItems);
            Save(newCartItems);
        }
    };

    useEffect(() => {
    	setCartItems(localStorage.getItem('cartItems')
    		? JSON.parse(localStorage.getItem('cartItems'))
    		: []
    	);
    }, []);
    return (
        <div>
            <Header countCartItems={cartItems.reduce((acc, i) => acc + i.qty, 0)} />
            <div className='row'>
                <Main cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} products={products} />
                <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
            </div>
        </div>
    );
}

export default App;
