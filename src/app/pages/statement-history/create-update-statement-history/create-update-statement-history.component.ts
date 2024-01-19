import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from '../../../_helper/data.service';
import { NotificationService } from '../../../components/notification.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { StatementHistory, StatementHistoryService } from '../statement-history.service';
@Component({
  selector: 'app-create-update-statement-history',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './create-update-statement-history.component.html',
  styleUrl: './create-update-statement-history.component.scss'
})
export class CreateUpdateStatementHistoryComponent implements OnInit,AfterViewInit{

  statementHistory: StatementHistory = {};
  readOnly:boolean = false;
  @ViewChild('descriptionTextarea') descriptionTextarea: ElementRef | undefined;


  statementHistoryForm!: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService,
    private statementHistoryService: StatementHistoryService,
    private notificationService: NotificationService,
    private router: Router) {
    if (this.dataService.data)
      this.statementHistory = this.dataService.data.content; 
    if(this.dataService.data.readOnly){
      this.readOnly = true;
    }
  }
  ngAfterViewInit(): void {
    if (this.descriptionTextarea) {
      const target = this.descriptionTextarea.nativeElement as HTMLTextAreaElement;
      target.style.height = "0px";
      target.style.height = (target.scrollHeight + 25) + "px";
    }
  }


  ngOnInit(): void {
    this.statementHistoryForm = this.fb.group({
      id: [this.statementHistory?.id || null],
      name: [this.statementHistory?.name || '', Validators.required],
      description: [this.statementHistory?.description || '']
    });
  }
  autoGrowTextZone(e: Event) {
    const target = (e as any)?.target as HTMLElement | undefined;
    if (target) {
      target.style.height = "0px";
      target.style.height = (target.scrollHeight + 25) + "px";
    }
  }
  onSubmit(): void {
    if (this.statementHistory.id) {
      // Update existing statementHistory
      const updatedStatementHistory: StatementHistory = { ...this.statementHistory, ...this.statementHistoryForm.value };
      this.statementHistoryService.updateStatementHistory(updatedStatementHistory).subscribe(response => {
        // Handle update success
        this.router.navigate(['/statement-history']);
        this.notificationService.success('StatementHistory updated successfully');
      }, error => {
        // Handle update error
        console.error('Update failed:', error);
        this.notificationService.error('Update failed');
      });
    } else {
      // Add new statementHistory
      const newStatementHistory: StatementHistory = this.statementHistoryForm.value;
      this.statementHistoryService.createStatementHistory(newStatementHistory).subscribe(response => {
        // Handle add success
        this.router.navigate(['/statementHistorys']);
        this.notificationService.success('StatementHistory added successfully');
      }, error => {
        // Handle add error
        console.error('Add failed:', error);
        this.notificationService.error('Create failed');

      });
    }
  }
}
