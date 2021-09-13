import { useDispatch, useSelector } from "react-redux";
import {withFormik} from 'formik';
import * as Yup from 'yup';
import { useParams } from "react-router";

import checkModal from '../../utils/checkModal';
import modalNames from '../../constants/modalNames';
import formNames from '../../constants/formNames';
import { setName as setFormName, setMessage as setFormMessage} from '../../redux/reducers/form';
import {keyModel} from '../../constants/models';
import userService from '../../services/user';
import ModalService from '../../services/modal';

import ModalInput from '../modalInput';

const validation = Yup.object({
    key: Yup.string()
        .required("Поле сверху обязательно")
        .max(keyModel.max, "Это поле не должно быть больше 8 символов")
})


const CheckKeyModal = (props) => {
    const dispatch = useDispatch();
    const modalState = useSelector(({modal}) => modal);
    const formState = useSelector(({form}) => form);
    const {closeModal} = ModalService();


    return (
        <div className={`${checkModal(modalState.name, modalNames.CHECKKEY, modalState.isActive) ? "active": ""} checkKey w-full h-full fixed left-0 top-0 flex justify-center items-center`}>
            <div className="checkKey-modal relative">
                <div className={`form-loading ${checkModal(formState.name, formNames.CHECKKEY, formState.isLoading) ? "active": ""} absolute left-0 top-0 w-full h-full flex justify-center items-center`}>
                    <i className="fas fa-spinner text-white" />
                </div>
                <i onClick={closeModal} className="fal fa-times text-white close-modal absolute cursor-pointer" />
                <form onSubmit={props.handleSubmit} className="checkKey__form grid grid-cols-1 justify-center">
                   <ModalInput placeholder="Введите ключ" className="text-white" name="key" />
                    {checkModal(formState.name, formNames.CHECKKEY, formState.message) && <div className="text-white">{formState.message}</div>}
                    <button type="submit" className="flex justify-center items-center text-white">
                        Check
                    </button>
                </form>
            </div>
		</div>
    )
}


const FormWrapper = () => {
    const {id} = useParams();
    const {checkKey} = userService();
    const dispatch = useDispatch();
    const Form = withFormik({
        mapPropsToValues: () => ({ key: '' }),
      
        validationSchema: validation,
      
        handleSubmit: (values, { setSubmitting }) => {
            dispatch(setFormMessage(""));
            dispatch(setFormName(formNames.CHECKKEY));
            checkKey({id, ...values});
        },
      
        displayName: formNames.CHECKKEY,
    })(CheckKeyModal);

    return <Form/>;
}

export default FormWrapper;