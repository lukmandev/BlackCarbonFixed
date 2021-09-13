import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import ProfileBackground from '../profileBackground';
import ProfileInfo from '../profileInfo';
import UserDescription from '../profileDescription';
import EditDescription from '../../modals/editDescription';
import EditUserBg from '../../modals/editUserBg';
import EditUserInfo from '../../modals/editUserInfo';
import EditAvatar from '../../modals/editAvatar';
import Socials from '../../modals/socials';
import Form from './form';
import EditSocial from '../../modals/editSocial';


import modalNames from '../../../constants/modalNames';
import ModalService from '../../../services/modal';



const EditProfileContent = () => {
    const profile = useSelector(({auth}) => auth.profile);
    const dispatch = useDispatch();

    const {openModal} = ModalService();

    return ( 
        <div className="profile w-full">
            <div className="flex justify-end absolute right-0 top-0 z-3">
                <button className="text-white" onClick={() => openModal(modalNames.EDITUSERBG)}>EDIT USER BG</button>
            </div>
            <ProfileBackground bg={profile.user_bg} />
            <EditDescription />
            <EditAvatar />
            <EditUserBg />
            <EditUserInfo />
            <Socials />
            <EditSocial />
            <div className="wrapper">
                <div className="profile-holder">
                    <div>
                        <ProfileInfo profile={profile} />
                        <div className="flex justify-end">
                            <button className="text-white" onClick={() => openModal(modalNames.EDITIMPORTANTINFO)}>EDIT USER INFO</button>
                        </div>
                        <button className="text-white" onClick={() => openModal(modalNames.EDITUSERAVATAR)}>
                            Изменить
                        </button>
                    </div>
                    <div className="profile__form w-full grid grid-col-1">
                        <div className="flex flex-col items-start">
                            <UserDescription description={profile.description} />
                            <button onClick={() => openModal(modalNames.EDITDESCRIPTION)} className="text-white p-2 bg-black">Edit description</button>
                        </div>
                        <Form />
                        <button className="save-changes-btn text-white" onClick={() => openModal(modalNames.EDITSOCIALS)}>
                            Изменить социальные сети
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default EditProfileContent;