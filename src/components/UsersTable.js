import { useState, useEffect } from 'react';
import TableView from './TableView';
function UsersTable({users, numberOfDays}) {
  const [sortedUsers, setSortedUsers] = useState(users);
  const [paginatedUsers, setPaginatedUsers] = useState(sortedUsers);
  const [rowsPerPage, setRowsPerPage]= useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / rowsPerPage);

  return (
    <>
      <TableView
          users={paginatedUsers}
          numberOfDays={numberOfDays}
      />
      
    
    </>
  );
}
export default UsersTable;