import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Collapsible from 'react-collapsible'
import FileCopyIcon from '@material-ui/icons/FileCopy'

import Divider from '../subcomponents/divider/Divider'
import NoPhoto from '../../images/no-photo.jpg'
import { showErrorMessage } from '../../utils/notifications/messages'
import ModalForm from '../subcomponents/modal-form/ModalForm'
import AuthInputs from '../subcomponents/auth-inputs/AuthInputs'
import Roles from '../../constants/Roles'
import RadioButton from '../subcomponents/radio-button/RadioButton'
import Tooltip from '../subcomponents/tooltip/Tooltip'

import './ResidentScreen.css'

const ResidentScreen = (props) => {
  const {
    id,
    role,
    login,
    flatNumber,
    faces,
    images,
    users,
    camera,
    intercomHealth,
    isLogged,
    logOut,
    requestUpdateUser,
    requestOpenDoor,
    requestIntercomHealthCheck,
    requestFaces,
    requestSendFace,
    requestAllImagesFace,
    requestCameraRtsp,
    requestDeleteCurrentFace,
  } = props;

  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [isSendPhotoModalVisible, setIsSendPhotoModalVisible] = useState(false); 

  const [selectedFile, setSelectedFile]                 = useState();
  const [fileName, setFileName] = useState('');
  const [isPhotoValid, setIsPhotoValid] = useState(true);
  const [isPhotoSaved, setIsPhotoSaved] = useState(true);

  React.useEffect(() => {
    residentPageOpen()

    return residentPageClose
  }, [])

  React.useEffect(() => {

    requestFaces()
    requestCameraRtsp()
    requestIntercomHealthCheck()
  }, [
    requestFaces, 
    requestCameraRtsp,
    requestIntercomHealthCheck
  ])

  React.useEffect(() => {

    faces.length > 0 
    && 
      requestAllImagesFace(faces)
  }, [faces, requestAllImagesFace])

  const copyText = (text) => {
    const el = document.createElement('textarea');
    
    el.value = text;
    
    document.body.appendChild(el);
    
    el.select();

    document.execCommand('copy');
    document.body.removeChild(el);
  }

  const handleCopyMainStream = () => {
    
    const mainStream = document.getElementById("main-stream-link");
    copyText(mainStream.innerHTML)
  }

  const handleCopySubStream = () => {
    
    const subStream = document.getElementById("sub-stream-link");
    copyText(subStream.innerHTML)
  }
  
  if (
    !isLogged || 
    role !== Roles.USER || 
    !intercomHealth
  ) {
    return (
      <Redirect 
        to={{
          pathname: '/',
        }}
      />
    )
  }

  const findedFace = faces.find((face) => face.flatNumber === flatNumber);
  const findedFaceImage = findedFace && images.find(item => item.id === findedFace.id);

  const handleOpenSendPhotoModal = () => {
    console.log('here')
    setIsSendPhotoModalVisible(true)
  }

  const handleCloseSendPhotoModal = () => {

    setFileName('');
    setIsPhotoSaved(true);
    setIsSendPhotoModalVisible(false)
  }

  const handleLoadImage = (event) => {

    const file = event.target.files[0];

    if (file.type.split('/')[0] !== 'image') {
      
      setIsPhotoValid(false)
      showErrorMessage('Выберите изображение')
    
    } else if (file.size > 4096000) {

      setIsPhotoValid(false)
      showErrorMessage('Размер файла не должен превышать 4096KB')
    
    } else {

      setIsPhotoValid(true)
      setFileName(file.name)
      setSelectedFile(file)
    } 
  }

  const handleIsPhotoSavedChange = () => {

    setIsPhotoSaved(!isPhotoSaved)
  }

  const handleSendPhotoSubmit = (event) => {
    event.preventDefault()

    let formData = new FormData();

    formData.append('image', selectedFile)
    formData.append('description', '')
    formData.append('flatNumber', flatNumber)
    formData.append('saveImage', isPhotoSaved)

    setIsPhotoSaved(true);
    
    requestSendFace(formData);
    handleCloseSendPhotoModal()
  }

  const handleOpenEditModal = () => {

    setIsEditModalOpened(true)
  }

  const handleCloseEditModal = () => {

    setIsEditModalOpened(false)
  }

  const handleChangeValuesForEditSubmit = (values) => {

    requestUpdateUser(id, {
      login: login,
      password: values.password,
      role: Roles.USER,
      flatNumber: flatNumber,
    })

    handleCloseEditModal()
  }

  const handleDeleteFace = (faceId) => {

    requestDeleteCurrentFace(faceId);
  }

  const handleOpenDoorClick = () => {

    requestOpenDoor()
  }

  const handleLogOutClick = () => {

    logOut()
  }

  return (
    <>
      <Container className='b-resident-screen'>
        <h4 className='b-resident-screen__header'>
          Личный кабинет
        </h4>
        <Divider />
        <img 
          src={
            findedFaceImage 
            ? 
              findedFaceImage.data
            : 
              NoPhoto
          }
          alt=''
          className='b-resident-screen__image'
        />
        <Collapsible 
          trigger="Видеопоток"
          className='b-resident-screen__streams'
          openedClassName='b-resident-screen__streams'
        >
          <div className='b-resident-screen__main-stream'>
            <p>
              Основной поток:
            </p>
            <p>
              <button
                className='b-button b-intercom__copy-btn'
                onClick={handleCopyMainStream}
              >
                <FileCopyIcon />
              </button>
              <span id='main-stream-link'>
                {camera.mainStream || '-'}
              </span>
            </p>
          </div>
          <div className='b-resident-screen__sub-stream'>
            <p>
              Дополнительный поток:
            </p>
            <p>
              <button
                className='b-button b-intercom__copy-btn'
                onClick={handleCopySubStream}
              >
                <FileCopyIcon />
              </button>
              <span id='sub-stream-link'>
                {camera.subStream || '-'}
              </span>
            </p>
          </div>
        </Collapsible>
        <div className='b-resident-screen__control-btns'>
          {
            !!findedFace
            ?
              <button
                className='b-button b-button--delete'
                onClick={() => handleDeleteFace(findedFace.id)}
              >
                {
                  findedFaceImage
                  ?
                    'Удалить фото'
                  :
                    'Удалить фото из базы'
                }
              </button>
            :
              <button 
                className='b-button b-resident-screen__upload-photo-btn'
                onClick={handleOpenSendPhotoModal}
              >
    
                Добавить фото
              </button>
          }
          <button
            onClick={handleOpenEditModal}
            className='b-button'
          >
            Изменить пароль
          </button>
          <button
            onClick={handleOpenDoorClick}
            className='b-button'
          >
            Открыть дверь
          </button>
          <button
            onClick={handleLogOutClick}
            className='b-button'
          >
            Выйти
          </button>
        </div>
      </Container>
      <ModalForm
        title='Обновление данных'
        handleCloseModal={handleCloseEditModal}
        show={isEditModalOpened}
      >
        <AuthInputs 
          accounts={users}
          onSubmit={(values) => handleChangeValuesForEditSubmit(values)} 
        />
      </ModalForm>
      <Modal
        show={isSendPhotoModalVisible}
        onHide={handleCloseSendPhotoModal}
        className='b-faces__modal'
        centered
      >
        <Modal.Header>
          <h1 className='b-faces__header'>
            Загрузка лица
          </h1>
          <button
            className='b-button b-faces__close-modal-btn'
            onClick={handleCloseSendPhotoModal}
          >
            x
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form className='b-faces__modal-form'>
            <Form.File
              id="custom-file"
              label={fileName || 'Выбрать фото'}
              data-browse='Обзор'
              className='b-faces__modal-file-input'
              onChange={handleLoadImage}
              isInvalid={!isPhotoValid}
              custom
            />
            <div className='b-faces__display-photo'>
              <RadioButton
                label='Отображать фото в панели управления'
                value={isPhotoSaved}
                className='b-faces__modal-save-photo'
                onChange={handleIsPhotoSavedChange}
              />
              <Tooltip title={'Данная опция отвечает за отображение фотографии в панели управления. Лицо будет сохранено в базе в любом случае.'} />
            </div>
            <button
              type='submit'
              disabled={!isPhotoValid || !fileName}
              className='b-button b-faces__submit-btn'
              onClick={handleSendPhotoSubmit}
            >
              Отправить
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ResidentScreen

export const residentPageOpen = () => {
  document.body.classList.add('resident-page')
}

export const residentPageClose = () => {
  document.body.classList.remove('resident-page')
}
