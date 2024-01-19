import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementHistoryComponent } from './statement-history.component';

describe('StatementHistoryComponent', () => {
  let component: StatementHistoryComponent;
  let fixture: ComponentFixture<StatementHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
