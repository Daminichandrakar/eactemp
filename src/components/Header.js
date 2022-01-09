import React, { Component } from 'react';
import image1 from '../assets/images/logo.png';
import "../css/Header.css";

export class Header extends Component {
    render() {
        return (
            <div>
            <header className="header-content header">
                    <div className="logo-content">
                        <img src={image1} alt="logo"/>
                        <div>
                            <span className="emp-text">EMPLOYEE</span><br/>
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
            </div>
        )
    }       
}

export default Header