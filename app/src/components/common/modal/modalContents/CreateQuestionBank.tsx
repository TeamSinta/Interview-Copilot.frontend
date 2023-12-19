import { AppDispatch } from "@/app/store";
import { TextBtnL } from "@/components/common/buttons/textBtn/TextBtn";
import { InputLayout } from "@/components/common/form/input/StyledInput";
import TextArea from "@/components/common/form/textArea/TextArea";
import TextInput from "@/components/common/form/textInput/TextInput";
import { BodySMedium } from "@/components/common/typeScale/StyledTypeScale";
import { closeModal } from "@/features/modal/modalSlice";
import { useAddQuestionBankMutation } from "@/features/questions/questionsAPISlice";
import { BackgroundColor } from "@/features/utils/utilEnum";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ModalContentWrap } from "./StyledModalContents";

const titleInputArg = {
  error: false,
  disable: false,
  placeholder: "Title",
  name: "title",
};

const descriptionInputArg = {
  error: false,
  disable: false,
  placeholder: "Description",
  name: "description",
};

interface ICreateQuestionBankState {
  title: string;
  description: string;
}

const CreateQuestionBank = () => {
  const [inputValue, setInputValue] = useState<ICreateQuestionBankState>({
    title: "",
    description: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const [addQuestionBank] = useAddQuestionBankMutation();

  const handleNext = async () => {
    try {
      const requestData = {
        title: inputValue.title,
        description: null,
      };

      await addQuestionBank(requestData)?.unwrap();
      dispatch(closeModal());
    } catch (error) {
      console.error("Failed to add template:", error);
    }
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const textAreaOnChange = (value: string) => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      description: value,
    }));
  };

  return (
    <ModalContentWrap>
      <InputLayout>
        <BodySMedium>Title</BodySMedium>
        <TextInput
          {...titleInputArg}
          onChange={inputOnChange}
          value={inputValue["title"]}
        />
      </InputLayout>
      <InputLayout>
        <BodySMedium>Description</BodySMedium>
        <TextArea
          {...descriptionInputArg}
          onChange={textAreaOnChange}
          value={inputValue["description"]}
        />
      </InputLayout>
      <div style={{ marginTop: "8px" }}>
        <TextBtnL
          label="Next"
          disable={false}
          onClick={handleNext}
          className={BackgroundColor.ACCENT_PURPLE}
        />
      </div>
    </ModalContentWrap>
  );
};

export default CreateQuestionBank;
