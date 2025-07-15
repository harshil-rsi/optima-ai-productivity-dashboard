// Dashboard Configuration
const DASHBOARD_CONFIG = {
    colors: {
        primary: '#7c3aed',
        secondary: '#06b6d4',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        background: '#21262d',
        text: '#f0f6fc'
    },
    apiEndpoints: {
        github: '/api/github-metrics',
        atlassian: '/api/atlassian-metrics',
        aiMetrics: '/api/ai-metrics'
    }
};

// Chart instances
let charts = {};

// Sample data - In production, this would come from APIs
const SAMPLE_DATA = {
    aiGeneration: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        linesGenerated: [1200, 1850, 2100, 2450, 2800, 3200],
        acceptanceRate: [68, 71, 73, 75, 78, 73],
        suggestions: [2400, 3100, 3800, 4200, 4600, 5100]
    },
    doraMetrics: {
        deploymentFrequency: 12.5, // per week
        leadTime: 2.3, // days
        mttr: 0.8, // hours
        changeFailure: 5.2 // percentage
    },
    prPerformance: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        created: [12, 15, 18, 22, 19, 8, 4],
        merged: [8, 12, 14, 18, 16, 6, 3],
        avgReviewTime: [4.2, 3.8, 4.5, 5.1, 4.7, 3.2, 2.8]
    },
    teamProductivity: {
        teams: ['Frontend', 'Backend', 'Mobile', 'DevOps'],
        aiAdoption: [85, 92, 76, 68],
        productivity: [2.4, 2.8, 2.1, 1.9],
        codeGeneration: [3200, 4100, 2800, 1900]
    },
    codeQuality: {
        labels: ['Pre-AI', 'Post-AI'],
        bugDensity: [12.5, 7.8],
        codeReviews: [5.2, 3.8],
        testCoverage: [78, 87]
    },
    developers: [
        { name: 'Sarah Chen', aiLines: 4200, acceptance: 82, prs: 24, cycleTime: '3.2h', score: 'High' },
        { name: 'Mike Rodriguez', aiLines: 3800, acceptance: 79, prs: 21, cycleTime: '3.8h', score: 'High' },
        { name: 'Alex Kim', aiLines: 3500, acceptance: 75, prs: 19, cycleTime: '4.1h', score: 'Medium' },
        { name: 'Emma Wilson', aiLines: 3200, acceptance: 77, prs: 18, cycleTime: '3.9h', score: 'Medium' },
        { name: 'David Brown', aiLines: 2900, acceptance: 71, prs: 16, cycleTime: '4.5h', score: 'Medium' }
    ],
    projects: [
        { name: 'E-commerce Platform', adoption: 89, coverage: 92, bugDensity: 6.2, deployFreq: '2.3/week', leadTime: '1.8d' },
        { name: 'Mobile App', adoption: 76, coverage: 84, bugDensity: 8.9, deployFreq: '1.8/week', leadTime: '2.4d' },
        { name: 'API Gateway', adoption: 94, coverage: 96, bugDensity: 4.1, deployFreq: '3.1/week', leadTime: '1.2d' },
        { name: 'Analytics Dashboard', adoption: 82, coverage: 88, bugDensity: 7.5, deployFreq: '2.0/week', leadTime: '2.1d' }
    ]
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
    populateTables();
    updateLastUpdatedTime();
});

// Dashboard initialization
function initializeDashboard() {
    initializeCharts();
    animateMetricCards();
}

// Chart initialization
function initializeCharts() {
    initAIGenerationChart();
    initDORAChart();
    initPRPerformanceChart();
    initTeamProductivityChart();
    initCodeQualityChart();
    initUsagePatternsChart();
}

