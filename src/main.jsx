import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlertTriangle,
  Apple,
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  Clock3,
  CreditCard,
  Heart,
  Home,
  Info,
  Lock,
  MapPin,
  Package,
  Plus,
  Search,
  Share2,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Timer,
  User,
  Utensils
} from 'lucide-react';
import './styles.css';

const foodImages = {
  croissant:
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80',
  bakery:
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
  cafe:
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80',
  sushi:
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80',
  pastry:
    'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=600&q=80'
};

const items = [
  {
    id: 'campus-bakery',
    title: 'Campus Bakery',
    subtitle: 'High Predictability Bag',
    category: 'Bakery & Pastries',
    price: 3.99,
    oldPrice: 12,
    distance: '0.3 mi away',
    address: '123 College Ave, University District',
    locationHint: 'Inside the student union building, 1st floor.',
    pickup: '4:00 PM - 5:00 PM',
    note: 'Sourdough loaf + 1-2 sweet pastries',
    details: 'Croissants, muffins, day-old sourdough loaves.',
    portion: 'Usually 3-4 pastries or 1 large loaf + 2 pastries.',
    allergens: 'Contains gluten, dairy. May contain nuts.',
    image: foodImages.croissant,
    hero: foodImages.bakery,
    badge: '80% Predictable',
    rating: '4.8',
    left: 3
  },
  {
    id: 'green-leaf',
    title: 'Green Leaf Cafe',
    subtitle: 'Lunch Surprise Bag',
    category: 'Cafe & Lunch',
    price: 5.49,
    oldPrice: 14,
    distance: '0.6 mi away',
    address: '40 Library Walk, University District',
    locationHint: 'Pickup at the cashier counter near the side entrance.',
    pickup: '5:30 PM - 6:15 PM',
    note: 'Salad bowl, drink, bakery item',
    details: 'Prepared salads, wraps, fruit cups, or bottled drinks.',
    portion: 'Usually one full lunch set plus one snack.',
    allergens: 'May contain dairy, sesame, soy, or tree nuts.',
    image: foodImages.cafe,
    hero: foodImages.cafe,
    badge: 'High Surprise',
    rating: '4.5',
    left: 6
  },
  {
    id: 'union-sushi',
    title: 'Union Sushi',
    subtitle: 'Evening Bento Bag',
    category: 'Japanese',
    price: 6.25,
    oldPrice: 16,
    distance: '0.9 mi away',
    address: '8 Student Union Hall',
    locationHint: 'Ask staff for the reserved surplus pickup shelf.',
    pickup: '7:00 PM - 7:45 PM',
    note: 'Rolls, rice bowl, miso soup',
    details: 'Mixed rolls, bento sides, rice bowls, or chilled drinks.',
    portion: 'Usually one meal box and one side item.',
    allergens: 'Contains fish, soy, sesame. May contain shellfish.',
    image: foodImages.sushi,
    hero: foodImages.sushi,
    badge: 'Limited',
    rating: '4.7',
    left: 2
  }
];

const filters = ['< 1 mi', '< $5', 'Today', 'Vegan'];

const money = (value) => `$${value.toFixed(2)}`;

