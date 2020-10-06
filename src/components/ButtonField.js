import React from 'react';

// carbon core
import { Button } from 'carbon-components-react';

export default function ButtonField({ text, kind = 'tertiary', onClick }) {
  return (
    <Button kind={kind} size="field" onClick={onClick}>
      {text}
    </Button>
  );
}
