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

  public spontaneousForm !: FormGroup;
  public offers: string[] = []

  constructor(private fb: FormBuilder) {
    this.spontaneousForm = this.fb.group({
      nom: ['', Validators.required ],
      prenom: ['', Validators.required ],
      email: [
        '',
        Validators.required,
        Validators.pattern(/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/)
      ],
      phone: ['', Validators.required ],
      msg: [''],
      resume: [''],
      coverletter: ['']
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

}
