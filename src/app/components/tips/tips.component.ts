import { Component } from '@angular/core';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent {
  redirectToURL() {
    const url = 'https://www.bbva.mx/educacion-financiera/blog/30-recomendaciones-para-mejorar-tus-finanzas.html';
    window.open(url, '_blank');
  }
}
