import { React } from 'react';
import { Card } from 'react-bootstrap';
import { FaChevronRight } from "react-icons/fa";

const ProductCard = ({ userInfo, product, cart }) => {

  return (
    <>
      <div style={{ height: "108px", overflow: "hidden" }}>
        <Card.Img variant="top" src={product.imagePath} />
      </div>
      <div style={{ display: "flex", position: "absolute", top: "108px" }}>
        {product.stock && <span className="badge bg-success">{product.stock} In Stock</span>}
      </div>
      <Card.Body>
        <Card.Title style={{ marginTop: "2px", fontSize: "20px"}}>{product.name}</Card.Title>
        <Card.Text style={{fontSize: "14px"}}>
          {`${product.description.substring(0, 70)}...`}
        </Card.Text>
        <div>
          <div style={{ "float": "right", height: "20px", "marginTop": "5px" }}>
            <a
              href={`/products/${product.id}`}
              className='orange-text d-flex justify-content-end align-items-center'
            >
              <h6 style={{ margin: 0 }}>
                Read more <FaChevronRight />
              </h6>
            </a>
          </div>
        </div>
      </Card.Body>
    </>
  )
}

export default ProductCard;
