/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconLock, 
  IconArrowNarrowLeft, 
  IconArrowRight, 
  IconTrash,
  IconShieldCheck,
  IconDeviceMobile,
  IconBrandPaypal,
  IconBrandApple,
  IconCreditCard,
  IconCalendarEvent,
  IconShieldLock
} from '@tabler/icons-react';
import Link from 'next/link';
import { useCart } from '../../../../src/context/CartContext'; 

const CheckoutPage = () => {
  const { cart, subtotal, removeFromCart } = useCart();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'United States',
    shippingMethod: 'standard'
  });

  const shippingCost = formData.shippingMethod === 'standard' ? 12.00 : 25.00;
  const tax = subtotal * 0.10;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = async () => {
    // Payment process follows the saved automation guide
    const paymentPayload = {
      projectId: "VOID_STORE_01", 
      amount: total,
      method: "Credit Card",
      clientDetails: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email
      },
      milestonesSnapshot: cart.map(item => ({
        name: item.name,
        amount: item.price * item.quantity,
        status: 'Paid',
        dueDate: new Date().toISOString()
      }))
    };
    console.log("Processing Secure Payment:", paymentPayload);
    alert("Transaction Successful! Your PDF invoice is being generated.");
  };

  return (
    <div className="min-h-screen bg-[#050505] mt-8 selection:bg-[#FF2E2E] selection:text-white pb-20 pt-16">
      
      

      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
               <span className="h-[1px] w-8 bg-[#FF2E2E]" />
               <span className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-500 text-glow">Checkout</span>
            </div>
            <h1 className="text-white text-5xl md:text-6xl font-black judson-bold tracking-tighter leading-none">
              Complete <span className="text-zinc-900">Purchase</span>
            </h1>
          </motion.div>

          <Link href="/shop" className="group text-[9px] uppercase tracking-[0.3em] font-bold flex items-center gap-2 text-zinc-600 hover:text-white transition-all border-b border-transparent hover:border-white/20 pb-1">
            <IconArrowNarrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Selection
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- LEFT COLUMN: INFO --- */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* 1. CONTACT INFO */}
            <section className="relative">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-xl font-bold judson-bold tracking-tight flex items-center gap-4">
                  <span className="text-[#FF2E2E] text-[10px] font-black  border border-[#FF2E2E]/20 px-2 py-1 rounded">01</span> 
                  Contact Details
                </h2>
                <p className="text-[8px] uppercase tracking-widest text-zinc-600">
                  Step 1 of 3
                </p>
              </div>
              <div className="group bg-[#080808] border border-white/5 p-8 rounded-2xl shadow-2xl transition-all focus-within:border-[#FF2E2E]/20">
                <label className="block text-[8px] uppercase tracking-[0.3em] mb-4 font-black text-zinc-500 group-focus-within:text-[#FF2E2E] transition-colors">Email for Invoice</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="recipient@domain.com" 
                  className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-white focus:border-[#FF2E2E] outline-none transition-all placeholder:text-zinc-800" 
                />
              </div>
            </section>

            {/* 2. SHIPPING ADDRESS */}
            <section>
              <h2 className="text-white text-xl font-bold judson-bold tracking-tight mb-6 flex items-center gap-4">
                 <span className="text-[#FF2E2E] text-[10px] font-black  border border-[#FF2E2E]/20 px-2 py-1 rounded">02</span> 
                 Shipping Logistics
              </h2>
              <div className="bg-[#080808] border border-white/5 p-8 rounded-2xl space-y-8 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block text-[8px] uppercase tracking-[0.3em] font-black text-zinc-600">First Name</label>
                    <input type="text" onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:border-[#FF2E2E] outline-none transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[8px] uppercase tracking-[0.3em] font-black text-zinc-600">Last Name</label>
                    <input type="text" onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:border-[#FF2E2E] outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-[8px] uppercase tracking-[0.3em] font-black text-zinc-600">Full Delivery Address</label>
                  <input type="text" onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Street name, apartment, suite..." className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:border-[#FF2E2E] outline-none transition-all placeholder:text-zinc-800" />
                </div>
              </div>
            </section>

            {/* 3. DELIVERY METHOD */}
            <section>
              <h2 className="text-white text-xl font-bold judson-bold tracking-tight mb-6 flex items-center gap-4">
                 <span className="text-[#FF2E2E] text-[10px] font-black  border border-[#FF2E2E]/20 px-2 py-1 rounded">03</span> 
                 Delivery Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'standard', title: 'Standard', time: '5–8 business days', price: 12 },
                  { id: 'express', title: 'Express', time: '2–3 business days', price: 25 }
                ].map((method) => (
                  <div 
                    key={method.id}
                    onClick={() => setFormData({...formData, shippingMethod: method.id})} 
                    className={`group relative flex items-center justify-between p-6 rounded-2xl cursor-pointer transition-all duration-500 border ${formData.shippingMethod === method.id ? 'border-[#FF2E2E] bg-[#FF2E2E]/5 shadow-[0_0_30px_rgba(255,46,46,0.05)]' : 'border-white/5 bg-[#080808] hover:border-white/10'}`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.shippingMethod === method.id ? 'border-[#FF2E2E]' : 'border-zinc-800 group-hover:border-zinc-700'}`}>
                        {formData.shippingMethod === method.id && <div className="w-2.5 h-2.5 bg-[#FF2E2E] rounded-full shadow-[0_0_10px_#FF2E2E]" />}
                      </div>
                      <div>
                        <p className={`text-[10px] font-black uppercase tracking-widest transition-colors ${formData.shippingMethod === method.id ? 'text-white' : 'text-zinc-500'}`}>{method.title}</p>
                        <p className="text-[8px] text-zinc-600 uppercase mt-1 tracking-tighter">{method.time}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-black font-mono transition-colors ${formData.shippingMethod === method.id ? 'text-white' : 'text-zinc-600'}`}>${method.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* --- RIGHT COLUMN: ORDER SUMMARY & PAYMENT --- */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 space-y-6">
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#080808] border border-white/5 p-8 md:p-10 rounded-2xl relative shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#FF2E2E] to-transparent opacity-50" />
                
                <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
                  Bag Summary <span className="h-[1px] flex-1 bg-white/[0.03]" />
                </h3>
                
                {/* ITEMS LIST */}
                <div className="max-h-[200px] overflow-y-auto pr-3 space-y-8 mb-10 custom-scrollbar">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div layout exit={{ opacity: 0, x: 20 }} key={item.id} className="flex gap-5 group">
                        <div className="w-16 h-20 bg-zinc-900 rounded-xl overflow-hidden border border-white/5 relative flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <span className="absolute -top-1 -right-1 bg-[#FF2E2E] text-white text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#080808] shadow-lg">{item.quantity}</span>
                        </div>
                        <div className="flex-1 min-w-0 py-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.15em] truncate mr-4">{item.name}</h4>
                            <button onClick={() => removeFromCart(item.id)} className="text-zinc-800 hover:text-red-500 transition-colors transform active:scale-90"><IconTrash size={14}/></button>
                          </div>
                          <div className="flex justify-between items-end mt-4">
                              <p className="text-zinc-600 text-[8px] uppercase font-bold tracking-widest">{item.size} • {item.color}</p>
                              <span className="text-white text-xs font-black font-mono tracking-tighter">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* CALCULATIONS */}
                <div className="space-y-3.5 pt-8 border-t border-white/5 mb-10">
                  <div className="flex justify-between text-[9px] uppercase tracking-widest font-bold text-zinc-600">
                    <span>Subtotal</span>
                    <span className="text-zinc-400 font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[9px] uppercase tracking-widest font-bold text-zinc-600">
                    <span>Shipping</span>
                    <span className="text-zinc-400 font-mono">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[9px] uppercase tracking-widest font-bold text-zinc-600">
                    <span>Vat / Tax</span>
                    <span className="text-zinc-400 font-mono">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-end pt-6">
                    <div>
                      <p className="text-white text-4xl font-black tracking-tighter leading-none judson-bold">${total.toFixed(2)}</p>
                      <p className="text-[8px] uppercase text-[#FF2E2E] font-black tracking-[0.3em] mt-2">Final Total USD</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/5 rounded-full border border-green-500/10">
                       <IconShieldCheck size={10} className="text-green-500" />
                       <span className="text-[7px] text-green-500 font-black uppercase tracking-widest">Verified</span>
                    </div>
                  </div>
                </div>

                {/* PAYMENT CARD INPUTS */}
                <div className="space-y-4 mb-8">
                   <div className="relative group/input">
                      <IconCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-800 group-focus-within/input:text-[#FF2E2E] transition-colors" size={16} />
                      <input type="text" placeholder="CARD NUMBER" className="w-full bg-black border border-white/5 p-4 pl-12 text-[10px] font-black tracking-[0.2em] text-white rounded-xl focus:border-[#FF2E2E]/40 outline-none transition-all placeholder:text-zinc-900" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="relative group/input">
                        <IconCalendarEvent className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-800 group-focus-within/input:text-[#FF2E2E]" size={16} />
                        <input type="text" placeholder="MM / YY" className="w-full bg-black border border-white/5 p-4 pl-12 text-[10px] font-black tracking-[0.2em] text-white rounded-xl focus:border-[#FF2E2E]/40 outline-none transition-all placeholder:text-zinc-900" />
                      </div>
                      <div className="relative group/input">
                        <IconShieldLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-800 group-focus-within/input:text-[#FF2E2E]" size={16} />
                        <input type="text" placeholder="CVC" className="w-full bg-black border border-white/5 p-4 pl-12 text-[10px] font-black tracking-[0.2em] text-white rounded-xl focus:border-[#FF2E2E]/40 outline-none transition-all placeholder:text-zinc-900" />
                      </div>
                   </div>
                </div>

                {/* PLACE ORDER BUTTON */}
                <button 
                  disabled={cart.length === 0}
                  onClick={handlePlaceOrder}
                  className="w-full group bg-white hover:bg-[#FF2E2E] py-5 rounded-full transition-all duration-700 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="flex items-center justify-center gap-4 text-black group-hover:text-white transition-colors relative z-10">
                      <span className="text-[11px] font-black uppercase tracking-[0.3em]">Authorize Payment</span>
                      <IconArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </button>

                {/* TRUST LOGOS */}
                <div className="mt-10 flex flex-col items-center gap-6">
                   <div className="flex items-center gap-6 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-2.5" alt="Visa" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="Paypal" />
                      <IconBrandApple size={18} className="text-white" fill="currentColor" />
                   </div>
                   <p className="text-[7px] text-zinc-800 uppercase font-black tracking-[0.4em] flex items-center gap-2">
                     <IconLock size={10} /> Fully Secure 256-bit SSL Connection
                   </p>
                </div>
              </motion.div>

              {/* QUICK CHECKOUT OPTIONS */}
              <div className="bg-[#080808] border border-white/5 p-6 rounded-3xl shadow-2xl">
                 <p className="text-center text-[8px] uppercase tracking-[0.4em] font-black text-zinc-700 mb-5">Express Gateways</p>
                 <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-3 bg-[#5F33FF] hover:bg-[#4a26cc] py-4 rounded-xl text-white transition-all transform active:scale-95 group">
                       <IconDeviceMobile size={18} className="group-hover:rotate-12 transition-transform" />
                       <span className="text-[10px] font-black uppercase tracking-widest">G-Pay</span>
                    </button>
                    <button className="flex items-center justify-center gap-3 bg-[#F6BB42] hover:bg-[#e0a82e] py-4 rounded-xl text-black transition-all transform active:scale-95 group">
                       <IconBrandPaypal size={18} fill="black" className="group-hover:-rotate-12 transition-transform" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Paypal</span>
                    </button>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;