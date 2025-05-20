import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { BookDetail } from '../models/book-detail';
import { DecimalPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-book-detail-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    DecimalPipe,
    MatButton
  ],
  templateUrl: './book-detail-dialog.component.html',
  styleUrls: ['./book-detail-dialog.component.css']
})
export class BookDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public book: BookDetail,
              private dialogRef: MatDialogRef<BookDetailDialogComponent>) {}

  stringifyDescriptions(arr?: { description: string }[]): string {
    return arr?.map(item => item.description).join(', ') ?? '-';
  }

  close() {
    this.dialogRef.close();
  }
}
