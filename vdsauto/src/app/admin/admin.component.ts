import { Component, OnInit } from '@angular/core';
import {ContactInfoService} from "../../services/contact-info.service";
import {TeamService} from "../../services/team.service";
import {WorkService} from "../../services/work.service";
import {Mechanic} from "../../models/mechanic";
import {Service} from "../../models/service";
import {TitleService} from "../../services/title.service";
import Swal from 'sweetalert2'
import {animate, style, transition, trigger} from "@angular/animations";
import {faChevronDown, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {MessageService} from "../../services/message.service";
import {Offer} from "../../models/offer";
import {OfferService} from "../../services/offer.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AviService} from "../../services/avi.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('fold', [
      transition(':enter', [
        style({height: 0, overflow: 'hidden'}),
        animate('.3s ease', style({height: '*'}))
      ]),
      transition(':leave', [
        style({height: '*', overflow: 'hidden'}),
        animate('.3s ease', style({height: 0}))
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  public team: Mechanic[] = [];
  public offers: Offer[] = [];
  public services: Service[] = []
  public avis: string[] = [];

  public aviData: FormData = new FormData();
  public aviForm: FormGroup = this.fb.group({
    avis: this.fb.array([])
  });

  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  public teamUnfolded: boolean = false;
  public msgUnfolded: boolean = false;
  public contactUnfolded: boolean = false;
  public offersUnfolded: boolean = false;

  public msg: string = "";

  public phone: string = "";
  public mail: string = "";
  public hours: string = "";

  constructor(private contactInfoService: ContactInfoService,
              private teamService: TeamService,
              private workService: WorkService,
              private titleService: TitleService,
              private offerService: OfferService,
              private msgService: MessageService,
              private fb: FormBuilder,
              private aviService: AviService) {
    this.teamService.team$.subscribe(m => this.team = m);
    this.workService.services$.subscribe(s => this.services = s);
    this.msgService.msg$.subscribe(m => this.msg = m);

    this.contactInfoService.num$.subscribe(n => this.phone = n);
    this.contactInfoService.mail$.subscribe(m => this.mail = m);
    this.contactInfoService.hours$.subscribe(h => this.hours = h);

    this.offerService.offers$.subscribe(o => this.offers = o);
    this.aviService.avis$.subscribe(a => this.avis = a);
  }

  ngOnInit(): void {
    this.titleService.setTitle('Administration');
  }

  newMate(): void {
    this.teamService.newMate()
  }

  newOffer(): void {
    this.offerService.newOffer("Titre de l'offre", "Description du poste recherché.");
  }

  delMate(m: Mechanic):void {
    this.teamService.delMate(m);
  }

  delOffer(o: Offer):void {
    this.offerService.delOffer(o);
  }

  saveTeam(): void {
    this.teamService.save();
  }

  saveMsg():void {
    this.msgService.send(this.msg)
  }

  saveContact(): void {
    this.contactInfoService.send({
      phone: this.phone,
      mail: this.mail,
      hours: this.hours
    })
  }

  saveOffers(): void {
    this.offerService.save()
  }

  delAvi(a: string): void {
    this.aviService.delete(a);
  }

  handleFiles(e: any) {
    let files: File[] = [];
    console.log('AVI FILES', e.target.files);
    if (e.target.files.length > 0) {
      files = Array.from(e.target.files);

      files.forEach( f => {
        this.aviData.append('avis', f as Blob);
      })

      this.aviForm.patchValue({
        files: files
      });
    } else {
      this.aviForm.patchValue({
        files: []
      });
    }
  }

  uploadAvi(): void {
    this.aviService.post(this.aviData);
  }

}
