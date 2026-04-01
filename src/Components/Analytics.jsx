import { faker } from '@faker-js/faker';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import WorldMap from './low-level-components/WorldMap';

export default function Analytics() {
    const activeUsers = Array.from({ length: 20 }, (_, i) => ({ users: faker.number.int({ min: 10, max: 1000 }) }));
    const pageViews = Array.from({ length: 10 }, (_, i) => ({ day: i + 1, views: faker.number.int({ min: 10000, max: 100000 }) }));
    const conversioRate = Array.from({ length: 20 }, (_, i) => ({ rate: faker.number.int({ min: 0, max: 100 }) }));
    const trafficData = [
        { name: 'Organic Search', value: 45, users: 25500, color: '#9ca3af' },
        { name: 'Direct', value: 25, users: 15800, color: '#3b82f6' },
        { name: 'Referral', value: 15, users: 7700, color: '#60a5fa' },
        { name: 'Social', value: 10, users: 4200, color: '#93c5fd' },
        { name: 'Other', value: 5, users: 500, color: '#e2e8f0' },
    ];
    const salesChartData = Array.from({ length: 30 }, (_, i) => ({
        date: `${i + 1} Mar`,
        views: faker.number.int({ min: 2000, max: 8000 }),
        actions: faker.number.int({ min: 1000, max: 5000 })
    }));
    const popularPages = Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        name: faker.helpers.arrayElement(['Home Page', 'Settings', 'User Profile', 'Analytics', 'Marketplace']),
        views: faker.number.int({ min: 500, max: 20000 }),
        uniqueVisitors: 'Unique Visitors'
    }));

    return (
        <div className="p-4 md:p-8 w-full max-w-7xl mx-auto min-h-screen overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Analytics Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-2xl pt-4 shadow-sm border border-gray-100 flex flex-col h-48">
                    <div className='flex justify-between px-4 mb-2'>
                        <div>
                            <span className='font-semibold text-gray-500 text-sm uppercase'>Active Users</span>
                            <h3 className="text-2xl font-bold text-gray-800">2.174</h3>
                        </div>
                        <div className='px-3 h-7 bg-green-100 rounded-full flex items-center gap-2'>
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs font-bold text-green-700">Currently</span>
                        </div>
                    </div>
                    <div className='w-full grow mt-auto'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activeUsers} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="users" stroke='#10b981' strokeWidth={2} fillOpacity={1} fill='url(#colorRevenue)' />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-white rounded-2xl pt-4 shadow-sm border border-gray-100 flex flex-col h-48">
                    <div className='flex justify-between px-4 mb-2'>
                        <div>
                            <span className='font-semibold text-gray-500 text-sm uppercase'>Page Views</span>
                            <h3 className="text-2xl font-bold text-gray-800">186,300</h3>
                        </div>
                        <div className='bg-green-50 px-2 py-1 rounded-lg h-fit'>
                            <span className='text-green-500 text-xs font-bold'>+12.5%</span>
                        </div>
                    </div>
                    <div className='w-full grow mt-auto px-2'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pageViews}>
                                <Bar dataKey="views" fill='#3b82f6' radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-white rounded-2xl pt-4 shadow-sm border border-gray-100 flex flex-col h-48 md:col-span-2 lg:col-span-1">
                    <div className='flex justify-between px-4 mb-2'>
                        <div>
                            <span className='font-semibold text-gray-500 text-sm uppercase'>Conversion Rate</span>
                            <h3 className="text-2xl font-bold text-gray-800">4.1%</h3>
                        </div>
                        <div className='bg-green-50 px-2 py-1 rounded-lg h-fit'>
                            <span className='text-green-500 text-xs font-bold'>+0.8%</span>
                        </div>
                    </div>
                    <div className='w-full grow mt-auto'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={conversioRate}>
                                <Area type="monotone" dataKey="rate" stroke='#3b82f6' fill='#3b82f6' fillOpacity={0.1} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-4 text-slate-800">User Traffic Sources</h3>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="w-full sm:w-1/2 h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={trafficData}
                                        innerRadius="60%"
                                        outerRadius="90%"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {trafficData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col gap-3">
                            {trafficData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-slate-600">{item.name}</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="font-bold text-slate-800">{item.value}%</span>
                                        <span className="text-slate-400 min-w-[50px] text-right">{item.users.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col min-h-[300px]">
                    <h3 className="font-bold text-lg mb-4 text-slate-800">Traffic by Country</h3>
                    <div className="flex-1 w-full bg-slate-50 rounded-xl overflow-hidden">
                        <WorldMap />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-4 text-slate-800">Page Views & Event Actions</h3>
                    <div className='w-full h-64'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} minTickGap={30} />
                                <YAxis hide={true} />
                                <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} fill="url(#colorSales)" />
                                <Area type="monotone" dataKey="actions" stroke="#93c5fd" strokeWidth={2} fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-4 text-slate-800">Popular Pages</h3>
                    <div className="flex flex-col gap-5">
                        {popularPages.map((page) => (
                            <div key={page.id} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm text-slate-800">{page.name}</span>
                                        <span className="text-xs text-slate-400">/page-url</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-sm text-slate-800">{page.views.toLocaleString()}</div>
                                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Views</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}