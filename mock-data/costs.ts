
export const costOverview = {
    total: 2800,
    dailyBurn: 95.2,
    projectedMonthly: 2950,
    trend: [86, 92, 95, 100, 98, 90, 95], // 7 days
    lastMonth: 2700,
    peakDay: {
        date: '2025-08-05',
        cost: 120
    },
    lowestDay: {
        date: '2025-08-02',
        cost: 86
    }
};

export const attribution = [
    { dimension: 'us-east-1', cost: 1600 },
    { dimension: 'us-west-2', cost: 1200 },
    { dimension: 'eu-central-1', cost: 600 },
    { dimension: 'ap-southeast-1', cost: 400 },
    { dimension: 'team-bio', cost: 900 },
    { dimension: 'team-ml', cost: 1100 },
    { dimension: 'team-data', cost: 800 }
];
