'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Button from '@/components/ui/button';
import styles from './page.module.scss';
import FeedbackCard from '../../../../components/card/Card';

const FeedbackPage = () => {
  const router = useRouter();
  const params = useParams();
  const id: string = params.id as string;
  const [feedback, setFeedback] = useState<Feedback | undefined>();

  useEffect(() => {
    const fetchFeedbacks = async (feedbackId: string) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/feedback/${feedbackId}`
        );
        setFeedback(response.data.data);
      } catch (error) {
        console.log('Feedback fetching error');
      }
    };
    fetchFeedbacks(id);
  }, [id]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.buttons_container}>
          <Button
            label="Go Back"
            onClick={() => router.push(`/feedback/${id}`)}
          />
          <Button
            label="Edit Feedback"
            onClick={() => router.push(`/feedback/${id}/edit`)}
          />
        </div>
        {feedback && (
          <>
            <FeedbackCard feedback={feedback} />

            <div className={styles.comments_container}>
              <div className={styles.num_comments}>
                {feedback.comments?.length} Comments
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
