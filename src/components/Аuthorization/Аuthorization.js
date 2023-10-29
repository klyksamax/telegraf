import { observer } from "mobx-react-lite";
import { useState } from "react";
import { login } from "../const";
import Input from "../Input/Input";



const Аuthorization = observer(({ handleAuth }) => {

    const [inputValue, setInputText] = useState("")

    function onChange(e) {
        const value = e.target.value
        setInputText(value)
    }

    return (
        <div className="authorization__container">
            {login.map((el, i) => {
                    
                    return <Input key={i} element={el} />
                })}
        </div>
    );
});

export default Аuthorization;
