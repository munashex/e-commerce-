import bcrypt from 'bcryptjs'
const data = {
    products: [
        {
          name: 'Nike Slim shirt',
          slug: 'nike-slim-shirt',
          category: 'Shirts',
          image: 'https://github.com/basir/mern-amazona/blob/master/frontend/public/images/p1.jpg?raw=true', // 679px × 829px
          price: 120,
          countInStock: 10,
          brand: 'Nike',
          rating: 4.5,
          numReviews: 10,
          description: 'high quality shirt',
        },
        {
          
          name: 'Adidas Fit Shirt',
          slug: 'adidas-fit-shirt',
          category: 'Shirts',
          image: 'https://github.com/basir/mern-amazona/blob/master/frontend/public/images/p2.jpg?raw=true',
          price: 250,
          countInStock: 0,
          brand: 'Adidas',
          rating: 4.0,
          numReviews: 10,
          description: 'high quality product',
        },
        {
          
          name: 'Nike Slim Pant',
          slug: 'nike-slim-pant',
          category: 'Pants',
          image: 'https://github.com/basir/mern-amazona/blob/master/frontend/public/images/p3.jpg?raw=true',
          price: 25,
          countInStock: 15,
          brand: 'Nike',
          rating: 4.5,
          numReviews: 14,
          description: 'high quality product',
        },
        {
          
          name: 'Adidas Fit Pant',
          slug: 'adidas-fit-pant',
          category: 'Pants',
          image: 'https://github.com/basir/mern-amazona/blob/master/frontend/public/images/p4.jpg?raw=true',
          price: 65,
          countInStock: 5,
          brand: 'Puma',
          rating: 4.5,
          numReviews: 10,
          description: 'high quality product',
        },
      ], 

      users: [
        { 
          name: "munashe", 
          email: "admin@gmail.com", 
          password: bcrypt.hashSync('munashe'), 
          isAdmin: true
        }, 
        {
          name: 'tinashe', 
          email: 'tinashe@gmail.com', 
          password: bcrypt.hashSync('tinashe'), 
          isAdmin: false
        }
      ]
}


export default data