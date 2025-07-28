"use client";

import { useState } from "react";
import { BoardRequest } from "@/types/board";
import BoardForm from "./boardForm";
import BoardSideForm from "./boardOptionForm";

export default function BoardWrite() {
  const [form, setForm] = useState<BoardRequest>({
    title: "",
    content: "",
    categoryId: "",
    tags: [],
    label: null,
    commentVisibility: true,
    notifyOption: true,
  });
  return (
    <>
      <div className="lg:col-span-2">
        <BoardForm setForm={setForm} form={form} />
      </div>
      <div className="lg:col-span-1">
        <BoardSideForm setForm={setForm} form={form} />
      </div>
    </>
  );
}
