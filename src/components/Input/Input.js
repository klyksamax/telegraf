import { observer } from "mobx-react-lite";
import { useState } from "react";

const Input = observer(({element, onChangeInput }) => {

    const [inputValue, setInputText] = useState(element?.value)

    function onChange(e) {
        const value = e.target.value
        onChangeInput({
            id: element.id,
            title: element.title,
            value: value
        })
        setInputText(value)
    }

    return (
        <label className="form-control__label">
            <h3>{element.title}</h3>
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
