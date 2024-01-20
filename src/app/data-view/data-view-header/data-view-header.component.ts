import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bb-data-view-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-view-header.component.html',
  styleUrl: './data-view-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewHeaderComponent {}
