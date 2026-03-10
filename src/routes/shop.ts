import express from 'express';

const router = express.Router();

import {getProducts} from '../controllers/products'

router.get('/',getProducts);

export default router;
