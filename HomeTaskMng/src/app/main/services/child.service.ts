import { Child } from "../model/child";
import { Injectable } from "@angular/core/";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { environment } from '../../../environments/environment';

@Injectable()
export class ChildService {
    private children: Child[];

    constructor(private httpClient: HttpClient) { }

    async addNewChild(child: Child): Promise<void> {
        let ichild = await this.httpClient.post<Child>(environment.baseUrl + '/children', child).toPromise();        
    }

    getChildren(): Observable<Child[]> {
        let tasksUrl = environment.baseUrl + '/children';
        return this.httpClient.get<Child[]>(tasksUrl);
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

