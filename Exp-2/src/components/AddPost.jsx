import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { addPost } from "../features/postsSlice";

function AddPost() {
  const dispatch = useDispatch();

  const platforms = useSelector((state) => state.platforms.list);

  const options = platforms.map((item) => ({
    value: item,
    label: item,
  }));

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState(options[0]);

  const handleAdd = () => {
    if (!title.trim()) return;

    dispatch(
      addPost({
        id: Date.now(),
        title,
        platform: platform.value,
      })
    );

    setTitle("");
    setPlatform(options[0]);
  };

  return (
    <div className="form">
      <input
        type="text"
        placeholder="Enter Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        options={options}
        value={platform}
        onChange={setPlatform}
        isSearchable={false}
      />

      <button onClick={handleAdd}>
        Add Post
      </button>
    </div>
  );
}

export default AddPost;