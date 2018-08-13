import React from 'react';
import { onLocationChange } from '../../actions'
import { connect } from 'react-redux';
import { getItem, editItem } from '../../actions'
import { waitForNavState } from '../utils'


const ItemDetail = (props) => {
    let item = {
        name: React.createRef(),
        itemName: React.createRef(),
        price: React.createRef(),
    };
    waitForNavState(props).then( () => {
        if (!props.state.items.item || !props.state.items.item.id || props.state.items.item.id != props.ownProps.match.params.id){
            props.onGetItem(props.match.params.id, props.state.items.items)
        }
        if (props.state.items.item && props.state.items.item.id && props.state.items.item.id == props.ownProps.match.params.id) {
            let setter = setInterval(function () {
                if (item.name.current){
                    clearInterval(setter)
                    if (!JSON.stringify(props.formErrors) || JSON.stringify(props.formErrors) == {}){
                        item.name.current.value = props.state.items.item.name;
                        item.itemName.current.value = props.state.items.item.itemName;
                        item.price.current.value = props.state.items.item.price;
                    }
                    M.updateTextFields();
                }
            }, 100);
        };
    })
    let submit = (event) => {
        event.preventDefault();
        props.onEditItem({
            id: props.match.params.id,
            name: item.name.current.value,
            itemName: item.itemName.current.value,
            price: item.price.current.value
        })
    }
    return (
        <div>
            <h4>Edit { props.state.items.item && props.state.items.item.name }</h4>
            <div className="row">
                <form className="col s12" onSubmit={ submit }>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input type="text" id="name" className="" ref={item.name} />
                            <label htmlFor="name">Name</label>
                            <p className="red-text text-darken-1">{ props.formErrors && props.formErrors.name }</p>
                        </div>
                        <div className="input-field col s12 m6">
                            <input type="text" id="item_name" className="" ref={item.itemName} />
                            <label htmlFor="item_name">Item Name</label>
                            <p className="red-text text-darken-1">{ props.formErrors && props.formErrors.itemName }</p>
                        </div>
                        <div className="input-field col s12 m6">
                            <input type="text" id="price" className="" ref={item.price} />
                            <label htmlFor="price">Price</label>
                            <p className="red-text text-darken-1">{ props.formErrors && props.formErrors.price }</p>
                        </div>
                    </div>
                    <button className="btn blue lighten-1">Save</button>
                </form>
            </div>
        </div>
    )
}

export default connect(
    (state, ownProps) => ({
        state: state,
        formErrors: state.items.formErrors,
        ownProps
    }),
    dispatch => ({
        onLocationChange: (match) => {
            dispatch(onLocationChange(match));
        },
        onGetItem: (id, items) => {
            dispatch(getItem(id, items));
        },
        onEditItem: (item) => {
            dispatch(editItem(item));
        }
    })
)(ItemDetail);
