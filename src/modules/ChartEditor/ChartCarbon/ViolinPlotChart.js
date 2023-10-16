import React from 'react';
import clsx from 'clsx';

import { numberToFixed } from 'helpers/numberConsecutiveZeros';

// components
import GraphChart from 'components/GraphChart';

function ViolinPlotChart({ chart }) {
  console.log('chart :', chart);
  return (
    <div className="w-full">
      <div style={{ marginBottom: 20 }}>{chart.chart_name}</div>

      <div className="w-full">
        {chart.metrics.map((item, index) => {
          return (
            <div key={index} className="violinChart">
              {item.variants.map((variant, variantIndex) => {
                let cssColorChange = 'text-[#a0a0a0]';
                const confidental = variant.confidentialInternal;
                const lowerBound = confidental?.lowerBound || 0;
                const upperBound = confidental?.upperBound || 0;
                const total = lowerBound + upperBound;
                const commons = total > 0 ? '+' : '-';

                // get mean number
                const mean = numberToFixed(variant?.mean || 0);

                // get changes number
                const changes = numberToFixed(confidental?.changes || 0);
                let changesText = '-';
                if (changes !== 0) {
                  changesText = `${commons} ${changes}%`;
                }

                // get p_value
                const pValue = numberToFixed(variant?.PValue || 0);

                // get css color
                if (total > 0) {
                  cssColorChange = 'text-[#239126]';
                }
                if (total < 0) {
                  cssColorChange = 'text-[#f00]';
                }

                return (
                  <tr key={variantIndex} className="results-variation-row align-items-center py-4">
                    <td className="variation with-variation-label variation1 w-[215px] py-4 e">
                      <div className="text-ellipsis">{variant.name}</div>
                    </td>
                    <td className="value baseline py-4">{mean}</td>
                    <td className={clsx('value baseline  py-4 font-bold', cssColorChange)}>{changesText}</td>
                    <td className="value baseline  py-4">{pValue || '-'}</td>
                    <td>{confidental ? <GraphChart variant={variant} /> : <> - </>}</td>
                  </tr>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViolinPlotChart;
