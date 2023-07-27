import styled from "styled-components"

const Container =styled.div`
    height: 30px;
    background-color:  #FF3E6C;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

const Announcement = () => {
  return (
    <Container>Super Deal! Free shipping on Orders Over Rs.499</Container>
  )
}

export default Announcement