import { SearchIcon } from '@/components/common/svgIcons/Icons';
import {
  SerchInputLayout,
  InputIcon,
  SerchInputEl,
} from '../input/StyledInput';

interface ISearchInput {
  disable: boolean;
  placeholder: string;
  error: boolean;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = (props: ISearchInput): JSX.Element => {
  const { disable, placeholder, value, error, onChange } = props;
  return (
    <SerchInputLayout>
      <InputIcon>
        <SearchIcon />
      </InputIcon>
      <SerchInputEl
        className={error ? 'error' : ''}
        disabled={disable}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </SerchInputLayout>
  );
};

export default SearchInput;
