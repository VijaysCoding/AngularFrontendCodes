import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssetsData } from 'src/app/AssetsData';
import { TableService } from 'src/app/services/table.service';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  message!: string;

  data: AssetsData[] = [];

  displayedColumns: string[] = ['id', 'description', 'account', 'createdOn', 'createdBy', 'currency', 'actions'];
  dataSource!: MatTableDataSource<AssetsData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: TableService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  openDialog() {
    this.dialog.open(DialogFormComponent, {
      //height: '60%',
      width: '30%',
    }).afterClosed().subscribe(val => {
      this.getAllData();
    })
  }

  getAllData() {
    this.api.getAllData().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching the data")
      }
    })
  }

  deleteData(id: number) {
    this.api.deleteData(id).subscribe(
      response => {
        console.log(response);
        this.message = `${id} deletes Sucessfully`;
        this.getAllData();
      })
  }

  editData(assets: AssetsData) {
    this.dialog.open(DialogFormComponent, {
      width: '30%',
      data: assets
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllData();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

//ng add @syncfusion/ej2-angular-treegrid


