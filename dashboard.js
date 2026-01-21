/**
 * Minister Telegram Channel Analytics Dashboard
 * Main JavaScript file for chart rendering and interactions
 */

// Current language state
let currentLang = 'ru';

// Current theme state
let currentTheme = localStorage.getItem('theme') || 'dark';

// Chart instances storage for potential updates
const charts = {};

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeThemeToggle();
    initializeLanguageToggle();
    animateCounters();
    initializeCharts();
    populateTables();
    initializeExportPdf();
    setDates();
});

// Initialize theme from localStorage or system preference
function initializeTheme() {
    // Check for saved preference, otherwise use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        currentTheme = prefersDark ? 'dark' : 'light';
    }

    // Apply theme
    document.documentElement.setAttribute('data-theme', currentTheme);
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeBtn = document.getElementById('themeToggle');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
        // Toggle theme
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Apply theme
        document.documentElement.setAttribute('data-theme', currentTheme);

        // Save preference
        localStorage.setItem('theme', currentTheme);

        // Update charts for theme
        updateChartsForTheme();
    });
}

// Update chart colors based on theme
function updateChartsForTheme() {
    const textColor = currentTheme === 'light' ? '#475569' : '#94a3b8';
    const gridColor = currentTheme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.05)';

    // Update Chart.js defaults
    Chart.defaults.color = textColor;
    Chart.defaults.borderColor = gridColor;

    // Update existing charts
    Object.values(charts).forEach(chart => {
        if (chart && chart.options) {
            if (chart.options.scales) {
                Object.keys(chart.options.scales).forEach(key => {
                    if (chart.options.scales[key].ticks) {
                        chart.options.scales[key].ticks.color = textColor;
                    }
                    if (chart.options.scales[key].grid) {
                        chart.options.scales[key].grid.color = gridColor;
                    }
                });
            }
            chart.update('none');
        }
    });
}

// Set dynamic dates
function setDates() {
    const now = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formatted = now.toLocaleDateString('ru-RU', options);

    const generatedDate = document.getElementById('generatedDate');
    if (generatedDate) {
        generatedDate.textContent = formatted;
    }
}

// Language toggle functionality
function initializeLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang === currentLang) return;

            currentLang = lang;
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            updateTranslations();
        });
    });
}

// Update all translatable elements
function updateTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    const trans = TRANSLATIONS[currentLang];

    elements.forEach(el => {
        const key = el.dataset.i18n;
        if (trans[key]) {
            el.textContent = trans[key];
        }
    });

    // Update charts with new language labels
    recreateChartsForLanguage();

    // Update tables
    populateTables();
}

// Recreate charts with new language labels
function recreateChartsForLanguage() {
    // Destroy and recreate charts that have language-dependent labels

    // Topics donut chart
    if (charts.topics) {
        charts.topics.destroy();
        createTopicsChart();
    }

    // Reposts chart
    if (charts.reposts) {
        charts.reposts.destroy();
        createRepostsChart();
    }

    // Country chart
    if (charts.country) {
        charts.country.destroy();
        createCountryChart();
    }

    // Mention type chart
    if (charts.mentionType) {
        charts.mentionType.destroy();
        createMentionTypeChart();
    }

    // Engagement chart
    if (charts.engagement) {
        charts.engagement.destroy();
        createEngagementChart();
    }

    // Views chart
    if (charts.views) {
        charts.views.destroy();
        createViewsChart();
    }
}

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const animationDuration = 2000;

    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.count);
        const isFloat = target % 1 !== 0;
        const increment = target / (animationDuration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = isFloat
                    ? current.toFixed(1)
                    : Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = isFloat
                    ? target.toFixed(1)
                    : target.toLocaleString();
            }
        };

        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Chart.js default configuration
Chart.defaults.color = '#94a3b8';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
Chart.defaults.font.family = "'Inter', sans-serif";

// Initialize all charts
function initializeCharts() {
    createCitationChart();
    createTopicsChart();
    createRepostsChart();
    createViewsChart();
    createEngagementChart();
    createCountryChart();
    createMentionTypeChart();
}

