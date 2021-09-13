import * as Yup from 'yup';
import {Formik} from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


import Input from './inputField';
import PhoneInputField from './phoneInputField';
import {userModel} from '../../../constants/models';
import formNames from '../../../constants/formNames';
import { outDifferents } from "../../../utils/form";
import changeProfileService from '../../../services/changeProfile';
import {setLoading, setMessage, setName, setErrors} from '../../../redux/reducers/form';
import checkModal from '../../../utils/checkModal';


const validation = Yup.object().shape({
    phone: Yup.string()
        .max(userModel.phone.max, `Максимум ${userModel.phone.max} цифр`)
        .nullable(),
    email: Yup.string()
        .email("Поле email должен быть правильным")
        .nullable()
});

const Form = () => {
    const dispatch = useDispatch();
    const formState = useSelector(allState => allState.form);
    const profile = useSelector(allState => allState.auth.profile);

    const {changeProfile} = changeProfileService();


    const outButtonText = (props) => {
        const {index, result} = outDifferents(props.values, props.initialValues);
        if(index){
            return "Сохранить";
        }else{
            return "Измените";
        }
    }
    const initialValues = {
        email: profile.email,
        other_link: profile.other_link,
        phone: profile.phone
    }

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validation}
            onSubmit={async (values, actions) => {
                dispatch(setName(formNames.EDITUSERINFO));
                const {index, result} = outDifferents(values, initialValues);
                if(index){
                    const errors = await changeProfile({
                        info: result,
                        beforeFetch: () => {
                            dispatch(setLoading(true));
                        },
                        successHandle: () => {
                            dispatch(setMessage("Успешно изменено"));
                        },
                        errorHandle: () => {
                            dispatch(setMessage("Произошла какая то ошибка"));
                        },
                        afterFetch: () => {
                            dispatch(setLoading(false));
                        }
                    });
                    actions.setErrors(errors);
                }
            }}
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit} className="relative">
                    <div className={`edit-profile-loading ${checkModal(formState.name, formNames.EDITUSERINFO, formState.isLoading) ? "active": ""} absolute left-0 top-0 w-full h-full flex justify-center items-center`}>
                        <i className="fas fa-spinner text-white" />
                    </div>
                    <Input placeholder="Введите свой email" icon="far fa-envelope" name="email"/>
                    <Input placeholder="Введите свой сайт" icon="far fa-envelope" name="other_link"/>
                    <PhoneInputField placeholder="Введите свой email" icon="far fa-envelope" name="phone"/>
                    {checkModal(formState.name, formNames.EDITUSERINFO, formState.message) && <div className="text-white">{formState.message}</div>}
                    <button type="submit" className="mt-2 save-changes-btn user-connect-btn flex justify-center items-center w-full text-white">
                        {outButtonText(formik)}
                    </button>
                </form>
            )}
        </Formik>
    )
}

export default Form;