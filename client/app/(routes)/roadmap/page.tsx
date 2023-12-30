'use client';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import styles from './page.module.scss';
import Card from './_components/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';

const RoadmapPage = () => {
  const router = useRouter();
  const [planned, setPlanned] = useState<Feedback[]>([]);
  const [progress, setProgress] = useState<Feedback[]>([]);
  const [live, setLive] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/feedback');
        const feedbacks = response.data.data;
        const plannedFeedbacks: Feedback[] = [];
        const progressFeedbacks: Feedback[] = [];
        const liveFeedbacks: Feedback[] = [];

        feedbacks.forEach((feedback: Feedback) => {
          if (feedback.status === 'Planned') {
            plannedFeedbacks.push(feedback);
          } else if (feedback.status === 'In-Progress') {
            progressFeedbacks.push(feedback);
          } else if (feedback.status === 'Live') {
            liveFeedbacks.push(feedback);
          }
        });

        setPlanned(plannedFeedbacks);
        setProgress(progressFeedbacks);
        setLive(liveFeedbacks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeedbacks();
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.nav_container}>
            <span className={styles.back} onClick={() => router.push('/')}>
              Go Back
            </span>
            <span className={styles.heading}>Roadmap</span>
          </div>
          <Button
            label="Add Feedback"
            onClick={() => router.push('/feedback/add')}
          />
        </div>
        <div className={styles.roadmap_container}>
          <div>
            <div className={styles.title_container}>
              <span className={styles.title}>Planned</span>
              <span className={styles.subtitle}>
                Ideas prioritized for research
              </span>
            </div>
            {planned &&
              planned?.map((feedbackPlanned) => (
                <Card feedback={feedbackPlanned} key={feedbackPlanned._id} />
              ))}
          </div>
          <div>
            <div className={styles.title_container}>
              <span className={styles.title}>In-Progress</span>
              <span className={styles.subtitle}>Currently being developed</span>
            </div>
            {progress &&
              progress?.map((feedbackProgress) => (
                <Card feedback={feedbackProgress} key={feedbackProgress._id} />
              ))}
          </div>
          <div>
            <div className={styles.title_container}>
              <span className={styles.title}>Live</span>
              <span className={styles.subtitle}>Released features</span>
            </div>
            {live &&
              live?.map((feedbackLive) => (
                <Card feedback={feedbackLive} key={feedbackLive._id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
