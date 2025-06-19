import React from 'react';
import { BarChart3, DollarSign, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for dashboard statistics
  const stats = [
    { 
      title: 'Total Sales', 
      value: '$12,459.85', 
      change: '+12.5%', 
      trend: 'up',
      icon: DollarSign 
    },
    { 
      title: 'Orders', 
      value: '156', 
      change: '+8.2%', 
      trend: 'up',
      icon: ShoppingCart 
    },
    { 
      title: 'Products', 
      value: '584', 
      change: '+3.1%', 
      trend: 'up',
      icon: Package 
    },
    { 
      title: 'Customers', 
      value: '2,845', 
      change: '+15.3%', 
      trend: 'up',
      icon: Users 
    },
  ];

  // Mock data for recent orders
  const recentOrders = [
    { id: 'ORD-4231', customer: 'Sarah Johnson', date: '2023-04-15', total: '$145.99', status: 'delivered' },
    { id: 'ORD-4230', customer: 'Michael Chen', date: '2023-04-14', total: '$89.95', status: 'shipped' },
    { id: 'ORD-4229', customer: 'Emma Wilson', date: '2023-04-14', total: '$212.50', status: 'processing' },
    { id: 'ORD-4228', customer: 'David Miller', date: '2023-04-13', total: '$76.20', status: 'delivered' },
    { id: 'ORD-4227', customer: 'Lisa Brown', date: '2023-04-13', total: '$189.99', status: 'cancelled' },
  ];

  // Mock data for top selling products
  const topProducts = [
    { name: 'Summer Breeze Maxi Dress', category: 'Women', sold: 89, revenue: '$8,009.11' },
    { name: 'Classic Tailored Blazer', category: 'Women', sold: 76, revenue: '$9,879.24' },
    { name: 'Minimalist Sneakers', category: 'Shoes', sold: 68, revenue: '$6,799.32' },
    { name: 'Leather Crossbody Bag', category: 'Accessories', sold: 64, revenue: '$7,679.36' },
    { name: 'Oversized Knit Sweater', category: 'Women', sold: 58, revenue: '$4,059.42' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your dashboard. Here's an overview of your store.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <h2 className="text-2xl font-bold">{stat.value}</h2>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <stat.icon className="w-6 h-6 text-gray-700" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
              <TrendingUp className={`w-4 h-4 ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sales chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Sales Overview</h2>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last year</option>
          </select>
        </div>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Sales chart visualization would appear here</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent orders */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <button className="text-sm font-medium text-black hover:text-gray-700">
              View all orders
            </button>
          </div>
        </div>

        {/* Top selling products */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold">Top Selling Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sold
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.sold}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <button className="text-sm font-medium text-black hover:text-gray-700">
              View all products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;