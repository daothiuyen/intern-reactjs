import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './component/Header';
import TableUsers from './component/TableUsers';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Home from './component/Home';
import { Routes, Route, Link } from 'react-router-dom';
function App() {

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
  }
  return (
    <>
      <div className='app-container'>

        <Container >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} /> {/* 👈 Renders at /app/ */}
            <Route path="/users" element={<TableUsers />} />
          </Routes>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>

  );
}

export default App;
