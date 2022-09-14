import {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import Basket from './Basket';
import {data} from '../data';

function App() {
    const [basket, setBasket] = useState([]);

    const addNewItemToCart = item => [...basket, {...item, qty: 1}]
    const removeItemFromCart = item => basket.filter(i => i.id !== item.id)

    const updatedCartQuantity = (item, shouldAdd) => {
        console.log(item)
        const newItem = {
            ...item,
            qty: shouldAdd ? item.qty + 1 : item.qty - 1,
        }
        return basket.map((x) =>
            x.id === item.id ? newItem : x
        );
    }

    const isItemInCart = item => basket.find(x => x.id === item.id)
    const updateCart = (item, shouldAdd) => {
        const itemInCart = isItemInCart(item);
        if (shouldAdd && !itemInCart) {
            return addNewItemToCart(item)
        } else if (!shouldAdd && item.qty === 1) {
            return removeItemFromCart(item)
        } else {
            return updatedCartQuantity(item, shouldAdd)
        }
    }

    const onClick = (item, shouldAdd = false) => {
        const newCartItems = updateCart(item, shouldAdd)
        localStorage.setItem('basket', JSON.stringify(newCartItems));
        setBasket(newCartItems);
    }

    useEffect(() => {
        setBasket(localStorage.getItem('basket')
            ? JSON.parse(localStorage.getItem('basket'))
            : []
        );
    }, []);
    return (
        <div>
            <Header countCartItems={basket.reduce((acc, i) => acc + i.qty, 0)} />
            <div className='row'>
                <Main basket={basket} onClick={onClick} items={data.items} />
                <Basket basket={basket} onClick={onClick} />
            </div>
        </div>
    );
}

export default App;
