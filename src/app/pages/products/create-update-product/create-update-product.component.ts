import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Product, ProductService } from '../product.service';
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

@Component({
  selector: 'app-create-update-product',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './create-update-product.component.html',
  styleUrl: './create-update-product.component.scss'
})
export class CreateUpdateProductComponent implements OnInit,AfterViewInit  {

  product: Product = {};
  @ViewChild('descriptionTextarea') descriptionTextarea: ElementRef | undefined;


  productForm!: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService,
    private productService: ProductService,
    private notificationService: NotificationService,
    private router: Router) {
    if (this.dataService.data)
      this.product = this.dataService.data;
  }
  ngAfterViewInit(): void {
    if (this.descriptionTextarea) {
      const target = this.descriptionTextarea.nativeElement as HTMLTextAreaElement;
      target.style.height = "0px";
      target.style.height = (target.scrollHeight + 25) + "px";
    }
  }


  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [this.product.id || null],
      name: [this.product.name || '', Validators.required],
      description: [this.product.description || '']
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
    if (this.product.id) {
      // Update existing product
      const updatedProduct: Product = { ...this.product, ...this.productForm.value };
      this.productService.updateProduct(updatedProduct).subscribe(response => {
        // Handle update success
        this.notificationService.success('Product updated successfully');
      }, error => {
        // Handle update error
        console.error('Update failed:', error);
        this.notificationService.error('Update failed');
      });
    } else {
      // Add new product
      const newProduct: Product = this.productForm.value;
      this.productService.createProduct(newProduct).subscribe(response => {
        // Handle add success
        this.router.navigate(['/products']);
        this.notificationService.success('Product added successfully');
      }, error => {
        // Handle add error
        console.error('Add failed:', error);
      });
    }
  }

}
