import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { take } from 'rxjs';

import { InputComponent } from '../../../../../../../../core/components/input/input.component';
import { OffboardReqModel } from '../../../../../../../../core/models';
import { OffboardingService } from '../../../../../../services/offboarding.service';

interface OffboardingForm {
  receiver: FormControl<string>;
  postalCode: FormControl<string>;
  country: FormControl<string>;
  streetLine1: FormControl<string>;
  notes: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  city: FormControl<string>;
}

type OffboardingFormGroup = FormGroup<OffboardingForm>;

@Component({
  selector: 'app-offboard-modal',
  imports: [MatDialogModule, MatIcon, InputComponent],
  templateUrl: './offboard-modal.component.html',
  styleUrl: './offboard-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardModalComponent implements OnInit {
  private offboardingService = inject(OffboardingService);
  private dialogRef = inject(MatDialogRef);

  public formGroup: OffboardingFormGroup = new FormGroup({
    receiver: new FormControl(null, [Validators.required]),
    postalCode: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    streetLine1: new FormControl(null, [Validators.required]),
    notes: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    city: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.dialogRef.addPanelClass('offboard-modal');
  }

  public close(state = false): void {
    this.dialogRef.close(state);
  }

  public submit(): void {
    const formValue = this.formGroup.getRawValue();

    const preparePayload: OffboardReqModel = {
      address: {
        country: formValue.country,
        postalCode: formValue.postalCode,
        receiver: formValue.receiver,
        streetLine1: formValue.streetLine1,
        city: formValue.city,
      },
      email: formValue.email,
      notes: formValue.notes,
      phone: formValue.phone,
    };
    this.offboardingService
      .postOffboard(preparePayload)
      .pipe(take(1))
      .subscribe(() => {
        this.close(true);
      });
  }
}
