
export function OutsideAngular(targetClass: any, functionName: string, descriptor) {
    const source = descriptor.value;

    descriptor.value = function(...data) {
      if (!this.ngZone) {
        throw new Error(`Class with 'OutsideAngular' decorator should have 'ngZone' class property with 'NgZone' class.`);
      }
      return this.ngZone.runOutsideAngular(() => source.call(this, ...data));
    };

    return descriptor;
}
