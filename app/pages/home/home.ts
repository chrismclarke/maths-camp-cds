import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CustomData} from "../../providers/custom-data/custom-data";
import {FolderPage} from "../folder-page/folder-page"

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
    fileStructure:any;
    photos:any;
    generalResources:any;
    themeResources:any;
  constructor(private navCtrl: NavController, private customData:CustomData){
   customData.loadCDMeta().then(result=>{
     this.customData=result;
   });
      customData.loadFileStructure().then(result=>{
          this.fileStructure=result;
          console.log(this.fileStructure);
          this.generalResources=customData.getFolder('General Resources',this.fileStructure.children).children;
          console.log(this.generalResources);
          this.themeResources=customData.getFolder('Theme Resources', this.fileStructure.children).children;
          console.log(this.themeResources)
      });
  }
    folderClick(resource){
        this.navCtrl.push(FolderPage,resource)
    }
}

function readPhotos(){
    console.log('reading photos');
    console.log(window);
    //console.log(fs);
}
