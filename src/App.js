import React from 'react';
import './App.css';
import Table from './components/Table';
import TableProvider from './context/TableProvider';
// import FetchProvider from './context/FetchProvider';

function App() {
  return (
    <TableProvider>
      <Table />
    </TableProvider>

  );
}

export default App;
