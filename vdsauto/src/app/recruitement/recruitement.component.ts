import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApplicationService} from "../../services/application.service";

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

  public spontaneousForm : FormGroup = this.fb.group({
    nom:          ['', Validators.pattern(/^[a-z ,.'-]+$/i) ],
    prenom:       ['', Validators.pattern(/^[a-z ,.'-]+$/i)],
    email:        ['', Validators.email ],
    phone:        ['', [Validators.required, Validators.pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)] ],
    msg:          [''],
    resume:       ['', Validators.required],
    coverletter:  ['', Validators.required]
  });

  public offers: string[] = [];
  private spontaneousFormData = new FormData();

  constructor(private fb: FormBuilder, private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
  }

  upload() {
    if (this.spontaneousForm.invalid) return;
    // this.spontaneousFormData.append('nom', this.spontaneousForm.get('nom')!.value)
    // this.spontaneousFormData.append('prenom', this.spontaneousForm.get('prenom')!.value)
    // this.spontaneousFormData.append('email', this.spontaneousForm.get('email')!.value)
    // this.spontaneousFormData.append('msg', this.spontaneousForm.get('msg')!.value)
    // this.spontaneousFormData.append('phone', this.spontaneousForm.get('phone')!.value)
    console.log('FORMDATA BEFORE SENDING', this.spontaneousFormData.get('coverletter'))
    this.applicationService.uploadApplication(this.spontaneousFormData);
  }

  handleFile(e: any, f: FileType) {
    if (e.target.files.length > 0) {
      const file: File = e.target.files[0];
      if (f == this.ft.RESUME) {
        console.log("RESUME")
        this.spontaneousForm.patchValue({
          resume: file.name
        });
        // this.spontaneousFormData.append('resume', file, file.name);
        console.log('RESUME ADDED')
        console.log(this.spontaneousForm)
      } else if (f == this.ft.COVERLETTER) {
        console.log("COVERLETTER")

        this.spontaneousForm.patchValue({
          coverletter: file.name
        });

        this.spontaneousFormData.append('coverletter', file, file.name);
        console.log("COVERLETTER ADDED")
        console.log(this.spontaneousForm)
      }
    }
    else console.log("file is null")
    console.log("SPON FORM")
    console.log(this.spontaneousForm)
  }

  requestFormValidation () :void {
    this.requestedFormValidation = true;
    console.log(this.requestedFormValidation)

    if (this.spontaneousForm.valid) {
      this.upload();
      // this.spontaneousForm.reset()
      this.requestedFormValidation = false;
    }
  }

}
