import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AboutCourse from "../components/Category/AboutCourse";
import CourseContainer from "../components/Category/CourseContainer";
import { getCategoryCourses } from "../Services/operations/categoryCourse";
import type { RootState } from "../Services/strore";
import { CourseGridSkeleton, Skeleton } from "../components/commons/Skeleton";

function Catalog() {
  const { loading } = useSelector((state: RootState) => state.loading);

  const location = useLocation();
  const dispatch = useDispatch();
  const categoryId = location.state;
  const query = new URLSearchParams(location.search);
  const desc = query.get("desc") || "";
  const params = useParams<{ catalogName: string }>();

  // Redux `loading` only flips after the thunk starts, so track the first
  // completed fetch locally — otherwise the empty state flashes on mount.
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    setSettled(false);
    (async () => {
      await getCategoryCourses({ dispatch, categoryId });
      setSettled(true);
    })();
  }, [categoryId]);

  const showSkeleton = loading || !settled;

  return (
    <div className="min-h-[60vh] bg-ink-950">
      <AboutCourse heading={params.catalogName} desc={desc} />

      {showSkeleton ? (
        <div className="sn-container-wide py-14 md:py-20">
          <Skeleton className="mb-3 h-8 w-64" />
          <Skeleton className="mb-8 h-4 w-96 max-w-full" />
          <CourseGridSkeleton count={8} />
        </div>
      ) : (
        <CourseContainer />
      )}
    </div>
  );
}

export default Catalog;
