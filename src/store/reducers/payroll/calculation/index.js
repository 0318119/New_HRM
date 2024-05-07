import {
    GET_PAYROLL_CAL_DATA,
    GET_PAYROLL_CAL_DATA_START,
    GET_PAYROLL_CAL_DATA_SINGLE,
    GET_PAYROLL_CAL_DATA_END,
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const Red_Resignation = (state = initState, action) => {
    switch (action.type) {
        case GET_PAYROLL_CAL_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case GET_PAYROLL_CAL_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case GET_PAYROLL_CAL_DATA_SINGLE:
            return {
                ...state,
                dataSingle: action.payload,
                loading: action.loading,
            };
        case GET_PAYROLL_CAL_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Resignation