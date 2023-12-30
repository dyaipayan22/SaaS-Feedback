import React, { useState } from 'react';
import styles from './sort.module.scss';

const SortingDropdown = ({ handleSortChange }) => {
  const [selectedSort, setSelectedSort] = useState('');

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedSort(selectedOption);
    handleSortChange(selectedOption); // Pass selected option to parent component
  };

  return (
    <div>
      <label htmlFor="sortDropdown" className={styles.label}>
        Sort By:
      </label>
      <select
        id="sortDropdown"
        value={selectedSort}
        onChange={handleSelectChange}
        className={styles.select}
      >
        <option value="">Select</option>
        <option value="mostUpvotes">Most Upvotes</option>
        <option value="leastUpvotes">Least Upvotes</option>
        <option value="mostComments">Most Comments</option>
        <option value="leastComments">Least Comments</option>
      </select>
    </div>
  );
};

export default SortingDropdown;
