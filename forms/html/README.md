# EA Demand Management - HTML Forms System

Interactive web-based intake forms with intelligent tier classification and routing.

## Overview

This directory contains a complete HTML/CSS/JavaScript implementation of the EA Demand Management intake forms, featuring:

- **Intelligent Landing Page** with tier classification logic
- **Tiered Forms** (Enhancement, Tier 3, Tier 2, Tier 1)
- **Auto-save functionality** to prevent data loss
- **Client-side validation** for better UX
- **Responsive design** for desktop, tablet, and mobile
- **Professional styling** aligned with enterprise standards

## File Structure

```
html/
├── index.html              # Landing page with tier selection
├── enhancement-form.html   # Enhancement intake form (<$50k)
├── tier3-form.html         # Tier 3 project form ($50k-$2M)
├── tier2-form.html         # Tier 2 strategic form (>$500k or high complexity)
├── tier1-form.html         # Tier 1 program information page (transformational)
├── styles.css              # Shared stylesheet
├── scripts.js              # Shared JavaScript utilities
└── README.md               # This file
```

## Getting Started

### Quick Start

1. **Open the landing page:**
   ```
   Open index.html in your web browser
   ```

2. **Navigate the classification process:**
   - Answer questions about request type, investment size, and complexity
   - System automatically recommends the appropriate form
   - Click "Proceed to Form" to start your intake

3. **Complete and submit:**
   - Fill out the form (auto-saves as you type)
   - Click "Submit" when complete
   - Receive confirmation and next steps

### For Development/Testing

To run locally without a web server:
```bash
# Navigate to the html directory
cd forms/html

# Open in browser (example using Python's built-in server)
python3 -m http.server 8000

# Or simply double-click index.html to open in default browser
```

## Features

### 1. Intelligent Tier Classification

The landing page (`index.html`) guides users through questions to determine the appropriate intake form:

**Classification Matrix:**
| Investment  | Low Complexity | Medium Complexity | High Complexity |
|-------------|----------------|-------------------|-----------------|
| <$50k       | Enhancement    | Enhancement       | Enhancement*    |
| $50k-$500k  | Tier 3         | Tier 3            | Tier 2          |
| $500k-$2M   | Tier 3         | Tier 2            | Tier 1          |
| >$2M        | Tier 2         | Tier 1            | Tier 1          |

*May be re-tiered during screening

### 2. Auto-Save & Draft Management

All forms automatically save progress to browser localStorage:
- Saves every second while typing (debounced)
- Restores data when returning to the page
- "Save Draft" button for manual saves
- Data persists until form submission
- Warning when navigating away with unsaved changes

### 3. Form Validation

Client-side validation includes:
- Required field checks
- Email format validation
- Phone number validation
- Date validation (future dates, date ranges)
- Value category requirements (tier-specific)
- Custom business rule validation

### 4. Progressive Disclosure

Forms use smart show/hide logic:
- Value category details appear only when selected
- Follow-up questions appear based on previous answers
- Complexity guides expand on demand
- Help text and tooltips provide contextual assistance

### 5. Responsive Design

Forms adapt to all screen sizes:
- Desktop: Multi-column layouts, side-by-side fields
- Tablet: Optimized two-column layout
- Mobile: Single-column stacked layout, touch-friendly controls

## Form Details

### Enhancement Form (`enhancement-form.html`)

**Purpose:** Quick enhancements <$50k with low-medium complexity

**Sections:**
1. Requester Information
2. Enhancement Details
3. Value Demonstration (at least 1 category required)
4. Cost and Timeline
5. Technical Considerations
6. Supporting Documentation

**Completion Time:** ~5 minutes
**Target Cycle:** 3 business days

---

### Tier 3 Form (`tier3-form.html`)

**Purpose:** Projects $50k-$2M with appropriate complexity

