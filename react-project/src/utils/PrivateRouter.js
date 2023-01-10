// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";
// const PrivateRoute = ({ children }) => {
//     const { currentUser } = useAuth();
//     const navigate = useNavigate();

    

//         console.log("There is no user");
//         useEffect(() => {
//             if (currentUser) {
//                 console.log("There is user");
//                 // return (children);
//             }else{

//             navigate("/");}

//         }, [currentUser, navigate]);
//         // return (null);
//         // return (<Navigate to='/'/>)
    
// };

// export default PrivateRoute;