import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css'],
})
export class SuccessModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() visible: boolean = false;

  closeModal() {
    this.visible = false;
  }
}
