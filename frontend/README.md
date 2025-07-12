# Axel Iparrea - Personal Portfolio

A modern, responsive React portfolio website showcasing professional work and technical skills.

## ✨ Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive**: Works seamlessly on all devices
- **Performance Optimized**: Fast loading times and smooth interactions
- **Interactive Elements**: Stable hover effects and smooth transitions
- **Project Showcase**: Individual project pages with detailed information
- **Video Support**: Embed videos in project descriptions
- **Navigation**: Back button functionality for easy navigation
- **Multi-language Support**: English and Spanish
- **Theme Support**: Light/dark mode compatible

## 🚀 Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Framer Motion**: Smooth animations and transitions
- **React Router**: Client-side routing
- **CSS3**: Modern styling with custom properties
- **React i18next**: Internationalization

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AboutSection.jsx
│   │   ├── ExperienceSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── Navbar.jsx
│   │   └── ParticleBackground.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   └── ProjectDetail.jsx
│   ├── hook/                # Custom hooks and contexts
│   │   ├── LanguageContext.jsx
│   │   └── ThemeContext.jsx
│   ├── assets/              # Static assets
│   │   ├── pictures/
│   │   └── css/
│   └── utils/               # Utility functions
├── public/                  # Public assets
└── package.json
```

## 🎥 Adding Videos to Projects

### Method 1: YouTube/Vimeo Embed

1. **Update Project Data** in `src/pages/ProjectDetail.jsx`:
```javascript
const projectData = {
  'your-project-id': {
    title: 'Your Project',
    // ... other properties
    video: {
      type: 'youtube',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      thumbnail: '/path/to/thumbnail.jpg'
    }
  }
};
```

2. **Add Video Section** in the project detail template:
```javascript
{/* Video Section */}
{project.video && (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    style={{
      background: colors.surface,
      padding: '2rem',
      borderRadius: '12px',
      margin: '2rem 0'
    }}
  >
    <h3 style={{ color: colors.text, marginBottom: '1rem' }}>
      Project Demo
    </h3>
    <div style={{
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: '0',
      overflow: 'hidden'
    }}>
      <iframe
        src={project.video.url}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px'
        }}
        allowFullScreen
        title="Project Demo"
      />
    </div>
  </motion.div>
)}
```

### Method 2: Local Video Files

1. **Add video file** to `public/videos/` directory
2. **Update Project Data**:
```javascript
const projectData = {
  'your-project-id': {
    title: 'Your Project',
    // ... other properties
    video: {
      type: 'local',
      url: '/videos/your-video.mp4',
      thumbnail: '/videos/your-thumbnail.jpg'
    }
  }
};
```

3. **Add Video Component**:
```javascript
{project.video && (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    style={{
      background: colors.surface,
      padding: '2rem',
      borderRadius: '12px',
      margin: '2rem 0'
    }}
  >
    <h3 style={{ color: colors.text, marginBottom: '1rem' }}>
      Project Demo
    </h3>
    <video
      controls
      style={{
        width: '100%',
        borderRadius: '8px',
        boxShadow: `0 4px 12px ${colors.shadow}`
      }}
      poster={project.video.thumbnail}
    >
      <source src={project.video.url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </motion.div>
)}
```

## 🎨 Recent Improvements

### ✅ Fixed Issues:
1. **Stable Animations**: Eliminated flickering hover effects
2. **Navigation**: Added back button to project detail pages
3. **Color Consistency**: Fixed theme color references
4. **Performance**: Optimized animations with hardware acceleration

### ✅ Enhanced Features:
1. **Smooth Transitions**: Improved hover effects with `cubic-bezier` timing
2. **Responsive Design**: Better mobile experience
3. **Loading States**: Smooth loading animations
4. **Accessibility**: Better keyboard navigation and screen reader support

## 🛠️ Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
cd frontend
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop**: 1920px and above
- **Laptop**: 1024px - 1919px
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🎯 Browser Support

- Chrome 90+
- Firefox 85+
- Safari 14+
- Edge 90+

## 📧 Contact

For questions or collaborations:
- **Email**: axeliparrea@gmail.com
- **GitHub**: [github.com/axeliparrea](https://github.com/axeliparrea)
- **LinkedIn**: [linkedin.com/in/axeliparrea](https://linkedin.com/in/axeliparrea)

## 📄 License

© 2024 Axel Eduardo Iparrea Ramos. All rights reserved.

---

*Built with ❤️ using React, Vite, and modern web technologies*
