import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';


function Layout() {
    const location = useLocation();

    return (
        <>
            {/* Show Header only on frontend pages */}
            <Header />

            <main>
                <Outlet />
            </main>

            {/* Show Footer only on frontend pages */}
            <Footer/>
        </>
    );
}

export default Layout;
