
const initialState = {
    provinces: [],
    districts: [],
    wards: []
};

export const LocationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROVINCES':
            return {
                ...state,
                provinces: action.payload,
                districts: [],
                wards: []
            };
        case 'SET_DISTRICTS':
            return {
                ...state,
                districts: action.payload,
                wards: []
            };
        case 'SET_WARDS':
            return { ...state, wards: action.payload };
        default:
            return state;
    }
}