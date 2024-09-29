import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DeleteDaialogComponent } from 'src/app/shared/delete-daialog/delete-daialog.component';
import { ClassFormComponent } from '../class-form/class-form.component';
import { Classes } from '../modals/classes';
import { ClassesService } from '../services/classes.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
})
export class ClassListComponent implements OnInit {
  displayedColumns: string[] = [
    'class_name',
    'division',
    'classTeacher',
    'students',
    'actions',
  ];

  classDetails: Classes[] = [];
  dataSource = new MatTableDataSource(this.classDetails);
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
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private classService: ClassesService
  ) {}

  ngOnInit(): void {
    this.filterData.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        this.classService.getAllDetails(value, this.pageIndex, this.pageSize, this.columnSorted, this.direction).subscribe({
          next: (res: any) => {
            if (res) {
              this.length = res.count;
              this.classDetails = res.data;
              this.dataSource = new MatTableDataSource(this.classDetails);
              // this.dataSource.sort = this.sort;
              // this.dataSource.paginator = this.paginator;
            }
          },
          error: (err) => {
            this.snackbar.open(err, '', { duration: 5000 });
          },
        });
      });

    this.classService.getAllDetails(this.filterData.value, this.pageIndex, this.pageSize, this.columnSorted, this.direction).subscribe({
      next: (res: any) => {
        if (res) {
          this.length = res.count;
          this.classDetails = res.data;
          this.dataSource = new MatTableDataSource(this.classDetails);
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
        }
      },
      error: (err) => {
        this.snackbar.open(err, '', { duration: 5000 });
      },
    });
  }

  openAddClassDetailsForm() {
    let ref = this.dialog.open(ClassFormComponent);
    ref.afterClosed().subscribe((res) => {
      if (res) {
        this.length = res.count;
        this.dataSource.data.push(res);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      }
    });
  }

  onDelete(id: string, index: number) {
    let ref = this.dialog.open(DeleteDaialogComponent);
    ref.afterClosed().subscribe((res) => {
      if (res === true) {
        this.classService.deleteClass(id).subscribe({
          next: (res) => {
            if (res) {
              let oriIndex = this.pageIndex * this.pageSize + index;
              this.dataSource.data.splice(oriIndex, 1);
            }
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

  onEdit(id: string, index: number) {
    // console.log('classId: ', id);

    let ref = this.dialog.open(ClassFormComponent, { data: { id: id } });
    ref.afterClosed().subscribe((res) => {
      if (res) {
        // console.log('response in class-list: ', res.data[0]);
        this.dataSource.data[index].class_name = res.data[0].class_name;
        this.dataSource.data[index].division = res.data[0].division;
        this.dataSource.data[index].classTeacher = res.data[0].classTeacher;
        this.dataSource.data[index].noOfStd = res.data[0].noOfStd;
        this.dataSource.data[index].students = res.data[0].students;
      }
    });
  }

  onPageChange(val: PageEvent) {
    this.pageIndex = val.pageIndex + 1;
    this.pageSize = val.pageSize;

    this.classService.getAllDetails(this.filterData.value, this.pageIndex, this.pageSize, this.columnSorted, this.direction).subscribe({
      next: (res: any) => {
        if (res) {
          this.length = res.count;
          this.classDetails = res.data;
          this.dataSource = new MatTableDataSource(this.classDetails);
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
        }
      },
      error: (err) => {
        this.snackbar.open(err, '', { duration: 5000 });
      },
    })
  }

  onSortChange(val: Sort) {
    this.columnSorted = val.active;
    this.direction = val.direction;

    this.classService.getAllDetails(this.filterData.value, this.pageIndex, this.pageSize, this.columnSorted, this.direction).subscribe({
      next: (res: any) => {
        if (res) {
          this.length = res.count;
          this.classDetails = res.data;
          this.dataSource = new MatTableDataSource(this.classDetails);
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
        }
      },
      error: (err) => {
        this.snackbar.open(err, '', { duration: 5000 });
      },
    })
  }
}
