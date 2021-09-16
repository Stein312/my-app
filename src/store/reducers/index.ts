import {combineReducers} from "redux";
import {dataTableReducer} from "./DataTableReducer";

export const rootReducer = combineReducers({tableRows:dataTableReducer,}
)
export type RootState = ReturnType<typeof rootReducer>