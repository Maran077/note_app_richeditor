import React, { useEffect } from "react";
import CreateNoteButton from "../component/CreateNoteButton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotes } from "../utilities/query/note";
import { useAppDispatch, useAppSelector } from "../utilities/redux/hooks";
import Note from "../component/Note";
import { setNoteInRedux } from "../utilities/redux/notes";
import LoadingComponent from "../component/LoadingComponent ";

type Notes = {
  _id: number;
  note: string;
  date: Date;
  userId: number;
  __v: number;
}[];

function Home() {
  const dispatch = useAppDispatch();
  const {notes} = useAppSelector(state=>state)
  const queryClient = useQueryClient()
  const { data, isError, isLoading, status ,error } = useQuery({
    queryKey: ["home"],
    queryFn: getNotes,
  },queryClient);

  useEffect(()=>{
    if(!data || !data?.success) return;
    const notes: Notes = data.notes;
    notes.map(note=>
      dispatch(setNoteInRedux({note:note.note , id:note._id , date:note.date}))
      )
  },[status])

  if (isLoading) return <LoadingComponent/>
  if (!data?.success || isError ) return <h1 className="text-center p-3 font-bol text-red-600">{error?.message || data?.message}</h1>
  
  return (
    <main className="h-[100%] w-[100dvw] bg-color-sixty">
      <CreateNoteButton />
      <ul className="flex justify-center gap-2 pt-4">
        {notes.map((note) => {
        if(!note.note || !note.id) return
        return(
          <Note key={note.id} note={note.note} id={note.id} />
        )})}
      </ul>
    </main>
  );
}

export default Home;
