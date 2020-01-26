import * as tslib_1 from "tslib";
export function OutsideAngular(targetClass, functionName, descriptor) {
    var source = descriptor.value;
    descriptor.value = function () {
        var _this = this;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (!this.ngZone) {
            throw new Error("Class with 'OutsideAngular' decorator should have 'ngZone' class property with 'NgZone' class.");
        }
        return this.ngZone.runOutsideAngular(function () { return source.call.apply(source, tslib_1.__spread([_this], data)); });
    };
    return descriptor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0c2lkZS1hbmd1bGFyLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZWNvcmF0b3IvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL291dHNpZGUtYW5ndWxhci5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE1BQU0sVUFBVSxjQUFjLENBQUMsV0FBZ0IsRUFBRSxZQUFvQixFQUFFLFVBQVU7SUFDN0UsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUVoQyxVQUFVLENBQUMsS0FBSyxHQUFHO1FBQUEsaUJBS2xCO1FBTDJCLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAseUJBQU87O1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0dBQWdHLENBQUMsQ0FBQztTQUNuSDtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLElBQUksT0FBWCxNQUFNLG9CQUFNLEtBQUksR0FBSyxJQUFJLElBQXpCLENBQTBCLENBQUMsQ0FBQztJQUN6RSxDQUFDLENBQUM7SUFFRixPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZnVuY3Rpb24gT3V0c2lkZUFuZ3VsYXIodGFyZ2V0Q2xhc3M6IGFueSwgZnVuY3Rpb25OYW1lOiBzdHJpbmcsIGRlc2NyaXB0b3IpIHtcbiAgICBjb25zdCBzb3VyY2UgPSBkZXNjcmlwdG9yLnZhbHVlO1xuXG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKC4uLmRhdGEpIHtcbiAgICAgIGlmICghdGhpcy5uZ1pvbmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDbGFzcyB3aXRoICdPdXRzaWRlQW5ndWxhcicgZGVjb3JhdG9yIHNob3VsZCBoYXZlICduZ1pvbmUnIGNsYXNzIHByb3BlcnR5IHdpdGggJ05nWm9uZScgY2xhc3MuYCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gc291cmNlLmNhbGwodGhpcywgLi4uZGF0YSkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gZGVzY3JpcHRvcjtcbn1cbiJdfQ==