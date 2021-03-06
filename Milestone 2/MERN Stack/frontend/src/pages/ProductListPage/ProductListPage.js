import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen';
import ProductCard from '../../components/ProductCard';
import './ProductListPage.css';


const ProductsPage = () => {
  const navigate = useNavigate();

  const [ showAccordion, setShowAccordion ] = useState("accordion-collapse collapse");
  const [ products, setProducts ] = useState([]);
  const [ query, setQuery ] = useState('');
  const [ search, setSearch ] = useState(/\w/);
  const [ loading, setLoading ] = useState(null);
  const [ productError, setProductError ] = useState(null);

  const [ name, setName ] = useState('');
  const [ vouchers, setVouchers ] = useState(1);
  const [ description, setDescription ] = useState('');
  const [ imagePath, setImagePath ] = useState('');
  const [ stock, setStock ] = useState(0);

  const userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo).user : {
    isAdmin: false
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await axios.get('/products')
    setProducts(data);
    setLoading(null);
  }

  const toggleAccordion = () => {
    const re = /show/;
    if (re.test(showAccordion)) {
      setShowAccordion("accordion-collapse collapse");
    } else {
      setShowAccordion("accordion-collapse collapse show");
    }
  }

  const addProduct = async (e) => {
    e.preventDefault();

    setProductError(null);
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const product = { name, vouchers, description, imagePath, stock }
      const { data } = await axios.post('/products/add_product', product, config);

      setLoading(false);

      navigate(`/products/` + data.id);

    } catch (addressError) {
      setProductError(addressError.response.data.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <MainScreen title="Products Page" className="page products-page">
      {userInfo.type === "member" && (
        <div className="accordion-item mb-3">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" onClick={toggleAccordion} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Add product
            </button>
          </h2>
          <div id="collapseOne" className={showAccordion} aria-labelledby="headingOne" data-bs-parent="#accordionExample" style={{}}>
            <div className="accordion-body">
              {productError && <ErrorMessage variant="danger">{productError}</ErrorMessage>}
              <Form onSubmit={addProduct}>
                <div className="form-group">
                  <div className="form-floating mb-3">
                    <input className="form-control" id="floatingName" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="floatingName">Product Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input className="form-control" id="floatingName" placeholder="Voucher Cost" value={vouchers} onChange={(e) => setVouchers(e.target.value)} />
                    <label htmlFor="floatingName">Voucher Cost</label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea className="form-control" id="description" placeholder="Description" value={description} rows="3" onChange={(e) => setDescription(e.target.value)}></textarea>
                    <label htmlFor="description" className="form-label">Description</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input className="form-control" id="floatingDesc" placeholder="Image Path" value={imagePath} onChange={(e) => setImagePath(e.target.value)} />
                    <label htmlFor="floatingDesc">Image Path</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input className="form-control" id="floatingStock" placeholder="Amount in stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                    <label htmlFor="floatingStock">Amount in stock</label>
                  </div>

                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </div>
              </Form>

            </div>
          </div>
        </div>
      )}
      <div className="row justify-content-center mb-3">
        <div className="col-12 col-md-10 col-lg-8">
          <Form className="card card-sm"
            onSubmit={(e) => {
              e.preventDefault();
              setSearch(new RegExp(query, 'ig'));
            }}>
            <div className="card-body row no-gutters align-items-center" style={{ padding: "10px" }}>
              <div className="col">
                <input
                  id="search"
                  className="form-control form-control-lg form-control-borderless"
                  type="search"
                  onChange={(e) => { setQuery(e.target.value.replaceAll(' ', '|')) }}
                  placeholder="Search topics or keywords" />
              </div>
              <div className="col-auto">
                <button className="btn btn-lg btn-success" type="submit">Search</button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div className="products">
        {loading && <Loading />}
        {products && products
          .filter(product => search.test(product.name))
          .map((product) => ( // TODO: maybe consolidate this in ProductCard
            <Card style={{ width: '18rem' }} key={product.id} hidden={product.stock < 1}>
              <ProductCard userInfo={localStorage.userInfo ? JSON.parse(localStorage.userInfo).user : null} product={product} />
            </Card>
          ))}
      </div>
    </MainScreen >
  )
}

export default ProductsPage;
