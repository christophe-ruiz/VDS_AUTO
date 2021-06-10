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
      nom:          ['', Validators.required ],
      prenom:       ['', Validators.required ],
      email:        ['', Validators.email ],
      phone:        ['', Validators.required ],
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

}
