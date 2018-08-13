import React from 'react';
import {AddModal, DetailModal} from './modals';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getItems, getItem, onLocationChange } from '../../actions'
import { waitForNavState } from '../utils'

const Dashboard = (props) => {
    waitForNavState(props).then( () => {
        if (!props.items.state)
        props.onGetItems()
    })
    const handleShowModal = () => {
        props.onHandleModal(true)
    }
    return (
        <div>
            <h3>Dashboard <a className="btn right grey darken-2" onClick={ handleShowModal }>Add +</a></h3>
            <AddModal />
            <DetailModal />
            <table className="striped responsive-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        (props.items.items.length ?
                            props.items.items.map((item) => (
                                <tr key={item.id} className="hoverable" onClick={() => props.onGetItem(item.id, props.items.items)}>
                                    <td>{item.name}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.price}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="center-align">Empty</td>
                                </tr>
                            )
                        )
                    }

                </tbody>
            </table>
        </div>
    );
}

export default connect(
    (state, ownProps) => ({
        items: state.items,
        state: state,
        ownProps
    }),
    dispatch => ({
        onHandleModal: (state) => {
            dispatch( { type: 'CHANGE_ADDMODAL_STATE', state});
        },
        onGetItems: () => {
            dispatch(getItems()) ;
        },
        onGetItem: (id, items) => {
            dispatch(getItem(id, items));
        },
        onLocationChange: (match) => {
            dispatch(onLocationChange(match));
        },
    })
)(Dashboard);
