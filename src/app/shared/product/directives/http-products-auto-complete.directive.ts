import { Directive, NgZone, OnDestroy } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { ProductHttpService } from 'src/app/api/product.http.service';
import { ProductModel } from 'src/app/models/product';

@Directive({
  selector: '[appHttpProductsAutoComplete]',
})
export class HttpProductsAutoCompleteDirective implements OnDestroy {
  private destroy$ = new Subject<void>();
  private httpProducts$ = this.productHttpService
    .getProducts()
    .pipe(shareReplay(1));
  constructor(
    private autoComplete: AutoComplete,
    private zone: NgZone,
    private productHttpService: ProductHttpService
  ) {
    const ProductNameKey: keyof ProductModel = 'product_name';
    this.autoComplete.field = ProductNameKey;
    this.zone.runOutsideAngular(() => {
      autoComplete.completeMethod
        .pipe(
          switchMap(
            (autoCompleteEvent: { originalEvent: Event; query: string }) => {
              return this.httpProducts$.pipe(
                this.filterProduct(autoCompleteEvent.query)
              );
            }
          ),
          takeUntil(this.destroy$)
        )
        .subscribe((products) => {
          this.autoComplete.suggestions = products;
          this.autoComplete.cd.detectChanges();
        });
    });
  }

  private filterProduct(query: string) {
    return (source: Observable<ProductModel[]>) =>
      source.pipe(
        map((products) => {
          return products.filter(
            (product) => product.product_name.indexOf(query) !== -1
          );
        })
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
