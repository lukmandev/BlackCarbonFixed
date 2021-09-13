import {useSelector} from "react-redux";


const UserDescription = ({ description }) => {
    const outDescription = () => {
        if(description){
            return (
                <div className="user-biography w-full grid items-center">
                    <p className="text-white">{description}</p>
                </div>
            )
        }
        return <div className="w-full grid grid-cols-1 items-center justify-start">
            <p className="user-biography-empty font-normal text-white">Пользователь не написал ничего о себе</p>
        </div>
    }
    return outDescription();
}

export default UserDescription;