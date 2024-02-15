import NoteEditor from "../component/NoteEditor";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../utilities/redux/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleNote, updateNote } from "../utilities/query/note";
import { toast } from "react-toastify";
import { updateNoteInRedux } from "../utilities/redux/notes";
import LoadingComponent from "../component/LoadingComponent ";

type responseType = {
  success: boolean;
  message: string;
  updateNote: string;
};

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: [id],
    mutationFn: (note: string) => updateNote(note, id),
    onSuccess: async (res: responseType) => {
      if (!res.success) return toast.error(res.message);
      toast.success(res.message);
      await queryClient.invalidateQueries();
      dispatch(updateNoteInRedux({ id: id, note: res.updateNote }));
      navigate("/");
    },
    onError: (e) => toast.error(e.message),
  });

  const { data, isLoading, isError ,error} = useQuery({
    queryKey: ["note", { id }],
    queryFn: () => getSingleNote(id),
  
  });

  if (isLoading) return <LoadingComponent/>
  if (!data?.success || isError ) return <h1 className="text-center p-3 font-bol text-red-600">{error?.message || data?.message}</h1>
  const { note } = data;
  return (
    <NoteEditor
      isLoading={isPending}
      content={note}
      key={"update"}
      mutate={mutate}
    />
  );
}

export default EditNote;
