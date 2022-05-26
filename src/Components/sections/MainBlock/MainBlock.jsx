import React from 'react'
import Button from '../../ui/button/Button.jsx'
import Title from '../../elements/title/Title.jsx'

import MainBg from '../../../Assets/bg.png'
import './main-block.scss'
import Paragraph from '../../elements/paragraph/Paragraph.jsx'

const MainBlock = () => {
   return (
      <section className='main-block'>
         <div className="main-block__container">
            <div className="main-block__image-bg">
               <img src={MainBg} alt="logo" />
            </div>
            <div className="main-block__body">
               <div className="main-block__column">
                  <Title nameClass={'main-block__title'}>Test assignment for front-end developer</Title>
                  <Paragraph nameClass={'main-block__text'}>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</Paragraph>
                  <Button>Sign up</Button>
               </div>
            </div>
         </div>
      </section>
   )
}

export default MainBlock