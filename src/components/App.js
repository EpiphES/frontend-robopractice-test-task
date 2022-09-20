import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import api from '../utils/api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  api.getUsersData()
    .then(res => console.log(res))
    .catch(err => console.log(err));

  return (
    <div className="App">
      <Container fluid="md" className="py-3">
        <Form.Control
              type="text"
              placeholder="Search users"
              name="search"
              id="search-input"
              value={searchQuery}
              onInput={(e) => handleInputChange(e)}
            />
      </Container>
      
    </div>
  );

}

export default App