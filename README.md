# Akash Sankaranarayanan - Academic Portfolio Website

A modern, responsive single-page portfolio website designed for academic and professional presentation. Features a clean, futuristic design with dark mode support, smooth animations, and PDF download functionality.

## 🌟 Features

### Core Functionality
- **Single-page design** with smooth scroll navigation
- **Responsive layout** optimized for desktop, tablet, and mobile devices
- **Dark/Light theme toggle** with persistent user preference
- **Document viewer modal** for displaying project reports and certificates
- **Smooth scroll animations** using Intersection Observer API
- **Professional academic styling** suitable for engineering contexts

### Sections Included
- **Hero/About** - Introduction with contact links and areas of interest
- **Projects** - Showcase of academic and technical projects with domain tags
- **Skills** - Technical skills organized by category
- **Internships** - Professional experience and contributions
- **Milestones** - Academic achievements, workshops, and certifications
- **Contact** - Direct contact information

### Design Features
- Modern neutral color palette suitable for academic contexts
- Futuristic design elements with subtle animations
- Card-based layout with hover effects
- Staggered entrance animations
- Professional typography and spacing
- Color-coded domain tags for projects

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Quick Setup
1. Clone or download the repository
2. Open `index.html` in a web browser
3. The website is ready to use!

### File Structure
```
portfolio/
├── index.html              # Main HTML structure
├── styles.css              # Complete styling and responsive design
├── script.js               # JavaScript functionality
├── README.md               # Main documentation
├── DOCUMENTS_GUIDE.md      # Document management guide
├── reports/                # Project reports (PDF files)
│   └── README.md          # Instructions for adding reports
└── certificates/           # Course certificates (PDF files)
    └── README.md          # Instructions for adding certificates
```

## 🎨 Customization Guide

### Personal Information
Edit the following sections in `index.html`:

**Basic Info:**
```html
<h1 class="hero-title">Your Name</h1>
<p class="hero-subtitle">Your Degree/Field</p>
<p class="hero-tagline">"Your personal tagline"</p>
```

**Contact Links:**
```html
<a href="https://linkedin.com/in/your-profile" target="_blank">
<a href="mailto:your-email@domain.com">
```

### Adding Projects
Add new project cards in the projects section:
```html
<div class="project-card">
    <div class="project-header">
        <h3>Project Title</h3>
        <span class="domain-tag your-domain">Domain Name</span>
    </div>
    <p class="project-description">Project description...</p>
    <a href="#" class="download-link" data-project="project-slug">
        <i class="fas fa-file-pdf"></i> Download Report
    </a>
</div>
```

### Color Scheme Customization
Modify CSS custom properties in `styles.css`:
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --accent-color: #your-color;
  /* ... other color variables */
}
```

### Adding New Domain Tags
1. Add CSS styling for the new domain:
```css
.domain-tag.your-domain { background: #color; color: #text-color; }
[data-theme="dark"] .domain-tag.your-domain { background: #dark-color; color: #dark-text; }
```

2. Use the class in your HTML:
```html
<span class="domain-tag your-domain">Your Domain</span>
```

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: > 768px
- **Tablet**: 481px - 768px  
- **Mobile**: ≤ 480px

### Mobile Optimizations
- Simplified navigation
- Stacked layouts
- Touch-friendly button sizes
- Condensed content spacing
- Optimized font sizes

## 🌙 Dark Mode

The dark mode feature includes:
- Automatic theme detection based on user preference
- Manual toggle button in the header
- Persistent theme selection (stored in localStorage)
- Smooth transition animations
- Optimized color contrasts for both themes

## 📄 PDF Export

The PDF download feature:
- Converts the entire website to a clean PDF format
- Removes interactive elements (buttons, animations)
- Optimizes layout for print/PDF viewing
- Maintains professional formatting
- Uses high-quality rendering (html2pdf.js)

### PDF Customization
Modify PDF options in `script.js`:
```javascript
const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: 'Your_Name_Portfolio.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    // ... other options
};
```

## ⚡ Performance Features

- **Lazy loading** for animations
- **Intersection Observer** for efficient scroll detection
- **CSS custom properties** for consistent theming
- **Minimal JavaScript dependencies**
- **Optimized animations** with `transform` and `opacity`
- **Debounced scroll events** for better performance

## 🔧 Technical Implementation

### Technologies Used
- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - No framework dependencies
- **Font Awesome** - Professional icons
- **PDF.js** - Built-in browser PDF viewing (via iframe)

### Browser Support
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 🎯 Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy
- Focus indicators for keyboard navigation
- Alt text for images (when added)
- Color contrast compliance
- Screen reader friendly

## 📊 Document Management System

The portfolio includes a sophisticated document viewer for project reports and certificates:

### Document Viewer Features
- **Full-screen modal** with embedded PDF viewer
- **Download functionality** for each document
- **Loading states** and error handling
- **Responsive design** for mobile devices
- **Keyboard shortcuts** (Escape to close)

### Adding Your Documents

1. **Create directory structure** (already included):
   ```
   portfolio/
   ├── reports/           # Project reports
   ├── certificates/      # Course certificates
   ```

2. **Add PDF files** with specific naming:
   ```
   reports/
   ├── indoor-rover.pdf
   ├── vaps-analysis.pdf
   ├── audio-preamp.pdf
   ├── pacemaker.pdf
   └── streetlight.pdf
   
   certificates/
   ├── qualcomm-verification.pdf
   ├── nptel-python.pdf
   └── nptel-verilog.pdf
   ```

3. **Enable document loading** in `script.js`:
   ```javascript
   // Change this line:
   const documentExists = false;
   
   // To this:
   const documentExists = true;
   ```

4. **Test the functionality** by clicking "View Report" or "View Certificate" buttons

### Document Requirements
- **Format**: PDF files only
- **Size**: Under 10MB recommended for web performance
- **Quality**: High resolution for professional presentation
- **Naming**: Must match the exact naming convention

**See `DOCUMENTS_GUIDE.md` for detailed instructions.**

## 🚀 Deployment Options

### Static Hosting (Recommended)
- **GitHub Pages**: Push to repository, enable Pages in settings
- **Netlify**: Drag and drop deployment
- **Vercel**: Connect repository for automatic deployments
- **Firebase Hosting**: For more advanced features

### Local Development
- Use VS Code Live Server extension
- Python: `python -m http.server 8000`
- Node.js: `npx serve .`

## 🤝 Contributing

To customize this portfolio for someone else:
1. Update personal information in HTML
2. Replace project details
3. Modify color scheme if desired
4. Add actual project report PDFs
5. Update contact information and links

## 📄 License

This portfolio template is open source and available for personal and educational use.

## 📧 Support

For questions about customization or technical issues, refer to the code comments or create an issue in the repository.

---

**Built with ❤️ for academic and professional presentation**
