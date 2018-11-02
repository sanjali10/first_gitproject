import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelloListComponent } from './hello-list.component';

const routes: Routes = [
    {
        path: '',
        component: HelloListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HelloListRoutingModule {}
