import { HttpHeaders } from '@angular/common/http';

export const httpOptionsBase = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const serverUrl = 'http://localhost:9428/api';
// export const serverUrl = 'http://vds.cruiz.fr/api';
// export const serverUrl = 'https://api.vdsauto.fr/api';
