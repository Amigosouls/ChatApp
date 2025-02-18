import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { authGuard } from 'src/guards/auth.guard';
import { AuthComponent } from './login/auth/auth.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: 'auth' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
