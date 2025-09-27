// News Website JavaScript
class NewsWebsite {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.newsData = [];
        this.currentCategory = 'all';
        this.currentPage = 1;
        this.newsPerPage = 6;
        this.isLoading = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeTheme();
        this.updateDateTime();
        this.loadNewsData();
        this.setupBreakingNewsTicker();
        this.setupNewsletterPopup();
        this.setupModals();
        this.setupMobileMenu();
        this.setupSearch();
        this.setupCategoryPage();
        this.setupArticlePage();
        
        // Update time every minute
        setInterval(() => this.updateDateTime(), 60000);
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.querySelector('.search-btn');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
        }

        // Filter tabs
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.filterByCategory(e.target.dataset.category));
        });

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreNews());
        }

        // View controls
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleView(e.target.dataset.view));
        });

        // Sort controls
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => this.sortNews(e.target.value));
        }
    }

    initializeTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.initializeTheme();
    }

    updateDateTime() {
        const now = new Date();
        const dateOptions = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
        };

        // Update date elements
        const dateElements = document.querySelectorAll('#currentDate, #articleDate');
        dateElements.forEach(el => {
            if (el) el.textContent = now.toLocaleDateString('en-US', dateOptions);
        });

        // Update time elements
        const timeElements = document.querySelectorAll('#currentTime');
        timeElements.forEach(el => {
            if (el) el.textContent = now.toLocaleTimeString('en-US', timeOptions);
        });
    }

    setupBreakingNewsTicker() {
        const ticker = document.getElementById('breakingTicker');
        if (!ticker) return;

        const newsItems = ticker.querySelectorAll('span');
        let currentIndex = 0;

        setInterval(() => {
            newsItems.forEach((item, index) => {
                item.style.display = index === currentIndex ? 'inline-block' : 'none';
            });
            currentIndex = (currentIndex + 1) % newsItems.length;
        }, 5000);
    }

    loadNewsData() {
        // Sample news data - in a real app, this would come from an API
        this.newsData = [
            {
                id: 1,
                title: "Revolutionary AI Technology Transforms Healthcare Industry",
                excerpt: "A groundbreaking artificial intelligence system has been developed that can diagnose diseases with 99% accuracy, potentially revolutionizing patient care and medical research worldwide.",
                category: "tech",
                image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                date: "2024-01-15",
                author: "Dr. Sarah Johnson",
                readTime: "5 min read",
                featured: true
            },
            {
                id: 2,
                title: "Olympic Games 2024: Record-Breaking Performances Expected",
                excerpt: "Athletes from around the world are preparing for what promises to be the most competitive Olympic Games in history, with several world records expected to fall.",
                category: "sports",
                image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                date: "2024-01-14",
                author: "Mike Thompson",
                readTime: "3 min read"
            },
            {
                id: 3,
                title: "Global Climate Summit Reaches Historic Agreement",
                excerpt: "World leaders have reached a landmark agreement on climate action, committing to net-zero emissions by 2050 and significant investment in renewable energy.",
                category: "politics",
                image: "https://images.unsplash.com/photo-1569163139394-de6e4c2b8b0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                date: "2024-01-13",
                author: "Emma Wilson",
                readTime: "4 min read"
            },
            {
                id: 4,
                title: "New Streaming Service Launches with Exclusive Content",
                excerpt: "A major entertainment company has launched a new streaming platform featuring exclusive original series and movies from top creators.",
                category: "entertainment",
                image: "https://images.unsplash.com/photo-1489599800000-2b0b0a0b0b0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                date: "2024-01-12",
                author: "Lisa Chen",
                readTime: "2 min read"
            },
            {
                id: 5,
                title: "Stock Market Reaches New All-Time High",
                excerpt: "Major stock indices have reached record levels as investors show confidence in economic recovery and technological innovation.",
                category: "business",
                image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                date: "2024-01-11",
                author: "David Rodriguez",
                readTime: "3 min read"
            },
            {
                id: 6,
                title: "Space Mission Discovers Water on Mars",
                excerpt: "NASA's latest Mars rover has discovered significant evidence of water ice beneath the planet's surface, opening new possibilities for future exploration.",
                category: "tech",
                image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                date: "2024-01-10",
                author: "Dr. Alex Kim",
                readTime: "4 min read"
            },
            {
                id: 7,
                title: "Championship Finals Set for This Weekend",
                excerpt: "The two best teams in the league will face off in what promises to be an epic championship game this Saturday.",
                category: "sports",
                image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                date: "2024-01-09",
                author: "Sarah Martinez",
                readTime: "2 min read"
            },
            {
                id: 8,
                title: "New Electric Vehicle Breaks Distance Record",
                excerpt: "A revolutionary electric car has achieved a record-breaking 500-mile range on a single charge, marking a major milestone in EV technology.",
                category: "tech",
                image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                date: "2024-01-08",
                author: "Tom Anderson",
                readTime: "3 min read"
            }
        ];

        this.renderNewsGrid();
    }

    renderNewsGrid() {
        const newsGrid = document.getElementById('newsGrid') || document.getElementById('categoryNewsGrid');
        if (!newsGrid) return;

        const filteredNews = this.getFilteredNews();
        const startIndex = (this.currentPage - 1) * this.newsPerPage;
        const endIndex = startIndex + this.newsPerPage;
        const newsToShow = filteredNews.slice(0, endIndex);

        newsGrid.innerHTML = newsToShow.map(article => this.createNewsCard(article)).join('');

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = endIndex < filteredNews.length ? 'block' : 'none';
        }
    }

    createNewsCard(article) {
        const categoryColors = {
            tech: '#3b82f6',
            sports: '#10b981',
            politics: '#ef4444',
            entertainment: '#8b5cf6',
            business: '#f59e0b'
        };

        return `
            <article class="news-card fade-in" data-category="${article.category}">
                <div class="news-card-image">
                    <img src="${article.image}" alt="${article.title}" loading="lazy">
                </div>
                <div class="news-card-content">
                    <div class="news-card-meta">
                        <span class="news-card-category" style="background-color: ${categoryColors[article.category] || '#6b7280'}">
                            ${article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                        </span>
                        <span class="news-card-date">${this.formatDate(article.date)}</span>
                    </div>
                    <h3 class="news-card-title">${article.title}</h3>
                    <p class="news-card-excerpt">${article.excerpt}</p>
                    <a href="article.html?id=${article.id}" class="news-card-link">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `;
    }

    getFilteredNews() {
        let filtered = this.newsData;
        
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(article => article.category === this.currentCategory);
        }

        return filtered;
    }

    filterByCategory(category) {
        this.currentCategory = category;
        this.currentPage = 1;

        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        this.renderNewsGrid();
    }

    handleSearch(query) {
        if (query.length < 2) {
            this.renderNewsGrid();
            return;
        }

        const filteredNews = this.newsData.filter(article => 
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            article.category.toLowerCase().includes(query.toLowerCase())
        );

        const newsGrid = document.getElementById('newsGrid') || document.getElementById('categoryNewsGrid');
        if (newsGrid) {
            newsGrid.innerHTML = filteredNews.map(article => this.createNewsCard(article)).join('');
        }
    }

    performSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            this.handleSearch(searchInput.value);
        }
    }

    loadMoreNews() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.textContent = 'Loading...';
            loadMoreBtn.disabled = true;
        }

        // Simulate loading delay
        setTimeout(() => {
            this.currentPage++;
            this.renderNewsGrid();
            this.isLoading = false;
            
            if (loadMoreBtn) {
                loadMoreBtn.textContent = 'Load More News';
                loadMoreBtn.disabled = false;
            }
        }, 1000);
    }

    sortNews(sortBy) {
        let sortedNews = [...this.newsData];
        
        switch (sortBy) {
            case 'latest':
                sortedNews.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'popular':
                // Simulate popularity based on ID (higher ID = more popular)
                sortedNews.sort((a, b) => b.id - a.id);
                break;
            case 'trending':
                // Simulate trending based on category and date
                sortedNews.sort((a, b) => {
                    const categoryWeight = { tech: 4, sports: 3, politics: 2, entertainment: 1, business: 1 };
                    return (categoryWeight[b.category] || 0) - (categoryWeight[a.category] || 0);
                });
                break;
        }

        this.newsData = sortedNews;
        this.renderNewsGrid();
    }

    toggleView(view) {
        const newsGrid = document.getElementById('newsGrid') || document.getElementById('categoryNewsGrid');
        if (!newsGrid) return;

        // Update active view button
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        // Toggle grid/list view
        if (view === 'list') {
            newsGrid.classList.add('list-view');
        } else {
            newsGrid.classList.remove('list-view');
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navList = document.querySelector('.nav-list');
        
        if (mobileMenuToggle && navList) {
            mobileMenuToggle.addEventListener('click', () => {
                navList.classList.toggle('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.className = navList.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
                }
            });
        }
    }

    setupNewsletterPopup() {
        // Show newsletter popup after 3 seconds
        setTimeout(() => {
            const popup = document.getElementById('newsletterPopup');
            if (popup && !localStorage.getItem('newsletterShown')) {
                popup.classList.add('active');
                localStorage.setItem('newsletterShown', 'true');
            }
        }, 3000);

        // Close popup
        const popupClose = document.getElementById('popupClose');
        if (popupClose) {
            popupClose.addEventListener('click', () => {
                document.getElementById('newsletterPopup').classList.remove('active');
            });
        }

        // Newsletter form submission
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = e.target.querySelector('input[type="email"]').value;
                if (email) {
                    alert('Thank you for subscribing to our newsletter!');
                    document.getElementById('newsletterPopup').classList.remove('active');
                    e.target.reset();
                }
            });
        }
    }

    setupModals() {
        // Login modal
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const modalClose = document.getElementById('modalClose');
        const showSignup = document.getElementById('showSignup');
        const showLogin = document.getElementById('showLogin');
        const signupModal = document.getElementById('signupModal');
        const signupModalClose = document.getElementById('signupModalClose');

        if (loginBtn && loginModal) {
            loginBtn.addEventListener('click', () => {
                loginModal.classList.add('active');
            });
        }

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                loginModal.classList.remove('active');
            });
        }

        if (showSignup && signupModal) {
            showSignup.addEventListener('click', (e) => {
                e.preventDefault();
                loginModal.classList.remove('active');
                signupModal.classList.add('active');
            });
        }

        if (showLogin && loginModal) {
            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                signupModal.classList.remove('active');
                loginModal.classList.add('active');
            });
        }

        if (signupModalClose) {
            signupModalClose.addEventListener('click', () => {
                signupModal.classList.remove('active');
            });
        }

        // Close modals when clicking outside
        [loginModal, signupModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                    }
                });
            }
        });

        // Form submissions
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Login functionality would be implemented here!');
                loginModal.classList.remove('active');
            });
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Signup functionality would be implemented here!');
                signupModal.classList.remove('active');
            });
        }
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.handleSearch(e.target.value);
                }, 300);
            });
        }
    }

    setupCategoryPage() {
        // Get category from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('cat');
        
        if (category) {
            this.currentCategory = category;
            
            // Update page title and breadcrumb
            const categoryTitle = document.getElementById('categoryTitle');
            const categoryName = document.getElementById('categoryName');
            const categoryDescription = document.getElementById('categoryDescription');
            
            if (categoryTitle) {
                categoryTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} News`;
            }
            
            if (categoryName) {
                categoryName.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            }
            
            if (categoryDescription) {
                const descriptions = {
                    sports: 'Stay updated with the latest sports news, scores, and analysis.',
                    tech: 'Get the latest technology news, reviews, and innovations.',
                    politics: 'Follow political developments and policy changes.',
                    entertainment: 'Entertainment news, celebrity updates, and cultural events.',
                    business: 'Business news, market updates, and economic analysis.'
                };
                categoryDescription.textContent = descriptions[category] || 'Stay updated with the latest news in this category.';
            }
            
            // Filter news by category
            this.filterByCategory(category);
        }
    }

    setupArticlePage() {
        // Get article ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        
        if (articleId) {
            const article = this.newsData.find(a => a.id == articleId);
            if (article) {
                this.loadArticle(article);
                this.loadRelatedArticles(article);
                this.loadComments();
            }
        }
    }

    loadArticle(article) {
        // Update article content
        const elements = {
            'articleTitleText': article.title,
            'articleSubtitle': article.excerpt,
            'articleCategory': article.category.charAt(0).toUpperCase() + article.category.slice(1),
            'articleImage': article.image,
            'imageCaption': `Featured image for: ${article.title}`,
            'readTime': article.readTime
        };

        Object.entries(elements).forEach(([id, content]) => {
            const element = document.getElementById(id);
            if (element) {
                if (id === 'articleImage') {
                    element.src = content;
                    element.alt = article.title;
                } else {
                    element.textContent = content;
                }
            }
        });

        // Update category link
        const categoryLink = document.getElementById('articleCategoryLink');
        if (categoryLink) {
            categoryLink.href = `category.html?cat=${article.category}`;
        }

        // Update page title
        document.title = `${article.title} - NewsHub`;
    }

    loadRelatedArticles(currentArticle) {
        const relatedGrid = document.getElementById('relatedGrid');
        if (!relatedGrid) return;

        const relatedArticles = this.newsData
            .filter(article => article.id !== currentArticle.id && article.category === currentArticle.category)
            .slice(0, 3);

        relatedGrid.innerHTML = relatedArticles.map(article => this.createNewsCard(article)).join('');
    }

    loadComments() {
        const commentsList = document.getElementById('commentsList');
        if (!commentsList) return;

        // Sample comments
        const comments = [
            {
                author: 'John Doe',
                date: '2024-01-15',
                text: 'This is a fascinating development! The implications for healthcare are enormous.'
            },
            {
                author: 'Jane Smith',
                date: '2024-01-14',
                text: 'I wonder how this will affect traditional medical practices. Very interesting article.'
            },
            {
                author: 'Mike Johnson',
                date: '2024-01-13',
                text: 'The accuracy rate is impressive. Looking forward to seeing this technology in action.'
            }
        ];

        commentsList.innerHTML = comments.map(comment => `
            <div class="comment">
                <div class="comment-author">${comment.author}</div>
                <div class="comment-date">${this.formatDate(comment.date)}</div>
                <div class="comment-text">${comment.text}</div>
            </div>
        `).join('');

        // Comment form submission
        const commentForm = document.querySelector('.comment-form');
        const commentText = document.getElementById('commentText');
        const commentSubmitBtn = document.querySelector('.comment-submit-btn');

        if (commentSubmitBtn) {
            commentSubmitBtn.addEventListener('click', () => {
                if (commentText && commentText.value.trim()) {
                    const newComment = {
                        author: 'Anonymous User',
                        date: new Date().toISOString().split('T')[0],
                        text: commentText.value.trim()
                    };
                    
                    commentsList.insertAdjacentHTML('beforeend', `
                        <div class="comment">
                            <div class="comment-author">${newComment.author}</div>
                            <div class="comment-date">${this.formatDate(newComment.date)}</div>
                            <div class="comment-text">${newComment.text}</div>
                        </div>
                    `);
                    
                    commentText.value = '';
                }
            });
        }
    }
}

// Initialize the news website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NewsWebsite();
});

// Add some additional utility functions
window.NewsWebsite = {
    // Function to simulate API calls
    async fetchNewsFromAPI(category = 'all') {
        // In a real implementation, this would make an actual API call
        // For now, we'll return a promise that resolves with sample data
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    articles: [],
                    totalResults: 0,
                    status: 'ok'
                });
            }, 1000);
        });
    },

    // Function to handle social sharing
    shareArticle(platform, url, title) {
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    },

    // Function to handle newsletter subscription
    subscribeToNewsletter(email) {
        // In a real implementation, this would send the email to a backend service
        console.log('Newsletter subscription:', email);
        return Promise.resolve({ success: true });
    }
};

// Add smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading states and error handling
window.addEventListener('load', () => {
    // Remove any loading spinners
    document.querySelectorAll('.loading-spinner').forEach(spinner => {
        spinner.style.display = 'none';
    });
    
    // Add fade-in animation to main content
    document.querySelectorAll('.news-card, .featured-article').forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in');
    });
});

// Handle offline/online status
window.addEventListener('online', () => {
    console.log('Connection restored');
    // Could show a notification or retry failed requests
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    // Could show a notification about offline status
});