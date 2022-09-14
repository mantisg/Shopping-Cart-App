import {useEffect, useState} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import data from './data';

function App() {
    const [cartItems, setCartItems] = useState([]);
    const {products: items} = data;
    const getItem = item => cartItems.find(x => x.id === item.id)
    const saveCart = (item, shouldAdd) => {
        const newCartItems = createCart(item, shouldAdd)
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        setCartItems(newCartItems);
    }
    const createCart = (item, shouldAdd) => {
        const exist = getItem(item);
        if (shouldAdd && !exist) {
            return addItemToCart(item)
        } else if (!shouldAdd && exist.qty === 1) {
            return removeItemFromCart(item)
        } else {
            return updatedCartQuantity(item, shouldAdd)
        }
    }

    const addItemToCart = item => [...cartItems, {...item, qty: 1}]
    const removeItemFromCart = item => cartItems.filter(i => i.id !== item.id)

    const updatedCartQuantity = (item, shouldAdd) => {
        const newItem = {
            ...item,
            qty: shouldAdd ? item.qty + 1 : item.qty - 1,
        }
        return cartItems.map((x) =>
            x.id === item.id ? newItem : x
        );
    }

    const onAdd = (item) => {
        const shouldAdd = true
        saveCart(item, shouldAdd)
    }
    const onRemove = (item) => {
        const shouldAdd = false
        saveCart(item, shouldAdd)
    }

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
                <Main cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} products={items} />
                <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
            </div>
        </div>
    );
}

export default App;
