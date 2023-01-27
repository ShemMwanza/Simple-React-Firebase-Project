import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react' 
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../Authentication/firebaseConfig';
import Loading from '../Loading/Loading';
import { Footer } from '../Navigation/Footer/Footer';
import Navbar from '../Navigation/Navbar/Navbar';
import ProductBox from '../Products/ProductBox';
import ProductsHeader from '../Products/ProductsHeader';
import { useAuth } from '../../Context/AuthContext';

export default function Search() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchMessage, setSearchMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        currentUser,
        addToCart,
        currentPage,
        itemsPerPage,
        items,
        setItems,
        currentItems,
        prodID,
        setProdID,
        paginate,
    } = useAuth();
    function reloadPage() {
        window.location.reload(false);
    }
    const handleSearch = async e => {
        e.preventDefault();
        const search_name = e.target.search.value;
        navigate(`/search/${search_name}`);
        reloadPage();
        console.log(search_name);
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

    const search_name = id;
    const FetchSearchData = async () => {
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
            if (newdata.length < 1) {
                setSearchMessage("There is nothing");
            }
        });
    }
    useEffect(() => {
        if (prodID.length > 0) {
            console.log("ID is present:" + prodID);
            navigate(`/product/${prodID}`);
        }
        FetchSearchData();
    }, [prodID])
  return (
    <>
          <main className='h-full bg-white bg-opacity-20'>
              <Navbar />
              <form onSubmit={handleSearch}>
                  <ProductsHeader />
              </form>
              <p>{searchMessage}</p>
              {loading ? (<Loading />) : (
                  <section className='w-11/12 mx-auto'>
                      <div className='grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
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
