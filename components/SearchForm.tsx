import React from 'react';
import { Search } from 'lucide-react';
import SearchFormReset from './SearchFormReset';

const SearchForm = ({ query }: { query?: string }) => {
  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement;
    if (form) form.reset();
  };

  return (
    <form action="/" method="GET" className="search-form">
      <input 
        type="text" 
        name="query" 
        defaultValue="" 
        className="search-input text-center" 
        placeholder="Search News" 
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
