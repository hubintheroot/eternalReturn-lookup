import { styled } from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 64px);
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    color: #000;
    margin-top: 20px;
`

export default function ComingSoonView(props){
    return (
        <Container>
            <h1>Coming Soon</h1>
            <div>
                <p>{props.data.text}</p>
            </div>
        </Container>
    )
}