import React, { useEffect, useState } from 'react'
import NavLink from 'react-router-dom'
import axios from 'axios'

const FeaturedProducts = () => {
    const[products,setProducts] = useState();

    useEffect(() => {
        fetchProducts();
    })

    const fetchProducts = () => {
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return(
        <div>
            <h2>Featured Products</h2>
            <div className='item-container' >
                 {products.map((product) => (
                    <div className='card' key={product.id} >
                        <img src={product.image} alt='product image' />
                        <h1>{product.title}</h1>
                        <p>INR. {product.price}</p>
                        <NavLink to= {`/product/${product.id}`} > View </NavLink>
                    </div>
                 ))}
            </div>
        </div>
    )

}   