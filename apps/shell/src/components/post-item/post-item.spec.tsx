import { render } from '@testing-library/react';

import PostItem from './post-item';

describe('PostItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PostItem />);
    expect(baseElement).toBeTruthy();
  });
});
