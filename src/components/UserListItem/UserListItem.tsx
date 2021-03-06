import {FC, useState} from "react";
// default img
import defaultImg from '../../assets/svg/photo-cover.svg';
// styles
import styles from './UserListItem.module.scss';
// types
import {IUser} from "../../types";

interface IUserListItemProps {
    user: IUser,
}

const UserListItem: FC<IUserListItemProps> = ({user}) => {
    const {photo, email, position, name, phone} = user;
    const [errorPhoto, setErrorPhoto] = useState<boolean>(false);


    const addDefaultPhoto = () => {
        setErrorPhoto(true);
    }


    return (
        <li className={styles.userItem}>
            <div className={styles.userItem__photo}>
                <img onError={addDefaultPhoto} src={errorPhoto ? defaultImg : photo} alt={name} title={name}/>
            </div>

            <div className={styles.userItemInfo}>
                <p title={name} className={styles.userItemInfo__name}>{name}</p>
                <p title={position}>{position}</p>
                <p title={email}>{email}</p>
                <p title={phone}>{phone}</p>
            </div>
        </li>
    )
}

export default UserListItem;