'use client';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import FeedbackForm from '@/components/form';
import styles from './page.module.scss';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown';
import axios from 'axios';

const FeedbackAddPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      category: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.post('http://localhost:8080/feedback/add', data);
      router.push('/');
    } catch (error) {
      console.log('An error occurred while adding feedback');
    }
  };

  const cancelAction = () => {
    router.push('/');
  };

  const categories = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug'];

  let bodyContent = (
    <div className={styles.body}>
      <Input
        id="title"
        title="Feedback Title"
        subtitle="Add a short, descriptive headline"
        register={register}
        errors={errors}
        required
      />
      <Dropdown
        id="category"
        title="Category"
        subtitle="Choose a category for your feedback"
        options={categories}
        register={register}
        errors={errors}
        required
      />
      <Input
        category="textbox"
        id="description"
        title="Feedback Detail"
        subtitle="Include any specific comments on what should be improved, added, etc."
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  let footerContent = (
    <div className={styles.footer}>
      <div className={styles.primary_actions}>
        <Button label="Cancel" onClick={cancelAction} />
        <Button label="Add Feedback" onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <FeedbackForm
          title="Create New Feedback"
          body={bodyContent}
          footer={footerContent}
        />
      </div>
    </div>
  );
};

export default FeedbackAddPage;
