export class Student{
    constructor(
        public first_name: string,
        public last_name: string,
        public email: string,
        public dob: string,
        public sport: string,
        public gender: string,
        public id?: string
    ){}
}