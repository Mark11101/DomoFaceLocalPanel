import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import SearchIcon from '@material-ui/icons/Search'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import CreateIcon from '@material-ui/icons/Create'
import Form from 'react-bootstrap/Form'

import ModalForm from '../../subcomponents/modal-form/ModalForm'
import ModalDelete from '../../subcomponents/modal-delete/ModalDelete'
import Divider from '../../subcomponents/divider/Divider'
import Roles from '../../../constants/Roles'
import SelectField from '../../subcomponents/select-field/SelectField'
import testRegex from '../../../utils/string/testRegex'
import InputField from '../../subcomponents/input-field/InputField'

import './Users.css'

const Users = (props) => {
  const {
    logOut,
    users,
    firstFlatNumber,
    lastFlatNumber,
    currentUser,
    requestUsers,
    requestCurrentUser,
    requestUpdateUser,
    requestCreateUser,
    requestDeleteUser,
    requestDeleteAllUsers,
  } = props;

  const [selectedFlat, setSelectedFlat] = useState('');
  const [selectedRole, setSelectedRole] = useState('Администратор');

  const [loginForEdit, setLoginForEdit] = useState('');

  const [isLoginAlreadyExist, setIsLoginAlreadyExist] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isConfirmedPasswordValid, setIsConfirmedPasswordValid] = useState(true);

  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [searchEmployeeValue, setSearchEmployeeValue]   = useState('');

  const [isEditPasswordModalVisible, setIsEditPasswordModalVisible] = useState(false);
  const [isModalDeleteOperVisible, setIsModalDeleteOperVisible] = useState(false);

  React.useEffect(() => {

    requestUsers()
    requestCurrentUser()
  }, [requestUsers, requestCurrentUser])

  let flats = [];
  
  if (firstFlatNumber !== '' && Number(lastFlatNumber)) {

    for (
      let i = Number(firstFlatNumber); 
      i <= Number(lastFlatNumber); 
      i++
    ) {

      flats.push(i)
    }
  }

  /* search block */

  const handleSearchEmployeeValueChange = (event) => {

    setSearchEmployeeValue(event.target.value)
  }

  /* edit block */

  const [isEditModalFormVisible, setIsEditModalFormVisible] = useState(false);
  const [editedAccount, setEditedAccount] = useState({
    id: '',
    login: '',
    password: '',
    confirmedPassword: '',
    role: Roles.ADMIN,
    flatNumber: 0,
  });

  const handleOpenEditModalForm = (user) => {

    setEditedAccount({
      ...editedAccount,
      id: user.id,
      login: user.login,
      role: user.role,
      flatNumber: user.flatNumber,
    })

    if (user.role === Roles.ADMIN) {
      setSelectedRole('Администратор')
    } else if (user.role === Roles.OPERATOR) {
      setSelectedRole('Оператор')
    } else if (user.role === Roles.USER) {
      setSelectedRole('Житель')
    }

    setSelectedFlat(user.flatNumber)
    setLoginForEdit(user.login)

    setIsEditModalFormVisible(true)
  }

  const handleCloseEditModalForm = () => {

    setIsEditModalFormVisible(false)
  }

  const handleUpdateInputChange = (event) => {
    const value = event.target.value;
    const name  = event.target.name;

    if (name === 'login') {
      
      users.some((user) => user.login === value) && value !== loginForEdit
      ?
        setIsLoginAlreadyExist(true)
      :
        setIsLoginAlreadyExist(false)
    }

    if (name === 'password') {

      testRegex(value, /[A-Z]/) &&
      testRegex(value, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      ?
        setPasswordValid(true)
      :
        setPasswordValid(false)

      value === editedAccount.confirmedPassword || editedAccount.confirmedPassword === ''
      ?
        setIsConfirmedPasswordValid(true)
      :
        setIsConfirmedPasswordValid(false)
    }

    if (name === 'confirmedPassword') {

      value === editedAccount.password
      ?
        setIsConfirmedPasswordValid(true)
      :
        setIsConfirmedPasswordValid(false)
    }

    setEditedAccount({
      ...editedAccount,
      [name]: value,
    })
  }

  const handleUpdateRoleChange = (event) => {
    const value = event.target.value;
    
    setSelectedRole(value)
  
    if (value === 'Администратор') {
      setEditedAccount({
        ...editedAccount,
        role: Roles.ADMIN,
        flatNumber: 0,
      })
    } else if (value === 'Оператор') {
      setEditedAccount({
        ...editedAccount,
        role: Roles.OPERATOR,
        flatNumber: 0,
      })
    } else if (value === 'Житель') {
      setEditedAccount({
        ...editedAccount,
        role: Roles.USER,
      })
    }
  }
  
  const handleUpdateFlatChange = (event) => {
    const value = event.target.value;
    
    setSelectedFlat(value)
    setEditedAccount({
      ...editedAccount,
      flatNumber: value,
    })
  }

  const handleUpdateSubmit = (event) => {
    event.preventDefault()

    requestUpdateUser(editedAccount.id, {
      login: editedAccount.login,
      password: editedAccount.password,
      role: editedAccount.role,
      flatNumber: editedAccount.flatNumber || null,
    })

    setEditedAccount({
      id: '',
      login: '',
      password: '',
      confirmedPassword: '',
      role: Roles.ADMIN,
      flatNumber: 0,
    })

    handleCloseEditModalForm()
    handleCloseEditPasswordModalForm()
  }  

  /* Add block */

  const [isCreateModalFormVisible, setIsCreateModalFormVisible] = useState(false);
  const [newAccount, setNewAccount] = useState({
    login: '',
    password: '',
    confirmedPassword: '',
    role: Roles.ADMIN,
    flatNumber: 0,
  });

  const handleOpenCreateModalForm = () => {
    
    setIsCreateModalFormVisible(true)
  }
  
  const handleCloseCreateModalForm = () => {

    setIsCreateModalFormVisible(false)
  }

  const handleCreateInputChange = (event) => {
    const value = event.target.value;
    const name  = event.target.name;

    if (name === 'login') {
      
      users.some((user) => user.login === value)
      ?
        setIsLoginAlreadyExist(true)
      :
        setIsLoginAlreadyExist(false)
    }

    if (name === 'password') {

      testRegex(value, /[A-Z]/) &&
      testRegex(value, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      ?
        setPasswordValid(true)
      :
        setPasswordValid(false)

      value === newAccount.confirmedPassword || newAccount.confirmedPassword === ''
      ?
        setIsConfirmedPasswordValid(true)
      :
        setIsConfirmedPasswordValid(false)
    }

    if (name === 'confirmedPassword') {

      value === newAccount.password
      ?
        setIsConfirmedPasswordValid(true)
      :
        setIsConfirmedPasswordValid(false)
    }

    setNewAccount({
      ...newAccount,
      [name]: value,
    })
  }

  const handleCreateRoleChange = (event) => {
    const value = event.target.value;
    
    setSelectedRole(value)
  
    if (value === 'Администратор') {
      setNewAccount({
        ...newAccount,
        role: Roles.ADMIN,
        flatNumber: 0,
      })
    } else if (value === 'Оператор') {
      setNewAccount({
        ...newAccount,
        role: Roles.OPERATOR,
        flatNumber: 0,
      })
    } else if (value === 'Житель') {
      setNewAccount({
        ...newAccount,
        role: Roles.USER,
      })
    }
  }
  
  const handleCreateFlatChange = (event) => {
    const value = event.target.value;
    
    setSelectedFlat(value)
    setNewAccount({
      ...newAccount,
      flatNumber: value,
    })
  }

  const handleCreateSubmit = (event) => {
    event.preventDefault()

    requestCreateUser({
      login: newAccount.login,
      password: newAccount.password,
      role: newAccount.role,
      flatNumber: newAccount.flatNumber || null,
    })

    setNewAccount({
      login: '',
      password: '',
      confirmedPassword: '',
      role: Roles.ADMIN,
      flatNumber: 0,
    })

    setSelectedRole('Администратор')
    setSelectedFlat('')

    handleCloseCreateModalForm()
  }  

  const handleLogOutBtnClick = (event) => {
    event.preventDefault()

    logOut()
  }

  const handleDeleteUser = (id) => {
    
    requestDeleteUser(id)
  }

  const handleOpenModalDelete = () => {

    setIsModalDeleteVisible(true);
  }

  const handleCloseModalDelete = () => {

    setIsModalDeleteVisible(false)
  }

  const handleDeleteAllFaces = () => {

    setIsModalDeleteVisible(false);
    requestDeleteAllUsers()
  }

  const handleOpenEditPasswordModalForm = () => {

    setEditedAccount({
      editedAccount,
      id: currentUser.id,
      login: currentUser.login,
      role: Roles.OPERATOR,
      flatNumber: 0,
    })
    setIsEditPasswordModalVisible(true)
  }

  const handleCloseEditPasswordModalForm = () => {

    setIsEditPasswordModalVisible(false)
  }

  const handleOpenModalDeleteOper = () => {

    setIsModalDeleteOperVisible(true)
  }

  const handleCloseModalDeleteOper = () => {

    setIsModalDeleteOperVisible(false)
  }

  const handleDeleteOper = () => {

    handleDeleteUser(currentUser.id)
    handleCloseModalDeleteOper()
    logOut()
  }
  
  return (
    <>
      <Container className='b-users'>
        <h1 className='b-users__title'>
          {currentUser.login}
        </h1>
        <Divider />
        {
          currentUser.role === Roles.ADMIN
          &&
            <button
              className='b-button b-users__edit-user-btn'
              onClick={() => handleOpenEditModalForm(currentUser)}
            >
              Обновить данные
            </button>
        }
        {
          currentUser.role === Roles.OPERATOR
          &&
            <>
              <button
                className='b-button b-users__edit-user-btn'
                onClick={handleOpenEditPasswordModalForm}
              >
                Обновить пароль
              </button>
              <button
                className='b-button b-button--delete b-users__delete-all-btn'
                onClick={handleOpenModalDeleteOper}
              >
                Удалить аккаунт
              </button>
            </>
        }
        <button
          className='b-button b-users__log-out-btn'
          onClick={handleLogOutBtnClick}
        >
          Выйти
        </button>
        {
          currentUser.role === Roles.ADMIN
          &&
            <>
              <h1 className='b-users__title'>
                Управление аккаунтами
              </h1>
              <div className='b-users__users-buttons'>
                <button
                  className='b-button b-users__add-btn'
                  onClick={handleOpenCreateModalForm}
                >
                  Добавить
                </button>
                <button
                  className='b-button b-button--delete b-users__delete-all-btn'
                  onClick={handleOpenModalDelete}
                >
                  Удалить все
                </button>
              </div>
              {
                users.length > 7
                &&
                  <InputGroup>
                    <FormControl
                      placeholder="Поиск"
                      aria-label="Поиск"
                      aria-describedby="basic-addon2"
                      className='b-users__search-input'
                      value={searchEmployeeValue}
                      onChange={handleSearchEmployeeValueChange}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <SearchIcon />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
              }
              {
                users.length !== 0
                ?
                  <>
                    {
                      users.map((user) => {
                        if (searchEmployeeValue === '' || (searchEmployeeValue && user.login.includes(searchEmployeeValue))) {
                          return (
                            <div className='b-users__employee' key={user.id}>
                              <span>{user.login}</span>
                              <div className='b-users__employee-buttons'>
                                <button
                                  className='b-button b-users__edit-btn'
                                  onClick={() => handleOpenEditModalForm(user)}
                                >
                                  <CreateIcon />
                                </button>
                                <button
                                  className='b-button b-users__delete-btn'
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  <DeleteForeverIcon />
                                </button>
                              </div>
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
                    Аккаунты отсустствуют
                  </div>
              }
            </>
        }
      </Container>
      <ModalForm
        title='Обновление данных'
        handleCloseModal={handleCloseEditModalForm}
        show={isEditModalFormVisible}
      >
        <Form onSubmit={handleUpdateSubmit}>              
          <InputField 
            type='text'
            name='login'
            innerLabel='Логин'
            value={editedAccount.login}
            onChange={handleUpdateInputChange}
            error={isLoginAlreadyExist}
            helperText={isLoginAlreadyExist && 'Логин занят'}
          />  
          <InputField 
            type='password'
            name='password'
            innerLabel='Пароль'
            customPasswordValidation
            value={editedAccount.password}
            onChange={handleUpdateInputChange}
            error={!isPasswordValid}
            helperText={!isPasswordValid && 'Введите по крайней мере одну прописную и заглавную латинские буквы, одно число и один спец. символ ((#?!@$%^&*-). Минимальная длина пароля: 8 символов.'}
          />     
          <InputField 
            type='password'
            name='confirmedPassword'
            innerLabel='Подтвердите пароль'
            customPasswordValidation
            value={editedAccount.confirmedPassword}
            onChange={handleUpdateInputChange}
            error={!isConfirmedPasswordValid}
            helperText={!isConfirmedPasswordValid && 'Пароли не совпадают'}
          />
          <SelectField 
            selectedValue={selectedRole}
            values={[
              'Администратор',
              'Оператор',
              'Житель'
            ]}
            onChange={handleUpdateRoleChange}          
          />
          {
            selectedRole === 'Житель'
            &&
              <SelectField 
                label='Квартира:'
                selectedValue={selectedFlat}
                values={flats}
                onChange={handleUpdateFlatChange}          
              />
          }
          <button  
            type='submit'
            className='b-button b-modal__submit-btn'
            disabled={
              !editedAccount.login || 
              !editedAccount.password || 
              !isPasswordValid || 
              (editedAccount.password !== editedAccount.confirmedPassword) ||
              isLoginAlreadyExist
            }
          >
            Обновить
          </button>
        </Form>
      </ModalForm>
      <ModalForm
        title='Добавление аккаунта'
        handleCloseModal={handleCloseCreateModalForm}
        show={isCreateModalFormVisible}
      >
        <Form onSubmit={handleCreateSubmit}>              
          <InputField 
            type='text'
            name='login'
            innerLabel='Логин'
            value={newAccount.login}
            onChange={handleCreateInputChange}
            error={isLoginAlreadyExist}
            helperText={isLoginAlreadyExist && 'Логин занят'}
          />  
          <InputField 
            type='password'
            name='password'
            innerLabel='Пароль'
            customPasswordValidation
            value={newAccount.password}
            onChange={handleCreateInputChange}
            error={!isPasswordValid}
            helperText={!isPasswordValid && 'Введите по крайней мере одну прописную и заглавную латинские буквы, одно число и один спец. символ ((#?!@$%^&*-). Минимальная длина пароля: 8 символов.'}
          />     
          <InputField 
            type='password'
            name='confirmedPassword'
            innerLabel='Подтвердите пароль'
            customPasswordValidation
            value={newAccount.confirmedPassword}
            onChange={handleCreateInputChange}
            error={!isConfirmedPasswordValid}
            helperText={!isConfirmedPasswordValid && 'Пароли не совпадают'}
          />
          <SelectField 
            selectedValue={selectedRole}
            values={[
              'Администратор',
              'Оператор',
              'Житель'
            ]}
            onChange={handleCreateRoleChange}          
          />
          {
            selectedRole === 'Житель'
            &&
              <SelectField 
                label='Квартира:'
                selectedValue={selectedFlat}
                values={flats}
                onChange={handleCreateFlatChange}          
              />
          }
          <button  
            type='submit'
            className='b-button b-modal__submit-btn'
            disabled={
              !newAccount.login || 
              !newAccount.password || 
              !isPasswordValid || 
              (selectedRole === 'Житель' && selectedFlat === '') ||
              (newAccount.password !== newAccount.confirmedPassword) ||
              isLoginAlreadyExist
            }
          >
            Добавить
          </button>
        </Form>
      </ModalForm>
      <ModalDelete
        show={isModalDeleteVisible}
        handleCloseModal={handleCloseModalDelete}
        handleDeleteAll={handleDeleteAllFaces}
      />
      <ModalForm
        title='Обновление пароля'
        handleCloseModal={handleCloseEditPasswordModalForm}
        show={isEditPasswordModalVisible}
      >
        <Form onSubmit={handleUpdateSubmit}>   
          <InputField 
            type='password'
            name='password'
            innerLabel='Пароль'
            customPasswordValidation
            value={editedAccount.password}
            onChange={handleUpdateInputChange}
            error={!isPasswordValid}
            helperText={!isPasswordValid && 'Введите по крайней мере одну прописную и заглавную латинские буквы, одно число и один спец. символ ((#?!@$%^&*-). Минимальная длина пароля: 8 символов.'}
          />     
          <InputField 
            type='password'
            name='confirmedPassword'
            innerLabel='Подтвердите пароль'
            customPasswordValidation
            value={editedAccount.confirmedPassword}
            onChange={handleUpdateInputChange}
            error={!isConfirmedPasswordValid}
            helperText={!isConfirmedPasswordValid && 'Пароли не совпадают'}
          />
          <button  
            type='submit'
            className='b-button b-modal__submit-btn'
            disabled={
              !editedAccount.password || 
              !isPasswordValid || 
              (editedAccount.password !== editedAccount.confirmedPassword)
            }
          >
            Обновить
          </button>
        </Form>
      </ModalForm>      
      <ModalDelete
        show={isModalDeleteOperVisible}
        handleCloseModal={handleCloseModalDeleteOper}
        handleDeleteAll={handleDeleteOper}
        header='Вы уверены, что хотите удалить ваш аккаунт?'
      />
    </>
  )
}

export default Users
