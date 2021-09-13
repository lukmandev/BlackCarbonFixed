import {useField} from "formik";


const ModalInput = (props) => {
    const [field, meta] = useField(props);
    return (
        <>
            <input
                {...field}
                value={field.value ? field.value : ""}
                {...props}
            />
            {meta.error && <div className="text-white">{meta.error}</div>}
        </>
    )
}


export default ModalInput;