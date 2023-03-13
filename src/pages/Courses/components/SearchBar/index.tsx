import { ChangeEvent, FC, useState } from 'react';

import Input from 'common/Input';
import Button from 'common/Button';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { setSearchedCourses } from 'store/courses/coursesSlice';

import './SearchBar.scss';

const SearchBar: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const courses = useAppSelector((state) => state.courses.courses);
  const dispatch = useAppDispatch();

  function handleSearch(): void {
    if (!searchQuery) return;

    if (courses) {
      const searchedCourses = courses.filter(
        (course) =>
          course.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      dispatch(setSearchedCourses(searchedCourses));
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    if (!value) {
      dispatch(setSearchedCourses(null));
    }

    setSearchQuery(value);
  };

  return (
    <div className='search-bar'>
      <Input
        placeholder='Enter course name...'
        className='search-bar__input'
        value={searchQuery}
        onChange={handleChange}
      />
      <Button type='button' className='search-bar__button' onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
