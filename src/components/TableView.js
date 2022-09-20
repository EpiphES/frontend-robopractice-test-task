import Table from "react-bootstrap/Table"
function TableView({users, numberOfDays}) {
  const numberOfDaysArr = new Array(numberOfDays).fill(undefined).map((_, ind) => ind+1);
  

  function getInnerRowElements(user) {
    return numberOfDaysArr.map((item) => {
      const cellData = user.Days.find((day) => {
        return new Date(day.Date).getDate() === item; 
      });
      return (<td key={item}>{cellData? cellData.TimePeriod : 0}</td>) 
    })    
  }
  
  const rowElements = users.map((user) => {
    const innerRows = getInnerRowElements(user);
    return (
      <tr key={user.id}>
        <td>{user.Fullname}</td>
        {innerRows}
        <td>{user.TotalTime}</td>
      </tr>
    );
  });
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr >
          <th className="w-auto">User</th>
          {numberOfDaysArr.map((item) => <th key={item}>{item}</th>)}
          <th>Monthly</th>
        </tr>
      </thead>
      <tbody>
        {rowElements}
      </tbody>
    </Table> 
  )
}
export default TableView;