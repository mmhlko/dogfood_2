import classNames from "classnames";
import s from "./styles.module.scss"
import { ForwardedRef, HTMLProps, forwardRef, memo } from "react";

type TUnitedInputElement = {
    label?: string;
    validationError?: string
    typeTag?: "input" | "textarea" | "select"
    textLength?: number
    extraClass?: string
} & HTMLProps<HTMLInputElement> & HTMLProps<HTMLTextAreaElement> & HTMLProps<HTMLSelectElement>

export const FormInput = memo(forwardRef<HTMLInputElement | HTMLTextAreaElement, TUnitedInputElement>((
    { label, validationError, typeTag = "input", textLength, extraClass, ...props }, ref) => {

    const setInputStyle = (type: string) => {
        switch (type) {
            case "checkbox":
                return s.checkbox
            case "radio":
                return classNames(s.checkbox, s.radio)
            default:
                return classNames(s.input, { [extraClass]: !!extraClass })
        }
    }

    const setInputVariant = () => {
        switch (typeTag) {
            case "textarea":
                return <textarea ref={ref as ForwardedRef<HTMLTextAreaElement>} className={classNames(s.input, s.textarea)} {...props} />
            default:
                return <input ref={ref as ForwardedRef<HTMLInputElement>} className={setInputStyle(props.type)} {...props} />
        }
    }

    return (
        <div className={classNames(s.wrapper, { [s.inputGroup]: (props.type === "radio" || props.type === "checkbox") })} >
            {label && props.type !== "radio" && props.type !== "checkbox" && <label className={s.label}>{label}</label>}
            {setInputVariant()}
            {(props.type === "radio" || props.type === "checkbox") && <label className={s.label} htmlFor={props.id}>{label}</label>}
            {validationError && <p className="errorMessage">{validationError}</p>}
            {typeTag === "textarea" && <span className={s.text_length}>{textLength}</span>}
        </div>
    );
}))