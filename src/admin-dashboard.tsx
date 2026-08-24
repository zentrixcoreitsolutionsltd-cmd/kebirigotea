import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export interface OrderItem {
  name?: string;
  product?: string;
  qty?: number;
  price?: number;
  total?: number;
}

export interface WebsiteOrder {
  id: string;
  date: string;
  name?: string;
  customerName?: string;
  email?: string;
  phone?: string;
  region?: string;
  deliveryLocation?: string;
  transport?: string;
  paymentMethod?: string;
  paymentRef?: string;
  ref?: string;
  items?: OrderItem[];
  total: number;
  status?: string;
  source?: string;
}

const DEFAULT_ORDERS: WebsiteOrder[] = [
  {
    id: 'KBW-8812',
    date: '2026-08-23 18:40',
    name: 'Evans Mogaka',
    customerName: 'Evans Mogaka',
    email: 'evans.mogaka@gmail.com',
    phone: '+254 722 841 200',
    region: 'Nairobi Central CBD (Courier Delivery)',
    transport: 'Courier / G4S Dispatch',
    paymentMethod: 'MPESA',
    paymentRef: 'QKJ9418291',
    items: [
      { name: 'Black Tea – Net Weight:500g', qty: 4, price: 150, total: 600 },
      { name: 'Tea Bags – Net Weight: 50 Enveloped', qty: 3, price: 120, total: 360 }
    ],
    total: 960,
    status: 'PAID & CONFIRMED',
    source: 'Website Checkout'
  },
  {
    id: 'KBW-8813',
    date: '2026-08-23 15:20',
    name: 'Sarah Jepchirchir',
    customerName: 'Sarah Jepchirchir',
    email: 'sarah.jep@yahoo.com',
    phone: '+254 711 392 104',
    region: 'Eldoret Town, Uasin Gishu',
    transport: 'Easy Coach Parcel',
    paymentMethod: 'MPESA',
    paymentRef: 'QKH3910283',
    items: [
      { name: 'Black Tea – Net Weight:240g', qty: 10, price: 75, total: 750 },
      { name: 'Tea Bags – Net Weight: 25 Enveloped', qty: 4, price: 65, total: 260 }
    ],
    total: 1010,
    status: 'DISPATCHED',
    source: 'Website Checkout'
  },
  {
    id: 'KBW-8814',
    date: '2026-08-22 11:15',
    name: 'David Ochieng',
    customerName: 'David Ochieng',
    email: 'd.ochieng@kcbgroup.com',
    phone: '+254 733 902 441',
    region: 'Kisumu Mega City, Kisumu',
    transport: 'Matatu Shuttle Parcel',
    paymentMethod: 'CARD',
    paymentRef: 'PP-948102',
    items: [
      { name: 'Black Tea – Net Weight:500g', qty: 8, price: 150, total: 1200 }
    ],
    total: 1200,
    status: 'DELIVERED',
    source: 'Website Checkout'
  },
  {
    id: 'KBW-8815',
    date: '2026-08-22 09:30',
    name: 'Mercy Kwamboka',
    customerName: 'Mercy Kwamboka',
    email: 'mkwamboka2026@gmail.com',
    phone: '+254 700 128 901',
    region: 'Nyamira Town Center, Nyamira',
    transport: 'Factory Gate Pickup',
    paymentMethod: 'MPESA',
    paymentRef: 'QKG8192801',
    items: [
      { name: 'Black Tea – Net Weight:100g', qty: 12, price: 35, total: 420 },
      { name: 'Tea Bags – Net Weight: 50 Enveloped', qty: 2, price: 120, total: 240 }
    ],
    total: 660,
    status: 'COMPLETED',
    source: 'Website Checkout'
  },
  {
    id: 'KBW-8816',
    date: '2026-08-21 16:45',
    name: 'Brian Kiprono',
    customerName: 'Brian Kiprono',
    email: 'bkiprono@gmail.com',
    phone: '+254 712 990 123',
    region: 'Nakuru Town, Nakuru',
    transport: 'Courier Dispatch',
    paymentMethod: 'MPESA',
    paymentRef: 'QKF7721902',
    items: [
      { name: 'Black Tea – Net Weight:500g', qty: 10, price: 150, total: 1500 }
    ],
    total: 1500,
    status: 'DELIVERED',
    source: 'Website Checkout'
  },
  {
    id: 'KBW-8817',
    date: '2026-08-20 14:10',
    name: 'Faith Kerubo',
    customerName: 'Faith Kerubo',
    email: 'faith.k@yahoo.com',
    phone: '+254 728 334 551',
    region: 'Kisii High School Area, Kisii',
    transport: 'Factory Gate Pickup',
    paymentMethod: 'MPESA',
    paymentRef: 'QKE6618290',
    items: [
      { name: 'Black Tea – Net Weight:240g', qty: 6, price: 75, total: 450 },
      { name: 'Black Tea – Net Weight:100g', qty: 8, price: 35, total: 280 }
    ],
    total: 730,
    status: 'COMPLETED',
    source: 'Website Checkout'
  },
  {
    id: 'KBW-8818',
    date: '2026-08-19 10:20',
    name: 'Paul Mutua',
    customerName: 'Paul Mutua',
    email: 'mutuap@kenyaairways.com',
    phone: '+254 734 551 229',
    region: 'Mombasa Nyali, Mombasa',
    transport: 'Coast Shuttle Courier',
    paymentMethod: 'CARD',
    paymentRef: 'PP-882910',
    items: [
      { name: 'Black Tea – Net Weight:500g', qty: 15, price: 150, total: 2250 }
    ],
    total: 2250,
    status: 'DELIVERED',
    source: 'Website Checkout'
  },
  {
    id: 'KBW-8801',
    date: '2026-07-28 17:00',
    name: 'Hassan Omar',
    customerName: 'Hassan Omar',
    email: 'hassan.o@gmail.com',
    phone: '+254 701 445 667',
    region: 'Mombasa Island, Mombasa',
    transport: 'G4S Courier',
    paymentMethod: 'MPESA',
    paymentRef: 'QJD8819201',
    items: [
      { name: 'Black Tea – Net Weight:500g', qty: 20, price: 150, total: 3000 }
    ],
    total: 3000,
    status: 'COMPLETED',
    source: 'Website Checkout'
  },
  {
    id: 'KBW-8802',
    date: '2026-07-15 12:30',
    name: 'Grace Wambui',
    customerName: 'Grace Wambui',
    email: 'gwambui@safcom.co.ke',
    phone: '+254 722 991 300',
    region: 'Westlands, Nairobi',
    transport: 'Fargo Courier',
    paymentMethod: 'MPESA',
    paymentRef: 'QJB5529102',
    items: [
      { name: 'Tea Bags – Net Weight: 50 Enveloped', qty: 12, price: 120, total: 1440 },
      { name: 'Black Tea – Net Weight:240g', qty: 8, price: 75, total: 600 }
    ],
    total: 2040,
    status: 'COMPLETED',
    source: 'Website Checkout'
  },
  {
    id: 'KBW-8790',
    date: '2026-06-20 14:15',
    name: 'Kennedy Momanyi',
    customerName: 'Kennedy Momanyi',
    email: 'kmomanyi@nssf.or.ke',
    phone: '+254 720 114 883',
    region: 'Nyamira Town, Nyamira',
    transport: 'Factory Gate Pickup',
    paymentMethod: 'MPESA',
    paymentRef: 'QHB2291048',
    items: [
      { name: 'Black Tea – Net Weight:500g', qty: 14, price: 150, total: 2100 }
    ],
    total: 2100,
    status: 'COMPLETED',
    source: 'Website Checkout'
  },
  {
    id: 'KBW-8775',
    date: '2026-05-18 11:00',
    name: 'Agnes Chebet',
    customerName: 'Agnes Chebet',
    email: 'chebet.agnes@gmail.com',
    phone: '+254 715 889 002',
    region: 'Kericho CBD, Kericho',
    transport: 'Local Runner',
    paymentMethod: 'MPESA',
    paymentRef: 'QFB1182903',
    items: [
      { name: 'Black Tea – Net Weight:240g', qty: 12, price: 75, total: 900 },
      { name: 'Tea Bags – Net Weight: 25 Enveloped', qty: 6, price: 65, total: 390 }
    ],
    total: 1290,
    status: 'COMPLETED',
    source: 'Website Checkout'
  }
];

