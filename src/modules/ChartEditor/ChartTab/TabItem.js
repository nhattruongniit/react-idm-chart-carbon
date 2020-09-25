import React from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';

// carbon icon
import CloseIcon from '@carbon/icons-react/es/close/16';
import MenuIcon from '@carbon/icons-react/es/overflow-menu--vertical/16';

// components
import TabItemPopover from './TabItemPopover';
import PopoverButton from 'components/PopoverButton';

// actions
import { switchTab, closeTab } from 'reducer/tabs.reducer';

const TabItem = ({ id, name, options, isActive }) => {
  const dispatch = useDispatch();

  const handleSetActiveTab = () => {
    dispatch(switchTab(id));
  };

  const handleCloseTab = () => {
    dispatch(closeTab(id));
  };

  return (
    <TabItemContainerStyled isActive={isActive}>
      <PopoverButton icon={<MenuIcon />} popoverHeight="auto" content={<TabItemPopover tabId={id} options={options} />} popoverPosition="tabMenu" />
      <TabNameStyled onClick={handleSetActiveTab}>{name}</TabNameStyled>
      <CloseIcon onClick={handleCloseTab} />
    </TabItemContainerStyled>
  );
};

export default TabItem;

const TabItemContainerStyled = styled.div`
  position: relative;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  height: 50px;
  min-width: 150px;
  background: white;
  box-shadow: inset -10px -5px 25px 0px #d9ebfd;
  cursor: pointer;

  ${(props) =>
    props.isActive &&
    css`
      box-shadow: 3px -8px 6px 5px #d9ebfd;
      z-index: 10;
    `}
`;

const TabNameStyled = styled.div`
  text-align: center;
  flex-grow: 1;
  align-self: normal;
  display: flex;
  align-items: center;
  justify-content: center;
`;
