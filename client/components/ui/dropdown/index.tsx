import styles from './dropdown.module.scss';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface DropdownProps {
  id: string;
  title: string;
  subtitle?: string;
  options: string[];
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors | undefined;
}

const Dropdown: React.FC<DropdownProps> = ({
  id,
  title,
  subtitle,
  options,
  required,
  register,
  errors,
}) => {
  return (
    <div className={styles.main}>
      <label className={styles.label}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>{subtitle}</span>
      </label>
      <select
        id={id}
        {...register(id, { required: `Can't be empty` })}
        className={styles.select}
      >
        {options &&
          options.map((option, index) => (
            <option key={index} className={styles.options}>
              {option}
            </option>
          ))}
      </select>
      {errors?.[id] && (
        <span className={styles.error}>{errors[id]?.message}</span>
      )}
    </div>
  );
};

export default Dropdown;
