import { collection, getDocs, query, where } from 'firebase/firestore'
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
    const [isSearch, setIsSearch] = useState([false]);
    const [searchMessage, setSearchMessage] = useState('');
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    //Fetch Data
    const [loading, setLoading] = useState(false);

    const [prodID, setProdID] = useState([]);
    const navigate = useNavigate();
    const FetchSearchData = async (search_name) => {
        setIsSearch(true);
        console.log(isSearch)
        setLoading(true);
        const productRef = collection(db, "products");
        const q = query(productRef, where("name", "==", search_name))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const newdata = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log("newdata: " + newdata);
                setItems(newdata);
                setLoading(false);
                if(newdata.length<1){
                    setSearchMessage("There is nothing");
                }
        });

        // getDocs(collection(db, "products", where("name", "==", "Vase")))
        //     .then((querySnapshot) => {
        //         const newdata = querySnapshot.docs
        //             .map((doc) => ({ ...doc.data(), id: doc.id }));
        //         console.log("newdata: " + newdata);
        //         setItems(newdata);
        //         setLoading(false);
        //     });
    }

    const FetchData = async () => {
        setIsSearch(true);
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
        if (prodID.length > 0) {
            console.log("ID is present:" + prodID);
            navigate(`/product/${prodID}`);
        }
        FetchData();
        FetchSearchData();
    }, [prodID])
    const { addToCart, currentUser } = useAuth();

    const handleSearch = async e => {
        e.preventDefault();
        const search_name = e.target.search.value;
        FetchSearchData(search_name);
        console.log(search_name)
    }
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
    const SearchedData =()=> {
        return (
            <>
                <main className='h-full bg-white bg-opacity-20'>
                    <Navbar />
                    <form onSubmit={handleSearch}>
                        <ProductsHeader />
                    </form>
                    {loading ? (<Loading />) : (
                        <section className='w-11/12 mx-auto'>
                            <div className='flex flex-col py-8 md:inline-grid grid-cols-5 gap-4 '>
                                <p>{searchMessage}</p>
                                {currentItems?.map((newdata, i) => (
                                    <form key={i} onSubmit={handleSubmit}>
                                        <div className='hover:opacity-70 transition-all ease-in-out duration-500 delay-100 cursor-pointer'>
                                            <ProductBox
                                                img_url={newdata.img_url}
                                                id={newdata.productID}
                                                imgName="imgName"
                                                titleName="titleName"
                                                priceName="priceName"
                                                onClick={() => { setProdID(newdata.productID) }}
                                                title={newdata.name}
                                                price={newdata.price} />
                                            <input className='hidden' name='productId' defaultValue={newdata.productID} />
                                        </div>
                                    </form>
                                ))}
                            </div>
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
    if (!isSearch) {
        return (
            <>
                <main className='h-full bg-white bg-opacity-20'>
                    <Navbar />
                    <ProductsHeader />
                    {loading ? (<Loading />) : (
                        <section className='w-11/12 mx-auto'>
                            <div className='flex flex-col py-8 md:inline-grid grid-cols-5 gap-4 '>
                                {currentItems?.map((newdata, i) => (
                                    <form key={i} onSubmit={handleSubmit}>
                                        <div className='hover:opacity-70 transition-all ease-in-out duration-500 delay-100 cursor-pointer'>
                                            <ProductBox
                                                img_url={newdata.img_url}
                                                id={newdata.productID}
                                                imgName="imgName"
                                                titleName="titleName"
                                                priceName="priceName"
                                                onClick={() => { setProdID(newdata.productID) }}
                                                title={newdata.name}
                                                price={newdata.price} />
                                            <input className='hidden' name='productId' defaultValue={newdata.productID} />
                                        </div>
                                    </form>
                                ))}
                            </div>
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
    else {
        return (
            <SearchedData />
        )
    }
}
