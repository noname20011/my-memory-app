import express from 'express'
import { signIn, signUp } from '../controllers/auth.js'

const authRoutes = express.Router()

authRoutes.post('/login', signIn)
authRoutes.post('/signup', signUp)

export default authRoutes
