import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new DataService();
  });
  
  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('should return data from @Get decorator', () => {
    service.getAll().subscribe(data => {
      
    });
  });

  it('should return data from @Post decorator', () => {

  });

  it('should return data from @Put decorator', () => {

  });

  it('should return data from @Patch decorator', () => {

  });

  it('should return data from @Delete decorator', () => {

  });
});
