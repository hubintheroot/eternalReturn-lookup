import { useState } from 'react';
import { styled } from 'styled-components'

const Inputbox = styled.div`
    display: flex;
    flex-direction: row;
`;
const Container = styled.div`
    box-sizing: border-box;
`;
const Input = styled.input`
    box-sizing: inherit;
    height: ${(props) => props.height ? props.height : '24px'};
`;
const Button = styled.button`
    box-sizing: inherit;
`;

export default function InputBox(props) {
    const [ text, setText ] = useState('');
    
    const btnText = props.data.buttonText !== undefined ? props.data.buttonText : 'Button';
    const placeholderText = props.data.placeholderText !== undefined ? props.data.placeholderText : '';
    
    const handleOnChange = (e) => {
        setText(e.target.value);
    };
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleUpdate();
        }
    }
    const handleUpdate = () => {
        props.data.update(text);
        setText('');
    }
    
    return (
        <Inputbox>
            <Container>
                <Input 
                    type="text" 
                    height= { props.data.height }
                    placeholder={ placeholderText }
                    value={ text }
                    onChange={ handleOnChange }
                    onKeyDown={ handleEnter }
                />
            </Container>
            <Container>
                <Button
                    onClick={ handleUpdate }
                >{ btnText }</Button>
            </Container>
        </Inputbox>
    )
}