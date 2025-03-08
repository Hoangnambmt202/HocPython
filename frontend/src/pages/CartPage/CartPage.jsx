import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {  X } from "lucide-react";

import {
  closeCart,
  removeFromCart,

} from "../../redux/slides/cartSlides"; 
import empty_cart from '../../assets/imgs/Empty-Cart.png';
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isOpen = useSelector((state) => state.cart.isOpen);
  const totalPrice = cart.reduce((total, course) => total + course.price, 0);
  const navigate = useNavigate() ;
  const handlePay = () => {
    navigate("/order/checkout");
    dispatch(closeCart());
  }
  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(closeCart())}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Giỏ hàng của bạn
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => dispatch(closeCart())}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Đóng</span>
                        <X aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  {cart.length === 0 ? (
                    <div>
                      <img src={empty_cart} alt="empty_cart" />
                    </div>
                  ) : (
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cart.map((course) => (
                            <li key={course._id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={course.thumbnail}
                                  alt={course.title}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <Link className="hover:underline" to={`/course/${course.slug}`}>{course.title}</Link>
                                    <p className="ml-4">
                                      {course.price.toLocaleString("vi-VN")} đ
                                    </p>
                                  </div>
                                 
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                 
                               
                                    <button
                                      onClick={() =>
                                        dispatch(removeFromCart(course._id))
                                      }
                                      className="text-red-500"
                                    >
                                      Xóa
                                    </button>
                                
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Tổng tiền</p>
                      <p>{totalPrice.toLocaleString("vi-VN")} đ</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Phí vận chuyển và thuế sẽ được tính khi thanh toán.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={handlePay}
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Thanh toán
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        hoặc{" "}
                        <button
                          type="button"
                          onClick={() => dispatch(closeCart())}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Tiếp tục mua sắm
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
export default CartPage;
