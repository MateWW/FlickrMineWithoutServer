import { Observable } from 'rxjs';
import { IPhotoListElementDetails } from '../interfaces';

export class GetPhotoList{
    
    private http;
    private key;

    constructor( http , key ){
        this.http = http;
        this.key = key;
    }

    getList( text:string ){

        if(!text || text.trim().length == 0)
            return Observable.of([]);

        return this.http.get( this.getUrl( text ) )
            .map(( response ) => ( response.json() ))
            .map(( response ) => {
                if( typeof response.stat == undefined || response.stat !== "ok")
                    return Observable.of([])

                return response.photos.photo;
            })
            .catch( (e) => { 
                return Observable.of([])
            })
    }

    private getUrl( text ){
        let requestAddres = `https://api.flickr.com/services/rest/`,
            requestMethod = `flickr.photos.search`,
            requestImportantOptions = `format=json&nojsoncallback=1`;
        
        return `${requestAddres}?method=${requestMethod}&api_key=${this.key}&text=${encodeURI(text)}&${requestImportantOptions}`;        
    }
}