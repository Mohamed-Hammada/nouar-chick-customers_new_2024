import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCustomersComponent } from './create-update-customers.component';

describe('CreateUpdateCustomersComponent', () => {
  let component: CreateUpdateCustomersComponent;
  let fixture: ComponentFixture<CreateUpdateCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateCustomersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