// AI Generation Trends Chart
function initAIGenerationChart() {
    const ctx = document.getElementById('aiGenerationChart').getContext('2d');
    
    charts.aiGeneration = new Chart(ctx, {
        type: 'line',
        data: {
            labels: SAMPLE_DATA.aiGeneration.labels,
            datasets: [{
                label: 'Lines Generated',
                data: SAMPLE_DATA.aiGeneration.linesGenerated,
                borderColor: DASHBOARD_CONFIG.colors.primary,
                backgroundColor: DASHBOARD_CONFIG.colors.primary + '20',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: DASHBOARD_CONFIG.colors.text
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: '#30363d'
                    },
                    ticks: {
                        color: DASHBOARD_CONFIG.colors.text
                    }
                },
                y: {
                    grid: {
                        color: '#30363d'
                    },
                    ticks: {
                        color: DASHBOARD_CONFIG.colors.text
                    }
                }
            }
        }
    });
}

// DORA Metrics Chart
function initDORAChart() {
    const ctx = document.getElementById('doraChart').getContext('2d');
    
    charts.dora = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Deployment Frequency', 'Lead Time', 'MTTR', 'Change Failure'],
            datasets: [{
                data: [
                    SAMPLE_DATA.doraMetrics.deploymentFrequency,
                    SAMPLE_DATA.doraMetrics.leadTime,
                    SAMPLE_DATA.doraMetrics.mttr,
                    SAMPLE_DATA.doraMetrics.changeFailure
                ],
                backgroundColor: [
                    DASHBOARD_CONFIG.colors.success,
                    DASHBOARD_CONFIG.colors.primary,
                    DASHBOARD_CONFIG.colors.warning,
                    DASHBOARD_CONFIG.colors.error
                ],
                borderColor: DASHBOARD_CONFIG.colors.background,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: DASHBOARD_CONFIG.colors.text,
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// PR Performance Chart
function initPRPerformanceChart() {
    const ctx = document.getElementById('prPerformanceChart').getContext('2d');
    
    charts.prPerformance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: SAMPLE_DATA.prPerformance.labels,
            datasets: [{
                label: 'PRs Created',
                data: SAMPLE_DATA.prPerformance.created,
                backgroundColor: DASHBOARD_CONFIG.colors.primary + '80',
                borderColor: DASHBOARD_CONFIG.colors.primary,
                borderWidth: 1
            }, {
                label: 'PRs Merged',
                data: SAMPLE_DATA.prPerformance.merged,
                backgroundColor: DASHBOARD_CONFIG.colors.success + '80',
                borderColor: DASHBOARD_CONFIG.colors.success,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: DASHBOARD_CONFIG.colors.text
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: '#30363d'
                    },
                    ticks: {
                        color: DASHBOARD_CONFIG.colors.text
                    }
                },
                y: {
                    grid: {
                        color: '#30363d'
                    },
                    ticks: {
                        color: DASHBOARD_CONFIG.colors.text
                    }
                }
            }
        }
    });
}

// Team Productivity Chart
function initTeamProductivityChart() {
    const ctx = document.getElementById('teamProductivityChart').getContext('2d');
    
    charts.teamProductivity = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: SAMPLE_DATA.teamProductivity.teams,
            datasets: [{
                label: 'AI Adoption %',
                data: SAMPLE_DATA.teamProductivity.aiAdoption,
                borderColor: DASHBOARD_CONFIG.colors.primary,
                backgroundColor: DASHBOARD_CONFIG.colors.primary + '30',
                pointBackgroundColor: DASHBOARD_CONFIG.colors.primary
            }, {
                label: 'Productivity Gain',
                data: SAMPLE_DATA.teamProductivity.productivity.map(x => x * 25), // Scale for radar
                borderColor: DASHBOARD_CONFIG.colors.secondary,
                backgroundColor: DASHBOARD_CONFIG.colors.secondary + '30',
                pointBackgroundColor: DASHBOARD_CONFIG.colors.secondary
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: DASHBOARD_CONFIG.colors.text
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: '#30363d'
                    },
                    pointLabels: {
                        color: DASHBOARD_CONFIG.colors.text
                    },
                    ticks: {
                        color: DASHBOARD_CONFIG.colors.text,
                        backdropColor: 'transparent'
                    }
                }
            }
        }
    });
}

