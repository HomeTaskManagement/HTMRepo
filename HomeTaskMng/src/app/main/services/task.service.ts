import { Task } from "../model/task";
import { DbTask } from "../../../db/dbTask";
import { Injectable } from "@angular/core/";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { environment } from '../../../environments/environment';

@Injectable()
export class TaskService {

    constructor(private httpClient: HttpClient) { }

    private tasks: Task[];

    async addNewTask(task: Task): Promise<void> {
        let dbTask: DbTask = new DbTask();
        dbTask.name = task.name;
        dbTask.description = task.description;
        dbTask.duration = task.duration;
        dbTask.minAge = task.minAge;
        dbTask.occurrence = task.occurrence;
        dbTask = await this.httpClient.post<DbTask>(environment.baseUrl + '/tasks', dbTask).toPromise();        
    }

    // addNewTask(task: Task) {
    //     if (!this.tasks) {
    //         this.tasks = new Array<Task>();
    //     }
    //     this.tasks.push(task);
    // }

    getAllTasks(): Observable<DbTask[]> {
        let tasksUrl = environment.baseUrl + '/tasks';
        return this.httpClient.get<DbTask[]>(tasksUrl);
    }

    //--- Mockup 
    // getAllTasks() {
    //     //  return this.tasks;
    //     let tasks = [
    //         new Task("ריקון פח", "ריקון פח", 1, 5, 4),
    //         new Task("שטיפת כלים", "שטיפת כלים", 1, 5, 4),
    //         new Task("הורדת כביסה", "הורדת כביסה", 1, 5, 4),
    //         new Task("איסוף משחקים", "איסוף משחקים", 1, 5, 4),
    //     ];
    //     return tasks;
    // }

}