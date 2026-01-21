/**
 * Minister Telegram Channel Analytics Data
 * Data extracted from TGStat screenshots for Sherzod Shermatov
 * Last updated: January 2026
 * 
 * This file is designed for easy updates - simply modify the values below
 */

const DASHBOARD_DATA = {
    // Channel Information
    channel: {
        name: "Sherzod Shermatov",
        handle: "@shshermatov",
        createdDate: "16.12.2019",
        addedToTGStat: "17.12.2019",
        ageYears: 6,
        ageMonths: 1,
        profileImage: "image.png"
    },

    // Key Performance Indicators (Summary)
    kpi: {
        subscribers: {
            total: 8375,
            changeToday: 1,
            changeWeek: -32,
            changeMonth: -84
        },
        citationIndex: {
            value: 479,
            channelsCiting: 1939,
            mentions: 2366,
            reposts: 5831,
            chatsCiting: 307
        },
        avgReach: {
            perPost: 11043,
            err: 131.9,
            err24: 33.9
        },
        adReach: {
            average: 2843,
            reach12h: 2300,
            reach24h: 2800,
            reach48h: 3400
        },
        engagement: {
            rate: 0.9,
            readPosts: 132,
            readIn24h: 34,
            forwards: 40
        },
        publications: {
            total: 738,
            yesterday: 0,
            thisWeek: 1,
            thisMonth: 6
        }
    },

    // Network Mentions
    network: {
        incoming: {
            channels: 1939,
            totalMentions: 7810
        },
        outgoing: {
            channels: 50,
            totalMentions: 218
        }
    },

    // Citation Index Trend (monthly data)
    citationTrend: {
        labels: ["23 Dec", "24 Dec", "25 Dec", "26 Dec", "27 Dec", "28 Dec", "29 Dec", "30 Dec", "31 Dec", "1 Jan", "2 Jan", "3 Jan", "4 Jan", "5 Jan", "6 Jan", "7 Jan", "8 Jan", "9 Jan", "10 Jan", "11 Jan", "12 Jan", "13 Jan", "14 Jan", "15 Jan", "16 Jan", "17 Jan", "18 Jan", "19 Jan", "20 Jan", "21 Jan"],
        values: [475, 476, 477, 478, 479, 479, 480, 481, 482, 483, 484, 485, 485, 484, 483, 482, 481, 480, 479, 478, 479, 480, 480, 479, 479, 479, 479, 479, 479, 479.5]
    },

    // Mentions by Type
    mentionsByType: [
        { type: "Индивидуальные / Individual", count: 938, percentage: 11.9 },
        { type: "Подборки 2-5 каналов / 2-5 channels", count: 3823, percentage: 77.1 },
        { type: "Подборки 6-10 каналов / 6-10 channels", count: 14, percentage: 0.6 },
        { type: "Подборки 11+ каналов / 11+ channels", count: 9, percentage: 0.4 },
        { type: "Навигационные / Navigation", count: 38, percentage: 0.7 }
    ],

    // Mentions by Topic
    mentionsByTopic: [
        { topic: "Новости и СМИ / News & Media", count: 596, percentage: 25.2, color: "#3b82f6" },
        { topic: "Образование / Education", count: 588, percentage: 24.9, color: "#8b5cf6" },
        { topic: "Блоги / Blogs", count: 154, percentage: 6.5, color: "#ec4899" },
        { topic: "Технологии / Technology", count: 105, percentage: 4.4, color: "#14b8a6" },
        { topic: "Политика / Politics", count: 103, percentage: 4.4, color: "#f59e0b" },
        { topic: "Другое / Other", count: 820, percentage: 34.6, color: "#64748b" }
    ],

    // Mentions by Country
    mentionsByCountry: [
        { country: "Узбекистан / Uzbekistan", count: 2305, percentage: 92.6, flag: "🇺🇿" },
        { country: "Россия / Russia", count: 34, percentage: 1.4, flag: "🇷🇺" },
        { country: "Казахстан / Kazakhstan", count: 3, percentage: 0.1, flag: "🇰🇿" },
        { country: "Индия / India", count: 1, percentage: 0.04, flag: "🇮🇳" },
        { country: "Украина / Ukraine", count: 0, percentage: 0, flag: "🇺🇦" }
    ],

    // Reposts and Mentions Dynamics (weekly data)
    repostsDynamics: {
        labels: ["23 Dec", "24 Dec", "25 Dec", "26 Dec", "27 Dec", "28 Dec", "29 Dec", "30 Dec", "31 Dec", "1 Jan", "2 Jan", "3 Jan", "4 Jan", "5 Jan", "6 Jan", "7 Jan", "8 Jan", "9 Jan", "10 Jan", "11 Jan", "12 Jan", "13 Jan", "14 Jan", "15 Jan", "16 Jan", "17 Jan", "18 Jan", "19 Jan", "20 Jan", "21 Jan"],
        mentions: [3, 2, 1, 2, 4, 6, 8, 12, 15, 10, 6, 4, 3, 2, 3, 5, 7, 4, 3, 2, 4, 5, 3, 2, 1, 2, 3, 2, 1, 2],
        reposts: [5, 4, 3, 4, 7, 10, 12, 18, 22, 15, 9, 6, 5, 4, 5, 8, 11, 6, 5, 4, 6, 8, 5, 4, 2, 3, 5, 4, 2, 3]
    },

    // Daily Views Trend
    viewsTrend: {
        labels: ["23 Dec", "26 Dec", "29 Dec", "1 Jan", "4 Jan", "7 Jan", "10 Jan", "13 Jan", "16 Jan", "19 Jan", "21 Jan"],
        views: [1000000, 1100000, 1050000, 2500000, 1200000, 1150000, 1100000, 1080000, 1050000, 1000000, 950000],
        avgLine: [1100000, 1100000, 1100000, 1100000, 1100000, 1100000, 1100000, 1100000, 1100000, 1100000, 1100000]
    },

    // Engagement Rate Trend
    engagementTrend: {
        labels: ["23 Dec", "26 Dec", "29 Dec", "1 Jan", "4 Jan", "7 Jan", "10 Jan", "13 Jan", "16 Jan", "19 Jan", "21 Jan"],
        erPercent: [0.7, 0.75, 0.72, 1.2, 0.85, 0.88, 0.9, 0.92, 0.95, 0.88, 0.9],
        avgInteractions: [15, 18, 20, 25, 28, 32, 35, 38, 42, 45, 48]
    },

    // Subscriber Growth (monthly acquisition)
    subscriberGrowth: [
        { month: "Январь 2025 / January 2025", mentions: 0, cumulativeReach: 288, newSubscribers: 6, mentionsType: "0 упоминаний / 0 mentions" },
        { month: "Декабрь 2024 / December 2024", mentions: 10, cumulativeReach: 40833, newSubscribers: 109, mentionsType: "10 каналов / 10 channels" },
        { month: "Ноябрь 2024 / November 2024", mentions: 6, cumulativeReach: 36807, newSubscribers: 11, mentionsType: "6 каналов / 6 channels" },
        { month: "Октябрь 2024 / October 2024", mentions: 17, cumulativeReach: 212268, newSubscribers: 87, mentionsType: "17 каналов / 17 channels" },
        { month: "Сентябрь 2024 / September 2024", mentions: 12, cumulativeReach: 28604, newSubscribers: 50, mentionsType: "12 упоминаний / 12 mentions" },
        { month: "Август 2024 / August 2024", mentions: 11, cumulativeReach: 257080, newSubscribers: 86, mentionsType: "11 каналов / 11 channels" }
    ],

    // Top/Popular Posts with Telegram links (ordered by popularity/views)
    topPosts: [
        { id: "#766", postId: "766", url: "https://t.me/shshermatov/766", date: "31 Dec 2025", views: 13700, viewsDisplay: "13.7K" },
        { id: "#765", postId: "765", url: "https://t.me/shshermatov/765", date: "25 Dec 2025", views: 8420, viewsDisplay: "8.42K" },
        { id: "#764", postId: "764", url: "https://t.me/shshermatov/764", date: "24 Dec 2025", views: 7410, viewsDisplay: "7.41K" },
        { id: "#768", postId: "768", url: "https://t.me/shshermatov/768", date: "1 Jan 2026", views: 7100, viewsDisplay: "7.1K" },
        { id: "#769", postId: "769", url: "https://t.me/shshermatov/769", date: "14 Jan 2026", views: 2870, viewsDisplay: "2.87K" }
    ],

    // Telegram channel for embeds
    telegramChannel: "shshermatov"
};

