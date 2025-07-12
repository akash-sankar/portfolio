# Profile Photo Setup Guide

This guide explains different ways to add your profile photo to the portfolio website.

## 🖼️ **Method 1: Local Image File (Recommended)**

This is the most reliable method as the image is hosted with your website.

### **Step 1: Prepare Your Photo**
- **Format**: JPG, PNG, or WebP
- **Size**: At least 500x500 pixels
- **File Size**: Under 2MB for web performance
- **Aspect Ratio**: Square (1:1) works best, but any ratio will be cropped to circular

### **Step 2: Add Photo to Directory**
1. Place your photo in the `images/` directory
2. Name it `profile-photo.jpg` (or update the filename in HTML)

### **Step 3: Test**
Refresh your website - the photo should appear as a circular profile image.

---

## 🌐 **Method 2: External URL (Online Image)**

Use an image hosted elsewhere (Google Drive, Dropbox, etc.).

### **Update HTML:**
Replace the image source in `index.html`:
```html
<!-- Change this line: -->
<img src="./images/profile-photo.jpg" alt="Akash Sankaranarayanan" class="profile-photo">

<!-- To this: -->
<img src="https://your-image-url.com/photo.jpg" alt="Akash Sankaranarayanan" class="profile-photo">
```

### **Popular Image Hosting Options:**
- **LinkedIn**: Right-click your LinkedIn profile photo → "Copy image address"
- **Google Drive**: Share image publicly and use direct link
- **GitHub**: Upload to repository and use raw file URL
- **Imgur**: Upload and copy direct link

---

## 📱 **Method 3: Different File Formats**

### **For PNG files:**
```html
<img src="./images/profile-photo.png" alt="Akash Sankaranarayanan" class="profile-photo">
```

### **For WebP files (better performance):**
```html
<img src="./images/profile-photo.webp" alt="Akash Sankaranarayanan" class="profile-photo">
```

### **Multiple format support (fallback):**
```html
<picture class="hero-image">
    <source srcset="./images/profile-photo.webp" type="image/webp">
    <source srcset="./images/profile-photo.jpg" type="image/jpeg">
    <img src="./images/profile-photo.jpg" alt="Akash Sankaranarayanan" class="profile-photo">
</picture>
```

---

## 🎨 **Method 4: Custom Styling Options**

### **Square Image (instead of circular):**
Add this CSS to `styles.css`:
```css
.profile-photo {
    border-radius: var(--radius-lg); /* Square with rounded corners */
    /* Remove border-radius: 50%; for perfect square */
}
```

### **Different Border Colors:**
```css
.profile-photo {
    border: 4px solid #your-color-here;
}
```

### **Add Gradient Border:**
```css
.profile-photo {
    border: 4px solid transparent;
    background: linear-gradient(45deg, #3498db, #e74c3c) padding-box,
                linear-gradient(45deg, #3498db, #e74c3c) border-box;
}
```

---

## 🔧 **Method 5: Temporary Placeholder Replacement**

If you don't have a photo yet but want to remove the placeholder:

### **Option A: Initials**
```html
<div class="hero-image">
    <div class="initials-placeholder">AS</div>
</div>
```

Add this CSS:
```css
.initials-placeholder {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    font-weight: bold;
    color: white;
    border: 4px solid var(--primary-color);
    transition: all var(--transition-normal);
}
```

### **Option B: Professional Avatar**
Use a service like [UI Avatars](https://ui-avatars.com/):
```html
<img src="https://ui-avatars.com/api/?name=Akash+Sankaranarayanan&size=250&background=2c3e50&color=fff" 
     alt="Akash Sankaranarayanan" class="profile-photo">
```

---

## 📊 **Photo Optimization Tips**

### **Before uploading:**
1. **Crop to square** for best results
2. **Resize to 500x500px** (or larger) for crisp display
3. **Compress** to under 2MB for fast loading
4. **Choose appropriate format**:
   - JPG: Best for photos with many colors
   - PNG: Best for images with transparency
   - WebP: Best overall compression (modern browsers)

### **Online tools for optimization:**
- [TinyPNG](https://tinypng.com/) - Compress images
- [Squoosh](https://squoosh.app/) - Resize and optimize
- [Canva](https://canva.com/) - Crop to square and edit

---

## 🚀 **Testing Your Photo**

After adding your photo:

1. **Refresh the website** in your browser
2. **Check on mobile** - photo should be responsive
3. **Test dark mode** - ensure photo looks good in both themes
4. **Verify loading speed** - large images may slow down the site

---

## 🔍 **Troubleshooting**

### **Photo not showing:**
- Check file path is correct
- Ensure file exists in the specified directory
- Check file permissions
- Verify file format is supported

### **Photo looks blurry:**
- Use higher resolution image (at least 500x500)
- Avoid enlarging small images
- Check image compression quality

### **Photo looks stretched:**
- The CSS uses `object-fit: cover` which maintains aspect ratio
- For best results, use square images
- Non-square images will be cropped to fit circular frame

### **File too large:**
- Compress image using online tools
- Resize to maximum 1000x1000 pixels
- Convert to WebP format for better compression

---

## 📝 **Quick Start Checklist**

- [ ] Prepare square photo (at least 500x500px)
- [ ] Name it `profile-photo.jpg`
- [ ] Place in `images/` directory
- [ ] Refresh website to test
- [ ] Check mobile responsiveness
- [ ] Test in both light and dark modes

**That's it!** Your professional profile photo is now integrated into your portfolio.

---

**Need help?** Check the browser console for error messages or refer to the main README.md for additional support.