
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GamePage from './Pages/GamePage/GamePage';
import HomePage from './Pages/HomePage/HomePage';
import LossPage from './Pages/LossPage/LossPage';
import HighScoresPage from './Pages/HighScoresPage/HighScoresPage';
import Header from './components/Header/Header';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/play' element={<GamePage/>}></Route>
        <Route path='/loss' element={<LossPage/>}/>
        <Route path='/hall-of-fame' element={<HighScoresPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App