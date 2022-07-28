import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notes-edit',
  templateUrl: './notes-edit.component.html'
})
export class NotesEditComponent implements OnInit {

  editFormGroup: FormGroup;

  id: number;
  title: string;
  description: string;

  currentNote: Note;

  constructor(
    private notesService: NotesService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { 
    const idParam = 'id';

    this.id = 0;
    this.title = 'title';
    this.description = 'description';

    if (this.activeRoute.snapshot.params[idParam]) {
      this.id = this.activeRoute.snapshot.params[idParam];
    }

    this.editFormGroup = this.formBuilder.group({
      id: [''],
      title: [''],
      description: ['']
    });

    this.currentNote = new Note;
  }

  ngOnInit() {
    if (this.id !== null) {
      this.notesService.getOneById(this.id)
        .subscribe(data => (
          this.currentNote = data,
          this.editFormGroup.controls[this.title].setValue(data.title),
          this.editFormGroup.controls[this.description].setValue(data.description)
        ));
    }
  }

  saveNote() {
    let noteToUp: Note = {
      id: this.currentNote.id,
      title: this.editFormGroup.controls[this.title].value,
      description: this.editFormGroup.controls[this.description].value
    };
    this.notesService.update(noteToUp.id, noteToUp)
      .subscribe((data) => {
        this.toastr.success('Notes', 'Note updated!!');
        this.router.navigate(['notes'])
      });
  }

}
