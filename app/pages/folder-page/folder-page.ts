import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the FolderPagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/folder-page/folder-page.html',
})
export class FolderPage {

  folderStructure:any;
  files:any;
  subFolders:any;
  photos:any;
  links:any;
  constructor(private nav: NavController, private params:NavParams) {
    this.folderStructure=params.data;
    this.subFolders=getFolders(this.folderStructure);
    this.files=getFilesAndPhotos(this.folderStructure);
    this.photos=this.files.photos;
    this.links=this.files.links;
    this.files=this.files.files;
    console.log(this.links)
  }
  folderClick(resource){
    this.nav.push(FolderPage,resource)
  }

}

function getFolders(fileStructure){
  var folders=[];
  for(let child of fileStructure.children){
    if(child.type=='directory'){folders.push(child)}
  }
  return folders
}

function getFilesAndPhotos(fileStructure){
  var files=[];
  var photos=[];
  var links=[];
  for(let child of fileStructure.children){
    console.log(child.name)
    if(child.type=='file'){
      if(child.name.includes('png')==true || child.name.includes('jpg')==true){
        if(child.name!='feature image.png'){photos.push(child)}
      }
      else if(child.name.includes('.html')==true){links.push(child)}
      else{files.push(child)}
    }
  }
  return {photos:photos,files:files,links:links}
}
