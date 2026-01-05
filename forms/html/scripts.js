/**
 * EA Demand Management Portal - Shared JavaScript Utilities
 * Version: 1.0
 */

// ===================================
// Form State Management
// ===================================

/**
 * Save form data to localStorage
 */
function saveFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            // Handle multiple values (checkboxes)
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }

    localStorage.setItem(`formData_${formId}`, JSON.stringify(data));
    console.log('Form data saved:', formId);
}

/**
 * Load form data from localStorage
 */
function loadFormData(formId) {
    const savedData = localStorage.getItem(`formData_${formId}`);
    if (!savedData) return;

    const data = JSON.parse(savedData);
    const form = document.getElementById(formId);
    if (!form) return;

    for (let [key, value] of Object.entries(data)) {
        const elements = form.elements[key];
        if (!elements) continue;

        if (elements.type === 'radio' || elements.type === 'checkbox') {
            // Handle radio buttons and checkboxes
            if (Array.isArray(value)) {
                value.forEach(v => {
                    const el = form.querySelector(`[name="${key}"][value="${v}"]`);
                    if (el) el.checked = true;
                });
            } else {
                const el = form.querySelector(`[name="${key}"][value="${value}"]`);
                if (el) el.checked = true;
            }
        } else if (elements.length) {
            // Handle checkbox groups
            if (Array.isArray(value)) {
                value.forEach(v => {
                    Array.from(elements).forEach(el => {
                        if (el.value === v) el.checked = true;
                    });
                });
            }
        } else {
            // Handle text inputs, textareas, selects
            elements.value = value;
        }
    }

    console.log('Form data loaded:', formId);
}

/**
 * Clear form data from localStorage
 */
function clearFormData(formId) {
    localStorage.removeItem(`formData_${formId}`);
    console.log('Form data cleared:', formId);
}

/**
 * Auto-save form data on input
 */
function enableAutoSave(formId, debounceMs = 1000) {
    const form = document.getElementById(formId);
    if (!form) return;

    let timeout;
    form.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => saveFormData(formId), debounceMs);
    });

    console.log('Auto-save enabled for:', formId);
}

// ===================================
// Value Category Management
// ===================================

/**
 * Toggle value category details
 */
function toggleValueCategory(checkboxId, detailsId) {
    const checkbox = document.getElementById(checkboxId);
    const details = document.getElementById(detailsId);
    const container = checkbox.closest('.value-category');

    if (checkbox.checked) {
        details.classList.add('active');
        container.classList.add('selected');
    } else {
        details.classList.remove('active');
        container.classList.remove('selected');
        // Clear input fields in details section
        details.querySelectorAll('input, textarea').forEach(input => {
            input.value = '';
        });
    }
}

// ===================================
// Form Validation
// ===================================

/**
 * Validate required fields
 */
function validateRequiredFields(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    let firstInvalidField = null;

    requiredFields.forEach(field => {
        const value = field.value.trim();
        const fieldGroup = field.closest('.form-group');

        // Remove previous error states
        fieldGroup?.classList.remove('has-error');
        const existingError = fieldGroup?.querySelector('.error-message');
        existingError?.remove();

        // Check if field is empty
        if (!value) {
            isValid = false;
            if (!firstInvalidField) firstInvalidField = field;

            // Add error state
            fieldGroup?.classList.add('has-error');

            // Add error message
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'This field is required';
            fieldGroup?.appendChild(errorMsg);
        }
    });

    // Scroll to first invalid field
    if (firstInvalidField) {
        firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidField.focus();
    }

    return isValid;
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate phone format
 */
function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Validate numeric input
 */
function validateNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

// ===================================
// Form Submission
// ===================================

/**
 * Handle form submission
 */
function submitForm(formId, event) {
    if (event) event.preventDefault();

    // Validate form
    if (!validateRequiredFields(formId)) {
        showNotification('Please fill in all required fields', 'error');
        return false;
    }

    // Get form data
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Form submission data:', data);

    // Show loading state
    showLoadingOverlay('Submitting your request...');

    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        hideLoadingOverlay();

        // Clear saved form data
        clearFormData(formId);

        // Show success message
        showConfirmationPage(data);
    }, 2000);

    return false;
}

/**
 * Save draft
 */
function saveDraft(formId) {
    saveFormData(formId);
    showNotification('Draft saved successfully', 'success');
}

// ===================================
// UI Utilities
// ===================================

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

/**
 * Show loading overlay
 */
function showLoadingOverlay(message = 'Loading...') {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-spinner"></div>
        <p>${message}</p>
    `;
    document.body.appendChild(overlay);
}

/**
 * Hide loading overlay
 */
function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.remove();
}

/**
 * Show confirmation page
 */
function showConfirmationPage(data) {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="card confirmation-card">
            <div class="confirmation-icon">✓</div>
            <h2>Request Submitted Successfully!</h2>
            <p class="confirmation-message">
                Your demand intake request has been received and will be reviewed by the EA team.
            </p>

            <div class="confirmation-details">
                <h3>What Happens Next?</h3>
                <ol class="next-steps">
                    <li>You will receive a confirmation email with your request ID within 15 minutes</li>
                    <li>The EA team will review your submission and may contact you for clarification</li>
                    <li>You can track the status of your request in the ServiceNow portal</li>
                    <li>You will be notified of any status changes via email</li>
                </ol>
            </div>

            <div class="confirmation-actions">
                <button class="btn btn-primary" onclick="window.location.href='index.html'">
                    Submit Another Request
                </button>
                <button class="btn btn-secondary" onclick="window.print()">
                    Print Confirmation
                </button>
            </div>

            <div class="help-box">
                <h4>Questions?</h4>
                <p>Contact the EA team at <a href="mailto:ea-intake@company.com">ea-intake@company.com</a> or call (XXX) XXX-XXXX</p>
            </div>
        </div>
    `;

    window.scrollTo(0, 0);
}

