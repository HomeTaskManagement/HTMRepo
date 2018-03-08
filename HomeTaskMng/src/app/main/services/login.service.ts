import { Injectable } from '@angular/core';
import { Child } from "../model/child";
import { ChildService } from './child.service';
import { HttpClient } from '@angular/common/http';
import { LoggedinUser } from "../model/login";


@Injectable()
export class LoginService {

    private children: Child[];
    public currUser : LoggedinUser = new LoggedinUser();

    constructor(private httpClient: HttpClient, private childService: ChildService) {
        this.childService.getChildren().subscribe(childs => {
            this.children = childs;
            console.log('registered children: ', this.children);
        });

        this.currUser.username = '';
        this.currUser.password = '';
    }

    async checkChildExists(child: LoggedinUser): Promise<boolean> {

        if (child.password !== "1234") {
            return false;
        }
        
        if (!this.children) {
            return false;
        }

        let tmpChild = this.children.filter(c => c.name === child.username);
        if (tmpChild.length === 0) {
            return false;
        }

        return true;
    }

}
