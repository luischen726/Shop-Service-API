import {Request, Response, NextFunction} from 'express'

export function page404(req: Request, res: Response, next: NextFunction): undefined {
    res.status(404).json({error: 404, data:`Page is not found!!!`})
}