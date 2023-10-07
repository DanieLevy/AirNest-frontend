import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTable } from 'react-table'

export function OrderList() {
  const data = useSelector((storeState) => storeState.orderModule.orders)

  console.log('🚀 ~ file: OrderList.jsx:8 ~ OrderList ~ orders:', data)

  //   const orders = useMemo(
  //     () => [
  //       {
  //         itemName: 'Laptop',
  //         quantity: 1,
  //         price: 1000,
  //         startDate: new Date('2023-10-05').getTime(),
  //         endDate: new Date('2023-10-07').getTime(),
  //       },
  //     ],
  //     []
  //   )

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'stay.name',
      },
      {
        Header: 'Price per Night',
        accessor: 'stay.price',
        Cell: ({ value }) => `$${value.toFixed(2)}`,
      },
      {
        Header: 'Host Id',
        accessor: 'hostId',
      },
      {
        Header: 'Start Date',
        accessor: 'startDate',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: 'End Date',
        accessor: 'endDate',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: 'Total Price',
        accessor: 'totalPrice',
        Cell: ({ row }) => {
          const checkInDate = new Date(row.original.startDate)
          const checkOutDate = new Date(row.original.endDate)
          const differenceInTime = checkOutDate.getTime() - checkInDate.getTime()
          let differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))

          if (differenceInDays === 0) {
            differenceInDays = 1
          }

          const total = differenceInDays * row.original.stay.price
          return `$${total.toFixed(2)}`
        },
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

  return (
    <div>
      <h1>My Orders</h1>
      <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{ borderBottom: 'solid 2px black', background: 'aliceblue', color: 'black', fontWeight: 'bold' }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ padding: '10px', border: 'solid 1px gray' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
