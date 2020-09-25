import React from 'react';

// carbon core
import { Button } from 'carbon-components-react';

export default function ButtonField({ text, onClick }) {
  return (
    <Button kind="tertiary" size="field" onClick={onClick}>
      {text}
    </Button>
  );
}
