import React from 'react'
import Link from "next/link"


const ContactPage = () => {
  return (
    <div>
        <Link href={{
            pathname : "/about",
            query : {name : 'test'}
        }}>Go to about</Link>
    </div>
  )
}

export default ContactPage