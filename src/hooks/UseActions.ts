import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {newRow,delRow,editRow} from "../store/action-creators/actions";


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators({
        newRow, delRow, editRow
    }, dispatch)

}