/**
 * Format currency input
 */
function formatCurrency(input) {
    let value = input.value.replace(/[^\d.]/g, '');

    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Limit decimal places to 2
    if (parts[1] && parts[1].length > 2) {
        value = parseFloat(value).toFixed(2);
    }

    input.value = value;
}

/**
 * Character counter for textareas
 */
function updateCharacterCount(textareaId, counterId, maxLength) {
    const textarea = document.getElementById(textareaId);
    const counter = document.getElementById(counterId);

    if (!textarea || !counter) return;

    const remaining = maxLength - textarea.value.length;
    counter.textContent = `${remaining} characters remaining`;

    if (remaining < 0) {
        counter.style.color = 'var(--danger-color)';
    } else if (remaining < 50) {
        counter.style.color = 'var(--warning-color)';
    } else {
        counter.style.color = 'var(--text-muted)';
    }
}

/**
 * Show/hide sections
 */
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    if (section.style.display === 'none') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}

/**
 * Scroll to top
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Confirm navigation away from unsaved form
 */
function confirmExit(event) {
    const message = 'You have unsaved changes. Are you sure you want to leave?';
    event.returnValue = message;
    return message;
}

/**
 * Enable exit confirmation
 */
function enableExitConfirmation(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    let formChanged = false;

    form.addEventListener('input', () => {
        formChanged = true;
    });

    window.addEventListener('beforeunload', (event) => {
        if (formChanged) {
            return confirmExit(event);
        }
    });

    form.addEventListener('submit', () => {
        formChanged = false;
    });
}

// ===================================
// Date Utilities
// ===================================

/**
 * Format date to YYYY-MM-DD
 */
function formatDate(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Get today's date in YYYY-MM-DD format
 */
function getToday() {
    return formatDate(new Date());
}

/**
 * Validate date is in the future
 */
function isFutureDate(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate >= today;
}

// ===================================
// File Upload Utilities
// ===================================

/**
 * Handle file upload
 */
function handleFileUpload(inputId, displayId) {
    const input = document.getElementById(inputId);
    const display = document.getElementById(displayId);

    if (!input || !display) return;

    const files = input.files;
    if (files.length === 0) {
        display.innerHTML = '<p class="help-text">No files selected</p>';
        return;
    }

    let html = '<ul class="file-list">';
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const size = formatFileSize(file.size);
        html += `
            <li class="file-item">
                <span class="file-name">${file.name}</span>
                <span class="file-size">(${size})</span>
            </li>
        `;
    }
    html += '</ul>';

    display.innerHTML = html;
}

/**
 * Format file size
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ===================================
// Print Utilities
// ===================================

/**
 * Print form
 */
function printForm() {
    window.print();
}

/**
 * Export form as PDF (requires backend)
 */
function exportToPDF(formId) {
    // This would typically call a backend API to generate PDF
    console.log('Export to PDF:', formId);
    showNotification('PDF export functionality requires backend implementation', 'info');
}

// ===================================
// Initialize on page load
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('EA Demand Management Portal initialized');

    // Add CSS for notifications and loading overlay
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .notification button {
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            line-height: 1;
        }

        .notification-success {
            background-color: #d4edda;
            color: #155724;
            border-left: 4px solid #28a745;
        }

        .notification-error {
            background-color: #f8d7da;
            color: #721c24;
            border-left: 4px solid #dc3545;
        }

        .notification-info {
            background-color: #d1ecf1;
            color: #0c5460;
            border-left: 4px solid #17a2b8;
        }

        .notification-warning {
            background-color: #fff3cd;
            color: #856404;
            border-left: 4px solid #ffc107;
        }

        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }

        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .loading-overlay p {
            color: white;
            margin-top: 20px;
            font-size: 1.1rem;
        }

        .error-message {
            color: #dc3545;
            font-size: 0.9rem;
            margin-top: 5px;
        }

        .has-error input,
        .has-error select,
        .has-error textarea {
            border-color: #dc3545;
        }

        .confirmation-card {
            text-align: center;
            max-width: 800px;
            margin: 50px auto;
        }

        .confirmation-icon {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: #28a745;
            color: white;
            font-size: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 30px;
        }

        .confirmation-message {
            font-size: 1.2rem;
            color: var(--text-muted);
            margin-bottom: 30px;
        }

        .confirmation-details {
            text-align: left;
            margin: 30px 0;
            padding: 30px;
            background-color: #f8f9fa;
            border-radius: 8px;
        }

        .next-steps {
            margin-top: 15px;
            padding-left: 25px;
        }

        .next-steps li {
            margin-bottom: 10px;
            line-height: 1.6;
        }

        .confirmation-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin: 30px 0;
        }

        .file-list {
            list-style: none;
            padding: 0;
        }

        .file-item {
            padding: 10px;
            background-color: #f8f9fa;
            border-radius: 4px;
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .file-size {
            color: var(--text-muted);
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(style);
});
