const CourseHeader = ({
  courseId,
  courseName,
  courseDestination,
  courseDistance,
  coursePath,
}) => {
  return (
    <>
      <div className="result_head_container">
        <h2 className="result_head">
          <span className="courseNameNum">{courseId + 1}코스</span>
          <span className="courseName">{courseName}</span>
        </h2>
        <h4 className="result_course_destination">
          <span>{courseDestination}</span> | 코스 총거리 :
          <span>{courseDistance}</span>
        </h4>
      </div>
      <h3 className="result_course_path">{coursePath}</h3>
    </>
  );
};

export default CourseHeader;
