"use client"

function JournalIDPage({ params }) {
    console.log(params)
  return (
    <div>
      <h1>Journal ID ${params.id}</h1>
    </div>
  )
}

export default JournalIDPage;