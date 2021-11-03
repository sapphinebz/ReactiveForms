import { BehaviorSubject, isObservable, Observable, Subscription } from 'rxjs';
import { filter, first, shareReplay } from 'rxjs/operators';

export namespace Rx {
  const compScptSymbol = Symbol('component subscription');
  export function AutoSubscription() {
    return (target: any, propertyName: string) => {
      Object.defineProperty(target, propertyName, {
        get: function () {
          return this[compScptSymbol];
        },
        set: function (value: any) {
          this[compScptSymbol] = value;
        },
      });
    };
  }

  export function AsObservable(option: { propertyName: string }) {
    return (target: any, propertyName: string) => {
      const changed$ = new BehaviorSubject(undefined);
      target[option.propertyName] = changed$.pipe(filter(Boolean));
      Object.defineProperty(target, propertyName, {
        get: function () {
          return changed$.value;
        },
        set: function (value: any) {
          changed$.next(value);
        },
      });
    };
  }

  export function AutoSubscribe(option: {
    propertyName: string;
    once?: boolean;
  }) {
    return (target: any, propertyName: string) => {
      const symbol = Symbol('observable');
      const scptSymbol = Symbol('subscription');
      Object.defineProperty(target, propertyName, {
        get: function () {
          return this[symbol];
        },
        set: function (value: Observable<any>) {
          this[symbol] = value;
          if (isObservable(value)) {
            let subscription: Subscription = this[scptSymbol];
            if (subscription) {
              subscription.unsubscribe();
            }
            subscription = value
              .pipe((source) => {
                if (option.once) {
                  return source.pipe(first());
                }
                return source;
              })
              .subscribe((changed) => (this[option.propertyName] = changed));
            this[scptSymbol] = subscription;
            addComponentSubscription(this, subscription);
          }
        },
      });
    };
  }

  export function Debounce({ time }: { time: number } = { time: 400 }) {
    return (
      target: any,
      propertyName: string,
      descriptor: TypedPropertyDescriptor<any>
    ) => {
      let method = descriptor.value!;
      let timeoutIndex: any;
      descriptor.value = function () {
        if (timeoutIndex) {
          ((window as any)?.__zone_symbol__clearTimeout ?? clearTimeout)(
            timeoutIndex
          );
        }

        timeoutIndex = setTimeout(() => {
          method.apply(this, arguments);
        }, time);
      };
    };
  }

  export function SwitchMap() {
    return (
      target: any,
      propertyName: string,
      descriptor: TypedPropertyDescriptor<any>
    ) => {
      let method = descriptor.value!;
      const symbol = Symbol('subscription');
      descriptor.value = function () {
        let subscription: Subscription = target[symbol];
        if (subscription && subscription instanceof Subscription) {
          subscription.unsubscribe();
          removeSubscriptionComponent(target, subscription);
        }
        const returnValue = method.apply(this, arguments);
        if (isObservable(returnValue)) {
          subscription = returnValue.subscribe();
        } else {
          subscription = returnValue;
        }
        target[symbol] = subscription;
        addComponentSubscription(target, subscription);
      };
    };
  }

  export function ExhaustMap() {
    return (
      target: any,
      propertyName: string,
      descriptor: TypedPropertyDescriptor<any>
    ) => {
      let method = descriptor.value!;
      const symbol = Symbol('subscription');
      descriptor.value = function () {
        let subscription: Subscription = target[symbol];
        if (
          !subscription ||
          (subscription instanceof Subscription && subscription.closed)
        ) {
          const returnValue = method.apply(this, arguments);
          if (isObservable(returnValue)) {
            subscription = returnValue.subscribe();
          } else {
            subscription = returnValue;
          }
          target[symbol] = subscription;
          addComponentSubscription(target, subscription);
        } else {
          removeSubscriptionComponent(target, subscription);
        }
      };
    };
  }

  export function Cache() {
    return (
      target: any,
      propertyName: string,
      descriptor: TypedPropertyDescriptor<any>
    ) => {
      let method = descriptor.value!;
      const cacheMap = new Map<string, Observable<any>>();
      descriptor.value = function () {
        const cacheKey = getCacheKey(arguments, target, propertyName);
        let cache$ = cacheMap.get(cacheKey);
        if (cache$ !== undefined && cache$ !== null) {
          return cache$;
        } else {
          const source = method.apply(this, arguments);
          if (isObservable(source)) {
            cache$ = source.pipe(shareReplay(1));
            cacheMap.set(cacheKey, cache$);
            return cache$;
          }
          return source;
        }
      };
    };
  }

  export function CacheKey() {
    return (target: any, propertyKey: string, parameterIndex: number) => {
      (target[`__cacheKey__${propertyKey}`] ??= []).push(parameterIndex);
    };
  }

  function getCacheKey(args: IArguments, target: any, propertyName: string) {
    const cacheKey = Array.from(args).reduce<string>((key, argument, index) => {
      const cacheArguments: number[] = target[`__cacheKey__${propertyName}`];
      if (cacheArguments.includes(index)) {
        return `${key}__${argument}`;
      }
      return key;
    }, '');
    return cacheKey;
  }

  function addComponentSubscription(target: any, subscription: Subscription) {
    target[compScptSymbol] ??= new Subscription();
    (target[compScptSymbol] as Subscription).add(subscription);
  }

  function removeSubscriptionComponent(
    target: any,
    subscription: Subscription
  ) {
    const componentSubscription = target[compScptSymbol];
    if (
      componentSubscription &&
      componentSubscription instanceof Subscription
    ) {
      componentSubscription.remove(subscription);
    }
  }
}
