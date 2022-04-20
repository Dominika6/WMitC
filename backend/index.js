import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import usersRoutes from './routes/users.js';
import clientsRoutes from './routes/clients.js';
import projectsRoutes from './routes/projects.js';
import tasksRoutes from './routes/tasks.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());


app.use('/user', usersRoutes);
app.use('/client', clientsRoutes);
app.use('/project', projectsRoutes);
app.use('/task', tasksRoutes);

app.get('/', (req, res) => {
    res.send('Hello to WMitC API');
});

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

