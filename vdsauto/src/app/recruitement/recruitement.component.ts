import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApplicationService} from "../../services/application.service";
import {Offer} from "../../models/offer";
import {OfferService} from "../../services/offer.service";

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

  public offers: Offer[] = [];
  private spontaneousFormData = new FormData();

  constructor(private fb: FormBuilder,
              private applicationService: ApplicationService,
              private offerService: OfferService) {
    this.offerService.offers$.subscribe(o => this.offers = o);
  }

  ngOnInit(): void {
  }

  upload() {
    if (this.spontaneousForm.invalid) return;
    this.spontaneousFormData.set('nom', this.spontaneousForm.get('nom')!.value)
    this.spontaneousFormData.set('prenom', this.spontaneousForm.get('prenom')!.value)
    this.spontaneousFormData.set('email', this.spontaneousForm.get('email')!.value)
    this.spontaneousFormData.set('msg', this.spontaneousForm.get('msg')!.value)
    this.spontaneousFormData.set('phone', this.spontaneousForm.get('phone')!.value)
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
        this.spontaneousFormData.set('resume', file, file.name);
      } else if (f == this.ft.COVERLETTER) {
        console.log("COVERLETTER")
        this.spontaneousForm.patchValue({
          coverletter: file.name
        });
        this.spontaneousFormData.set('coverletter', file, file.name);
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
      this.spontaneousForm.reset()
      this.requestedFormValidation = false;
    }
  }

}
