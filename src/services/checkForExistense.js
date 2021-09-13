import axios from 'axios';
import {useDispatch} from 'react-redux';

import {setFormMessage, setFormLoading} from '../redux/reducers/social';

const CheckExistenseService = () => {
    const dispatch = useDispatch();
    const checkForExistenseActions = {
        instagram: async (username) => {
            return true;
        },
        facebook: async () => {
            return true;
        },
        whatsapp: async () => {
            return true;
        },
        youtube: async () => {
            return true;
        },
        twitter: async () => {
            return true;
        },
        telegram: async () => {
            return true;
        },
        linkedin: async () => {
            return true;
        },
        behance: async () => {
            return true;
        },
    }
    return checkForExistenseActions;
}

export default CheckExistenseService;