import { Injectable } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Subject } from "rxjs";

import { IPhotoListElement, IPhotoListElementDetails, IPhotoUrls } from '../interfaces';

@Injectable()
export class LightBoxService {

  private visible = false;

  private photoUrl: IPhotoUrls ;
  private photoDetails: IPhotoListElementDetails;


  private visibleStream = new Subject();  
  private photoDetailsStream = new Subject();
  private photoUrlStream = new Subject();

  constructor( private communication:CommunicationService ) { 
    this.communication.getLightBoxStream()
      .subscribe(( photo:IPhotoListElement )=>{
          this.setVisible( true );
          this.setPhotoUrl( photo );
          this.setPhotoDetails( photo );
      });
  }

  private setVisible( state:boolean ){
      this.visible = state;
      this.visibleStream.next( state );
  }

  private setPhotoUrl( photoElement:IPhotoListElement ){
      let urls = this.communication.getPhotoUrl( photoElement );
      if( urls.id == 0 || urls.orginalUrl.length == 0 || urls.thumbnailUrl.length == 0 )
        return;

      this.photoUrl = urls;
      this.photoUrlStream.next(urls);
  }

  private setPhotoDetails( photoElement:IPhotoListElement ){
    this.communication.getPhotoDetails( photoElement )
      .subscribe(( photoDetails:IPhotoListElementDetails )=>{
          if( photoDetails.id == 0 || photoDetails.secret.length == 0 )
            return ;
          
          this.photoDetails = photoDetails;
          this.photoDetailsStream.next( photoDetails );
      });
  }
  
  getVisibileStream(){
    return this.visibleStream.startWith( this.visible );
  }

  getPhotoDetailsStream(){
    if(this.photoDetails)
      return this.photoDetailsStream.startWith( this.photoDetails );
    
    return this.photoDetailsStream.asObservable();
  }

  getPhotoUrlStream(){
    if(this.photoUrl)
      return this.photoUrlStream.startWith( this.photoUrl );
    
    return this.photoUrlStream.asObservable();
  }

  closeLightBox(){
    this.setVisible(false);
  }

}
