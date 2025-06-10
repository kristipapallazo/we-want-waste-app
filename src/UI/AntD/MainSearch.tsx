import { Input } from "antd";
// import { AudioOutlined } from "@ant-design/icons";
// import type { GetProps } from "antd";
import { FC } from "react";
import { SearchProps } from "antd/es/input";

// type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const MainSearch: FC<SearchProps> = ({ placeholder = "Search", ...props }) => {
  return (
    <Search placeholder="input search text" style={{ width: 200 }} {...props} />
  );
};

export default MainSearch;
