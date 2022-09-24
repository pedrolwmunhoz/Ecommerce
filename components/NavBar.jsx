import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import {Cart}  from './'
import { useStateContext } from '../context/StateContext'
import icon from "../images/icon.png"

const LogoComponent= React.forwardRef((props, src) => (
  <Image src={src} {...props}></Image>
))

function NavBar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext()
  return (
    <div className="navbar-container">
      <Link href={"/"}>
        <LogoComponent src={icon} className="iconNavBar" width= "75px" height="75px"/>
      </Link>
      <p className="logo">
        <Link href="/">TRIBUS SURF SHOP</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={()=>setShowCart(true)}>
          <AiOutlineShopping/>
          <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart/>}
    </div>
  )
}

export default NavBar
