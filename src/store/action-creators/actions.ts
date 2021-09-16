import actionCreatorFactory from "typescript-fsa"
import {RowType, TableDataRowType} from "../../types/TableTypes";



const actionCreator = actionCreatorFactory()

export const somethingHappened = actionCreator<{dates:TableDataRowType[]}>('SOMETHING_HAPPENED')
export const newRow = actionCreator<{data:RowType}>('NEW_ROW')
export const delRow = actionCreator<{data:TableDataRowType}>('DEL_ROW')
export const editRow = actionCreator<{data:TableDataRowType, newData:TableDataRowType}>('Edit_ROW')
export const somethingAsync =
    actionCreator.async<{dates: TableDataRowType[]},
        {bar: TableDataRowType[]}>('SOMETHING_ASYNC')
