import React, { useState } from  'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CreateIcon from '@material-ui/icons/Create'

import ModalForm from '../../subcomponents/modal-form/ModalForm'
import ModalDelete from '../../subcomponents/modal-delete/ModalDelete'

import './ListForm.css'

const ListForm = (props) => {
  const {
    values,
    header,
    noValuesText,
    addValueHeader,
    valuesCountForSearchVisibility = 7,
    links,
    innerModal,
    openInnerModal,
    changeEditedValueId,
    deleteValue,
    deleteAllValues,
    renderAddForm,
    renderEditForm,
  } = props;
  
  const [searchedValue, setSearchedValue] = useState('');

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

  const toggleAddModal = () => {

    setIsAddModalVisible(!isAddModalVisible)
  }

  const handleOpenEditModal = (index) => {

    setIsEditModalVisible(true)
    changeEditedValueId(index)
  }

  const handleCloseEditModal = () => {

    setIsEditModalVisible(false)
  }

  const handleDeleteAllValues = () => {

    deleteAllValues()
  }

  const handleDeleteValue = (data) => {

    deleteValue(data)
  }

  const handleSearchedValueChange = (event) => {

    setSearchedValue(event.target.value)
  }

  const handleClickItemButton = (index) => {
    
    openInnerModal(index)
  }

  const handleOpenDeleteAllModal = () => {

    setIsModalDeleteVisible(true)
  }

  const handleCloseModalDelete = () => {

    setIsModalDeleteVisible(false)
  }

  const outputListItems = (data, index) => {

    if (innerModal) {

      return (
        <button
          className='b-list-form__item-open-modal-btn'
          onClick={() => handleClickItemButton(index)}
        >
          {data}
        </button>
      )
    } else if (links) {

      return (
        <Link
          className='b-list-form__item-link'
          to='/intercom-screen'
        >
          {data}
        </Link>
      )
    } else {

      return (
        <span className='b-list-form__item-span'>
          {data}
        </span>
      )
    }
  }
  
  return (
    <>
      <div className='b-list-form'>
        {
          header
          &&
            <h1 className='b-list-form__header'>
              {header}
            </h1>
        }
        <div className='b-list-form__buttons'>
          <button 
            className='b-button b-list-form__add-btn'
            onClick={toggleAddModal}
          >
            Добавить
          </button>
          {
            values && values.length !== 0
            &&
              <button 
                className='b-button b-button--delete b-list-form__delete-all-btn'
                onClick={handleOpenDeleteAllModal}
              >
                Удалить все
              </button>
          }
        </div>
        {
          values && values.length > valuesCountForSearchVisibility
          &&      
            <InputGroup className='b-list-form__search-input-group'>
              <FormControl
                placeholder="Поиск"
                aria-label="Поиск"
                aria-describedby="basic-addon2"
                className='b-list-form__search-input'
                value={searchedValue}
                onChange={handleSearchedValueChange}
              />
              <InputGroup.Append>
                <InputGroup.Text>
                  <SearchIcon />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>   
        }  
        {
          values && values.length !== 0
          ?
            <div className='b-list-form__list'>
              {
                values.map((value, index) => {
                  if (searchedValue === '' || (searchedValue && value.data.includes(searchedValue))) {
                    return (
                      <div className='b-list-form__item' key={index}>
                        {outputListItems(value.data, index)}
                        <div className='b-list-form__item-buttons'>
                          <button 
                            className='b-button b-list-form__edit-btn'
                            onClick={() => handleOpenEditModal(index)}
                          >
                            <CreateIcon />
                          </button>
                          <button 
                            className='b-button b-list-form__delete-btn'
                            onClick={(value) => handleDeleteValue(value.data)}
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
            </div>
          :
            <div className='b-list-form__no-values'>
              {noValuesText}
            </div>
        }        
      </div>
      {
        isAddModalVisible
        &&
          <ModalForm
            title={addValueHeader}
            handleCloseModal={toggleAddModal}
          >            
            {renderAddForm()}
          </ModalForm>
      }
      {
        isEditModalVisible
        &&
          <ModalForm
            title='Обновление данных'
            handleCloseModal={handleCloseEditModal}
          >          
            {renderEditForm()}
          </ModalForm>
      }
      {
        isModalDeleteVisible
        &&
          <ModalDelete
            show={isModalDeleteVisible}
            handleCloseModal={handleCloseModalDelete}
            handleDeleteAll={handleDeleteAllValues}
          />
      }
    </>
  )
}

export default ListForm
