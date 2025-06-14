'use client';

import { useCallback, useEffect, useRef } from 'react';
import { STEP_PRICE } from '@/constants';

import css from './RangeSlider.module.css';

interface RangeSlider {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
}

const RangeSlider: React.FC<RangeSlider> = ({
  min,
  max,
  value,
  onChange,
  step = STEP_PRICE,
}) => {
  const range = useRef<HTMLDivElement>(null);
  const [minValue, maxValue] = value;

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValue, maxValue, getPercent]);

  return (
    <div className={css.container}>
      <input
        type="range"
        min={min}
        max={max}
        value={value[0]}
        step={step}
        onChange={event => {
          const val = Math.min(+event.target.value, value[1] - step);
          onChange([val, maxValue]);
          event.target.value = val.toString();
        }}
        className={`${css.thumb} ${css.thumbZindex3}`}
        aria-label="Minimum value"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value[1]}
        step={step}
        onChange={event => {
          const val = Math.max(+event.target.value, value[0] + step);
          onChange([minValue, val]);
          event.target.value = val.toString();
        }}
        className={`${css.thumb} ${css.thumbZindex3}`}
        aria-label="Maximum value"
      />

      <div className={css.slider}>
        <div className={css.sliderTrack} />
        <div
          ref={range}
          className={css.sliderRange}
          data-testid="slider-range"
        />
      </div>
    </div>
  );
};

export default RangeSlider;
