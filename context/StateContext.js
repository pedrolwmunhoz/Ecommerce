import React, { createContext, useContext, useState, UseEffect} from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext();


export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct
    let index

    const incQty = () => {
        setQty((prevQty)=> prevQty +1)
    }
    const decQty = () => {
        setQty((prevQty)=> {
            if(prevQty - 1 < 1) return 1
            return prevQty - 1
        })
    }
    const onAdd = ( product, quantity ) => {
        const checkProductInCart = cartItems.find((item)=> item._id === product._id)
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)
        if(checkProductInCart){
            const updateCartItems = cartItems.map((cartProduct) =>{
                if(cartProduct._id === product._id)return{
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updateCartItems)
        } else {
            product.quantity = quantity
            setCartItems([...cartItems, {...product }])
        }
        toast.success(`${qty} ${product.name} adicionado ao carrinho.`)
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
      }

    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id)
        if(value === 'inc'){
            setCartItems([...newCartItems.slice(0, index), { ...foundProduct , quantity: foundProduct.quantity +1 }, ...newCartItems.slice(index)])
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities( prevTotalQuantities => prevTotalQuantities + 1)
        }else if(value === 'dec'){
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems.slice(0, index), { ...foundProduct , quantity: foundProduct.quantity -1 }, ...newCartItems.slice(index)])
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities( prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
    }

    return(
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                setCartItems,
                cartItems,
                totalPrice,
                setTotalPrice,
                totalQuantities,
                setTotalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuanitity,
                onRemove
            }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)
