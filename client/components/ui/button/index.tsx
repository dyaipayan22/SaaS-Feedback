'use client';
import styles from './button.module.scss';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button className={styles.btn} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
