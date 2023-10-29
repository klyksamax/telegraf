export const ActionSizeClassName = {
    EXTRASMALL: "action-button_extra-small",
    SMALL: "action-button_small",
    MEDIUM: "action-button_medium",
    LARGE: "action-button_large",
    XTRALARGE: "action-button_xtraLarge",
};

export function getButtonIconSizeClassName(size) {
    if (!size || !ActionSizeClassName.hasOwnProperty(size)) {
        return "action-button_medium";
    }

    let result = ActionSizeClassName[size];

    return !result ? "action-button_medium" : result;
}