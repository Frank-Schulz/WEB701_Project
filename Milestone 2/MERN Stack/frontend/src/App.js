import { React } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import NotImplemented from './pages/NotImplemented/NotImplemented';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './pages/LandingPage/LandingPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductPage from './pages/ProductPage/ProductPage';
import LoginScreen from './pages/LoginPage/LoginPage';
import RegisterScreen from './pages/RegisterPage/RegisterPage';
import AccountPage from './pages/ProfilePage/ProfilePage';

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<NotImplemented />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
