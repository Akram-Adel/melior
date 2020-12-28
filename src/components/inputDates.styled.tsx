import styled from 'styled-components';

// BTW -- I'm using BEM for class names here, so insted of creating a styled component for each element
// I create a styled component for each BEM block

// eslint-disable-next-line import/prefer-default-export
export const DatesContainer = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .dates-container__date {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    align-items: center;
    align-items: center;
    font-size: 1.4rem;
    font-weight: bold;
  }
`;
