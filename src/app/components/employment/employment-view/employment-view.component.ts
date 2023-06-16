import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employment-view',
  templateUrl: './employment-view.component.html',
  styleUrls: ['./employment-view.component.scss']
})
export class EmploymentViewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public jobOffer: any) { }
}
