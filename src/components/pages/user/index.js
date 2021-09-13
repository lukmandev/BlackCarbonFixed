import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import ProfileBackground from '../profileBackground';
import ProfileInfo from '../profileInfo';
import UserDescription from '../profileDescription';
import InfoGroup from './infoGroup';
import SocialsOut from './socialsOut';

import CheckKeyModal from '../../modals/checkKey';
import { setName, setActive } from '../../../redux/reducers/modal';
import modalNames from '../../../constants/modalNames';



const UserPageContent = () => {
    const state = useSelector(({user}) => user);
    const dispatch = useDispatch();


    const openModal = () => {
        dispatch(setName(modalNames.CHECKKEY));
        dispatch(setActive(true));
    }
    return (
        <div className="profile w-full">
            <CheckKeyModal />
            <ProfileBackground bg={state.user.user_bg} />
            <div className="wrapper">
                <div className="profile-holder">
                    <ProfileInfo profile={state.user} />
                    <div className="profile__form w-full grid grid-col-1">
                        <UserDescription description={state.user.description} />
                        <InfoGroup />
                        <SocialsOut />
                        <div className="profile__bottom flex justify-center items-center grid grid-col-1">
                            <span onClick={openModal} className="font-light cursor-pointer profile__bottom-text flex justify-center">
                                Its your account?
                            </span>
						</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UserPageContent;