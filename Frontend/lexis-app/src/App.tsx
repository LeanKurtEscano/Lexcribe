import { Route, Routes} from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'

import NotFound from './pages/NotFound'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

import { MyProvider } from './context/MyContext'


function App() {

  return (

    <MyProvider>
        <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />

    </MyProvider>
    
    
  )
}

export default App
