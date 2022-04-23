import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ClientsGetCoordinator from "./ClientsGetCoordinator";
import { getClientsBySearch } from "../../actions/clients";


const ClientsHomeCoordinator = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        dispatch(getClientsBySearch(user?.result?.email));
    }, [currentId, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <h3>Your clients</h3><br/>
            <ClientsGetCoordinator setCurrentId={setCurrentId} />
        </>
    );
};

export default ClientsHomeCoordinator;