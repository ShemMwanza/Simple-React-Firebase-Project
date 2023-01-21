import React, { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import CartProduct from './CartProduct';
import { db } from '../Authentication/firebaseConfig';
import { useAuth } from '../Context/AuthContext';
import Loading from '../components/Loading/Loading';
import CartBottom from './CartBottom';
import { useNavigate } from 'react-router-dom';

export default function CartHome({ showCart }) {
    const { currentUser } = useAuth();
    const [ID, setID] = useState([])
    const [fetch, setFetch] = useState([]);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const calcPrice = (item) => {
            return item.reduce((accumulator, object) => {
                return accumulator + object.price;
            }, 0);
        };
    const FetchData = async () => {
        setLoading(true);
        
        getDocs(collection(db, "cart", currentUser.uid, currentUser.uid ))
            .then((querySnapshot) => {
                const newdata = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setFetch(newdata);
                // newdata.map(obj => ({ title: obj.title, price: obj.price }))
                let t = 0;
                if (newdata.length < 1) {
                    setMessage("There is no item in cart");
                }
                console.log(calcPrice(newdata));
                console.log("fetchwi: " + newdata.length)
                // console.log(fetch);
                setLoading(false);
            });
    }
    console.log("ID: " + ID);
    function DeleteCart() {
        deleteDoc(doc(db, "cart", currentUser.uid, currentUser.uid, ID));
    }

    useEffect(() => {
        if (ID.length > 0) {
            console.log("ID is present");
            DeleteCart();
        }
        FetchData();
    }, [ID])

    const toCheckout = async () => {
        if(fetch.length > 0){
            navigate("/checkout");
        }
        else {
            setMessage("Cart is Empty");
        }
    }
    return (
        <>
            <section className="w-full lg:w-1/3 flex">
                <div className="w-full h-screen bg-white p-5">
                    <div className="flex justify-between items-center cursor-pointer">
                        <h1 className='text-gray-700 font-semibold text-2xl'>Cart</h1>
                        <svg onClick={showCart} width='28px' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M18 6L6 18" stroke="#1c2645" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M6 6L18 18" stroke="#1c2645" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                </path> </g>
                        </svg>
                    </div>
                    {/* <form onSubmit={handleSubmit}> */}
                        <section className=" my-4">
                            <p className='text-gray-900 text-lg'>{message}</p>

                            {loading ? (<Loading />) : (
                                fetch?.map((newdata, i) => (

                                    <div key={i} className="h-1/2 overflow-y-scroll">
                                        {/* {() => setID(newdata.productID)} */}
                                        <CartProduct
                                            img_url={newdata.img_url}
                                            imgName="imgName"
                                            titleName="titleName"
                                            priceName="priceName"
                                            title={newdata.title}
                                            price={newdata.price}
                                            quantity="quantity"
                                            deleteCart={() => { setID(newdata.productID) }}
                                            id={newdata.productID}
                                            idName="productId" />
                                            
                                    </div>
                                    
                                )))}                            
                        </section>
                        
                        <CartBottom price={calcPrice(fetch)} toCheckout={toCheckout} />
                    {/* </form> */}

                </div>
            </section>
        </>

    )
}
