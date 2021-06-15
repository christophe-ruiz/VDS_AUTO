export class Mechanic {
  public id = 0;

  constructor(public nom: string = "",
              public prenom: string = "",
              public title:string = "",
              public avi: string = "",) {
    this.id = Date.now();
  }
}
