import { ApartmentTypes } from "../types/apartment";
import axios from "axios";
const { GET_ITEM, ADD_ITEM, DELETE_ITEM } = ApartmentTypes;

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.withCredentials = true;

export const getItem = async (dispatch) => {
  const response = await axios.get("api/");

  if (response.status === 200) {
    return dispatch({
      type: GET_ITEM,
      payload: response.data,
    });
  }

  console.log("Error");
};

export const getItemId = (id) => (dispatch) => {
  axios
    .get(`api/${id}`)
    .then((res) => {
      dispatch({
        type: GET_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const addItem = (data) => async (dispatch) => {
  const response = await axios
    .post("api/", data)
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
  return response;
};

export const deleteItem = (id) => (dispatch) => {
  axios
    .delete(`api/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_ITEM,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
