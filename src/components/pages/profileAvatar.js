import { useState } from 'react';
import { useSelector } from 'react-redux';

import Image from './image.js';


const nonUserAvatar = require('../../assets/images/profile.png').default;

const ProfileAvatar = ({src}) => {
	return (
		<div className="w-full p-100 relative">
			<div className="profile__img absolute left-0 top-0 w-full h-full">
                <Image url={src} nonImage={nonUserAvatar} className="object-cover w-full h-full" />
			</div>
		</div>
	)
}


export default ProfileAvatar;