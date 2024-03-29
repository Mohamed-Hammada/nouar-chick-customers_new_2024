import { Component, EventEmitter, Output, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Direction } from '@angular/cdk/bidi';
import { TranslationService } from '../../_helper/translation.service';

@Component({
  selector: 'app-custome-search',
  standalone: true,
  imports: [MatIconModule,FormsModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule,TranslateModule],
  templateUrl: './custome-search.component.html',
  styleUrl: './custome-search.component.scss'
})
export class CustomeSearchComponent {
  @Output() term = new EventEmitter<string>();
  direction: Direction = 'rtl';
  searchWidth = computed(() => {
    // debugger
    const isSmallDevice = window.innerWidth <= 500; // Check for small devices
    return isSmallDevice ? 300 : 500;
  });

  constructor(private translationService: TranslationService) { 
    this.direction = this.translationService.currentLangDirection();
  }
  applyFilter(searchValue: string) {
    this.term.emit(searchValue);
  }

  
}
