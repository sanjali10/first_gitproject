import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SspDownloadComponent } from '../ssp-download/ssp-download.component';

const routes: Routes = [
    {
        path: '',
        component: SspDownloadComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SspDownloadRoutingModule { }
