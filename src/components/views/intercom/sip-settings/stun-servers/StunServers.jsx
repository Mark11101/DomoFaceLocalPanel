import React, { useState } from 'react'
import Collapsible from 'react-collapsible'
import SearchIcon from '@material-ui/icons/Search'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'

import InputField from '../../../../subcomponents/input-field/InputField'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import ModalDelete from '../../../../subcomponents/modal-delete/ModalDelete'
import testRegex from '../../../../../utils/string/testRegex'

import './StunServers.css'

const StunServers = (props) => {
  const {
    stunServers,
    requestStunServers,
    requestAddStunServer,
    requestDeleteAllStunServers,
    requestDeleteStunServer,
  } = props;

  React.useEffect(() => {

    requestStunServers()
  }, [requestStunServers])

  const [newStunServer, setNewStunServer]                             = useState('');
  const [searchedStunServer, setSearchedStunServer]                   = useState('');
  const [isNewStunServerInputVisible, setIsNewStunServerInputVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible]               = useState(false);
  const [isServerInputValid, setIsServerInputValid]                   = useState(true);
  const [isStunServerAlreadyExist, setIsStunServerAlreadyExist]       = useState(false); 

  const toggleNewStunServerInput = () => {

    setIsNewStunServerInputVisible(!isNewStunServerInputVisible)
  }

  const handleNewStunServerChange = (event) => {
    const value = event.target.value;

    stunServers.some((stunServer) => stunServer.server === value)
    ?
      setIsStunServerAlreadyExist(true)
    :
      setIsStunServerAlreadyExist(false)
    
    testRegex(value, /^[\w.]*(:\d*)?$/)
    ?
      setIsServerInputValid(true)
    :
      setIsServerInputValid(false)
    
    setNewStunServer(value)
  }

  const handleCreateStunServerSubmit = (event) => {
    event.preventDefault()
    
    requestAddStunServer(newStunServer)
    setNewStunServer('')
  }

  const handleDeleteStunServer = (id) => {

    requestDeleteStunServer(id)
  }

  const handleSearchedStunServerChange = (event) => {

    setSearchedStunServer(event.target.value)
  }

  const handleOpenModalDelete = () => {

    setIsModalDeleteVisible(true);
  }

  const handleCloseModalDelete = () => {

    setIsModalDeleteVisible(false);
  }

  const handleDeleteAll = () => {

    handleCloseModalDelete();
    requestDeleteAllStunServers();
  }

  return (
    <Collapsible
      trigger="STUN серверы"
      className='b-stun-servers b-sip-settings__inner-list'
      openedClassName='b-stun-servers b-sip-settings__inner-list'
    >
      <div className='b-list'>
        <div className='b-list__buttons'>
          <button
            className='b-button b-list__add-btn'
            onClick={toggleNewStunServerInput}
          >
            Добавить
          </button>
          {
            stunServers.length !== 0
            &&
              <button
                className='b-button b-button--delete b-list__delete-all-btn'
                onClick={handleOpenModalDelete}
              >
                Удалить все
              </button>
          }
        </div>
        {
          isNewStunServerInputVisible
          &&
            <Form onSubmit={handleCreateStunServerSubmit}>
              <InputField
                innerLabel='STUN сервер'
                type='text'
                value={newStunServer}
                onChange={handleNewStunServerChange}
                error={!isServerInputValid || isStunServerAlreadyExist}
                helperText={
                  (isStunServerAlreadyExist && 'Такой сервер уже есть') ||
                  (!isServerInputValid && 'Неверный формат данных ("HOST:PORT", порт необязателен)')
                }
              />
              <button
                type='submit'
                className='b-button b-list__submit-add-btn'
                disabled={!newStunServer || !isServerInputValid || isStunServerAlreadyExist}
              >
                Сохранить
              </button>
            </Form>
        }
        {
          stunServers.length > 10
          &&
            <div className='b-stun-servers__search-input-wrapper'>
              <InputGroup>
                <FormControl
                  placeholder="Поиск"
                  aria-label="Поиск"
                  aria-describedby="basic-addon2"
                  className='b-stun-servers__search-input'
                  value={searchedStunServer}
                  onChange={handleSearchedStunServerChange}
                />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <SearchIcon />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </div>
        }
        {
          stunServers.length !== 0
          ?
            <>
              {
                stunServers.map((stunServer, index) => (
                  searchedStunServer === '' || (searchedStunServer && stunServer.server.includes(searchedStunServer))
                    ?
                    <div className='b-list__item' key={index}>
                      <span>{stunServer.server}</span>
                      <button
                        className='b-button b-list__item-delete-btn'
                        onClick={() => handleDeleteStunServer(stunServer.id)}
                      >
                        <DeleteForeverIcon />
                      </button>
                    </div>
                    :
                    null
                ))
              }
            </>
          :
            <div>
              Stun серверы отсутствуют
            </div>
        }
      </div>
      <ModalDelete
        show={isModalDeleteVisible}
        handleCloseModal={handleCloseModalDelete}
        handleDeleteAll={handleDeleteAll}
      />
    </Collapsible>
  )
}

export default StunServers
