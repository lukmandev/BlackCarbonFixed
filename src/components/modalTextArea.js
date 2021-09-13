import { useField } from "formik"


const TextArea = (props) => {
    const [field, meta] = useField(props);
    return (
        <textarea 
            {...field}
            {...props}
        ></textarea>
    )
}

export default TextArea;