import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './components/404/404';
import ForgotPassword from './User/Authentication/ForgotPassword';
import Signin from './User/Authentication/Signin';
import Signup from './User/Authentication/Signup';
import Profile from './User/Account/Profile';
import Home from './Home/Home';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './utils/PrivateRouter';
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
                        
            <Route path="/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
            {/* <Route path="/profile" element={<Profile />} /> */}

          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </>
  );
}

export default App;
