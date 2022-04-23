import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getAllUsers } from '../../actions/users';
import UsersGet from "./UsersGet";


const UsersHome = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [currentId, dispatch]);

    return (
        <>
            <UsersGet setCurrentId={setCurrentId}/>
        </>
    );
};

export default UsersHome;