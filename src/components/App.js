import {useEffect, useState} from 'react';
import SiteHeader from './SiteHeader';
import Main from './Main';
import {data} from '../data';

function App() {
    useEffect(() => {
        setBasket(localStorage.getItem('basket')
            ? JSON.parse(localStorage.getItem('basket'))
            : []
        );
    }, []);

    const [basket, setBasket] = useState([]);

    const addToBasket = item => [...basket, {...item, qty: 1}]
    const removeFromBasket = item => basket.filter(i => i.id !== item.id)
    const isItemInBasket = item => basket.find(i => i.id === item.id)

    const updatedCartQuantity = (item, shouldAdd) => {
        const newItem = {
            ...item,
            qty: shouldAdd ? item.qty + 1 : item.qty - 1,
        }
        return basket.map(i => i.id === item.id ? newItem : i)
    }

    const updateBasket = (item, shouldAdd) => {
        if (shouldAdd && !isItemInBasket(item)) {
            return addToBasket(item)
        } else if (!shouldAdd && item.qty === 1) {
            return removeFromBasket(item)
        } else {
            return updatedCartQuantity(item, shouldAdd)
        }
    }

    const onClick = (item, shouldAdd = false) => {
        const newBasket = updateBasket(item, shouldAdd)
        setBasket(newBasket);
        localStorage.setItem('basket', JSON.stringify(newBasket));
    }

    return <>
        <SiteHeader countCartItems={basket.reduce((acc, i) => acc + i.qty, 0)} />
        <Main items={data.items} basket={basket} onClick={onClick} />
    </>
}

export default App;
