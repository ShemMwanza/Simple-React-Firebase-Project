import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Authentication/firebaseConfig';
import { useAuth } from '../../Context/AuthContext'
import Loading from '../Loading/Loading';
import Navbar from '../Navigation/Navbar/Navbar'
import CheckoutSummary from './CheckoutSummary';
import CheckoutUserInfo from './CheckoutUserInfo';
export default function Checkout() {
    const { currentUser, placeOrder, deleteFromCart } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetch, setFetch] = useState([]);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState([]);
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
        }).catch((error) => {
            console.log(error);
        });

    }
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