function MiniStatus() {
  return (
    <div className="mini-status">
      <span>9:41</span>
      <div className="phone-dots">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function PhoneShell({ children }) {
  return (
    <main className="demo-stage">
      <section className="phone-shell" aria-label="interactive surplus food demo">
        {children}
      </section>
      <aside className="demo-notes">
        <h1>Surplus Food Demo</h1>
        <p>Click a food bag, review pickup details, choose payment, apply SAVE10, then place the order.</p>
      </aside>
    </main>
  );
}

function Pill({ children, active, onClick }) {
  return (
    <button className={`pill ${active ? 'active' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
}

function FoodCard({ item, onOpen }) {
  return (
    <button className="food-card" onClick={() => onOpen(item)}>
      <div className="food-photo" style={{ backgroundImage: `url(${item.image})` }}>
        <span className="food-badge">{item.badge}</span>
        <span className="rating">
          <Star size={12} fill="currentColor" />
          {item.rating}
        </span>
      </div>
      <div className="food-body">
        <div>
          <h3>{item.title}</h3>
          <p>{item.distance}</p>
        </div>
        <div className="price-line">
          <strong>{money(item.price)}</strong>
          <s>{money(item.oldPrice)}</s>
        </div>
        <small>Expect: {item.note}</small>
      </div>
    </button>
  );
}

function HomeScreen({ activeFilter, setActiveFilter, query, setQuery, onOpen, onNav, orders }) {
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSearch = !q || `${item.title} ${item.category} ${item.note}`.toLowerCase().includes(q);
      const matchesFilter =
        activeFilter === '< $5' ? item.price < 5 : activeFilter === 'Vegan' ? item.id === 'green-leaf' : true;
      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, query]);

  return (
    <div className="screen home-screen">
      <MiniStatus />
      <header className="home-top">
        <p>Surplus Food · Discovery / Home</p>
        <div className="location-row">
          <MapPin size={15} fill="currentColor" />
          <span>University Campus</span>
          <ChevronDown size={14} />
        </div>
      </header>
      <label className="search-bar">
        <Search size={17} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search bakeries, cafes, groceries..."
        />
        <SlidersHorizontal size={17} />
      </label>
      <div className="filter-row">
        {filters.map((filter) => (
          <Pill
            active={activeFilter === filter}
            key={filter}
            onClick={() => setActiveFilter(activeFilter === filter ? 'Today' : filter)}
          >
            {filter}
          </Pill>
        ))}
      </div>
      <div className="section-title">
        <h2>Near You</h2>
        <button onClick={() => setQuery('')}>See all</button>
      </div>
      <div className="food-list">
        {filteredItems.map((item) => (
          <FoodCard item={item} key={item.id} onOpen={onOpen} />
        ))}
        {filteredItems.length === 0 && <p className="empty-state">No bags match this search.</p>}
      </div>
      <button className="scan-button" onClick={() => setActiveFilter('< $5')}>
        80% off
      </button>
      <BottomNav active="home" onNav={onNav} orders={orders} />
    </div>
  );
}

function DetailScreen({ item, liked, setLiked, onBack, onPreview }) {
  return (
    <div className="screen detail-screen">
      <div className="detail-hero" style={{ backgroundImage: `url(${item.hero})` }}>
        <div className="top-actions">
          <button aria-label="Back" onClick={onBack}>
            <ArrowLeft size={19} />
          </button>
          <div>
            <button className={liked ? 'liked' : ''} aria-label="Save" onClick={() => setLiked(!liked)}>
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
            </button>
            <button aria-label="Share">
              <Share2 size={18} />
            </button>
          </div>
        </div>
        <span className="left-tag">Selling fast! {item.left} left</span>
      </div>
      <section className="detail-sheet">
        <div className="detail-title-row">
          <h2>{item.title}</h2>
          <span>
            <Star size={13} fill="currentColor" />
            {item.rating} <small>(120+)</small>
          </span>
        </div>
        <p className="muted-line">
          <MapPin size={14} /> {item.distance.replace(' away', '')} · {item.category}
        </p>
        <div className="detail-price">
          <strong>{money(item.price)}</strong>
          <s>{money(item.oldPrice)} Value</s>
          <span>Save {Math.round((1 - item.price / item.oldPrice) * 100)}%</span>
        </div>
        <div className="notice success">
          <ShieldCheck size={22} fill="currentColor" />
          <div>
            <strong>High Predictability</strong>
            <p>You mostly know what you'll get</p>
          </div>
          <Info size={15} />
        </div>
        <div className="notice">
          <Clock3 size={21} />
          <div>
            <strong>Pickup Today</strong>
            <p>{item.pickup}</p>
          </div>
        </div>
        <h3>What to Expect</h3>
        <div className="expect-grid">
          <InfoCard icon={ShoppingBag} title="Typical Items" text={item.details} />
          <InfoCard icon={Utensils} title="Portion Size" text={item.portion} />
          <InfoCard icon={AlertTriangle} title="Allergens" text={item.allergens} />
          <InfoCard icon={Lock} title="Packaging" text="Paper bags provided. Bring your own tote." />
        </div>
      </section>
      <div className="sticky-action">
        <button onClick={onPreview}>
          View pickup & reserve
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, text }) {
  return (
    <article className="info-card">
      <Icon size={16} />
      <strong>{title}</strong>
      <p>{text}</p>
    </article>
  );
}

function CheckoutPreviewScreen({ item, showPickup, setShowPickup, onBack, onCheckout }) {
  return (
    <div className="screen preview-screen">
      <TopBar title="Pickup Preview" onBack={onBack} />
      <section className="preview-content">
        <h2>Location</h2>
        <div className="map-card">
          <div className="map-road one" />
          <div className="map-road two" />
          <div className="map-park" />
          <div className="pin">
            <MapPin size={20} fill="currentColor" />
          </div>
        </div>
        <strong>{item.address}</strong>
        <p>{item.locationHint}</p>
        <button className={`pickup-card ${showPickup ? 'open' : ''}`} onClick={() => setShowPickup(!showPickup)}>
          <span>
            <Package size={17} />
          </span>
          Pickup Instructions
          <ChevronDown size={16} />
        </button>
        {showPickup && (
          <div className="pickup-detail">
            Show your confirmation code at the counter. Pickup window is {item.pickup}. Staff will hand over one
            sealed surprise bag.
          </div>
        )}
      </section>
      <div className="preview-footer">
        <div className="left-time">
          <Timer size={15} />
          Ends in 2h 15m
        </div>
        <strong>Only {item.left} bags left!</strong>
        <button className="reserve-button" onClick={onCheckout}>
          Reserve for {money(item.price)}
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

function CheckoutScreen({ item, payment, setPayment, promo, setPromo, discount, setDiscount, onBack, onPlaceOrder }) {
  const serviceFee = 0.5;
  const tax = 0.36;
  const total = Math.max(0, item.price + serviceFee + tax - discount);
  const promoMessage = discount > 0 ? 'Promo SAVE10 applied.' : promo && promo.toUpperCase() !== 'SAVE10' ? 'Try SAVE10.' : '';

  return (
    <div className="screen checkout-screen">
      <TopBar title="Checkout" onBack={onBack} />
      <section className="checkout-card">
        <div className="merchant">
          <img src={item.image} alt="" />
          <div>
            <strong>{item.title}</strong>
            <p>{item.subtitle}</p>
          </div>
        </div>
        <div className="pickup-time">
          <Clock3 size={17} />
          <div>
            <span>Pickup Today</span>
            <strong>{item.pickup}</strong>
          </div>
        </div>
        <div className="mini-alert green">
          <ShieldCheck size={15} />
          High Predictability: Mostly Pastries
        </div>
        <div className="mini-alert red">
          <AlertTriangle size={15} />
          Allergens: {item.allergens}
        </div>
      </section>
      <h2 className="checkout-section-title">Payment Method</h2>
      <section className="payment-card">
        <PaymentRow icon={Apple} title="Apple Pay" selected={payment === 'apple'} onClick={() => setPayment('apple')} />
        <PaymentRow
          icon={CreditCard}
          title="•••• 4242"
          subtitle="Expires 12/25"
          selected={payment === 'card'}
          onClick={() => setPayment('card')}
        />
        <button className="add-payment" onClick={() => setPayment('card')}>
          <Plus size={16} />
          Add payment method
        </button>
      </section>
      <div className="promo-row">
        <input value={promo} onChange={(event) => setPromo(event.target.value)} placeholder="Promo code" />
        <button onClick={() => setDiscount(promo.trim().toUpperCase() === 'SAVE10' ? 1 : 0)}>Apply</button>
      </div>
      {promoMessage && <p className={`promo-message ${discount > 0 ? 'ok' : ''}`}>{promoMessage}</p>}
      <section className="total-card">
        <LineItem label="Bag Price" value={money(item.price)} />
        <LineItem label="Service Fee" value={money(serviceFee)} />
        <LineItem label="Tax" value={money(tax)} />
        {discount > 0 && <LineItem label="Promo" value={`-${money(discount)}`} />}
        <LineItem label="Total" value={money(total)} strong />
      </section>
      <button className="place-order" onClick={() => onPlaceOrder(total)}>
        Place order
      </button>
    </div>
  );
}

function OrdersScreen({ orders, onNav, onOpenOrder }) {
  return (
    <div className="screen orders-screen">
      <MiniStatus />
      <header className="plain-header">
        <h1>Orders</h1>
        <Bell size={20} />
      </header>
      {orders.length === 0 ? (
        <div className="orders-empty">
          <ShoppingBag size={38} />
          <h2>No orders yet</h2>
          <p>Reserve a nearby surplus bag and it will appear here.</p>
          <button onClick={() => onNav('home')}>Browse bags</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <button className="order-card" key={order.code} onClick={() => onOpenOrder(order)}>
              <span>
                <Check size={18} />
              </span>
              <div>
                <strong>{order.item.title}</strong>
                <p>Code {order.code} · Pickup {order.item.pickup}</p>
              </div>
              <b>{money(order.total)}</b>
            </button>
          ))}
        </div>
      )}
      <BottomNav active="orders" onNav={onNav} orders={orders} />
    </div>
  );
}

function SuccessScreen({ order, onNav }) {
  return (
    <div className="screen success-screen">
      <MiniStatus />
      <div className="success-card">
        <div className="success-icon">
          <Check size={38} />
        </div>
        <h1>Order confirmed</h1>
        <p>Show this pickup code at {order.item.title} during the pickup window.</p>
        <div className="pickup-code">{order.code}</div>
        <div className="success-summary">
          <LineItem label="Pickup" value={order.item.pickup} />
          <LineItem label="Paid" value={money(order.total)} />
          <LineItem label="Location" value={order.item.address} />
        </div>
        <button onClick={() => onNav('orders')}>View order</button>
        <button className="ghost-button" onClick={() => onNav('home')}>
          Back home
        </button>
      </div>
    </div>
  );
}

function TopBar({ title, onBack }) {
  return (
    <div className="top-bar">
      <button aria-label="Back" onClick={onBack}>
        <ArrowLeft size={19} />
      </button>
      <h1>{title}</h1>
    </div>
  );
}

function PaymentRow({ icon: Icon, title, subtitle, selected, onClick }) {
  return (
    <button className="payment-row" onClick={onClick}>
      <span className="payment-icon">
        <Icon size={18} />
      </span>
      <div>
        <strong>{title}</strong>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <span className={`radio ${selected ? 'selected' : ''}`} />
    </button>
  );
}

function LineItem({ label, value, strong }) {
  return (
    <div className={`line-item ${strong ? 'total' : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function BottomNav({ active, onNav, orders }) {
  const nav = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'orders', icon: ShoppingBag, label: 'Orders' },
    { id: 'stats', icon: Utensils, label: 'Stats' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="bottom-nav">
      {nav.map(({ id, icon: Icon, label }) => (
        <button className={active === id ? 'active' : ''} key={id} onClick={() => onNav(id)}>
          <Icon size={17} />
          <span>{label}</span>
          {id === 'orders' && orders.length > 0 && <b>{orders.length}</b>}
        </button>
      ))}
    </nav>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [liked, setLiked] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Today');
  const [query, setQuery] = useState('');
  const [showPickup, setShowPickup] = useState(false);
  const [payment, setPayment] = useState('apple');
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [latestOrder, setLatestOrder] = useState(null);

  const goHome = () => setPage('home');
  const goOrders = () => setPage('orders');
  const handleNav = (target) => {
    if (target === 'orders') goOrders();
    else goHome();
  };

  const openItem = (item) => {
    setSelectedItem(item);
    setDiscount(0);
    setPromo('');
    setShowPickup(false);
    setPage('detail');
  };

  const placeOrder = (total) => {
    const order = {
      code: `CP-${Math.floor(1000 + Math.random() * 9000)}`,
      item: selectedItem,
      payment,
      total
    };
    setOrders((current) => [order, ...current]);
    setLatestOrder(order);
    setPage('success');
  };

  const screen =
    page === 'detail' ? (
      <DetailScreen
        item={selectedItem}
        liked={liked}
        setLiked={setLiked}
        onBack={goHome}
        onPreview={() => setPage('preview')}
      />
    ) : page === 'preview' ? (
      <CheckoutPreviewScreen
        item={selectedItem}
        showPickup={showPickup}
        setShowPickup={setShowPickup}
        onBack={() => setPage('detail')}
        onCheckout={() => setPage('checkout')}
      />
    ) : page === 'checkout' ? (
      <CheckoutScreen
        item={selectedItem}
        payment={payment}
        setPayment={setPayment}
        promo={promo}
        setPromo={setPromo}
        discount={discount}
        setDiscount={setDiscount}
        onBack={() => setPage('preview')}
        onPlaceOrder={placeOrder}
      />
    ) : page === 'orders' ? (
      <OrdersScreen
        orders={orders}
        onNav={handleNav}
        onOpenOrder={(order) => {
          setLatestOrder(order);
          setPage('success');
        }}
      />
    ) : page === 'success' && latestOrder ? (
      <SuccessScreen order={latestOrder} onNav={handleNav} />
    ) : (
      <HomeScreen
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        query={query}
        setQuery={setQuery}
        onOpen={openItem}
        onNav={handleNav}
        orders={orders}
      />
    );

  return <PhoneShell>{screen}</PhoneShell>;
}

createRoot(document.getElementById('root')).render(<App />);
