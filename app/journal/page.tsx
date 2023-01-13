import { getJournal } from '../../util/helper'

//is there a way to render this in outer page.tsx?
async function JournalPage() {
    const result = await getJournal()
    console.log(result)
  return (
    <div>
      <h1>Journal Page</h1>
      {result.map(journal => {
        return <h1>{journal.entry}</h1>
    })}
    </div>
  )
}


export default JournalPage;