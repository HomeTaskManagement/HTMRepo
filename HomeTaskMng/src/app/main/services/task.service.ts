import { Task } from "../model/task";
import { DbTask } from "../../../db/dbTask";
import { Injectable } from "@angular/core/";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { environment } from '../../../environments/environment';
import { AssignedTask } from "../model/assignedTask";
import { DbTaskAssignment } from "../../../db/dbTaskAssignment";

const tasksUrl = environment.baseUrl + '/tasks';
const assignedTasksUrl = environment.baseUrl + '/assignedTasks';

@Injectable()
export class TaskService {

    constructor(private httpClient: HttpClient) { }

    private tasks: Task[];

    getAllTasks(): Observable<DbTask[]> {
        return this.httpClient.get<DbTask[]>(tasksUrl);
    }

    async addNewTask(task: Task): Promise<void> {
        let dbTask: DbTask = new DbTask();
        dbTask.name = task.name;
        dbTask.description = task.description;
        dbTask.duration = task.duration;
        dbTask.minAge = task.minAge;
        dbTask.occurrence = task.occurrence;
        dbTask = await this.httpClient.post<DbTask>(tasksUrl, dbTask).toPromise();
    }

    getAssignedTasks(): Observable<DbTaskAssignment[]> {
        return this.httpClient.get<DbTaskAssignment[]>(assignedTasksUrl);
    }

    async assignTask(taskToAssign: AssignedTask): Promise<void> {
        //todo: validation - to prevent from saving the same task in same date more than one time
        let dbTaskAssignment: DbTaskAssignment = new DbTaskAssignment();
        dbTaskAssignment.taskName = taskToAssign.taskName;
        dbTaskAssignment.childName = taskToAssign.childName;
        dbTaskAssignment.date = taskToAssign.date;
        dbTaskAssignment.feedback = taskToAssign.feedback;
        dbTaskAssignment.done = taskToAssign.done;
        dbTaskAssignment = await this.httpClient.post<DbTaskAssignment>(assignedTasksUrl, dbTaskAssignment).toPromise();
    }

    async sendFeedback(task: AssignedTask, score: number): Promise<void> {
        // get the correct task from db
        let specifiedAssignedTaskUrl = assignedTasksUrl +
            '?taskName=' + task.taskName +
            '&childName=' + task.childName +
            '&date=' + task.date;
        let dbAssignedTasks = await this.httpClient.get<DbTaskAssignment[]>(specifiedAssignedTaskUrl).toPromise();
        let dbAssignedTask : DbTaskAssignment;
        if (dbAssignedTasks.length > 0) {
            dbAssignedTask = dbAssignedTasks[0];
            //generate json with feedback only
            let dbAT = {
                feedback: dbAssignedTask.feedback + score
            };

            //perform patch with the correct ID
            await this.httpClient.patch(assignedTasksUrl + '/' + dbAssignedTask.id , dbAT).toPromise();
        } else {
            console.log('sendFeedback - task not found');
            return null; 
        }
        
        

        //dbTaskAssignment = await this.httpClient.patch<DbTaskAssignment>(environment.baseUrl + '/assignedTasks/', dbTask).toPromise();        

        
               
    }

}