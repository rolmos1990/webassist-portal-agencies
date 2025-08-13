import { useEffect, useState } from 'react';
import { animate, useMotionValue } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedNumber = ({
  value,
  prefix = '',
  suffix = '',
  duration = 1,
}: AnimatedNumberProps) => {
  const [display, setDisplay] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [value]);

  return (
    <span>
      {prefix}
      {Math.round(display).toLocaleString()}
      {suffix}
    </span>
  );
};

export default AnimatedNumber;