// Code Quality Impact Chart
function initCodeQualityChart() {
    const ctx = document.getElementById('codeQualityChart').getContext('2d');
    
    charts.codeQuality = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: SAMPLE_DATA.codeQuality.labels,
            datasets: [{
                label: 'Bug Density',
                data: SAMPLE_DATA.codeQuality.bugDensity,
                backgroundColor: DASHBOARD_CONFIG.colors.error + '80',
                borderColor: DASHBOARD_CONFIG.colors.error,
                borderWidth: 1
            }, {
                label: 'Review Time (hours)',
                data: SAMPLE_DATA.codeQuality.codeReviews,
                backgroundColor: DASHBOARD_CONFIG.colors.warning + '80',
                borderColor: DASHBOARD_CONFIG.colors.warning,
                borderWidth: 1
            }, {
                label: 'Test Coverage %',
                data: SAMPLE_DATA.codeQuality.testCoverage,
                backgroundColor: DASHBOARD_CONFIG.colors.success + '80',
                borderColor: DASHBOARD_CONFIG.colors.success,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: DASHBOARD_CONFIG.colors.text
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: '#30363d'
                    },
                    ticks: {
                        color: DASHBOARD_CONFIG.colors.text
                    }
                },
                y: {
                    grid: {
                        color: '#30363d'
                    },
                    ticks: {
                        color: DASHBOARD_CONFIG.colors.text
                    }
                }
            }
        }
    });
}

// AI Usage Patterns Chart
function initUsagePatternsChart() {
    const ctx = document.getElementById('usagePatternsChart').getContext('2d');
    
    charts.usagePatterns = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Code Generation', 'Code Completion', 'Documentation', 'Testing', 'Refactoring'],
            datasets: [{
                data: [35, 28, 15, 12, 10],
                backgroundColor: [
                    DASHBOARD_CONFIG.colors.primary,
                    DASHBOARD_CONFIG.colors.secondary,
                    DASHBOARD_CONFIG.colors.success,
                    DASHBOARD_CONFIG.colors.warning,
                    DASHBOARD_CONFIG.colors.error
                ],
                borderColor: DASHBOARD_CONFIG.colors.background,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: DASHBOARD_CONFIG.colors.text,
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// Event listeners
function setupEventListeners() {
    // Chart control buttons
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', handleChartControl);
    });

    // Team filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleTeamFilter);
    });

    // Time range selector
    document.getElementById('timeRange').addEventListener('change', handleTimeRangeChange);

    // Export buttons
    document.querySelectorAll('.export-btn').forEach(btn => {
        btn.addEventListener('click', handleExport);
    });
}

// Chart control handler
function handleChartControl(event) {
    const metric = event.target.dataset.metric;
    const buttons = event.target.parentElement.querySelectorAll('.chart-btn');
    
    // Update active state
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update chart data
    updateAIGenerationChart(metric);
}

// Update AI Generation Chart based on metric
function updateAIGenerationChart(metric) {
    const chart = charts.aiGeneration;
    let data, label, color;
    
    switch(metric) {
        case 'lines':
            data = SAMPLE_DATA.aiGeneration.linesGenerated;
            label = 'Lines Generated';
            color = DASHBOARD_CONFIG.colors.primary;
            break;
        case 'acceptance':
            data = SAMPLE_DATA.aiGeneration.acceptanceRate;
            label = 'Acceptance Rate %';
            color = DASHBOARD_CONFIG.colors.success;
            break;
        case 'suggestions':
            data = SAMPLE_DATA.aiGeneration.suggestions;
            label = 'Suggestions Made';
            color = DASHBOARD_CONFIG.colors.secondary;
            break;
        default:
            return;
    }
    
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].label = label;
    chart.data.datasets[0].borderColor = color;
    chart.data.datasets[0].backgroundColor = color + '20';
    chart.update('active');
}

// Team filter handler
function handleTeamFilter(event) {
    const team = event.target.dataset.team;
    const buttons = event.target.parentElement.querySelectorAll('.filter-btn');
    
    // Update active state
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter team data (placeholder - would filter actual data)
    console.log(`Filtering data for team: ${team}`);
}

// Time range change handler
function handleTimeRangeChange(event) {
    const range = event.target.value;
    console.log(`Time range changed to: ${range}`);
    
    // Add loading state
    document.body.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        refreshAllCharts();
        document.body.classList.remove('loading');
    }, 1000);
}

