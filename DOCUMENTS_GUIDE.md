# Document Management Guide

This guide explains how to add project reports and certificates to your portfolio website.

## 📁 Directory Structure

```
portfolio/
├── reports/           # Project reports (PDF files)
├── certificates/      # Course certificates (PDF files)
├── index.html
├── styles.css
├── script.js
└── DOCUMENTS_GUIDE.md
```

## 🔧 Adding Project Reports

### Step 1: Add PDF Files
Place your project report PDF files in the `reports/` directory with the following naming convention:

```
reports/
├── indoor-rover.pdf
├── vaps-analysis.pdf
├── audio-preamp.pdf
├── pacemaker.pdf
└── streetlight.pdf
```

### Step 2: Enable Document Loading
In `script.js`, change the `documentExists` variable to `true` in the `loadDocument` function:

```javascript
// Change this line:
const documentExists = false; // Set to true when you have actual documents

// To this:
const documentExists = true; // Set to true when you have actual documents
```

## 🏆 Adding Certificates

### Step 1: Add PDF Files
Place your certificate PDF files in the `certificates/` directory:

```
certificates/
├── qualcomm-verification.pdf
├── nptel-python.pdf
└── nptel-verilog.pdf
```

### Step 2: No Additional Code Changes Required
The system will automatically detect and load certificates when you click "View Certificate" buttons.

## 🎯 File Naming Convention

The system uses specific naming patterns that match the `data-project` attributes in the HTML:

### Project Reports
- `indoor-rover.pdf` → Indoor Rover with SLAM-Based Mapping
- `vaps-analysis.pdf` → Analysis of Multiple VAPs
- `audio-preamp.pdf` → Audio Preamplifier Design
- `pacemaker.pdf` → Pacemaker Circuit Development
- `streetlight.pdf` → Streetlight Control System

### Certificates
- `qualcomm-verification.pdf` → System Verification Techniques
- `nptel-python.pdf` → Python for Data Science
- `nptel-verilog.pdf` → System Design Through Verilog

## 🔄 Adding New Projects/Certificates

### For New Projects:
1. Add the project card to the HTML
2. Add the corresponding PDF file to `reports/`
3. Add the project name to the `getDocumentTitles()` function in `script.js`

### For New Certificates:
1. Add the certificate link to the HTML
2. Add the corresponding PDF file to `certificates/`
3. Add the certificate name to the `getDocumentTitles()` function in `script.js`

## 🎨 Document Viewer Features

The document viewer includes:
- **Full-screen modal** for optimal viewing
- **Zoom and navigation controls** (built into PDF viewer)
- **Download button** to save documents
- **Responsive design** for mobile devices
- **Keyboard shortcuts** (Escape to close)
- **Loading states** and error handling

## 🚀 Testing Your Documents

1. Add your PDF files to the appropriate directories
2. Set `documentExists = true` in `script.js`
3. Open the website in a browser
4. Click "View Report" or "View Certificate" buttons
5. The documents should load in the modal viewer

## 📝 Document Requirements

- **Format**: PDF files only
- **Size**: Recommended under 10MB for web performance
- **Quality**: High resolution for professional presentation
- **Naming**: Use the exact naming convention specified above

## 🔧 Troubleshooting

### Documents Not Loading
- Check file names match exactly (case-sensitive)
- Ensure files are in the correct directories
- Verify `documentExists` is set to `true`
- Check browser console for errors

### Download Not Working
- Ensure the PDF files are accessible via web server
- Check for CORS issues if hosting on a different domain
- Verify file permissions if self-hosting

### Mobile Issues
- Test on various devices
- Check PDF file size (large files may not load on mobile)
- Ensure documents are optimized for mobile viewing

## 🎯 Best Practices

1. **Optimize PDF files** for web viewing
2. **Use consistent naming** for easy management
3. **Keep file sizes reasonable** (under 5MB recommended)
4. **Test on multiple devices** before publishing
5. **Backup your documents** regularly

## 📊 Example Implementation

Here's how to add a new project called "Smart Home System":

### 1. Add HTML (in projects section):
```html
<div class="project-card">
    <div class="project-header">
        <h3>Smart Home System</h3>
        <span class="domain-tag iot">IoT / Home Automation</span>
    </div>
    <p class="project-description">
        Development of an intelligent home automation system...
    </p>
    <a href="#" class="view-document-link" data-project="smart-home" data-type="report">
        <i class="fas fa-file-pdf"></i> View Report
    </a>
</div>
```

### 2. Add PDF file:
```
reports/smart-home.pdf
```

### 3. Update JavaScript:
```javascript
getDocumentTitles() {
    return {
        // ... existing entries ...
        'smart-home': 'Smart Home System',
    };
}
```

That's it! Your new project will be fully functional with the document viewer system.

---

**Need help?** Check the code comments in `script.js` for additional technical details.