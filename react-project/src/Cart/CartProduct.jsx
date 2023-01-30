import React, { useState } from 'react'
import * as FaIcons from "react-icons/fa"
import { useAuth } from '../Context/AuthContext';
export default function CartProduct(props) {
    const { addQuantityToCart } = useAuth();
    const [qnt, setQnt] = useState(1);
    const [disable, setDisable] = useState(false);

    const handleChange = (event) => {
        setQnt(event.target.number.value);
    };
    const {
        title, price, img_url, quantity,
        imgName, priceName, titleName, idName, id
    } = props;
    const handleAddClick = () => {
        setQnt(qnt + 1);
        // console.log(qnt)
        addQuantityToCart(id, qnt+1).then(() => {
            // alert("successful");
        }).catch((error) => { alert("A problem has occurred with the application!!") });
    }
    const handleSubClick = () => {
        setQnt(Math.max(0, qnt - 1));
        addQuantityToCart(id, qnt - 1).then(() => {
            // alert("successful");
        }).catch((error) => { alert("A problem has occurred with the application!!") });
    }
    return (
        <>

            <div className='bg-white border-b border-t justify-between flex py-2 px-4'>
                <div className='w-1/4'>
                    <img src={img_url} />
                </div>
                <div className='w-1/2 px-2 flex flex-col justify-between'>
                    <h1 className='text-gray-800 text-sm sm:text-base font-poppins mb-4'>{title}</h1>

                    <div className="flex flex-row h-auto w-full rounded-lg relative bg-transparent mt-1">
                        <button type='button' onClick={handleSubClick} className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                            <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input
                            onChange={handleChange}
                            type="number" className="text-center focus:outline-none w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black flex items-center text-gray-700 outline-none"
                            name="quantity"
                            value={qnt} />
                        <button type='button' onClick={handleAddClick} className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-r cursor-pointer">
                            <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                        <input className='hidden' name={priceName} defaultValue={price} />
                        <input className='hidden' name={imgName} defaultValue={img_url} />
                        <input className='hidden' name={titleName} defaultValue={title} />
                        <input className='hidden' name={idName} defaultValue={id} />
                    </div>
                </div>
                <div className='w-1/4 flex flex-col justify-between'>
                    <p className="text-green-primary text-sm sm:text-base">KES {price * qnt}</p>
                    <div className='w-full flex h-auto'>
                        <button onClick={props.deleteCart} className='w-full items-center flex justify-center border rounded py-2 cursor-pointer'><FaIcons.FaTrashAlt className='text-red-600 ' /></button>
                    </div>
                </div>
            </div>
            <div>
                <p></p>
            </div>
        </>
    )
}
