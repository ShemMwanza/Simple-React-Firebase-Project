import React, { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import CartProduct from './CartProduct';
import { db } from '../Authentication/firebaseConfig';
import { useAuth } from '../Context/AuthContext';
import Loading from '../components/Loading/Loading';

export default function CartHome({ showCart }) {
    const { currentUser } = useAuth();
    const [ID, setID] = useState([])
    const [fetch, setFetch] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const FetchData = async () => {
        setLoading(true);
        getDocs(collection(db, "cart: " + currentUser.uid))
            .then((querySnapshot) => {
                const newdata = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setFetch(newdata);
                if(newdata.length < 1){
                    setMessage("There is no item in cart");
                }
                console.log("fetchwi: " + newdata.length)
                // console.log(fetch);
                setLoading(false);
            });
    }
    console.log("ID: " + ID);
    function DeleteCart() {
        deleteDoc(doc(db, "cart: " + currentUser.uid, ID));
    }

    useEffect(() => {
        if (ID.length > 0) {
            console.log("ID is present");
            DeleteCart();
        }
        FetchData();
        // DeleteCart();
    }, [ID])

    const handleSubmit = async e => {
        e.preventDefault();
        const productID = e.target.productId.value;
        const img = e.target.imgName.value;
        const title = e.target.titleName.value;
        const price = e.target.priceName.value;
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
                    <section className="h-1/2 my-4">
                        <p className='text-gray-900 text-lg'>{message}</p>
                        {loading ? (<Loading />) : (
                            fetch?.map((newdata, i) => (
                                <form key={i} onSubmit={handleSubmit}>
                                    {/* {() => setID(newdata.productID)} */}
                                    <CartProduct
                                        img_url={newdata.img_url}
                                        imgName="imgName"
                                        titleName="titleName"
                                        priceName="priceName"
                                        title={newdata.title}
                                        price={newdata.price}
                                        quantity="quantity"
                                        deleteCart={() => {setID(newdata.productID)}} 
                                        id={newdata.productID}
                                        idName="productId" />
                                </form>

                            )))}
                    </section>

                    {/* <div className="mb-2 text-center">
                                    <LoadButton
                                        type="submit"
                                        title="Update"
                                        id="updateBtn"
                                        isLoading={isLoading}
                                    />
                                </div> */}

                </div>
            </section>
        </>

    )
}