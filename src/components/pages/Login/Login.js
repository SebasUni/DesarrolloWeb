import React, { useState, useRef } from 'react'
import './Login.css'
import { auth } from '../../firebase/config'
import { projectFirestore as db } from '../../firebase/config'
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, getAuth, signInWithPopup, } from "firebase/auth";
import GoogleButton from 'react-google-button'

export const Login = () => {
    const [uemail, setUemail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('a');
    const [telefono, setTelefono] = useState('a');
    const [user, setUser] = useState({})
    const [estadoregistro, setEstadoregistro] = useState(false);
    const [estado, setEstado] = useState(false);
    const [infouser, setInfouser] = useState([])
    const provider = new GoogleAuthProvider();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        obtenerestado();
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
                const obtenerDatos = async () => {
                    const documents = [];
                    const datos = await getDoc(doc(db, "users", usuario.user.uid));
                    documents.push(datos.data())
                    setInfouser(documents)
                    if (datos.data().rol === "adm") {
                        localStorage.setItem("id", true)
                        setEstado(true)
                    } else {
                        localStorage.setItem("id", false)
                        setEstado(false)
                    }
                    console.log(localStorage.getItem("id"))
                }
                obtenerDatos()
            } catch (error) {
                alert("aaa" + error.message)
            }
        }
    }
    const registro = async () => {
        try {
            const usuario = await createUserWithEmailAndPassword(
                auth,
                uemail,
                password
            );
            await setDoc(doc(db, "users", usuario.user.uid), {
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
    const SolicitudRegistro = () => {
        setEstadoregistro(true)
    }
    const SolicitudRegistro2 = () => {
        setEstadoregistro(false)
    }
    const google = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // // The signed-in user info.
                // const user = result.user;

                console.log(result.user)
                setDoc(doc(db, "users", result.user.uid), {
                    name: result.user.displayName,
                    email: result.user.email,
                    telefono: result.user.phoneNumber,
                    estado: true
                });

                const obtenerDatos = async () => {
                    const documents = [];
                    const datos = await getDoc(doc(db, "users", result.user.uid));
                    documents.push(datos.data())
                    setInfouser(documents)
                    if (datos.data().rol === "adm") {
                        localStorage.setItem("id", true)
                        setEstado(true)
                    } else {
                        localStorage.setItem("id", false)
                        setEstado(false)
                    }
                    console.log(localStorage.getItem("id"))
                }
                obtenerDatos()
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                alert(errorMessage)
            });
    }
    function obtenerestado() {
        console.log(localStorage.getItem("id"))
        let es = localStorage.getItem("id")
        if (es === "false") {
            setEstado(false)
        } else {
            setEstado(true)
        }

    }
    return (
        <div className="main">
            {user ?
                <div className="container">
                    <button className="Login" onClick={logout} >Salir</button>
                    {estado ?
                        <div className="d">
                            <form action="/Informacion">
                                <button className="Login">Informacion</button>
                            </form>
                            <form action="/Actua-prod">
                                <button className="Login"> agregar productos </button>
                            </form>
                        </div>
                        :
                        ""}
                </div>
                :
                <div className="sub-main">
                    <div className="img">
                        <div className="container-image">
                            <img src="/images/loginn/user.png" alt="user" className="imgs" />
                        </div>
                        <div className="d">
                            {estadoregistro ?
                                <div className="d">
                                    <input type="text" className="imput" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                                    <div className="d">
                                        <input type="text" className="imput" placeholder="Telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)}></input>
                                    </div>
                                </div>
                                : ""}
                        </div>
                        <div className="d">
                            <input type="email" className="imput" placeholder="email" value={uemail} onChange={(e) => setUemail(e.target.value)}></input>

                        </div>
                        <div className="d">
                            <input type="password" className="imput" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>

                        </div>



                        <div className="button">
                            {estadoregistro ? (
                                <div className="d">
                                    <button className="Login" onClick={registro} >Registrate</button>
                                    <GoogleButton onClick={google} style={{ marginTop: "30px" }} />
                                </div>
                            )
                                : (
                                    <div className="d">
                                        <button className="Login" onClick={login} >Login</button>
                                        <GoogleButton onClick={google} style={{ marginTop: "30px" }} />
                                    </div>
                                )}

                        </div>

                        <div className="registros">
                            <a onClick={SolicitudRegistro}>Crear cuenta</a>
                        </div>
                        <div className="registros" style={{ marginTop: "1px" }}>
                            <a onClick={SolicitudRegistro2}>Sign Up</a>

                        </div>



                    </div>
                </div>

            }

        </div>
    )
}
