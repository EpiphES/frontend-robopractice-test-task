import Table from "react-bootstrap/Table"
function TableView({users, numberOfDays}) {
  return (
    <Table responsive >
      {/* <thead className="sticky-top bg-light">
        <tr >
          <th style={{position: "sticky", left: "0" }} className="bg-light">User</th>
          {new Array(days).fill(undefined).map((item,ind) => <th className="" key={ind}>{ind + 1}</th>)}
          <th style={{position: "sticky", right: "0" }} className="bg-light">Monthly total</th>
        </tr>
      </thead>
      <tbody>
        {rowElements}
      </tbody> */}
    </Table> 
  )
}
export default TableView;