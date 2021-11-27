import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import './Login.css'
import { auth } from '../../firebase/config'
import { projectFirestore as db } from '../../firebase/config'
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, getAuth, signInWithPopup,sendPasswordResetEmail  } from "firebase/auth";
import GoogleButton from 'react-google-button'
import Informacion from '../Informacion/Informacion';
import emailjs from 'emailjs-com';
import ReCAPTCHA from "react-google-recaptcha";

export const Login = () => {
    const [uemail, setUemail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('a');
    const [telefono, setTelefono] = useState('a');
    const [user, setUser] = useState({})
    const [estadoregistro, setEstadoregistro] = useState(false);
    const [estado, setEstado] = useState(false);
    const provider = new GoogleAuthProvider();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        //console.log(currentUser)
        if (currentUser) {
            setName(currentUser.name)
            setUemail(currentUser.email)
        }
        obtenerestado();
    });
    const login = async () => {
        if (user !== "" && captcha.current.getValue()) {
            cambiarCaptchaValido(true)
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
                   // console.log(documents)
                   // setInfouser(datos.data())
                   // console.log(infouser)
                    localStorage.setItem("email", datos.data().email)
                    localStorage.setItem("name", datos.data().name)
                    ReactDOM.render(datos.data().name, document.getElementById('namesss'));
                    ReactDOM.render(datos.data().email, document.getElementById('infEmail'));
                    if (datos.data().rol === "adm") {
                        localStorage.setItem("id", true)
                        setEstado(true)
                    } else {
                        localStorage.setItem("id", false)
                        setEstado(false)
                    }
                   // console.log(localStorage.getItem("id"))
                }
                obtenerDatos()
            } catch (error) {
                alert("aaa" + error.message)
            }
        }else{
            cambiarCaptchaValido(false)
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
            localStorage.setItem("id", false)
            sendEmail(uemail)
            ReactDOM.render(name, document.getElementById('namesss'));
            ReactDOM.render(uemail, document.getElementById('infEmail'));
            obtenerestado();
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
                    //setInfouser(documents)
                    localStorage.setItem("email", datos.data().email)
                    localStorage.setItem("name", datos.data().name)
                    ReactDOM.render(datos.data().name, document.getElementById('namesss'));
                    ReactDOM.render(datos.data().email, document.getElementById('infEmail'));
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
        //console.log(localStorage.getItem("id"))
        let es = localStorage.getItem("id")
        if (es === "false") {
            setEstado(false)
        } else {
            setEstado(true)
        }
    }
    const infUser = () => {
        const obtenerDatos = async () => {
            const documents = [];
            
            try{
                const datos = await getDoc(doc(db, "users", user.uid));
                documents.push(datos.data())
                //console.log(documents)
                ReactDOM.render(datos.data().name, document.getElementById('namesss'));
                ReactDOM.render(datos.data().email, document.getElementById('infEmail'));
            }catch(e){

            }
            
            
            
        }
       if(user && name){
          
           obtenerDatos();
       }
    }
    const recuperarContraseña=()=>{
        if(uemail){
            sendPasswordResetEmail(auth, uemail)
            .then(() => {
              // Password reset email sent!
              alert("Revisa tu correo")
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
        }else{
            alert("Ingrese el correo")
        }

    }
    const sendEmail = (email) => {
        var templateParams = {
           emaildestino: email,
            subject: 'Creacion de cuenta ',
            mensaje:  "se ha creo la cuenta exitosamente "
        };
      
      
        emailjs.send('service_n7lwv3n', 'template_t4i8t9h', templateParams, 'user_4kjYwhFJbiGpFOvJbimkC')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
      };
      const [captchaValido, cambiarCaptchaValido]= useState(null);
     
      const captcha = useRef(null);
      const onChange=()=>{
          console.log (captcha.current.getValue())
          cambiarCaptchaValido(true)
      }
    return (
        <div className="main">
            {user ?
                <div className="container">
                    {infUser()}
                    <div className="container-image">
                            <img src="/images/loginn/user.png" alt="user" className="imgs" />
                        </div>
                    <p id={"namesss"} className={"informacionRegistro"}></p>
                    <p id={"infEmail"} className={"informacionRegistro"}></p>
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
                        <div className="registros">
                            <a onClick={recuperarContraseña}>Olvidaste tu contraseña</a>
                        </div>
                        <div className="recaptcha">
                        <ReCAPTCHA
                            ref={captcha}
                            sitekey="6Lez72AdAAAAAOM-HJGVXgfrdOmyGQims_fFq4lH"
                            onChange={onChange}
                        />
					    </div>
                               {captchaValido ===false ? <div className="error-captcha">Por favor acepta el captcha</div>:""}
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
