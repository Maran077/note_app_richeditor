import NoteEditor from "../component/NoteEditor";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../utilities/query/note";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = {};
type responseType ={
  success:boolean;
  message:string;
}
function CreateNote({}: Props) {
  const navigate = useNavigate()
  const {mutate , isPending , status} = useMutation({
    mutationKey:["create"],
    mutationFn:(note:string)=>createNote(note ),
    onSuccess:(res:responseType)=>{
      if(!res.success)return toast.error(res.message)  
      toast.success(res.message) 
      navigate("/")
    },
    onError:(e)=>toast.error(e.message)

  })
  useEffect(()=>{},[status])
  return <NoteEditor mutate={mutate} isLoading={isPending} key={"create note"} /> 
}

export default CreateNote;
