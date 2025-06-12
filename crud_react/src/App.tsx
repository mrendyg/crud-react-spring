import './App.css'
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import CreatePage from './pages/CreatePage';
import ListPage from './pages/ListPage'
import UpdatePage from './pages/UpdatePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListPage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/update/:id' element={<UpdatePage />} />
  
      </Routes>
   
    </BrowserRouter>
  );
}

export default App