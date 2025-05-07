import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { CartProvider } from './header/CartContext.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// Frontend Layout pages 
import Layout from './Layout.jsx'
import Comingsoon from './pages/Comingsoon.jsx';
import Index from './pages/Index.jsx';
import Products from './pages/Products.jsx';
import Productdetails from './pages/Productdetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Review from './pages/Review.jsx';


// Dashboard Layout pages 
import DashboardLayout from './client/layout/DashboardLayout.jsx';
import Overview from './client/pages/Overview.jsx';
import Mainslider from './client/pages/Mainslider.jsx';
import Menus from './client/pages/Menus.jsx';

import CreateCollection from './client/pages/collections/CreateCollection.jsx';
import ListCollection from './client/pages/collections/ListCollection.jsx';
import Editcollection from './client/pages/collections/Editcollection.jsx';


import Listproducts from './client/pages/products/Listproducts.jsx';
import Addproduct from './client/pages/products/Addproduct.jsx';
import Editproduct from './client/pages/products/Editproduct.jsx';
import Orders from './client/pages/orders/Orders.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,  // Frontend Layout
    children: [
      { path: "/", element: <Index /> },
      { path: "/collection/:slug", element: <Products /> },
      // { path: "productdetails", element: <Productdetails /> },
      { path: "/product/:id", element: <Productdetails /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout/> },
      { path: "review", element: <Review /> },
      { path: "/", element: <Comingsoon /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />, // Dashboard Layout
    children: [
      { path: "overview", element: <Overview /> },  // ✅ Relative path
      { path: "menus", element: <Menus /> },

      { path: "mainslider", element: <Mainslider /> },

      { path: "listproducts", element: <Listproducts /> },
      { path: "addproducts", element: <Addproduct /> },
      { path: "editproduct/:id", element: <Editproduct /> },

      { path: "listcollections", element: <ListCollection /> },
      { path: "createcollection", element: <CreateCollection /> },
      { path: "editcollection/:id", element: <Editcollection /> },

      { path: "orders", element: <Orders/> },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
)
