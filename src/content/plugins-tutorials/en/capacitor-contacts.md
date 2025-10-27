---
locale: en
---

# Using @capgo/capacitor-contacts Package

The `@capgo/capacitor-contacts` package provides comprehensive access to device contacts, allowing you to read, search, create, update, and delete contacts from the user's address book. This tutorial will guide you through installation, permissions, and practical implementation patterns.

## Installation

Install the package using your preferred package manager:

```bash
npm install @capgo/capacitor-contacts
npx cap sync
```

## Platform Configuration

### iOS

Add the following to your `Info.plist`:

```xml
<key>NSContactsUsageDescription</key>
<string>This app needs access to contacts to let you select and manage recipients</string>
```

### Android

Add permissions to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.READ_CONTACTS" />
<uses-permission android:name="android.permission.WRITE_CONTACTS" />
```

## Platform Support

- **iOS**: Full support with Privacy manifest compliance
- **Android**: Full support (API 21+)
- **Web**: Not supported (no browser API for contacts)

## Basic Usage

### Importing the Plugin

```typescript
import { Contacts } from '@capgo/capacitor-contacts';
```

### Checking Permissions

Always check permissions before accessing contacts:

```typescript
async function checkContactsPermission() {
  const permission = await Contacts.checkPermissions();
  console.log('Contacts permission:', permission.contacts);
  // Returns: 'granted', 'denied', 'prompt', or 'prompt-with-rationale'

  return permission.contacts === 'granted';
}
```

### Requesting Permissions

```typescript
async function requestContactsPermission() {
  const permission = await Contacts.requestPermissions();

  if (permission.contacts === 'granted') {
    console.log('Permission granted');
    return true;
  } else {
    console.log('Permission denied');
    return false;
  }
}
```

### Getting All Contacts

```typescript
async function getAllContacts() {
  const hasPermission = await checkContactsPermission() ||
                        await requestContactsPermission();

  if (!hasPermission) {
    throw new Error('Contacts permission denied');
  }

  const result = await Contacts.getContacts({
    projection: {
      name: true,
      phones: true,
      emails: true,
      image: true
    }
  });

  console.log('Total contacts:', result.contacts.length);
  return result.contacts;
}
```

### Searching Contacts

```typescript
async function searchContacts(query: string) {
  if (!query || query.length < 2) {
    return [];
  }

  const result = await Contacts.getContacts({
    projection: {
      name: true,
      phones: true,
      emails: true
    },
    query: query
  });

  console.log('Found', result.contacts.length, 'contacts');
  return result.contacts;
}
```

### Getting Contact by ID

```typescript
async function getContactById(contactId: string) {
  const result = await Contacts.getContacts({
    projection: {
      name: true,
      phones: true,
      emails: true,
      image: true,
      organization: true,
      birthday: true,
      urls: true,
      postalAddresses: true
    },
    contactId: contactId
  });

  return result.contacts.length > 0 ? result.contacts[0] : null;
}
```

### Creating a Contact

```typescript
async function createNewContact() {
  const newContact = {
    name: {
      given: 'John',
      family: 'Doe',
      middle: 'William'
    },
    phones: [
      { type: 'mobile', number: '+1 (555) 123-4567' },
      { type: 'home', number: '+1 (555) 987-6543' }
    ],
    emails: [
      { type: 'work', address: 'john.doe@company.com' },
      { type: 'personal', address: 'john@example.com' }
    ],
    organization: {
      company: 'Acme Corp',
      jobTitle: 'Software Engineer'
    }
  };

  const result = await Contacts.createContact(newContact);
  console.log('Contact created with ID:', result.contactId);
  return result.contactId;
}
```

### Updating a Contact

```typescript
async function updateExistingContact(contactId: string) {
  await Contacts.updateContact({
    contactId: contactId,
    name: {
      given: 'Jane',
      family: 'Smith'
    },
    phones: [
      { type: 'mobile', number: '+1 (555) 234-5678' }
    ]
  });

  console.log('Contact updated');
}
```

### Deleting a Contact

```typescript
async function deleteContact(contactId: string) {
  await Contacts.deleteContact({
    contactId: contactId
  });

  console.log('Contact deleted');
}
```

## Complete Contacts Service

Here's a comprehensive service for managing contacts:

```typescript
import { Contacts } from '@capgo/capacitor-contacts';

