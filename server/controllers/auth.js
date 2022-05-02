import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../modules/userModel.js'

export const signIn = async (req, res) => {
    const { email, password} = req.body
    
    try {
        const existingUser = await User.findOne({ email })
        if(existingUser) {
            const isCorrectPassword = await bcrypt.compare(password, existingUser.password)
            if(isCorrectPassword) {
                const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, 'test', { expiresIn: '1h' })
                const { password, ...others } = existingUser
                res.status(200).json({ result: others, token })
            } else {
                res.status(400).send({ message: 'Password incorrect.' })
            }
        } else {
            res.status(404).send({ message: 'Email doesn\'t exist.' })
        }
    } catch (error) {
        res.status(500).json({ message: error})
    }
}

export const signUp = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    
    try {
        const isExistingEmail = await User.findOne({ email })

        if(!isExistingEmail) {
            if(password === confirmPassword) {
                const hashPassword = await bcrypt.hash(password, 12)
                const createUser = await User.create({ name: `${firstName} ${lastName}`, email, password: hashPassword })
                const token = jwt.sign({ id: createUser._id, email: createUser.email }, 'test', { expiresIn: '1h' })
                res.status(200).json({result: createUser, token})
            } else {
                res.status(400).json({ message: 'Confirm password dont\'t match.'})
            }
        } else {
            res.status(400).json({ message: 'Email has existing.'})
        }
    } catch (error) {
        res.status(500).json({ message: error})
    }
    
}