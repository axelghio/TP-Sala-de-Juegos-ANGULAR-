import { log } from 'util';
import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { map } from "rxjs/operators"; 
import { catchError } from "rxjs/operators"; 

@Injectable()
export class MiHttpService {

  constructor( public http: Http ) { }

  public httpGetP ( url: string)
  {
    return this.http
    .get( url )
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }

  public httpPostP( url: string, objeto: any )
  {
    return this.http
    .get( url )
    .subscribe( data => {
      console.log( data );
      return data;
    });
  }

  public httpGetO ( url: string): Observable<Response>
  {
    return this.http.get( url ).pipe(map( ( res: Response ) => res.json())).pipe(catchError( ( err: any ) => Observable.throw(err.json().error || 'Server error')));
  }


  private extractData ( res: Response )
  {
    return res.json() || {};
  }

  private handleError ( error: Response | any )
  {
    return error;
  }
}
