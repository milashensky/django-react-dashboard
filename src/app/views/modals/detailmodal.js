import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {deleteItem} from '../../../actions/items'

const DetailModal = ({state, onHandleModal, onDeleteItem}) => {
    const style = {
        overlay: {
            backgroundColor: '#6161613d',
            zIndex: 1000,
        },
        content: {
            zIndex: 1200,
        }
    }
    const handleCloseModal = () => onHandleModal(false);
    return (
        <Modal
              isOpen={ state.modalsState.detailModalState }
              onRequestClose={handleCloseModal}
              shouldCloseOnOverlayClick={true}
              ariaHideApp={false}
              contentLabel="Details" style={style}>
            <div className="valign-wrapper h-100">
                <div className="center-align w-100">
                    <h4>Details of { state.items.item && state.items.item.name }</h4>
                    <p>ID: { state.items.item && state.items.item.id }</p>
                    <p>NAME: { state.items.item && state.items.item.name }</p>
                    <p>ITEM NAME: { state.items.item && state.items.item.itemName }</p>
                    <p>PRICE: { state.items.item && state.items.item.price }</p>
                    <div className="row">
                        <Link className="btn blue mr-3" to={`/item/${state.items.item && state.items.item.id}`}>Edit</Link>
                        <button className="btn red mr-3" onClick={()=> onDeleteItem(state.items.item && state.items.item.id) }>Delete</button>
                    </div>
                </div>
            </div>

        </Modal>
    );
}

export default connect(
    (state, ownProps) => ({
        state: state,
    }),
    dispatch => ({
        onHandleModal: (state) => {
            dispatch( { type: 'CHANGE_DETAILMODAL_STATE', state});
        },
        onDeleteItem: (id) => {
            dispatch(deleteItem(id));
        },
    })
)(DetailModal);
