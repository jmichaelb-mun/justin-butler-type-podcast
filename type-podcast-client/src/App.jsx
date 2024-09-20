
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GamePage from './Pages/GamePage/GamePage';
import HomePage from './Pages/HomePage/HomePage';
import LossPage from './Pages/LossPage/LossPage';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/play' element={<GamePage/>}></Route>
        <Route path='/loss' element={<LossPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App