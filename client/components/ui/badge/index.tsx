'use client';
import styles from './badge.module.scss';

interface BadgeProps {
  label: string;
  setCategory?: (category: string) => void;
}
const Badge: React.FC<BadgeProps> = ({ label, setCategory }) => {
  const handleCategoryClick = () => {
    setCategory(label);
  };

  return (
    <div className={styles.badge} onClick={handleCategoryClick}>
      {label}
    </div>
  );
};

export default Badge;
