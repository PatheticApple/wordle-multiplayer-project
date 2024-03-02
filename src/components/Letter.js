import React , {useContext} from "react";
import { boardDefault } from "./Words";
import App, { AppContext } from "../App";


function Letter({ letterPos, attemptVal}) {
    const {board} = useContext(AppContext);
    const letter = board[attemptVal][letterPos];
    return (
        <div className="letter">{letter}</div>
    );
}

export default Letter