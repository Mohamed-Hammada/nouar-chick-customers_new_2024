import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateFinancialTransactionComponent } from './create-update-financial-transaction.component';

describe('CreateUpdateFinancialTransactionComponent', () => {
  let component: CreateUpdateFinancialTransactionComponent;
  let fixture: ComponentFixture<CreateUpdateFinancialTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateFinancialTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateFinancialTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
