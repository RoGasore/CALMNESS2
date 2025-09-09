// Configuration
const API_BASE_URL = 'http://localhost:8000/api';

// Global variables
let currentServiceId = null;
let currentFAQId = null;

// Initialize the admin interface
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    loadDashboardStats();
    loadServices();
    loadFAQ();
});

// Sidebar navigation
function initializeSidebar() {
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all sections
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => section.classList.remove('active'));
            
            // Show selected section
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Load section-specific data
            if (sectionId === 'home') {
                loadPageContent('accueil');
            } else if (sectionId === 'about') {
                loadPageContent('a-propos');
            } else if (sectionId === 'contact') {
                loadPageContent('contact');
            }
        });
    });
}

// Load dashboard statistics
async function loadDashboardStats() {
    try {
        const [servicesResponse, faqResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/services`),
            fetch(`${API_BASE_URL}/faq`)
        ]);
        
        const servicesData = await servicesResponse.json();
        const faqData = await faqResponse.json();
        
        document.getElementById('services-count').textContent = `${servicesData.data.length} services`;
        document.getElementById('faq-count').textContent = `${faqData.data.length} questions`;
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

// Load page content
async function loadPageContent(page) {
    try {
        const response = await fetch(`${API_BASE_URL}/pages/${page}`);
        const data = await response.json();
        
        if (data.data) {
            // Populate form fields based on page
            Object.keys(data.data).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.value = data.data[key];
                }
            });
        }
    } catch (error) {
        console.error(`Error loading ${page} content:`, error);
        showMessage('Erreur lors du chargement du contenu', 'error');
    }
}

// Save page content
async function savePageContent(page) {
    const formData = {};
    const form = document.querySelector(`#${page === 'accueil' ? 'home' : page === 'a-propos' ? 'about' : 'contact'} .content-form`);
    
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.id && input.value) {
                formData[input.id] = input.value;
            }
        });
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/pages/${page}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            showMessage('Contenu sauvegardé avec succès !', 'success');
        } else {
            throw new Error('Erreur lors de la sauvegarde');
        }
    } catch (error) {
        console.error('Error saving page content:', error);
        showMessage('Erreur lors de la sauvegarde', 'error');
    }
}

// Load services
async function loadServices() {
    try {
        const response = await fetch(`${API_BASE_URL}/services`);
        const data = await response.json();
        
        const servicesList = document.getElementById('services-list');
        servicesList.innerHTML = '';
        
        data.data.forEach(service => {
            const serviceItem = createServiceItem(service);
            servicesList.appendChild(serviceItem);
        });
    } catch (error) {
        console.error('Error loading services:', error);
        showMessage('Erreur lors du chargement des services', 'error');
    }
}

// --- Sécurité XSS : échapper le contenu dynamique ---
function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"']/g, function (m) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[m];
    });
}

// --- Correction dans createServiceItem et createFAQItem ---
function createServiceItem(service) {
    const div = document.createElement('div');
    div.className = 'service-item';
    div.innerHTML = `
        <div class="service-content">
            <h3>${escapeHTML(service.title)}</h3>
            <p>${escapeHTML(service.description)}</p>
            <small><i class="${escapeHTML(service.icon)}"></i> ${escapeHTML(service.link)} (Ordre: ${escapeHTML(service.order)})</small>
        </div>
        <div class="service-actions">
            <button class="btn btn-primary" onclick="editService(${service.id})">
                <i class="fas fa-edit"></i> Modifier
            </button>
            <button class="btn btn-danger" onclick="deleteService(${service.id})">
                <i class="fas fa-trash"></i> Supprimer
            </button>
        </div>
    `;
    return div;
}

function createFAQItem(faq) {
    const div = document.createElement('div');
    div.className = 'faq-item';
    div.innerHTML = `
        <div class="faq-content">
            <h3>${escapeHTML(faq.question)}</h3>
            <p>${escapeHTML(faq.answer)}</p>
            <small>Ordre: ${escapeHTML(faq.order)}</small>
        </div>
        <div class="faq-actions">
            <button class="btn btn-primary" onclick="editFAQ(${faq.id})">
                <i class="fas fa-edit"></i> Modifier
            </button>
            <button class="btn btn-danger" onclick="deleteFAQ(${faq.id})">
                <i class="fas fa-trash"></i> Supprimer
            </button>
        </div>
    `;
    return div;
}

// --- Validation des champs avant envoi ---
function validateServiceData(data) {
    return data.title && data.description && data.icon && data.link;
}

async function saveService() {
    const serviceData = {
        title: document.getElementById('service_title').value.trim(),
        description: document.getElementById('service_description').value.trim(),
        icon: document.getElementById('service_icon').value.trim(),
        link: document.getElementById('service_link').value.trim(),
        order: parseInt(document.getElementById('service_order').value) || 0
    };

    if (!validateServiceData(serviceData)) {
        showMessage('Tous les champs sont obligatoires.', 'error');
        return;
    }

    try {
        let response;
        if (currentServiceId) {
            // Update existing service
            response = await fetch(`${API_BASE_URL}/services/${currentServiceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceData)
            });
        } else {
            // Create new service
            response = await fetch(`${API_BASE_URL}/services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceData)
            });
        }
        
        if (response.ok) {
            showMessage('Service sauvegardé avec succès !', 'success');
            closeModal('serviceModal');
            loadServices();
            loadDashboardStats();
        } else {
            throw new Error('Erreur lors de la sauvegarde');
        }
    } catch (error) {
        console.error('Error saving service:', error);
        showMessage('Erreur lors de la sauvegarde du service', 'error');
    }
}

// --- Validation FAQ ---
function validateFAQData(data) {
    return data.question && data.answer;
}

async function saveFAQ() {
    const faqData = {
        question: document.getElementById('faq_question').value.trim(),
        answer: document.getElementById('faq_answer').value.trim(),
        order: parseInt(document.getElementById('faq_order').value) || 0
    };

    if (!validateFAQData(faqData)) {
        showMessage('Tous les champs sont obligatoires.', 'error');
        return;
    }

    try {
        let response;
        if (currentFAQId) {
            // Update existing FAQ
            response = await fetch(`${API_BASE_URL}/faq/${currentFAQId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(faqData)
            });
        } else {
            // Create new FAQ
            response = await fetch(`${API_BASE_URL}/faq`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(faqData)
            });
        }
        
        if (response.ok) {
            showMessage('FAQ sauvegardée avec succès !', 'success');
            closeModal('faqModal');
            loadFAQ();
            loadDashboardStats();
        } else {
            throw new Error('Erreur lors de la sauvegarde');
        }
    } catch (error) {
        console.error('Error saving FAQ:', error);
        showMessage('Erreur lors de la sauvegarde de la FAQ', 'error');
    }
}

// Delete service
async function deleteService(serviceId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                showMessage('Service supprimé avec succès !', 'success');
                loadServices();
                loadDashboardStats();
            } else {
                throw new Error('Erreur lors de la suppression');
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            showMessage('Erreur lors de la suppression du service', 'error');
        }
    }
}

// Delete FAQ
async function deleteFAQ(faqId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette FAQ ?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/faq/${faqId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                showMessage('FAQ supprimée avec succès !', 'success');
                loadFAQ();
                loadDashboardStats();
            } else {
                throw new Error('Erreur lors de la suppression');
            }
        } catch (error) {
            console.error('Error deleting FAQ:', error);
            showMessage('Erreur lors de la suppression de la FAQ', 'error');
        }
    }
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Show message
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of the main content
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(messageDiv, mainContent.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
