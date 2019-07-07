import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule } from '@angular/material';
import { MatListModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { NotesService } from './services/notes.service';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { NoteViewComponent } from './note-view/note-view.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteComponent } from './note/note.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateRouteGuard], children: [
    {
      path: 'view/noteview', component: NoteViewComponent
    },
    {
      path: 'view/listview', component: ListViewComponent
    },
    {
      path: 'note/:noteId/edit', component: EditNoteOpenerComponent,
      outlet : 'noteEditOutlet'
    },
    {
      path: '', redirectTo: 'view/noteview', pathMatch: 'full'
    }
  ] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    EditNoteOpenerComponent,
    ListViewComponent,
    NoteViewComponent,
    NoteTakerComponent,
    NoteComponent,
    EditNoteViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [NotesService,
    AuthenticationService,
    RouterService,
    CanActivateRouteGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [ EditNoteViewComponent ]
})

export class AppModule { }
