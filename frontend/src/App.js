// fronted/src/App
import React from 'react';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import RegisterPage from './RegisterPage';
import Register2Page from './Register2Page';
import Register3Page from './Register3Page';
import HomePage from './HomePage';
import TaskPage from './TaskPage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<HomePage/>}></Route>
        <Route path='/registerPage' element={<RegisterPage/>}></Route>
        <Route path='/register2Page' element={<Register2Page/>}></Route>
        <Route path='/register3Page' element={<Register3Page/>}></Route>
        <Route path='/HomePage'element={<HomePage/>}></Route>
        <Route path='/taskPage'element={<TaskPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
