import { collection, doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../Authentication/firebaseConfig'
import { useAuth } from '../../Context/AuthContext'
import ImageSlider from '../Image/ImageSlider'
import Loading from '../Loading/Loading'
import { Footer } from '../Navigation/Footer/Footer'
import Navbar from '../Navigation/Navbar/Navbar'
import ProductsHeader from './ProductsHeader'

export default function ProductView() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState([]);
    const [img1, setImg1] = useState([]);
    const [img2, setImg2] = useState([]);
    const [title, setTitle] = useState([]);
    const [price, setPrice] = useState([]);
    const [description, setDescription] = useState([]);
    const FetchData = async () => {
        setLoading(true);
        console.log("id in prod: " + id)
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setImg(docSnap.get("img_url"));
            setImg1(docSnap.get("img_url2"));
            setImg2(docSnap.get("img_url3"));
            setTitle(docSnap.get("name"));
            setPrice(docSnap.get("price"));
            setDescription(docSnap.get("description"));
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        // setFetch(docSnap);
        setLoading(false);

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

            addToCart(id, img, title, price).then(() => { })
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
            <main className='h-full bg-white bg-opacity-20'>
                <Navbar />
                <ProductsHeader />
                {loading ? (<Loading />) : (
                    <div className='py-8 w-11/12 mx-auto'>

                        <>
                            <form className='flex flex-col md:flex-row' onSubmit={handleSubmit}>
                                <ImageSlider
                                    img1={img}
                                    img2={img1}
                                    img3={img2} />
                                <div className='w-full py-8 md:py-0 md:w-1/2'>
                                    <h1 className='text-3xl text-gray-800 font-poppins'>{title}</h1>
                                    <p className='text-2xl text-green-primary py-4'>KES {price}</p>
                                    <p className='text-lg py-4'>{description}</p>
                                    <button type='submit' className='btn-primary bg-pink-primary'>Add to Cart</button>
                                </div>
                            </form>
                        </>
                    </div>
                )}
            </main>
            <Footer />
        </>
    )
}
