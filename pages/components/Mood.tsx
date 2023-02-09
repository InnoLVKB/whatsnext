import Image, { ImageProps } from 'next/image'
import { useState } from 'react';
import { Montserrat } from "@next/font/google";
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import { useDragContext } from "../../context/DragContext";

const montserrat = Montserrat({ subsets: ["latin"], weight: "500" });

type MoodPropsType = {
  mood: string;
  setMood: React.Dispatch<React.SetStateAction<string>>;
  selectedDayMood: string;
}

function Mood({ mood, setMood, selectedDayMood }: MoodPropsType) {

  const { dragStatus } = useDragContext();
  function handleMoodChange(mood) {
    setMood(mood);
  }


  let buttonStyle = "rounded-full h-auto w-1/5 focus:animate-bounce focus:border-red-900 border-solid border-opacity-70 border-2 drop-shadow-sm"
  let imageStyle = "rounded-full"

  return (
    <Draggable disabled={!dragStatus}>
      <Resizable
      defaultSize={{
        width: 380,
       height: 380,
      }}
      minWidth={380}
      minHeight={200}
      // maxWidth={9000}
      // maxHeight={9000}
      className='bg-white border-2 rounded-md border-black'>
        <div className='flex justify-center text-center text-xl p-2 font-bold border-solid border-opacity-70 border-black border-b-2'>
          <p className={montserrat.className}>mood</p>
          </div>
        <div className='flex h-64 justify-center place-items-center'>
          {/* <h1>{mood}</h1> */}
          <div className='flex space-x-2'>
            <button className={`${buttonStyle}`} onClick={(e)=> handleMoodChange(e.target.id)}>
              <Image id="excited" className={`${imageStyle}`} src='/excited.png' alt='excited' width='80' height='100'/>
            </button>
            <button  className={`${buttonStyle}`} onClick={(e)=> handleMoodChange(e.target.id)}>
              <Image id="happy" className={`${imageStyle}`} src='/happy.png' alt='happy' width='80' height='100' />
            </button>
            <button  className={`${buttonStyle}`} onClick={(e)=> handleMoodChange(e.target.id)}>
              <Image id="content" className={`${imageStyle}`} src='/content.png' alt='content' width='80' height='100' />
            </button>
            <button  className={`${buttonStyle}`} onClick={(e)=> handleMoodChange(e.target.id)}>
              <Image id="sad" className={`${imageStyle}`} src='/sad.png' alt='sad' width='80' height='100' />
            </button>
            <button  className={`${buttonStyle}`} onClick={(e)=> handleMoodChange(e.target.id)}>
              <Image id="mad" className={`${imageStyle}`} src='/mad.png' alt='mad' width='80' height='100' />
            </button>
          </div>
        </div>
        <div className='text-center text-sm font-semibold'>
          mood of the day: <b>{selectedDayMood ? selectedDayMood : (mood !== '' ? mood : 'select one above')}</b>
        </div>
      </Resizable>
    </Draggable>
  )
}

export default Mood;