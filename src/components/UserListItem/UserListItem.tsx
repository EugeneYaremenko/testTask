import {FC} from "react";
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

    const addDefaultProps = (e: any): void => {
        e.target.src = defaultImg;
        e.target.title = 'No avatar';
    }

    return (
        <li className={styles.userItem}>
            <div className={styles.userItem__photo}>
                {
                    photo ?
                        <img onError={addDefaultProps} src={photo} alt={name} title={name}/> :
                        <img src={defaultImg} alt='No avatar' title='No avatar'/>
                }
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