import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Product, fetchProductsByCategory } from '../api/products';

function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      fetchProductsByCategory(categoryId)
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Ошибка при загрузке продуктов категории:', error);
          setLoading(false);
        });
    }
  }, [categoryId]);

  const handleOrder = (telegramName: string) => {
    if (!telegramName) return;

    // Формируем текст сообщения
    const message = `Здравствуйте! Хочу заказать ${product.name} (${product.weightOptions[0].weight}) - ${product.weightOptions[0].price}`;
    const encodedMessage = encodeURIComponent(message);
    
    // Формируем URL с сообщением
    const finalUrl = `https://t.me/${telegramName}?text=${encodedMessage}`;
    
    window.open(finalUrl, '_blank');
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="category-page">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="category-header"
      >
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          <span>Назад</span>
        </Link>
        <h1>Категория: {products[0]?.categoryName || categoryId}</h1>
      </motion.div>
      
      <div className="product-list">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="product-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {product.photo && (
              <motion.img
                src={product.photo}
                alt={product.name}
                className="product-image"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            )}
            <div className="product-content">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="product-details">
                <div className="price">
                  {product.weightOptions[0]?.price}
                </div>
                <div className="cities">
                  {product.cities.join(' • ')}
                </div>
              </div>
              <motion.button
                className="order-button"
                onClick={() => handleOrder(product.telegramOperator || '')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={16} />
                <span>Заказать</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage; 