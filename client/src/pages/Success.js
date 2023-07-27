import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { userRequest } from '../requestMethods'
import { useDispatch } from 'react-redux';
import { resetCart } from '../redux/cartRedux';

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/order", {
            userId: currentUser._id,
            products: cart.products?.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
        dispatch(resetCart());
      } catch(e) {
        console.log(e);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser, dispatch]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>
  );
};

export default Success;