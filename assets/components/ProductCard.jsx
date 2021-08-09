import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { loadProduct } from '../app'

const ProductCard = ({product}) => {

    useEffect(()=> loadProduct(product),[])

    return (
    <div className="col-6 col-lg-4 p-0 mb-1">
            <div className="card h-100">
                <div className="card-img d-flex justify-content-center">
                    <Link to={{pathname: product.url, state: product}}>
                    <img style={{height:'150px'}} src={product.imageUrl} className="img-fluid" />
                    </Link>
                </div>
                <div className="card-body d-flex flex-column">
                    <Link className="card-title" to={{pathname: product.url, state: product}}>
                    <h5 style={{color:'#5f5f5f'}} className="card-title text-center">{product.title}</h5>
                    </Link>
                    <p style={{fontSize:'12px', color:'#5f5f5f'}}>{product.shortDescription}</p>
                    <div className="h-100"></div>
                    <div style={{height:'35px'}} className="price-box d-flex justify-content-between align-items-center mb-3">
                        <span style={{color:'#5f5f5f'}} className="fs-4 price fw-bold"></span>
                        <span style={{fontSize:'x-small'}} className="text-muted vat"></span>
                    </div>
                    <div style={{height:'42px'}} className="btn-box d-flex align-items-end">
                        <Link className="card-btn" style={{textDecoration:'none'}} to={{pathname: product.url, state: product}}>
                        Lue lisää
                        </Link>
                    </div>
                    <div style={{color:'green', fontSize:'12px', height:'18px'}} className="mt-3 in-store-box">
                        <i style={{opacity:'0', transition: '0.5s ease-in'}} className="in-store-circle"></i>
                        <span style={{opacity:'0', transition: '0.5s ease-in'}} className="in-store"></span>
                    </div>
                </div>
            </div>
        </div>
)
    }

export default ProductCard