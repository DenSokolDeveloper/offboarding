import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { debounceTime } from 'rxjs';

import { InputComponent } from '../../core/components/input/input.component';
import { EntityModel } from '../../core/models';

import { OffboardingService } from './services/offboarding.service';

@Component({
  selector: 'app-offboarding',
  templateUrl: './offboarding.component.html',
  styleUrls: ['./offboarding.component.scss'],
  imports: [MatTab, MatTabGroup, RouterOutlet, InputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardingComponent implements OnInit {
  private offboardingService = inject(OffboardingService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  public tabs: EntityModel<string>[] = [
    { id: 'employees', name: 'Employees' },
    { id: 'staff', name: 'Staff' },
  ];

  public searchControl = new FormControl('');
  public selectedTabIndex = 0;

  ngOnInit(): void {
    this.startNavigationWatching();
    this.startSearchWatching();
  }

  public onTabChange(index: number): void {
    const tabId = this.tabs[index].id;
    this.router.navigate([tabId], { relativeTo: this.activatedRoute });
  }

  private startNavigationWatching(): void {
    this.activatedRoute.firstChild?.url
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((urlSegments) => {
        const currentPath = urlSegments[0]?.path;
        const index = this.tabs.findIndex((tab) => tab.id === currentPath);
        this.selectedTabIndex = index !== -1 ? index : 0;
      });
  }

  private startSearchWatching(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.offboardingService.updateFilters({ search: value });
      });
  }
}
