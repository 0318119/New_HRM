import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../../components/basic/button";
import * as ACTIONS from '../../../store/actions/payroll/calculations/index';
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from '../../../components/basic/input/formInput';
import * as yup from "yup";
import { message } from 'antd';
import Header from "../../../components/Includes/Header";
import '../../pages/Calculation/index.css'

function Payroll_monthly_calculation({
  Red_Payroll_cal,
  GET_PAYROLL_CAT,
  Get_HR_Stop_Flag,
  POST_HR_ENTRY
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false)
  const [storeText, setStoreText] = useState('')
  const getEntry = Red_Payroll_cal?.dataSingle?.[0]?.res?.data[0]?.HR_Entry_Stop_Flag
  const AppointFamilySchema = yup.object().shape({
    Petrol_Rate: yup.number().required("Petrol Rate is required"),
    Dollar_Rate: yup.number().required("Dollar Rate is required"),
  });

  const submitForm = async (data) => {
    try {
      const isValid = await AppointFamilySchema.validate(data);
      if (isValid) {
        HR_ENTRY(data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit, reset } =
    useForm({
      defaultValues: {
        Meal_Deduction_Flag: "",
        Petrol_Rate: "",
        Dollar_Rate: "",
      },
      mode2: "onChange",
      resolver: yupResolver(AppointFamilySchema),
    });

  const SaveForm = async () => {
    try {
      const response = await GET_PAYROLL_CAT({
        "Payslip_category": localStorage.getItem("Payroll_Category"),
      });
      if (response && response.success) {
        setStoreText(response?.message?.[0]?.v_str)
      } else {
        messageApi.error(response?.message);
      }
    } catch (error) {
      console.error("Error occurred while changing Marriage:", error);
      messageApi.error("An error occurred while Save Marriage");
    }
  };

  const HR_ENTRY = async (data) => {
    try {
      setLoading(true)
      const response = await POST_HR_ENTRY({
        "PayrollCategory": localStorage.getItem("Payroll_Category"),
        "Meal_Deduction_Flag": getEntry,
        "Petrol_Rate": data?.Petrol_Rate,
        "Dollar_Rate": data?.Dollar_Rate
      });
      if (response && response.success) {
          messageApi.success(response?.message)
          setLoading(false)
      } else {
        messageApi.error(response?.message);
        setLoading(false)
      }
    } catch (error) {
      console.error("Error occurred while changing Marriage:", error);
      messageApi.error("An error occurred while Save Marriage");
      setLoading(false)
    }
  };


  useEffect(() => {
    SaveForm()
    Get_HR_Stop_Flag()
  }, [])


  useEffect(() => {
    if (getEntry == "N") { messageApi.error("Please stop HR Entry before Process") }
    else { }
  }, [])



  return (
    <>
      <Header />
      {contextHolder}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="Payroll_Calculations_box">
              <h2 className="text-dark"> Payroll Calculations</h2>
              <form onSubmit={handleSubmit(submitForm)}>
                <hr />
                <p>
                  Please note that this program will process payroll for the month of {storeText} for Regular Staff.
                  Do you want to proceed?
                </p>
                <div className="form-group">
                  <FormInput
                    label={'Petrol Rate'}
                    placeholder={'Petrol Rate'}
                    id="Petrol_Rate"
                    name="Petrol_Rate"
                    type="number"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className="form-group">
                  <FormInput
                    label={'Dollar Rate'}
                    placeholder={'Dollar Rate'}
                    id="Dollar_Rate"
                    name="Dollar_Rate"
                    type="number"
                    showLabel={true}
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className='CountryBtnBox'>
                  {getEntry == "N" ? null :
                    <PrimaryButton type={'submit'} loading={isLoading} title="Process" />
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function mapStateToProps({ Red_Payroll_cal }) {
  return { Red_Payroll_cal };
}
export default connect(mapStateToProps, ACTIONS)(Payroll_monthly_calculation)
