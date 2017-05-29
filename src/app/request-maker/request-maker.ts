import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { IPhotoUrls , IPhotoListElement , IPhotoListElementDetails} from '../interfaces';
import { GetPhotoUrl } from './get-photos-url';
import { GetPhotosDetails } from './get-photos-details';
import { GetPhotoList } from './get-photos-list';

export class RequestMaker {
  private http:Http;

  private key = "9f2d31e455853102e0f43c396e887450";

  private PhotosUrl:GetPhotoUrl;
  private PhotosDetails:GetPhotosDetails;
  private PhotosList:GetPhotoList;

  constructor( http: Http ) {
    this.http = http;
    this.PhotosUrl = new GetPhotoUrl();
    this.PhotosDetails = new GetPhotosDetails( http, this.key );
    this.PhotosList = new GetPhotoList(http, this.key );
  }

  getPhotosList( text:string ){
    return this.PhotosList.getList( text );
  }


  getPhotoUrl( photo:IPhotoListElement ){
    return <IPhotoUrls>this.PhotosUrl.getUrl( photo );
  }


  getPhotoDetails( photo:IPhotoListElement ){
    return this.PhotosDetails.getDetails( photo.id, photo.secret );
  }

  
}
