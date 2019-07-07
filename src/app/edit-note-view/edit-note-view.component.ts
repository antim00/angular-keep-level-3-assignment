import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit, OnDestroy {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  constructor(private noteService : NotesService,
    private routeService : RouterService,
    private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any){
      this.note =  this.data;
    }

  ngOnInit(){
    this.note = this.noteService.getNoteById(this.data);
  }
  ngOnDestroy(){
    this.routeService.routeBack();
  }

  onSave() {
    this.noteService.editNote(this.note).subscribe(editedNote =>{
      this.dialogRef.close();
    }, error =>{
      this.errMessage = error.message;
    });
  }
}
