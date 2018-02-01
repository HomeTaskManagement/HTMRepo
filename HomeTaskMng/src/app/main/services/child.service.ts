import { Child } from "../model/child";
import { DbChild } from "../../../db/dbchild";
import { Injectable } from "@angular/core/";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { environment } from '../../../environments/environment';

@Injectable()
export class ChildService {
    private children: Child[];

    constructor(private httpClient: HttpClient) { }

    // addNewChild(child: Child) {
    //     if (!this.children) {
    //         this.children = new Array<Child>();
    //     }
    //     this.children.push(child);
    // }

    async addNewChild(child: Child): Promise<void> {
        let dbChild: DbChild = new DbChild();
        dbChild.name = child.name;
        dbChild.age = child.age;
        dbChild.availability = child.availability;
        dbChild = await this.httpClient.post<DbChild>(environment.baseUrl + '/children', dbChild).toPromise();        
    }

    getChildren(): Observable<DbChild[]> {
        let tasksUrl = environment.baseUrl + '/children';
        return this.httpClient.get<DbChild[]>(tasksUrl);
    }


    // --- Mockup
    // getChildren(){
    //     //return this.children;
    //     let children = [
    //         new Child("David", 5, 4),
    //         new Child("Hodaya", 4, 3),
    //         new Child("Dina", 3, 2)
    //     ];

    //     return children;
    // }
}

