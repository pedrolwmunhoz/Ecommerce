import React, { Children } from 'react'
import Head from 'next/head'
import {urlFor} from '../lib/client'
import Navbar from './NavBar'
import Footer from './Footer'

function Layout ({children}) {
  return (
    <div className="layout">
      <Head>
        <title>TRIBUS SURF SHOP</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout;
