import {
  COMPLAINT_TYPE,
  CODE_NUMBER_CHECK,
} from "../../actionTypes/studentActionType";
import { dispatchAction, getHeaders } from "../actionHelper";
import { studentApi } from "../../apis/apis";
import { updateToast } from "../toastActions";
import { CodeAnalogy } from "../../Components/Toasty/Toasty";
export const setComplaintType = (data) => {
  return {
    type: COMPLAINT_TYPE,
    payload: data,
  };
};

export const checkCodeNumber = async (number, code) => {
  try {
    const headers = getHeaders({
      code,
      number,
    });
    const res = await studentApi.get("/checkCodeNumber", headers);
    if (res.data.code == 200) {
      dispatchAction(CODE_NUMBER_CHECK, res.data.model);
      updateToast({
        code: CodeAnalogy.SUCCESS,
        title: `Welcome to ${res.data.model.propertyName}`,
        message: "Please make Sure code is correct.",
      });
      return true;
    } else {
      updateToast({
        code: CodeAnalogy.ERROR,
        title: "Something Went Wrong",
        message: "Please make Sure code is correct.",
      });
      return false;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const studentLogin = async (email, password) => {
  try {
    const headers = getHeaders({
      email,
      password,
    });
    const res = await studentApi.get("/studentLogin", headers);
    if (res.data.code == 200) {
      dispatchAction(CODE_NUMBER_CHECK, res.data.model);
      updateToast({
        code: CodeAnalogy.SUCCESS,
        title: `Welcome to ${res.data.model.propertyName}`,
      });
      return true;
    } else {
      updateToast({
        code: CodeAnalogy.ERROR,
        title: res.data.model,
      });
      return false;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const addStudent = async (data) => {
  try {
    const res = await studentApi.post("/addStudent", data);
    if (res.data.code == 200) {
      dispatchAction(CODE_NUMBER_CHECK, res.data.model);
      updateToast({
        code: CodeAnalogy.SUCCESS,
        title: `Successfully Signed Up`,
      });
      return true;
    } else {
      updateToast({
        code: CodeAnalogy.ERROR,
        title: "Something Went Wrong",
        message: "Please try again later",
      });
      return false;
    }
  } catch (error) {
    console.log(error.message);
  }
};