export class AssignedTask {
    constructor(public id: number,
        public taskName: string,
        public childName: string,
        public date: string,
        public feedback: number,
        public feedbackCounter: number,
        public done: boolean) { }
}
