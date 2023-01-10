import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return children;
  }
  else{
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;