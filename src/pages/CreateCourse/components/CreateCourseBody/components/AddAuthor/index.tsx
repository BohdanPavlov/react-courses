import { ChangeEventHandler, FC, useState } from 'react';

import Input from 'common/Input';
import Button from 'common/Button';
import { useAppDispatch } from 'hooks/redux.hooks';
import { createAuthor } from 'store/authors/authorsAsyncThunks';

import './AddAuthor.scss';

const AddAuthor: FC = () => {
  const [authorName, setAuthorName] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleAuthorNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAuthorName(e.target.value);
  };

  const createNewAuthor = () => {
    if (authorName.length < 3) {
      alert('Author name should be longer than 3 symbols!');
      return;
    }

    dispatch(createAuthor(authorName));

    setAuthorName('');
  };

  return (
    <div className='add-author'>
      <h3 className='add-author__title'>Add Author</h3>
      <Input
        labelText='Author name'
        placeholder='Enter author name...'
        value={authorName}
        onChange={handleAuthorNameChange}
      />
      <Button type='button' className='add-author__button' onClick={createNewAuthor}>
        Create author
      </Button>
    </div>
  );
};

export default AddAuthor;
