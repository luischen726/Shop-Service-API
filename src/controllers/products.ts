type titleData  =  {title: string};
const projects: titleData[] = [];

export function postAddProduct (req: any, res:any, next:any){
    

    projects.push({title: req.body.title})
    console.log(projects)
    res.status(200).json(projects)
} 

export function getProducts (req: any, res:any, next:any){
    
    res.status(200).json(projects)
} 