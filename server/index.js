import express from "express";
import bodyParser from 'body-parser'
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import postRoutes from "./routes/post.js";
import authRoutes from "./routes/auth.js"

dotenv.config()
const PORT = process.env.PORT || 5000   
const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// Routes
app.use('/posts', postRoutes)
app.use('/user', authRoutes)


mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on: ${PORT}`)))
.catch(err => console.log(err))

// mongoose.set('useFindAndModify', false)
