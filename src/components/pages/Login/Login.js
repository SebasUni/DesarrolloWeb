import React, { useState } from 'react'
import './Login.css'
import { auth } from '../../firebase/config'
import { projectFirestore as db } from '../../firebase/config'
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
    const [uemail, setUemail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('a');
    const [telefono, setTelefono] = useState('a');
    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    const login = async () => {
        if (user !== "") {
            try {
                const usuario = await signInWithEmailAndPassword(
                    auth,
                    uemail,
                    password
                )
                await updateDoc(doc(db, "users", usuario.user.uid), {
                    estado: true
                })
            } catch (error) {
                alert("aaa" + error.message)
            }
        }
    }
    const registro = async () => {
        try {
            await createUserWithEmailAndPassword(
                auth,
                uemail,
                password
            );
            await setDoc(doc(db, "users", user.user.uid), {
                name: name,
                email: uemail,
                telefono: telefono,
                estado: true
            });
           // console.log(user);
        } catch (error) {
           // console.log(error.message);
        }

    }

    const logout = async () => {
        if (user != null) {
            await updateDoc(doc(db, "users", user.uid), {
                estado: false
            })
            await signOut(auth)
        }
    }


    return (
        <div className="main">
            {user ?  <button className="Login" onClick={logout} >Salir</button> :
                <div className="sub-main">
                    <div className="img">
                        <div className="container-image">
                            <img src="/images/loginn/user.png" alt="user" className="imgs" />
                        </div>
                        <div className="d">
                            <input type="email" className="imput" placeholder="email" value={uemail} onChange={(e) => setUemail(e.target.value)}></input>
                        </div>
                        <div className="d">
                            <input type="password" className="imput" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <div className="button">
                                <button className="Login" onClick={login} >Login</button>

                        </div>
                    </div>
                </div>

            }

        </div>
    )
}
