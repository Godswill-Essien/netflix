import Navbar from '@/components/Navbar'
import Reasons from '@/components/Reasons'
import Swipper from '@/components/Swipper'
import Question from '@/components/Question'
import React from 'react'
import EmailSignup from '@/components/EmailSignup'
import Foter from '@/components/Foter'


export default function page() {
  return (
    <div>
        <Navbar/>
       <Swipper/>
       <Reasons/>
       <Question/>
       <EmailSignup/>
       <Foter/>
       
       
    </div>
  )
}
