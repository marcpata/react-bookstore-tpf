import React, { useState } from 'react';
import EcommerceContext from './EcommerceContext'
import useLocalStorage from '../Hooks/useLocalStorage';

function GlobalState({children}) {
    const [logged, setLogged] = useState(false);
    const [shoppingCart,setShoppingCart] = useLocalStorage('shoppingCart',[])
    const [userLogged, setUserLogged] = useState({})
    const loginUser =() => setLogged(true);
    const logoutUser=() => {
        setLogged(false);
    }
    const addToCart = (id)=>{
        const itemAdded = [...shoppingCart, {'product': id}]
        setShoppingCart(itemAdded)
    }
    const removeFromCart=(itemId)=>{
        const itemRemoved = shoppingCart.filter(item=>item.product!==itemId)
        setShoppingCart(itemRemoved);
    }
    const clearCart=()=>setShoppingCart([])

    const userInfo=(data) => setUserLogged(data)
    
    return (
        <EcommerceContext.Provider
            value={{
                logged,
                shoppingCart,
                loginUser,
                logoutUser,
                userLogged,
                userInfo,
                addToCart,
                clearCart,
                removeFromCart
            }}
        >
            {children}
        </EcommerceContext.Provider>
    );
}

export default GlobalState;