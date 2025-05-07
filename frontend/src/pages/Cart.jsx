import React, { useContext } from 'react';
import { CartContext } from '../header/CartContext';
import { Link } from 'react-router-dom';
import emptyCart from '../assets/icons/empty-cart.png';
import '../App.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleDecrease = (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    if (item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    }
  };

  const handleIncrease = (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    updateQuantity(productId, item.quantity + 1);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateGST = () => {
    return calculateTotalPrice() * 0.03;
  };

  // GST included 
  const calculateFinalAmount = () => {
    return calculateTotalPrice() + calculateGST();
  };

  return (
    <section className='px-[20px] py-[20px]'>
      {cartItems.length > 0 ? (
        <div className='w-full flex justify-between'>
          {/* Cart Items */}
          <div className='w-[58%] h-[90%]'>
            {cartItems.map((item) => (
              <article key={item.productId} className='flex gap-6 mb-5 border border-[#dbdbdb] p-[25px]'>
                <div className='w-[20%]'>
                  <img src={`https://my-yugantar-store.onrender.com${item.image}`} alt={item.title} className="w-full h-36 object-cover" />
                </div>

                <div>
                  <h2 className='text-[21px]'>{item.title}</h2>
                  <p className='text-[18px] leading-[26px] my-2'>₹ {item.price}</p>

                  {/* Quantity Control */}
                  <div className='flex mt-6 gap-4'>
                    <div className="flex items-center qty-container">
                      <button
                        className="qty-btn-minus bg-gray-200 px-2 py-1 hover:bg-gray-300"
                        type="button"
                        onClick={() => handleDecrease(item.productId)}
                      >
                        <i className="fa-solid fa-minus text-[13px]"></i>
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="input-qty w-10 h-8 text-center border border-none bg-gray-200 py-2"
                      />
                      <button
                        className="qty-btn-plus bg-gray-200 px-2 py-1 hover:bg-gray-300"
                        type="button"
                        onClick={() => handleIncrease(item.productId)}
                      >
                        <i className="fa-solid fa-plus text-[13px]"></i>
                      </button>
                    </div>

                    {/* Remove from Cart */}
                    <button
                      className='bg-gray-200 flex items-center justify-center py-1 px-2 cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-200'
                      onClick={() => removeFromCart(item.productId)}
                    >
                      <i className="fa-solid fa-trash text-[14px]"></i>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Order Summary */}
          <div className='w-[40%]'>
            <div className='w-full border border-[#dbdbdb] p-[25px]'>
              <h1 className='text-[20px] font-semibold mb-4'>Order Summary</h1>

              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <h2 className='text-[16px]'>Price</h2>
                  <p>₹ {calculateTotalPrice()}</p>
                </div>
                <div className='flex justify-between'>
                  <h2 className='text-[16px]'>GST 3%</h2>
                  <p>₹ {(calculateTotalPrice() * 0.03).toFixed(2)}</p>
                </div>
                <div className='flex justify-between'>
                  <h2 className='text-[16px]'>Discount 0%</h2>
                  <p>₹ 0.00</p>
                </div>
                <div className='flex justify-between'>
                  <h2 className='text-[16px] font-semibold'>Total Price</h2>
                  <p className='font-semibold'>₹ {calculateTotalPrice()}</p>
                </div>
              </div>

              {/* Final amount row */}
              <div className='flex justify-between mt-4 border-t pt-2'>
                <h1 className='text-[18px] font-bold'>Amount to pay</h1>
                <p className='text-[18px] font-bold'>₹ {calculateFinalAmount().toFixed(2)}</p>
              </div>

            </div>

            <Link to='/checkout'>
              <button className='w-full bg-[#1F5D6F] text-white mt-4 py-2 px-4 hover:bg-[#16404D] transition-all duration-200'>
                Place Order
              </button>
            </Link>
          </div>

        </div>
      ) : (
        // Show only when cart is empty
        <div className='border border-[#DDA853] p-[25px] flex items-center justify-center flex-col'>
          <img src={emptyCart} alt="empty-cart" />
          <h1 className='text-[24px] font-bold mt-4'>Your cart is empty</h1>
          <p>Add something to make me happy :)</p>
          <Link to='/'>
            <button className='w-full bg-[#1F5D6F] text-white mt-4 py-2 px-4 hover:bg-[#16404D] transition-all duration-200'>
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}

export default Cart;
