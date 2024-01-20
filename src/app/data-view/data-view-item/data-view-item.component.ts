import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataItem } from '@bb/common';
import { DataViewItemChildComponent } from './data-view-item-child/data-view-item-child.component';

@Component({
  selector: 'bb-data-view-item',
  standalone: true,
  imports: [CommonModule, DataViewItemChildComponent],
  templateUrl: './data-view-item.component.html',
  styleUrl: './data-view-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataViewItemComponent {
  @Input({ required: true }) item!: DataItem;
}
