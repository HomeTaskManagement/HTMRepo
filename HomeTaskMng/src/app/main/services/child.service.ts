import { Child } from "../model/child";
import { Injectable } from "@angular/core/";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { environment } from '../../../environments/environment';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ChildService {
    private children: Child[];
    private childAddedSrc = new Subject<Child>();

    childAdded$ = this.childAddedSrc.asObservable();

    constructor(private httpClient: HttpClient) { 

    }

    async addNewChild(child: Child): Promise<void> {
        let ichild = await this.httpClient.post<Child>(environment.baseUrl + '/children', child).toPromise();
        this.childAddedSrc.next(ichild);
    }

    getChildren(): Observable<Child[]> {
        let tasksUrl = environment.baseUrl + '/children';
        return this.httpClient.get<Child[]>(tasksUrl);
    }

    async updateChildDetails(child: Child): Promise<void> {
        let dbChild = {
            name: child.name,
            age: child.age,
            availability: child.availability
        };

        await this.httpClient.patch(environment.baseUrl + '/children' + '/' + child.id, dbChild).toPromise();
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

