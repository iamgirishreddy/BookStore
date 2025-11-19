const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');

dotenv.config();

const products = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "fiction",
    price: 399,
    originalPrice: 599,
    rating: 4.6,
    reviewCount: 1247,
    image: "https://books.google.com/books/content?id=besjEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    description: "A classic American novel set in the summer of 1922, following the mysterious Jay Gatsby and his pursuit of the American Dream. The story explores themes of wealth, love, and the American Dream, set against the backdrop of the Roaring Twenties. Fitzgerald's lyrical prose and memorable characters make this a timeless tale of ambition and tragedy.",
    inStock: true,
    featured: true
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "fiction",
    price: 450,
    originalPrice: 650,
    rating: 4.8,
    reviewCount: 2156,
    image: "https://books.google.com/books/content?id=ko9UrgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    description: "A gripping tale of racial injustice and childhood innocence in the American South during the 1930s. Through the eyes of young Scout Finch, the novel explores themes of empathy, morality, and the complexities of human nature. Harper Lee's masterpiece remains a powerful commentary on justice and compassion.",
    inStock: true,
    featured: true
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "science-fiction",
    price: 499,
    originalPrice: 699,
    rating: 4.7,
    reviewCount: 3421,
    image: "https://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    description: "A dystopian social science fiction novel about totalitarian control and surveillance. George Orwell's chilling vision of a future society under constant watch challenges readers to consider the dangers of unchecked power and the loss of personal freedom. '1984' is a profound warning and a literary classic.",
    inStock: true,
    featured: true
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "fiction",
    price: 379,
    originalPrice: 549,
    rating: 4.2,
    reviewCount: 1876,
    image: "https://covers.openlibrary.org/b/id/8398219-M.jpg",
    description: "A controversial coming-of-age story narrated by the cynical teenager Holden Caulfield. Salinger's novel captures the alienation and confusion of adolescence, as Holden navigates the complexities of adulthood, identity, and belonging in postwar America. The book's raw honesty and unique voice have made it a cultural touchstone.",
    inStock: true,
    featured: false
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    category: "science-fiction",
    price: 599,
    originalPrice: 799,
    rating: 4.6,
    reviewCount: 2987,
    image: "https://covers.openlibrary.org/b/id/7715948-M.jpg",
    description: "An epic science fiction novel set in the distant future amidst a feudal interstellar society. Frank Herbert's 'Dune' is a sweeping saga of politics, religion, and ecology, centered on the desert planet Arrakis and its valuable spice. The novel's intricate world-building and philosophical depth have influenced generations of readers and writers.",
    inStock: true,
    featured: true
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "fantasy",
    price: 449,
    originalPrice: 649,
    rating: 4.9,
    reviewCount: 4563,
    image: "https://covers.openlibrary.org/b/id/8429816-M.jpg",
    description: "A fantasy adventure following Bilbo Baggins on his unexpected journey to the Lonely Mountain. Tolkien's beloved tale introduces readers to Middle-earth, where courage, friendship, and cleverness triumph over adversity. 'The Hobbit' is a timeless story of growth and discovery, filled with memorable characters and magical landscapes.",
    inStock: true,
    featured: true
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "science",
    price: 549,
    originalPrice: 749,
    rating: 4.4,
    reviewCount: 1532,
    image: "https://covers.openlibrary.org/b/id/8423897-M.jpg",
    description: "A landmark book about cosmology, exploring the nature of time and the universe. Stephen Hawking makes complex scientific concepts accessible, guiding readers through black holes, the Big Bang, and the mysteries of space-time. This groundbreaking work inspires curiosity and wonder about our place in the cosmos.",
    inStock: true,
    featured: false
  },
  {
    title: "The Art of War",
    author: "Sun Tzu",
    category: "philosophy",
    price: 299,
    originalPrice: 499,
    rating: 4.3,
    reviewCount: 2211,
    image: "https://covers.openlibrary.org/b/id/8369573-M.jpg",
    description: "An ancient Chinese military treatise on strategy and tactics, applicable to many areas of life.",
    inStock: true,
    featured: false
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "history",
    price: 649,
    originalPrice: 899,
    rating: 4.7,
    reviewCount: 5431,
    image: "https://covers.openlibrary.org/b/id/8423825-M.jpg",
    description: "A fascinating exploration of how Homo sapiens came to dominate the world.",
    inStock: true,
    featured: true
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "business",
    price: 699,
    originalPrice: 999,
    rating: 4.1,
    reviewCount: 1876,
    image: "https://covers.openlibrary.org/b/id/8383563-M.jpg",
    description: "A methodology for developing businesses and products through validated learning.",
    inStock: true,
    featured: false
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    category: "fantasy",
    price: 499,
    originalPrice: 699,
    rating: 4.9,
    reviewCount: 8765,
    image: "https://covers.openlibrary.org/b/id/8398212-M.jpg",
    description: "The magical beginning of Harry Potter's journey at Hogwarts School of Witchcraft and Wizardry.",
    inStock: true,
    featured: true
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "fiction",
    price: 349,
    originalPrice: 499,
    rating: 4.3,
    reviewCount: 3421,
    image: "https://covers.openlibrary.org/b/id/8412844-M.jpg",
    description: "A philosophical book about following your dreams and listening to your heart.",
    inStock: false,
    featured: false
  },
  {
    title: "The God of Small Things",
    author: "Arundhati Roy",
    category: "fiction",
    price: 425,
    originalPrice: 599,
    rating: 4.6,
    reviewCount: 2134,
    image: "https://covers.openlibrary.org/b/id/8421563-M.jpg",
    description: "A story about the childhood experiences of fraternal twins whose lives are destroyed by social conventions.",
    inStock: true,
    featured: true
  },
  {
    title: "The White Tiger",
    author: "Aravind Adiga",
    category: "fiction",
    price: 399,
    originalPrice: 549,
    rating: 4.4,
    reviewCount: 1987,
    image: "https://covers.openlibrary.org/b/id/8421564-M.jpg",
    description: "A darkly humorous perspective on India's class struggle told through the eyes of a village boy.",
    inStock: true,
    featured: false
  },
  {
    title: "Midnight's Children",
    author: "Salman Rushdie",
    category: "fiction",
    price: 499,
    originalPrice: 699,
    rating: 4.5,
    reviewCount: 2543,
    image: "https://covers.openlibrary.org/b/id/8421565-M.jpg",
    description: "A magical realist epic that intertwines the fate of India with personal destinies.",
    inStock: true,
    featured: true
  },
  {
    title: "The Immortals of Meluha",
    author: "Amish Tripathi",
    category: "mythology",
    price: 349,
    originalPrice: 499,
    rating: 4.3,
    reviewCount: 5678,
    image: "https://covers.openlibrary.org/b/id/8421566-M.jpg",
    description: "The first book of the Shiva Trilogy reimagining the legend of Lord Shiva as a mortal hero.",
    inStock: true,
    featured: true
  },
  {
    title: "Train to Pakistan",
    author: "Khushwant Singh",
    category: "history",
    price: 375,
    originalPrice: 525,
    rating: 4.6,
    reviewCount: 1876,
    image: "https://covers.openlibrary.org/b/id/8421567-M.jpg",
    description: "A powerful novel about the partition of India and its impact on a small village.",
    inStock: true,
    featured: false
  },
  {
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    category: "biography",
    price: 299,
    originalPrice: 449,
    rating: 4.8,
    reviewCount: 9876,
    image: "https://covers.openlibrary.org/b/id/8421568-M.jpg",
    description: "An autobiography of India's Missile Man and former President APJ Abdul Kalam.",
    inStock: true,
    featured: true
  },
  {
    title: "My Experiments with Truth",
    author: "Mahatma Gandhi",
    category: "biography",
    price: 325,
    originalPrice: 475,
    rating: 4.7,
    reviewCount: 4321,
    image: "https://covers.openlibrary.org/b/id/8421569-M.jpg",
    description: "Gandhi's autobiography chronicling his spiritual and moral experiments.",
    inStock: true,
    featured: false
  },
  {
    title: "The Palace of Illusions",
    author: "Chitra Banerjee Divakaruni",
    category: "mythology",
    price: 425,
    originalPrice: 599,
    rating: 4.5,
    reviewCount: 3456,
    image: "https://covers.openlibrary.org/b/id/8421570-M.jpg",
    description: "The Mahabharata retold from Draupadi's perspective with vivid imagination.",
    inStock: true,
    featured: true
  },
  {
    title: "A Suitable Boy",
    author: "Vikram Seth",
    category: "fiction",
    price: 799,
    originalPrice: 1099,
    rating: 4.4,
    reviewCount: 2187,
    image: "https://covers.openlibrary.org/b/id/8421571-M.jpg",
    description: "An epic tale set in post-independence India following four families.",
    inStock: true,
    featured: false
  },
  {
    title: "The Namesake",
    author: "Jhumpa Lahiri",
    category: "fiction",
    price: 399,
    originalPrice: 549,
    rating: 4.3,
    reviewCount: 2876,
    image: "https://covers.openlibrary.org/b/id/8421572-M.jpg",
    description: "A story about the struggles of identity and belonging in immigrant families.",
    inStock: true,
    featured: false
  },
  {
    title: "Sita: Warrior of Mithila",
    author: "Amish Tripathi",
    category: "mythology",
    price: 399,
    originalPrice: 549,
    rating: 4.6,
    reviewCount: 4567,
    image: "https://covers.openlibrary.org/b/id/8421573-M.jpg",
    description: "The second book in the Ram Chandra series telling Sita's story.",
    inStock: true,
    featured: true
  },
  {
    title: "India After Gandhi",
    author: "Ramachandra Guha",
    category: "history",
    price: 699,
    originalPrice: 999,
    rating: 4.7,
    reviewCount: 3214,
    image: "https://covers.openlibrary.org/b/id/8421574-M.jpg",
    description: "A comprehensive history of independent India from 1947 onwards.",
    inStock: true,
    featured: false
  }
];


