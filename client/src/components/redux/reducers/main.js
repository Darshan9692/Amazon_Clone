import { getproductsreducer } from "./productsreducer";
import {combineReducers} from 'redux';


const rootreducers = combineReducers({
    getproductsdata:getproductsreducer
});


export default rootreducers;