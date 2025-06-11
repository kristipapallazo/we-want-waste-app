import { Input } from "antd";
import { FC, memo } from "react";

type SearchProps = {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
};

const { Search } = Input;

const MainSearch: FC<SearchProps> = memo(
  ({ value = "", placeholder = "Search", onChange, style, ...props }) => {
    return (
      <Search
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ width: 200, ...style }} // Allow overriding default width
        {...props}
      />
    );
  }
);

export default MainSearch;
