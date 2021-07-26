import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  margin: 0px 1rem;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1rem;
  grid-template-areas:
    "showcase cash-feeder"
    "showcase item-picker"
    ". error";
  .showcase {
    grid-area: showcase;
  }
  .cash-feeder {
    grid-area: cash-feeder;
  }
  .error {
    grid-area: error;
  }
  .item-picker {
    grid-area: item-picker;
  }
`;
