import { render, screen, fireEvent } from '@testing-library/react';
import RangeSlider from './RangeSlider';
import { vi } from 'vitest';

// Mock STEP_PRICE
vi.mock('@/constants', () => ({
  STEP_PRICE: 1,
}));

describe('RangeSlider Component', () => {
  const mockOnChange = vi.fn();
  const defaultProps = {
    min: 0,
    max: 100,
    value: [20, 80] as [number, number],
    onChange: mockOnChange,
    step: 1,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders RangeSlider with initial values', () => {
    render(<RangeSlider {...defaultProps} />);
    const inputs = screen.getAllByRole('slider');
    expect(inputs.length).toBe(2);
    expect(inputs[0]).toHaveValue('20');
    expect(inputs[1]).toHaveValue('80');
    const range = screen.getByTestId('slider-range');
    expect(range).toHaveStyle('left: 20%');
    expect(range).toHaveStyle('width: 60%');
  });

  test('updates range style when value changes', async () => {
    const { rerender } = render(<RangeSlider {...defaultProps} />);
    const range = screen.getByTestId('slider-range');

    rerender(<RangeSlider {...defaultProps} value={[30, 70]} />);
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(range).toHaveStyle('left: 30%');
    expect(range).toHaveStyle('width: 40%');
  });

  test('handles min value change within constraints', () => {
    render(<RangeSlider {...defaultProps} />);
    const minInput = screen.getAllByRole('slider')[0];
    fireEvent.change(minInput, { target: { value: '50' } });
    expect(mockOnChange).toHaveBeenCalledWith([50, 80]);

    fireEvent.change(minInput, { target: { value: '79' } });
    expect(mockOnChange).toHaveBeenCalledWith([79, 80]);
  });

  test('handles max value change within constraints', () => {
    render(<RangeSlider {...defaultProps} />);
    const maxInput = screen.getAllByRole('slider')[1];
    fireEvent.change(maxInput, { target: { value: '30' } });
    expect(mockOnChange).toHaveBeenCalledWith([20, 30]);

    fireEvent.change(maxInput, { target: { value: '21' } });
    expect(mockOnChange).toHaveBeenCalledWith([20, 21]);
  });

  test('prevents min value from exceeding max - step', () => {
    render(<RangeSlider {...defaultProps} />);
    const minInput = screen.getAllByRole('slider')[0];
    fireEvent.change(minInput, { target: { value: '81' } });
    expect(mockOnChange).toHaveBeenCalledWith([79, 80]);
  });

  test('prevents max value from falling below min + step', () => {
    render(<RangeSlider {...defaultProps} />);
    const maxInput = screen.getAllByRole('slider')[1];
    fireEvent.change(maxInput, { target: { value: '19' } });
    expect(mockOnChange).toHaveBeenCalledWith([20, 21]);
  });
});
