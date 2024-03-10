import React , {useContext, useEffect} from "react";
import { boardDefault } from "./Words";
import App, { AppContext } from "../App";




function EmptyLetter() {
    
    return (
        <div className="letter"></div>
    );
}

export default EmptyLetter ; 