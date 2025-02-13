import './App.css';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MyProvider, useMyContext } from './context/MyContext';
import useTokenHandler from './hooks/useTokenHandler';
import About from './pages/About';
import ChatBot from './pages/ChatBot';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import OTPassword from './pages/OTPassword';
import SignUp from './pages/SignUp';
import NavBar from './sections/NavBar';
import ForgotPassword from './pages/ForgotPassword';
import Footer from './sections/Footer';
import OTPReset from './pages/OTPReset';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Survey from './pages/Survey';

function App() {
  return (
    <MyProvider>
      <Main />
    </MyProvider>
  );
}

const Main = () => {
  const location = useLocation();
  const { isAuthenticated } = useMyContext();
  useTokenHandler();

  const hideSectionRoutes = ['/otp', '/survey'];

  useEffect(() => {
    if (isAuthenticated && location.pathname !== "/") {
      localStorage.setItem("currentPath", location.pathname);
    }
  }, [location, isAuthenticated]);

  return (
    <>
      {!isAuthenticated && !hideSectionRoutes.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path='/' element={!isAuthenticated ? <Home /> : <ChatBot />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/otp' element={<OTPassword />} />
        <Route path='/reset' element={<OTPReset />} />
        <Route path='/survey' element={<Survey />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!isAuthenticated && !hideSectionRoutes.includes(location.pathname) && <Footer />}
    </>
  )
}

export default App