// Citation Index Area Chart
function createCitationChart() {
    const ctx = document.getElementById('citationChart');
    if (!ctx) return;

    const data = DASHBOARD_DATA.citationTrend;

    charts.citation = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Citation Index',
                data: data.values,
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#8b5cf6',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#94a3b8',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: (context) => `Index: ${context.parsed.y.toFixed(1)}`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { maxTicksLimit: 10 }
                },
                y: {
                    min: 470,
                    max: 490,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Topics Donut Chart
function createTopicsChart() {
    const ctx = document.getElementById('topicsChart');
    if (!ctx) return;

    const data = DASHBOARD_DATA.mentionsByTopic;

    charts.topics = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.map(d => d.topic.split(' / ')[currentLang === 'ru' ? 0 : 1] || d.topic),
            datasets: [{
                data: data.map(d => d.count),
                backgroundColor: data.map(d => d.color),
                borderColor: '#1e293b',
                borderWidth: 3,
                hoverBorderColor: '#fff',
                hoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#94a3b8',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: (context) => {
                            const item = data[context.dataIndex];
                            return `${item.count} (${item.percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Reposts & Mentions Bar Chart
function createRepostsChart() {
    const ctx = document.getElementById('repostsChart');
    if (!ctx) return;

    const data = DASHBOARD_DATA.repostsDynamics;

    charts.reposts = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: currentLang === 'ru' ? 'Упоминания' : 'Mentions',
                    data: data.mentions,
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderRadius: 4,
                    barPercentage: 0.8,
                    categoryPercentage: 0.7
                },
                {
                    label: currentLang === 'ru' ? 'Репосты' : 'Reposts',
                    data: data.reposts,
                    backgroundColor: 'rgba(20, 184, 166, 0.8)',
                    borderRadius: 4,
                    barPercentage: 0.8,
                    categoryPercentage: 0.7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#94a3b8',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { maxTicksLimit: 10 }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    beginAtZero: true
                }
            }
        }
    });
}

// Views Line Chart
function createViewsChart() {
    const ctx = document.getElementById('viewsChart');
    if (!ctx) return;

    const data = DASHBOARD_DATA.viewsTrend;

    charts.views = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: currentLang === 'ru' ? 'Просмотры' : 'Views',
                    data: data.views,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#94a3b8',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: (context) => {
                            const value = context.parsed.y;
                            if (value >= 1000000) {
                                return `${(value / 1000000).toFixed(1)}M views`;
                            }
                            return `${(value / 1000).toFixed(0)}K views`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        callback: (value) => {
                            if (value >= 1000000) return `${value / 1000000}M`;
                            if (value >= 1000) return `${value / 1000}K`;
                            return value;
                        }
                    }
                }
            }
        }
    });
}

// Engagement Rate Chart
function createEngagementChart() {
    const ctx = document.getElementById('engagementChart');
    if (!ctx) return;

    const data = DASHBOARD_DATA.engagementTrend;

    charts.engagement = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'ER%',
                    data: data.erPercent,
                    borderColor: '#ec4899',
                    backgroundColor: 'rgba(236, 72, 153, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#ec4899',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: currentLang === 'ru' ? 'Взаимодействия' : 'Interactions',
                    data: data.avgInteractions,
                    borderColor: '#8b5cf6',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    tension: 0.4,
                    pointRadius: 0,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'line',
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#94a3b8',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        callback: (value) => value + '%'
                    }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    grid: { display: false }
                }
            }
        }
    });
}

// Country Horizontal Bar Chart
function createCountryChart() {
    const ctx = document.getElementById('countryChart');
    if (!ctx) return;

    const data = DASHBOARD_DATA.mentionsByCountry;

    charts.country = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => `${d.flag} ${d.country.split(' / ')[currentLang === 'ru' ? 0 : 1] || d.country}`),
            datasets: [{
                data: data.map(d => d.count),
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(249, 115, 22, 0.8)',
                    'rgba(100, 116, 139, 0.8)'
                ],
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#94a3b8',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: (context) => {
                            const item = data[context.dataIndex];
                            return `${item.count} (${item.percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    beginAtZero: true
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });
}

// Mention Type Bar Chart
function createMentionTypeChart() {
    const ctx = document.getElementById('mentionTypeChart');
    if (!ctx) return;

    const data = DASHBOARD_DATA.mentionsByType;

    charts.mentionType = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => {
                const parts = d.type.split(' / ');
                const label = currentLang === 'ru' ? parts[0] : (parts[1] || parts[0]);
                return label.length > 20 ? label.substring(0, 20) + '...' : label;
            }),
            datasets: [{
                data: data.map(d => d.count),
                backgroundColor: [
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(20, 184, 166, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#94a3b8',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: (context) => {
                            const item = data[context.dataIndex];
                            return `${item.count} (${item.percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    beginAtZero: true
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });
}

// Populate data tables
function populateTables() {
    populateSubscriberTable();
    populatePostsList();
}

// Subscriber Growth Table
function populateSubscriberTable() {
    const tbody = document.querySelector('#subscriberTable tbody');
    if (!tbody) return;

    const data = DASHBOARD_DATA.subscriberGrowth;

    tbody.innerHTML = data.map(row => {
        const monthDisplay = currentLang === 'ru'
            ? row.month.split(' / ')[0]
            : row.month.split(' / ')[1] || row.month;
        const mentionsDisplay = currentLang === 'ru'
            ? row.mentionsType.split(' / ')[0]
            : row.mentionsType.split(' / ')[1] || row.mentionsType;
        const changeClass = row.newSubscribers > 0 ? 'positive' : 'negative';

        return `
            <tr>
                <td>${monthDisplay}</td>
                <td>${mentionsDisplay}</td>
                <td>${row.cumulativeReach.toLocaleString()}</td>
                <td class="${changeClass}">+${row.newSubscribers}</td>
            </tr>
        `;
    }).join('');
}

// Top Posts List
function populatePostsList() {
    const container = document.getElementById('postsList');
    if (!container) return;

    const data = DASHBOARD_DATA.topPosts;

    container.innerHTML = data.map((post, index) => `
        <div class="post-item">
            <div class="post-rank">${index + 1}</div>
            <div class="post-info">
                <div class="post-id">Post ${post.id}</div>
                <div class="post-date">${post.date}</div>
            </div>
            <div class="post-stats">
                <span class="post-stat">
                    <span class="post-stat-icon">👁️</span>
                    ${post.views.toLocaleString()}
                </span>
                <span class="post-stat">
                    <span class="post-stat-icon">❤️</span>
                    ${post.reactions}
                </span>
            </div>
        </div>
    `).join('');
}

// PDF Export functionality
function initializeExportPdf() {
    const exportBtn = document.getElementById('exportPdf');
    if (!exportBtn) return;

    exportBtn.addEventListener('click', async () => {
        const dashboard = document.getElementById('dashboard');
        const originalText = exportBtn.innerHTML;

        // Show loading state
        exportBtn.innerHTML = '<span class="export-icon">⏳</span> Generating...';
        exportBtn.disabled = true;

        try {
            // Check if libraries are loaded
            if (typeof html2canvas === 'undefined') {
                throw new Error('html2canvas library not loaded');
            }
            if (typeof window.jspdf === 'undefined') {
                throw new Error('jsPDF library not loaded');
            }

            // Add export mode class
            document.body.classList.add('pdf-export-mode');

            // Wait for styles to apply and animations to complete
            await new Promise(resolve => setTimeout(resolve, 800));

            // Store original scrollY position
            const scrollY = window.scrollY;
            window.scrollTo(0, 0);

            // Generate canvas with better settings
            const canvas = await html2canvas(dashboard, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#0f172a',
                logging: false,
                width: dashboard.scrollWidth,
                height: dashboard.scrollHeight,
                windowWidth: dashboard.scrollWidth,
                windowHeight: dashboard.scrollHeight,
                onclone: (clonedDoc) => {
                    // Hide export button in cloned document
                    const clonedActions = clonedDoc.querySelector('.header-actions');
                    if (clonedActions) {
                        clonedActions.style.visibility = 'hidden';
                    }
                    // Ensure all text is visible
                    const clonedBody = clonedDoc.body;
                    clonedBody.style.overflow = 'visible';
                    clonedBody.style.height = 'auto';
                }
            });

            // Restore scroll position
            window.scrollTo(0, scrollY);

            // Get jsPDF constructor
            const { jsPDF } = window.jspdf;

            // Calculate dimensions - use portrait for tall content
            const imgData = canvas.toDataURL('image/png', 1.0);
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            // A4 dimensions in points (1 inch = 72 points)
            const a4Width = 595.28;
            const a4Height = 841.89;

            // Calculate scale to fit width
            const ratio = a4Width / imgWidth;
            const scaledHeight = imgHeight * ratio;

            // Create PDF in portrait mode
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4'
            });

            // Calculate number of pages needed
            const pagesNeeded = Math.ceil(scaledHeight / a4Height);

            // Add image across multiple pages
            for (let page = 0; page < pagesNeeded; page++) {
                if (page > 0) {
                    pdf.addPage();
                }

                // Calculate y offset for this page
                const yOffset = -(page * a4Height);

                pdf.addImage(
                    imgData,
                    'PNG',
                    0,
                    yOffset,
                    a4Width,
                    scaledHeight
                );
            }

            // Generate filename with date
            const now = new Date();
            const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
            const filename = `telegram-analytics-${dateStr}.pdf`;

            // Save PDF
            pdf.save(filename);

        } catch (error) {
            console.error('PDF export failed:', error);
            alert('PDF export failed: ' + error.message + '\n\nPlease try refreshing the page and try again.');
        } finally {
            // Restore button state
            document.body.classList.remove('pdf-export-mode');
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
        }
    });
}

// Utility function to format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Handle profile image load error
document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.getElementById('profileImage');
    if (profileImg) {
        profileImg.addEventListener('error', () => {
            profileImg.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%231e293b" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%2394a3b8" font-size="40" font-family="Inter">S</text></svg>';
        });
    }
});
