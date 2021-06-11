import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

enum FileType {
  RESUME,
  COVERLETTER
}

@Component({
  selector: 'app-recruitement',
  templateUrl: './recruitement.component.html',
  styleUrls: ['./recruitement.component.scss']
})
export class RecruitementComponent implements OnInit {
  readonly ft = FileType;

  public requestedFormValidation: boolean = false;

  public spontaneousForm !: FormGroup;
  public offers: string[] = []

  constructor(private fb: FormBuilder) {
    this.spontaneousForm = this.fb.group({
      nom:          ['', Validators.pattern(/^[a-z ,.'-]+$/i) ],
      prenom:       ['', Validators.pattern(/^[a-z ,.'-]+$/i)],
      email:        ['', Validators.email ],
      phone:        ['', [Validators.required, Validators.pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)] ],
      msg:          [''],
      resume:       ['', Validators.required],
      coverletter:  ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  handleFile(e: any, f: FileType) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (f === FileType.RESUME) {
        this.spontaneousForm.setValue({
          resume: file
        });
      } else if (f === FileType.COVERLETTER) {
        this.spontaneousForm.setValue({
          coverletter: file
        })
      }
    }
    else console.log("file is null")
  }

  requestFormValidation () :void {
    this.requestedFormValidation = true;
    console.log(this.requestedFormValidation)
  }

}
