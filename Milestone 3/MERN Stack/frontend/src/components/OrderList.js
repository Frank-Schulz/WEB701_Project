import { React, useState, useEffect } from 'react'
import axios from 'axios';
import Loading from './Loading';


function OrderList({ userID, orderState }) {
  orderState = +orderState;

  const [ loading, setLoading ] = useState(null);
  const [ orders, setOrders ] = useState(null);

  const fetchTokens = async () => {
    const { data } = await axios.get(`/tokens/user/${userID}`);
    return data;
  }

  const fetchOrders = async () => {
    setLoading(true);

    const { data } = await axios.post(`/orders/filter/`, await fetchTokens())
    setOrders(data.orders);

    setLoading(null);
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  if (
    orderState < -1 ||
    orderState > 1
  ) {
    return <p className="text-danger">Error: Invalid value passed to OrderList component</p>
  }

  return (
    <>
      <p hidden>Requested order state: {orderState}</p>
      <div className="orders" style={{ "fontSize": "14px" }}>
        {loading && <Loading size={20} />}
        {orders && orders
          .filter(order => order.completed === orderState || orderState === -1)
          .map((order) => (
            <p key={order.id}>{order.id}</p>
          ))}
      </div>
    </>
  )
}

export default OrderList
