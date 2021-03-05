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

import './EmergencySipAccounts.css'

const EmergencySipAccounts = (props) => {
  const {
    emergencySipAccounts,
    requestEmergencySipAccounts,
    requestAddEmergencySipAccount,
    requestDeleteAllEmergencySipAccounts,
    requestDeleteEmergencySipAccount,
  } = props;

  React.useEffect(() => {

    requestEmergencySipAccounts()
  }, [requestEmergencySipAccounts])

  const [searchedEmergencySipAccount, setSearchedEmergencySipAccount] = useState('');
  const [isCreateInputVisible, setIsCreateInputVisible]               = useState(false);
  const [isServerInputValid, setIsServerInputValid]                   = useState(true);
  const [isServerAlreadyExist, setIsServerAlreadyExist]               = useState(false);
  const [isLoginAlreadyExist, setIsLoginAlreadyExist]                 = useState(false);  
  const [isModalDeleteVisible, setIsModalDeleteVisible]               = useState(false);
  const [newAccount, setNewAccount]                                   = useState({
    server: '',
    login: '',
  })

  const toggleNewAccountInput = () => {

    setIsCreateInputVisible(!isCreateInputVisible)
  }

  const handleNewAccountChange = (event) => {
    const value = event.target.value;
    const name  = event.target.name;

    if (name === 'server') {

      emergencySipAccounts.some((account) => account.server === value)
      ?
        setIsServerAlreadyExist(true)
      :
        setIsServerAlreadyExist(false)

      testRegex(value, /^[\w.]*(:\d*)?$/)
      ?
        setIsServerInputValid(true)
      :
        setIsServerInputValid(false)

    } else {

      emergencySipAccounts.some((account) => account.login === value)
      ?
        setIsLoginAlreadyExist(true)
      :
        setIsLoginAlreadyExist(false)
    }

    setNewAccount({
      ...newAccount,
      [name]: value,
    })
  }

  const handleCreateAccountSubmit = (event) => {
    event.preventDefault()

    requestAddEmergencySipAccount(newAccount.server, newAccount.login)
    setNewAccount({
      server: '',
      login: '',
    })
  }

  const handleDeleteAccount = (server, login) => {

    requestDeleteEmergencySipAccount(server, login)
  }

  const handleSearchedSearchedEmergencySipAccountChange = (event) => {

    setSearchedEmergencySipAccount(event.target.value)
  }

  const handleOpenModalDelete = () => {

    setIsModalDeleteVisible(true)
  }

  const handleCloseModalDelete = () => {

    setIsModalDeleteVisible(false)
  }

  const handleDeleteAll = () => {

    handleCloseModalDelete();
    requestDeleteAllEmergencySipAccounts();
  }

  return (
    <Collapsible
      trigger="SIP аккаунты"
      className='b-emergency-sip-accounts b-sip-settings__inner-list'
      openedClassName='b-emergency-sip-accounts b-sip-settings__inner-list'
    >
      <div className='b-list'>
        <div className='b-list__buttons'>
          <button
            className='b-button b-list__add-btn'
            onClick={toggleNewAccountInput}
          >
            Добавить
          </button>
          {
            emergencySipAccounts.length !== 0
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
          isCreateInputVisible
          &&
            <Form onSubmit={handleCreateAccountSubmit}>
              <InputField
                innerLabel='Сервер'
                type='text'
                name='server'
                value={newAccount.server}
                onChange={handleNewAccountChange}
                error={!isServerInputValid || (isServerAlreadyExist && isLoginAlreadyExist)}
                helperText={!isServerInputValid && 'Неверный формат данных ("HOST:PORT", порт необязателен)'}
              />
              <InputField
                innerLabel='Логин'
                type='text'
                name='login'
                value={newAccount.login}
                onChange={handleNewAccountChange}
                error={isServerAlreadyExist && isLoginAlreadyExist}
                helperText={isServerAlreadyExist && isLoginAlreadyExist && 'Аккаунт с такими данными уже существует'}
              />
              <button
                type='submit'
                className='b-button b-list__submit-add-btn'
                disabled={
                  !newAccount.server || 
                  !newAccount.login || 
                  !isServerInputValid ||
                  (isServerAlreadyExist && isLoginAlreadyExist) 
                }
              >
                Сохранить
              </button>
            </Form>
        }
        {
          emergencySipAccounts.length > 10
          &&
            <div className='b-emergency-sip-accounts__search-input-wrapper'>
              <InputGroup>
                <FormControl
                  placeholder="Поиск"
                  aria-label="Поиск"
                  aria-describedby="basic-addon2"
                  className='b-emergency-sip-accounts__search-input'
                  value={searchedEmergencySipAccount}
                  onChange={handleSearchedSearchedEmergencySipAccountChange}
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
          emergencySipAccounts.length !== 0
          ?
            <>
              {
                emergencySipAccounts.map((emergencySipAccount, index) => (
                  searchedEmergencySipAccount === '' ||
                    (
                      searchedEmergencySipAccount &&
                      (
                        emergencySipAccount.server.includes(searchedEmergencySipAccount) ||
                        emergencySipAccount.login.includes(searchedEmergencySipAccount)
                      )
                    )
                    ?
                    <div className='b-list__item' key={index}>
                      <div>
                        <p>Сервер: {emergencySipAccount.server}</p>
                        <p>Логин: {emergencySipAccount.login}</p>
                      </div>
                      <button
                        className='b-button b-list__item-delete-btn'
                        onClick={() => handleDeleteAccount(emergencySipAccount.id)}
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
              Аккаунты отсутствуют
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

export default EmergencySipAccounts
