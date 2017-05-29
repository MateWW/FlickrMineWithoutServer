import { Observable } from 'rxjs';
import { IPhotoListElementDetails } from '../interfaces';

export class GetPhotosDetails{

    private emptyPhotoDetails : IPhotoListElementDetails = {
        id: 0,
        secret: '',
        exif:[
            {
                label:'',
                raw:{
                    _content:'string'
                }
            }
        ]
    }
    
    private http;
    private key;

    constructor( http , key ){
        this.http = http;
        this.key = key;
    }

    getDetails( photoId , secret ){

        if( !photoId || !secret )
            return Observable.of(this.emptyPhotoDetails);

        return this.http.get( this.getUrl( photoId , secret ) )
            .catch( (e) =>{
                return Observable.of(this.emptyPhotoDetails);
            })
            .map( ( response ) => ( typeof response.json != 'undefined' ? response.json() : response ))
            .map( ( photoDetails ) => { 
                if(typeof photoDetails.stat == "undefined" || photoDetails.stat != "ok")
                    return this.emptyPhotoDetails;
                
                return photoDetails.photo;
            })
    }

    private getUrl( id , secret ){
        let requestAddres = `https://api.flickr.com/services/rest/`,
            requestMethod = `flickr.photos.getExif`,
            requestImportantOptions = `format=json&nojsoncallback=1`,
            datas = `photo_id=${encodeURI(id)}&secret=${encodeURI(secret)}`
        return `${requestAddres}?method=${requestMethod}&api_key=${this.key}&${datas}&${requestImportantOptions}`;        
    }

}