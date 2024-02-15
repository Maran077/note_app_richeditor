import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const createNote = async (note: string) => {
  const res = await fetch(
    `http://localhost:3000/notes/note?token=${Cookies.get("token")}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note }),
    },
  );
  const data = await res.json();
  return data;
};

export const updateNote = async (note: string, id: string | undefined) => {
  if (!id || !note) return toast.error("id not provite");
  const res = await fetch(
    `http://localhost:3000/notes/note?token=${Cookies.get("token")}&id=${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note }),
    },
  );
  const data = await res.json();
  return data;
};

export const getNotes = async () => {
  const res = await fetch(
    `http://localhost:3000/notes/note?token=${Cookies.get("token")}`,
  );
  const data = await res.json();
  return data;
};

export const getSingleNote = async (id: string | undefined) => {
  if (!id) return;
  const res = await fetch(
    `http://localhost:3000/notes/note/single?token=${Cookies.get("token")}&id=${id}`,
  );
  const data = await res.json();
  return data;
};
