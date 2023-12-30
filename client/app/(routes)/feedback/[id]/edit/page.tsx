'use client';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import FeedbackForm from '@/components/form';
import styles from './page.module.scss';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown';
import axios from 'axios';
import { useEffect } from 'react';

const FeedbackEditPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>();

  useEffect(() => {
    const getFormData = async () => {
      const response = await axios.get(`http://localhost:8080/feedback/${id}`);
      const feedback = response.data.data;
      setValue('title', feedback.title);
      setValue('category', feedback.category);
      setValue('status', feedback.status);
      setValue('description', feedback.description);
    };
    getFormData();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.put(`http://localhost:8080/feedback/${id}/update`, data);
      router.push('/');
    } catch (error) {
      console.log('An error occurred while editing feedback');
    }
  };

  const deleteFeedback = async () => {
    try {
      await axios.delete(`http://localhost:8080/feedback/${id}/delete`);
      router.push('/');
    } catch (error) {
      console.log('An error occurred while deleting feedback');
    }
  };

  const cancelAction = () => {
    router.push('/');
  };

  const categories = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug'];
  const status = ['Suggestion', 'Planned', 'In-Progress', 'Live'];

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
      <Dropdown
        id="status"
        title="Update Status"
        subtitle="Change feedback state"
        options={status}
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
      <Button label="Delete" onClick={deleteFeedback} />
      <div className={styles.primary_actions}>
        <Button label="Cancel" onClick={cancelAction} />
        <Button label="Update Feedback" onClick={handleSubmit(onSubmit)} />
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

export default FeedbackEditPage;
