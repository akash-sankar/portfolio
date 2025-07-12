// Portfolio Website JavaScript Functionality
class AkashPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupPDFDownload();
        this.setupScrollAnimations();
        this.setupProjectDownloads();
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

    // PDF Download Functionality
    setupPDFDownload() {
        const downloadBtn = document.getElementById('download-pdf');
        
        downloadBtn.addEventListener('click', () => {
            this.generatePDF();
        });
    }

    generatePDF() {
        const element = document.getElementById('content-wrapper');
        const downloadBtn = document.getElementById('download-pdf');
        
        // Show loading state
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        downloadBtn.disabled = true;
        
        // PDF generation options
        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: 'Akash_Sankaranarayanan_Portfolio.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                letterRendering: true,
                allowTaint: false
            },
            jsPDF: { 
                unit: 'in', 
                format: 'a4', 
                orientation: 'portrait',
                putOnlyUsedFonts: true,
                floatPrecision: 16
            },
            pagebreak: { 
                mode: ['avoid-all', 'css', 'legacy'],
                avoid: ['.project-card', '.skill-category', '.milestone-item']
            }
        };

        // Generate PDF
        html2pdf().set(opt).from(element).save().then(() => {
            // Reset button state
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
            
            // Show success message
            this.showNotification('PDF downloaded successfully!', 'success');
        }).catch((error) => {
            console.error('PDF generation failed:', error);
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
            this.showNotification('PDF generation failed. Please try again.', 'error');
        });
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

    // Project Download Functionality (Placeholder)
    setupProjectDownloads() {
        const downloadLinks = document.querySelectorAll('.download-link');
        
        downloadLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const projectName = link.getAttribute('data-project');
                this.handleProjectDownload(projectName);
            });
        });
    }

    handleProjectDownload(projectName) {
        // This is a placeholder function
        // In a real implementation, you would fetch the actual PDF file
        const projectTitles = {
            'indoor-rover': 'Indoor Rover with SLAM-Based Mapping',
            'vaps-analysis': 'Analysis of Multiple VAPs',
            'audio-preamp': 'Design and Implementation of Audio Preamplifier',
            'pacemaker': 'Design and Development of a Pacemaker Circuit',
            'streetlight': 'Streetlight Control System'
        };

        const title = projectTitles[projectName] || 'Project Report';
        
        // Show notification (replace with actual download logic)
        this.showNotification(
            `Download for "${title}" is not available yet. Please contact directly for the report.`, 
            'info'
        );

        // Example of how you would implement actual download:
        // const downloadUrl = `/reports/${projectName}.pdf`;
        // window.open(downloadUrl, '_blank');
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