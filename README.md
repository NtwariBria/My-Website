# NewsHub - Modern News Website

A fully responsive, modern news website built with HTML, CSS, and JavaScript featuring a clean design, dark/light mode, and interactive elements.

## Features

### 🏠 Homepage
- **Header** with logo, navigation menu, search bar, and theme toggle
- **Breaking News Banner** with animated ticker
- **Featured Article Section** with large image and content
- **News Grid** with filterable categories
- **Responsive Design** that works on all devices

### 📰 Category Pages
- **Dynamic Category Filtering** (Sports, Tech, Politics, Entertainment, Business)
- **Sort Options** (Latest, Popular, Trending)
- **View Toggle** (Grid/List view)
- **Load More** functionality with pagination

### 📄 Article Pages
- **Full Article Content** with rich formatting
- **Related Articles** section
- **Comments System** with user interaction
- **Social Sharing** buttons
- **Author Information** and article metadata

### 🎨 Design Features
- **Dark/Light Mode** toggle with persistent storage
- **Modern CSS Grid/Flexbox** layouts
- **Smooth Animations** and hover effects
- **Mobile-First Responsive** design
- **Professional Typography** with Inter font

### ⚡ Interactive Features
- **Real-time Search** with debounced input
- **Breaking News Ticker** with automatic rotation
- **Newsletter Popup** (appears after 3 seconds)
- **Login/Signup Modals** with form validation
- **Dynamic Date/Time** display
- **Mobile Menu** with hamburger toggle

### 🔧 Technical Features
- **Vanilla JavaScript** (no frameworks)
- **CSS Custom Properties** for theming
- **Local Storage** for user preferences
- **Progressive Enhancement**
- **Accessibility** considerations
- **SEO-friendly** structure

## File Structure

```
News@/
├── index.html          # Homepage
├── category.html       # Category filtering page
├── article.html        # Individual article page
├── styles.css          # Main stylesheet
├── index.js           # JavaScript functionality
└── README.md          # Project documentation
```

## Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in a web browser
3. **Explore** the different pages and features
4. **Test** the responsive design on different screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Customization

### Adding New Categories
1. Update the `newsData` array in `index.js`
2. Add category links to the navigation
3. Update the category descriptions in `setupCategoryPage()`

### Styling Changes
- Modify CSS custom properties in `:root` for colors
- Update breakpoints in media queries for responsive design
- Customize animations and transitions

### Adding Real News Data
- Replace the sample data in `loadNewsData()` with API calls
- Implement the `fetchNewsFromAPI()` function
- Add error handling and loading states

## Features in Detail

### Theme System
The website uses CSS custom properties for theming, making it easy to switch between light and dark modes. The theme preference is saved in localStorage.

### Responsive Design
- **Desktop**: Full grid layout with sidebar navigation
- **Tablet**: Adjusted grid columns and stacked elements
- **Mobile**: Single column layout with collapsible menu

### Search Functionality
- Real-time search across article titles, excerpts, and categories
- Debounced input to prevent excessive API calls
- Clear search results when input is empty

### Performance Optimizations
- Lazy loading for images
- Debounced search input
- Efficient DOM manipulation
- CSS animations with hardware acceleration

## Future Enhancements

- [ ] Real News API integration
- [ ] User authentication system
- [ ] Comment moderation
- [ ] Article bookmarking
- [ ] Push notifications
- [ ] Progressive Web App features
- [ ] Multi-language support
- [ ] Advanced filtering options

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using HTML, CSS, and JavaScript**
