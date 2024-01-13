"use client";

import React, { ReactNode, useState } from "react";
import { useForm, Controller } from "react-hook-form";

// import { Select } from "react-daisyui";

import { Icards, TaskType } from "Q/models/types";
import { Select, SelectProps } from "antd";

const { Option } = Select;

interface ICardForm {
  onCloseModal: () => void;
  onAddCard: (selectedStatus: keyof Icards, data: any) => void;
  selectedSection: keyof Icards;
  selectedCardData: TaskType;
}

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

  console.log("status", status);

  const onSubmit = async (data: TaskType) => {
    const isEdit = selectedCardData && Object.keys(selectedCardData).length > 0;
    if (isEdit) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/todo/${selectedCardData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, status, id: selectedCardData.id }),
          }
        );

        if (response.ok) {
          onAddCard(status, { ...data, status, id: selectedCardData.id });
        } else {
          console.error("Failed to save data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:3000/api/todo/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, status }),
        });

        if (response.ok) {
          const res = await response.json();
          onAddCard(status, { ...data, status, id: res.id });
        } else {
          console.error("Failed to save data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    onCloseModal();
  };

  const cardSections = ["todo", "doing", "done"];

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required." }}
            render={({ field }) => (
              <input
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                {...field}
              />
            )}
            defaultValue={selectedCardData?.title}
          />
          {errors.title && (
            <p className="text-sm text-red-400">{`${errors.title.message}`}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required." }}
            defaultValue={selectedCardData?.description}
            render={({ field }) => (
              <textarea
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                {...field}
              ></textarea>
            )}
          />
          {errors.description && (
            <p className="text-sm text-red-400">{`${errors.description.message}`}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          {selectedSection};
          {/* <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                style={{ width: "250px" }}
                defaultValue={selectedSection}
              >
                {cardSections.map((section, i) => (
                  <Option key={i} value="todo">
                    {section}
                  </Option>
                ))}
              </Select>
              // <Select
              //   {...field}
              //   // value={status}
              //   // onChange={(val) => {
              //   //   setStatus(val as keyof Icards);
              //   // }}

              //   options={cardSections.map((section) => ({
              //     label: section,
              //     value: section,
              //   }))}
              // />
              // <select {...field}>
              //   <option value="todo">todo</option>
              //   <option value="doing">doing</option>
              //   <option value="done">done</option>
              // </select>
            )}
          /> */}
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                style={{ width: "250px" }}
                onChange={(val) => setStatus(val)}
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

        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Attachmenets
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={attachments}
            onChange={(e) => setAttachments(e.target.value)}
          />
        </div> */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Etiketler
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Durum
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div> */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
