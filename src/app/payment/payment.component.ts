import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  private cartService = inject(CartService);
  constructor(private fb: FormBuilder) {}
  paymentForm!: FormGroup;
  paymentMethod = signal<'card' | 'paypal'>('card');
  // Sample order data
  orderItems: OrderItem[] = this.cartService.productCart();

  // Price calculations
  subtotal = signal<number>(0);
  shipping = signal<number>(5.99);
  tax = signal<number>(0);
  totalAmount = signal<number>(0);

  ngOnInit() {
    this.initializeForm();
    this.calculateTotals();
  }

  initializeForm() {
    this.paymentForm = this.fb.group({
      // Personal Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\+?[\d\s-()]+$/)]],

      // Billing Address
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: [
        '',
        [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)],
      ],
      country: ['', [Validators.required]],

      // Payment Details
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: [
        '',
        [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],
      ],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      cardholderName: ['', [Validators.required]],

      // Additional Options
      saveCard: [false],
      billingSameAsShipping: [true],
      subscribeNewsletter: [true],

      // Terms
      acceptTerms: [false, [Validators.requiredTrue]],
    });
  }

  calculateTotals() {
    const subtotal = this.orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    this.subtotal.set(Number(subtotal.toFixed(2)));

    const tax = subtotal * 0.08; // 8% tax
    this.tax.set(Number(tax.toFixed(2)));

    const total = subtotal + this.shipping() + tax;
    this.totalAmount.set(Number(total.toFixed(2)));
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      console.log('Payment form submitted:', this.paymentForm.value);
      console.log('Payment method:', this.paymentMethod());

      // Here you would typically send the payment data to your backend
      // and handle the payment processing

      alert('Payment processed successfully!');
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.paymentForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Helper method to format card number
  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      event.target.value = parts.join(' ');
    } else {
      event.target.value = value;
    }
  }

  // Helper method to format expiry date
  formatExpiryDate(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    event.target.value = value;
  }
}
