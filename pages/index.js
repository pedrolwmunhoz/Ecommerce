import React from 'react'
import FooterBanner from '../components/FooterBanner'
import HeroBanner from '../components/HeroBanner'
import  Product  from '../components/Product'
import { client } from '../lib/client'

function Home({ products, bannerData }){
  return(
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Produtos mais vendidos!</h2>
        <p>Os melhores alto falantes</p>
      </div>

      <div className="products-container">
          {products?.map((product) => <Product key={product.id} product={product}/>)}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]'
  const products = await client.fetch(productQuery)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: {products, bannerData}
  }
}

export default Home;