const COLORS = ['#0b2b0e', '#c99c22', '#1e824c', '#d35400', '#2980b9', '#8e44ad', '#16a085'];

export function AdminSalesDashboard() {
  const [orders, setOrders] = useState<WebsiteOrder[]>([]);
  const [timeView, setTimeView] = useState<'daily' | 'monthly' | 'both'>('daily');
  const [daysRange, setDaysRange] = useState<number>(14);
  const [lastRefreshed, setLastRefreshed] = useState<string>(new Date().toLocaleTimeString());

  const loadOrdersFromStorage = () => {
    try {
      const raw = localStorage.getItem('kebirigo_orders');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
          setLastRefreshed(new Date().toLocaleTimeString());
          return;
        }
      }
      // If nothing in local storage or empty, seed with rich default data
      localStorage.setItem('kebirigo_orders', JSON.stringify(DEFAULT_ORDERS));
      setOrders(DEFAULT_ORDERS);
      setLastRefreshed(new Date().toLocaleTimeString());
    } catch (e) {
      console.error('Error reading kebirigo_orders:', e);
      setOrders(DEFAULT_ORDERS);
    }
  };

  useEffect(() => {
    loadOrdersFromStorage();

    const handleStorageUpdate = () => {
      loadOrdersFromStorage();
    };

    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('kebirigo_orders_changed', handleStorageUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('kebirigo_orders_changed', handleStorageUpdate);
    };
  }, []);

  // Compute High-Level Metrics
  const metrics = useMemo(() => {
    const totalRev = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const totalOrders = orders.length;
    const avgOrderValue = totalOrders ? Math.round(totalRev / totalOrders) : 0;

    let totalPackets = 0;
    const prodMap: Record<string, { qty: number; revenue: number }> = {};
    const paymentMap: Record<string, number> = {};

    orders.forEach((o) => {
      const pay = (o.paymentMethod || 'M-PESA').toUpperCase().includes('CARD') ? 'Card (Pesapal)' : 'M-Pesa Express';
      paymentMap[pay] = (paymentMap[pay] || 0) + (Number(o.total) || 0);

      (o.items || []).forEach((it) => {
        const name = it.name || it.product || 'Standard Tea';
        const q = Number(it.qty) || 1;
        const p = Number(it.price) || 0;
        totalPackets += q;

        if (!prodMap[name]) {
          prodMap[name] = { qty: 0, revenue: 0 };
        }
        prodMap[name].qty += q;
        prodMap[name].revenue += (it.total || (q * p));
      });
    });

    const topProductEntry = Object.entries(prodMap).sort((a, b) => b[1].qty - a[1].qty)[0];
    const topProduct = topProductEntry ? topProductEntry[0] : 'Black Tea 500g';

    return {
      totalRev,
      totalOrders,
      avgOrderValue,
      totalPackets,
      topProduct,
      prodMap,
      paymentMap,
    };
  }, [orders]);

  // Aggregate Daily Sales Data
  const dailyData = useMemo(() => {
    const dayMap: Record<string, { date: string; revenue: number; orders: number; packets: number; rawDate: string }> = {};

    orders.forEach((o) => {
      let dStr = o.date || '';
      // Parse YYYY-MM-DD from strings like "2026-08-23 18:40" or "2026-08-23"
      const datePart = dStr.split(' ')[0] || '2026-08-23';
      const parsedDate = new Date(datePart);
      const isInvalid = isNaN(parsedDate.getTime());
      
      const key = isInvalid ? datePart : datePart;
      const formattedLabel = isInvalid
        ? datePart
        : parsedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

      if (!dayMap[key]) {
        dayMap[key] = {
          date: formattedLabel,
          revenue: 0,
          orders: 0,
          packets: 0,
          rawDate: key,
        };
      }

      dayMap[key].revenue += Number(o.total) || 0;
      dayMap[key].orders += 1;

      (o.items || []).forEach((it) => {
        dayMap[key].packets += Number(it.qty) || 1;
      });
    });

    // Sort chronologically
    const sorted = Object.values(dayMap).sort((a, b) => a.rawDate.localeCompare(b.rawDate));
    return sorted.slice(-daysRange);
  }, [orders, daysRange]);

  // Aggregate Monthly Sales Data
  const monthlyData = useMemo(() => {
    const monthMap: Record<string, { month: string; rawMonth: string; revenue: number; orders: number; packets: number; avgOrder: number }> = {};

    orders.forEach((o) => {
      const dStr = o.date || '2026-08-23';
      const datePart = dStr.split(' ')[0];
      const monthPart = datePart.slice(0, 7); // e.g. "2026-08"

      const d = new Date(datePart);
      const label = isNaN(d.getTime())
        ? monthPart
        : d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

      if (!monthMap[monthPart]) {
        monthMap[monthPart] = {
          month: label,
          rawMonth: monthPart,
          revenue: 0,
          orders: 0,
          packets: 0,
          avgOrder: 0,
        };
      }

      monthMap[monthPart].revenue += Number(o.total) || 0;
      monthMap[monthPart].orders += 1;

      (o.items || []).forEach((it) => {
        monthMap[monthPart].packets += Number(it.qty) || 1;
      });
    });

    const sorted = Object.values(monthMap).sort((a, b) => a.rawMonth.localeCompare(b.rawMonth));
    return sorted.map((m) => ({
      ...m,
      avgOrder: m.orders ? Math.round(m.revenue / m.orders) : 0,
    }));
  }, [orders]);

  // Product distribution data for charts
  const productChartData = useMemo(() => {
    return Object.entries(metrics.prodMap).map(([name, val]) => ({
      name: name.replace('Black Tea – Net Weight:', '').replace('Tea Bags – Net Weight:', 'Tea Bags '),
      fullName: name,
      qty: val.qty,
      revenue: val.revenue,
    })).sort((a, b) => b.revenue - a.revenue);
  }, [metrics]);

  // Payment method data for pie chart
  const paymentChartData = useMemo(() => {
    return Object.entries(metrics.paymentMap).map(([name, value]) => ({
      name,
      value,
    }));
  }, [metrics]);

  const handleSeedMoreData = () => {
    localStorage.setItem('kebirigo_orders', JSON.stringify(DEFAULT_ORDERS));
    setOrders(DEFAULT_ORDERS);
    setLastRefreshed(new Date().toLocaleTimeString());
    // Trigger event for any listeners
    window.dispatchEvent(new CustomEvent('kebirigo_orders_changed'));
  };

  return (
    <div className="recharts-dashboard-container" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header with Title and Quick Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1.5px solid var(--lux-card-border)',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '24px',
              fontWeight: 700,
              color: '#0b2b0e',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: 0,
            }}
          >
            <span style={{ fontSize: '24px' }}>📈</span>
            Website Sales Visual Analytics &amp; Revenue Trends
          </h2>
          <p style={{ fontSize: '13px', color: '#566d5a', marginTop: '4px', margin: 0 }}>
            Interactive charts powered by Recharts, visualizing daily trajectories, monthly aggregates, and product revenue from local store orders.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div
            style={{
              background: '#ffffff',
              border: '1.5px solid var(--lux-card-border)',
              borderRadius: '10px',
              padding: '3px',
              display: 'flex',
              gap: '4px',
            }}
          >
            <button
              onClick={() => setTimeView('daily')}
              style={{
                padding: '6px 14px',
                borderRadius: '7px',
                border: 'none',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                background: timeView === 'daily' ? '#0b2b0e' : 'transparent',
                color: timeView === 'daily' ? '#f7dc6f' : '#566d5a',
                transition: 'all 0.2s',
              }}
            >
              Daily Sales
            </button>
            <button
              onClick={() => setTimeView('monthly')}
              style={{
                padding: '6px 14px',
                borderRadius: '7px',
                border: 'none',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                background: timeView === 'monthly' ? '#0b2b0e' : 'transparent',
                color: timeView === 'monthly' ? '#f7dc6f' : '#566d5a',
                transition: 'all 0.2s',
              }}
            >
              Monthly Revenue
            </button>
            <button
              onClick={() => setTimeView('both')}
              style={{
                padding: '6px 14px',
                borderRadius: '7px',
                border: 'none',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                background: timeView === 'both' ? '#0b2b0e' : 'transparent',
                color: timeView === 'both' ? '#f7dc6f' : '#566d5a',
                transition: 'all 0.2s',
              }}
            >
              All Visualizations
            </button>
          </div>

          <button
            onClick={loadOrdersFromStorage}
            title="Reload from localStorage"
            style={{
              background: '#ffffff',
              border: '1.5px solid var(--lux-card-border)',
              color: '#0b2b0e',
              padding: '7px 12px',
              borderRadius: '10px',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            🔄 Sync LocalStorage
          </button>

          <button
            onClick={handleSeedMoreData}
            title="Seed rich historical order samples"
            style={{
              background: '#f4f8f4',
              border: '1px dashed #0b2b0e',
              color: '#0b2b0e',
              padding: '7px 12px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            🌱 Load Multi-Month Sample Orders
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            border: '1.5px solid var(--lux-card-border)',
            borderRadius: '14px',
            padding: '18px',
            position: 'relative',
            borderLeft: '4px solid #1e824c',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#566d5a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Total Website Gross
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0b2b0e', margin: '6px 0 2px' }}>
            Ksh {metrics.totalRev.toLocaleString()}
          </div>
          <div style={{ fontSize: '11.5px', color: '#1e824c', fontWeight: 600 }}>
            From {metrics.totalOrders} website checkouts
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            border: '1.5px solid var(--lux-card-border)',
            borderRadius: '14px',
            padding: '18px',
            position: 'relative',
            borderLeft: '4px solid #c99c22',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#566d5a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Average Order Basket (AOV)
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0b2b0e', margin: '6px 0 2px' }}>
            Ksh {metrics.avgOrderValue.toLocaleString()}
          </div>
          <div style={{ fontSize: '11.5px', color: '#566d5a' }}>
            Per completed online transaction
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            border: '1.5px solid var(--lux-card-border)',
            borderRadius: '14px',
            padding: '18px',
            position: 'relative',
            borderLeft: '4px solid #2980b9',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#566d5a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Total Packets Sold
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0b2b0e', margin: '6px 0 2px' }}>
            {metrics.totalPackets} Units
          </div>
          <div style={{ fontSize: '11.5px', color: '#2980b9', fontWeight: 600 }}>
            Loose leaf pouches &amp; tea bags
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            border: '1.5px solid var(--lux-card-border)',
            borderRadius: '14px',
            padding: '18px',
            position: 'relative',
            borderLeft: '4px solid #0b2b0e',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#566d5a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Top Selling Product
          </div>
          <div
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: '#0b2b0e',
              margin: '6px 0 2px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={metrics.topProduct}
          >
            {metrics.topProduct}
          </div>
          <div style={{ fontSize: '11.5px', color: '#566d5a' }}>
            Leading consumer retail volume
          </div>
        </div>
      </div>

      {/* CHART SECTION 1: DAILY SALES RECHARTS */}
      {(timeView === 'daily' || timeView === 'both') && (
        <div
          style={{
            background: '#ffffff',
            border: '1.5px solid var(--lux-card-border)',
            borderRadius: '18px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '18px',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0b2b0e', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📅</span> Daily Sales Trajectory &amp; Revenue Trends (Recharts)
              </h3>
              <p style={{ fontSize: '12px', color: '#566d5a', margin: '4px 0 0' }}>
                Day-by-day gross revenue (Ksh) and customer order volume
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#566d5a', fontWeight: 600 }}>Show:</span>
              <select
                value={daysRange}
                onChange={(e) => setDaysRange(Number(e.target.value))}
                style={{
                  padding: '5px 10px',
                  borderRadius: '8px',
                  border: '1px solid var(--lux-card-border)',
                  fontSize: '12px',
                  color: '#0b2b0e',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                  background: '#f9fbf9',
                }}
              >
                <option value={7}>Last 7 Active Days</option>
                <option value={14}>Last 14 Active Days</option>
                <option value={30}>Last 30 Active Days</option>
                <option value={100}>All Recorded Days</option>
              </select>
            </div>
          </div>

          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="dailyRevGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0b2b0e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#1e824c" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="dailyOrdersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c99c22" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f7dc6f" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6efe7" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#566d5a"
                  tick={{ fontSize: 12, fill: '#566d5a' }}
                  tickLine={{ stroke: '#c4d7c6' }}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#0b2b0e"
                  tick={{ fontSize: 12, fill: '#0b2b0e' }}
                  tickFormatter={(val) => `Ksh ${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#c99c22"
                  tick={{ fontSize: 12, fill: '#c99c22' }}
                  tickFormatter={(val) => `${val} ord`}
                />
                <Tooltip
                  formatter={(value: any, name: string) => {
                    if (name === 'Daily Revenue') return [`Ksh ${Number(value).toLocaleString()}`, name];
                    if (name === 'Orders Count') return [`${value} Orders`, name];
                    return [value, name];
                  }}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #0b2b0e',
                    borderRadius: '10px',
                    boxShadow: '0 8px 24px rgba(11, 43, 14, 0.12)',
                    fontSize: '13px',
                  }}
                  labelStyle={{ fontWeight: 700, color: '#0b2b0e', marginBottom: '4px' }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '10px', fontSize: '12.5px', fontWeight: 600 }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  name="Daily Revenue"
                  stroke="#0b2b0e"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#dailyRevGradient)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  name="Orders Count"
                  stroke="#c99c22"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#c99c22' }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* CHART SECTION 2: MONTHLY REVENUE RECHARTS */}
      {(timeView === 'monthly' || timeView === 'both') && (
        <div
          style={{
            background: '#ffffff',
            border: '1.5px solid var(--lux-card-border)',
            borderRadius: '18px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0b2b0e', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📊</span> Monthly Sales Aggregates &amp; Growth (Recharts)
            </h3>
            <p style={{ fontSize: '12px', color: '#566d5a', margin: '4px 0 0' }}>
              Historical month-on-month online revenue generation and aggregate order volume
            </p>
          </div>

          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6efe7" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#566d5a"
                  tick={{ fontSize: 12, fill: '#566d5a' }}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#0b2b0e"
                  tick={{ fontSize: 12, fill: '#0b2b0e' }}
                  tickFormatter={(val) => `Ksh ${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#1e824c"
                  tick={{ fontSize: 12, fill: '#1e824c' }}
                  tickFormatter={(val) => `${val} ord`}
                />
                <Tooltip
                  formatter={(value: any, name: string) => {
                    if (name === 'Monthly Revenue') return [`Ksh ${Number(value).toLocaleString()}`, name];
                    if (name === 'Total Orders') return [`${value} Orders`, name];
                    if (name === 'Packets Sold') return [`${value} Units`, name];
                    return [value, name];
                  }}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #0b2b0e',
                    borderRadius: '10px',
                    boxShadow: '0 8px 24px rgba(11, 43, 14, 0.12)',
                    fontSize: '13px',
                  }}
                  labelStyle={{ fontWeight: 700, color: '#0b2b0e' }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '10px', fontSize: '12.5px', fontWeight: 600 }}
                />
                <Bar
                  yAxisId="left"
                  dataKey="revenue"
                  name="Monthly Revenue"
                  fill="#0b2b0e"
                  radius={[8, 8, 0, 0]}
                  barSize={36}
                />
                <Bar
                  yAxisId="right"
                  dataKey="orders"
                  name="Total Orders"
                  fill="#c99c22"
                  radius={[8, 8, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* DUAL BREAKDOWN: PRODUCT REVENUE DISTRIBUTION & PAYMENT METHODS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          marginBottom: '24px',
        }}
      >
        {/* Product Revenue & Packet Velocity */}
        <div
          style={{
            background: '#ffffff',
            border: '1.5px solid var(--lux-card-border)',
            borderRadius: '18px',
            padding: '22px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0b2b0e', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🍃</span> Product Revenue Contribution (Ksh)
          </h3>
          <p style={{ fontSize: '12px', color: '#566d5a', margin: '0 0 16px' }}>
            Gross revenue generated per retail pack size
          </p>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={productChartData}
                margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#edf4ee" />
                <XAxis type="number" tickFormatter={(v) => `Ksh ${v}`} stroke="#566d5a" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#0b2b0e" fontSize={11} width={80} />
                <Tooltip
                  formatter={(val: any) => [`Ksh ${Number(val).toLocaleString()}`, 'Revenue']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #0b2b0e',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="revenue" fill="#144618" radius={[0, 6, 6, 0]}>
                  {productChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Channels Pie Chart */}
        <div
          style={{
            background: '#ffffff',
            border: '1.5px solid var(--lux-card-border)',
            borderRadius: '18px',
            padding: '22px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0b2b0e', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>💳</span> Payment Method Split
          </h3>
          <p style={{ fontSize: '12px', color: '#566d5a', margin: '0 0 16px' }}>
            Online M-Pesa Express vs Credit/Debit Card settlement
          </p>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {paymentChartData.map((_, index) => (
                    <Cell key={`cell-pay-${index}`} fill={index === 0 ? '#1e824c' : '#c99c22'} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`Ksh ${Number(value).toLocaleString()}`, 'Volume']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #0b2b0e',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sync Status Badge */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f9fbf9',
          padding: '10px 16px',
          borderRadius: '10px',
          border: '1px solid #e1ebe2',
          fontSize: '12px',
          color: '#566d5a',
        }}
      >
        <span>
          🟢 Storage Status: <strong>Synced with localStorage ('kebirigo_orders')</strong> • {orders.length} orders loaded
        </span>
        <span>Last updated: {lastRefreshed}</span>
      </div>
    </div>
  );
}

// Function to mount or re-mount into #recharts-dashboard-root in admin.html
export function mountSalesDashboard(targetId = 'recharts-dashboard-root') {
  const el = document.getElementById(targetId);
  if (!el) {
    console.warn(`Target element #${targetId} not found for mounting Recharts dashboard`);
    return null;
  }
  // Store root on element to avoid multiple createRoot calls
  let root = (el as any)._reactRoot;
  if (!root) {
    root = ReactDOM.createRoot(el);
    (el as any)._reactRoot = root;
  }
  root.render(<AdminSalesDashboard />);
  return root;
}

// Expose globally so plain JS in admin.html can trigger it
(window as any).mountSalesDashboard = mountSalesDashboard;

// Auto-mount if element exists on document load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('recharts-dashboard-root');
    if (el) {
      mountSalesDashboard('recharts-dashboard-root');
    }
  });
}
