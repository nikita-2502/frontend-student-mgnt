import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/modals/task';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  allTasks: Task[] = [];

  constructor(
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    // this.fetchAllTasks();
  }

  // private fetchAllTasks(){
  //   this.taskService.GetAllTasks().subscribe({
  //     next: (tasks) => {
  //       console.log('tasks', tasks)
  //       this.allTasks = tasks;
  //     },
  //     error: (err) =>{
  //       console.log("error: ");
  //     }
  //   })
  // }
}
