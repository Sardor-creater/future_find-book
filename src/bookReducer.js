import { getInfo } from "./api";

const SET_LOAD_MORE = "SET_LOAD_MORE";
const SET_SEARCH = "SET_SEARCH";
const SET_RESET = 'SET_RESET';
const SET_ERROR = 'SET_ERROR';

const initialState = {
	items: [],
	totalItems:0, 
	get: true,
	error:false
};

export default function bookReducer(state = initialState, action) {
	switch (action.type) {
		case SET_LOAD_MORE:
			return { ...state,  items:[ ...state.items, ...action.payload.items], get:true, error:false };
		case SET_SEARCH:
				return { ...state,  items : action.payload.items, totalItems:action.payload.totalItems, get:true, error:false };
		case SET_RESET:
			return {...initialState, get:false};
			case SET_ERROR:
			return {...initialState, error:true};
		default:
			return state;
	}
}

export const setLoadMore = (info) => ({
	type: SET_LOAD_MORE,
	payload: info,
});

export const setSearch = (info) => ({
	type: SET_SEARCH,
	payload: info,
});

export const setReset = () => ({
	type: SET_RESET
});

export const setError = () => ({
	type: SET_ERROR
});

export const getBooks = (page, query, category, sort, func) => {
	return async (dispatch) => {
try {
	const response = await getInfo(page, query, category, sort);
	if (response.data.totalItems === 0 || !response ) {
		dispatch(setReset())
	} else{
		if (func === 'search') {
			dispatch(setSearch(response.data));
		} else{
			dispatch(setLoadMore(response.data));
		}
	}
	
} catch (error) {
	dispatch(setError())
}
		
		
	};
};