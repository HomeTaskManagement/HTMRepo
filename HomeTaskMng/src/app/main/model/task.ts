export class Task {
    constructor(public id: number,
        public name: string,
        public description: string,
        public duration: number,
        public minAge: number,
        public occurrence: number) { }
}