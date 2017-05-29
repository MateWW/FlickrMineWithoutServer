import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { LightBoxService } from './light-box.service';

import { CommunicationService } from "../communication.service";


import { IPhotoListElement, IPhotoListElementDetails, IPhotoUrls } from '../interfaces';

describe('LightBoxService', () => {
  let element;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers:[
        LightBoxService,
        CommunicationService
      ]
    });
    element = JSON.parse(`{"id":"34818900221","owner":"141807364@N07","secret":"8d8d397d63","server":"4252","farm":5,"title":"INJUSTICE ANYWHERE THREATENS JUSTICE EVERYWHERE","ispublic":1,"isfriend":0,"isfamily":0}`);
  });

  it('should check visible stream', async(inject([LightBoxService,CommunicationService], (service: LightBoxService, communication:CommunicationService) => {
    service.getVisibileStream()
      .subscribe(( visible:boolean )=>{
        expect(typeof visible).toBe("boolean");
      })
    communication.showLightBox(element);
    expect(service).toBeTruthy();
  })));

  it('should check details stream', async(inject([LightBoxService,CommunicationService], (service: LightBoxService, communication:CommunicationService) => {
    service.getPhotoDetailsStream()
      .subscribe(( photoDetails:IPhotoListElementDetails )=>{
        expect( photoDetails.exif ).toBeDefined();
        expect( photoDetails.id ).toBeDefined();
        expect( photoDetails.secret ).toBeDefined();
      })
    communication.showLightBox(element);
  })));

  it('should check url stream', async(inject([LightBoxService,CommunicationService], (service: LightBoxService, communication:CommunicationService) => {
    service.getPhotoUrlStream()
      .subscribe(( photoUrls:IPhotoUrls)=>{
        expect( photoUrls.id ).toBeDefined();
        expect( photoUrls.thumbnailUrl ).toBeDefined();
        expect( photoUrls.orginalUrl ).toBeDefined();
      })
    communication.showLightBox(element);
  })));
});
