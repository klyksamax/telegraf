import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import { getButtonIconSizeClassName } from "./ButtonUtils";


const ButtonIcon = observer(
    React.forwardRef(
        (
            {
                name,
                id,
                btnSelector,
                iconSelector,
                size,
                onClick,
                ariaLabel,
                disabled,
                disabledAction,
                text,
                tooltip,
                style,
                tabIndex,
            },
            ref
        ) => {
            const sizeClassName = useMemo(() => {
                return getButtonIconSizeClassName(size);
            }, [size]);
            return (
                <button
                    type="button"
                    ref={ref}
                    name={name}
                    id={id}
                    className={` ${disabledAction ? "action-button_disabled-action" : "action-button"
                        } ${disabled ? "action-button_disabled" : ""} ${btnSelector} 
            ${sizeClassName ? sizeClassName : ""}`}
                    onClick={onClick}
                    aria-label={ariaLabel}
                    title={tooltip}
                    style={style}
                    data-testid="search-button"
                    disabled={disabled ? true : ""}
                    tabIndex={tabIndex ? tabIndex : "-1"}
                >
                    {iconSelector ? <svg className={`action-button__svg ${iconSelector}`} /> : null}
                    {text && text !== "" && (
                        <span className="action-button__span">{text}</span>
                    )}
                </button>
            );
        }
    )
);

export default ButtonIcon;
