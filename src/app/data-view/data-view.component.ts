import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { DataState } from '../worker/state/data.state';
import { Observable } from 'rxjs';
import { DataItem } from '@bb/common';
import { DataWorkerStart, DataWorkerStop } from '../worker/state/data.acions';
import { DataViewParamsComponent } from './data-view-params/data-view-params.component';
import { DataViewHeaderComponent } from './data-view-header/data-view-header.component';
import { DataViewItemComponent } from './data-view-item/data-view-item.component';

@Component({
  selector: 'bb-data-view',
  standalone: true,
  imports: [CommonModule, DataViewParamsComponent, DataViewHeaderComponent, DataViewItemComponent],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewComponent {
  @Select(DataState.top10Items) items$!: Observable<DataItem[]>;

  trackById(index: number, item: DataItem){
    return item.id;
  }

  constructor(private store: Store) {
    this.store.dispatch(new DataWorkerStart());

    inject(DestroyRef).onDestroy(() => {
      this.store.dispatch(new DataWorkerStop());
    });
  }
}
