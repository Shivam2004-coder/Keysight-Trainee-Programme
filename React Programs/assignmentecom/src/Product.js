import React, { useEffect, useState } from 'react'
import NavLink from 'react-router-dom'
import axios from 'axios'

const Product = () => {
    const[data,setData] = useState();

    useEffect(() => {
        fetchProducts();
    })

    const fetchProducts = () => {
        axios.get(`https://fakestoreapi.com/products/?id=${match.params.id}`)
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
            {data.map}
        </div>
    )

}   