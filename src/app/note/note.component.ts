import { Component,OnInit,Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { Note } from '../note';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input()
  note: Note;
  constructor(private router: RouterService) {}
  ngOnInit() {}
  openEditView() {
    this.router.routeToEditNoteView(this.note.id);
  }
}
