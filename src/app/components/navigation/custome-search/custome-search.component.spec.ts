import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeSearchComponent } from './custome-search.component';

describe('CustomeSearchComponent', () => {
  let component: CustomeSearchComponent;
  let fixture: ComponentFixture<CustomeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomeSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
