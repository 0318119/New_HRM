import baseURL from '../../../../config.json'
import {
  GET_SALARY_ON_HOLD,
  GET_SALARY_ON_HOLD_START,
  GET_SALARY_ON_HOLD_END
} from '../../types'

// export const GetSalaryOnHold = (body) => async (dispatch, getState) => {
//     try {
//         const response = await fetch(`${baseURL.baseUrl}/reports/SalaryOnHoldReport`, {
//             method: "GET",
//             headers: {
//                 'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
//                 'Content-Type': 'application/json',
//             },
//         });
//         const res = await response.json()
//         return res.data
//     }
//     catch (error) {
//         console.log(error)
//     }

// }


export const getSalaryOnHold = (body) => async (dispatch, getState) => {
    try {       
        dispatch({
            type: GET_SALARY_ON_HOLD_START,
            payload: true,
        });
        const response = await fetch(`${baseURL.baseUrl}/reports/SalaryOnHoldReport`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        if (res?.success == "success") {
            dispatch({
                type: GET_SALARY_ON_HOLD,
                payload: res.data,
            });
        }
        dispatch({
            type: GET_SALARY_ON_HOLD_END,
            payload: false,
        });
    }
    catch (error) {
        dispatch({
            type: GET_SALARY_ON_HOLD_END,
            payload: false,
        });
        console.log(error)
    }

}