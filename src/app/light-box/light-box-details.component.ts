import { Component, OnInit } from '@angular/core';
import { IPhotoListElementDetails } from '../interfaces';
import { LightBoxService } from './light-box.service';

@Component({
  selector: 'light-box-details',
  template: `
    <table *ngIf="photoDetails" class="table table-striped table-inverse">
      <thead>
        <tr>
          <th>#</th>
          <th>Parameter</th>
          <th>Specyfication</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td> Camera </td>
          <td> {{photoDetails.camera|| "-------"}} </td>
        </tr>
        <tr *ngFor = "let information of photoDetails.exif; let i = index">
          <th scope="row">{{i+2}}</th>
          <td>{{information.label}}</td>
          <td>{{information.raw._content}}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    .table{
      margin:0 auto;
      width:90%;
      position:relative;
      z-index:1001;
    }
  `]
})
export class LightBoxDetailsComponent implements OnInit {

  private photoDetails:IPhotoListElementDetails;

  constructor( private lightBox:LightBoxService ) { }

  ngOnInit() {
    this.lightBox.getPhotoDetailsStream()
      .subscribe( ( photoDetails:IPhotoListElementDetails ) => {
        this.photoDetails = photoDetails;
      })
  }

}
