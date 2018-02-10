export class AssignedTask {
    constructor(readonly taskName: string, 
                readonly childName: string,                
                readonly date: string,
                readonly feedback : number,
                readonly done: boolean){}
}