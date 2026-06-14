import { Shield, Truck, Award, Clock, Heart, Star } from 'lucide-react';
import styles from './About.module.css';

const About = () => {
  const features = [
    { icon: Shield, title: 'Premium Quality', description: 'We use only the finest materials for our products' },
    { icon: Truck, title: 'Fast Shipping', description: 'Free express shipping on orders over $100' },
    { icon: Award, title: 'Best in Class', description: 'Award-winning designs and craftsmanship' },
    { icon: Clock, title: '24/7 Support', description: 'Dedicated customer service team' },
  ];

  const team = [
    { name: 'Rajesh Kumar', role: 'Founder & CEO', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Priya Sharma', role: 'Creative Director', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Amit Patel', role: 'Head of Design', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'Neha Singh', role: 'Marketing Lead', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
  ];

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>About BLACK STUDIO</h1>
          <p>STYLE THAT SPEAKS</p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Our Story */}
        <div className={styles.storySection}>
          <div className={styles.storyContent}>
            <h2>Our Story</h2>
            <p>Founded in 2020, BLACK STUDIO emerged from a passion for creating timeless fashion that speaks to the modern man. What started as a small boutique has grown into a premium lifestyle brand, celebrated for its minimalist aesthetic and uncompromising quality.</p>
            <p>We believe that clothing is more than just fabric - it's an expression of personality. Our designs blend contemporary trends with classic silhouettes, creating pieces that are both stylish and enduring.</p>
            <p>Today, BLACK STUDIO is recognized as a leading name in men's and boys' fashion, with a commitment to sustainability, ethical production, and customer satisfaction at our core.</p>
          </div>
          <div className={styles.storyImage}>
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" alt="Our Studio" />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className={styles.missionVision}>
          <div className={styles.mission}>
            <h3>Our Mission</h3>
            <p>To empower individuals through exceptional fashion that combines comfort, style, and quality, while maintaining sustainable and ethical practices.</p>
          </div>
          <div className={styles.vision}>
            <h3>Our Vision</h3>
            <p>To become India's most trusted fashion brand, recognized globally for innovative designs and unparalleled customer experience.</p>
          </div>
        </div>

        {/* Features */}
        <div className={styles.featuresSection}>
          <h2>Why Choose Us</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <Icon size={32} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Values */}
        <div className={styles.valuesSection}>
          <h2>Our Core Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <Heart size={40} />
              <h3>Passion</h3>
              <p>We pour our hearts into every piece we create</p>
            </div>
            <div className={styles.valueCard}>
              <Star size={40} />
              <h3>Excellence</h3>
              <p>We strive for perfection in everything we do</p>
            </div>
            <div className={styles.valueCard}>
              <Shield size={40} />
              <h3>Integrity</h3>
              <p>We believe in honest and transparent business</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className={styles.teamSection}>
          <h2>Meet Our Team</h2>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsSection}>
          <div className={styles.statItem}>
            <h3>50K+</h3>
            <p>Happy Customers</p>
          </div>
          <div className={styles.statItem}>
            <h3>100K+</h3>
            <p>Products Sold</p>
          </div>
          <div className={styles.statItem}>
            <h3>4.8</h3>
            <p>Customer Rating</p>
          </div>
          <div className={styles.statItem}>
            <h3>25+</h3>
            <p>Cities Served</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;