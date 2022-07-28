import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/navigation/authGuard';
import { HomeComponent } from './components/navigation/home/home.component';
import { NotesCreateComponent } from './components/notes/notes-create/notes-create.component';
import { NotesEditComponent } from './components/notes/notes-edit/notes-edit.component';
import { NotesComponent } from './components/notes/notes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: NotesComponent, canActivate: [AuthGuard] },
  { path: 'notesCreate', component: NotesCreateComponent, canActivate: [AuthGuard] },
  { path: 'notesEdit/:id', component: NotesEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
