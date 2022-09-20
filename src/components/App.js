import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import api from '../utils/api';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image'

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
  
  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    setSearchedUsers(users.filter(user => user.Fullname.toLowerCase().includes(searchQuery.toLowerCase()))
    );       
  },[users, searchQuery]); 
  
  return (
    <div className="App">
      <Container fluid="md" className="py-3">
        <InputGroup className="mb-3">
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
            <Image src={closeIcon} alt="left arrow icon" fluid />
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

export default App