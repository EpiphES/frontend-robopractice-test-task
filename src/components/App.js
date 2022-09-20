import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import api from '../utils/api';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';

import closeIcon from '../images/close.svg';

import UsersTable from './UsersTable';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState(users);
  const [numberOfDays, setNumberOfDays] = useState(0);

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  function loadData() {
    api.getUsersData()
    .then(data => {
      data.map((user) => {
      const totalTimeInt = user.Days.reduce((prevVal, day) => {
        const startTime = convertTimeToMinutes(day.Start);
        const endTime = convertTimeToMinutes(day.End);
        const interval = endTime - startTime;     
        day.TimePeriod = convertMinutesToTimeString(interval);
        return prevVal += interval;
      }, 0);
      return user.TotalTime = convertMinutesToTimeString(totalTimeInt);
      })

      setUsers(data);
      const daysInMonth = getNumberOfDays(data)
      setNumberOfDays(daysInMonth);      
    })
    .catch(err => console.log(err));
  }

  function getNumberOfDays(data) {
    const [year, month, day] = data[0].Days[0].Date.split('-');
    return new Date(+year, +month, 0).getDate();    
  }
  
  function resetInput() {
    setSearchQuery("");
  }

  function convertTimeToMinutes(timeString) {
    const [hours, minutes] = timeString.split('-');
    return +hours * 60 + (+minutes);
  }
  
  function convertMinutesToTimeString(numberOfMinutes) {
    const minutes = numberOfMinutes % 60
    const hours = (numberOfMinutes - minutes) / 60
    return `${hours}:${minutes}`
  }

  
  
  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    setSearchedUsers(users.filter(user => user.Fullname.toLowerCase().includes(searchQuery.toLowerCase()))
    );       
  },[users, searchQuery]); 

  return (
    <div className="App">
      <Container fluid="lg" className="py-3">
        <InputGroup className="mb-3 w-50" size="sm">
          <Form.Control
                type="text"
                placeholder="Search users"
                name="search"
                id="search-input"
                value={searchQuery}
                onInput={(e) => handleInputChange(e)}
          />
          
          <Button 
            variant="outline-secondary" aria-label="reset input"
            onClick={() => resetInput()}
          >
            <Image src={closeIcon} alt="close icon" fluid />
          </Button>
        </InputGroup>

        {
          searchedUsers.length > 0 
          ? <UsersTable
          users={searchedUsers}
          numberOfDays={numberOfDays}
          /> 
          : <Alert variant='primary'>
          No Users Found
        </Alert>
        }
      </Container>     
    </div>
  );

}

export default App;