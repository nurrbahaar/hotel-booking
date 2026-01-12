import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const DashboardChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center justify-center h-64">
                <p className="text-gray-500">No data available for charts</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Earnings Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
                <h2 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-2">
                    <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                    Aylýk Kazanç
                </h2>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${value}`} />
                            <Legend />
                            <Bar dataKey="earnings" fill="#4F46E5" name="Earnings ($)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bookings Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Monthly Bookings</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="bookings" stroke="#F97316" strokeWidth={2} name="Bookings" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardChart;
