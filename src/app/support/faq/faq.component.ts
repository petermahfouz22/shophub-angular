import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  isExpanded: boolean;
}
@Component({
  selector: 'app-faq',
  imports: [CommonModule, FormsModule],
  templateUrl: './faq.component.html',

})
export class FAQComponent {
  searchQuery = signal('');
  selectedCategory = signal('all');

  // FAQ data
  faqItems = signal<FAQItem[]>([
    {
      id: 1,
      question: 'How do I create an account on ShopHub?',
      answer:
        'Creating an account is simple! Click on the "Sign Up" button in the top navigation, fill in your details including email and password, and verify your email address. Once verified, you can start shopping immediately.',
      category: 'account',
      isExpanded: false,
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer:
        'We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for certain regions. All payments are securely processed.',
      category: 'payments',
      isExpanded: false,
    },
    {
      id: 3,
      question: 'How long does shipping take?',
      answer:
        'Shipping times vary based on your location and the shipping method chosen. Standard shipping typically takes 3-7 business days, express shipping takes 1-3 business days, and overnight shipping is available for most locations.',
      category: 'shipping',
      isExpanded: false,
    },
    {
      id: 4,
      question: 'Can I return or exchange products?',
      answer:
        'Yes, we offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some items like personalized products or intimate apparel may have different return policies.',
      category: 'returns',
      isExpanded: false,
    },
    {
      id: 5,
      question: 'How do I track my order?',
      answer:
        'Once your order ships, you will receive a tracking number via email. You can also log into your account and visit the "Order History" section to track your package in real-time.',
      category: 'shipping',
      isExpanded: false,
    },
    {
      id: 6,
      question: 'Do you ship internationally?',
      answer:
        'Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by destination. Customs fees and import duties are the responsibility of the customer.',
      category: 'shipping',
      isExpanded: false,
    },
    {
      id: 7,
      question: 'How can I reset my password?',
      answer:
        'Click on "Forgot Password" on the login page, enter your email address, and we will send you a password reset link. The link will expire in 24 hours for security reasons.',
      category: 'account',
      isExpanded: false,
    },
    {
      id: 8,
      question: 'Are my personal details secure?',
      answer:
        'Absolutely! We use industry-standard SSL encryption to protect your data. We never share your personal information with third parties without your consent. Read our Privacy Policy for more details.',
      category: 'security',
      isExpanded: false,
    },
    {
      id: 9,
      question: 'How do I contact customer support?',
      answer:
        'You can reach our support team through the Contact Us page, via email at support@shophub.com, or by calling our toll-free number. We typically respond within 24 hours.',
      category: 'support',
      isExpanded: false,
    },
    {
      id: 10,
      question: 'Can I cancel my order?',
      answer:
        'Orders can be cancelled within 1 hour of placement. After that, orders enter the processing stage and cannot be cancelled. You can still return items once received following our return policy.',
      category: 'orders',
      isExpanded: false,
    },
    {
      id: 11,
      question: 'Do you offer student discounts?',
      answer:
        'Yes, we offer a 15% student discount for verified students. Sign up with your student email or verify through our student verification partner to access this discount.',
      category: 'discounts',
      isExpanded: false,
    },
    {
      id: 12,
      question: 'How do I use promo codes?',
      answer:
        'Enter your promo code during checkout in the "Promo Code" field. The discount will be applied immediately if the code is valid. Some codes may have restrictions or expiration dates.',
      category: 'discounts',
      isExpanded: false,
    },
  ]);

  // Categories
  categories = signal([
    { id: 'all', name: 'All Questions', count: this.faqItems().length },
    {
      id: 'account',
      name: 'Account',
      count: this.faqItems().filter((item) => item.category === 'account')
        .length,
    },
    {
      id: 'payments',
      name: 'Payments',
      count: this.faqItems().filter((item) => item.category === 'payments')
        .length,
    },
    {
      id: 'shipping',
      name: 'Shipping',
      count: this.faqItems().filter((item) => item.category === 'shipping')
        .length,
    },
    {
      id: 'returns',
      name: 'Returns',
      count: this.faqItems().filter((item) => item.category === 'returns')
        .length,
    },
    {
      id: 'orders',
      name: 'Orders',
      count: this.faqItems().filter((item) => item.category === 'orders')
        .length,
    },
    {
      id: 'security',
      name: 'Security',
      count: this.faqItems().filter((item) => item.category === 'security')
        .length,
    },
    {
      id: 'support',
      name: 'Support',
      count: this.faqItems().filter((item) => item.category === 'support')
        .length,
    },
    {
      id: 'discounts',
      name: 'Discounts',
      count: this.faqItems().filter((item) => item.category === 'discounts')
        .length,
    },
  ]);

  // Filtered FAQ items based on search and category
  filteredFaqItems = computed(() => {
    let items = this.faqItems();

    // Filter by category
    if (this.selectedCategory() !== 'all') {
      items = items.filter((item) => item.category === this.selectedCategory());
    }

    // Filter by search query
    if (this.searchQuery().trim()) {
      const query = this.searchQuery().toLowerCase();
      items = items.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      );
    }

    return items;
  });

  // Get category name by ID
  getCategoryName(categoryId: string): string {
    const category = this.categories().find((cat) => cat.id === categoryId);
    return category ? category.name : 'General';
  }

  // Toggle FAQ item expansion
  toggleFaqItem(item: FAQItem): void {
    // Close all other items when opening one (optional)
    // this.faqItems().forEach(faq => {
    //   if (faq.id !== item.id) {
    //     faq.isExpanded = false;
    //   }
    // });

    item.isExpanded = !item.isExpanded;
  }

  // Expand all FAQ items
  expandAll(): void {
    this.faqItems().forEach((item) => (item.isExpanded = true));
  }

  // Collapse all FAQ items
  collapseAll(): void {
    this.faqItems().forEach((item) => (item.isExpanded = false));
  }

  // Select category
  selectCategory(categoryId: string): void {
    this.selectedCategory.set(categoryId);
  }

  // Clear search
  clearSearch(): void {
    this.searchQuery.set('');
  }

  // Check if no results found
  noResultsFound = computed(() => {
    return (
      this.searchQuery().trim() !== '' && this.filteredFaqItems().length === 0
    );
  });
}
