import express from "express";

import Clients from "../models/clients.js";

const router = express.Router();


export const createClient = async (req, res) => {
    const { supervisor, email, phoneNumber, name } = req.body;

    try {
        const existingClient = await Clients.findOne({email});
        if(existingClient) return res.status(400).json({ messsage: "Client already exist." });
        const result = await Clients.create({ name: name, phone_number: phoneNumber, email, id_supervisor: supervisor});
        res.status(200).json({ result: result });
    } catch(error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const getAllClients = async (req, res) => {
    try {
        const allClients = await Clients.find();
        res.status(200).json(allClients);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getClientsBySearch = async (req, res) => {
    const { email } = req.params;
    try {
        const clients = await Clients.find({ id_supervisor: email });
        res.json({ data: clients });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}


export default router;