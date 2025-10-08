import { useState } from "react";
import { styled } from "styled-components";

const Inputbox = styled.div`
  display: flex;
  flex-direction: row;
`;
const Container = styled.div`
  box-sizing: border-box;
`;
const Input = styled.input`
  box-sizing: inherit;
  height: ${(props) => (props.$height ? props.$height : "24px")};
`;
const Button = styled.button`
  box-sizing: inherit;
`;

export default function InputBox({ config }) {
  const [text, setText] = useState("");

  const btnText =
    config.buttonText !== undefined ? config.buttonText : "Button";
  const placeholderText =
    config.placeholderText !== undefined ? config.placeholderText : "";

  const handleOnChange = (e) => {
    setText(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };
  const handleUpdate = () => {
    config.update(text);
    setText("");
  };

  return (
    <Inputbox>
      <Container>
        <Input
          type="text"
          $height={config.height}
          placeholder={placeholderText}
          value={text}
          onChange={handleOnChange}
          onKeyDown={handleEnter}
        />
      </Container>
      <Container>
        <Button onClick={handleUpdate}>{btnText}</Button>
      </Container>
    </Inputbox>
  );
}
