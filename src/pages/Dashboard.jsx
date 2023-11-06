import Chart from "chart.js/auto";
import { useEffect } from "react";
import { useState } from "react";

import { GiReceiveMoney } from "react-icons/gi";
import { PiUsersBold } from "react-icons/pi";
import { MdMoneyOffCsred, MdPercent } from "react-icons/md";
import { is } from "date-fns/locale";

export function Dashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 768);
    }
    );
  }
  , [window.innerWidth]);
  

  const data = [
    {
      id: 1,
      stayName: "Stay 1",
      customer: "Customer 1",
      date: "2021-09-01",
      price: 100,
      status: "PAID",
    },

    {
      id: 2,
      stayName: "Stay 2",
      customer: "Customer 2",
      date: "2021-09-02",
      price: 200,
      status: "PENDING",
    },

    {
      id: 3,
      stayName: "Stay 3",
      customer: "Customer 3",
      date: "2021-09-03",
      price: 300,
      status: "REFUNDED",
    },

    {
      id: 4,
      stayName: "Stay 4",
      customer: "Customer 4",
      date: "2021-09-04",
      price: 400,
      status: "APPROVED",
    },
  ];

  const cards = [
    {
      title: "Total sales",
      icon: <GiReceiveMoney />,
      value: "$1995.34",
      percentage: -5,
      footer: "compared to last month",
    },
    {
      title: "Total customers",
      icon: <PiUsersBold />,
      value: "1250",
      percentage: 10,
      footer: "compared to last month",
    },
    {
      title: "Refunded",
      icon: <MdMoneyOffCsred />,
      value: "34",
      percentage: -2,
      footer: "compared to last month",
    },
    {
      title: "Average revenue",
      icon: <MdPercent />,
      value: "$50.25",
      percentage: 5,
      footer: "compared to last month",
    },
  ];

  const dataset = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Fake data
    // black colors scheme
    colors: [
      "#000000", // black
      // pink
      "#FFC0CB",
      // grey
      "#808080",
    ],

    datasets: [
      {
        label: "Total sales",
        data: [10, 15, 12, 18, 14, 16], // Fake data
      },
      // {
      //   label: 'Total customers',
      //   data: [8, 10, 9, 11, 12, 10], // Fake data
      // },
      // {
      //   label: 'Refunded',
      //   data: [2, 4, 3, 2, 5, 4], // Fake data
      // },
    ],
  };

  useEffect(() => {
    const lineChart = document.getElementById("lineChart");

    new Chart(lineChart, {
      type: "line",
      data: {
        labels: dataset.labels,
        datasets: dataset.datasets.map((ds, index) => ({
          ...ds,
          borderColor: dataset.colors[index % dataset.colors.length],
          backgroundColor: dataset.colors[index % dataset.colors.length],
          fill: false,
          tension: 0.4,
          borderWidth: 2,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: true,
            },
          },
          y: {
            grid: {
              display: true,
            },
          },
        },
      },
    });
  }, []);

  return (
    // <!-- Dashboard -->
    <section className="dashboard main-layout">
      <article className="dashboard-header">
        <div className="dashboard-header-content">
          <p>Review & analyze your data</p>
        </div>
      </article>
      <article className="dashboard-content">
        <div className="dashboard-content-cards">
          {cards.map((card, index) => (
            <div className="content-card" key={index}>
              <div className="content-card-header">
                <div className="card-header-title">
                  <span>{card.title}</span>
                </div>
                <div className="card-header-icon">{card.icon}</div>
              </div>
              <div className="content-card-body">
                <div className="content-card-value">
                  <p>{card.value}</p>
                </div>
              </div>
              <div className="content-card-footer">
                <span
                  className={
                    card.percentage > 0
                      ? "positive"
                      : card.percentage < 0
                      ? "negative"
                      : "neutral"
                  }
                >
                  {card.percentage > 0 && "+"}
                  {card.percentage}%
                </span>
                <p>{card.footer}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
      <article className="dashboard-chart">
        <div className="dashboard-chart-content">
          <div className="line-chart-container">
            <h2>Sale statistics</h2>
            <canvas id="lineChart" width="600" height="200"></canvas>
          </div>

          <div className="overview-container">
            <h2>Overview</h2>
            <div className="overview-content">
              <div className="overview-content-item">
                <div className="overview-content-item-title">
                  <span>Stays in list</span>
                </div>
                <div className="overview-content-item-value">
                  <p>10</p>
                </div>
              </div>
              <div className="overview-content-item">
                <div className="overview-content-item-title">
                  <span>Total orders</span>
                </div>
                <div className="overview-content-item-value">
                  <p>122</p>
                </div>
              </div>
              <div className="overview-content-item">
                <div className="overview-content-item-title">
                  <span>Refunded</span>
                </div>
                <div className="overview-content-item-value">
                  <p>34</p>
                </div>
              </div>
              <div className="overview-content-item">
                <div className="overview-content-item-title">
                  <span>Average revenue</span>
                </div>
                <div className="overview-content-item-value">
                  <p>$50.25</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="dashboard-table">
        <div className="dashboard-table-content">
          <div className="table-header">
            <h2>Recent orders</h2>
            {/* <div className="table-header-actions">
              <button className="btn-primary">View all</button>
            </div> */}
          </div>
          <div className="table-body">
            <table>
              <thead>
                <tr>
                  {isMobile ? <th>ID</th> : <th>Order ID</th>}
                  <th>Product</th>
                  {isMobile ? null : <th>Customer</th>}
                  {isMobile ? null : <th>Date</th>}
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* render here the table rows from the data */}
                {data.map((row) => (
                  <tr key={row.id} className="table-row">
                    <td>{row.id}</td>
                    <td>{row.stayName}</td>
                    {isMobile ? null : <td>{row.customer}</td>}
                    {isMobile ? null : <td>{row.date}</td>}
                    <td>{row.price}</td>
                    <td
                      className={`status ${row.status.toLowerCase()}}`}
                      style={{
                        color:
                          row.status === "PAID"
                            ? "green"
                            : row.status === "PENDING"
                            ? "orange"
                            : row.status === "REFUNDED"
                            ? "red"
                            : "grey",
                      }}
                    >
                      {row.status}
                    </td>
                    <td>
                      <button
                        className="approve-btn"
                        onClick={() => {
                          console.log("approve");
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => {
                          console.log("reject");
                        }}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </section>
  );
}
