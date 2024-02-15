import React from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

type Props = {}

function CreateNoteButton({}: Props) {
  return <Link to="/note/create">
  <FaCirclePlus className='absolute right-2 bottom-2 size-6 text-color-thirty hover:size-7' />
  </Link> 
}

export default CreateNoteButton