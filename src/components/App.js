import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import api from '../utils/api';
import Button from 'react-bootstrap/Button';

import closeIcon from '../images/close.svg';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState(users);

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  function loadUsersData() {
    api.getUsersData()
    .then(data => {
      setUsers(data);
    })
    .catch(err => console.log(err));
  }
  
  function resetInput() {
    setSearchQuery("");
  }
  
  useEffect(() => {
    loadUsersData();
  }, [])

  useEffect(() => {
    setSearchedUsers(users.filter(user => user.Fullname.toLowerCase().includes(searchQuery.toLowerCase()))
    );       
  },[users, searchQuery]); 
  
  console.log(searchedUsers);

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
            <img src={closeIcon} alt="left arrow icon" centered />
          </Button>
        </InputGroup>       
      </Container>     
    </div>
  );

}

export default App