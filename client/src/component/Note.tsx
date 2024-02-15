import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  note: string;
};

function Note({ id, note }: Props) {
    const [textContent, setTextContent] = useState<string>('');

  useEffect(() => {
    // Parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(note, 'text/html');
    const extractedText = doc.body.textContent || '';

    setTextContent(extractedText);
  }, []);
  return (
    <Link to={`/note/${id}`}>
      <li className="max-w-[120px] first-line:capitalize first-line:text-2xl p-5 border-[1px] border-black bg-color-thirty ">{textContent}</li>
    </Link>
  );
}

export default Note;
