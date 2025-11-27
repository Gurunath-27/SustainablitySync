import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SyncComponent } from './sync.component';

const routes: Routes = [
  {
    path: '',
    component: SyncComponent
  }
];

@NgModule({
  declarations: [
    SyncComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SyncModule { }

