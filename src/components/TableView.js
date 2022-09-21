import { Image } from "react-bootstrap";
import Table from "react-bootstrap/Table"
import upArrowIcon from '../images/chevron-up.svg';
import downArrowIcon from '../images/chevron-down.svg';

function TableView({users, numberOfDays, handleSort, sortDirection }) {
  const numberOfDaysArr = new Array(numberOfDays).fill(undefined).map((_, ind) => ind+1);
  

  function getInnerRowElements(user) {
    return numberOfDaysArr.map((item) => {
      const cellData = user.Days.find((day) => {
        return day.Num === item; 
      });
      return (<td key={item} >{cellData? convertMinutesToTimeString(cellData.TimePeriod) : 0}</td>) 
    })    
  }
  
  const rowElements = users.map((user) => {
    const innerRows = getInnerRowElements(user);
    return (
      <tr key={user.id}>
        <td 
        style={{position: "sticky", left: "0"}} className="bg-light"
        
        >
          {user.Fullname}
        </td>
        {innerRows}
        <td style={{position: "sticky", right: "0" }} className="bg-light">
          {convertMinutesToTimeString(user.TotalTime)}</td>
      </tr>
    );
  });

  function onNameClick() {
    handleSort('Fullname');
  }

  function onMonthlyClick() {
    handleSort('TotalTime')
  }

  function onDateClick(e) {
    handleSort(e.target.textContent)
  }

  function convertMinutesToTimeString(numberOfMinutes) {
    const minutes = numberOfMinutes % 60
    const hours = (numberOfMinutes - minutes) / 60
    return `${hours}:${minutes}`
  }  


  return (
    <Table responsive striped bordered hover  className="align-middle" style={{marginBottom: "20px"}}>
      <thead>
        <tr >
          <th 
          style={{position: "sticky", left: "0"}} className="bg-light"
          onClick={onNameClick}
          >
            User 
            { sortDirection ?
              <Image src={downArrowIcon} alt="up arrow icon" className="ms-3"/> 
              : <Image src={upArrowIcon} alt="up arrow icon" className="ms-3"/>
            }            
          </th>
          {numberOfDaysArr.map((item) => <th key={item} onClick={onDateClick}>{item}</th>)}
          <th 
          style={{position: "sticky", right: "0" }} className="bg-light"
          onClick={onMonthlyClick}
          >Monthly</th>
        </tr>
      </thead>
      <tbody>
        {rowElements}
      </tbody>
    </Table> 
  )
}
export default TableView;