import { MatDialog } from '@angular/material/dialog/dialog';
import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
@Component({
  selector: 'app-testar-fcm',
  templateUrl: './testar-fcm.component.html',
  styleUrls: ['./testar-fcm.component.css']
})
export class TestarFcmComponent implements OnInit {
  testeFCM: string;
  constructor(
    public dialogRef: MatDialogRef<TestarFcmComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string   )  { }

  ngOnInit(): void {
  }

  onClickNo(): void {
    this.dialogRef.close();
  }
}
