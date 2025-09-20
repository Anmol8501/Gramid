// Product image mapping for the market system
export const productImages = {
  mango: "https://www.fortheloveofnature.in/cdn/shop/products/Mangiferaindica-Priyur_Mango_1_823x.jpg?v=1640246617",
  tomato: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?_gl=1*4sr9kt*_ga*MjEzNzYwNzAxMS4xNzU3NTY4OTky*_ga_8JE65Q40S6*czE3NTc1Njg5OTIkbzEkZzEkdDE3NTc1NjkwMDkkajQzJGwwJGgw",
  wheat: "https://placehold.co/150x150",
  rice: "https://placehold.co/150x150",
  bajra: "https://placehold.co/150x150",
  jowar: "https://placehold.co/150x150",
  maize: "https://placehold.co/150x150"
};

// Function to get product image by product name
export const getProductImage = (productName) => {
  const normalizedName = productName.toLowerCase();
  return productImages[normalizedName] || "https://placehold.co/150x150";
};

// Function to get shop image based on products available
export const getShopImage = (products) => {
  if (!products || !Array.isArray(products)) {
    return "https://placehold.co/150x150";
  }
  
  // Priority order for images
  const priorityOrder = ['mango', 'tomato', 'wheat', 'rice', 'bajra', 'jowar', 'maize'];
  
  for (const product of priorityOrder) {
    if (products.includes(product)) {
      return getProductImage(product);
    }
  }
  
  return "https://placehold.co/150x150";
};
