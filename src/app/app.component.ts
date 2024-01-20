import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataViewComponent } from './data-view/data-view.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    DataViewComponent
  ],
  selector: 'bb-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
