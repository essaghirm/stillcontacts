import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular';


/*
  Generated class for the ContactServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
@Injectable()
export class ContactServicesProvider {
	url: string = "http://cmma.agence360.ma/stillsf/public/"
	// url: string = "http://localhost:8000/"
	loading: any

	constructor(public http: HttpClient) {
		console.log('Hello ContactServicesProvider Provider');
	}

	

	// private catchError(error: Response | any) {
	// 	console.log('catchError: ', error);
	// 	return Observable.throw(error.json().error || "Server error");
	// }

	// private logResponse(res: Response) {
	// 	console.log('Do: ', res.json());
	// }

	// private extractResponse(res: Response) {
	// 	return res.json();
	// }

	// exemple(id, limit) {
	// 	return this.http.get(this.url + '?function=articlesByAuthor&id=' + id + '&limit=' + limit)
	// 		.do(this.logResponse)
	// 		.map(this.extractResponse)
	// 		.catch(this.catchError)
	// }

}
