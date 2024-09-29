import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from '../services/student.service';
import { Student } from '../modals/student';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDaialogComponent } from 'src/app/shared/delete-daialog/delete-daialog.component';
import { AddDialogComponent } from 'src/app/shared/add-dialog/add-dialog.component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'dob',
    'actions',
  ];

  studentData: Student[] = [];
  dataSource = new MatTableDataSource(this.studentData);
  showAddStudentForm: boolean = false;
  selectedStudent!: Student;
  pageIndex: number = 0;
  pageSize: number = 5;
  columnSorted: string | undefined;
  direction: string | undefined;
  length: number = 0;

  filterData = new FormControl<any>('');

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  constructor(
    private studentService: StudentService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.filterData.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        // console.log('value: ', value);
        this.studentService.getAllStudent(value, this.columnSorted, this.direction, this.pageIndex, this.pageSize).subscribe({
          next: (res: any) => {
            if (res) {
              this.length = res.count;
              this.studentData = res.data;
              this.dataSource = new MatTableDataSource(this.studentData);
              // this.dataSource.sort = this.sort;
              // this.dataSource.paginator = this.paginator;
            }
          },
          error: (err) => {
            this.snackbar.open(err, '', { duration: 5000 });
          },
        });
      });

    this.studentService.getAllStudent(this.filterData.value, this.columnSorted, this.direction, this.pageIndex, this.pageSize).subscribe({
      next: (res: any) => {
        if (res) {
          // console.log('res: ', res);
          this.length = res.count;
          this.studentData = res.data;
          this.dataSource = new MatTableDataSource(this.studentData);
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
        }
      },
      error: (err) => {
        this.snackbar.open(err, '', { duration: 5000 });
      },
    });
  }

  // applyFilter(event: Event) {
  //   // console.log('filter: ', this.filterData.value);
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  openAddStudentForm() {
    let ref = this.dialog.open(AddDialogComponent);
    ref.afterClosed().subscribe((res) => {
      // console.log('res in student-list: ', res);
      if (res) {
        this.dataSource.data.push(res);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      }
    });
  }

  onDelete(id: string, index: number) {
    console.log('id: ', id);
    let dialogRef = this.dialog.open(DeleteDaialogComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === true) {
        this.studentService.deleteOneStudent(id).subscribe({
          next: (res) => {
            let oriIndex = this.pageIndex * this.pageSize + index;
            this.dataSource.data.splice(oriIndex, 1);

            // this.dataSource.sort = this.sort;
            // this.dataSource.paginator = this.paginator;
          },
          error: (err) => {
            this.snackbar.open(err, '', { duration: 5000 });
          },
        });
      }
    });
  }

  onPageChange(val: PageEvent) {
    this.pageIndex = val.pageIndex + 1;
    this.pageSize = val.pageSize;;

    this.studentService.getAllStudent(this.filterData.value, this.columnSorted, this.direction, this.pageIndex, this.pageSize).subscribe({
      next: (res: any) => {
        if (res) {
          this.length = res.count;
          this.studentData = res.data;
          this.dataSource = new MatTableDataSource(this.studentData);
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
        }
      },
      error: (err) => {
        this.snackbar.open(err, '', { duration: 5000 });
      },
    });
  }

  onEdit(id: string, index: number) {
    console.log('id:', id);
    console.log('index: ', index);
    let ref = this.dialog.open(AddDialogComponent, { data: { id: id } });
    ref.afterClosed().subscribe((res) => {
      // console.log('response in student: ', res.data[0]);
      if (res && res.data && res.data.length) {
        this.dataSource.data[index].email = res.data[0].email;
        this.dataSource.data[index].first_name = res.data[0].first_name;
        this.dataSource.data[index].last_name = res.data[0].last_name;
        this.dataSource.data[index].dob = res.data[0].dob;
        this.dataSource.data[index].gender = res.data[0].gender;
        this.dataSource.data[index].sport = res.data[0].sport;
      }
    });
  }

  onSortChange(val: Sort) {
    this.columnSorted = val.active;
    this.direction = val.direction;

    this.studentService.getAllStudent(this.filterData.value, this.columnSorted, this.direction, this.pageIndex, this.pageSize).subscribe({
      next: (res: any) => {
        if (res) {
          this.length = res.count;
          this.studentData = res.data;
          this.dataSource = new MatTableDataSource(this.studentData);
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
        }
      },
      error: (err) => {
        this.snackbar.open(err, '', { duration: 5000 });
      },
    });
  }
}
