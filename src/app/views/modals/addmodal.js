import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {createItem} from '../../../actions/items'

const AddModal = ({state, modalState, onHandleModal, onAddItem}) => {
    let name = '',
        itemName = '',
        price = '';
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
    const addItem = (event) => {
        event.preventDefault();
        onAddItem({
            name: name.value,
            itemName: itemName.value,
            price: price.value,
        });
    }
    return (
        <Modal
              isOpen={ modalState && modalState.addmodalState }
              onRequestClose={handleCloseModal}
              shouldCloseOnOverlayClick={true}
              ariaHideApp={false}
              contentLabel="Add new" style={style}>
            <h4>Add new item</h4>
            <div className="row">
                <form className="col s12" onSubmit={ addItem }>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input type="text" id="name" className={(modalState && modalState.addmodalErrors && modalState.addmodalErrors.name? 'invalid': 'valid')} ref={(input) => name = input}/>
                            <label htmlFor="name">Name</label>
                            <p className="red-text text-darken-1">{ modalState && modalState.addmodalErrors && modalState.addmodalErrors.name }</p>
                        </div>
                        <div className="input-field col s12 m6">
                            <input type="text" id="item_name" className={(modalState && modalState.addmodalErrors && modalState.addmodalErrors.itemName? 'invalid': 'valid')} ref={(input) => itemName = input}/>
                            <label htmlFor="item_name">Item Name</label>
                            <p className="red-text text-darken-1">{ modalState && modalState.addmodalErrors && modalState.addmodalErrors.itemName }</p>
                        </div>
                        <div className="input-field col s12 m6">
                            <input type="text" id="price" className={( modalState && modalState.addmodalErrors && modalState.addmodalErrors.price? 'invalid': 'valid')} ref={(input) => price = input}/>
                            <label htmlFor="price">Price</label>
                            <p className="red-text text-darken-1">{ modalState && modalState.addmodalErrors && modalState.addmodalErrors.price }</p>
                        </div>
                    </div>
                    <button className="btn blue lighten-1">Add</button>
                </form>
            </div>
        </Modal>
    );
}

export default connect(
    (state) => ({
        state,
        modalState: state.modalsState
    }),
    dispatch => ({
        onHandleModal: (state) => {
            dispatch( { type: 'CHANGE_ADDMODAL_STATE', state});
        },
        onAddItem: (item) => {
            dispatch(createItem(item));
        },
    })
)(AddModal);
