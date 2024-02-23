import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NotificationService } from '../../../components/notification.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { StatementHistoryService } from '../../../services/statement-history.service';
import { KeycloakService } from 'keycloak-angular';
import { TranslationService } from '../../../_helper/translation.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Direction } from '@angular/cdk/bidi';
import { StatementHistory } from '../../../models/statement-history.model';

@Component({
  selector: 'app-create-update-statement-history',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule,
    ReactiveFormsModule,TranslateModule, MatFormFieldModule, MatInputModule],
  templateUrl: './create-update-statement-history.component.html',
  styleUrl: './create-update-statement-history.component.scss'
})
export class CreateUpdateStatementHistoryComponent implements OnInit,AfterViewInit{

  statementHistory: StatementHistory = {};
  readOnly:boolean = false;
  @ViewChild('descriptionTextarea') descriptionTextarea: ElementRef | undefined;
  direction: Direction = 'rtl';
  data:any;
  statementHistoryForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private keycloakService: KeycloakService,
    private translationService: TranslationService,
    private statementHistoryService: StatementHistoryService,
    private notificationService: NotificationService,
    private router: Router) {
      this.direction = this.translationService.currentLangDirection();

      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state;
      this.data = state;
      this.statementHistory = this.data?.content || {}; 
      this.readOnly = this.data?.readOnly;
   
  }



  ngOnInit(): void {
    const isLoggedIn = this.keycloakService.isLoggedIn();
    if (!isLoggedIn)
      this.keycloakService.login();

    this.statementHistoryForm = this.fb.group({
      id: [this.statementHistory?.id || null],
      name: [this.statementHistory?.name || '', Validators.required],
      description: [this.statementHistory?.description || '']
    });
  }

  ngAfterViewInit(): void {
    if (this.descriptionTextarea) {
      const target = this.descriptionTextarea.nativeElement as HTMLTextAreaElement;
      target.style.height = "0px";
      target.style.height = (target.scrollHeight + 25) + "px";
    }
  }
  autoGrowTextZone(e: Event) {
    const target = (e as any)?.target as HTMLElement | undefined;
    if (target) {
      target.style.height = "0px";
      target.style.height = (target.scrollHeight + 25) + "px";
    }
  }
  onSubmit(): void {
    if (this.statementHistory?.id) {
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
        this.router.navigate(['/statement-history']);
        this.notificationService.success('StatementHistory added successfully');
      }, error => {
        // Handle add error
        console.error('Add failed:', error);
        this.notificationService.error('Create failed');

      });
    }
  }
}
