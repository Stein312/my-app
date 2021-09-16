import {Action} from 'redux'
import {isType} from 'typescript-fsa'
import {newRow, somethingAsync, somethingHappened, delRow, editRow} from "../action-creators/actions";
import {TableDataRowType, TableDatesState} from "../../types/TableTypes";

const firstName = ['Edward', 'Bran', 'Elizabet', 'Mister', 'Magnus']
const lastName = ['Bowie', 'Kiss', 'Dow', 'Me', 'Li']
let maxKey: number = 0;
const firstLastName: string[] = []
for (let i = 0; i < firstName.length; i++) {
    for (let j = 0; j < lastName.length; j++)
        firstLastName.push(firstName[i] + " " + lastName[j])
}
const data: TableDataRowType[] = []

for (let i = 0; i < firstLastName.length; i++) {
    data.push({
        key: i,
        name: `${firstLastName[i]}`,
        age: 20 + i,
        address: `London Park no. ${i}`,
    });
    maxKey++
}
const initialState: TableDatesState = {dates: data}

export const dataTableReducer = (state: TableDatesState = initialState, action: Action): TableDatesState => {

    if (isType(action, somethingHappened)) {
        return {dates: action.payload.dates}
    }
    if(isType(action,editRow)){
        const index = state.dates.indexOf(action.payload.data, 0);
        state.dates[index]=action.payload.newData;
    }
    if(isType(action,delRow)){
        const index = state.dates.indexOf(action.payload.data, 0);
        if (index > -1) {
            state.dates.splice(index, 1);
        }
    }
    if (isType(action, newRow)) {
        const data = action.payload.data
        state.dates.push({
            key: maxKey,
            name: data.name,
            age: data.age,
            address: data.address,})
        console.log(state.dates[maxKey])
        maxKey++
        return state
    }
    if (isType(action, somethingAsync.started)) {
        return {dates: action.payload.dates}
    }
    if (isType(action, somethingAsync.done)) {
        return {dates: action.payload.result.bar}
    }
    return state
}