import { useSelector } from "react-redux";

export function OrderList() {
  const data = useSelector((storeState) => storeState.orderModule.orders);
  console.log("data", data);

  return (
    <section className="order-list">
      <div className="order-list-container">
        <div className="order-list-header">
          <h1>Order List</h1>
        </div>
        <div className="order-list-body">
          <table className="order-list-table">
            <thead className="order-list-table-header">
              <tr className="order-list-table-row">
                <th className="table-header destination"
                >Destination</th>
                <th className="table-header host"
                >Host</th>
                <th className="table-header checkin"
                >Checkin</th>
                <th className="table-header checkout"
                >Checkout</th>
                <th className="table-header date"
                >Booked</th>
                <th className="table-header price"
                >Total Price</th>
                <th className="table-header status"
                >Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id} className="order-list-table-row">
                  <td className="table-row destination"
                  >
                    <div className="order-list-img">
                      {/* <img src={order.stay.imgUrls[0]} alt="" /> */}
                      <img src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg" alt="" />
                    </div>
                    <div className="order-list-name">
                    {order.stay.name}
                    </div>
                    </td>
                  <td className="table-row host"
                  >{order.hostName}</td>
                  <td className="table-row checkin"
                  >{new Date(order.checkIn).toLocaleDateString()}</td>
                  <td className="table-row checkout"
                  >{new Date(order.checkOut).toLocaleDateString()}</td>
                  <td className="table-row date"
                  >{order.buyer.fullname}</td>
                  <td className="table-row price"
                  >${order.stay.price}</td>
                  <td className="table-row status"
                  >{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
