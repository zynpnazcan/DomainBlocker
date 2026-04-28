import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, TranslateModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  encapsulation: ViewEncapsulation.None // Stillerin Shell'e sızması için ŞART
})
export class ConfirmDialogComponent {
  // Yeni ve hatasız 'inject' yöntemi
  public dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  public data = inject<{ message: string }>(MAT_DIALOG_DATA);
}