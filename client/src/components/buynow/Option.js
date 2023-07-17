import React, { useContext } from 'react'
import '../buynow/buynow.css'
import { LoginContext } from '../context/ContextProvider';
import toast, { Toaster } from "react-hot-toast";


function Option({ deletedata, get }) {

    const { account, setAccount } = useContext(LoginContext);


    const removedata = async (req, res) => {
        try {
            const res = await fetch(`/remove/${deletedata}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            if (!data) {
                // console.log("Invalid");
                toast.error("Invalid")
            } else {
                // console.log("Delete");
                setAccount(data);
                toast.success("Item Deleted Successfully");
                get();
            }
        } catch (error) {
            console.log("Error");
        }
    }

    return (
        <>
            <Toaster position='top-center'></Toaster>
            <div className='add_remove_select'>
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <p style={{ cursor: "pointer" }} onClick={() => removedata(deletedata)}>Delete</p><span>|</span>
                <p className='forremovemedia'>Save Or Later</p><span>|</span>
                <p className='forremovemedia'>See More Like This</p>
            </div>
        </>
    )
}

export default Option
