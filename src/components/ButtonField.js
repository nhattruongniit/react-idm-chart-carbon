import React from 'react';

// carbon core
import { Button } from '@carbon/react';

export default function ButtonField({ text, kind = 'tertiary', onClick }) {
  return (
    <Button kind={kind} size="md" onClick={onClick}>
      {text}
    </Button>
  );
}
