import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { useMemo, useEffect } from 'react';

import TextArea from '../modalTextArea';

import {setName as setFormName, setMessage as setFormMessage, setLoading as setFormLoading, setErrors} from '../../redux/reducers/form';
import checkModal from '../../utils/checkModal';
import modalNames from '../../constants/modalNames';
import {userModel} from '../../constants/models';
import modalService from '../../services/modal';
import formNames from '../../constants/formNames';
import {outDifferents} from '../../utils/form';
import changeProfileService from '../../services/changeProfile';



const EditDescription = (props) => {
    const dispatch = useDispatch();
    const modalState = useSelector(allState => allState.modal);
    const formState = useSelector(allState => allState.form);

	const {closeModal} = modalService();

	const outButtonText = () => {
        const {index, result} = outDifferents(props.values, props.initialValues);
        if(index){
            return "Сохранить";
        }else{
            return "Измените";
        }
    }


    return (
        <div className={`${checkModal(modalState.name, modalNames.EDITDESCRIPTION, modalState.isActive) ? "active": ""} user-biography-wrapper fixed left-0 top-0 w-full h-full flex justify-center items-center`}>
		    <div className="user-biography-modal relative">
		  	    <div className={`form-loading ${checkModal(modalState.name, modalNames.EDITDESCRIPTION, formState.isLoading) ? "active": ""} absolute left-0 top-0 w-full h-full flex justify-center items-center`}>
			  	    <i className="fas fa-spinner text-white" />
			    </div>
		        <i onClick={closeModal} className="fal fa-times text-white close-modal absolute cursor-pointer" />
                <form onSubmit={props.handleSubmit} className="biography-change-form grid grid-cols-1 justify-start">
		    		<TextArea className="biography-text resize-none text-white" placeholder="Напишите о себе" name="description" />
				    <div className="modal__bottom">
				        <button type="submit" className="save-changes-btn text-white font-semibold">
				          	{outButtonText()}
				        </button>
				        {checkModal(modalState.name, modalNames.EDITDESCRIPTION, formState.message) && <div className="text-white">{formState.message}</div>}
				  	</div>
			    </form>
            </div>
		</div>
    )
}

const FormWrapper = () => {
	const dispatch = useDispatch();
	const description = useSelector(state => state.auth.profile.description);
	const validation = Yup.object().shape({
		description: Yup.string()
			.max(userModel.description.max, `Максимум ${userModel.description.max} символов`)
	});
	const {changeProfile} = changeProfileService();

	const initialValues = useMemo(() => {return {description}}, [description]);

	const Form = withFormik({
        mapPropsToValues: () => (
			initialValues
		),

		enableReinitialize: true,
      
        validationSchema: validation,
      
        handleSubmit: (values, actions) => {
            dispatch(setFormMessage(""));
            dispatch(setFormName(formNames.EDITDESCRIPTION));
        	const {index, result} = outDifferents(values, initialValues);
			if(index){
				changeProfile({
					info: result,
                    beforeFetch: () => {
                        dispatch(setFormLoading(true));
                    },
                    successHandle: () => {
                        dispatch(setFormMessage("Успешно изменено"));
                    },
                    errorHandle: (e) => {
                        const info = {
                            message: "",
                            hasError: false
                        }
                        if(e.response){
                            if(e.response.status === 400 && e.response.data){
                                actions.setErrors(e.response.data);
                                info.message = "";
                                info.hasError = false;
                            }else{
                                info.hasError = true;
                                info.message = "Произошла какая то ошибка";
                            }
                        }else{
                            info.message = "Произошла какая то ошибка";
                            info.hasError = true;
                        }
                        dispatch(setFormMessage(info.message));
                        dispatch(setErrors(info.hasError));
                    },
                    afterFetch: () => {
                        dispatch(setFormLoading(false));
                    }
				})
			}
        },
      
        displayName: formNames.EDITDESCRIPTION,
    })(EditDescription);
	return <Form />
}

export default FormWrapper;