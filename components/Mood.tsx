import Image, {ImageProps} from 'next/image'
// import {Image} from 'typescript'
function Mood() {
  return (
    <div className='w-4/12 border-2 rounded-md border-green-400'>
      <div className='text-center font-bold mt-5 bg-gradient-to-r from-red-500 to-blue-800 font-bold bg-clip-text text-transparent stroke-gray-100'>Mood</div>
      <div className='flex h-72 justify-center align-items'>
        <div className='flex space-x-2'>
          <button>
          <Image src='/otisFace.png' alt='otis-grimace' width='80' height='100' />
          </button>
          <button>
          <Image src='/otisFace.png' alt='otis-grimace' width='80' height='100' />
          </button>
          <button>
          <Image src='/otisFace.png' alt='otis-grimace' width='80' height='100' />
          </button>
          <button>
          <Image src='/otisFace.png' alt='otis-grimace' width='80' height='100' />
          </button>
          <button>
          <Image src='/otisFace.png' alt='otis-grimace' width='80' height='100' />
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default Mood;