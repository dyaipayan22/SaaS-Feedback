'use client';

import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  ErrorMessage,
} from 'react-hook-form';
import styles from './input.module.scss';

interface InputProps {
  category?: string;
  id: string;
  title: string;
  subtitle?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors | undefined;
}

const Input: React.FC<InputProps> = ({
  category = 'input',
  id,
  title,
  subtitle,
  type = 'text',
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className={styles.main}>
      <label className={styles.label}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>{subtitle}</span>
      </label>
      {category === 'textbox' ? (
        <textarea
          id={id}
          disabled={disabled}
          rows={5}
          maxLength={250}
          {...register(id, { required: `Can't be empty` })}
          className={`${styles.input} ${errors && styles.input_error}`}
        />
      ) : (
        <input
          id={id}
          disabled={disabled}
          type={type}
          {...register(id, { required: `Can't be empty` })}
          placeholder=""
          className={`${styles.input} ${errors && styles.input_error}`}
        />
      )}

      {errors?.[id] && (
        <span className={styles.error}>{errors[id]?.message}</span>
      )}
    </div>
  );
};

export default Input;
