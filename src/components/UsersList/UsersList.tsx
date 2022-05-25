import {FC, useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
// redux
import {userAPI} from "../../store/redux/services/UserService";
import {useAppDispatch} from "../../hooks/redux";
import {setGlobalLoading} from "../../store/redux/reducers/GlobalSlice";
// styles
import styles from "./UsersList.module.scss";
// types
import {IUser} from "../../types";
// components
import {Button} from "@mui/material";
import UserListItem from "../UserListItem";


const UsersList: FC = () => {
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(1);
    const {data, error, isLoading} = userAPI.useFetchUsersQuery({page: page, count: 6});
    const [sortedUsers, setSortedUsers] = useState<IUser[]>([]);


    const getSortedUsers = useCallback(() => {
        data && setSortedUsers(prevState => {
            const notSortedUsers = [...data.users];

            return [
                ...prevState,
                ...notSortedUsers.sort((a, b) => b.registration_timestamp - a.registration_timestamp),
            ]
        });
    }, [data]);

    const fetchNextUsers = useCallback(() => {
        dispatch(setGlobalLoading(true));
        setPage(prevState => prevState + 1);
    }, []);

    useEffect(() => {
        getSortedUsers();

        dispatch(setGlobalLoading(false));
    }, [data]);

    useEffect(() => {
        // @ts-ignore
        error && toast.error(error.error);
    }, [error]);

    useEffect(() => {
        dispatch(setGlobalLoading(isLoading));
    }, [isLoading]);


    return (
        <section className={styles.usersList}>
            <h2 id="users" className={styles.usersList__title}>Working with GET request</h2>

            <ul className={styles.usersList__cards}>
                {sortedUsers.map((user) => <UserListItem key={user.id} user={user}/>)}
            </ul>

            {data?.total_pages !== page && <Button onClick={fetchNextUsers}>Show more</Button>}
        </section>
    )
}

export default UsersList;