

export function page404(req: any, res: any, next: any): undefined {
    res.status(404).json({error: 404, data:`Page is not found!!!`})
}