// Export handler
function handleExport(event) {
    const table = event.target.closest('.table-container').querySelector('table');
    const filename = table.id || 'dashboard-data';
    exportTableToCSV(table, filename);
}

// Export table to CSV
function exportTableToCSV(table, filename) {
    const csv = [];
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        const rowData = Array.from(cells).map(cell => {
            return `"${cell.textContent.trim()}"`;
        });
        csv.push(rowData.join(','));
    });
    
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    
    window.URL.revokeObjectURL(url);
}

// Populate data tables
function populateTables() {
    populateDevelopersTable();
    populateProjectsTable();
}

// Populate developers table
function populateDevelopersTable() {
    const tbody = document.getElementById('developersTable');
    tbody.innerHTML = '';
    
    SAMPLE_DATA.developers.forEach(dev => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dev.name}</td>
            <td>${dev.aiLines.toLocaleString()}</td>
            <td>${dev.acceptance}%</td>
            <td>${dev.prs}</td>
            <td>${dev.cycleTime}</td>
            <td><span class="score-badge score-${dev.score.toLowerCase()}">${dev.score}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Populate projects table
function populateProjectsTable() {
    const tbody = document.getElementById('projectsTable');
    tbody.innerHTML = '';
    
    SAMPLE_DATA.projects.forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.name}</td>
            <td>${project.adoption}%</td>
            <td>${project.coverage}%</td>
            <td>${project.bugDensity}</td>
            <td>${project.deployFreq}</td>
            <td>${project.leadTime}</td>
        `;
        tbody.appendChild(row);
    });
}

// Animate metric cards on load
function animateMetricCards() {
    const cards = document.querySelectorAll('.metric-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 150);
    });
}

// Refresh dashboard
function refreshDashboard() {
    console.log('Refreshing dashboard...');
    
    // Add loading state
    const refreshBtn = document.querySelector('.refresh-btn');
    const originalText = refreshBtn.innerHTML;
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
    refreshBtn.disabled = true;
    
    // Simulate API calls
    setTimeout(() => {
        refreshAllCharts();
        populateTables();
        updateLastUpdatedTime();
        
        // Remove loading state
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
    }, 2000);
}

// Refresh all charts
function refreshAllCharts() {
    Object.values(charts).forEach(chart => {
        if (chart && typeof chart.update === 'function') {
            chart.update('active');
        }
    });
}

// Update last updated time
function updateLastUpdatedTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    document.getElementById('lastUpdated').textContent = `${dateString} at ${timeString}`;
}

// Utility functions for API calls (placeholder)
async function fetchGitHubMetrics(timeRange) {
    // Placeholder for GitHub API integration
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(SAMPLE_DATA);
        }, 1000);
    });
}

async function fetchAtlassianMetrics(timeRange) {
    // Placeholder for Atlassian API integration
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(SAMPLE_DATA);
        }, 1000);
    });
}

async function fetchAIMetrics(timeRange) {
    // Placeholder for AI metrics API integration
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(SAMPLE_DATA);
        }, 1000);
    });
}

// Real-time updates (WebSocket placeholder)
function initializeRealTimeUpdates() {
    // Placeholder for WebSocket connection
    setInterval(() => {
        // Simulate real-time metric updates
        updateRealTimeMetrics();
    }, 30000); // Update every 30 seconds
}

function updateRealTimeMetrics() {
    // Update metrics with slight variations
    const metricCards = document.querySelectorAll('.metric-value');
    metricCards.forEach(card => {
        const currentValue = card.textContent;
        // Add subtle animations for changing values
        card.style.transform = 'scale(1.05)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    });
}

// Initialize real-time updates
document.addEventListener('DOMContentLoaded', function() {
    initializeRealTimeUpdates();
});

// Error handling
window.addEventListener('error', function(event) {
    console.error('Dashboard error:', event.error);
    // Could show user-friendly error messages
});

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log(`Dashboard load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
        }
    }
});

perfObserver.observe({ entryTypes: ['navigation'] }); 