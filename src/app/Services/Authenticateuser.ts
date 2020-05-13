import { Injectable} from '@angular/core'
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class IsAuthenticatedUser implements CanActivate{

    canActivate(route:ActivatedRouteSnapshot,router:RouterStateSnapshot){
        debugger;
        //later we can add Authentication mechanisum (OpenID connect)....
        return true;
    }

}