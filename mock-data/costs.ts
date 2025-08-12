
export const costOverview = {
    total: 3800,
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
    {
        dimension: 'us-east-1',
        cost: 1000,
        timeSeries: [
            { time: '2025-08-01', cost: 350 },
            { time: '2025-08-02', cost: 350 },
            { time: '2025-08-03', cost: 300 }
        ]
    },
    {
        dimension: 'us-west-2',
        cost: 900,
        timeSeries: [
            { time: '2025-08-01', cost: 300 },
            { time: '2025-08-02', cost: 300 },
            { time: '2025-08-03', cost: 300 }
        ]
    },
    {
        dimension: 'eu-central-1',
        cost: 800,
        timeSeries: [
            { time: '2025-08-01', cost: 250 },
            { time: '2025-08-02', cost: 300 },
            { time: '2025-08-03', cost: 250 }
        ]
    },
    {
        dimension: 'ap-southeast-1',
        cost: 600,
        timeSeries: [
            { time: '2025-08-01', cost: 200 },
            { time: '2025-08-02', cost: 200 },
            { time: '2025-08-03', cost: 200 }
        ]
    },
    {
        dimension: 'team-bio',
        cost: 500,
        timeSeries: [
            { time: '2025-08-01', cost: 170 },
            { time: '2025-08-02', cost: 170 },
            { time: '2025-08-03', cost: 160 }
        ]
    }
];