**Sections:**
1. Requester Information
2. Business Sponsor
3. Project Overview
4. Business Need (high-level)
5. Proposed Approach (high-level)
6. Expected Value (at least 2 categories required)
7. Supporting Information

**Completion Time:** ~5-10 minutes
**Process:** Lightweight intake → EA-facilitated interview → Business case development
**Target Cycle:** 7-12 days

---

### Tier 2 Form (`tier2-form.html`)

**Purpose:** Strategic investments >$500k or high complexity

**Key Features:**
- Executive sponsor requirement
- Multiple strategic objective alignment
- Higher value thresholds (3+ categories, NPV >$250k, IRR >12%)
- Regulatory vs. strategic choice classification
- Organizational readiness assessment

**Completion Time:** ~10-15 minutes
**Process:** Strategic intake → Interview with executive sponsor → Formal business case → Architecture Board → TAC
**Target Cycle:** 14-21 days

---

### Tier 1 Page (`tier1-form.html`)

**Purpose:** Transformational programs (typically $5M+, high complexity)

**Note:** This is an **information page**, not a web form. Tier 1 uses a downloadable Program Brief template.

**Content:**
- Tier 1 characteristics and requirements
- Value thresholds (NPV >$5M, IRR >15%, all 5 value categories)
- Six-gate governance process
- Instructions for downloading templates
- Guidance for working with Strategic Planning Office
- Examples of Tier 1 programs

**Submission Method:** Email completed 10-page Program Brief to tier1-intake@company.com

---

## Technical Implementation

### JavaScript Utilities (`scripts.js`)

**Form State Management:**
- `saveFormData(formId)` - Save to localStorage
- `loadFormData(formId)` - Restore from localStorage
- `clearFormData(formId)` - Remove saved data
- `enableAutoSave(formId)` - Enable auto-save on input

**Validation:**
- `validateRequiredFields(formId)` - Check all required fields
- `validateEmail(email)` - Email format validation
- `validatePhone(phone)` - Phone format validation
- `validateNumeric(value)` - Numeric input validation

**UI Utilities:**
- `showNotification(message, type)` - Display toast notifications
- `showLoadingOverlay(message)` - Show loading spinner
- `toggleValueCategory(checkboxId, detailsId)` - Show/hide value category details
- `handleFileUpload(inputId, displayId)` - Display selected files

**Form Submission:**
- `submitForm(formId, event)` - Handle form submission
- `saveDraft(formId)` - Manual draft save
- `showConfirmationPage(data)` - Display success message

### CSS Styling (`styles.css`)

**Design System:**
- CSS custom properties for colors, shadows, spacing
- Consistent component library (buttons, forms, cards, alerts)
- Responsive breakpoints for mobile/tablet/desktop
- Accessibility features (focus states, sr-only classes)
- Print styles for form printing

**Components:**
- Header/Footer
- Cards and sections
- Form controls (inputs, selects, checkboxes, radios)
- Buttons and button groups
- Alerts and help boxes
- Progress indicators
- Tier badges and classification matrix
- Value category containers
- File upload areas
- Loading overlays and notifications

## Customization

### Branding

Update CSS variables in `styles.css`:

```css
:root {
    --primary-color: #0066cc;      /* Your brand primary */
    --primary-dark: #004c99;       /* Darker shade */
    --secondary-color: #6c757d;    /* Secondary color */
    /* ... */
}
```

### Form Fields

To add/modify form fields:

1. Add HTML markup in the appropriate form file
2. Update JavaScript validation if needed
3. Update form submission handler in `scripts.js`

### Backend Integration

Replace the simulated submission in `scripts.js`:

```javascript
function submitForm(formId, event) {
    if (event) event.preventDefault();

    if (!validateRequiredFields(formId)) {
        showNotification('Please fill in all required fields', 'error');
        return false;
    }

    const form = document.getElementById(formId);
    const formData = new FormData(form);

    showLoadingOverlay('Submitting your request...');

    // Replace this with actual API call
    fetch('/api/demand-intake', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        hideLoadingOverlay();
        clearFormData(formId);
        showConfirmationPage(data);
    })
    .catch(error => {
        hideLoadingOverlay();
        showNotification('Submission failed. Please try again.', 'error');
    });

    return false;
}
```

