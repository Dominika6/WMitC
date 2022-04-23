import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getAllClients } from '../../actions/clients';
import ClientsGet from "./ClientsGetAdmin";


const ClientsHomeAdmin = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllClients());
    }, [currentId, dispatch]);

    return (
        <>
            <ClientsGet setCurrentId={setCurrentId}/>
        </>
    );
};

export default ClientsHomeAdmin;