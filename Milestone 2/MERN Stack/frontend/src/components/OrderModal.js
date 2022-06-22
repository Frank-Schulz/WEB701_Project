import axios from 'axios';
import { React } from 'react'
import { Button, Modal } from 'react-bootstrap';

import { v4 as uuid } from 'uuid';

function OrderModal(userInfo, product, primaryAction, secondaryAction) {

  const makeOrder = () => {
    // Set new values
    const newProductQuantity = product.vouchers - 1;

    const userID = userInfo.email;
    const orderID = uuid();
    const productID = product.productID;

    axios.patch(`/products/update/${productID}`, newProductQuantity)

    // Update beneficiaries voucher count
    const newVouchers = { email: userInfo.email, vouchers: userInfo.vouchers - 1 }
    axios.patch(`/users/account/update_vouchers`, newVouchers)

    // Create order and token
    const newOrder = { orderID, productID }; // TODO: finished order
    const newToken = { userID, orderID }
    axios.post(`/orders/create_order`, newOrder);
    axios.post('/tokens/create_token', newToken);

    // setOrdering(false);

    alert(`Order created for ${product.name}`)
  }

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Order</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p style={{ display: 'flex', justifyContent: 'center' }} >Do you wish to claim this item?</p>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-around">
        <Button variant="primary" onClick={makeOrder}>Claim</Button>
        <Button variant="secondary" onClick={() => secondaryAction}>Cancel</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default OrderModal
