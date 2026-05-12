'use client';

import { useState } from 'react';
import styles from './MenuMakanan.module.css';
import { FaUtensils, FaPlus, FaMinus, FaTrash, FaShoppingBasket } from 'react-icons/fa';

interface MenuItem {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

const MENU_ITEMS: MenuItem[] = [
    {
        id: 1,
        name: 'Bakso Spesial',
        price: 8000,
        image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?q=80&w=500&auto=format&fit=crop',
        description: 'Bakso daging sapi asli dengan kuah kaldu gurih dan mie kuning.',
    },
    {
        id: 2,
        name: 'Mie Ayam Jago',
        price: 9000,
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=500&auto=format&fit=crop',
        description: 'Mie telur lembut dengan topping ayam kecap bumbu rempah rahasia.',
    },
    {
        id: 3,
        name: 'Rujak Buah Segar',
        price: 6000,
        image: 'https://images.unsplash.com/photo-1546793665-c74683c3c3ad?q=80&w=500&auto=format&fit=crop',
        description: 'Irisan buah segar dengan bumbu kacang pedas manis yang nendang.',
    },
];

interface CartItem extends MenuItem {
    quantity: number;
}

export default function MenuMakanan() {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className={styles.menuGrid}>
                    {MENU_ITEMS.map((item) => (
                        <div key={item.id} className={styles.menuCard}>
                            <div className={styles.imageWrapper}>
                                <img src={item.image} alt={item.name} className={styles.menuImage} />
                                <div className={styles.priceBadge}>Rp {item.price.toLocaleString()}</div>
                            </div>
                            <div className={styles.cardBody}>
                                <h3 className={styles.itemName}>{item.name}</h3>
                                <p className={styles.itemDescription}>{item.description}</p>
                                <button className={styles.addBtn} onClick={() => addToCart(item)}>
                                    <FaPlus /> Tambah ke Pesanan
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <aside className={styles.cartSection}>
                    <div className={styles.cartHeader}>
                        <FaShoppingBasket />
                        <h2>Pesanan Saya</h2>
                    </div>

                    <div className={styles.cartList}>
                        {cart.length === 0 ? (
                            <div className={styles.emptyCart}>
                                <FaUtensils />
                                <p>Belum ada pesanan</p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className={styles.cartItem}>
                                    <div className={styles.cartItemInfo}>
                                        <span className={styles.cartItemName}>{item.name}</span>
                                        <span className={styles.cartItemPrice}>Rp {(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                    <div className={styles.cartControls}>
                                        <button onClick={() => updateQuantity(item.id, -1)}><FaMinus /></button>
                                        <span className={styles.quantity}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}><FaPlus /></button>
                                        <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}><FaTrash /></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className={styles.cartFooter}>
                            <div className={styles.totalRow}>
                                <span>Total Pembayaran:</span>
                                <span className={styles.totalAmount}>Rp {total.toLocaleString()}</span>
                            </div>
                            <button className={styles.checkoutBtn}>
                                Konfirmasi Pesanan
                            </button>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}
