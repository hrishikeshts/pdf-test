import React, { useState } from "react";
import Axios from "axios";
import { saveAs } from "file-saver";
import { fileDownload } from "js-file-download";
import "./App.css";

export default function App() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    const handleCreate = (e) => {
        e.preventDefault();
        console.log("handleCreate function");

        Axios.post("http://localhost:4000/generate-pdf", {
            name: name,
            email: email,
        })
            .then(console.log(`POST data sent: "${name}", "${email}"`))
            .then((res) => {
                console.log(`Response received ${res.data}`);
                setLink(res.data);
                console.log(link);
            });
    };

    const handleDownload = (e) => {
        e.preventDefault();
        window.location.href = link;
    };

    return (
        <>
            <form className='m-5 px-5 container' style={{ width: "450px" }}>
                <div className='form-group'>
                    <label for='exampleInputName'>Name</label>
                    <input
                        type='text'
                        className='form-control'
                        id='exampleInputName'
                        placeholder='Enter name'
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className='form-group'>
                    <label for='exampleInputEmail1'>Email address</label>
                    <input
                        type='email'
                        className='form-control'
                        id='exampleInputEmail1'
                        aria-describedby='emailHelp'
                        placeholder='Enter email'
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className='form-group'>
                    <button
                        type='submit'
                        className='btn btn-primary'
                        onClick={handleCreate}
                    >
                        Create PDF on server
                    </button>
                </div>
                <div className='form-group'>
                    <button
                        type='submit'
                        className='btn btn-primary'
                        onClick={handleDownload}
                    >
                        View PDF from server
                    </button>
                </div>
            </form>
        </>
    );
}
