import React from 'react';
import { onLocationChange } from '../../actions'
import { connect } from 'react-redux';


const Home = (props) => {
    if (props.state.router.location.pathname != props.state.routeChange.url)
        props.onLocationChange(props.ownProps.match)
    return (
        <div>
            <h1>AAAAAAAA</h1>
            <h2>AAAAAAA</h2>
            <h3>AAAAAAAA</h3>
            <h4>AAAAAAAAAAAAAAA</h4>
            <h5>AAAAAAAAAAAAAAA</h5>
        </div>
    )
}

export default connect(
    (state, ownProps) => ({
        state: state,
        ownProps
    }),
    dispatch => ({
        onLocationChange: (match) => {
            dispatch(onLocationChange(match));
        }
    })
)(Home);
