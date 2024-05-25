"use client";

import { Lecture } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LecturesListProps {
  items: Lecture[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const LecturesList = ({
  items,
  onReorder,
  onEdit,
}: LecturesListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [lectures, setLectures] = useState(items);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLectures(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(lectures);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);
    const updatedLectures = items.slice(startIndex, endIndex + 1);
    setLectures(items);
    const bulkUpdatedData = updatedLectures.map((lecture) => ({
      id: lecture.id,
      position: items.findIndex((item) => item.id === lecture.id),
    }));
    onReorder(bulkUpdatedData);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lectures">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {lectures.map((lecture, index) => (
              <Draggable
                key={lecture.id}
                draggableId={lecture.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      lecture.isPublished &&
                        "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        lecture.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {lecture.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {lecture.isFree && <Badge>Free</Badge>}
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          lecture.isPublished && "bg-sky-700"
                        )}
                      >
                        {lecture.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                        onClick={() => onEdit(lecture.id)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
