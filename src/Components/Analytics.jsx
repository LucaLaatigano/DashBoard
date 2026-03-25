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
import WorldMap from './Low Level Components/WorldMap';

export default function Analytics() {
    const activeUsers = Array.from({ length: 20 }, (_, i) => ({
        users: faker.number.int({ min: 10, max: 1000 })
    }))
    const pageViews = Array.from({ length: 10 }, (_, i) => ({
        day: i + 1,
        views: faker.number.int({ min: 10000, max: 100000 })
    }))
    const conversioRate = Array.from({ length: 20 }, (_, i) => ({
        rate: faker.number.int({ min: 0, max: 100 })
    }))
    const trafficData = [
        { name: 'Organic Search', value: 45, users: 25500, color: '#9ca3af' },
        { name: 'Direct', value: 25, users: 15800, color: '#3b82f6' },
        { name: 'Referral', value: 15, users: 7700, color: '#60a5fa' },
        { name: 'Social', value: 10, users: 4200, color: '#93c5fd' },
        { name: 'Other', value: 5, users: 500, color: '#e2e8f0' },
    ]
    const salesChartData = Array.from({ length: 30 }, (_, i) => ({
        date: `${i + 1} Mar`,
        views: faker.number.int({ min: 2000, max: 8000 }),
        actions: faker.number.int({ min: 1000, max: 5000 })
    }))
    const popularPages = Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        name: faker.helpers.arrayElement(['Home Page', 'Settings', 'User Profile', 'Analytics', 'Marketplace']),
        views: faker.number.int({ min: 500, max: 20000 }),
        uniqueVisitors: 'Unique Visitors' // Texto estático de la imagen
    }))
    return (
        <div className="flex pt-2 pl-8 flex-col">
            <h3 className="text-2xl font-bold mb-3">Analytics Overview</h3>
            <div className="flex gap-5">
                <div className="w-85 h-42 bg-white rounded-2xl pt-3">
                    <div className='flex justify-between'>
                        <div>
                            <label className='font-bold text-xl pl-3'>Active Users</label>
                            <h3 className="text-2xl font-bold pl-3 ">2.174</h3>
                        </div>
                        <div className='w-28 h-8 bg-gray-200 mr-5 pt-0.5'>
                            <h3 className="relative text-md font-bold pl-7 pr-5 text-gray-800 
                            after:content-[''] after:absolute 
                            after:left-2 after:top-1/2 after:-translate-y-1/2
                          after:bg-[#10b981] after:h-3 after:w-3 after:block after:rounded-full">
                                Currently
                            </h3>
                        </div>
                    </div>
                    <div className='w-full h-20'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activeUsers}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area
                                    type="monotone"
                                    dataKey="users"
                                    stroke='#10b981'
                                    strokeWidth={2}
                                    dot={false}
                                    fillOpacity={1}
                                    fill='url(#colorRevenue)'
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="w-85 h-42 bg-white rounded-2xl pt-3">
                    <div className='flex justify-between'>
                        <div>
                            <label className='font-bold text-xl pl-3'>Page Views</label>
                            <h3 className="text-2xl font-bold pl-3 ">186,300</h3>
                        </div>
                        <div className='w-28 h-8  pl-8'>
                            <span className='text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-lg'>+12.5%</span>
                        </div>
                    </div>
                    <div className='w-full h-20 pt-1'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pageViews} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                                <XAxis dataKey="views" hide />
                                <Tooltip
                                    cursor={{ fill: '#f3f4f6' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar
                                    dataKey="views"
                                    fill='#3b82f6'
                                    barSize={25}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="w-85 h-42 bg-white rounded-2xl pt-3">
                    <div className='flex justify-between'>
                        <div>
                            <label className='font-bold text-xl pl-3'>Conversion Rate</label>
                            <h3 className="text-2xl font-bold pl-3 ">4.1%</h3>
                        </div>
                        <div className='w-28 h-8 pl-8'>
                            <span className='text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-lg'>+0.8%</span>
                        </div>
                    </div>
                    <div className='w-full h-20 pt-1'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={conversioRate}>
                                <defs>
                                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area
                                    type="monotone"
                                    dataKey="rate"
                                    stroke='#3b82f6'
                                    strokeWidth={2}
                                    dot={false}
                                    fillOpacity={1}
                                    fill='url(#colorRate)'
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className="flex gap-3 mt-3 mb-3">
                <div className="w-131 h-50 bg-white rounded-2xl p-3">
                    <h3 className="font-bold text-lg mb-2 text-slate-800">User Traffic Sources</h3>
                    <div className="flex items-center justify-between">
                        <div className="w-1/2 h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={trafficData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={35}
                                        outerRadius={65}
                                        paddingAngle={2}
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
                        <div className="w-1/2 flex flex-col gap-1 pr-2">
                            {trafficData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between text-[11px]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="font-medium text-slate-600">{item.name}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="font-bold text-slate-800">{item.value}%</span>
                                        <span className="text-slate-400 w-10 text-right">{item.users.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-131 h-50 bg-white rounded-2xl flex p-3 gap-5 shadow-sm overflow-hidden">
                    <h3 className="font-bold text-lg mb-2 text-slate-800  ">Traffic by Country</h3>
                    <div className="flex-1 w-full h-full -mt-5">
                        <WorldMap />
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="w-182 h-50 bg-white rounded-2xl p-3">
                    <h3 className="font-bold text-lg mb-2 text-slate-800">Page Views & Event Actions</h3>
                    <div className='w-full h-36 mt-auto'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={salesChartData}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                                    minTickGap={30}
                                />

                                <YAxis hide={true} />

                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '10px',
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="views"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="actions"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="w-80 h-50 bg-white rounded-2xl p-3">
                    <h3 className="font-bold text-lg mb-3 text-slate-800">Popular Pages</h3>

                    <div className="flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
                        {popularPages.map((page) => (
                            <div key={page.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                                        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm text-slate-800 leading-tight">
                                            {page.name}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-medium">
                                            Page Views
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-sm text-slate-800 leading-tight">
                                        {page.views.toLocaleString()}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium">
                                        {page.uniqueVisitors}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}