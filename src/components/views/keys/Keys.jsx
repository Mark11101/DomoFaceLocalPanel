import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import CardDeck from 'react-bootstrap/CardDeck'
import CardColumns from 'react-bootstrap/CardColumns'
import Collapsible from 'react-collapsible'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import SearchIcon from '@material-ui/icons/Search'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import ModalDelete from '../../subcomponents/modal-delete/ModalDelete'
import InputField from '../../subcomponents/input-field/InputField'
import Divider from '../../subcomponents/divider/Divider'
import testRegex from '../../../utils/string/testRegex'
import { showErrorMessage } from '../../../utils/notifications/messages'

import './Keys.css'

const QRCode = require('qrcode.react');

const Keys = (props) => {
  const {
    keys,
    pinCodes,
    qrCodes,
    firstFlatNumber,
    lastFlatNumber,
    requestKeys,
    requestDeleteAllKeys,
    requestAddKey,
    requestDeleteKey,
    requestPinCodes,
    requestAddPinCode,
    requestDeleteAllPinCodes,
    requestDeletePinCode,
    requestQrCodes,
    requestAddQrCode,
    requestDeleteAllQrCodes,
    requestDeleteQrCode,
    requestDownloadKeys,
    requestLoadKeys,
    requestDownloadPinCodes,
    requestLoadPinCodes,
    requestDownloadQrCodes,
    requestLoadQrCodes,
  } = props;

  React.useEffect(() => {

    requestKeys()
    requestPinCodes()
    requestQrCodes()
  }, [requestKeys, requestPinCodes, requestQrCodes])

  const [selectedFlat, setSelectedFlat] = useState('');
  const [isChooseFlatModalVisible, setIsChooseFlatModalVisible] = useState(false);
  const [searchFlatValue, setSearchFlatValue] = useState('');

  const [searchKeyValue, setSearchKeyValue]         = useState('');
  const [searchPinCodeValue, setSearchPinCodeValue] = useState('');
  const [searchQrCodeValue, setSearchQrCodeValue]   = useState('');

  const [isModalVisible, setIsModalVisible]             = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isKeyAlreadyExist, setIsKeyAlreadyExist]       = useState(false);
  const [modalInputContent, setModalInputContent]       = useState('');
  const [modalTitle, setModalTitle]                     = useState('');
  const [modalLabel, setModalLabel]                     = useState('');
  const [modalType, setModalType]                       = useState('');
  const [modalHelperText, setModalHelperText]           = useState('');
  const [requestTypeDeleteAll, setrequestTypeDeleteAll] = useState('');

  const filteredKeys = selectedFlat ? keys.filter((key) => key.flatNumber === (Number(selectedFlat) || null)) : keys;
  const filteredPinCodes = selectedFlat ? pinCodes.filter((pinCode) => pinCode.flatNumber === (Number(selectedFlat) || null)) : pinCodes;
  const filteredQrCodes = selectedFlat ? qrCodes.filter((qrCode) => qrCode.flatNumber === (Number(selectedFlat) || null)) : qrCodes;

  const firstNumber = Number(firstFlatNumber);
  const lastNumber  = Number(lastFlatNumber);

  let flatsArray = [];

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
    requestKeys()
    requestPinCodes()
    requestQrCodes()
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
    requestKeys(number)
    requestPinCodes(number)
    requestQrCodes(number)
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
  
  const handleOpenModal = (title, label, type, helperText) => {

    setModalTitle(title)
    setModalLabel(label)
    setModalType(type)
    setModalHelperText(helperText)
    setIsModalVisible(true)
  }

  const handleCloseModal = () => {

    setModalInputContent('')
    setModalTitle('')
    setModalLabel('')
    setModalType('')
    setIsModalVisible(false)
  }

  const handleModalInputContentChange = (event) => {

    const value = event.target.value;

    if (modalType === 'key') {
      
      if (keys.some((key) => key.data === ("000000000000000" + value.toString(16)).substr(-16))) {

        setIsKeyAlreadyExist(true)
        setModalHelperText('Такой ключ уже есть')
      
      } else {
        setIsKeyAlreadyExist(false)
        setModalHelperText('Должен быть в шестнадцатеричном формате. Доступны латинские буквы и цифры (a-f, A-F, 0-9). Максимальная длина: 16 символов.')
      }      

      testRegex(value, /^[a-fA-F0-9]+$/) && value.length <= 16
      && 
        setModalInputContent(value)

    } else if (modalType === 'pinCode') {
      
      if (pinCodes.some((pinCode) => pinCode.code.toString() === value)) {

        setIsKeyAlreadyExist(true)
        setModalHelperText('Такой пин-код уже есть')
      
      } else if (Number(value) <= lastFlatNumber * 10) {

        setIsKeyAlreadyExist(true)
        setModalHelperText('Значение должно быть больше чем последний номер квартиры (' + lastFlatNumber + '), умноженный на 10. Минимальная длина: 4 символа. min: 0, max: 65535')
      } else {

        setIsKeyAlreadyExist(false)
        setModalHelperText('Значение должно быть больше чем последний номер квартиры (' + lastFlatNumber + '), умноженный на 10. Минимальная длина: 4 символа. min: 0, max: 65535')
      }
      
      testRegex(value, /^[0-9]+$/) && value <= 65535
      && 
        setModalInputContent(value)

    } else {   
      
      if (qrCodes.some((qrCode) => qrCode.code.toString() === value)) {

        setIsKeyAlreadyExist(true)
        setModalHelperText('Такой QR-код уже есть')
      
      } else {
        setIsKeyAlreadyExist(false)
        setModalHelperText('')
      }    

      value.length < 100
      &&
        setModalInputContent(value)
    }
  }

  const handleQrCodeDownload = (id) => {

    const dataURL = document.getElementById(id).toDataURL();

    const link = document.createElement('a');

    link.href = dataURL;
    link.target = '_blank';
    link.setAttribute('download', 'file');

    document.body.appendChild(link);

    link.click();
  }

  const handleRandomQrCodeClick = (event) => {
    event.preventDefault()

    const randomString = [...Array(16)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
    setModalInputContent(randomString)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    switch (modalType) {
      case 'key':
        requestAddKey(selectedFlat || null, modalInputContent)
        setModalInputContent('')
        break
      case 'pinCode':
        requestAddPinCode(selectedFlat || null, modalInputContent)
        setModalInputContent('')
        break
      case 'qrCode':
        requestAddQrCode(selectedFlat || null, modalInputContent)
        setModalInputContent('')
        break
      default:
        return ''
    }

    handleCloseModal()
  }

  const handleSearchKeyValueChange = (event) => {

    setSearchKeyValue(event.target.value)
  }

  const handleSearchPinCodeValueChange = (event) => {

    setSearchPinCodeValue(event.target.value)
  }

  const handleSearchQrCodeValueChange = (event) => {

    setSearchQrCodeValue(event.target.value)
  }

  const handleCloseModalDelete = () => {

    setrequestTypeDeleteAll('')
    setIsModalDeleteVisible(false);
  }

  const handleOpenModalDelete = (type) => {

    setrequestTypeDeleteAll(type);
    setIsModalDeleteVisible(true);
  }

  const handleDeleteAll = () => {
    const type = requestTypeDeleteAll;

    handleCloseModalDelete()
    
    switch (type) {
      case 'keys':
        return requestDeleteAllKeys(Number(selectedFlat))
      case 'pins':
        return requestDeleteAllPinCodes(Number(selectedFlat))
      case 'qrs':
        return requestDeleteAllQrCodes(Number(selectedFlat))
      default:
        return
    }
  }

  const handleDeleteKey = (key) => {
    
    requestDeleteKey(key)
  }

  const handleDeletePinCode = (pinCode) => {

    requestDeletePinCode(pinCode)
  }

  const handleDeleteQrCode = (qrCode) => {

    requestDeleteQrCode(qrCode)
  }

  const handleDownloadKeys = () => {

    requestDownloadKeys()
  }

  const setFormData = (event) => {
    const file = event.target.files[0];

    if (file.name.split('.').pop() !== 'dump') {

      showErrorMessage('Выберите файл формата .dump')

    } else if (file.size > 32000000) {

      showErrorMessage('Размер файла не должен превышать 32MB')
    
    } else {

      let formData = new FormData();
      formData.append('dump', file);

      return formData
    }
  }

  const handleLoadKeys = (event) => {
    
    requestLoadKeys(setFormData(event))
  }

  const handleDownloadPinCodes = () => {

    requestDownloadPinCodes()
  }

  const handleLoadPinCodes = (event) => {
    
    requestLoadPinCodes(setFormData(event))
  }

  const handleDownloadQrCodes = () => {

    requestDownloadQrCodes()
  }

  const handleLoadQrCodes = (event) => {
    
    requestLoadQrCodes(setFormData(event))
  }

  const handleKeysLoadBtnClick = () => {

    document.getElementById('key-upload').click()
  }

  const handlePinCodesLoadBtnClick = () => {

    document.getElementById('pin-code-upload').click()
  }

  const handleQrCodesLoadBtnClick = () => {

    document.getElementById('qr-code-upload').click()
  }

  return (
    <>
      <Container className='b-keys'>
        <h1 className='b-keys__title'>
          Ключи, пин & QR коды
        </h1>
        <Divider />
        <button
          className='b-button b-flat__choose-flat-btn'
          onClick={handleOpenChooseFlatModal}
        >          
          {(selectedFlat && 'Квартира: ' + selectedFlat) || 'Выбрать квартиру'}          
        </button>
        <Collapsible trigger="Ключи">
          <div className='b-keys__buttons'>
            {
              filteredKeys.length !== 0
              &&
                <button
                  className='b-button b-keys__download-btn'
                  onClick={handleDownloadKeys}
                >
                  Скачать ключи
                </button>
            }
            <button
              className='b-button b-keys__load-btn'
              onClick={handleKeysLoadBtnClick}
            >
              <input
                id='key-upload'
                className='b-keys__load-input'
                type='file'
                onChange={handleLoadKeys}
                hidden
              />
              Загрузить ключи
            </button>         
          </div>
          <div className='b-keys__buttons'>
            <button
              className='b-button b-keys__add-btn'
              onClick={() => handleOpenModal(
                'Добавление ключа', 
                'Ключ', 
                'key',
                'Должен быть в шестнадцатеричном формате. Доступны латинские буквы и цифры (a-f, A-F, 0-9). Максимальная длина: 16 символов.'
              )}
            >
              Добавить ключ
            </button>
            {
              filteredKeys.length !== 0
              &&
                <button
                  className='b-button b-button--delete b-keys__delete-all-btn'
                  onClick={() => handleOpenModalDelete('keys')}
                >
                  Удалить все
                </button>
            }
          </div>
          {
            filteredKeys.length > 10
            &&
              <InputGroup>
                <FormControl
                  placeholder="Поиск"
                  aria-label="Поиск"
                  aria-describedby="basic-addon2"
                  className='b-keys__search-input'
                  value={searchKeyValue}
                  onChange={handleSearchKeyValueChange}
                />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <SearchIcon />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
          }
          {
            filteredKeys.length !== 0
            ?
              <>
                {
                  filteredKeys.map((key, index) => {
                    if (searchKeyValue === '' || (searchKeyValue && key.data.includes(searchKeyValue))) {
                      return (
                        <div className='b-keys__key' key={index}>
                          <span className='b-keys__key-code'>{key.data}</span>
                          <button
                            className='b-button b-keys__delete-btn'
                            onClick={() => handleDeleteKey(key.id)}
                          >
                            <DeleteForeverIcon />
                          </button>
                        </div>
                      )
                    } else {
                      return null
                    }
                  })
                }
              </>
            :
              <div>
                Ключи отсутствуют
              </div>
          }
        </Collapsible>
        <Collapsible trigger="Пин-коды">
          <div className='b-keys__buttons'>
            {
              filteredPinCodes.length !== 0
              &&
                <button
                  className='b-button b-keys__download-btn'
                  onClick={handleDownloadPinCodes}
                >
                  Скачать пин-коды
                </button>
            }
            <button
              className='b-button b-keys__load-btn'
              onClick={handlePinCodesLoadBtnClick}
            >
              <input
                id='pin-code-upload'
                className='b-keys__load-input'
                type='file'
                onChange={handleLoadPinCodes}
                hidden
              />
              Загрузить пин-коды
            </button>         
          </div>
          <div className='b-keys__buttons'>
            <button
              className='b-button b-keys__add-btn'
              onClick={() => handleOpenModal(
                'Добавление пин-кода', 
                'Пин-код', 
                'pinCode',
                'Значение должно быть больше чем последний номер квартиры (' + lastFlatNumber + '), умноженный на 10. Минимальная длина: 4 символа. min: 0, max: 65535'  
              )}
            >
              Добавить пин-код
            </button>
            {
              filteredPinCodes.length !== 0
              &&
                <button
                  className='b-button b-button--delete b-keys__delete-all-btn'
                  onClick={() => handleOpenModalDelete('pins')}
                >
                  Удалить все
                </button>
            }
          </div>
          {
            filteredPinCodes.length > 10
            &&
              <InputGroup>
                <FormControl
                  placeholder="Поиск"
                  aria-label="Поиск"
                  aria-describedby="basic-addon2"
                  className='b-keys__search-input'
                  value={searchPinCodeValue}
                  onChange={handleSearchPinCodeValueChange}
                />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <SearchIcon />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
          }
          {
            filteredPinCodes.length !== 0
            ?
              <>
                {
                  filteredPinCodes.map((pinCode, index) => {
                    if (searchPinCodeValue === '' || (searchPinCodeValue && pinCode.data.includes(searchPinCodeValue))) {
                      return (
                        <div className='b-keys__key' key={index}>
                          <span>{pinCode.code}</span>
                          <button
                            className='b-button b-keys__delete-btn'
                            onClick={() => handleDeletePinCode(pinCode.id)}
                          >
                            <DeleteForeverIcon />
                          </button>
                        </div>
                      )
                    } else {
                      return null
                    }
                  })
                }
              </>
            :
              <div>
                Пин-коды отсутствуют
              </div>
          }
        </Collapsible>
        <Collapsible trigger="QR-коды">
          <div className='b-keys__buttons'>
            {
              filteredQrCodes.length !== 0
              &&
                <button
                  className='b-button b-keys__download-btn'
                  onClick={handleDownloadQrCodes}
                >
                  Скачать QR-коды
                </button>
            }
            <button
              className='b-button b-keys__load-btn'
              onClick={handleQrCodesLoadBtnClick}
            >
              <input
                id='qr-code-upload'
                className='b-keys__load-input'
                type='file'
                onChange={handleLoadQrCodes}
                hidden
              />
              Загрузить QR-коды
            </button>         
          </div>
          <div className='b-keys__qr-codes-buttons'>
            <button
              className='b-button b-keys__qr-code-add-btn'
              onClick={() => handleOpenModal(
                'Добавление QR-кода', 
                'QR-код', 
                'qrCode',
              )}
            >
              Добавить QR-код
            </button>
            {
              filteredQrCodes.length !== 0
              &&
                <button
                  className='b-button b-button--delete b-keys__qr-code-delete-all-btn'
                  onClick={() => handleOpenModalDelete('qrs')}
                >
                  Удалить все
                </button>
            }
          </div>
          {
            filteredQrCodes.length > 5
            &&
              <div className='b-keys__qr-codes-search-input'>
                <InputGroup>
                  <FormControl
                    placeholder="Поиск"
                    aria-label="Поиск"
                    aria-describedby="basic-addon2"
                    className='b-keys__search-input'
                    value={searchQrCodeValue}
                    onChange={handleSearchQrCodeValueChange}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <SearchIcon />
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </div>
          }
          <div className='b-keys__qr-codes-content'>
            {
              filteredQrCodes.length !== 0
              ?
                <CardColumns>
                  {
                    filteredQrCodes.map((qrCode, index) => {
                      if (searchQrCodeValue === '' || (searchQrCodeValue && qrCode.data.includes(searchQrCodeValue))) {
                        return (
                          <div className='b-keys__qr-codes' key={index}>
                            <Card className='b-keys__qr-code'>
                              <Card.Header>
                                <QRCode value={qrCode.code} id={'qr-code-image-' + index} />
                                <div className='b-keys__qr-code-buttons'>
                                  <button
                                    className='b-button b-keys__qr-code-edit-btn'
                                    onClick={() => handleQrCodeDownload(`qr-code-image-${index}`)}
                                  >
                                    Скачать
                                  </button>
                                  <button
                                    className='b-button b-button--delete b-keys__qr-code-delete-btn'
                                    onClick={() => handleDeleteQrCode(qrCode.id)}
                                  >
                                    Удалить
                                  </button>
                                </div>
                              </Card.Header>
                              <Card.Body>
                                <div>
                                  {qrCode.code}
                                  <p>Квартира: {qrCode.flatNumber || '-'}</p>
                                </div>
                              </Card.Body>
                            </Card>
                          </div>
                        )
                      } else {
                        return null
                      }
                    })
                  }
                </CardColumns>
              :
                <div>
                  Qr-коды отсутствуют
                </div>
            }
          </div>
        </Collapsible>
      </Container>
      <Modal
        show={isModalVisible}
        onHide={handleCloseModal}
        className='b-faces__modal'
        centered
      >
        <Modal.Header>
          <h1 className='b-faces__header'>
            {modalTitle}
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
            <InputField
              innerLabel={modalLabel}
              type='text'
              name='login'
              className='b-keys__modal-text-input'
              value={modalInputContent}
              onChange={handleModalInputContentChange}
              error={modalInputContent && isKeyAlreadyExist}
              helperText={modalHelperText}
            />
            {
              modalType === 'qrCode'
              &&
                <button
                  className='b-button b-keys__random-qr-code-btn'
                  onClick={handleRandomQrCodeClick}
                >
                  Сгенерировать случайно
                </button>
            }
            <button
              type='submit'
              disabled={
                isKeyAlreadyExist ||
                !modalInputContent ||
                (modalType === 'pinCode' && modalInputContent.length < 4) 
              }
              className='b-button b-faces__submit-btn'
              onClick={handleSubmit}
            >
              Добавить
            </button>
          </Form>
        </Modal.Body>
      </Modal>
      <ModalDelete
        show={isModalDeleteVisible}
        handleCloseModal={handleCloseModalDelete}
        handleDeleteAll={() => handleDeleteAll()}
      />
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

export default Keys
