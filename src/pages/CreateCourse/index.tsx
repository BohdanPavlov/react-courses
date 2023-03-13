import { FC, useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

import CreateCourseHeader from 'pages/CreateCourse/components/CreateCourseHeader';
import CreateCourseBody from 'pages/CreateCourse/components/CreateCourseBody';
import { CreateCourseValues, NewCourseData } from 'types/courses.types';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { COURSES_ROUTE } from 'utils/constants';
import {
  createNewCourse,
  fetchSelectedCourse,
  updateCourse,
} from 'store/courses/coursesAsyncThunks';

interface CreateCourseProps {
  mode: string;
}

const CreateCourse: FC<CreateCourseProps> = ({ mode }) => {
  const selectedCourse = useAppSelector((state) => state.courses.selectedCourse);
  const newCourseAuthorsIds = useAppSelector((state) => state.authors.newCourseAuthorsIds);
  const [initialState, setInitialState] = useState<CreateCourseValues>({
    title: '',
    description: '',
    duration: '',
  });
  const count = useRef(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    if (mode === 'edit' && courseId) {
      dispatch(fetchSelectedCourse(courseId));
    }
  }, []);

  if (selectedCourse && count.current === 0) {
    setInitialState({
      title: selectedCourse.title,
      description: selectedCourse.description,
      duration: selectedCourse.duration.toString(),
    });
    count.current = 1;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialState}
      validationSchema={Yup.object({
        title: Yup.string().required('Required!').min(3, 'Title should be longer than 3 symbols'),
        description: Yup.string()
          .required('Required')
          .min(10, 'Description should be longer than 10 symbols'),
        duration: Yup.string().required('Required'),
      })}
      onSubmit={(values: CreateCourseValues) => {
        if (!newCourseAuthorsIds.length) {
          alert('Please add authors for this course!');
          return;
        }

        const newCourse: NewCourseData = {
          title: values.title,
          description: values.description,
          duration: Number(values.duration),
          authors: newCourseAuthorsIds,
        };

        console.log(newCourse);

        if (mode === 'edit' && courseId) {
          dispatch(updateCourse({ newCourseData: newCourse, id: courseId }));
        } else {
          dispatch(createNewCourse(newCourse));
        }

        navigate(COURSES_ROUTE);
      }}
    >
      {({ handleSubmit, values }) => (
        <form className='create-course' onSubmit={handleSubmit}>
          <CreateCourseHeader mode={mode} />
          <CreateCourseBody values={values} />
        </form>
      )}
    </Formik>
  );
};

export default CreateCourse;