export interface Contact {
  contactId: string;
  name: {
    display?: string;
    given?: string;
    middle?: string;
    family?: string;
    prefix?: string;
    suffix?: string;
  };
  phones?: Array<{
    type: string;
    number: string;
  }>;
  emails?: Array<{
    type: string;
    address: string;
  }>;
  image?: {
    base64String: string;
  };
  organization?: {
    company?: string;
    jobTitle?: string;
    department?: string;
  };
  birthday?: {
    day?: number;
    month?: number;
    year?: number;
  };
  postalAddresses?: Array<{
    type: string;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }>;
  urls?: Array<{
    type: string;
    url: string;
  }>;
  note?: string;
}

export class ContactsService {
  private hasPermission = false;

  async initialize(): Promise<boolean> {
    const permission = await Contacts.checkPermissions();

    if (permission.contacts === 'granted') {
      this.hasPermission = true;
      return true;
    }

    const requested = await Contacts.requestPermissions();
    this.hasPermission = requested.contacts === 'granted';

    return this.hasPermission;
  }

  private async ensurePermission(): Promise<void> {
    if (!this.hasPermission) {
      const granted = await this.initialize();
      if (!granted) {
        throw new Error('Contacts permission denied');
      }
    }
  }

  async getAllContacts(): Promise<Contact[]> {
    await this.ensurePermission();

    const result = await Contacts.getContacts({
      projection: {
        name: true,
        phones: true,
        emails: true,
        image: true
      }
    });

    return result.contacts;
  }

  async searchContacts(query: string): Promise<Contact[]> {
    await this.ensurePermission();

    if (!query || query.length < 2) {
      return [];
    }

    const result = await Contacts.getContacts({
      projection: {
        name: true,
        phones: true,
        emails: true
      },
      query: query
    });

    return result.contacts;
  }

  async getContact(contactId: string): Promise<Contact | null> {
    await this.ensurePermission();

    const result = await Contacts.getContacts({
      projection: {
        name: true,
        phones: true,
        emails: true,
        image: true,
        organization: true,
        birthday: true,
        note: true,
        urls: true,
        postalAddresses: true
      },
      contactId: contactId
    });

    return result.contacts.length > 0 ? result.contacts[0] : null;
  }

  async createContact(contact: Partial<Contact>): Promise<string> {
    await this.ensurePermission();

    const result = await Contacts.createContact(contact);
    return result.contactId;
  }

  async updateContact(contactId: string, updates: Partial<Contact>): Promise<void> {
    await this.ensurePermission();

    await Contacts.updateContact({
      contactId,
      ...updates
    });
  }

  async deleteContact(contactId: string): Promise<void> {
    await this.ensurePermission();

    await Contacts.deleteContact({ contactId });
  }

  // Utility methods

  getDisplayName(contact: Contact): string {
    if (contact.name?.display) {
      return contact.name.display;
    }

    const parts = [
      contact.name?.given,
      contact.name?.middle,
      contact.name?.family
    ].filter(Boolean);

    return parts.join(' ') || 'Unnamed Contact';
  }

  getInitials(contact: Contact): string {
    const name = this.getDisplayName(contact);
    const parts = name.split(' ').filter(Boolean);

    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }

