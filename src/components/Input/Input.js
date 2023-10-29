import { observer } from "mobx-react-lite";
import { useState } from "react";

const Input = observer(({ element }) => {

    const [inputValue, setInputText] = useState(element[1])

    function onChange(e) {
        const value = e.target.value
        setInputText(value)
    }

    return (
        <label className="form-control__label">
            <h3>{element[0]}</h3>
            <input
                id={""}
                type={""}
                className="form-control__input"
                placeholder={""}
                onChange={(e) => {
                    onChange(e);
                }}
                value={inputValue}
                title={""}
                readOnly={""}
                spellCheck="true"
            />
            {/* <span className="form-control__field-error">
          {isRequired && value === "" && errorOnSave
            ? "Обязательное поле"
            : errorsFieldText}
        </span> */}
        </label>
    );
});

export default Input;
