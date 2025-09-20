// Product image mapping for the bazzar system
export const bazzarProductImages = {
  // Fruits
  mango: "https://www.fortheloveofnature.in/cdn/shop/products/Mangiferaindica-Priyur_Mango_1_823x.jpg?v=1640246617",
  apple: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400",
  banana: "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400",
  orange: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400",
  grapes: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400",
  
  // Vegetables
  tomato: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?_gl=1*4sr9kt*_ga*MjEzNzYwNzAxMS4xNzU3NTY4OTky*_ga_8JE65Q40S6*czE3NTc1Njg5OTIkbzEkZzEkdDE3NTc1NjkwMDkkajQzJGwwJGgw",
  potato: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=400",
  onion: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=400",
  carrot: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400",
  spinach: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400",
  
  // Grains
  rice: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400",
  wheat: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400",
  corn: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400",
  
  // Dairy
  milk: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400",
  cheese: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400",
  butter: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400",
  
  // Oils
  olive_oil: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400",
  coconut_oil: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400",
  
  // Fertilizers
  organic_fertilizer: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400",
  chemical_fertilizer: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400"
};

// Function to get product image by product name
export const getBazzarProductImage = (productName) => {
  if (!productName) return "https://placehold.co/400x300";
  
  const normalizedName = productName.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
  
  return bazzarProductImages[normalizedName] || "https://placehold.co/400x300";
};

// Function to get suggested image URL based on product name and category
export const getSuggestedImageUrl = (productName, category) => {
  const normalizedName = productName.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
  
  // Check for exact match first
  if (bazzarProductImages[normalizedName]) {
    return bazzarProductImages[normalizedName];
  }
  
  // Check for partial matches
  for (const [key, url] of Object.entries(bazzarProductImages)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return url;
    }
  }
  
  // Return category-based fallback
  switch (category?.toLowerCase()) {
    case 'fruits':
      return bazzarProductImages.mango;
    case 'vegetables':
      return bazzarProductImages.tomato;
    case 'grains':
      return bazzarProductImages.rice;
    case 'dairy':
      return bazzarProductImages.milk;
    case 'oils':
      return bazzarProductImages.olive_oil;
    case 'fertilizers':
      return bazzarProductImages.organic_fertilizer;
    default:
      return "https://placehold.co/400x300";
  }
};

// Function to get all available product images for suggestions
export const getProductImageSuggestions = () => {
  return Object.entries(bazzarProductImages).map(([name, url]) => ({
    name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    url,
    key: name
  }));
};
