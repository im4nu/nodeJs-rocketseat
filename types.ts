export type coursesTypes = {
  id: string;
  title: string;
};

export type createCourseBodyTypes = {
  title: string;
  description: string | null;
};

export type getCourseByIdParamType = {
  id: string;
};
