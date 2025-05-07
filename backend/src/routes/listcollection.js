import { Router } from 'express'
import getAllCollection from '../controllers/listcollection.controller.js'


const router = Router();

router.get("/getAllCollection", getAllCollection)

export default router