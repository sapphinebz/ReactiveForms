import { TestBed } from '@angular/core/testing';

import { Product.HttpService } from './product.http.service';

describe('Product.HttpService', () => {
  let service: Product.HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Product.HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
