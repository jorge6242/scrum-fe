import {
    ACTIONS
} from '../Actions/productActions';

const initialState = {
    products: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state;
    }
};

export default productReducer;