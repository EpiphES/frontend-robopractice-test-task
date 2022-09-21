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
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState(true);

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

  function changeSortOptions(key) {
    
    setSortKey(key);
    setSortDirection(prevVal => !prevVal);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [totalUsers, rowsPerPage])

  useEffect(() => {
    if(sortKey) {
           
      const sortedData = 
      sortKey === 'Fullname' ? 
      users.sort((user1, user2) => user1[sortKey]?.localeCompare(user2[sortKey])) :
      sortKey === 'TotalTime' ?
      users.sort((user1, user2) => user1[sortKey]-(user2[sortKey])) :
      users.sort((user1, user2) => {
        return (user1.Days.find(day => day.Num === +sortKey)?.TimePeriod || 0) -  (user2.Days.find(day => day.Num === +sortKey)?.TimePeriod || 0);
      })
      
      sortDirection ? setSortedUsers(sortedData) : setSortedUsers(sortedData.reverse());
      setFirstRowNumber((currentPage -1) * rowsPerPage + 1);
    }
    setLastRowNumber(currentPage * rowsPerPage > totalUsers ? totalUsers : currentPage * rowsPerPage );
    const firstRowIndex = firstRowNumber - 1;   
        
    setPaginatedUsers(sortedUsers.slice(firstRowIndex, lastRowNumber));
  }, [currentPage, firstRowNumber, lastRowNumber, rowsPerPage, sortDirection, sortKey, sortedUsers, totalUsers, users])

  return (
    <>
      <TableView
          users={paginatedUsers}
          numberOfDays={numberOfDays}
          handleSort={changeSortOptions}
          sortDirection={sortDirection}
      />
      <Container fluid="lg" className="d-flex justify-content-evenly flex-wrap fixed-bottom py-2 bg-light">
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