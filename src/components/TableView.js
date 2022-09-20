import Table from "react-bootstrap/Table"
function TableView({users, numberOfDays}) {
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr >
          <th>User</th>
          {new Array(numberOfDays).fill(undefined).map((_, ind) => <th className="" key={ind}>{ind + 1}</th>)}
          <th>Monthly</th>
        </tr>
      </thead>
      {/* <tbody>
        {rowElements}
      </tbody> */}
    </Table> 
  )
}
export default TableView;