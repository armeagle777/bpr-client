import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '../footer/Footer';
import Header from '../header/Header';

const Layout = () => {
    return (
        <div className='App'>
            <Header />
            <main>
                <Outlet />
                <ToastContainer
                    position='top-right'
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                    theme='light'
                />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
