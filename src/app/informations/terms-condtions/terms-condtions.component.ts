// terms-conditions.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TermsSection {
  id: string;
  title: string;
  content: string[];
  lastUpdated?: string;
}

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms-condtions.component.html',

})
export class TermsConditionsComponent {
  lastUpdated = 'January 1, 2024';
  effectiveDate = 'January 1, 2024';
  
  // Table of Contents navigation
  activeSection = signal('introduction');

  // Terms sections data
  termsSections: TermsSection[] = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: [
        'Welcome to ShopHub ("we," "our," or "us"). These Terms and Conditions govern your use of our website, services, and applications (collectively, the "Services").',
        'By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of these Terms, you may not access our Services.',
        'These Terms apply to all visitors, users, and others who wish to access or use our Services.'
      ]
    },
    {
      id: 'definitions',
      title: 'Definitions',
      content: [
        '"Services" refers to the ShopHub website, mobile applications, and related services.',
        '"User," "you," or "your" refers to the individual accessing or using our Services.',
        '"Content" refers to text, images, videos, reviews, and other materials available through our Services.',
        '"Products" refers to goods and services offered for sale through our platform.',
        '"Seller" refers to individuals or businesses offering products through our Services.'
      ]
    },
    {
      id: 'account-registration',
      title: 'Account Registration',
      content: [
        'To access certain features of our Services, you must register for an account. You must provide accurate, complete, and current information during registration.',
        'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
        'You must be at least 18 years old to create an account and use our Services. By creating an account, you represent that you meet this age requirement.',
        'We reserve the right to suspend or terminate accounts that violate these Terms or are used for fraudulent activities.'
      ]
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      content: [
        'You agree to use our Services only for lawful purposes and in accordance with these Terms.',
        'You will not use our Services to:',
        '• Engage in any fraudulent, deceptive, or illegal activities',
        '• Infringe upon intellectual property rights',
        '• Harass, abuse, or harm other users',
        '• Distribute viruses or malicious code',
        '• Attempt to gain unauthorized access to our systems',
        'You are responsible for all content you post, upload, or share through our Services.'
      ]
    },
    {
      id: 'products-pricing',
      title: 'Products and Pricing',
      content: [
        'We strive to display accurate product information, including descriptions, images, and prices. However, we do not guarantee the accuracy of this information.',
        'Prices are subject to change without notice. The price charged at the time of purchase is the final price.',
        'Products are subject to availability. We reserve the right to limit quantities and discontinue products at any time.',
        'All taxes, fees, and shipping charges are additional and will be displayed during checkout.'
      ]
    },
    {
      id: 'payments',
      title: 'Payments and Billing',
      content: [
        'We accept various payment methods as indicated during checkout. By providing payment information, you represent that you are authorized to use the payment method.',
        'You agree to pay all charges incurred by your account, including applicable taxes and fees.',
        'In case of payment failure, we may suspend your access to paid services until payment is received.',
        'Refunds, when applicable, will be processed to the original payment method within 7-14 business days.'
      ]
    },
    {
      id: 'shipping-delivery',
      title: 'Shipping and Delivery',
      content: [
        'Shipping times are estimates and may vary based on product availability, destination, and carrier delays.',
        'Risk of loss and title for products pass to you upon delivery to the carrier.',
        'You are responsible for providing accurate shipping information. We are not liable for delays or non-delivery due to incorrect addresses.',
        'Some products may have shipping restrictions based on location, legal requirements, or product nature.'
      ]
    },
    {
      id: 'returns-refunds',
      title: 'Returns and Refunds',
      content: [
        'Our return policy is detailed separately and forms part of these Terms.',
        'Returns must be initiated within 30 days of delivery, unless otherwise specified.',
        'Products must be returned in original condition with all tags and packaging.',
        'Refund eligibility depends on the reason for return and product condition.',
        'Some products, such as personalized items or digital products, may not be eligible for returns.'
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      content: [
        'All content on our Services, including text, graphics, logos, and software, is our property or licensed to us and protected by intellectual property laws.',
        'You may not copy, modify, distribute, or create derivative works without our express written permission.',
        'User-generated content remains your property, but you grant us a license to use, display, and distribute it in connection with our Services.',
        'Trademarks and logos displayed on our Services are our property or licensed to us and may not be used without permission.'
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy and Data Protection',
      content: [
        'Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information.',
        'By using our Services, you consent to our collection and use of information as described in our Privacy Policy.',
        'We implement security measures to protect your data, but cannot guarantee absolute security.',
        'You may have rights regarding your personal data under applicable laws, as described in our Privacy Policy.'
      ]
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      content: [
        'To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages.',
        'Our total liability for any claims related to our Services shall not exceed the amount you paid us in the past six months.',
        'We are not liable for:',
        '• Third-party products or services',
        '• User-generated content',
        '• Internet or connectivity issues',
        '• Events beyond our reasonable control',
        'Some jurisdictions do not allow limitations of liability, so these limitations may not apply to you.'
      ]
    },
    {
      id: 'termination',
      title: 'Termination',
      content: [
        'We may suspend or terminate your access to our Services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users.',
        'You may terminate your account at any time by contacting us or through your account settings.',
        'Upon termination, your right to use our Services will immediately cease.',
        'Provisions that by their nature should survive termination shall survive, including intellectual property, limitations of liability, and indemnification.'
      ]
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      content: [
        'These Terms shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions.',
        'Any disputes arising from these Terms or your use of our Services shall be resolved in the courts of [Your City, State/Country].',
        'We make no representation that our Services are appropriate or available for use in all locations.'
      ]
    },
    {
      id: 'changes-terms',
      title: 'Changes to Terms',
      content: [
        'We reserve the right to modify these Terms at any time. We will notify you of significant changes through our Services or by email.',
        'Continued use of our Services after changes constitutes acceptance of the modified Terms.',
        'The "Last Updated" date at the top of this page indicates when these Terms were last revised.',
        'We encourage you to review these Terms periodically for any changes.'
      ]
    },
    {
      id: 'contact-info',
      title: 'Contact Information',
      content: [
        'If you have any questions about these Terms and Conditions, please contact us:',
        'Email: legal@shophub.com',
        'Address: 123 Commerce Street, Business City, BC 12345',
        'Phone: +1 (555) 123-4567',
        'We typically respond to legal inquiries within 3-5 business days.'
      ]
    }
  ];

  // Scroll to section
  scrollToSection(sectionId: string): void {
    this.activeSection.set(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Handle scroll to update active section
  onScroll(): void {
    const sections = this.termsSections;
    const scrollPosition = window.pageYOffset + 150;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i].id);
      if (section && section.offsetTop <= scrollPosition) {
        this.activeSection.set(sections[i].id);
        break;
      }
    }
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }
}