// Translations for bilingual support
const TRANSLATIONS = {
    ru: {
        // Header
        channelAge: "6 лет 1 месяц",
        posts: "публикаций",
        exportPdf: "Экспорт PDF",
        lastUpdated: "Обновлено:",
        reportPeriod: "Отчетный период",
        dateRange: "Декабрь 2025 — Январь 2026",

        // KPI Labels
        subscribers: "Подписчики",
        citationIndex: "Индекс цитирования",
        avgReach: "Средний охват",
        engagement: "Вовлеченность",
        adReach: "Рекламный охват",

        // Time periods
        today: "сегодня",
        week: "неделя",
        month: "месяц",

        // Details
        channels: "каналов",
        mentions: "упоминаний",
        reposts: "репостов",
        readPosts: "читают посты",
        within24h: "за 24ч",

        // Chart titles
        citationIndexTrend: "Динамика индекса цитирования",
        mentionsByTopic: "Упоминания по тематикам",
        repostsAndMentions: "Динамика репостов и упоминаний",
        dailyViews: "Просмотры публикаций по дням",
        engagementTrend: "Динамика вовлеченности (ER%)",
        subscriberGrowth: "Привлечение подписчиков",
        topPosts: "Популярные публикации",
        mostPopular: "Самые популярные публикации",
        mentionsByCountry: "Упоминания по странам",
        mentionsByType: "Упоминания по типу",
        networkStats: "Входящие и исходящие упоминания",

        // Table headers
        cumulativeReach: "Суммарный охват",
        newSubscribers: "Новые подписчики",

        // Network
        incomingChannels: "Каналов упоминают",
        outgoingChannels: "Упоминает каналов",
        totalMentions: "всего упоминаний",

        // Footer
        dataSource: "Источник данных:",
        generatedOn: "Сгенерировано:"
    },
    en: {
        // Header
        channelAge: "6 years 1 month",
        posts: "publications",
        exportPdf: "Export PDF",
        lastUpdated: "Updated:",
        reportPeriod: "Report Period",
        dateRange: "December 2025 — January 2026",

        // KPI Labels
        subscribers: "Subscribers",
        citationIndex: "Citation Index",
        avgReach: "Average Reach",
        engagement: "Engagement",
        adReach: "Ad Reach",

        // Time periods
        today: "today",
        week: "week",
        month: "month",

        // Details
        channels: "channels",
        mentions: "mentions",
        reposts: "reposts",
        readPosts: "read posts",
        within24h: "in 24h",

        // Chart titles
        citationIndexTrend: "Citation Index Trend",
        mentionsByTopic: "Mentions by Topic",
        repostsAndMentions: "Reposts & Mentions Dynamics",
        dailyViews: "Daily Publication Views",
        engagementTrend: "Engagement Rate Trend (ER%)",
        subscriberGrowth: "Subscriber Acquisition",
        topPosts: "Popular Posts",
        mostPopular: "Most Popular Posts",
        mentionsByCountry: "Mentions by Country",
        mentionsByType: "Mentions by Type",
        networkStats: "Incoming & Outgoing Mentions",

        // Table headers
        cumulativeReach: "Cumulative Reach",
        newSubscribers: "New Subscribers",

        // Network
        incomingChannels: "Channels mentioning",
        outgoingChannels: "Channels mentioned",
        totalMentions: "total mentions",

        // Footer
        dataSource: "Data source:",
        generatedOn: "Generated:"
    }
};

// Export for use in dashboard.js
window.DASHBOARD_DATA = DASHBOARD_DATA;
window.TRANSLATIONS = TRANSLATIONS;
