import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './components/404/404';
import ForgotPassword from './User/Authentication/ForgotPassword';
import Signin from './User/Authentication/Signin';
import Signup from './User/Authentication/Signup';
import Profile from './User/Account/Profile';
import Home from './Home/Home';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './utils/PrivateRouter';
import Products from './components/Products/Products';
import ProductView from './components/Products/ProductView';
import Checkout from './components/Products/Checkout';
import PaymentMethod from './Payment/PaymentMethod';
import SuccessOrder from './components/Success/SuccessOrder';
import MpesaMethod from './Payment/MpesaMethod';
function App() {
  return (
    <>

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
            </Route>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/*" element={<Error />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductView />} />
            <Route path="/paymentmethod" element={<PaymentMethod />} />
            <Route path="/mpesa" element={<MpesaMethod />} />
            <Route path="/ordersuccess" element={<SuccessOrder />} />
            <Route path="/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
            {/* <Route path="/profile" element={<Profile />} /> */}

          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </>
  );
}

export default App;
