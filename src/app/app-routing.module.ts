import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'timecard',
    children: [
      {
        path: 'add',
        loadChildren: () =>
          import('./timecard/add/add.module').then((m) => m.AddModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
