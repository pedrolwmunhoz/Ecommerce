import React from 'react'
import Link from 'next/link';
import { urlFor } from '../lib/client'

function FooterBanner( { footerBanner: { discount, largeText2, largeText3, saleTime,
  smallText, midText, desc2, product, buttonText, image} }) {
  return (
    <div className="footer-banner-container">
      <div className= "banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText2}</h3>
          <h3>{largeText3 }</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc2}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
        <img src={urlFor(image)} width={500} height={500} className="footer-banner-image"></img>
      </div>
    </div>
  )
}

export default FooterBanner;
