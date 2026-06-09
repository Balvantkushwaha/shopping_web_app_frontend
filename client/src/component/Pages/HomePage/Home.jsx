import styles from "./Home.module.css";

function Home() {
  const products = [
    {   
      id: 1,
      name: "Wireless Headphones",
      price: "₹1,999",
      image: "https://via.placeholder.com/250",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "₹2,499",
      image: "https://via.placeholder.com/250",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: "₹1,299",
      image: "https://via.placeholder.com/250",
    },
    {
      id: 4,
      name: "Gaming Mouse",
      price: "₹799",
      image: "https://via.placeholder.com/250",
    },
  ];

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Welcome to Shopping Shop</h1>
        <p>Discover amazing products at the best prices.</p>
        <button className={styles.shopBtn}>Shop Now</button>
      </section>

      <section className={styles.products}>
        <h2>Featured Products</h2>

        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;