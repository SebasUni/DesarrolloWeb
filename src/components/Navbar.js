import React, { useEffect, useState } from 'react'
import {Link } from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa'
import { Button } from './Button'
import './Navbar.css'
import {IconContext} from 'react-icons/lib'

function Navbar() {
const [click, setClick]= useState(false)
const [button, setButton]= useState(true)

const handleClik =()=> setClick(!click)
const closeMobileMeunu =()=>setClick(false)
    const showButton = ()=>{
        if (window.innerWidth <= 960) {
            setButton(false)
        }else{
            setButton(true)
        }
    }
    useEffect (()=>{
        showButton();
    })
    window.addEventListener('resize', showButton);

    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>
        <div className="navbar">
            <div className="navbar-container container">
                <Link to='/' className="navbar-logo" onClick={closeMobileMeunu}>
                        <p className='Nombre-empresa'>Aluminios Joal </p>
                </Link>
                <div className="menu-icon" onClick={handleClik}>
                    {click ? <FaTimes />:<FaBars />}
                </div>
                <ul className={click ? 'nav-menu active': 'nav-menu'}>
                    <li className="nav-item">
                        <Link to='/' className="nav-links" onClick={closeMobileMeunu}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/Quienes-Somos' className="nav-links" onClick={closeMobileMeunu}>
                            Quienes somos
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/Productos' className="nav-links" onClick={closeMobileMeunu}>
                            Productos
                        </Link>
                    </li>
                    <li className="nav-btn">
                        {button ?(
                            <Link to='/sign-up'className="btn-link" >
                                <Button buttonStyle='btn--outline'>SIGN UP</Button>
                            </Link>
                        ):(
                            <Link  to='/sign-up' className="btn-link" onClick={closeMobileMeunu}>
                                <Button buttonStyle='btn--outline'
                                buttonSize='btn-mobile'
                                >SIGN UP</Button>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
        </IconContext.Provider>
        </>
    )
}
export default Navbar