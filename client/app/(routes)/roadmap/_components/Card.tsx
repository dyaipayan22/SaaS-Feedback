import Badge from '@/components/ui/badge';
import styles from './card.module.scss';
import Upvote from '@/components/ui/upvote';
import commentIcon from '@/public/icons/icon-comments.svg';
import Image from 'next/image';

const Card = ({ feedback, type }: { feedback: Feedback; type?: string }) => {
  const { _id, title, description, status, category, comments, upvotes } =
    feedback;

  let cardBorder;
  let cardBullet;
  if (type === 'planned') {
    cardBorder = `${styles.planned}`;
    cardBullet = `${styles.planned}`;
  } else if (type === 'progress') {
    cardBorder = `${styles.progress}`;
    cardBullet = `${styles.progress}`;
  } else if (type === 'live') {
    cardBorder = `${styles.live}`;
    cardBullet = `${styles.live}`;
  }

  return (
    <div className={styles.main}>
      <div className={`${styles.border} ${styles.live}`} />
      <div className={styles.status_container}>
        <span className={styles.status}>{status}</span>
      </div>
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
      <Badge label={category} />
      <div className={styles.info_container}>
        <Upvote votes={upvotes} />
        <Image
          src={commentIcon}
          alt="Comment"
          height={15}
          width={15}
          className={styles.image}
        />
        <span className={styles.comment}>{comments?.length}</span>
      </div>
    </div>
  );
};

export default Card;
