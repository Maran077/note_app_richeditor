import React from 'react'

type Props = {
    buttonName:string
}

function Button({buttonName}: Props) {
  return (
    <button className="bg-white px-6 py-[5.5px] text-[1.2rem] text-color-thirty font-bold rounded-md hover:bg-color-thirty hover:text-white hover:border-2 hover:border-white box-border hover:py-[4.02px]" >{buttonName}</button>
    
  )
}

export default Button