import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export function OrderList() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const data = useSelector((storeState) => storeState.orderModule.orders);
  console.log("data", data);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 768);
    });
  }, [window.innerWidth]);

  return (
    <section className="order-list">
      <div className="order-list-container">
        <div className="order-list-header">
          <h1>Trips</h1>
        </div>
        {!isMobile ? (
          <div className="order-list-body">
            <table className="order-list-table">
              <thead className="order-list-table-header">
                <tr className="order-list-table-row">
                  <th className="table-header destination">Destination</th>
                  <th className="table-header host">Host</th>
                  <th className="table-header checkin">Checkin</th>
                  <th className="table-header checkout">Checkout</th>
                  <th className="table-header date">Booked</th>
                  <th className="table-header price">Total Price</th>
                  <th className="table-header status">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((order) => (
                  <tr key={order._id} className="order-list-table-row">
                    <td className="table-row destination">
                      <div className="order-list-img">
                        {/* <img src={order.stay.imgUrls[0]} alt="" /> */}
                        <img
                          src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg"
                          alt=""
                        />
                      </div>
                      <div className="order-list-name">{order.stay.name}</div>
                    </td>
                    <td className="table-row host">{order.hostName}</td>
                    <td className="table-row checkin">
                      {new Date(order.checkIn).toLocaleDateString()}
                    </td>
                    <td className="table-row checkout">
                      {new Date(order.checkOut).toLocaleDateString()}
                    </td>
                    <td className="table-row date">{order.buyer.fullname}</td>
                    <td className="table-row price">${order.stay.price}</td>
                    <td className="table-row status">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="order-list-body">
            {data.map((order) => (
              <div className="order-list-table-row">
                <div className="order-list-img">
                  {/* <img src={order.stay.imgUrls[0]} alt="" /> */}
                  <img
                    src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg"
                    alt=""
                  />
                </div>
                <div className="table-row destination">
                  <div className="table-row name">{order.stay.name}</div>
                  <div className="table-row host">Host: {order.hostName}</div>
                  <div className="table-row dates flex">
                    <div className="table-row checkin">
                      Checkin: {new Date(order.checkIn).toLocaleDateString()}
                    </div>
                    <div className="table-row checkout">
                      Checkout:{" "}
                      {new Date(order.checkOut).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="table-row buyer">{order.buyer.fullname}</div>
                  <div className="table-row price">${order.stay.price}</div>
                  <div className={`table-row status ${order.status.toLowerCase()}`}
                  >{order.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
