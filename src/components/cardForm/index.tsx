import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Icards, TaskType } from 'Q/models/types';
import { Select, Input as AntdInput, Button as AntdButton } from 'antd';
import styled from 'styled-components';

const { Option } = Select;

interface ICardForm {
  onCloseModal: () => void;
  onAddCard: (selectedStatus: keyof Icards, data: any) => void;
  selectedSection: keyof Icards;
  selectedCardData: TaskType;
}

const Button = styled(AntdButton)`
  /* Ant Design Button stilleri buraya eklenebilir */
`;

const CardFormContainer = styled.div`
  max-width: 32rem;
  margin: auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const CardForm = ({
  onCloseModal,
  onAddCard,
  selectedSection,
  selectedCardData,
}: ICardForm) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskType>();

  const [status, setStatus] = useState(selectedSection);

  const onSubmit = async (data: TaskType) => {
    // Submit logic...
  };

  const cardSections = ['todo', 'doing', 'done'];

  // @ts-ignore
  return (
    <CardFormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Title</Label>
          <Controller
            name='title'
            control={control}
            rules={{ required: 'Title is required.' }}
            render={({ field }) => <AntdInput {...field} />}
            defaultValue={selectedCardData?.title}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </div>
        <div>
          <Label>Description</Label>
          <Controller
            name='description'
            control={control}
            rules={{ required: 'Description is required.' }}
            defaultValue={selectedCardData?.description}
            render={({ field }) => <AntdInput {...field} />}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>
        <div>
          <Label>Status</Label>
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                style={{ width: '250px' }}
                onChange={(val) => setStatus(val as keyof Icards)}
                defaultValue={selectedSection}
              >
                {cardSections.map((section, i) => (
                  <Option key={i} value={section}>
                    {section}
                  </Option>
                ))}
              </Select>
            )}
          />
        </div>
        <div className='mb-4'>
          <Label>Etiketler</Label>
          <AntdInput />
        </div>
        <div className='flex justify-end'>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </div>
      </form>
    </CardFormContainer>
  );
};

export default CardForm;
