"use client";

import React, { useEffect, useState } from "react";
import CustomModal from "../modal";
import CardForm from "../cardForm";
import { IcardData, Icards, TaskType } from "Q/models/types";

export default function HomePage(): JSX.Element {
  const [cards, setCards] = useState<Icards>({
    todo: [],
    doing: [],
    done: [],
  });

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/todo/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Data updated successfully", responseData);

        const filteredData = {
          todo: responseData.data.filter(
            (task: TaskType) => task.status === "todo"
          ),
          doing: responseData.data.filter(
            (task: TaskType) => task.status === "doing"
          ),
          done: responseData.data.filter(
            (task: TaskType) => task.status === "done"
          ),
        };

        setCards(filteredData);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<null | keyof Icards>(
    null
  );
  const [selectedCardData, setSelectedCardData] = useState<null | TaskType>(
    null
  );

  const handleOpenModal = (section: keyof Icards) => {
    setIsModalOpen(true);
    setSelectedSection(section);
  };

  console.log("selectedSection", selectedSection);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCard = (section: keyof Icards, cardData: TaskType): void => {
    const isCardIdExist = Object.values(cards).some((section) =>
      section.some((card: TaskType) => card.id === cardData.id)
    );

    if (isCardIdExist) {
      const filteredCard = cards[section].filter(
        (card) => card.id !== cardData.id
      );

      setCards((prevCards) => {
        return {
          ...prevCards,
          [section]: [...filteredCard, cardData],
        };
      });
    } else {
      setCards((prevCards) => {
        const sectionCards = prevCards[section as keyof Icards];

        const updatedSectionCards = Array.isArray(sectionCards)
          ? sectionCards
          : [];

        console.log("updatedSectionCards", updatedSectionCards);

        return {
          ...prevCards,
          [section]: [...updatedSectionCards, cardData],
        };
      });
    }
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    card: TaskType,
    section: string
  ): void => {
    event.dataTransfer.setData("text/plain", JSON.stringify({ card, section }));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const updateCardSection = async (
    card: TaskType,
    section: string
  ): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/todo/${card.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...card, status: section }),
        }
      );

      if (!response.ok) {
        throw new Error("Servis isteği başarısız oldu");
      }

      const updatedCard = await response.json();

      console.log("Kart başarıyla güncellendi:", updatedCard);
    } catch (error) {
      console.error("Servis hatası:", error);
    }
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetSection: string
  ): void => {
    event.preventDefault();
    const data = JSON.parse(
      event.dataTransfer.getData("text/plain")
    ) as IcardData;
    const { card, section: sourceSection } = data;

    updateCardSection(card, targetSection)
      .then(() => {
        const updatedSourceSection = cards[
          sourceSection as keyof Icards
        ].filter((c) => c.id !== card.id);

        setCards((prevCards) => ({
          ...prevCards,
          [sourceSection]: updatedSourceSection,
        }));

        setCards((prevCards) => ({
          ...prevCards,
          [targetSection]: [...prevCards[targetSection as keyof Icards], card],
        }));
      })
      .catch((error) => {
        console.error("Kartın bölümü güncellenirken hata:", error);
      });
  };

  const handleCardClick = (section: keyof Icards, cardId: string) => {
    const selectedCardItem = cards[section].find((c) => c.id === cardId);
    handleOpenModal(section);
    setSelectedCardData(selectedCardItem as TaskType);
  };

  return (
    <>
      <div className="flex space-x-4">
        {Object.keys(cards).map((section, i) => (
          <div
            key={section}
            className="w-1/3 rounded-lg bg-gray-300 px-4"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, section)}
          >
            <div className="p-2 mb-2">{section}</div>
            {cards[section as keyof Icards].map((card) => (
              <div
                key={card.id}
                className="bg-white mb-2 rounded-md cursor-move p-4 shadow"
                draggable
                onDragStart={(e) => handleDragStart(e, card, section)}
                onClick={() =>
                  handleCardClick(section as keyof Icards, card.id)
                }
              >
                {card.title}
              </div>
            ))}
            <button
              className="p-2 mb-2 bg-blue-500 text-white"
              onClick={() => {
                handleOpenModal(section as keyof Icards);
                setSelectedCardData(null);
              }}
            >
              Add Card
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <CustomModal
          headerText="Create New Card"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <>
            <CardForm
              onCloseModal={handleCloseModal}
              onAddCard={(selectedStatus: keyof Icards, data: TaskType) =>
                handleAddCard(selectedStatus, data)
              }
              selectedSection={selectedSection as keyof Icards}
              selectedCardData={selectedCardData as TaskType}
            />
          </>
        </CustomModal>
      )}
    </>
  );
}
