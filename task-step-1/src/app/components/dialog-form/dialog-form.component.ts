import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableService } from 'src/app/services/table.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AssetsData } from 'src/app/AssetsData';

@Component({
  selector: 'app-create-asset',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})

export class DialogFormComponent implements OnInit {
  assetsForm !: FormGroup;

  actionBtn: string = "Save";

  data: AssetsData[] = [];

  title = "Create Data Form";

  constructor(private formBuilder: FormBuilder,
    private tableService: TableService,
    @Inject(MAT_DIALOG_DATA) public editData: AssetsData,
    private dialogref: MatDialogRef<DialogFormComponent>) { }

  ngOnInit(): void {
    this.assetsForm = this.formBuilder.group({
      description: ['', Validators.required],
      account: ['', Validators.required],
      createdOn: ['', Validators.required],
      createdBy: ['', Validators.required],
      currency: ['', Validators.required]
    })

    if (this.editData) {
      this.actionBtn = "Update";
      this.title = "Updata Data Form";
      this.assetsForm.controls['description'].setValue(this.editData.description);
      this.assetsForm.controls['account'].setValue(this.editData.account);
      this.assetsForm.controls['createdOn'].setValue(this.editData.createdOn);
      this.assetsForm.controls['createdBy'].setValue(this.editData.createdBy);
      this.assetsForm.controls['currency'].setValue(this.editData.currency);
    }
  }

  createAsset() {
    if (!this.editData) {
      if (this.assetsForm.valid) {
        this.tableService.createData(this.assetsForm.value).subscribe({
          next: (res) => {
            console.log(res)
            alert("Data added Successfully")
            this.assetsForm.reset();
            this.dialogref.close('save');
          },
          error: () => {
            alert("Error while adding data");
          }
        })
      }
    } else {
      this.updateData();
    }
  }

  updateData() {
    this.tableService.updateData(this.editData.id, this.assetsForm.value).subscribe({
      next: (res) => {
        alert("Data updated successfully");
        this.assetsForm.reset();
        this.dialogref.close('update');
      },
      error: () => {
        alert("Error while updating");
      }
    })
  }
}
