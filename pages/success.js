import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from 'react-icons/bs'
import { useStateContext } from '../context/StateContext'
import { runFireworks } from '../lib/utils'
function Success() {

    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()
    useEffect(()=>{
        localStorage.clear()
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantities(0)
        runFireworks()

    },[])
    return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Obrigado pela compra!</h2>
            <p className='email-msg'>Verifique mais informações em seu email.</p>
            <p className='description'>Caso tenha dúvidas, nos contate imediatamente!
                <a className='email' href='suport.compras@example.com'>
                    suport.compras@example.com
                </a>
            </p>
            <Link href='/'>
                <button type='button' width ='300px' className='btn'>Continue comprando!</button>
            </Link>
        </div>
    </div>
    )
}

export default Success
