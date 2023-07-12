import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./pages/Home";
import Header from "./components/Header";
import Todos from "./pages/Todos";
import TodoProvider from "./context/TodoProvider";


function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={
          <TodoProvider>
          <Todos />
          </TodoProvider>
        }>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
