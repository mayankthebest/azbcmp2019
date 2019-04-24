import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { QuestionsHubComponent } from './questions-hub/questions-hub.component';
import { ResponsesComponent } from './responses/responses.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'questions',
    component: QuestionsHubComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'results',
    component: ResponsesComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
