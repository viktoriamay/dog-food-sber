import './Search.css';
import { ReactComponent as SearchIcon } from './ic-search.svg';
import { ReactComponent as CloseIcon } from './ic-close-input.svg';
import { useRef} from 'react';

function Search({ onSubmit: propsOnSubmit, onInput }) {
  const handleInput = (e) => {
    onInput(e.target.value);
  }
  
  const searchInputValue = useRef()

  const handleClearSearch = (e) => {
    e.preventDefault()
    searchInputValue.current.value = ''
  }

  return (
        <form className='search' onSubmit={propsOnSubmit} >
          <input 
            type='text'
            className='search__input'
            placeholder='Поиск'
            onInput={handleInput} 
            ref={searchInputValue}
          />
          <button className='search__btn' onClick={handleClearSearch}>
            <SearchIcon />
            {false && <CloseIcon />}
          </button>
        </form>
  )
}

export default Search;