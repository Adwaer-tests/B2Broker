import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataItemChild } from '@bb/common';

@Component({
  selector: 'bb-data-view-item-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-view-item-child.component.html',
  styleUrl: './data-view-item-child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataViewItemChildComponent {
  @Input({ required: true }) data!: DataItemChild;
}