    return name.slice(0, 2).toUpperCase();
  }

  getPrimaryPhone(contact: Contact): string | null {
    if (!contact.phones || contact.phones.length === 0) {
      return null;
    }

    // Prefer mobile, then any phone
    const mobile = contact.phones.find(p => p.type === 'mobile');
    return mobile ? mobile.number : contact.phones[0].number;
  }

  getPrimaryEmail(contact: Contact): string | null {
    if (!contact.emails || contact.emails.length === 0) {
      return null;
    }

    return contact.emails[0].address;
  }

  formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    if (cleaned.length === 11 && cleaned[0] === '1') {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }

    return phone;
  }

  sortContactsByName(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      const nameA = this.getDisplayName(a).toLowerCase();
      const nameB = this.getDisplayName(b).toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }

  groupContactsByInitial(contacts: Contact[]): Map<string, Contact[]> {
    const grouped = new Map<string, Contact[]>();

    contacts.forEach(contact => {
      const initial = this.getDisplayName(contact)[0].toUpperCase();
      const group = grouped.get(initial) || [];
      group.push(contact);
      grouped.set(initial, group);
    });

    return grouped;
  }
}
```

## Contact Picker Implementation

Implement a native-style contact picker:

```typescript
class ContactPicker {
  private service: ContactsService;

  constructor() {
    this.service = new ContactsService();
  }

  async pickContact(): Promise<Contact | null> {
    try {
      // Use native picker if available
      const result = await Contacts.pickContact({
        projection: {
          name: true,
          phones: true,
          emails: true,
          image: true
        }
      });

      return result.contacts.length > 0 ? result.contacts[0] : null;
    } catch (error) {
      console.error('Contact picker cancelled or failed:', error);
      return null;
    }
  }

  async pickMultipleContacts(): Promise<Contact[]> {
    try {
      const result = await Contacts.pickContact({
        projection: {
          name: true,
          phones: true,
          emails: true
        },
        multiple: true
      });

      return result.contacts;
    } catch (error) {
      console.error('Contact picker cancelled:', error);
      return [];
    }
  }

  async pickContactForCall(): Promise<string | null> {
    const contact = await this.pickContact();

    if (!contact) {
      return null;
    }

    const phone = this.service.getPrimaryPhone(contact);

    if (!phone) {
      alert('Selected contact has no phone number');
      return null;
    }

    return phone;
  }

  async pickContactForEmail(): Promise<string | null> {
    const contact = await this.pickContact();

    if (!contact) {
      return null;
    }

    const email = this.service.getPrimaryEmail(contact);

    if (!email) {
      alert('Selected contact has no email address');
      return null;
    }

    return email;
  }
}

// Usage
const picker = new ContactPicker();

// Pick single contact
const contact = await picker.pickContact();
if (contact) {
  console.log('Selected:', service.getDisplayName(contact));
}

// Pick contact for calling
const phone = await picker.pickContactForCall();
if (phone) {
  window.location.href = `tel:${phone}`;
}
```

## Contact List UI Component

```typescript
class ContactListUI {
  private service: ContactsService;
  private contacts: Contact[] = [];

  constructor() {
    this.service = new ContactsService();
  }

  async initialize() {
    const initialized = await this.service.initialize();

    if (!initialized) {
      this.showPermissionDenied();
      return;
    }

    await this.loadContacts();
    this.render();
  }

  async loadContacts() {
    try {
      this.contacts = await this.service.getAllContacts();
      this.contacts = this.service.sortContactsByName(this.contacts);
      console.log('Loaded', this.contacts.length, 'contacts');
    } catch (error) {
      console.error('Failed to load contacts:', error);
    }
  }

  async searchContacts(query: string) {
    if (!query) {
      await this.loadContacts();
    } else {
      this.contacts = await this.service.searchContacts(query);
    }

    this.render();
  }

  render() {
    const container = document.getElementById('contacts-list');
    if (!container) return;

    container.innerHTML = '';

    const grouped = this.service.groupContactsByInitial(this.contacts);

    grouped.forEach((contacts, initial) => {
      // Section header
      const header = document.createElement('div');
      header.className = 'section-header';
      header.textContent = initial;
      container.appendChild(header);

      // Contact items
      contacts.forEach(contact => {
        const item = this.createContactItem(contact);
        container.appendChild(item);
      });
    });
  }

