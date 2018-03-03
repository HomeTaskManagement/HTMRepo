import { Injectable } from '@angular/core';
import { Child } from "../model/child";
import { ChildService } from './child.service';
import { HttpClient } from '@angular/common/http';
import { Login } from "../model/login";


@Injectable()
export class LoginService {
    private children: Child[];

//    baseUrl: string = 'http://localhost:3000';


    constructor(private httpClient: HttpClient, private childService: ChildService) {
        this.childService.getChildren().subscribe(childs => {
            this.children = childs;
            console.log('registered children: ', this.children);
        });
    }

    // public username;
    // public password;

    async checkChildExists(child: Login): Promise<boolean> {

        if (child.password !== "1234") {
            return false;
        }
        
        if (!this.children) {
            return false;
        }

        let tmpChild = this.children.filter(c => c.name === child.username);
        if (!tmpChild) {
            return false;
        }

        return true;
    }

}
