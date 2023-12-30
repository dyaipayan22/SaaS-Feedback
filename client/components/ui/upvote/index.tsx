import Image from 'next/image';
import styles from './upvote.module.scss';
import arrowUp from '@/public/icons/icon-arrow-up.svg';
import { useState } from 'react';
import axios from 'axios';

interface UpvoteProps {
  votes: number;
  id?: string;
}
const Upvote: React.FC<UpvoteProps> = ({ votes, id }) => {
  const [upVotes, setUpVotes] = useState<number>(votes);

  const handleUpvote = async () => {
    const response = await axios.put(
      `http://localhost:8080/feedback/${id}/upvote`
    );
    setUpVotes(response.data.data.upvotes);
  };
  return (
    <button className={styles.container} onClick={handleUpvote}>
      <Image src={arrowUp} alt="Up" height={10} width={12} />
      {upVotes}
    </button>
  );
};

export default Upvote;
