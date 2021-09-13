
import Image from './image';

const nonUserBg = require('../../assets/images/bg.jpg').default;

const ProfileBackground = ({ bg }) => {
    return (
        <Image url={bg} nonImage={nonUserBg} className="user-bg object-cover absolute left-0 top-0 w-full" />
    )
}

export default ProfileBackground;