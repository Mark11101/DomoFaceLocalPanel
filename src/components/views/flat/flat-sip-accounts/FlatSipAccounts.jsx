import React, { useState } from 'react'
import Collapsible from 'react-collapsible'
import SearchIcon from '@material-ui/icons/Search'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'

import InputField from '../../../subcomponents/input-field/InputField'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import ModalDelete from '../../../subcomponents/modal-delete/ModalDelete'
import testRegex from '../../../../utils/string/testRegex'

import './FlatSipAccounts.css'

const FlatSipAccounts = (props) => {
  const {
    number,
    flatSipAccounts,
    requestFlatSipAccounts,
    requestAddFlatSipAccount,
    requestDeleteAllFlatSipAccounts,
    requestDeleteFlatSipAccount,
  } = props;

  React.useEffect(() => {

    requestFlatSipAccounts(number)
  }, [requestFlatSipAccounts, number])

  const [isCreateInputVisible, setIsCreateInputVisible] = useState(false);
  const [searchedFlatSipAccount, setSearchedFlatSipAccount] = useState('');
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isServerInputValid, setIsServerInputValid] = useState(true);
  const [newAccount, setNewAccount] = useState({
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

      testRegex(value, /^[\w.]*(:\d*)?$/)
      ?
        setIsServerInputValid(true)
      :
        setIsServerInputValid(false)
    }

    setNewAccount({
      ...newAccount,
      [name]: value,
    })
  }

  const handleCreateAccountSubmit = (event) => {
    event.preventDefault()

    setNewAccount({
      server: '',
      login: '',
    })

    requestAddFlatSipAccount(number, newAccount.server, newAccount.login)
  }

  const handleDeleteAccount = (id) => {

    requestDeleteFlatSipAccount(id, number)
  }

  const handleSearchedSearchedFlatSipAccountChange = (event) => {

    setSearchedFlatSipAccount(event.target.value)
  }

  const handleOpenModalDelete = () => {

    setIsModalDeleteVisible(true)
  }

  const handleCloseModalDelete = () => {

    setIsModalDeleteVisible(false)
  }

  const handleDeleteAll = () => {

    handleCloseModalDelete();
    requestDeleteAllFlatSipAccounts(number);
  }

  return (
    <Collapsible 
      trigger="SIP аккаунты жителей"
      className='b-flat-sip-accounts'
      openedClassName='b-flat-sip-accounts'
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
            flatSipAccounts.length !== 0
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
                error={!isServerInputValid}
                helperText={!isServerInputValid && 'Неверный формат данных ("HOST:PORT", порт необязателен)'}
              />
              <input name='login' className='b-input-field__empty-input' />
              <InputField 
                innerLabel='Логин'
                type='text'
                name='login'
                value={newAccount.login}
                onChange={handleNewAccountChange}
              />
              <button 
                type='submit'
                className='b-button b-list__submit-add-btn'
                disabled={!newAccount.server || !newAccount.login || !isServerInputValid}
              >
                Сохранить
              </button>
            </Form>
        }
        {
          flatSipAccounts.length > 10
          &&      
            <div className='b-flat-sip-accounts__search-input-wrapper'>
              <InputGroup>
                <FormControl
                  placeholder="Поиск"
                  aria-label="Поиск"
                  aria-describedby="basic-addon2"
                  className='b-flat-sip-accounts__search-input'
                  value={searchedFlatSipAccount}
                  onChange={handleSearchedSearchedFlatSipAccountChange}
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
          flatSipAccounts.length !== 0
          ?
            <>
              {
                flatSipAccounts.map((flatSipAccount, index) => (
                  searchedFlatSipAccount === '' || 
                  (
                    searchedFlatSipAccount && 
                    (
                      flatSipAccount.server.includes(searchedFlatSipAccount) || 
                      flatSipAccount.login.includes(searchedFlatSipAccount)
                    )
                  )
                  ?
                    <div className='b-list__item' key={index}>
                      <div>
                        <p>Сервер: {flatSipAccount.server}</p>
                        <p>Логин: {flatSipAccount.login}</p>
                      </div>
                      <button 
                        className='b-button b-list__item-delete-btn'
                        onClick={() => handleDeleteAccount(flatSipAccount.id)}  
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
            <div className='b-list__item'>
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

export default FlatSipAccounts
