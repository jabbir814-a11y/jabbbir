import React, { useEffect, useState } from "react";
import "./jabbir.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
    const [brand, setbrand] = useState("");
    const [amount, setamount] = useState("");
    const [error, seterror] = useState("");

    const navi = useNavigate();

    const tax_rate = 18;
    const subtotal = Number(amount);
    const tax = subtotal * (tax_rate / 100);
    const total = subtotal + tax;
    const roundoff = Math.round(total);
    const math = roundoff - total;

    // Check login when App opens
    useEffect(() => {
        async function checkLogin() {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navi("/");
                    return;
                }

                await axios.get(
                    "http://localhost:3000/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

            } catch (error) {
                localStorage.removeItem("token");
                navi("/");
            }
        }

        checkLogin();
    }, [navi]);

    async function user() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navi("/");
                return;
            }

            const res = await axios.post(
                "http://localhost:3000/users",
                {
                    brand: brand,
                    amount: amount,
                    tax_rate: tax_rate,
                    subtotal: subtotal,
                    roundoff: roundoff
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(res.data);

        } catch (error) {
            console.log(error.response?.data || error.message);
            seterror("Unable to save bill");
        }
    }

    return (
        <div>
            <h1 style={{ marginLeft: 590 }}>
                Hotel Management
            </h1>

            <input
                type="text"
                style={{
                    marginLeft: 550,
                    width: 200
                }}
                placeholder="Enter your food"
                value={brand}
                onChange={(e) => setbrand(e.target.value)}
            />

            <input
                type="number"
                style={{
                    marginLeft: 50,
                    width: 200
                }}
                placeholder="Enter your amount"
                value={amount}
                onChange={(e) => setamount(e.target.value)}
            />

            <button onClick={user}>
                Submit
            </button>

            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax ({tax_rate}%): ${tax.toFixed(2)}</p>
            <p>Round off: ${math.toFixed(2)}</p>
            <p>Total: ${total.toFixed(2)}</p>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}
        </div>
    );
}

export default App;