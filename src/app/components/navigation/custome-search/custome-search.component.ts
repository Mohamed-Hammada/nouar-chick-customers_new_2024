import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-custome-search',
  standalone: true,
  imports: [MatIconModule,FormsModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './custome-search.component.html',
  styleUrl: './custome-search.component.scss'
})
export class CustomeSearchComponent {

  applyFilter(searchValue: string) {
  }
}
