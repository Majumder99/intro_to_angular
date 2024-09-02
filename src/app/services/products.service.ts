import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationParams, Products } from '../../types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getProducts = (
    url: string,
    params: PaginationParams
  ): Observable<Products> => {
    return this.apiService.get(url, { params, responseType: 'json' });
  };
}
