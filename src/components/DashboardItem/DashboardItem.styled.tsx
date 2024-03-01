import styled from "@emotion/styled";

export const BoardItem = styled.li`
  padding: 10px;
  border: 1px solid black;
  border-radius: 20px;

  width: 200px;
  height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledInput = styled.input`
  text-align: center;

  border: 1px solid #c6c6c6;
  border-radius: 8px;

  outline: none;
`;

export const StyledForm = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;
