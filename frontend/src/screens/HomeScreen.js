import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useParams, Link } from 'react-router-dom'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
// we got rid of component state of products and fetching products using axios get api
//instead we import useDispatch and useSelector:
// So that'll be used to dispatch or call in action
// useSelecter, which is used to select parts of the state.

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams()
  const pageNum = pageNumber ? parseInt(pageNumber) : 1
  const dispatch = useDispatch()

  //here what you are getting is w hatever from the store, which is productList
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNum))
  }, [dispatch, keyword, pageNum])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              // here is setting on different sizes of the screen how many columns it takes
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          ></Paginate>
        </>
      )}
    </>
  )
}

export default HomeScreen
