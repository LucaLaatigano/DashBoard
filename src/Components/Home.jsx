import { faker } from '@faker-js/faker';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import { useUserContext } from '../Context/UsersContext';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Home = () => {
    const salesData = Array.from({ length: 20 }, (_, i) => ({
        sales: faker.number.int({ min: 100, max: 10000 })
    }));
    const newUsers = faker.number.int({ min: 1000, max: 2500 });
    const projects = faker.number.int({ min: 80, max: 500 });
    const salesChartData = Array.from({ length: 30 }, (_, i) => ({
        date: `${i + 1} Mar`,
        sales: faker.number.int({ min: 2000, max: 8000 }),
        actions: faker.number.int({ min: 1000, max: 5000 })
    }));
    const { users } = useUserContext();
    const possibleActions = [
        "commented on \"Project Alpha\"",
        "updated \"Dashboard UI\"",
        "resolved a critical bug",
        "uploaded new assets",
        "started a new sprint",
        "deployed to production"
    ];

    const container = useRef();

    useGSAP(() => {
        gsap.from(".stat-card", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out"
        });

        gsap.from(".chart-card", {
            scale: 0.95,
            opacity: 0,
            duration: 1,
            delay: 0.4,
            ease: "power2.out"
        });
    }, { scope: container });

    return (
        <div ref={container} className="w-full lg:pl-13 lg:pt-5 flex flex-wrap gap-5 p-4">
            <div className="stat-card w-full flex-1 min-w-[230px] h-50 bg-white rounded-2xl p-3 shadow-sm mr-2">
                <div className='flex justify-between'>
                    <div>
                        <label className='font-bold text-xl xl:text-2xl pl-3 text-gray-800'>Total Sales</label>
                        <h3 className="text-2xl font-bold pl-3 text-gray-800">$25,380</h3>
                    </div>
                </div>
                <div className='w-full h-20 pt-1'>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="sales" stroke='#3b82f6' strokeWidth={2} dot={false} fillOpacity={1} fill='url(#colorRevenue)' />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className='flex items-center gap-3'>
                    <span className='text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-lg'>+15%</span>
                    <span className="text-gray-400 text-xs">This month</span>
                </div>
            </div>

            <div className="stat-card w-full flex-1 min-w-[230px] h-50 bg-white rounded-2xl p-3 flex flex-col gap-8 shadow-sm mr-2">
                <div className='flex justify-between'>
                    <div className="flex flex-col">
                        <label className='font-bold text-xl xl:text-2xl pl-3 mb-10 text-gray-800'>New Users</label>
                        <h3 className="text-3xl font-bold pl-3 text-gray-800">{newUsers}</h3>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <span className='text-green-500 text-md font-bold bg-green-50 px-2 py-1 rounded-lg'>+8%</span>
                    <span className="text-gray-400 text-xs">This week</span>
                </div>
            </div>

            <div className="stat-card w-full flex-1 min-w-[230px] h-50 bg-white rounded-2xl flex flex-col gap-8 p-3 shadow-sm mr-2">
                <div className='flex justify-between'>
                    <div className="flex flex-col">
                        <label className='font-bold text-xl xl:text-2xl pl-3 mb-3 text-gray-800'>Active Projects</label>
                        <h3 className="text-3xl font-bold pl-3 text-gray-800">{projects}</h3>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <span className='text-green-500 text-md font-bold bg-green-50 px-2 py-1 rounded-lg'>+2</span>
                    <span className="text-gray-400 text-xs">New</span>
                </div>
            </div>

            <div className="stat-card w-full flex-1 min-w-[230px] h-50 bg-white rounded-2xl flex flex-col gap-5 p-3 shadow-sm mr-2">
                <div className='flex justify-between'>
                    <div className="flex flex-col">
                        <label className='font-bold text-xl xl:text-2xl pl-3 mb-8 text-gray-800'>Server Uptime</label>
                        <h3 className="text-2xl font-bold pl-3 text-gray-800">99.98%</h3>
                    </div>
                </div>
                <div className='flex items-center gap-3 pl-3'>
                    <span className="text-gray-400 text-xs">Stable</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-5 w-full mt-5">
                <div className="chart-card w-full lg:w-[calc(70%-1.25rem)] h-95 bg-white rounded-2xl p-3 shadow-sm">
                    <h2 className="text-2xl font-bold mb-8 text-gray-800">Sales Overview</h2>
                    <div className='w-full h-70 mt-auto'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} minTickGap={30} />
                                <YAxis hide={true} />
                                <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" activeDot={{ r: 6, strokeWidth: 0 }} />
                                <Area type="monotone" dataKey="actions" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="chart-card w-full md:flex-1 lg:w-[30%] h-95 p-3 bg-white rounded-2xl shadow-sm">
                    <label className='font-bold text-2xl pl-3 mb-5 text-gray-800 block'>Recent Activity</label>
                    <div className='w-full flex flex-col gap-5 mt-5 pl-3'>
                        {users.slice(0, 5).map(user => (
                            <div key={user.id} className='w-full h-11 flex gap-3'>
                                <div className='shrink-0'>
                                    <img className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200" src={user.avatar} alt={user.name} />
                                </div>
                                <div className='flex flex-col'>
                                    <span className="font-medium text-gray-900 truncate w-40 sm:w-48">{user.name}</span>
                                    <span className="font-light text-sm text-gray-400 truncate w-40 sm:w-48">{faker.helpers.arrayElement(possibleActions)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;