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

export default function Sales() {
    const topProducts = [
        { id: 1, name: 'Core UI Kit', units: 125, price: '$12,500', icon: '🎨' },
        { id: 2, name: 'Analytics Dashboard', units: 98, price: '$9,800', icon: '📈' },
        { id: 3, name: 'Current Desktop', units: 73, price: '$6,800', icon: '💻' },
        { id: 4, name: 'Mobile App Template', units: 55, price: '$5,200', icon: '📱' },
        { id: 5, name: 'Core UI Kit Pro', units: 33, price: '$4,300', icon: '💎' },
        { id: 6, name: 'SaaS Landing Page', units: 24, price: '$3,100', icon: '🌐' },
    ];
    const salesChartData = Array.from({ length: 30 }, (_, i) => ({
        date: `${i + 1} Mar`,
        sales: faker.number.int({ min: 2000, max: 8000 }),
        orders: faker.number.int({ min: 1000, max: 5000 })
    }));
    const revenueData = Array.from({ length: 10 }, (_, i) => ({
        revenue: faker.number.int({ min: 100, max: 900 })
    }));
    const ordersData = Array.from({ length: 7 }, (_, i) => ({
        day: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'][i],
        orders: faker.number.int({ min: 20, max: 100 }),
    }));
    const conversionData = [
        { name: 'Completed', value: 65, color: '#3b82f6' },
        { name: 'Pending', value: 35, color: '#9ca3af' },
    ];

    return (
        <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-7 min-h-screen'>
            <div className='flex flex-col flex-1 gap-6 lg:gap-8'>
                <div className='mb-2'>
                    <h1 className='text-3xl font-extrabold text-gray-900'>Sales Overview</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                    <div className='h-60 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between p-5'>
                        <div>
                            <label className='font-bold text-lg text-gray-500'>Total Revenue</label>
                            <h3 className="text-3xl font-bold text-gray-800">$12,875</h3>
                        </div>
                        <div className='w-full h-20'>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="revenue" stroke='#10b981' strokeWidth={2} dot={false} fillOpacity={1} fill='url(#colorRevenue)' />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='flex items-center gap-3'>
                            <span className='text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-lg'>+12.5%</span>
                            <span className="text-gray-400 text-xs">este mes</span>
                        </div>
                    </div>
                    <div className='h-60 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between p-5'>
                        <div>
                            <label className='font-bold text-lg text-gray-500'>Orders</label>
                            <h3 className='text-3xl font-bold text-gray-800'>2,890</h3>
                        </div>
                        <div className='w-full h-20'>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={ordersData}>
                                    <XAxis dataKey="day" hide />
                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                    <Bar dataKey="orders" fill='#3b82f6' barSize={20} radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='flex items-center gap-3'>
                            <span className='text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-lg'>+10%</span>
                            <span className="text-gray-400 text-xs">esta semana</span>
                        </div>
                    </div>
                    <div className='h-60 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between p-5'>
                        <div>
                            <label className='font-bold text-lg text-gray-500'>Conversion Rate</label>
                            <h3 className='text-3xl font-bold text-gray-800'>3.8%</h3>
                        </div>
                        <div className='w-full h-24 flex justify-center'>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={conversionData} cx="50%" cy="50%" innerRadius={25} outerRadius={40} dataKey="value" stroke="none">
                                        {conversionData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='flex items-center gap-3'>
                            <span className='text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-lg'>+0.5%</span>
                            <span className="text-gray-400 text-xs">nuevo</span>
                        </div>
                    </div>
                </div>
                <div className='w-full bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-gray-100'>
                    <h2 className="text-xl font-bold mb-6 text-gray-800">Sales Performance</h2>
                    <div className='h-75 lg:h-100 w-full'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} minTickGap={30} />
                                <YAxis hide={true} />
                                <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                                <Area type="monotone" dataKey="orders" stroke="#f97316" strokeWidth={2} fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className='w-full lg:w-80 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-4 lg:mt-0'>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Top Selling Products</h2>
                <div className="space-y-6">
                    {topProducts.map((product) => (
                        <div key={product.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl border border-gray-100">
                                    {product.icon}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 text-sm lg:text-base">{product.name}</p>
                                    <p className="text-xs lg:text-sm text-gray-400">{product.units} units</p>
                                </div>
                            </div>
                            <span className="font-bold text-gray-800 text-md lg:text-lg">
                                {product.price}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}