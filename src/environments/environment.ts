// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKey : "AIzaSyDDhzS26elOnE0ULktcXQjbIcXxWtLaBRY",
  apiEndPoint: 'http://localhost:3000/',

  studentApi: {
    addStudent: 'student/addStudent',
    deleteStudentById: 'student/deleteStudentById',
    getStudentData: 'student/getStudentData/',
    updateStudentData: 'student/updateStudentData',
    getAllStudents: 'student/getAllStudents',
    getStudent: 'student/getStudent'
  },

  classApi: {
    addClass: 'classes/addClass',
    deleteClassById: 'classes/deleteClassById',
    updateClassData: 'classes/updateClassData',
    getAllClasss: 'classes/getAllClasss',
    getClassData: 'classes/getClassData/'
  },

  authApi: {
    register: 'auth/register',
    login: 'auth/login'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
