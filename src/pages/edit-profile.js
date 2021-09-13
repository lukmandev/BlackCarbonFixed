import { useSelector } from "react-redux";
import { useEffect } from "react";

import EditProfileContent from '../components/pages/edit-profile/index';
import Loading from '../components/loading';
import UserService from "../services/user";


const EditProfile = () => {
    const state = useSelector(({auth}) => auth);
    const {getProfile} = UserService();

    useEffect(() => {
        if(state.isAuth){
            getProfile();
        }
    }, [state.isAuth]);

    const outContent = () => {
        if(state.isAuth){
            if(state.profileLoaded){
                if(state.profileResponseError){
                    return <h1>SOME ERROR</h1>
                }
                return <EditProfileContent />
            }
            return <Loading />
        }else{
            return <h1>HELLO WORLD</h1>
        }
    }
    return outContent();
}

export default EditProfile;