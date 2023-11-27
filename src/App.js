import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './component/Header';
import TableUsers from './component/TableUsers';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
function App() {

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
  }
  return (
    <>
      <div className='app-container'>
        <Header />
        <Container >
          <TableUsers />
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
