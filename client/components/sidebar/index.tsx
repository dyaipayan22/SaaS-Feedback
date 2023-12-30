'use client';
import Link from 'next/link';
import Badge from '../ui/badge';
import styles from './sidebar.module.scss';

import { CATEGORIES } from '@/constants';

const Sidebar = ({
  setParams,
  counts,
}: {
  setParams: (params: any) => void;
  counts: object;
}) => {
  const setCategoryParams = (category: string) => {
    setParams((prevParams: any) => ({
      ...prevParams,
      category,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <span className={styles.title}>Eqaim</span>
        <span className={styles.subtitle}>Feedback Board</span>
      </div>
      <div className={styles.category}>
        {CATEGORIES?.map((category, index) => (
          <Badge setCategory={setCategoryParams} label={category} key={index} />
        ))}
      </div>
      <div className={styles.roadmap}>
        <div className={styles.roadmap_title}>
          <span className={styles.roadmap_heading}>Roadmap</span>
          <Link href={'/roadmap'}>
            <span className={styles.roadmap_view}>View</span>
          </Link>
        </div>
        <div className={styles.status}>
          <div className={styles.status_item}>
            <span className={styles.item_label}>Planned</span>
            <span className={styles.item_qty}>{counts.planned}</span>
          </div>
          <div className={styles.status_item}>
            <span className={styles.item_label}>In-Progress</span>
            <span className={styles.item_qty}>{counts.progress}</span>
          </div>
          <div className={styles.status_item}>
            <span className={styles.item_label}>Live</span>
            <span className={styles.item_qty}>{counts.live}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
