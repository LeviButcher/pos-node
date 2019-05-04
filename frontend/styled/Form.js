import styled from "styled-components";

const Form = styled.form`
  & > header {
    margin-bottom: 20px;
    border-bottom: 5px solid ${props => props.theme.colors.primary};
  }
`;

const Input = styled.input`
  display: block;
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  outline: 0;
  border: 0;
  background-color: #eee;
  border-bottom: 5px solid ${props => props.theme.colors.primary};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

export { Form, Input, Label };
