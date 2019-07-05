import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormControl } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit, OnDestroy {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  constructor(private noteService: NotesService,
    private routeService: RouterService,
    private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    }

    ngOnInit() {
      this.note = this.noteService.getNoteById(this.data);
    }
    ngOnDestroy() {
      this.routeService.routeBack();
    }

  onSave() {
    this.noteService.editNote(this.note).subscribe(editedNote => {
      this.dialogRef.close();
    }, error => {
      this.errMessage = error.message;
    });

  }
}
