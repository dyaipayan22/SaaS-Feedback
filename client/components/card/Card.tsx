import Image from 'next/image';
import styles from './card.module.scss';
import commentIcon from '@/public/icons/icon-comments.svg';
import Link from 'next/link';
import Upvote from '../ui/upvote';

const FeedbackCard = ({ feedback }: { feedback: Feedback }) => {
  const { _id, title, status, category, upvotes, description, comments } =
    feedback;

  return (
    <div className={styles.card_container}>
      <div className={styles.wrapper}>
        <Upvote votes={upvotes} id={_id} />
        <Link href={`/feedback/${_id}`} className={styles.container}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </Link>
      </div>
      <div className={styles.comments}>
        <Image src={commentIcon} alt="Comments" height={15} width={15} />
        <span className={styles.num_comments}>
          {comments && comments.length}
        </span>
      </div>
    </div>
  );
};

export default FeedbackCard;
