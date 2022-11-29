import Image, {ImageProps} from 'next/image'
import {useState} from 'react';

type MoodPropsType = {
  mood: string;
  setMood: React.Dispatch<React.SetStateAction<string>>;
}

function Mood({ mood, setMood }: MoodPropsType) {

  function handleMoodChange(mood) {
    console.log(mood);
    setMood(mood);
  }

  let buttonStyle = "rounded-full h-auto w-1/5 focus:animate-bounce focus:border-red-900 border-solid border-opacity-70 border-2 drop-shadow-sm"
  let imageStyle = "rounded-full"

  return (
    <div className='w-4/12 border-2 rounded-md border-green-400'>
      <div className='flex justify-center  text-center mt-5 font-bold border-solid border-opacity-70 border-green-400 border-b-2'>
        <p>Mood</p>
        </div>
      <div className='flex h-72 justify-center place-items-center'>
        {/* <h1>{mood}</h1> */}
        <div className='flex space-x-2'>
          <button className={`${buttonStyle}`} onClick={(e)=> handleMoodChange(e.target.id)}>
            <Image id = "excited" className={`${imageStyle}`} src='/excited.png' alt='excited' width='80' height='100'/>
          </button>
          <button  className={`${buttonStyle}`} onClick={(e)=> handleMoodChange(e.target.id)}>
            <Image id = "happy" className={`${imageStyle}`} src='/happy.png' alt='happy' width='80' height='100' />
          </button>
          <button  className={`${buttonStyle}`} onClick={(e)=> handleMoodChange(e.target.id)}>
            <Image id = "content" className={`${imageStyle}`} src='/content.png' alt='content' width='80' height='100' />
          </button>
          <button  className={`${buttonStyle}`} onClick={(e)=> handleMoodChange(e.target.id)}>
            <Image  id = "frustrated" className={`${imageStyle}`} src='/sad.png' alt='sad' width='80' height='100' />
          </button>
          <button  className={`${buttonStyle}`} onClick={(e)=> handleMoodChange(e.target.id)}>
            <Image  id = "mad" className={`${imageStyle}`} src='/mad.png' alt='mad' width='80' height='100' />
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default Mood;