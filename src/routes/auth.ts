import express from 'express';

const router = express.Router();

import {
    postRegister,
    postLogin
} from '../controllers/auth'

//account
router.post('/register', postRegister)
router.post('/login', postLogin)

export default router;