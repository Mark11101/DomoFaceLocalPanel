import React from 'react'
import Modal from 'react-bootstrap/Modal'

import appendClassName from '../../../utils/string/appendClassName'

import './ModalForm.css'

const ModalForm = (props) => {
  const {
    title,
    show = true,
    withoutHeader,
    bottomCloseButton,
    children,
    handleCloseModal,
  } = props;

  return (
    <Modal 
      show={show} 
      onHide={handleCloseModal}
      className={
        bottomCloseButton
        ?
          appendClassName('b-modal-form', 'b-modal-form--bottom-close-btn')
        :
          'b-modal-form'
      }
      centered
    >
      {
        !withoutHeader && !bottomCloseButton
        &&
          <Modal.Header className='b-modal-form__header'>
            <h1 className='b-modal-form__header-title'>
              {title}
            </h1>
            <button 
              className='b-button b-modal-form__close-modal-btn'
              onClick={handleCloseModal}
            >
              x
            </button>
          </Modal.Header>
      }
      <Modal.Body>
        {children}
        {
          (!withoutHeader && bottomCloseButton)
          &&
            <button 
              className='b-button b-modal-form__close-modal-btn-center'
              onClick={handleCloseModal}
            >
              x
            </button>
        }
      </Modal.Body>
    </Modal>
  )
}

export default ModalForm
