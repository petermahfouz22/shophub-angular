// privacy-policy.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PolicySection {
  id: string;
  title: string;
  content: string[];
  subsections?: { title: string; content: string[] }[];
}

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent {
  lastUpdated = 'January 1, 2024';
  effectiveDate = 'January 1, 2024';
  
  // Table of Contents navigation
  activeSection = signal('introduction');

  // Policy sections data
  policySections: PolicySection[] = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: [
        'At ShopHub ("we," "our," or "us"), we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Services").',
        'Please read this Privacy Policy carefully. By accessing or using our Services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our Services.',
        'We reserve the right to make changes to this Privacy Policy at any time. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy.'
      ]
    },
    {
      id: 'information-collection',
      title: 'Information We Collect',
      content: [
        'We collect several types of information from and about users of our Services, including:'
      ],
      subsections: [
        {
          title: 'Personal Information',
          content: [
            '• Contact Information: Name, email address, phone number, shipping address',
            '• Account Information: Username, password, profile picture',
            '• Payment Information: Credit card details, billing address (processed securely by our payment processors)',
            '• Demographic Information: Age, gender, preferences (optional)'
          ]
        },
        {
          title: 'Automatically Collected Information',
          content: [
            '• Device Information: IP address, browser type, operating system, device type',
            '• Usage Data: Pages visited, time spent, click patterns, search queries',
            '• Location Data: General location based on IP address or precise location with your consent',
            '• Cookies and Tracking Technologies: See our Cookie Policy for details'
          ]
        },
        {
          title: 'Information from Third Parties',
          content: [
            '• Social media platforms when you connect your account',
            '• Payment processors for transaction verification',
            '• Analytics providers for service improvement',
            '• Marketing partners for personalized offers'
          ]
        }
      ]
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      content: [
        'We use the information we collect for various business purposes, including:'
      ],
      subsections: [
        {
          title: 'Service Delivery',
          content: [
            '• Process transactions and deliver products',
            '• Create and manage your account',
            '• Provide customer support',
            '• Send order confirmations and updates'
          ]
        },
        {
          title: 'Personalization',
          content: [
            '• Recommend products based on your preferences',
            '• Customize your shopping experience',
            '• Show relevant content and advertisements',
            '• Remember your preferences and settings'
          ]
        },
        {
          title: 'Communication',
          content: [
            '• Send promotional emails and newsletters (with your consent)',
            '• Respond to your inquiries and requests',
            '• Send important service announcements',
            '• Conduct surveys and gather feedback'
          ]
        },
        {
          title: 'Analytics and Improvement',
          content: [
            '• Analyze usage patterns and trends',
            '• Improve our Services and user experience',
            '• Develop new features and products',
            '• Monitor and prevent technical issues'
          ]
        },
        {
          title: 'Security and Legal',
          content: [
            '• Protect against fraud and unauthorized transactions',
            '• Enforce our Terms and Conditions',
            '• Comply with legal obligations',
            '• Protect our rights and property'
          ]
        }
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      content: [
        'We do not sell your personal information to third parties. We may share your information in the following circumstances:'
      ],
      subsections: [
        {
          title: 'Service Providers',
          content: [
            'We share information with trusted third-party service providers who assist us in operating our Services, such as:',
            '• Payment processors (Stripe, PayPal)',
            '• Shipping carriers (UPS, FedEx, DHL)',
            '• Cloud hosting providers',
            '• Customer support platforms',
            '• Marketing and analytics partners'
          ]
        },
        {
          title: 'Legal Requirements',
          content: [
            'We may disclose your information if required to do so by law or in response to:',
            '• Court orders or legal processes',
            '• Government requests',
            '• Enforcement of our agreements',
            '• Protection of rights and safety'
          ]
        },
        {
          title: 'Business Transfers',
          content: [
            'In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred to the new entity.',
            'We will notify you via email and/or prominent notice on our Services of any change in ownership or uses of your information.'
          ]
        },
        {
          title: 'With Your Consent',
          content: [
            'We may share your information with third parties when you have given us explicit consent to do so.',
            'You can withdraw your consent at any time by contacting us or adjusting your account settings.'
          ]
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: [
        'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
        'Our security measures include:'
      ],
      subsections: [
        {
          title: 'Encryption',
          content: [
            '• SSL/TLS encryption for data transmission',
            '• Encryption of sensitive data at rest',
            '• Secure payment processing through PCI-compliant providers'
          ]
        },
        {
          title: 'Access Controls',
          content: [
            '• Role-based access to personal information',
            '• Multi-factor authentication for administrative access',
            '• Regular security audits and assessments'
          ]
        },
        {
          title: 'Other Measures',
          content: [
            '• Regular security updates and patches',
            '• Firewall protection and intrusion detection',
            '• Employee security training',
            '• Incident response procedures'
          ]
        }
      ]
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      content: [
        'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.',
        'Our retention periods include:'
      ],
      subsections: [
        {
          title: 'Account Information',
          content: [
            '• Active accounts: Until account deletion request',
            '• Inactive accounts: 3 years of inactivity',
            '• Transaction records: 7 years for tax and legal purposes'
          ]
        },
        {
          title: 'Marketing Data',
          content: [
            '• Email subscribers: Until unsubscribe request',
            '• Cookie data: As specified in Cookie Policy',
            '• Analytics data: 26 months aggregated and anonymized'
          ]
        },
        {
          title: 'Other Data',
          content: [
            '• Customer support inquiries: 3 years after resolution',
            '• Legal documents: As required by applicable law',
            '• Backup data: 30 days before permanent deletion'
          ]
        }
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Rights and Choices',
      content: [
        'Depending on your location, you may have certain rights regarding your personal information:'
      ],
      subsections: [
        {
          title: 'Access and Portability',
          content: [
            '• Right to access your personal information',
            '• Right to receive your data in a portable format',
            '• Right to know about data processing activities'
          ]
        },
        {
          title: 'Correction and Deletion',
          content: [
            '• Right to correct inaccurate information',
            '• Right to delete your personal information ("right to be forgotten")',
            '• Right to restrict processing in certain circumstances'
          ]
        },
        {
          title: 'Objections and Controls',
          content: [
            '• Right to object to processing for direct marketing',
            '• Right to withdraw consent at any time',
            '• Right to lodge complaints with supervisory authorities'
          ]
        },
        {
          title: 'How to Exercise Your Rights',
          content: [
            'You can exercise these rights by:',
            '• Updating your account information in settings',
            '• Using our self-service tools',
            '• Contacting us at privacy@shophub.com',
            '• Using opt-out mechanisms in marketing communications'
          ]
        }
      ]
    },
    {
      id: 'cookies-tracking',
      title: 'Cookies and Tracking Technologies',
      content: [
        'We use cookies and similar tracking technologies to track activity on our Services and store certain information.',
        'Types of cookies we use:'
      ],
      subsections: [
        {
          title: 'Essential Cookies',
          content: [
            'Required for basic site functionality',
            'Enable security and authentication',
            'Cannot be disabled without affecting site operation'
          ]
        },
        {
          title: 'Performance Cookies',
          content: [
            'Help us understand how visitors interact with our Services',
            'Collect anonymous statistical data',
            'Can be disabled through browser settings'
          ]
        },
        {
          title: 'Functional Cookies',
          content: [
            'Remember your preferences and settings',
            'Enable personalized features',
            'Can be disabled through browser settings'
          ]
        },
        {
          title: 'Advertising Cookies',
          content: [
            'Used to deliver relevant advertisements',
            'Track campaign performance',
            'Can be managed through our cookie preferences tool'
          ]
        }
      ]
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      content: [
        'Your personal information may be transferred to, and processed in, countries other than the country in which you are resident. These countries may have data protection laws that are different from the laws of your country.',
        'We ensure appropriate safeguards are in place for international data transfers, including:',
        '• Standard contractual clauses approved by relevant authorities',
        '• Privacy Shield framework (where applicable)',
        '• Binding corporate rules',
        '• Other legally approved mechanisms'
      ]
    },
    {
      id: 'children-privacy',
      title: "Children's Privacy",
      content: [
        'Our Services are not intended for children under the age of 16. We do not knowingly collect personal information from children under 16.',
        'If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. If we become aware that we have collected personal information from children without verification of parental consent, we take steps to remove that information from our servers.'
      ]
    },
    {
      id: 'third-party-links',
      title: 'Third-Party Links',
      content: [
        'Our Services may contain links to third-party websites, applications, or services that are not operated by us. If you click on a third-party link, you will be directed to that third party\'s site.',
        'We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.'
      ]
    },
    {
      id: 'contact-us',
      title: 'Contact Us',
      content: [
        'If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:',
        'Email: privacy@shophub.com',
        'Address: 123 Commerce Street, Business City, BC 12345',
        'Phone: +1 (555) 123-4567',
        'Data Protection Officer: dpo@shophub.com',
        'We will respond to your inquiry within 30 days.'
      ]
    },
    {
      id: 'changes-policy',
      title: 'Changes to This Privacy Policy',
      content: [
        'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.',
        'We will also notify you via email and/or a prominent notice on our Services prior to the change becoming effective, if the changes are material.',
        'You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.'
      ]
    }
  ];

  // Scroll to section
  scrollToSection(sectionId: string): void {
    this.activeSection.set(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
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
    const sections = this.policySections;
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