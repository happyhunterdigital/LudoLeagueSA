// File: src/data/products.ts
import { Product, INCIIngredient, WorkshopDate } from '../types';

export const products: Product[] = [
  { 
    id: 'p1', 
    name: '3-in-1 HD Liquid Foundation', 
    category: 'Face', 
    price: 350.00, 
    desc: 'HD Liquid Foundation-Fixed and covering cosmetics. Soft formula perfectly mattifies and hides skin imperfections. Resistant coating 8 hours with SPF 25.',
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370849/HD_Liquid_Foundation_Shade_03._vsccn8.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370844/HD_Liquid_Foundation_Shade_04_wp7awd.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370847/HD_Liquid_Foundation_Shade_05_p4801l.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1779370845/HD_Liquid_Foundation_Shade_06_ufmjya.jpg"
    ] 
  },
  { 
    id: 'p2', 
    name: '"The Bomb" Matte Lipstick', 
    category: 'Lips', 
    price: 185.00, 
    desc: 'Ultra-pigmented matte texture that won\'t smudge or transfer. Enriched with skin-conditioning emollients.',
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780514746/IMG_3579_yeshb8.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780514752/IMG_3550_srr57a.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780514749/IMG_3656_iielpb.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780514746/IMG_3660_xqy9ht.jpg"
    ] 
  },
  { 
    id: 'p3', 
    name: 'Premium Luscious Lip Gloss', 
    category: 'Lips', 
    price: 160.00, 
    desc: 'High-gloss structural formula providing instant plumpness and shine with zero stickiness.',
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780514744/IMG_3635_gxwlkw.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780514744/IMG_3555_lljxjz.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780514743/IMG_3573_clelw9.jpg"
    ] 
  },
  {
    id: 'p4',
    name: 'MUA Matte Lip Liner Duo',
    category: 'Lips',
    price: 145.00,
    desc: 'High-definition framing pencils to outline, shape, and maintain lip colour borders.',
    swatches: [
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780514742/IMG_3571_bpohpk.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780514736/IMG_3562_fen9tf.jpg",
      "https://res.cloudinary.com/dafc66cma/image/upload/q_auto/f_auto/v1780514735/IMG_3637_o9fyzk.jpg"
    ]
  }
];

export const ingredients: INCIIngredient[] = [
  { name: 'Centella Asiatica', hazard: '1/10 (Safe)', function: 'Botanical Skin Calming', desc: 'Promotes rapid healing, ideal for sensitive skin and redness.' },
  { name: 'Titanium Dioxide', hazard: '2/10 (Safe)', function: 'Physical UV Blocker', desc: 'Provides non-irritating SPF shielding against harsh SA sun rays.' },
  { name: 'Mica Pearls', hazard: '1/10 (Safe)', function: 'Mineral Luminescence', desc: 'Reflects ambient lighting for an organic, natural glow finish.' },
  { name: 'Hyaluronic Acid', hazard: '1/10 (Safe)', function: 'Moisture Humectant', desc: 'Pulls hydration deep into cellular levels to plump dry areas.' }
];

export const workshopDates: WorkshopDate[] = [
  { id: 'w1', date: 'October 12, 2025', location: 'Pretoria Brooklyn Studio', capacity: '2 Seats Left' },
  { id: 'w2', date: 'October 24, 2025', location: 'Pretoria Brooklyn Studio', capacity: '4 Seats Left' },
  { id: 'w3', date: 'November 08, 2025', location: 'Pretoria Brooklyn Studio', capacity: '6 Seats Left' }
];
