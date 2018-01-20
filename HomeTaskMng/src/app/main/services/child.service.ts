import { Child } from "../model/child";


export class ChildService {
    private children: Child[];

    addNewChild(child: Child){
        if (!this.children){
            this.children = new Array<Child>();
        }
        this.children.push(child);
    }
    
    getChildren(){
        return this.children;
    }
}