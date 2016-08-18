import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CustomData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CustomData {
  data: any;
  photos:any;
  cdMeta:any;
  fileStructure:any;

  constructor(private http: Http) {
    this.data = null;
  }

  loadCDMeta() {
    if (this.cdMeta) {
      // already loaded data
      return Promise.resolve(this.data);
    }
    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('CD Resources/customiseCD.json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  loadFileStructure() {
    if (this.fileStructure) {
      // already loaded data
      return Promise.resolve(this.data);
    }
    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('CD Resources/fileStructure.json')
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
    });
  }

  getFolder(folderName, fileStructure){
    for (let item of fileStructure){
      if(item.name==folderName && item.type=='directory'){
        //set feature image
        item.featureImage=this.getFile('feature image.png',item)
        //set child feature images if type folder
        var x=0;
        for(let child of item.children){
          if(child.type=="directory"){
            item.children[x]['featureImage']=this.getFile('feature image.png',child)
          }
          x++
        }
        return item
      }
    }
  }

  getFile(fileName, fileStructure){
    for(let child of fileStructure.children){
      if(child.name=="feature image.png"){
        return child.path}
    }
  }
}

