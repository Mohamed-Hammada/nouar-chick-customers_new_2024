import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateStatementHistoryComponent } from './create-update-statement-history.component';

describe('CreateUpdateStatementHistoryComponent', () => {
  let component: CreateUpdateStatementHistoryComponent;
  let fixture: ComponentFixture<CreateUpdateStatementHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateStatementHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateStatementHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
