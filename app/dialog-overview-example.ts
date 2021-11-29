import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.html',
  styleUrls: ['dialog-overview-example.css'],
})
export class DialogOverviewExample {
  containers = [{ButtonLabel:"First", dialogId:0, animal: "cat"}];
  animal: string;
  name: string;
  dialogId:number;
  maxDialogId:number;

  constructor(public dialog: MatDialog) {
    this.dialogId=0;
    this.maxDialogId=0;

  }

  cerrar(dialogId):void{

    this.containers.splice(dialogId, 1);
  }

  openDialog(dialogIdParam): void {
    console.log('In open dialog',dialogIdParam);
    let dlnName:string;
    if ( dialogIdParam != undefined && dialogIdParam != null ) {
      console.log('dialog is valid',dialogIdParam,this.containers[dialogIdParam].animal);
        dlnName=this.containers[dialogIdParam].animal;
        this.dialogId=this.containers[dialogIdParam].dialogId;
    }
    else {
      this.maxDialogId++;
        this.dialogId =this.maxDialogId;

      dlnName= null;
    }
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {ButtonLabel: dlnName, animal: dlnName, dialogId:this.dialogId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      //this.animal = result.animal;
      this.add(result);
    });
  }
  add(dataColl) {
    console.log("in add",dataColl);
    let found:number=0;
    // search for dialogid
    for (var x=0;x<this.containers.length;x++) {
      console.log('in loop',this.containers[x]);
      if (this.containers[x].dialogId == dataColl.totalData.dialogId ) {
        //Already Exists;
        this.containers[x].animal=dataColl.totalData.animal;
        found=1;
        break;
      }
    }
    console.log('Found Status', found);

    if (found == 0 ) {
      console.log('Before Adding',dataColl);
        this.containers.push({ButtonLabel:dataColl.totalData.dialogId, dialogId:dataColl.totalData.dialogId, animal: dataColl.totalData.animal});
        console.log(this.containers);
    }
    
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(dt): void {
    console.log(dt);
    this.dialogRef.close();
  }
 onCloseConfirm(dt) {
   console.log('onCloseConfirm',dt );
    this.dialogRef.close({

       totalData :dt
    });
    //console.log("conf data", dataPar);
  }
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */