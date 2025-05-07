import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import logo from '../../assets/images/Logo.png';
import overview from '../../assets/icons/overview.png';
import cart from '../../assets/icons/shopping-cart.png';
import store from '../../assets/icons/store.png';
import customers from '../../assets/icons/customers.png';
import content from '../../assets/icons/content.png';
import discount from '../../assets/icons/discount.png';
import setting from '../../assets/icons/setting.png';
import Products from '../pages/products/Listproducts';

function DashboardLayout() {
    const [isProdutctsOpen, setIsProdutctsOpen] = useState(false);
    const [isContentOpen, setIsContentOpen] = useState(false);

    return (
        <main className="flex">
            {/* Sidebar */}
            <section className="bg-[#1C2536] w-[20%]">
                <div className="border-b border-b-[#323a49] border-solid pb-5 p-[25px]">
                    <img src={logo} alt="logo" />
                    <div className="bg-[#2A303D] p-[15px] mt-[15px] rounded-[10px]">
                        <h1 className="text-[#fff] text-[20px]">Welcome Yugantor</h1>
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <aside className="p-[25px]">
                    <nav>
                        <ul>

                            <li className="mb-4">
                                <NavLink to="overview" className="text-[#fff] flex gap-[10px]">
                                    <img src={overview} className="max-w-[26px]" alt="Overview" />
                                    Overview
                                </NavLink>
                            </li>

                            <li className="mb-4">
                                <NavLink to="orders" className="text-[#fff] flex gap-[10px]">
                                    <img src={store} alt="Orders" className="max-w-[26px]" />
                                    Orders
                                </NavLink>
                            </li>

                            <li className="mb-4">
                                <NavLink to="listproducts"
                                    className="text-[#fff] flex gap-[10px] w-full text-left"
                                    onClick={() => setIsProdutctsOpen(!isProdutctsOpen)}
                                >
                                    <img src={cart} alt="Customers" className="max-w-[26px]" />
                                    Product
                                </NavLink>

                                {isProdutctsOpen && (
                                    <ul className="ml-[40px] mt-[10px]">
                                        <li className="mb-[10px]">
                                            <NavLink to="mainslider" className="text-[#fff]">Hero Slider</NavLink>
                                        </li>
                                        <li className="mb-[10px]">
                                            <NavLink to="listcollections" className="text-[#fff]">Collections</NavLink>
                                        </li>
                                    </ul>
                                )}

                            </li>

                            <li className="mb-4">
                                <NavLink to="#" className="text-[#fff] flex gap-[10px]">
                                    <img src={customers} alt="Setting" className="max-w-[26px]" />
                                    Customers
                                </NavLink>
                            </li>

                            <li className="mb-4">
                                <button
                                    className="text-[#fff] flex gap-[10px] w-full text-left"
                                    onClick={() => setIsContentOpen(!isContentOpen)}
                                >
                                    <img src={content} alt="Content" className="max-w-[26px]" />
                                    Content
                                </button>
                                {isContentOpen && (
                                    <ul className="ml-[40px] mt-[10px]">
                                        <li className="mb-[10px]">
                                            <NavLink to="menus" className="text-[#fff]">Menus</NavLink>
                                        </li>
                                    </ul>
                                )}
                            </li>

                            <li className="mb-4">
                                <NavLink to="#" className="text-[#fff] flex gap-[10px]">
                                    <img src={discount} alt="Discount" className="max-w-[26px] h-[26px]" />
                                    CouponCode Generate
                                </NavLink>
                            </li>

                            <li className="mb-4">
                                <NavLink to="#" className="text-[#fff] flex gap-[10px]">
                                    <img src={setting} alt="Setting" className="max-w-[26px]" />
                                    Setting
                                </NavLink>
                            </li>

                        </ul>
                    </nav>
                </aside>
            </section>

            {/* Right Side Content */}

            <section className="w-[80%]">
                <header className="px-[30px] py-[25px] border-b border-b-[#dcdcdc] border-solid">
                    <div className="flex justify-between">
                        <div className="w-[40%]">
                            <input type="text" className="w-full border border-[#b9b9b9] border-solid py-[7px] px-[15px] rounded-[15px]" placeholder="Search" />
                        </div>
                        <div className="w-[40%]"></div>
                    </div>
                </header>

                <div className="p-[30px]">
                    <Outlet />  {/* ✅ This will render the selected page */}
                </div>
            </section>
        </main>
    );
}

export default DashboardLayout;
