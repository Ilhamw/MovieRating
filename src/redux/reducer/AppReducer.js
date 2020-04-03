import {combineReducers} from 'redux';
import {AuthReducer} from './AuthReducer';
import {MovieReducer} from './MovieReducer';
import {UserReducer} from './UserReducer';
import {RateReducer} from './RateReducer'

export default combineReducers({
    auth: AuthReducer,
    movie: MovieReducer,
    user: UserReducer,
    rate: RateReducer
});
