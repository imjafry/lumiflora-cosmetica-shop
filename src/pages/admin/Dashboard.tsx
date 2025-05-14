
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Users, DollarSign, Package, ArrowUpRight, ArrowDownRight } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Monitor your business performance and analytics.</p>
          </div>
          
          <Tabs defaultValue="today" className="mt-4 lg:mt-0">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="year">This Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Revenue" 
            value="৳148,920" 
            description="+12.5% from last month" 
            trend="up"
            icon={<DollarSign className="h-5 w-5" />}
          />
          <StatCard 
            title="Orders" 
            value="845" 
            description="+7.2% from last month" 
            trend="up"
            icon={<ShoppingBag className="h-5 w-5" />}
          />
          <StatCard 
            title="Customers" 
            value="2,845" 
            description="+18.3% from last month" 
            trend="up"
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard 
            title="Products" 
            value="450" 
            description="+3 new this week" 
            trend="neutral"
            icon={<Package className="h-5 w-5" />}
          />
        </div>
        
        {/* Charts & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-muted-foreground">
                Sales chart visualization will appear here
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <a href="/admin/orders" className="text-sm text-primary hover:underline">View all</a>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <RecentOrderItem 
                  id="ORD-7652"
                  customer="Sarah Johnson"
                  date="Today, 2:30 PM"
                  amount="৳8,790"
                  status="processing"
                />
                <RecentOrderItem 
                  id="ORD-7651"
                  customer="Mohammad Rahman"
                  date="Today, 11:45 AM"
                  amount="৳12,350"
                  status="shipped"
                />
                <RecentOrderItem 
                  id="ORD-7650"
                  customer="Ava Patel"
                  date="Yesterday, 4:15 PM"
                  amount="৳5,490"
                  status="delivered"
                />
                <RecentOrderItem 
                  id="ORD-7649"
                  customer="David Khan"
                  date="Yesterday, 10:30 AM"
                  amount="৳9,200"
                  status="pending"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Product Stats & Customer Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <TopProductItem
                  name="Korean Moisturizing Serum"
                  category="Skincare"
                  sold={124}
                  inventory={58}
                />
                <TopProductItem
                  name="Luxury Rose Perfume"
                  category="Perfume"
                  sold={98}
                  inventory={32}
                />
                <TopProductItem
                  name="Matte Finish Lipstick Set"
                  category="Makeup"
                  sold={86}
                  inventory={43}
                />
                <TopProductItem
                  name="Anti-Aging Night Cream"
                  category="Skincare"
                  sold={72}
                  inventory={25}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Customer Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  action="New customer registered"
                  name="Fatima Ahmed"
                  time="10 minutes ago"
                />
                <ActivityItem
                  action="Left a review (★★★★★)"
                  name="Rafi Islam"
                  time="45 minutes ago"
                />
                <ActivityItem
                  action="Completed checkout"
                  name="Priya Sharma"
                  time="1 hour ago"
                />
                <ActivityItem
                  action="Added items to wishlist"
                  name="Ali Hassan"
                  time="2 hours ago"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

// Stats Card Component
const StatCard = ({ title, value, description, trend, icon }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-muted">{icon}</div>
          {trend === "up" && <span className="flex items-center text-sm text-green-500 font-medium"><ArrowUpRight className="mr-1 h-4 w-4" /> 12%</span>}
          {trend === "down" && <span className="flex items-center text-sm text-red-500 font-medium"><ArrowDownRight className="mr-1 h-4 w-4" /> 4%</span>}
          {trend === "neutral" && <span className="text-sm text-muted-foreground font-medium">0%</span>}
        </div>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{title}</p>
        <p className="text-xs text-muted-foreground mt-4">{description}</p>
      </CardContent>
    </Card>
  );
};

// Recent Order Item Component
const RecentOrderItem = ({ id, customer, date, amount, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "processing": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "shipped": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "delivered": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "canceled": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="font-medium">{id}</div>
        <div className="hidden md:block text-sm text-muted-foreground">{customer}</div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:block text-sm text-muted-foreground">{date}</div>
        <div className="text-sm font-medium">{amount}</div>
        <div className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(status)}`}>
          {getStatusText(status)}
        </div>
      </div>
    </div>
  );
};

// Top Product Item Component
const TopProductItem = ({ name, category, sold, inventory }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-sm">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-muted-foreground">{category}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium">{sold} sold</div>
        <div className="text-xs text-muted-foreground">{inventory} in stock</div>
      </div>
    </div>
  );
};

// Activity Item Component
const ActivityItem = ({ action, name, time }) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <div className="font-medium">{action}</div>
        <div className="text-sm text-muted-foreground">{name}</div>
      </div>
      <div className="text-xs text-muted-foreground">{time}</div>
    </div>
  );
};

export default AdminDashboard;
