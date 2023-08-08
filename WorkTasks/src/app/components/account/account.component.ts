import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Table } from 'src/app/User';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  action = null;
  edit = null;
  data: Table[] = [];
  columnsToDisplay = ['id', 'description', 'account', 'createdOn', 'createdBy', 'currency','action', 'edit']

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountService.getData().subscribe(x => {
      this.data = x;
      console.log(this.data);
    })
  }
  addAccount(){
        
  }
  deleteAccount(id: number){
    this.accountService.deleteAccount(id).subscribe(data =>{
      console.log(data);
      alert("Deleted Successfully");
    })

  }
  updateAccount(){

  }
  refresh():void{
    window.location.reload();
  }

}
