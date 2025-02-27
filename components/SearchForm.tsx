import React from 'react'
import Form from "next/form"
import SearchFormReset from './SearchFormReset'
import { Search } from 'lucide-react'

const SearchForm = ({ query }:{ query?: string }) => {

    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;
        if(form) form.reset();
    }
  return (
    <Form action="/" scroll={false} className='search-form'>
        <input 
        type="text" 
        name='query' 
        defaultValue="" 
        className='search-input 
        text-center' 
        placeholder='Search News'/>

        <div className='flex gap-2'>
            {query && <SearchFormReset/>}
            <button type='submit' className='search-btn text-white'>
                    <Search className='size-5'/>
                </button>
        </div>
    </Form>
  )
}

export default SearchForm