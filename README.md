# Sharique's Interactive Gaming Portfolio

An immersive 3D gaming-inspired portfolio that mirrors your real mouse movements and keyboard inputs in a virtual gaming setup.

## 🎮 Features

- **Real-time Input Mirroring**: Your mouse movements control a virtual mouse, keyboard presses light up virtual keys
- **Interactive Gaming Setup**: Realistic monitor, keyboard, mouse, and RGB PC tower
- **Desktop Environment**: 4 interactive apps (AI Assistant, Experience, Projects, Education)
- **AI Chat Bot**: Ask questions about Sharique's background, skills, and experience
- **Smooth Animations**: Professional 3D effects and transitions
- **Responsive Design**: Works on desktop browsers

## 🚀 Quick Start

### Method 1: Download & Run Locally

1. **Download all files** to a folder on your computer:
   - `index.html`
   - `styles.css` 
   - `script.js`
   - `README.md`

2. **Open the project**:
   - Double-click `index.html` to open in your default browser
   - OR right-click → "Open with" → Choose your browser

3. **Experience the portfolio**:
   - Click "START EXPERIENCE" 
   - Move your mouse and type to see the magic!
   - Click the 4 desktop apps to explore

### Method 2: Run with Local Server (Recommended)

For the best experience, run with a local server:

#### Using Python (if installed):
```bash
# Navigate to project folder
cd path/to/your/portfolio

# Python 3
python -m http.server 8000

# Python 2 
python -m SimpleHTTPServer 8000

# Open browser to: http://localhost:8000
```

#### Using Node.js (if installed):
```bash
# Install http-server globally
npm install -g http-server

# Navigate to project folder and run
cd path/to/your/portfolio
http-server

# Open browser to displayed URL
```

#### Using Live Server (VS Code):
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` 
3. Select "Open with Live Server"

## 🎯 How It Works

1. **Start Screen**: Click "START EXPERIENCE" to reveal the gaming setup
2. **Mouse Mirroring**: Move your mouse → virtual mouse moves on the mousepad
3. **Keyboard Mirroring**: Type on your keyboard → virtual keys light up
4. **Apps**: Click the 4 desktop icons to explore different sections
5. **AI Assistant**: Chat with an AI that knows all about Sharique

## 📱 Apps Included

- **🤖 AI Assistant**: Interactive chat bot with knowledge about Sharique
- **💼 Experience**: Professional work history and internships  
- **🚀 Projects**: Technical projects and accomplishments
- **🎓 Education**: Penn State degree, GPA, achievements, and skills

## 🛠️ Customization

### Update Personal Information

Edit the `knowledgeBase` object in `script.js` to customize AI responses:

```javascript
const knowledgeBase = {
    skills: "Your skills here...",
    experience: "Your experience here...", 
    education: "Your education here...",
    projects: "Your projects here...",
    contact: "Your contact info here...",
    background: "Your background here..."
};
```

### Update App Content

Modify the HTML in `index.html` within each app window section:
- Experience cards: `.experience-grid`
- Project cards: `.project-grid` 
- Education cards: `.education-grid`

### Customize Styling

Edit `styles.css` to change:
- Colors and gradients
- Fonts and sizes
- Animations and effects
- Layout and spacing

## 🔧 Technical Details

- **Frontend Only**: Pure HTML, CSS, JavaScript
- **3D Library**: Three.js for WebGL graphics (loaded from CDN)
- **Responsive**: Works on desktop browsers
- **Modern CSS**: Uses backdrop-filter, gradients, and animations
- **No Dependencies**: Except Three.js CDN for 3D effects

## 📂 File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles  
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🌐 Browser Compatibility

- **Recommended**: Chrome, Firefox, Safari, Edge (latest versions)
- **Requirements**: WebGL support for 3D effects
- **Mobile**: Desktop experience recommended for full interactivity

## 🚀 Deployment Options

### GitHub Pages
1. Upload files to GitHub repository
2. Enable GitHub Pages in repo settings
3. Share the generated URL

### Netlify
1. Drag folder to [netlify.com/drop](https://netlify.com/drop)
2. Get instant live URL

### Vercel
1. Upload to Vercel dashboard
2. Deploy with one click

## 📄 License

Free to use and modify for personal/educational purposes.

## 🎉 Credits

Created with inspiration from Bruno Simon's interactive portfolio approach, featuring real-time input mirroring and immersive 3D gaming aesthetics.

---

**Enjoy your interactive gaming portfolio! 🎮✨**

---
This version adds a Flask backend with an /ask endpoint and optional RAG.
