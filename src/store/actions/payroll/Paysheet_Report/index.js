import {
    GET_PAYSHEET_Report_DATA,
    GET_PAYSHEET_Report_START,
    GET_PAYSHEET_Report_PAYROLL,
    GET_PAYSHEET_Report_END,
    GET_PAYSHEET_GetallPayrollCategories_DATA,
    GET_PAYSHEET_Employee_Category_DATA
} from '../../../actions/types.js'

import baseUrl from '../../../../config.json'


export const GetallPayrollCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_PAYSHEET_Report_START,
            payload: true,
            loading: true,
        });

        const response = await fetch(`${baseUrl.baseUrl}/payrollCategories/GetallPayrollCategoriesWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_PAYSHEET_GetallPayrollCategories_DATA,
                payload: [{ res }],
                loading: false,
            });

            // console.log("Received payload:", res); 
        } else {
            const errorRes = await response.json();
            dispatch({
                type: GET_PAYSHEET_Report_END,
                payload: [{errorRes}],
                loading: false,
            });
            console.error("Error response:", errorRes);
        }
    } catch (error) {
        dispatch({
            type: GET_PAYSHEET_Report_END,
            payload: false,
            loading: false,
        });
        console.error("Fetch error:", error);
    }
};

export const GetEmployee_Category = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_PAYSHEET_Report_START,
            payload: true,
            loading: true,
        });

        const response = await fetch(`${baseUrl.baseUrl}/employment_category/GetEmploymentCategoryWOP`, {
            method: "GET",
            headers: {
                'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const res = await response.json();
            dispatch({
                type: GET_PAYSHEET_Employee_Category_DATA,
                payload: [{ res }],
                loading: false,
            });
        } else {
            const errorRes = await response.json();
            dispatch({
                type: GET_PAYSHEET_Report_END,
                payload: [{errorRes}],
                loading: false,
            });
            console.error("Error response:", errorRes);
        }
    } catch (error) {
        dispatch({
            type: GET_PAYSHEET_Report_END,
            payload: false,
            loading: false,
        });
        console.error("Fetch error:", error);
    }
};


export const PostPaysheetPayload = (data) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/paysheet/ReportMonthlyPaysheetCO_1`, {
        method: "POST",
        headers: {
            accessToken: "Bareer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "Payslip_year": data?.Payslip_year,
            "Payslip_month": data?.Payslip_month,
            "Employee_category_code": data?.Employee_category_code,
            "payroll_category_code": data?.payroll_category_code
        }),
    });
    const res = await response.json();
    console.log(res, 'rtes')
    if (res?.success) {
        return res;
    } else {
        return res;
    }
};