import styles from './form.module.scss';

interface FeedbackFormProps {
  title: string;
  body: React.ReactElement;
  footer: React.ReactElement;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ title, body, footer }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>{body}</div>
      <div className={styles.footer}>{footer}</div>
    </div>
  );
};

export default FeedbackForm;
