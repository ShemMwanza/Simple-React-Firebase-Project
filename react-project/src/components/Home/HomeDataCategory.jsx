import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../../Authentication/firebaseConfig';
import { useAuth } from '../../Context/AuthContext';
import Loading from '../Loading/Loading';
import ProductBox from '../Products/ProductBox'


export default function HomeDataCategory() {
    //Fetch Data
    const [fetch, setFetch] = useState([]);
    const [loading, setLoading] = useState(false);

    const FetchData = async () => {
        setLoading(true);
        getDocs(collection(db, "popular_option"))
            .then((querySnapshot) => {
                const newdata = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setFetch(newdata);
                console.log("newdata: " + newdata);
                setLoading(false);
            });
    }
    useEffect(() => {
        FetchData();
    }, [])
    const { addToCart, currentUser } = useAuth();
    const navigate = useNavigate();
    // Form Submit
    const handleSubmit = async e => {
        e.preventDefault();
        if (currentUser) {
            const productID = e.target.productId.value;
            const img = e.target.imgName.value;
            const title = e.target.titleName.value;
            const price = e.target.priceName.value;
            console.log(productID)

            addToCart(productID, img, title, price).then(() => { })
                .catch((error) => {
                    console.log(error.code)
                    alert(error);
                })
        }
        else {
            navigate("/signin");
        }
    }
    return (
        <>
            {loading ? (<Loading />) : (
                <section className='w-full bg-white'>
                    <img src='/assets/l.svg' alt='home' className='w-full bottom-0 ' />
                    <div className='px-4 sm:px-8 md:px-16'>
                        <h1 className='text-2xl font-semi-bold text-center py-8 sm:text-4xl font-poppins text-gray-800'>Popular Options</h1>
                        {fetch?.map((newdata, i) => (
                            <div key={i} className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                <form onSubmit={handleSubmit}>
                                    <ProductBox
                                        img_url={newdata.img_url} imgName="imgName" titleName="titleName" priceName="priceName" title={newdata.name} price={newdata.price} />
                                    <input className='hidden' name='productId' defaultValue={newdata.productID} />
                                </form>
                                
                            </div>
                        ))}
                    </div>
                </section>
            )
            }
        </>
    )
}