### ServiceNow Integration

For ServiceNow integration:

1. **GlideRecord API:** Create demand records using ServiceNow REST API
2. **Attachment Handling:** Upload files using Attachment API
3. **Workflow Triggers:** Auto-route based on tier classification
4. **Status Updates:** Integrate with ServiceNow notifications

Example ServiceNow REST call:
```javascript
fetch('https://instance.service-now.com/api/now/table/u_demand_intake', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('username:password')
    },
    body: JSON.stringify({
        u_tier: selectedTier,
        u_title: formData.projectTitle,
        u_requester: formData.requesterEmail,
        // ... map all form fields
    })
});
```

## Browser Support

Tested and supported browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required features:**
- JavaScript enabled
- LocalStorage support
- CSS Grid and Flexbox
- HTML5 form validation

## Accessibility

Forms meet WCAG 2.1 Level AA standards:
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states
- Screen reader friendly
- Color contrast compliance
- Responsive text sizing

## Security Considerations

**Client-Side:**
- Input sanitization for XSS prevention
- No sensitive data in localStorage
- HTTPS required for production
- File upload type restrictions

**Server-Side (implement these):**
- Authentication and authorization
- CSRF protection
- Input validation
- SQL injection prevention
- File upload scanning
- Rate limiting
- Audit logging

## Deployment

### Production Deployment

1. **Build Process:**
   ```bash
   # Minify CSS
   npx clean-css-cli -o styles.min.css styles.css

   # Minify JavaScript
   npx terser scripts.js -o scripts.min.js

   # Update references in HTML files
   ```

2. **Hosting Options:**
   - SharePoint Online (embed as web parts)
   - Internal web server (IIS, Apache, Nginx)
   - Integrated into ServiceNow portal
   - Cloud hosting (Azure, AWS S3 + CloudFront)

3. **Configuration:**
   - Update email addresses (ea-intake@company.com, etc.)
   - Update phone numbers
   - Configure API endpoints
   - Set up authentication/SSO
   - Enable logging and analytics

### SharePoint Integration

To embed in SharePoint:

1. Upload files to SharePoint document library
2. Create SharePoint pages for each form
3. Add "Embed" web part with iframe:
   ```html
   <iframe src="/sites/ea/forms/index.html"
           width="100%" height="1200px"
           frameborder="0"></iframe>
   ```

## Troubleshooting

### Form data not saving

**Issue:** Auto-save not working
**Solution:** Check browser localStorage is enabled and not full

### Validation not triggering

**Issue:** Required fields not validated
**Solution:** Ensure `required` attribute present and JavaScript loaded

### Form not submitting

**Issue:** Submit button not responding
**Solution:** Check browser console for JavaScript errors

### Styling issues

**Issue:** Forms look broken
**Solution:** Verify `styles.css` is loaded correctly

## Future Enhancements

Potential improvements:
- [ ] Multi-page forms with progress indicator
- [ ] Inline file preview for attachments
- [ ] Auto-populate from AD/LDAP for user info
- [ ] Rich text editor for long-form fields
- [ ] Cost calculator with formulas
- [ ] ROI calculator integration
- [ ] Document collaboration (comments/reviews)
- [ ] Mobile app version
- [ ] Offline support with sync
- [ ] Analytics dashboard for submissions

## Support

**For form issues:**
- Email: ea-intake@company.com
- Phone: (XXX) XXX-XXXX

**For technical issues:**
- IT Service Desk
- Developer documentation: [Link]

## License

Internal use only - Enterprise Architecture Team

---

**Version:** 1.0
**Last Updated:** January 2026
**Maintained by:** Enterprise Architecture Team
