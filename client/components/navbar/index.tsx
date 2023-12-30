'use client';
import { useRouter } from 'next/navigation';
import Button from '../ui/button';
import styles from './navbar.module.scss';
import SortingDropdown from '../sort';

const Navbar = ({
  setParams,
  numberOfSuggestions,
}: {
  setParams: (params: any) => void;
  numberOfSuggestions: number;
}) => {
  const router = useRouter();

  const setFilter = (sortBy: string) => {
    setParams((prevParams: any) => ({
      ...prevParams,
      sortBy,
    }));
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.text_container}>
        <div className={styles.suggestions}>
          {numberOfSuggestions} Suggestions
        </div>
        <SortingDropdown handleSortChange={setFilter} />
      </div>
      <Button
        label="Add Feedback"
        onClick={() => router.push('/feedback/add')}
      />
    </nav>
  );
};

export default Navbar;
