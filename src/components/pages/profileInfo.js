

import ProfileAvatar from './profileAvatar';



const ProfileInfo = ({profile}) => {
    const outUserInfo = () => {
        const result = {
            name: "",
            position: "",
            nameClasses: "",
            positionClasses: ""
        }
        if(profile.name) {
            result.name = profile.name;
        }else{
            result.nameClasses = "text-yellow-500";
            result.name = 'Пользователь не написал свое имя';
        }
        if(profile.position){
            result.position = profile.position;
        }else{
            result.positionClasses = "text-yellow-500";
            result.position = "Пользователь не написал свою должность";
        }
        return (
            <div className="profile__user-info flex flex-col items-start justify-start">
                <span className={`${result.positionClasses} user-name text-white font-bold`}>
				    {result.name}
                </span>
                <span className={`${result.positionClasses} user-position text-white font-normal`}>
				    {result.position}
                </span>
            </div>
        )
    }
    return (
        <div className="profile__top items-center justify-center">
            <ProfileAvatar src={profile.avatar} />
            {outUserInfo()}
        </div>
    )
}

export default ProfileInfo;