  private createContactItem(contact: Contact): HTMLElement {
    const item = document.createElement('div');
    item.className = 'contact-item';
    item.onclick = () => this.onContactClick(contact);

    const avatar = document.createElement('div');
    avatar.className = 'contact-avatar';

    if (contact.image?.base64String) {
      avatar.style.backgroundImage = `url(data:image/.png;base64,${contact.image.base64String})`;
    } else {
      avatar.textContent = this.service.getInitials(contact);
    }

    const info = document.createElement('div');
    info.className = 'contact-info';

    const name = document.createElement('div');
    name.className = 'contact-name';
    name.textContent = this.service.getDisplayName(contact);

    const details = document.createElement('div');
    details.className = 'contact-details';

    const phone = this.service.getPrimaryPhone(contact);
    if (phone) {
      details.textContent = this.service.formatPhoneNumber(phone);
    }

    info.appendChild(name);
    info.appendChild(details);

    item.appendChild(avatar);
    item.appendChild(info);

    return item;
  }

  private onContactClick(contact: Contact) {
    console.log('Contact clicked:', contact);
    this.showContactDetails(contact);
  }

  private async showContactDetails(contact: Contact) {
    // Load full contact details
    const fullContact = await this.service.getContact(contact.contactId);

    if (!fullContact) {
      alert('Failed to load contact details');
      return;
    }

    console.log('Full contact:', fullContact);
    // Show detail view
  }

  private showPermissionDenied() {
    const container = document.getElementById('contacts-list');
    if (container) {
      container.innerHTML = `
        <div class="permission-denied">
          <h3>Permission Required</h3>
          <p>This app needs access to your contacts.</p>
          <button onclick="window.location.reload()">Grant Permission</button>
        </div>
      `;
    }
  }
}

// Initialize
const contactsUI = new ContactListUI();
contactsUI.initialize();
```

## Understanding Projection

The `projection` parameter controls which fields to fetch. Only request what you need for better performance:

```typescript
// Minimal projection for list view
const listProjection = {
  name: true,
  phones: true
};

// Complete projection for detail view
const detailProjection = {
  name: true,
  phones: true,
  emails: true,
  image: true,
  organization: true,
  birthday: true,
  note: true,
  urls: true,
  postalAddresses: true
};

// Search projection
const searchProjection = {
  name: true,
  phones: true,
  emails: true
};
```

## Best Practices

1. **Request Minimal Data**: Use projection to request only needed fields
2. **Handle Permissions Gracefully**: Explain why you need access
3. **Cache Wisely**: Contacts can change, don't cache too long
4. **Batch Operations**: Load contacts in batches for large lists
5. **Privacy First**: Be transparent about contact usage
6. **Respect Denials**: Provide fallback functionality
7. **Test Thoroughly**: Test with various contact formats

## Common Issues

### Permission Denied

```typescript
async function handlePermissionDenied() {
  const permission = await Contacts.checkPermissions();

  if (permission.contacts === 'denied') {
    alert(
      'Contacts access is required. Please enable it in Settings:\n\n' +
      'iOS: Settings > [App] > Contacts\n' +
      'Android: Settings > Apps > [App] > Permissions'
    );
  }
}
```

### Large Contact Lists

```typescript
async function loadContactsInBatches() {
  const batchSize = 100;
  let allContacts: Contact[] = [];

  // Load with minimal projection
  const result = await Contacts.getContacts({
    projection: { name: true, phones: true }
  });

  // Process in batches
  for (let i = 0; i < result.contacts.length; i += batchSize) {
    const batch = result.contacts.slice(i, i + batchSize);
    await processBatch(batch);
  }
}
```

### Missing Fields

```typescript
function safeGetPhone(contact: Contact): string {
  if (!contact.phones || contact.phones.length === 0) {
    return 'No phone number';
  }

  return service.formatPhoneNumber(contact.phones[0].number);
}
```

## Conclusion

The `@capgo/capacitor-contacts` plugin provides comprehensive contact management capabilities for iOS and Android platforms. By properly implementing permission handling and using projection wisely, you can create efficient contact-based features while respecting user privacy.

For more information, visit the [official documentation](https://capgo.app/docs/plugins/contacts/) or check the [GitHub repository](https://github.com/Cap-go/capacitor-contacts).
