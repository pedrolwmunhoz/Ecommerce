import React, { useState } from 'react'
import { client, urlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Product  from '../../components/Product'
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, productSimilar }) => {
    const { image, name, details, price } = product
    const [index, setIndex] = useState(0)
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[index])} className="product-detail-image"/>
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => (
                            <img
                                key={i}
                                src={urlFor(item)}
                                className={i == index ? 'small-image selected-image':'small-image'}
                                onMouseEnter={() => setIndex(i)}>
                            </img>
                        ))}
                    </div>
                </div>
                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiOutlineStar/>
                        </div>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decQty}>
                                <AiOutlineMinus/>
                            </span>
                            <span className="num" onClick="">
                                {qty}
                            </span>
                            <span className="plus" onClick={incQty}>
                                <AiOutlinePlus/>
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={()=> onAdd(product, qty)}>Add to Cart</button>
                        <button type="button" className="buy-now" onClick="">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="maylike-products-wrapper">
                <h2>Produtos semelhantes</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {productSimilar.map((item) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}
export const getStaticPaths = async () => {
    const query = `*[_type == "product"]{
        slug {
            current
        }
    }`
    const products = await client.fetch(query)
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));
    return{
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
    const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`
    const product = await client.fetch(productQuery)

    const productSimilarQuery = '*[_type == "product"]'
    const productSimilar = await client.fetch(productSimilarQuery)


    return {
      props: {product, productSimilar}
    }
  }

export default ProductDetails
