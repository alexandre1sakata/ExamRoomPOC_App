import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notes-create',
  templateUrl: './notes-create.component.html'
})
export class NotesCreateComponent implements OnInit {

  invalidLogin?: boolean;
  errorCreate?: string;

  createFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public notesService: NotesService,
    private toastr: ToastrService
  ) {
    this.createFormGroup = this.formBuilder.group({
      title: [''],
      description: ['']
    });
   }

  ngOnInit(): void {
  }

  createNote() {
    this.notesService.create(this.createFormGroup.value)
      .subscribe(data => {
        this.toastr.success('Notes', 'Note created!!');
        this.router.navigate(['notes']);
      }, error => {
        this.invalidLogin = true;
        this.errorCreate = error.error;
        console.log(this.errorCreate);
      });
  }

}
