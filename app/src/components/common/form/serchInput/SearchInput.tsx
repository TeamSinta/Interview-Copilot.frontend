import { SearchIcon } from "@/components/common/svgIcons/Icons";
import {
  SerchInputLayout,
  InputIcon,
  SerchInputEl,
} from "../input/StyledInput";

interface ISearchInput {
  disable: boolean;
  placeholder: string;
  error: boolean;
}

const SearchInput = (props: ISearchInput): JSX.Element => {
  const { disable, placeholder, error } = props;
  return (
    <SerchInputLayout>
      <InputIcon>
        <SearchIcon />
      </InputIcon>
      <SerchInputEl
        className={error ? "error" : ""}
        disabled={disable}
        placeholder={placeholder}
      />
    </SerchInputLayout>
  );
};

export default SearchInput;