const calculateCategoryCounts = (products) => {
  const counts = {};
  products.forEach(product => {
    counts[product.category] = (counts[product.category] || 0) + 1;
  });
  return counts;
};

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    await Product.deleteMany();
    await Category.deleteMany();
    console.log('Data cleared');
    
    await Product.insertMany(products);
    console.log('✅ Products inserted');
    

    const categoryCounts = calculateCategoryCounts(products);
    

    const categories = [
      { 
        name: "fiction", 
        displayName: "Fiction", 
        count: categoryCounts['fiction'] || 0
      },
      { 
        name: "science-fiction", 
        displayName: "Science Fiction", 
        count: categoryCounts['science-fiction'] || 0
      },
      { 
        name: "fantasy", 
        displayName: "Fantasy", 
        count: categoryCounts['fantasy'] || 0
      },
      { 
        name: "science", 
        displayName: "Science", 
        count: categoryCounts['science'] || 0
      },
      { 
        name: "philosophy", 
        displayName: "Philosophy", 
        count: categoryCounts['philosophy'] || 0
      },
      { 
        name: "history", 
        displayName: "History", 
        count: categoryCounts['history'] || 0
      },
      { 
        name: "business", 
        displayName: "Business", 
        count: categoryCounts['business'] || 0
      },
      { 
        name: "mythology", 
        displayName: "Mythology", 
        count: categoryCounts['mythology'] || 0
      },
      { 
        name: "biography", 
        displayName: "Biography", 
        count: categoryCounts['biography'] || 0
      }
    ];
    
    await Category.insertMany(categories);
    console.log('✅ Categories inserted with dynamic counts');
    
    console.log('\n✅ Data imported successfully!');
    console.log(`📚 Total products: ${products.length}`);
    console.log('📊 Category counts:', categoryCounts);
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

importData();
