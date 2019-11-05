import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../../shared/shared.module';
import { ActivitiesGridComponent } from './activities-grid/activities-grid.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActivitiesGridComponent,
    ActivityFormComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ActivitiesModule { }
