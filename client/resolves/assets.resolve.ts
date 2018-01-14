import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import * as _ from 'lodash';

// Import Assets service
import { AssetsService }    from '../services/assets.service';

@Injectable()

export class AssetResolves implements Resolve<any> {


  // Variables
  configResolveData: any;
  constructor(
    private assetsService  :  AssetsService
    ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise(resolve => {
      this.assetsService.get().subscribe( (assets: any) => {
        resolve(assets);
      });
    });
  }
}