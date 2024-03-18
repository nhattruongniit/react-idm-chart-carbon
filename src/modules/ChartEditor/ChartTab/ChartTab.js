import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// carbon icons
import { Add } from '@carbon/icons-react';

// actions
import { addTab } from 'reducer/tabs.reducer';

// selectors
import { tabsSelector, activeTabIdSelector } from 'selectors/tabs.selector';

// components
import TabItem from './TabItem';

const ChartTab = ({ children }) => {
  const dispatch = useDispatch();
  const tabs = useSelector(tabsSelector);
  const activeTabId = useSelector(activeTabIdSelector);

  const handleAddTab = () => {
    dispatch(addTab());
  };

  return (
    <Container>
      <TabsContainer>
        {tabs.map((tabItem) => (
          <TabItem key={tabItem.id} id={tabItem.id} options={tabItem.options} name={tabItem.name} isActive={tabItem.id === activeTabId} />
        ))}
        <AddButton onClick={handleAddTab}>
          <Add />
        </AddButton>
      </TabsContainer>
      <Content>{children}</Content>
    </Container>
  );
};

export default ChartTab;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0 10px;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  z-index: 50;
  margin: 0 -10px;
`;

const AddButton = styled.div`
  min-width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    fill: var(--cds-icon-01, #161616);
  }
`;

const Content = styled.div`
  flex-grow: 1;
  z-index: 9;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;
