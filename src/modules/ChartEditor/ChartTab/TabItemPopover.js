import React from 'react';
import styled from 'styled-components';
import canvg from 'canvg';
import { useDispatch } from 'react-redux';

// components
import CheckboxField from 'components/CheckboxField';

// actions
import { setTabOption } from 'reducer/tabs.reducer';

function downloadChart() {
  const chart = document.querySelector('.recharts-wrapper');
  if (!chart) return;
  const chartHtml = chart.innerHTML;
  const canvasElement = document.createElement('canvas');
  canvasElement.id = 'canvas';
  document.getElementById('root').appendChild(canvasElement);
  canvg('canvas', chartHtml);
  const link = document.createElement('a');
  link.download = 'chart.png';
  link.href = canvasElement.toDataURL('image/png');
  link.click();
  setTimeout(() => {
    canvasElement.remove();
  });
}

const TabItemPopover = ({ tabId, options }) => {
  const dispatch = useDispatch();

  function toggleLegend(e) {
    e.stopPropagation();
    dispatch(setTabOption(tabId, 'legend', !options.legend));
  }

  function toggleTooltip(e) {
    e.stopPropagation();
    dispatch(setTabOption(tabId, 'tooltip', !options.tooltip));
  }

  return (
    <>
      <MenuItem>Send to View...</MenuItem>
      <MenuItem onClick={downloadChart}>Export...</MenuItem>
      <Separator />
      <MenuItem>
        <CheckboxField id={`toggle-chart-tooltip-${tabId}`} labelText="Tooltip" defaultChecked={options.tooltip} onClick={toggleTooltip} />
      </MenuItem>
      <MenuItem>
        <CheckboxField id={`toggle-chart-legend-${tabId}`} labelText="Legend" defaultChecked={options.legend} onClick={toggleLegend} />
      </MenuItem>
    </>
  );
};

export default TabItemPopover;

const MenuItem = styled.div`
  padding: 7px 15px;
`;

const Separator = styled.div`
  height: 1px;
  margin: 5px 0;
  background: rgba(0, 0, 0, 0.1);
`;
