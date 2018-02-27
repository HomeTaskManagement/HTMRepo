import { Injectable } from '@angular/core';
import { Child } from "../model/child";
import { ChildService } from './child.service';
import { HttpClient } from '@angular/common/http';
import { Login } from "../model/login";


@Injectable()
export class LoginService {
    private children: Child[];

    baseUrl: string = 'http://localhost:3000';


    constructor(private httpClient: HttpClient, private childService: ChildService) { 
        this.childService.getChildren().subscribe(childs => {
            this.children = childs;
        });
    }

    // public username;
    // public password;

    async checkChildExists(child: Login): Promise<boolean> {
  

        // let childUrl = this.baseUrl + '/children?userName=' + DB.children.name;
        // let childFromDB = await this.httpClient.get<Login[]>(childUrl).toPromise();
        // if (childFromDB.length>0)
        //  {
        //     return true;
        // } 
        // else
        //  {
        //     return false;
        // }
        return true;
    }

}
