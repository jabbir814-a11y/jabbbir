import React, { useState } from "react";
import './Jab.css';
import axios from "axios";

import { useNavigate } from "react-router-dom";
function Jab() {
    const [mail, setmail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');
    const navi=useNavigate()
    async function handleForm(e) {
        e.preventDefault();

        setsuccess('');
        seterror('');

        if (mail === "" || password === "") {
            return seterror('You cannot leave the field empty');
        }

        if (password.length <= 6) {
            return seterror('Your password is too short');
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/users",
                {
                    username: mail,
                    password: password
                }
            );

            console.log(response.data);

            localStorage.setItem(
                'token',
                response.data.token
            );

            setsuccess('Login successfully');
            navi('/App')

        } catch (error) {
            if (error.response) {
                seterror(error.response.data.message);
            } else {
                seterror('Server connection failed');
            }
        }
    }

    return (
        <form onSubmit={handleForm}>
            <div>
                <h1 style={{ marginLeft: 550 }}>
                    Hello Login Form
                </h1>

                <input
                    type="text"
                    placeholder="Enter your name"
                    style={{
                        marginLeft: 550,
                        width: 560,
                        height: 36
                    }}
                    value={mail}
                    onChange={(e) => setmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    style={{
                        marginLeft: 550,
                        width: 560,
                        height: 36,
                        marginTop: 50
                    }}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                />

                <button className="dev" type="submit">
                    Submit
                </button>

                <p style={{ color: "red" }}>{error}</p>
                <p style={{ color: "green" }}>{success}</p>
            </div>
        </form>
    );
}

export default Jab;