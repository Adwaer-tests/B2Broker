import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { arrayOfNumbersValidator } from './ids.validator';
import { Store } from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataArraySizeSet, DataIdsSet, DataTimerSet } from '../../worker/state/data.acions';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'bb-data-view-params',
  standalone: true,
  imports: [CommonModule, MatFormField, ReactiveFormsModule, MatInput, MatLabel, MatError],
  templateUrl: './data-view-params.component.html',
  styleUrl: './data-view-params.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataViewParamsComponent {
  formGroup: FormGroup;

  constructor(fb: FormBuilder, private store: Store) {
    this.formGroup = fb.group({
      ids: ['', arrayOfNumbersValidator()],
      size: [1000, [Validators.required, Validators.min(1)]],
      timer: [300, [Validators.required, Validators.min(10)]]
    });

    this.formGroup.markAllAsTouched();

    this.formGroup.get('ids')!.valueChanges.pipe(
      takeUntilDestroyed(),
      debounceTime(500),
      filter(val => !!val)
    ).subscribe(val => {
      if (this.formGroup.invalid) {
        return;
      }

      const arr = val.split(',').map((item: string) => +item);
      this.store.dispatch(new DataIdsSet(arr));
    });

    this.formGroup.get('size')!.valueChanges.pipe(
      takeUntilDestroyed(),
      debounceTime(500)
    ).subscribe(val => {
      if (this.formGroup.invalid) {
        return;
      }
      this.store.dispatch(new DataArraySizeSet(val));
    });

    this.formGroup.get('timer')!.valueChanges.pipe(
      takeUntilDestroyed(),
      debounceTime(500)
    ).subscribe(val => {
      if (this.formGroup.invalid) {
        return;
      }
      this.store.dispatch(new DataTimerSet(val));
    });
  }
}
