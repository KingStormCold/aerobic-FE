import React, { useState } from 'react'
import "./ScrollToTopButton.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ScrollToTopButton = () => {

  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 0) {
      setVisible(true)
    }
    else if (scrolled <= 0) {
      setVisible(false)
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <div onClick={scrollToTop} hidden={!visible} title="Chuyển về đầu trang">
      <FontAwesomeIcon icon="arrow-circle-up" size="lg" className='scroll-to-top-icon' />
    </div>
  )
}

export default ScrollToTopButton