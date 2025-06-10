import { Input } from "antd";
import { FC, useState } from "react";

import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const MainSearch: FC<SearchProps> = ({ placeholder = "Search", ...props }) => {
  console.log("props", props);
  const [search, setSearch] = useState<string>("");
  return (
    <Search
      placeholder="input search text"
      value={search}
      style={{ width: 200 }}
      {...props}
    />
  );
};

export default MainSearch;
