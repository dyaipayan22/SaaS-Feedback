'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import styles from './page.module.scss';
import Navbar from '@/components/navbar';
import axios from 'axios';
import FeedbackCard from '../components/card/Card';
import Image from 'next/image';
import empty from '@/public/assets/illustration-empty.svg';

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [numSuggestions, setNumSuggestions] = useState<number>(0);
  const [counts, setCounts] = useState({
    planned: 0,
    progress: 0,
    live: 0,
  });
  const [params, setParams] = useState<{ sortBy: string; category: string }>({
    sortBy: '',
    category: '',
  });

  useEffect(() => {
    const initialCounts = {
      planned: 0,
      progress: 0,
      live: 0,
    };
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/feedback', {
          params,
        });
        const feedbacksData = response.data.data;
        setFeedbacks(feedbacksData);
        const suggestionFeedbacks = feedbacksData.filter(
          (feedback: Feedback) => feedback.status === 'Suggestion'
        );
        setNumSuggestions(suggestionFeedbacks.length);
        const counts = feedbacksData.reduce((acc, feedback) => {
          if (feedback.status === 'Planned') {
            acc.planned++;
          } else if (feedback.status === 'In-Progress') {
            acc.progress++;
          } else if (feedback.status === 'Live') {
            acc.live++;
          }
          return acc;
        }, initialCounts);

        setCounts(counts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuggestions();
  }, [params]);
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Sidebar setParams={setParams} counts={counts} />
        <div className={styles.suggestions_container}>
          <Navbar setParams={setParams} numberOfSuggestions={numSuggestions} />
          {feedbacks && feedbacks.length === 0 ? (
            <div className={styles.empty_container}>
              <Image src={empty} height={100} width={100} alt="Empty" />
              <span className={styles.text}>
                Got a suggestion? Found a bug that needs to be squashed?
              </span>
              <span className={styles.text}>
                We love hearing new ideas to improve our app.
              </span>
            </div>
          ) : (
            feedbacks?.map((feedback, index) => (
              <FeedbackCard feedback={feedback} key={index} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
