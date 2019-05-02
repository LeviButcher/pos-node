import styled from "styled-components";

const Table = styled.table`
  & > thead > tr {
    background: ${props => props.theme.colors.primary};
  }

  & > tbody > tr td {
    padding: 10px;
  }

  & > tbody > tr:nth-child(even) {
    background: ${props => props.theme.colors.primary};
  }
`;

export default Table;
