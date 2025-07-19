
import React from 'react';
import FormTextArea from '@/components/FormTextArea';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import { FormData } from '@/types/formTypes';
import { followerCountOptions } from '@/utils/formOptions';

interface ContentQuestionsStepProps {
  formData: FormData;
  formErrors: Partial<Record<keyof FormData, string>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ContentQuestionsStep: React.FC<ContentQuestionsStepProps> = ({
  formData,
  formErrors,
  handleChange
}) => {
  return (
    <>
      <h3 className="text-xl font-space font-medium text-white/90 mb-4">Content-Driven Questions</h3>
      
      <FormTextArea
        label="What do you create content about? (100 words max)"
        name="contentTopic"
        value={formData.contentTopic}
        onChange={handleChange}
        placeholder="Describe the topics and themes of your content"
        maxLength={500}
        required
        error={formErrors.contentTopic}
      />
      
      <FormInput
        label="Drop 1 link you're most proud of (reel, post, etc.)"
        name="proudLink"
        type="url"
        value={formData.proudLink}
        onChange={handleChange}
        placeholder="https://example.com/your-proud-content"
        required
        error={formErrors.proudLink}
      />
      
      <FormSelect
        label="How many followers do you have?"
        name="followerCount"
        value={formData.followerCount}
        onChange={handleChange}
        options={followerCountOptions}
        required
        error={formErrors.followerCount}
      />
    </>
  );
};

export default ContentQuestionsStep;
