import styled from "@emotion/styled";

export const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  padding: 15px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
  background: white;

  gap: 16px;

  .secondary-details {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
