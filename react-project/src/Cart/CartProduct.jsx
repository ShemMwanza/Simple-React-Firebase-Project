import React, { useState } from 'react'
import * as FaIcons from "react-icons/fa"
export default function CartProduct(props) {
    const [qnt, setQnt] = useState(1);
    const [disable, setDisable] = useState([]);
    const handleChange = (event) => {
        setQnt(event.target.number.value);
    };

    const handleAddClick = () => {
        setQnt(qnt + 1)
    };
    const handleSubClick = () => {
        if (qnt === 0) {
            setDisable(false);
        }
        else {
            setDisable(true)
            setQnt(qnt - 1);
        }
    };
    const title = props.title;
    const price = props.price;
    const img_url = props.img_url;
    const quantity = props.quantity;
    const imgName = props.imgName;
    const priceName = props.priceName;
    const titleName = props.titleName;
    const idName = props.idName;
    const id = props.id;
    return (
        <>

            <div className='bg-white border-b border-t justify-between flex py-2 px-4'>
                <div className='w-1/4'>
                    <img src={img_url} />
                </div>
                <div className='w-1/2 px-2 flex flex-col justify-between'>
                    <h1 className='text-gray-800 text-sm sm:text-base font-poppins mb-4'>{title}</h1>

                    <div className="flex flex-row h-auto w-full rounded-lg relative bg-transparent mt-1">
                        <button onClick={handleSubClick} className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                            <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input
                            onChange={handleChange}
                            type="number" className="text-center focus:outline-none w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black flex items-center text-gray-700 outline-none"
                            name={quantity}
                            value={qnt} />
                        <button onClick={handleAddClick} className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-r cursor-pointer">
                            <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                        <input className='hidden' name={priceName} defaultValue={price} />
                        <input className='hidden' name={imgName} defaultValue={img_url} />
                        <input className='hidden' name={titleName} defaultValue={title} />
                        <input className='hidden' name={idName} defaultValue={id} />
                    </div>
                </div>
                <div className='w-1/4 flex flex-col justify-between'>
                    <p className="text-green-primary text-sm sm:text-base">KES {price}</p>
                    <div className='w-full flex h-auto'>
                        <button onClick={props.deleteCart} className='w-full items-center flex justify-center border rounded py-2 cursor-pointer'><FaIcons.FaTrashAlt className='text-red-600 '/></button>
                    </div>
                </div>
            </div>
        </>
    )
}
