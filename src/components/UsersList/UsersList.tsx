import {FC, useEffect, useState} from "react";
// redux
import {userAPI} from "../../services/UserService";
// styles
import styles from "./UsersList.module.scss";
// types
import {IUser} from "../../types";
// components


const UsersList: FC = () => {
    const {data: users, error, isLoading} = userAPI.useFetchUsersQuery({page: 1, count: 6});
    const [sortedUsers, setSortedUsers] = useState<IUser[]>([]);

    useEffect(() => {
        console.log(users);
    }, [users]);


    return (
        <section className={styles.usersList}>
            <h2 className={styles.usersList__title}>Working with GET request</h2>


        </section>
    )
}

export default UsersList;