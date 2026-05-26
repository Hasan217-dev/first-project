import React from 'react'

//@ts-ignore
const DynamicDocsPage =async ({params}) => {

    const {slug} = await params
    console.log(slug)

  return (
    <div>DynamicDocsPage {slug?.join("/")} </div>
  )
}

export default DynamicDocsPage


//catch all routes