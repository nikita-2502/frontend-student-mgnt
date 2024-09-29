export interface ApiResponse{
    
        data: Array<any>;
        status: Number;
        message: String;
        error?: Boolean;
        count?: Number;
    
}

export interface StudentData{
    
        _id: String;
        first_name: String;
        last_name: String;
        username: String;
        email: String;
        date: Number;
        ts_last_update: Number;
        studentId: Number;
        classes: Object;
        class_sort?: String;
        name_sort?: String;
    
}

export interface ClassData{
        
}