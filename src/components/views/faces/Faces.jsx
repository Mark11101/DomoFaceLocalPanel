import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import CardDeck from 'react-bootstrap/CardDeck'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import SearchIcon from '@material-ui/icons/Search'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import { showErrorMessage } from '../../../utils/notifications/messages'
import ModalDelete from '../../subcomponents/modal-delete/ModalDelete'
import RadioButton from '../../subcomponents/radio-button/RadioButton'
import InputField from '../../subcomponents/input-field/InputField'
import Tooltip from '../../subcomponents/tooltip/Tooltip'
import Divider from '../../subcomponents/divider/Divider'
import NoPhoto from '../../../images/no-photo.jpg'

import './Faces.css'

const Faces = (props) => {
  const {
    faces,
    images,
    firstFlatNumber,
    lastFlatNumber,
    requestFaces,
    requestSendFace,
    requestDeleteAllFaces,
    requestDeleteCurrentFace,
    requestUpdateFace,
    requestAllImagesFace,
    requestDownloadFaces,
    requestLoadFaces,
  } = props;

  const [selectedFlat, setSelectedFlat] = useState('');
  const [isChooseFlatModalVisible, setIsChooseFlatModalVisible] = useState(false);
  const [searchFlatValue, setSearchFlatValue] = useState('');

  const [selectedFile, setSelectedFile]                 = useState();
  const [fileName, setFileName]                         = useState('');
  const [descriptionModal, setDescriptionModal]         = useState('');
  const [descriptionEditModal, setDescriptionEditModal] = useState('');
  const [updateItemId, setUpdateItemId]                 = useState('');

  const [isInputValid, setIsInputValid]                 = useState(true);
  const [isModalVisible, setIsModalVisible]             = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isModalEditVisible, setIsModalEditVisible]     = useState(false);
  const [isPhotoSaved, setIsPhotoSaved]                 = useState(true);

  const [searchFaceValue, setSearchFaceValue] = useState('');
  
  const firstNumber = Number(firstFlatNumber);
  const lastNumber  = Number(lastFlatNumber);

  const filteredFaces = selectedFlat ? faces.filter((face) => face.flatNumber === (Number(selectedFlat) || null)) : faces;

  React.useEffect(() => {

    requestFaces()
  }, [requestFaces])

  React.useEffect(() => {
    
    if (faces.length > 0) {
      requestAllImagesFace(faces);
    }
  }, [faces, requestAllImagesFace])


  const flatsArray = [];

  for (let i = firstNumber; i <= lastNumber; i++) {
    if (searchFlatValue === '' || (searchFlatValue && i.toString().includes(searchFlatValue))) {
      flatsArray.push(
        <Card 
          className='b-flat__card'
          key={i}
        >
          <button
            className='b-button b-flat__flat-btn'
            onClick={() => handleNumberChange(i)}
          >
            {i}
          </button>
        </Card>
      )
    } else {
      continue
    }
  }

  const handleChooseAllFlatsClick = () => {

    setSelectedFlat('')
    requestFaces()
    setIsChooseFlatModalVisible(false)
  }
  if (searchFlatValue === '' || (searchFlatValue && 'все'.includes(searchFlatValue.toLocaleLowerCase()))) {
    
    flatsArray.unshift(
      <Card key={firstNumber - 1} className='b-flat__card'>
        <button
          className='b-button b-flat__flat-btn'
          onClick={handleChooseAllFlatsClick}
        >
          Все
        </button>
      </Card>
    )
  }

  const handleNumberChange = (number) => {
    
    setSelectedFlat(number)
    requestFaces(number)
    setIsChooseFlatModalVisible(false)
  }

  const handleOpenChooseFlatModal = () => {

    setIsChooseFlatModalVisible(true)
  }

  const handleCloseChooseFlatModal = () => {

    setIsChooseFlatModalVisible(false)
  }

  const handleSearchFlatValueChange = (event) => {

    setSearchFlatValue(event.target.value)
  }

  const handleSearchFaceValueChange = (event) => {

    setSearchFaceValue(event.target.value.toLowerCase())
  }

  const handleIsPhotoSavedChange = () => {

    setIsPhotoSaved(!isPhotoSaved)
  }

  const handleOpenModal = () => {

    setIsModalVisible(true)
  }

  const handleOpenModalDelete = () => {

    setIsModalDeleteVisible(true);
  }

  const handleOpenEditModal = (faceId, faceDescription) => {

    setUpdateItemId(faceId);
    setDescriptionEditModal(faceDescription)
    setIsModalEditVisible(true);
  }

  const handleCloseModal = () => {

    setFileName('');
    setDescriptionModal('');
    setIsPhotoSaved(true);
    setIsModalVisible(false)
  }

  const handleCloseModalDelete = () => {

    setIsModalDeleteVisible(false);
  }

  const handleCloseEditModal = () => {

    setDescriptionEditModal('');
    setUpdateItemId('');
    setIsModalEditVisible(false);
  }

  const handleLoadImage = (event) => {

    const file = event.target.files[0];

    if (file.type.split('/')[0] !== 'image') {
      
      setIsInputValid(false)
      showErrorMessage('Выберите изображение')
    
    } else if (file.size > 4096000) {

      setIsInputValid(false)
      showErrorMessage('Размер файла не должен превышать 4096KB')
    
    } else {

      setIsInputValid(true)
      setFileName(file.name)
      setSelectedFile(file)
    } 
  }

  const handleDescriptionModalInput = (event) => {

    setDescriptionModal(event.target.value)
  }

  const handleDescriptionEditModalInput = (event) => {

    setDescriptionEditModal(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    let formData = new FormData();

    formData.append('image', selectedFile);
    formData.append('saveImage', isPhotoSaved);
    selectedFlat && formData.append('flatNumber', selectedFlat);
    descriptionModal && formData.append('description', descriptionModal);

    setDescriptionModal('');
    setIsPhotoSaved(true);

    requestSendFace(formData);
  }

  const handleSubmitEdit = (event) => {
    event.preventDefault();

    const description = {
      description: descriptionEditModal
    }

    setDescriptionEditModal('');
    setIsModalEditVisible(false);

    requestUpdateFace(updateItemId, description);
  }

  const handleDeleteAllFaces = () => {

    requestDeleteAllFaces(Number(selectedFlat) || null);
    setIsModalDeleteVisible(false);
  }

  const handleDeleteCurrentFace = (faceId) => {

    requestDeleteCurrentFace(faceId);
  }

  const handleGetImage = (images, faceId) => {

    if (images.length > 0) {
      
      const currentItem = images.find(item => item.id === faceId);
      
      if (currentItem) {
        return currentItem.data;
      }
    }
  }

  const handleDownloadFaces = () => {

    requestDownloadFaces()
  }

  const handleLoadFaces = (event) => {
    const file = event.target.files[0];

    if (file.name.split('.').pop() !== 'dump') {

      showErrorMessage('Выберите файл формата .dump')

    } else if (file.size > 32000000) {

      showErrorMessage('Размер файла не должен превышать 32MB')
    
    } else {

      let formData = new FormData();
      formData.append('dump', file);
      
      requestLoadFaces(formData)
    }
  }

  const handleFacesLoadBtnClick = () => {

    document.getElementById('face-upload').click()
  }

  return (
    <>
      <Container className='b-faces'>
        <h1 className='b-keys__title'>
          Лица
        </h1> 
        <Divider />   
        <button
          className='b-button b-flat__choose-flat-btn'
          onClick={handleOpenChooseFlatModal}
        >          
          {(selectedFlat && 'Квартира: ' + selectedFlat) || 'Выбрать квартиру'}          
        </button>   
        <div className='b-faces__load-buttons'>
          {
            filteredFaces.length !== 0
            &&
              <button
                className='b-button b-keys__download-btn'
                onClick={handleDownloadFaces}
              >
                Скачать лица
              </button>
          }
          <button
            className='b-button b-keys__load-btn'
            onClick={handleFacesLoadBtnClick}
          >
            <input
              id='face-upload'
              className='b-keys__load-input'
              type='file'
              onChange={handleLoadFaces}
              hidden
            />
            Загрузить лица
          </button>         
        </div>
        <div className='b-faces__buttons'>
          <button
            onClick={handleOpenModal}
            className='b-button b-faces__add-btn'
          >
            Добавить
          </button>
          {
            filteredFaces.length !== 0
            &&
              <button
                className='b-button b-button--delete b-faces__delete-all-btn'
                onClick={handleOpenModalDelete}
              >
                Удалить все
              </button>
          }
        </div>
        <div className='b-faces__content'>
          {
            filteredFaces.length !== 0
            ?
              <>
                {
                  filteredFaces.length > 3
                  &&
                    <div className='b-faces__search-input-wrapper'>
                      <InputGroup>
                        <FormControl
                          placeholder="Поиск"
                          aria-label="Поиск"
                          aria-describedby="basic-addon2"
                          className='b-faces__search-input'
                          value={searchFaceValue}
                          onChange={handleSearchFaceValueChange}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text>
                            <SearchIcon />
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </div>
                }
                <div className='b-faces__faces-card'>
                  <CardColumns>
                    {
                      filteredFaces.map((face) => {

                        const isFaceSearched = searchFaceValue && (face.description.toLowerCase().includes(searchFaceValue));
                        
                        if (searchFaceValue === '' || isFaceSearched) {
                          return (
                            <Card className='b-faces__face' key={face.id}>
                              <Card.Header>
                                <Card.Img
                                  variant="top"
                                  src={handleGetImage(images, face.id) || NoPhoto}
                                  className='b-faces__face-image'
                                />
                                <div className='b-faces__face-buttons'>
                                  <button
                                    className='b-button b-button--edit b-faces__edit-btn'
                                    onClick={() => handleOpenEditModal(face.id, face.description)}
                                  >
                                    Изменить описание
                                  </button>
                                  <button
                                    className='b-button b-button--delete b-faces__delete-btn'
                                    onClick={() => handleDeleteCurrentFace(face.id)}
                                  >
                                    Удалить
                                  </button>
                                </div>
                              </Card.Header>
                              <Card.Body>
                                {
                                  <>
                                    <div className='b-faces__description-card-line'>
                                      <p>
                                        <span>
                                          Комментарий:
                                        </span>
                                        <span>
                                          {face.description || '-'}
                                        </span>
                                      </p>
                                      <p>
                                        <span>
                                          Номер квартиры:
                                        </span>
                                        <span>
                                          {face.flatNumber || '-'}
                                        </span>
                                      </p>
                                    </div>
                                    {/* <div className='b-faces__description-card-line'>
                                      <span>
                                        ID:
                                        </span>
                                      <span>
                                        {face.id}
                                      </span>
                                    </div> */}
                                  </>
                                }
                              </Card.Body>
                            </Card>

                          )
                        } else {
                          return null
                        }
                      })
                    }
                  </CardColumns>
                </div>
              </>
            :
              <div className='b-faces__no-faces'>
                Лица отсутствуют
              </div>
          }
        </div>
      </Container>
      <Modal
        show={isModalVisible}
        onHide={handleCloseModal}
        className='b-faces__modal'
        centered
      >
        <Modal.Header>
          <h1 className='b-faces__header'>
            Добавление лица
          </h1>
          <button
            className='b-button b-faces__close-modal-btn'
            onClick={handleCloseModal}
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
              isInvalid={!isInputValid}
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
            <InputField
              innerLabel='Комментарий'
              type='text'
              name='login'
              className='b-faces__modal-text-input'
              value={descriptionModal}
              onChange={handleDescriptionModalInput}
            />
            <button
              type='submit'
              disabled={!isInputValid || !fileName}
              className='b-button b-faces__submit-btn'
              onClick={handleSubmit}
            >
              Отправить
            </button>
          </Form>
        </Modal.Body>
      </Modal>
      <ModalDelete
        show={isModalDeleteVisible}
        handleCloseModal={handleCloseModalDelete}
        handleDeleteAll={handleDeleteAllFaces}
      />
      <Modal
        show={isModalEditVisible}
        onHide={handleCloseEditModal}
        className='b-faces__modal'
        centered
      >
        <Modal.Header>
          <h1 className='b-faces__header'>
            Изменение описания
          </h1>
          <button
            className='b-button b-faces__close-modal-btn'
            onClick={handleCloseEditModal}
          >
            x
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form className='b-faces__modal-form'>
            <InputField
              innerLabel='Комментарий'
              type='text'
              name='login'
              className='b-faces__modal-text-input'
              value={descriptionEditModal}
              onChange={handleDescriptionEditModalInput}
            />
            <button
              type='submit'
              disabled={!descriptionEditModal}
              className='b-button b-faces__submit-btn'
              onClick={handleSubmitEdit}
            >
              Отправить изменение
            </button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal 
        show={isChooseFlatModalVisible} 
        onHide={handleCloseChooseFlatModal}
        className='b-modal-form'
        centered
      >
        <Modal.Header className='b-modal-form__header'>
          <h1 className='b-modal-form__header-title'>
            Выбор квартиры
          </h1>
          <button 
            className='b-button b-modal-form__close-modal-btn'
            onClick={handleCloseChooseFlatModal}
          >
            x
          </button>
        </Modal.Header>
        <Modal.Body className='b-flat__modal-body'>
        {
          lastNumber > 20
          &&      
            <InputGroup className='b-flat__search-input-group'>
              <FormControl
                placeholder="Поиск"
                aria-label="Поиск"
                aria-describedby="basic-addon2"
                className='b-keys__search-input'
                value={searchFlatValue}
                onChange={handleSearchFlatValueChange}
              />
              <InputGroup.Append>
                <InputGroup.Text>
                  <SearchIcon />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>   
          }  
          <CardDeck className='b-flat__card-deck'>
            {flatsArray}
          </CardDeck>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Faces
