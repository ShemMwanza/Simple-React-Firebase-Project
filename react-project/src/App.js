import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './components/404/404';
import ForgotPassword from './components/Authentication/ForgotPassword';
import Signin from './components/Authentication/Signin';
import Signup from './components/Authentication/Signup';
import { Loading } from './components/Loading/Loading';
import Home from './Home/Home';
function App() {
  return (
    <>
     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/signin" element={<Signin />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/*" element={<Error />} />
          <Route path="/uy" element={<Loading />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
