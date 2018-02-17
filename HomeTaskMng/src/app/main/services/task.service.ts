import { Task } from "../model/task";
import { Injectable } from "@angular/core/";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Subject }    from 'rxjs/Subject';
import { environment } from '../../../environments/environment';
import { AssignedTask } from "../model/assignedTask";

const tasksUrl = environment.baseUrl + '/tasks';
const assignedTasksUrl = environment.baseUrl + '/assignedTasks';

@Injectable()
export class TaskService {

    private taskAddedSrc = new Subject<Task>();
    private taskAssignmentAddedSrc = new Subject<AssignedTask>();
    private feedbackAddedSrc = new Subject<AssignedTask>();
    
    taskAdded$ = this.taskAddedSrc.asObservable();
    taskAssignmentAdded$ = this.taskAssignmentAddedSrc.asObservable();
    feedbackAdded$ = this.feedbackAddedSrc.asObservable();
    
    constructor(private httpClient: HttpClient) { }

    private tasks: Task[];

    getAllTasks(): Observable<Task[]> {
        return this.httpClient.get<Task[]>(tasksUrl);
    }

    async addNewTask(itask: Task): Promise<void> {
        let task = await this.httpClient.post<Task>(tasksUrl, itask).toPromise();
        this.taskAddedSrc.next(task);
    }

    getAssignedTasks(): Observable<AssignedTask[]> {
        return this.httpClient.get<AssignedTask[]>(assignedTasksUrl);
    }

    async assignTask(taskToAssign: AssignedTask): Promise<void> {
        //todo: validation - to prevent from saving the same task in same date more than one time
        let taskAssignment = await this.httpClient.post<AssignedTask>(assignedTasksUrl, taskToAssign).toPromise();
        this.taskAssignmentAddedSrc.next(taskAssignment);
    }

    async sendFeedback(task: AssignedTask, score: number): Promise<void> {
        // get the correct task from db
        let specifiedAssignedTaskUrl = assignedTasksUrl +
            '?taskName=' + task.taskName +
            '&childName=' + task.childName +
            '&date=' + task.date;
        let assignedTasks = await this.httpClient.get<AssignedTask[]>(specifiedAssignedTaskUrl).toPromise();
        let assignedTask: AssignedTask;
        if (assignedTasks.length > 0) {
            assignedTask = assignedTasks[0];
            //generate json with feedback only
            let dbAT = {
                feedback: assignedTask.feedback + score,
                feedbackCounter: assignedTask.feedbackCounter + 1,
            };

            //perform patch with the correct ID
            await this.httpClient.patch(assignedTasksUrl + '/' + assignedTask.id, dbAT).toPromise();
            this.feedbackAddedSrc.next(assignedTask);
        } else {
            console.log('sendFeedback - task not found');
            return null;
        }

    }

    async report(reportedTask: AssignedTask): Promise<void> {
        let dbAT = {
            done: reportedTask.done
        };

        //perform patch with the correct ID
        await this.httpClient.patch(assignedTasksUrl + '/' + reportedTask.id, dbAT).toPromise();
    }

}