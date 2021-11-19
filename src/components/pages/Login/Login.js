import React, { useState, useEffect } from 'react'
import './Login.css'
import { auth } from '../../firebase/config'
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
export const Login = () => {
    const [uemail, setUemail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                uemail,
                password
            );
            console.log(user)
        } catch (error) {
            alert(error.message)
        }

    }
    const registro = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                uemail,
                password
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }

    }
    const logout = async () => {
        await signOut(auth)
    }


    return (
        <div className="main">
            <div className="sub-main">
                <div className="img">
                    <div className="container-image">
                        <img src="/images/loginn/user.png" alt="user" className="imgs" />
                    </div>
                    <div className="d">
                        <input type="email" className="imput" value={uemail} onChange={(e) => setUemail(e.target.value)}></input>

                    </div>
                    <div className="d">
                        <input type="password" className="imput" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className="button">
                        <button onClick={registro}>iniciasr</button>
                        <h4> User Logged In: </h4>
                        {user?.email}

                        <button onClick={logout}> Sign Out </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
