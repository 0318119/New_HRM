import baseUrl from '../../../../config.json'
import { 
    GET_PAYROLL_CAL_DATA, 
    GET_PAYROLL_CAL_DATA_START,
    GET_PAYROLL_CAL_DATA_SINGLE,
    GET_PAYROLL_CAL_DATA_END } 
    from "../../types"



export const GET_PAYROLL_CAT = (data) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/tranPaySlips/Process_TranPaySlips`, {
      method: "POST",
      headers: {
        accessToken: "Bareer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Payslip_category" : data?.Payslip_category
      }),
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
  };


  export const POST_HR_ENTRY = (data) => async () => {
    const response = await fetch(`${baseUrl.baseUrl}/payroll/Process_MonthlyPayroll`, {
      method: "POST",
      headers: {
        accessToken: "Bareer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "PayrollCategory": data?.PayrollCategory,
        "Meal_Deduction_Flag": data?.Meal_Deduction_Flag,
        "Petrol_Rate": data?.Petrol_Rate,
        "Dollar_Rate": data?.Dollar_Rate
      }),
    });
    const res = await response.json();
    if (res?.success) {
      return res;
    }else{
      return res;
    }
  };

  export const Get_HR_Stop_Flag = () => async (dispatch) => {
    try {
      dispatch({
        type: GET_PAYROLL_CAL_DATA_START,
        payload: true,
        loading: true,
      });
      const response = await fetch(
        `${baseUrl.baseUrl}/employee_salary/Get_HR_Stop_Flag`,
        {
          method: "GET",
          headers: {
            accessToken: "Bareer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        dispatch({
          type: GET_PAYROLL_CAL_DATA_SINGLE,
          payload: [{ res }],
          loading: false,
        });
      } else {
        const res = await response.json();
        dispatch({
          type: GET_PAYROLL_CAL_DATA_END,
          payload: [{ res }],
          loading: false,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_PAYROLL_CAL_DATA_END,
        payload: false,
        loading: false,
      });
      console.log(error);
    }
  };