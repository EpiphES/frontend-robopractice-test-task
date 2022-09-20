import { useState, useEffect } from 'react';

import TableView from './TableView';

import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

function UsersTable({users, numberOfDays}) {
  const [sortedUsers, setSortedUsers] = useState(users);
  const [paginatedUsers, setPaginatedUsers] = useState(sortedUsers);
  const [rowsPerPage, setRowsPerPage]= useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / rowsPerPage);

  const [firstRowNumber, setFirstRowNumber] = useState(1);
  const [lastRowNumber, setLastRowNumber] = useState(10);

  function onPreviousClick() {
    setCurrentPage((prevState) => prevState - 1);
  }

  function onNextClick() {
    setCurrentPage((prevState) => prevState + 1);
  }

  function toFirstClick() {
    setCurrentPage(1);
  }

  function onLastClick() {
    setCurrentPage(totalPages);
  }

  function changeRowsPerPage(e) {
    setRowsPerPage(+e.target.value);
  }

  useEffect(() => {
    
    setFirstRowNumber((currentPage -1) * rowsPerPage + 1);
    setLastRowNumber(currentPage * rowsPerPage > totalUsers ? totalUsers : currentPage * rowsPerPage );
    const firstRowIndex = firstRowNumber - 1;
    
    setSortedUsers(users);
        
    setPaginatedUsers(sortedUsers.slice(firstRowIndex, lastRowNumber));
    
  }, [users, sortedUsers, currentPage, rowsPerPage, firstRowNumber, lastRowNumber, totalUsers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [totalUsers, rowsPerPage])

  
  return (
    <>
      <TableView
          users={paginatedUsers}
          numberOfDays={numberOfDays}
      />
      <Container fluid="lg" className="d-flex justify-content-evenly flex-wrap fixed-bottom pb-3">
        <div className="d-flex">
          <span className='px-3 align-self-center '>Rows per page:</span>
          <Form.Select aria-label="rows per page select" onChange={changeRowsPerPage} className="w-auto me-3" size="sm">
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </Form.Select>
        </div>
      <Pagination size="sm m-0">
          
          <Pagination.First 
            disabled={currentPage === 1}
            onClick={toFirstClick}
          />
          <Pagination.Prev 
            disabled={currentPage === 1}
            onClick={onPreviousClick}
          />
          <span className='px-3 align-self-center '>
            {firstRowNumber} - {lastRowNumber} of {totalUsers}
          </span>
          <Pagination.Next 
            disabled={currentPage === totalPages}
            onClick={onNextClick}
          />
          <Pagination.Last 
            disabled={currentPage === totalPages}
            onClick={onLastClick}
          />
        </Pagination> 
        </Container>  
    </>
  );
}
export default UsersTable;