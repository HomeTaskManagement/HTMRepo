export class Task {
    constructor(readonly name: string, 
                readonly description: string,                
                readonly duration: number,
                readonly minAge: number, 
                readonly occurrence: number){}
}