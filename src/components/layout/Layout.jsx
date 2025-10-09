import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import { useTheme } from '@emotion/react';
import { THEME_MODS } from '../../utils/constants';

const Layout = () => {
  const theme = useTheme();

  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme={theme.palette.mode === THEME_MODS.LIGHT ? THEME_MODS.LIGHT : THEME_MODS.DARK}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
