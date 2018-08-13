import React from 'react';
import { getNavItems } from '../utils'
import { connect } from 'react-redux';

const Nav = (props) => {
    const navItems = getNavItems(props.state.routeChange)
    return (
        <div className="navbar-fixed">
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
        </div>
    );
}
export default connect(
    (state) => ({
        state: state,
    })
)(Nav);
