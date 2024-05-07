import {
    GET_SALARY_ON_HOLD,
    GET_SALARY_ON_HOLD_START,
    GET_SALARY_ON_HOLD_END,
} from '../../../actions/types'


const initState = {
    data: [],
    dataSingle: [],
    loading: false,
}

const SalaryOnHold = (state = initState, action) => {
    switch (action.type) {
        case GET_SALARY_ON_HOLD_START:
            return {
                ...state,
                loading: action.payload,
            };
        case GET_SALARY_ON_HOLD:
            return {
                ...state,
                data: action.payload,
            };
        case GET_SALARY_ON_HOLD_END:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default SalaryOnHold;