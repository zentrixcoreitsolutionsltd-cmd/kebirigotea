// Safe Firebase / Local DB Adapter for Kebirigo Tea Factory

class KebirigoDatabase {
  constructor() {
    this.storageKey = 'kebirigo_app_data';
  }

  getLocalData() {
    try {
      const item = localStorage.getItem(this.storageKey);
      return item ? JSON.parse(item) : { orders: [], reviews: [], inquiries: [] };
    } catch (e) {
      return { orders: [], reviews: [], inquiries: [] };
    }
  }

  saveLocalData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) {}
  }

  async saveOrder(order) {
    const data = this.getLocalData();
    const newOrder = {
      ...order,
      id: order.id || 'TEG-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    data.orders.push(newOrder);
    this.saveLocalData(data);
    return newOrder;
  }

  async getOrders() {
    return this.getLocalData().orders;
  }

  async saveInquiry(inquiry) {
    const data = this.getLocalData();
    data.inquiries.push({
      ...inquiry,
      id: 'INQ-' + Date.now(),
      createdAt: new Date().toISOString()
    });
    this.saveLocalData(data);
    return true;
  }
}

export const db = new KebirigoDatabase();
if (typeof window !== 'undefined') {
  window.kebirigoDB = db;
}
export default db;
