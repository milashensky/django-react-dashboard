import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
    const navItems = props.routes.map((item) => {
        return (
            <li key={item.name} className={(item.path == props.location.pathname ? 'active' : '')}>
                <Link to={item.path}>{item.name}</Link>
            </li>
        );
    });
    return (
        <nav className="grey darken-2 topnav" role="navigation">
            <div className="nav-wrapper">
                <a id="logo-container" href="/" className="brand-logo">Brand</a>
                <ul className="right hide-on-med-and-down">
                    <li>
                        <a href="/logout">Sign out</a>
                    </li>
                </ul>

                <ul id="nav-mobile" className="sidenav">
                    {navItems}
                    <li>
                        <a href="/logout">Sign out</a>
                    </li>
                </ul>
                <a href="#" data-target="nav-mobile" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                </a>
            </div>
        </nav>
    );
}
export default Nav;
