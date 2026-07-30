import { useSelector } from "react-redux";
import {
  totalPosts,
  publishedPosts,
  draftPosts,
} from "../features/selectors";

function Stats() {
  const total = useSelector(totalPosts);
  const published = useSelector(publishedPosts);
  const draft = useSelector(draftPosts);

  return (
    <div className="stats">
      <div>
        <h3>Total Posts</h3>
        <p>{total}</p>
      </div>

      <div>
        <h3>Published</h3>
        <p>{published.length}</p>
      </div>

      <div>
        <h3>Draft</h3>
        <p>{draft.length}</p>
      </div>
    </div>
  );
}

export default Stats;