import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Users from '../models/users.js';
import mongoose from "mongoose";


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await Users.findOne({email});
        if(!existingUser) return res.status(404).json({ messsage: "User doesn't exist." });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(404).json({message: "Invalid credentials."});
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch(error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}


export const createUser = async (req, res) => {
    const { supervisor, email, phoneNumber, position, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const existingUser = await Users.findOne({email});
        if(existingUser) return res.status(400).json({ messsage: "Email already exist in database." });
        if(password !== confirmPassword) return res.status(400).json({ messsage: "Passwords don't match." });
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await Users.create({ name: `${firstName} ${lastName}`, phone_number: phoneNumber, email, password: hashedPassword, position, id_supervisor: supervisor});
        res.status(200).json({ message: 'User created successfully.', newUser: result});
    } catch(error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}


export const getTeamBySearch = async (req, res) => {
    const { email } = req.params;
    try {
        const team = await Users.find({ id_supervisor: email });
        res.json({ data: team });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await Users.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getManagers = async (req, res) => {
    try {
        const managers = await Users.find({ position: 'manager' });
        res.status(200).json(managers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePassword = async (req, res) => {
    const { id: id } = req.params;
    const { email, password, newPassword } = req.body;

    try {
        const existingUser = await Users.findOne({email: email});
        if(!existingUser) return res.status(404).json({ messsage: "User doesn't exist." });
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(404).json({message: "Invalid credentials."});
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await Users.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
        res.status(200).json({ result: existingUser });
    } catch(error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const updateUserEmail = async (req, res) => {
    const { id, email } = req.params;
    try {
        const existingUser = await Users.findOne({_id: id});
        if(!existingUser) return res.status(404).json({ messsage: "User doesn't exist." });
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id.');
        const isEmailUsed = await Users.findOne({email: email});
        if(isEmailUsed) return res.status(404).json({message: 'The given email already exist in database.'})
        await Users.findByIdAndUpdate(id, { email: email }, { new: true });
        res.status(200).json({ result: existingUser});
    } catch ( error) {
        res.status(500).json({message: 'Something went wrong.'});
    }
}

export const updateUserName = async (req, res) => {
    const { id, name } = req.params;
    try {
        const existingUser = await Users.findOne({_id: id});
        if(!existingUser) return res.status(404).json({ messsage: "User doesn't exist." });
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id.');
        await Users.findByIdAndUpdate(id, { name: name }, { new: true });
        res.status(200).json({ result: existingUser});
    } catch ( error) {
        res.status(500).json({message: 'Something went wrong.'});
    }
}

export const updateUserPhone = async (req, res) => {
    const { id, phone_number } = req.params;
    try {
        const existingUser = await Users.findOne({_id: id});
        if(!existingUser) return res.status(404).json({ messsage: "User doesn't exist." });
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id.');
        await Users.findByIdAndUpdate(id, { phone_number: phone_number }, { new: true });
        res.status(200).json({ result: existingUser});
    } catch ( error) {
        res.status(500).json({message: 'Something went wrong.'});
    }
}

export const updateUserCoordinator = async (req, res) => {
    const { id, id_supervisor } = req.params;
    try {
        const existingUser = await Users.findOne({_id: id});
        if(!existingUser) return res.status(404).json({ messsage: "User doesn't exist." });
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id.');
        await Users.findByIdAndUpdate(id, { id_supervisor: id_supervisor }, { new: true });
        res.status(200).json({ result: existingUser});
    } catch ( error) {
        res.status(500).json({message: 'Something went wrong.'});
    }
}

export const getUser = async (req, res) => {
    const { id: id } = req.params;
    try {
        const user = await Users.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}