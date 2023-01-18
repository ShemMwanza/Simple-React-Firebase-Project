import { collection, getDocs } from 'firebase/firestore'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../Authentication/firebaseConfig'
import { useAuth } from '../../Context/AuthContext'
import Loading from '../Loading/Loading'
import { Footer } from '../Navigation/Footer/Footer'
import Navbar from '../Navigation/Navbar/Navbar'
import ProductBox from './ProductBox'
import ProductsHeader from './ProductsHeader'

export default function Products() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [items, setItems] = useState([]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    //Fetch Data
    const [loading, setLoading] = useState(false);

    const FetchData = async () => {
        setLoading(true);
        getDocs(collection(db, "products"))
            .then((querySnapshot) => {
                const newdata = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log("newdata: " + newdata);
                console.log(items);
                setItems(newdata);
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
            <main className='h-full bg-white bg-opacity-20'>
                <Navbar />
                <ProductsHeader />
                {loading ? (<Loading />) : (
                <section className='w-11/12 mx-auto'>
                    
                    {currentItems?.map((newdata, i) => (
                        <div key={i} className="py-8 mx-2 lg:inline-flex">
                            <form onSubmit={handleSubmit}>
                                <ProductBox
                                    img_url={newdata.img_url}
                                    id={newdata.productID}
                                    imgName="imgName"
                                    titleName="titleName"
                                    priceName="priceName"
                                    title={newdata.name}
                                    price={newdata.price} />
                                <input className='hidden' name='productId' defaultValue={newdata.productID} />
                            </form>
                        </div>
                    ))}
                </section>
                )}
                <div className="w-full flex justify-center my-4">
                    <div className="flex">
                        {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, i) => (
                            <button
                                key={i + 1}
                                className={`px-3 py-1 rounded mx-1 ${currentPage === i + 1 ? 'bg-green-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                                onClick={() => paginate(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
