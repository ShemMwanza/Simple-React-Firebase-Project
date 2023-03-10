import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../../Authentication/firebaseConfig';
import { useAuth } from '../../Context/AuthContext'
import Loading from '../Loading/Loading';
import Navbar from '../Navigation/Navbar/Navbar'
import CheckoutSummary from './CheckoutSummary';
import CheckoutUserInfo from './CheckoutUserInfo';
export default function Checkout() {
    const { currentUser, placeOrder } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetch, setFetch] = useState([]);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [productID, setProductID] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);
    const calcPrice = (item) => {
        return item.reduce((accumulator, object) => {
            return accumulator + object.price;
        }, 0);
    };
    const FetchData = async () => {
        setLoading(true);
        getDocs(collection(db, "cart", currentUser.uid, currentUser.uid))
            .then((querySnapshot) => {
                const newdata = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setFetch(newdata);
                setItems(newdata.length);
                setTotal(calcPrice(newdata));
                setProductID(newdata.map((obj) => (
                    obj.productID
                )))
                console.log(fetch);
                setLoading(false);
            });
    }
    useEffect(() => {
        FetchData();
    }, [])
    const handleSubmit = async e => {
        e.preventDefault();
        const phone_number = e.target.phoneNumber.value;
        placeOrder(fetch, currentUser.email, currentUser.displayName, phone_number, total, items).then(() => {
            console.log("Success!!");
            navigate("/paymentmethod");
        }).catch((error) => {
            console.log(error);
        });

    }
    useEffect(() => {
        let newTotal = 0;
        for (const item of fetch) {
            newTotal += item.price * item.quantity;
        }
        setTotal(newTotal);
    }, [fetch]);
    if (fetch.length > 0) {
        return (
            <>
                <Navbar />
                <section className='container mx-auto'>
                    <div className='w-full py-8'>
                        {loading ? (<Loading />) : (
                            <form
                                onSubmit={handleSubmit}
                                className='w-full px-4 md:px-0 flex flex-col-reverse md:flex-row justify-between'>
                                <CheckoutUserInfo />
                                <CheckoutSummary
                                    items={items}
                                    total={total} />
                            </form>
                        )}
                    </div>
                </section>
            </>
        )
    }
    else {
        return (
            <>
                <Navbar />
                <div className='px-4 py-4 shadow-lg mx-4 my-4'>
                    <p className='py-4'>Cart is Empty</p>
                    <Link to="/products"><button className='btn-primary'>Go Back </button> </Link>
                </div>
            </>
        )
    }

}

