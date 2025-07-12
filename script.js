// Portfolio Website JavaScript Functionality
class AkashPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupScrollAnimations();
        this.setupDocumentViewer();
        this.setupSmoothScrolling();
        this.applyStoredTheme();
    }

    // Theme Toggle Functionality
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply new theme
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Update icon
            themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            
            // Store preference
            localStorage.setItem('portfolio-theme', newTheme);
            
            // Add a subtle animation to indicate the change
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        });
    }

    // Apply stored theme on page load
    applyStoredTheme() {
        const storedTheme = localStorage.getItem('portfolio-theme') || 'light';
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        
        document.documentElement.setAttribute('data-theme', storedTheme);
        themeIcon.className = storedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Document Viewer Functionality
    setupDocumentViewer() {
        const documentLinks = document.querySelectorAll('.view-document-link');
        const modal = document.getElementById('document-viewer-modal');
        const closeBtn = document.getElementById('close-modal');
        const downloadBtn = document.getElementById('download-document');
        const documentFrame = document.getElementById('document-frame');
        const documentTitle = document.getElementById('document-title');
        const loadingMessage = document.getElementById('document-loading');
        const errorMessage = document.getElementById('document-error');
        
        // Track current document for download
        this.currentDocument = null;
        
        // Setup document links
        documentLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const projectName = link.getAttribute('data-project');
                const documentType = link.getAttribute('data-type');
                this.openDocument(projectName, documentType);
            });
        });
        
        // Close modal functionality
        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        // Download functionality
        downloadBtn.addEventListener('click', () => {
            this.downloadCurrentDocument();
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openDocument(projectName, documentType) {
        const modal = document.getElementById('document-viewer-modal');
        const documentFrame = document.getElementById('document-frame');
        const documentTitle = document.getElementById('document-title');
        const loadingMessage = document.getElementById('document-loading');
        const errorMessage = document.getElementById('document-error');
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset state
        documentFrame.style.display = 'none';
        errorMessage.style.display = 'none';
        loadingMessage.style.display = 'flex';
        
        // Set title
        const documentTitles = this.getDocumentTitles();
        const title = documentTitles[projectName] || 'Document';
        documentTitle.textContent = `${title} - ${documentType.charAt(0).toUpperCase() + documentType.slice(1)}`;
        
        // Store current document info
        this.currentDocument = {
            projectName: projectName,
            documentType: documentType,
            title: title
        };
        
        // Try to load document
        this.loadDocument(projectName, documentType);
    }
    
    loadDocument(projectName, documentType) {
        const documentFrame = document.getElementById('document-frame');
        const loadingMessage = document.getElementById('document-loading');
        const errorMessage = document.getElementById('document-error');
        
        // Construct document URL
        const documentUrl = this.getDocumentUrl(projectName, documentType);
        
        // Check if document exists (this is a simulation)
        // In a real implementation, you would check if the file exists
        const documentExists = true; // Set to true when you have actual documents
        
        setTimeout(() => {
            if (documentExists) {
                // Load the document
                documentFrame.src = documentUrl;
                documentFrame.onload = () => {
                    loadingMessage.style.display = 'none';
                    documentFrame.style.display = 'block';
                };
            } else {
                // Show error message
                loadingMessage.style.display = 'none';
                errorMessage.style.display = 'flex';
            }
        }, 1000); // Simulate loading time
    }
    
    getDocumentUrl(projectName, documentType) {
        // Construct URL based on document type
        const baseUrl = documentType === 'certificate' ? './certificates/' : './reports/';
        return `${baseUrl}${projectName}.pdf`;
    }
    
    downloadCurrentDocument() {
        if (!this.currentDocument) return;
        
        const { projectName, documentType, title } = this.currentDocument;
        const documentUrl = this.getDocumentUrl(projectName, documentType);
        
        // Create download link
        const link = document.createElement('a');
        link.href = documentUrl;
        link.download = `${title}_${documentType}.pdf`;
        link.style.display = 'none';
        
        // Add to document and click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show notification
        this.showNotification(`Download initiated for ${title} ${documentType}`, 'info');
    }
    
    closeModal() {
        const modal = document.getElementById('document-viewer-modal');
        const documentFrame = document.getElementById('document-frame');
        
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Clear iframe
        documentFrame.src = '';
        
        // Reset current document
        this.currentDocument = null;
    }
    
    getDocumentTitles() {
        return {
            'indoor-rover': 'Indoor Rover with SLAM-Based Mapping',
            'vaps-analysis': 'Analysis of Multiple VAPs',
            'audio-preamp': 'Audio Preamplifier Design',
            'pacemaker': 'Pacemaker Circuit Development',
            'streetlight': 'Streetlight Control System',
            'qualcomm-verification': 'System Verification Techniques',
            'nptel-python': 'Python for Data Science',
            'nptel-verilog': 'System Design Through Verilog'
        };
    }

    // Scroll Animations using Intersection Observer
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    
                    // Add staggered animation for cards within sections
                    const cards = entry.target.querySelectorAll('.project-card, .skill-category, .milestone-item');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = 'fadeInUp 0.6s ease forwards';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });

        // Observe individual cards for staggered effects
        const cards = document.querySelectorAll('.project-card, .skill-category, .milestone-item');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });
    }



    // Smooth Scrolling for Navigation
    setupSmoothScrolling() {
        // Add smooth scrolling for any internal links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Notification System
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles
        this.addNotificationStyles();

        // Add to document
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle',
            warning: 'exclamation-triangle'
        };
        return icons[type] || 'info-circle';
    }

    addNotificationStyles() {
        if (document.querySelector('#notification-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                background: var(--card-background);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-heavy);
                opacity: 0;
                transform: translateY(-100%);
                transition: all 0.3s ease;
            }
            
            .notification-success {
                border-left: 4px solid #27ae60;
            }
            
            .notification-error {
                border-left: 4px solid #e74c3c;
            }
            
            .notification-info {
                border-left: 4px solid #3498db;
            }
            
            .notification-warning {
                border-left: 4px solid #f39c12;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: var(--spacing-md);
                padding: var(--spacing-md) var(--spacing-lg);
                color: var(--text-primary);
            }
            
            .notification-content i:first-child {
                font-size: 1.2rem;
            }
            
            .notification-success .notification-content i:first-child {
                color: #27ae60;
            }
            
            .notification-error .notification-content i:first-child {
                color: #e74c3c;
            }
            
            .notification-info .notification-content i:first-child {
                color: #3498db;
            }
            
            .notification-warning .notification-content i:first-child {
                color: #f39c12;
            }
            
            .notification-content span {
                flex: 1;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-light);
                cursor: pointer;
                padding: var(--spacing-xs);
                border-radius: var(--radius-sm);
                transition: all var(--transition-fast);
            }
            
            .notification-close:hover {
                background: var(--background-tertiary);
                color: var(--text-primary);
            }
            
            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Header scroll effect
    setupHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'rgba(var(--card-background-rgb), 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--card-background)';
                header.style.backdropFilter = 'blur(10px)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Performance optimizations
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AkashPortfolio();
});

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
    
    // Trigger entrance animations
    document.body.classList.add('loaded');
});

// Prevent FOUC (Flash of Unstyled Content)
document.documentElement.style.visibility = 'visible';
