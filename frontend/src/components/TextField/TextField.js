import styles from '../InputPractice/InputPractice.module.css'
import { useField, ErrorMessage } from 'formik';

const TextField = ({ label, ...props }) => {

    const [field, meta] = useField(props);

    return (
        <div className={styles.input_container}>
            <label htmlFor={field.name}>{label}</label>
            <input {...field}  {...props} id={field.name} className={`${meta.touched && meta.error && styles.invalid}`} autoComplete="off" />
            <div style={{ color: "red" }}><ErrorMessage name={field.name} /></div>
        </div>
    )

}


export default TextField;