import { combineReducers } from "redux";
import { QuanLySinhVienReducer } from "./QuanLySinhVienReducer";

// store tổng

export const rootReducer = combineReducers({
  // Nơi sẽ chứa các reducer cho từng nhiệm vụ
  QuanLySinhVienReducer,
});
